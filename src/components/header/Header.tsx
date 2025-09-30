import { useCallback, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStickyHeader } from '@/hooks';
import { logoImage } from '@/assets/images';
import { PRIMARY_NAVIGATION_LINKS, WAITLIST_LINK } from '@/constants';

export function Header() {
  const isSticky = useStickyHeader(100);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = useCallback(() => {
    setIsNavOpen((value) => !value);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const navWrapperClassName = useMemo(
    () => `collapse navbar-collapse${isNavOpen ? ' show' : ''}`,
    [isNavOpen],
  );

  return (
    <header id="header" className={isSticky ? 'menu-sticky' : undefined}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg navbar-light">
              <NavLink className="navbar-brand" to="/" onClick={closeNav}>
                <img className="logo" src={logoImage} alt="PiuHealth logo" />
                <img className="logo-stiky" src={logoImage} alt="PiuHealth logo sticky" />
                <div className="block" />
              </NavLink>
              <button
                className={`navbar-toggler${isNavOpen ? '' : ' collapsed'}`}
                type="button"
                aria-controls="app-primary-navigation"
                aria-expanded={isNavOpen}
                aria-label="Toggle navigation"
                onClick={toggleNav}
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className={navWrapperClassName} id="app-primary-navigation">
                <ul className="navbar-nav ml-auto">
                  {PRIMARY_NAVIGATION_LINKS.map((item) => (
                    <li className="nav-item" key={item.path}>
                      <NavLink
                        end={item.path === '/'}
                        to={item.path}
                        className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                        onClick={closeNav}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
          <div className="col-lg-3 text-right">
            <ul className="login">
              <li className="d-inline">
                <NavLink to={WAITLIST_LINK.path} onClick={closeNav}>
                  {WAITLIST_LINK.label}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
