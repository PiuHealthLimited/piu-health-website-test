import { NavLink } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  to?: string;
  iconClassName?: string;
}

interface PageHeroProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export function PageHero({ title, breadcrumbs }: PageHeroProps) {
  return (
    <section className="iq-breadcrumb-five main-bg">
      <div className="container">
        <div className="row text-center">
          <div className="col-md-12">
            <div className="mb-0">
              <h2 className="title">{title}</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb main-bg">
                  {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    const icon = item.iconClassName ? (
                      <i className={item.iconClassName} aria-hidden="true" />
                    ) : null;

                    if (item.to && !isLast) {
                      return (
                        <li className="breadcrumb-item" key={`${item.label}-${index}`}>
                          <NavLink to={item.to}>
                            {icon}
                            {item.label}
                          </NavLink>
                        </li>
                      );
                    }

                    return (
                      <li
                        className={`breadcrumb-item${isLast ? ' active' : ''}`}
                        key={`${item.label}-${index}`}
                      >
                        {icon}
                        {item.label}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
