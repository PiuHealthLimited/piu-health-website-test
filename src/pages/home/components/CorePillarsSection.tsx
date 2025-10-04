import {
  worksBackgroundImage,
  worksOverlayImage,
  personalizedGuidanceImage,
  preventiveDesignImage,
  portableRecordsImage,
  privacySecurityImage,
} from '@/assets/images';

interface PillarItem {
  title: string;
  description: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
  extraClass?: string;
}

const PILLAR_SECTIONS: PillarItem[] = [
  {
    title: 'Personalized Guidance',
    description: [
      "Your health isn't one-size-fits-all. PiuHealth delivers tailored insights that reflect your lifestyle, preferences, and goals. From meal ideas to movement nudges, every recommendation is personalized to help you make better everyday choices.",
      'As your behaviors and context evolve, recommendations adapt—so you always get timely, relevant support without the noise.',
    ],
    image: personalizedGuidanceImage,
    imageAlt: 'Personalized guidance illustration',
    extraClass: 'works-arrow-01',
  },
  {
    title: 'Preventive by Design',
    description: [
      'Most health issues can be mitigated with better habits. PiuHealth focuses on prevention—nudging small, sustainable changes that reduce risk, improve energy, and build resilience over time.',
      'When red flags appear, we guide you to appropriate care promptly, helping you avoid unnecessary delays.',
    ],
    image: preventiveDesignImage,
    imageAlt: 'Preventive care concept art',
    reverse: true,
    extraClass: 'works-arrow-02',
  },
  {
    title: 'Portable Health Records',
    description: [
      "Switching doctors or health systems shouldn't mean starting over. Soon, carry a secure, scannable summary of your health history and share on your terms—giving clinicians the context they need while you keep control.",
      'Share access temporarily, revoke it anytime, and maintain a clean, up-to-date summary wherever you go.',
    ],
    image: portableRecordsImage,
    imageAlt: 'Portable health records illustration',
    /*extraClass: 'works-arrow-01',*/
    extraClass: 'works-arrow-01 extra-margin-top',
  },
  {
    title: 'Privacy & Security',
    description: [
      'Your health data belongs to you. Our HIPAA-aligned infrastructure combines encryption, access controls, and explicit consent to protect your privacy at every step.',
      'We practice data minimization and transparent controls so you can decide what to share, when, and with whom.',
    ],
    image: privacySecurityImage,
    imageAlt: 'Security shield illustration',
    reverse: true,
  },
];

export function CorePillarsSection() {
  return (
    <section className="iq-works mt-3 bg-light">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-lg-8 col-sm-12 text-center" />
        </div>
        {PILLAR_SECTIONS.map((item) => (
          <div
            key={item.title}
            className={`row align-items-center m-top ${item.extraClass ?? ''}`.trim()}
          >
            <div className={`col-lg-6 col-sm-12${item.reverse ? ' order-lg-2 order-1' : ''}`}>
              <div className="title-box">
                <h2 className="title-light text-dark">{item.title}</h2>
              </div>
              <p className="mt-4">
                {item.description.map((paragraph, paragraphIndex) => (
                  <span key={paragraphIndex}>
                    {paragraph}
                    {paragraphIndex < item.description.length - 1 ? (
                      <>
                        <br />
                        <br />
                      </>
                    ) : null}
                  </span>
                ))}
              </p>
            </div>
            <div className={`col-lg-6 col-sm-12${item.reverse ? ' order-lg-1 order-2' : ''}`}>
              <div className="works-box">
                <img
                  className="img-fluid top-bg"
                  src={worksBackgroundImage}
                  alt=""
                  aria-hidden="true"
                />
                <img
                  className="img-fluid works-overlay-image"
                  src={worksOverlayImage}
                  alt=""
                  aria-hidden="true"
                />
                <img
                  className="img-fluid top-img1 i-size home-image-100"
                  src={item.image}
                  alt={item.imageAlt}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
