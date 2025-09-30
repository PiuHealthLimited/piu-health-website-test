import {
  bannerOverlayImage,
  technologyKnowledgebaseImage,
  technologyIntegrationImage,
} from '@/assets/images';
import { bannerVideo } from '@/assets/videos';
import { useMemo } from 'react';
import { PageLayout, type BreadcrumbItem, type StructuredDataPayload } from '@/layouts';

interface TechnologySection {
  title: string;
  points: string[];
  textColClass: string;
  imageColClass: string;
  image: string;
  rowClass?: string;
}

const TECHNOLOGY_SECTIONS: TechnologySection[] = [
  {
    title: 'Medical Knowledgebase & Medication Literacy',
    points: [
      'Structured information for common/OTC medicines: indications, general dosing ranges, interactions, side effects.',
      'Source provenance with versioning, review logs, and audit trails.',
      'Automated freshness checks against trusted public sources.',
    ],
    textColClass: 'col-lg-6 col-md-12',
    imageColClass: 'col-lg-6 col-md-12 r-mt3',
    image: technologyKnowledgebaseImage,
    rowClass: 'row mt-5 pt-3',
  },
  {
    title: 'Integration with Payers, TPAs, and Employers',
    points: [
      'HIPAA-aligned secure APIs, EDI support (e.g., 834/837), SFTP batches, Excel/CSV ingestion.',
      'Claims-derived insights to personalize education and adherence (member consent required).',
      'Fine-grained consent, least-privilege access, data minimization by default.',
    ],
    textColClass: 'col-lg-6 col-md-12 order-lg-2 order-2 mt-5 pt-5',
    imageColClass: 'col-lg-6 col-md-12 order-lg-1 order-2 mt-5 pt-5',
    image: technologyIntegrationImage,
    rowClass: 'row align-items-center',
  },
  {
    title: 'Location-Aware, Privacy-Respecting Provider Suggestions',
    points: [
      'Opt-in geolocation to surface relevant, nearby and in-network clinicians.',
      'Cross-border logic for US/Canada nuances.',
    ],
    textColClass: 'col-lg-6 col-md-12 mt-5 pt-5',
    imageColClass: 'col-lg-6 col-md-12 mt-5 pt-5',
    image: technologyKnowledgebaseImage,
    rowClass: 'row align-items-center',
  },
  {
    title: 'Security & Compliance',
    points: [
      'Encryption in transit/at rest; RBAC; just-in-time credentials.',
      'Tenant data segregation, immutable audit logs, breach-response playbooks.',
      'HIPAA-aligned workflows; BAAs with covered entities/business associates where applicable.',
    ],
    textColClass: 'col-lg-6 col-md-12 order-lg-2 order-2 mt-5 pt-5',
    imageColClass: 'col-lg-6 col-md-12 order-lg-1 order-2 mt-5 pt-5',
    image: technologyIntegrationImage,
    rowClass: 'row align-items-center',
  },
  {
    title: 'AI Stack (High Level)',
    points: [
      'Retrieval-augmented generation for grounded answers; prompt safety templates and evaluation gates.',
      'Guardrails for medical scope; escalation routing to live resources when appropriate.',
      'Continuous evaluation: accuracy checks, bias testing, hallucination suppression.',
    ],
    textColClass: 'col-lg-6 col-md-12 mt-5 pt-5',
    imageColClass: 'col-lg-6 col-md-12 mt-5 pt-5',
    image: technologyKnowledgebaseImage,
    rowClass: 'row align-items-center',
  },
];

export function TechnologyPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', to: '/', iconClassName: 'fa fa-home' },
    { label: 'Technology' },
  ];

  const hero = (
    <div id="banner" className="banner">
      <div className="banner-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12">
              <h1 className="text-uppercase">
                Conversational AI with a Personalizable Animated Guide.
              </h1>
              <h4>
                Customizable animated character; text and voice interactions.
                <br />
                On-device + cloud inference to balance privacy and latency.
                <br />
                Safety rails for medical scope, red-flag detection, and escalation.
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
      <img className="img-fluid banner-after" src={bannerOverlayImage} alt="" aria-hidden="true" />
    </div>
  );

  const technologyStructuredData = useMemo<StructuredDataPayload>(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'PiuHealth Technology Pillars',
      itemListElement: TECHNOLOGY_SECTIONS.map((section, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: section.title,
        description: section.points.join(' '),
      })),
    }),
    [],
  );

  return (
    <PageLayout
      title="Technology"
      description="See how PiuHealth blends AI guardrails, secure integrations, and compliance to deliver trusted guidance."
      breadcrumbs={breadcrumbs}
      hero={hero}
      keywords={[
        'healthcare AI platform',
        'health data security',
        'HIPAA compliant integrations',
        'clinical decision support AI',
        'health technology roadmap',
      ]}
      structuredData={technologyStructuredData}
    >
      <section className="iq-about">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="about-content mt-5">
                <div id="values" className="mb-0">
                  {TECHNOLOGY_SECTIONS.map((section) => (
                    <div
                      className={section.rowClass ?? 'row align-items-center'}
                      key={section.title}
                    >
                      <div className={section.textColClass}>
                        <div className="title-box">
                          <h2 className="title-light text-dark">{section.title}</h2>
                        </div>
                        <p className="mt-4">
                          {section.points.map((point, index) => (
                            <span key={point}>
                              {point}
                              {index < section.points.length - 1 ? (
                                <>
                                  <br />
                                  <br />
                                </>
                              ) : null}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div className={section.imageColClass}>
                        <img
                          className="img-fluid top-img1 w-100"
                          src={section.image}
                          alt={section.title}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
