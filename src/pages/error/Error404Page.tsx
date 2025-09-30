import { NavLink } from 'react-router-dom';
import { error404Image } from '@/assets/images';
import { PageLayout, type BreadcrumbItem } from '@/layouts';

const BREADCRUMBS: BreadcrumbItem[] = [
  { label: 'Home', to: '/', iconClassName: 'fa fa-home' },
  { label: '404 Error' },
];

export function Error404Page() {
  return (
    <PageLayout
      title="Page Not Found"
      description="We couldn't locate that PiuHealth page—return home to keep exploring."
      breadcrumbs={BREADCRUMBS}
      keywords={['PiuHealth 404', 'page not found', 'missing page']}
      noindex
    >
      <div className="error-box">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-12">
              <div className="error text-center">
                <img className="img-fluid" src={error404Image} alt="404 error" />
                <NavLink to="/" className="button mt-4">
                  Go to Home Page
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
