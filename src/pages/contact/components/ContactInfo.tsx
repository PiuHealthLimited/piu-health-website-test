import { ORGANIZATION_CONTACT, ORGANIZATION_FULL_ADDRESS } from '@/constants';

export function ContactInfo() {
  return (
    <div className="contact-bg">
      <h2>Contact Info</h2>
      <div className="row">
        <div className="col-sm-12">
          <ul className="iq-contact text-white">
            <li>
              <i className="fas fa-phone" />
              <a className="text-white" href={`tel:${ORGANIZATION_CONTACT.phone}`}>
                {ORGANIZATION_CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <i className="fas fa-envelope" />
              <a className="text-white" href={`mailto:${ORGANIZATION_CONTACT.email}`}>
                {ORGANIZATION_CONTACT.email}
              </a>
            </li>
            <li>
              <i className="fas fa-map-marker-alt" />
              <address className="d-inline-block mb-0 text-white">
                {ORGANIZATION_FULL_ADDRESS}
              </address>
            </li>
          </ul>
        </div>
        <div className="col-sm-12">
          <iframe
            className="w-100 mt-3"
            title="PiuHealth location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.840289118572!2d144.95373631550405!3d-37.81720974201396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sin!4v1543402448828"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
