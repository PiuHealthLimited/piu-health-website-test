/****  CONFIG  ****/
const CONFIG = {
  SHEET_NAME: "Contacts",
  BRAND_NAME: "Piu Health",
  NOTIFY_TO: ["raman@piuhealth.com"],
  REPLY_FROM: "rahul@piuhealth.com",
  TIMEZONE_KEY: "timezone",

  // CamelCase → Column header
  // Add/remove keys here; everything else adapts automatically.
  COLUMN_MAP: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    submittedAt: "Submitted At",
  },
};
/*******************/

function doPost(e) {
  try {
    const raw = JSON.parse(e.postData.contents || "{}");

    const tz = (raw[CONFIG.TIMEZONE_KEY] || "UTC").toString();

    const now = Utilities.formatDate(new Date(), tz, "yyyy-MM-dd HH:mm:ss");

    // 1) Build record strictly from COLUMN_MAP
    const record = buildRecordFromColumnMap(raw, tz, now);

    // 2) Sheet header & append row using COLUMN_MAP order
    const sheet = ensureSheet();

    ensureHeader(sheet);

    appendToSheet(sheet, record);

    // 3) Emails (internal + auto-reply) from COLUMN_MAP
    processRecord(record);

    // 4) Respond with camelCase record
    return jsonOutput({ ok: true, record });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  }
}

/* -------------------------- Core -------------------------- */

function buildRecordFromColumnMap(raw, tz, formattedNow) {
  const rec = {};

  for (const key of Object.keys(CONFIG.COLUMN_MAP)) {
    if (key === "submittedAt") {
      rec[key] = `${formattedNow} (${tz})`;

      continue;
    }

    const v = raw[key];

    // normalize to string and trim; keep numbers/dates readable
    rec[key] =
      v === null || v === undefined
        ? ""
        : typeof v === "string"
        ? v.trim()
        : String(v);
  }

  return rec;
}

function appendToSheet(sheet, record) {
  const keys = Object.keys(CONFIG.COLUMN_MAP);

  const row = keys.map((k) => record[k] ?? "");

  sheet.appendRow(row);
}

function processRecord(record) {
  const brand = CONFIG.BRAND_NAME;

  // Build HTML body entirely from COLUMN_MAP
  const htmlBody = buildInternalHtml(record);

  // Notify team
  MailApp.sendEmail({
    to: CONFIG.NOTIFY_TO.join(","),
    subject: `New contact: ${record.name || "(no name)"}${
      record.email ? " <" + record.email + ">" : ""
    }`,
    htmlBody,
    name: `${brand} Bot`,
    replyTo: record.email || undefined,
  });

  // Auto-reply to submitter
  if (record.email) {
    MailApp.sendEmail({
      to: record.email,
      subject: `Thanks for contacting ${brand}`,
      htmlBody: `
        <p>Hi ${esc(record.name) || "there"},</p>
        <p>Thanks for reaching out to <b>${esc(brand)}</b>!
        We've received your message and our team will get back to you soon.</p>
        <p><i>This is an automated acknowledgement.</i></p>
        <p>Warm regards,<br>${esc(brand)} Team</p>
      `,
      name: `${brand} Support`,
      replyTo: CONFIG.REPLY_FROM,
    });
  }
}

/* -------------------------- HTML via COLUMN_MAP -------------------------- */

function buildInternalHtml(record) {
  const fieldsHtml = Object.keys(CONFIG.COLUMN_MAP)
    .map((key) => {
      const label = CONFIG.COLUMN_MAP[key];
      const value = record[key] ?? "";
      // preserve newlines for long text like message
      return `<p><b>${esc(label)}:</b> ${nl2br(esc(String(value)))}</p>`;
    })
    .join("\n");

  const sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();

  return `
    <p>A new person tried to contact you:</p>
    ${fieldsHtml}
    <p><a href="${sheetUrl}">View Sheet</a></p>
  `;
}

/* -------------------------- Sheet helpers -------------------------- */

function ensureSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  return (
    ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME)
  );
}

function ensureHeader(sheet) {
  const headers = Object.values(CONFIG.COLUMN_MAP);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);

    return;
  }

  // Reconcile header if columns changed
  const width = Math.max(sheet.getLastColumn(), headers.length);

  const existing = sheet.getRange(1, 1, 1, width).getValues()[0];

  let needsRewrite =
    existing.length < headers.length ||
    headers.some((h, i) => (existing[i] || "").toString() !== h);

  if (needsRewrite) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

/* -------------------------- Utils -------------------------- */

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function nl2br(s) {
  return String(s || "").replace(/\n/g, "<br>");
}
