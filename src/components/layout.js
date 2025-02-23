import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

const Layout = (props) => {
  const data = useLocation();
  const { title, children } = props;

  const [toggleNav, setToggleNav] = React.useState(false);
  return (
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
      <header className="site-head">
        <div className="site-head-container">
          <a
            className="nav-burger"
            href={`#`}
            onClick={() => setToggleNav(!toggleNav)}
          >
            <div
              className="hamburger hamburger--collapse"
              aria-label="Menu"
              role="button"
              aria-controls="navigation"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner" />
              </div>
            </div>
          </a>
          <div className="site-head-left">
            <Link className="site-head-logo" to={`/`}>
              {title}
            </Link>
          </div>
          <nav id="swup" className="site-head-right">
            <ul className="nav" role="menu">
              <li
                className={`nav-home  ${data.pathname === "/" ? "nav-current" : ""} `}
                role="menuitem"
              >
                <Link to={`/`}>Home</Link>
              </li>
              <li
                className={`nav-home  ${data.pathname.includes("/bio") ? "nav-current" : ""} `}
                role="menuitem"
              >
                <Link to={`/bio`}>Bio</Link>
              </li>
              <li
                className={`nav-home  ${data.pathname.includes("/elements") ? "nav-current" : ""} `}
                role="menuitem"
              >
                <Link to={`/elements`}>Elements</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
