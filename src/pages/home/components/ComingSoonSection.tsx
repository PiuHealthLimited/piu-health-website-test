import { NavLink } from 'react-router-dom';
import { worksBackgroundImage, comingSoonImage } from '@/assets/images';

export function ComingSoonSection() {
  return (
    <section className="iq-about mt-1">
      <div className="bg">
        <img src={worksBackgroundImage} alt="" aria-hidden="true" />
      </div>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-lg-8 col-sm-12 text-center">
            <div className="title-box">
              <h2 className="title text-dark">Coming Soon</h2>
              <p className="mt-4">
                We're shaping PiuHealth with select partners and early adopters. Join the waitlist
                to help us refine the experience and unlock early access as we roll out in phases.
                <br />
                Together, we're redefining how people engage with preventive care, daily health
                routines, and trusted resources.
              </p>
            </div>
            <div className="mt-4">
              <NavLink className="button grey mt-2" to="/features">
                Explore Features
              </NavLink>
            </div>
            <img
              className="img-fluid about-img mt-5"
              src={comingSoonImage}
              alt="Coming soon illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
