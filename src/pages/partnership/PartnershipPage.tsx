import {
  bannerOverlayImage,
  partnerLogo01,
  partnerLogo02,
  partnerLogo03,
  partnerLogo04,
  partnerLogo05,
  contentCreatorsImage,
  ecosystemPartnersImage,
  collaborationApproachImage,
} from '@/assets/images';
import { bannerVideo } from '@/assets/videos';
import { useMemo } from 'react';
import { PageLayout, type BreadcrumbItem, type StructuredDataPayload } from '@/layouts';

export function PartnershipPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', to: '/', iconClassName: 'fa fa-home' },
    { label: 'Partnerships' },
  ];

  const hero = (
    <>
      <div id="banner" className="banner">
        <div className="banner-text">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-12 col-sm-12">
                <h1 className="text-uppercase">Clinical &amp; Professional Associations.</h1>
                <h4>
                  We aim to collaborate with respected U.S. medical organizations to ensure rigor
                  and relevance:
                  <br />
                  <br />
                  AMA, ANA, AAFP, ACS, AAP, AOA, AANP, AAPA
                  <br />
                  Names listed indicate target collaborators; inclusion does not imply endorsement.
                </h4>
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12 text-right homeVideo">
                <video
                  src={bannerVideo}
                  controls
                  autoPlay
                  loop
                  muted
                  preload="metadata"
                  className="features-hero w-full h-auto rounded-xl shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
        <img
          className="img-fluid banner-after"
          src={bannerOverlayImage}
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className="marquee-container">
        <div className="marquee">
          <img src={partnerLogo01} alt="Association One" loading="lazy" />
          <img src={partnerLogo02} alt="Association Two" loading="lazy" />
          <img src={partnerLogo03} alt="Association Three" loading="lazy" />
          <img src={partnerLogo04} alt="Association Four" loading="lazy" />
          <img src={partnerLogo05} alt="Association Five" loading="lazy" />
        </div>
      </div>
    </>
  );

  const partnershipStructuredData = useMemo<StructuredDataPayload>(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'PiuHealth Partnership Opportunities',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Content Creators & Educators',
          description:
            'Collaborations with credentialed health educators to deliver practical, evidence-informed content.',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Ecosystem Partners',
          description:
            'Engagement opportunities for payers, TPAs, employers, and health systems to expand preventive care.',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'How We Partner',
          description:
            'Co-created curricula, research collaborations, and pilot programs with measurable outcomes.',
        },
      ],
    }),
    [],
  );

  return (
    <PageLayout
      title="Partnerships"
      description="Explore collaboration opportunities with PiuHealth across clinicians, educators, payers, and employers."
      breadcrumbs={breadcrumbs}
      hero={hero}
      keywords={[
        'healthcare partnerships',
        'patient education collaborations',
        'payer engagement programs',
        'employer wellness partner',
        'health content creators',
      ]}
      structuredData={partnershipStructuredData}
    >
      <section className="iq-about">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="about-content mt-5">
                <div id="values" className="mb-0">
                  <div className="row mt-5 pt-3">
                    <div className="col-lg-6 col-md-12">
                      <div className="title-box">
                        <h2 className="title-light text-dark">Content Creators &amp; Educators</h2>
                      </div>
                      <p className="mt-4">
                        We're exploring collaborations with verified health educators to expand
                        practical, evidence-informed content:
                        <br />
                        Dr. Mikhail Varshavski (Doctor Mike), Thomas DeLauer, Dr. Eric Berg
                        <br />
                        Dr. Karan Rajan, Joanna Soh, Dr. Rangan Chatterjee
                      </p>
                    </div>
                    <div className="col-lg-6 col-md-12 r-mt3">
                      <img
                        className="img-fluid"
                        src={contentCreatorsImage}
                        alt="Content creators collaborating"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12 order-lg-2 order-2 mt-5 pt-5">
                      <div className="title-box">
                        <h2 className="title-light text-dark">Ecosystem Partners</h2>
                      </div>{' '}
                      <p className="mt-4">
                        Payers &amp; TPAs: Preventive engagement, adherence programs, member
                        education.
                        <br />
                        Employers: Workforce well-being, benefits optimization.
                        <br />
                        Health Systems &amp; Clinics: Patient education, continuity, record
                        portability.
                      </p>
                    </div>
                    <div className="col-lg-6 col-md-12 order-lg-1 order-2 mt-5 pt-5">
                      <img
                        className="img-fluid top-img1 w-100"
                        src={ecosystemPartnersImage}
                        alt="Ecosystem partners"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12 mt-5 pt-5">
                      <div className="title-box">
                        <h2 className="title-light text-dark">How We Partner</h2>
                      </div>
                      <p className="mt-4">
                        Co-developed curricula and content series.
                        <br />
                        Research collaborations and outcomes measurement.
                        <br />
                        Pilot programs with defined success metrics.
                      </p>
                    </div>
                    <div className="col-lg-6 col-md-12 mt-5 pt-5">
                      <img
                        className="img-fluid top-img1 w-100"
                        src={collaborationApproachImage}
                        alt="How we partner"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{' '}
        </div>
      </section>
    </PageLayout>
  );
}
