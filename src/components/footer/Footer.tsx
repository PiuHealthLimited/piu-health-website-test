import { NavLink } from 'react-router-dom';
import { logoImage } from '@/assets/images';
import {
  FOOTER_NAVIGATION_LINKS,
  LEGAL_NAVIGATION_LINKS,
  ORGANIZATION_CONTACT,
  ORGANIZATION_FULL_ADDRESS,
} from '@/constants';

interface SocialLink {
  label: string;
  href: string;
  iconClassName: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/piuhealth/',
    iconClassName: 'fab fa-linkedin',
  },
  { label: 'Twitter', href: 'https://twitter.com/PiuHealth', iconClassName: 'fab fa-twitter' },
  { label: 'YouTube', href: 'https://www.youtube.com/', iconClassName: 'fab fa-youtube' },
  { label: 'Instagram', href: 'https://www.instagram.com/', iconClassName: 'fab fa-instagram' },
];

export function Footer() {
  return (
    <footer id="contact" className="education">
      <div className="container">
        <div className="footer-top">
          <div className="row">
            <div className="col-lg-5 col-md-8 col-sm-8">
              <div className="footer-logo">
                <NavLink to="/">
                  <img src={logoImage} alt="PiuHealth logo" loading="lazy" />
                </NavLink>
              </div>
              <div className="widget">
                <div className="textwidget">
                  <p>
                    PiuHealth provides educational content and general health guidance only. It is
                    not a substitute for professional medical advice, diagnosis, or treatment.
                    Always seek the advice of a qualified healthcare provider with any questions
                    about a medical condition. If you think you may have a medical emergency, call
                    911 immediately. PiuHealth is not responsible for emergency care.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-5 col-sm-5">
              <div className="widget">
                <h4 className="footer-title iq-rmt-30">Company</h4>
                <div className="menu-footer2-container">
                  <ul id="menu-footer2" className="menu">
                    {FOOTER_NAVIGATION_LINKS.map((link) => (
                      <li className="menu-item" key={link.path}>
                        <NavLink to={link.path}>{link.label}</NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-5 col-sm-5">
              <div className="widget">
                <h4 className="footer-title iq-rmt-30">Legal</h4>
                <div className="menu-footer1-container">
                  <ul id="menu-footer1-1" className="menu">
                    {LEGAL_NAVIGATION_LINKS.map((link) => (
                      <li className="menu-item" key={link.path}>
                        <NavLink to={link.path}>{link.label}</NavLink>
                      </li>
                    ))}
                    <li className="menu-item">Terms of Use</li>
                    <li className="menu-item">HIPAA Notice</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <h4 className="footer-title iq-rmt-30">Contact Info</h4>
              <div className="row">
                <div className="col-sm-12">
                  <ul className="iq-contact text-white">
                    <li>
                      <a href={`tel:${ORGANIZATION_CONTACT.phone}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30px"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        {ORGANIZATION_CONTACT.phoneDisplay}
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${ORGANIZATION_CONTACT.email}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30px"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        {ORGANIZATION_CONTACT.email}
                      </a>
                    </li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30px"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <address className="d-inline-block mb-0">{ORGANIZATION_FULL_ADDRESS}</address>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="pt-5" />
        <div className="pt-3 pb-3">
          <div className="row justify-content-between">
            <div className="col-auto mr-auto">
              <span className="copyright">
                © {new Date().getFullYear()} PiuHealth. All rights reserved.
              </span>
            </div>
            <div className="col-auto">
              <div className="social-icone">
                <ul className="d-flex">
                  {SOCIAL_LINKS.map((social) => (
                    <li className="d-inline" key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <i className={social.iconClassName} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
