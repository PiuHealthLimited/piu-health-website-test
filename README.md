# 🚀 Piu Health Website

## 🧠 Overview

**Piu Health Website** is a TypeScript-based

---

## 📦 Prerequisites

Ensure the following tools are installed on your system:

- [Node.js](https://nodejs.org/) **v22.17.1**

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/PiuHealthLimited/piu-health-website.git

cd piu-health-website
```

### 2. Install Dependencies

```bash
npm install
```

---

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build

npm run preview
```

---

## 📨 Contact Form & Google Sheets Integration

Follow the steps below to connect the on-site contact form to a Google Spreadsheet using Google Apps Script.

### 1. Create the spreadsheet

1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet (for example, **Piu Health Contact Requests**).

### 2. Add the Apps Script

1. In the sheet, click **Extensions → Apps Script**.
2. Replace the default script with the snippet below and save it.

### 3. Deploy the script as a web app

1. Click **Deploy → Test deployments (or New deployment) → Select type → Web app**.
2. Set **Execute as** to `Me` and **Who has access** to `Anyone` (or `Anyone with the link`).
3. Click **Deploy** and copy the generated **Web app URL**.

> Keep this URL handy—it is the endpoint the app.

---

## 📁 Project Structure

```bash
/piu-health-website
├── .husky/                      # Git hooks (lint before commit)
│   └── pre-commit
├── public/                      #
├── src/                         # Main source code
│   ├── config/                  #
│   └── index.ts                 #
├── .eslintignore                #
├── .gitignore                   # Git ignore rules
├── .prettierignore              # Prettier ignore rules
├── .prettierrc.json             # Prettier config
├── eslint.config.js             # ESLint config
├── index.html                   #
├── package.json                 # Project metadata & scripts
├── package-lock.json            # Dependency lockfile
├── tsconfig.app.json            #
├── tsconfig.json                # TypeScript config
├── tsconfig.node.json           #
├── vite.config.ts               #
└── README.md                    # Documentation
```

---

## 🧹 Code Quality

### ✅ Linting

```bash
npm run lint

npm run lint:fix
```

### 🎨 Formatting

```bash
npm run format

npm run format:fix
```

---

## 🤝 Contributing

1. Create a branch
2. Follow `.prettierrc.json` and `eslint.config.ts`
3. `npm run lint && npm run format`
4. Ensure Husky passes
5. Open a PR with a clear description

---

## 📬 Support

- Open a GitHub issue
- Contact the maintainers

---

© Piu Health Limited. All rights reserved.
