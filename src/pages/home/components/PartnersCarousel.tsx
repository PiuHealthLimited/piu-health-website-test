import { useRef } from 'react';
import { useInterval } from '@/hooks';
import {
  partnerLogo01,
  partnerLogo02,
  partnerLogo03,
  partnerLogo04,
  partnerLogo05,
} from '@/assets/images';

interface PartnerLogo {
  src: string;
  title: string;
}

const PARTNER_LOGOS: PartnerLogo[] = [
  { src: partnerLogo01, title: 'Association One' },
  { src: partnerLogo02, title: 'Association Two' },
  { src: partnerLogo03, title: 'Association Three' },
  { src: partnerLogo04, title: 'Association Four' },
  { src: partnerLogo05, title: 'Association Five' },
  { src: partnerLogo01, title: 'Association Six' },
  { src: partnerLogo02, title: 'Association Seven' },
  { src: partnerLogo03, title: 'Association Eight' },
  { src: partnerLogo04, title: 'Association Nine' },
  { src: partnerLogo05, title: 'Association Ten' },
];

const SCROLL_STEP = 220;
const SCROLL_INTERVAL = 3000;

export function PartnersCarousel() {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useInterval(() => {
    const node = carouselRef.current;
    if (!node) {
      return;
    }

    const maxScroll = node.scrollWidth - node.clientWidth;
    if (maxScroll <= 0) {
      return;
    }

    const next = node.scrollLeft + SCROLL_STEP;
    if (next >= maxScroll) {
      node.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      node.scrollTo({ left: next, behavior: 'smooth' });
    }
  }, SCROLL_INTERVAL);

  return (
    <section className="iq-clients">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-lg-12 col-sm-12 text-center">
            <div className="title-box">
              <h3 className="title text-dark">Trusted by mission-driven partners</h3>
              <p className="mt-2">A glimpse at the organizations collaborating with PiuHealth.</p>
            </div>
          </div>
        </div>
        <div
          className="owl-carousel mt-4"
          ref={carouselRef}
          role="list"
          aria-label="Partner logos"
          style={{ display: 'flex', overflowX: 'auto', scrollBehavior: 'smooth' }}
        >
          {PARTNER_LOGOS.map((client, index) => (
            <div
              className="item"
              key={`${client.src}-${index}`}
              style={{ flex: '0 0 auto', width: '200px' }}
              role="listitem"
            >
              <div className="clients-box text-center" title={client.title}>
                <img className="img-fluid" src={client.src} alt={client.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
