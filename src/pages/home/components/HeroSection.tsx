import { NavLink } from 'react-router-dom';
import { bannerOverlayImage } from '@/assets/images';
import { bannerVideo } from '@/assets/videos';

export function HeroSection() {
  return (
    <div id="banner" className="banner">
      <div className="banner-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12">
              <h1 className="text-uppercase">Personalized, Preventive, Portable Health™</h1>
              <h4>
                Smarter daily health choices, backed by trusted knowledge and secure AI. PiuHealth
                blends evidence-informed guidance with practical tools that fit seamlessly into your
                routine.
              </h4>
              <div className="form-row align-items-center justify-content-lg-start justify-content-center">
                <div className="col-auto">
                  <NavLink to="/contact" className="button mb-2 subscription-button">
                    Join the Waitlist
                  </NavLink>
                </div>
                <div className="col-auto">
                  <NavLink to="/partnership" className="button mb-2 subscription-button">
                    Explore Partnerships
                  </NavLink>
                </div>
              </div>
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
}
