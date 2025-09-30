import {
  bannerOverlayImage,
  featureVerifiedVideosImage,
  featureHabitTrackingImage,
  featureMedicationTipsImage,
  featureSideEffectsImage,
  featureConditionGuidanceImage,
  featurePersonalizedMealsImage,
  featureExerciseImage,
  featureRoadmapImage,
} from '@/assets/images';
import { featuresHeroVideo } from '@/assets/videos';
import { useMemo } from 'react';
import { PageLayout, type BreadcrumbItem, type StructuredDataPayload } from '@/layouts';

interface FeatureSection {
  title: string;
  points: string[];
  textColClass: string;
  imageColClass: string;
  image: string;
  imageClassName?: string;
}

const FEATURE_SECTIONS: FeatureSection[] = [
  {
    title: 'Verified Short Videos (Nutrition, Exercise, Wellness)',
    points: [
      'Curated, captioned, and time-boxed videos that are easy to follow.',
      'Editorial review for accuracy and practical utility; playlists by goal (e.g., heart health).',
      'Personalized feeds aligned to your behavior and interests.',
    ],
    textColClass: 'col-lg-6 col-md-12 mt-5',
    imageColClass: 'col-lg-6 col-md-12 mt-5',
    image: featureVerifiedVideosImage,
  },
  {
    title: 'Habit Tracking & Feedback (Steps, Meals, Rest, Hygiene)',
    points: [
      'Movement: break sedentary streaks, track weekly trends, celebrate consistency.',
      'Meals: photo/text logging with instant, constructive feedback and gentle nudges.',
      'Rest & hygiene: practical routines and reminders that fit your lifestyle.',
    ],
    textColClass: 'col-lg-6 col-md-12 order-lg-2 order-2 mt-5 pt-5',
    imageColClass: 'col-lg-6 col-md-12 order-lg-1 order-2 mt-5 pt-5',
    image: featureHabitTrackingImage,
  },
  {
    title: 'Medication Reminders & Personalized Tips',
    points: [
      'Smart schedules, snooze flows, and adherence confirmations.',
      'General OTC timing guidance (e.g., with/without food) and safety tips.',
      'Private adherence analytics for your eyes only—share with clinicians if you choose.',
    ],
    textColClass: 'col-lg-6 col-md-12 mt-5 pt-5',
    imageColClass: 'col-lg-6 col-md-12 mt-5 pt-5',
    image: featureMedicationTipsImage,
  },
  {
    title: 'Side Effects of Medicines (Medication Literacy)',
    points: [
      'Plain-language summaries of common and serious side effects for widely used medicines.',
      'Safety flags to contact a professional or seek emergency care when warranted.',
      'Educational modules to reduce risky self-medication behavior.',
    ],
    textColClass: 'col-lg-6 col-md-12 mb-lg-0 mb-md-5 order-lg-2 order-1 mt-5 pt-5',
    imageColClass: 'col-lg-6 col-md-12 mb-lg-0 mb-md-5 order-lg-1 order-2 mt-5 pt-5',
    image: featureSideEffectsImage,
    imageClassName: 'height400',
  },
  {
    title: 'Condition Guidance (Long-Term & Short-Term)',
    points: [
      'Symptom-pattern education for reasonable self-care vs. escalation thresholds',
      'Day-to-day literacy for chronic conditions (e.g., diabetes, hypertension, asthma).',
      'Non-diagnostic by design; guides you to right care paths when indicated.',
    ],
    textColClass: 'col-lg-6 col-md-12 mt-5 pt-5',
    imageColClass: 'col-lg-6 col-md-12 mt-5 pt-5',
    image: featureConditionGuidanceImage,
  },
  {
    title: 'Personalized Meals by Cuisine & Diet',
    points: [
      'Breakfast/lunch/dinner ideas tailored to preferences (Indian, Chinese, Mexican, etc.).',
      'Profiles: vegan, vegetarian, eggs + veg, selective meat types (e.g., fish-only), common restrictions.',
      'Step-by-step prep videos and auto-generated grocery lists.',
    ],
    textColClass: 'col-lg-6 col-md-12 mb-lg-0 mb-md-5 order-lg-2 order-1 mt-5 pt-5',
    imageColClass: 'col-lg-6 col-md-12 mb-lg-0 mb-md-5 order-lg-1 order-2 mt-5 pt-5',
    image: featurePersonalizedMealsImage,
  },
  {
    title: 'Exercise Suggestions (Age, Sex, Condition Appropriate)',
    points: [
      'Programs aligned to fitness level and medical considerations (e.g., joint-friendly options).',
      'Progressions with safe load increases, recovery guidance, and pacing.',
      'Optional wearable sync for heart-rate and effort insights.',
    ],
    textColClass: 'col-lg-6 col-md-12 mt-5 pt-5',
    imageColClass: 'col-lg-6 col-md-12 mt-5 pt-5',
    image: featureExerciseImage,
  },
  {
    title: 'Roadmap',
    points: [
      'Mental Health Companion (non-diagnostic support, CBT-inspired tools, crisis routing).',
      'Portable Personal EHR/EMR with scannable summary and user-controlled sharing.',
      'Smartwatch integration: glucose trends*, ECG snapshots* (*where available/approved).',
      'In-network clinician suggestions based on plan and stated needs.',
    ],
    textColClass: 'col-lg-6 col-md-12 mb-lg-0 mb-md-5 order-lg-2 order-1 mt-5 pt-5',
    imageColClass: 'col-lg-6 col-md-12 mb-lg-0 mb-md-5 order-lg-1 order-2 mt-5 pt-5',
    image: featureRoadmapImage,
  },
];

export function FeaturesPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', to: '/', iconClassName: 'fa fa-home' },
    { label: 'Features' },
  ];

  const hero = (
    <div id="banner" className="banner">
      <div className="banner-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12">
              <h1 className="text-uppercase">AI Healthbot (Aligned to U.S. Government Guidance)</h1>
              <ul className="space-y-3 text-lg text-[#D4FAD8]/85">
                <li>
                  Conversational answers grounded in public federal resources and clinical best
                  practices.
                </li>
                <li>
                  Triage-style prompts to encourage safe self-care or escalation to professional
                  care.
                </li>
                <li>Transparent scope limits, with clear disclaimers and emergency routing.</li>
              </ul>
            </div>
            <div className="col-lg-7 col-md-12 col-sm-12 text-right featuresVideo">
              <video
                src={featuresHeroVideo}
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

  const featureStructuredData = useMemo<StructuredDataPayload>(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'PiuHealth Feature Highlights',
      itemListElement: FEATURE_SECTIONS.map((section, index) => ({
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
      title="Features"
      description="Preview PiuHealth's personalized guidance, habit tracking, and preventive care toolkit."
      breadcrumbs={breadcrumbs}
      hero={hero}
      keywords={[
        'digital health features',
        'habit tracking app',
        'medication reminders',
        'personalized nutrition guidance',
        'health education videos',
      ]}
      structuredData={featureStructuredData}
    >
      <section>
        <div className="container">
          {FEATURE_SECTIONS.map((section) => (
            <div className="row align-items-center" key={section.title}>
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
                  className={`img-fluid top-img1 w-100${section.imageClassName ? ` ${section.imageClassName}` : ''}`}
                  src={section.image}
                  alt={section.title}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
