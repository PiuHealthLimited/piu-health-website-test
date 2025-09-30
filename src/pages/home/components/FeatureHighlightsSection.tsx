import { worksAnimation, worksBackgroundImage } from '@/assets/images';
import { CircleFeatures } from '@/components';

export function FeatureHighlightsSection() {
  return (
    <section className="iq-features">
      <div className="bg">
        <img src={worksBackgroundImage} alt="" aria-hidden="true" />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 text-center">
            <img
              className="img-fluid top-img1"
              src={worksAnimation}
              alt="PiuHealth feature illustration"
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <CircleFeatures />
          </div>
        </div>
      </div>
    </section>
  );
}
