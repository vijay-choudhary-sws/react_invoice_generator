import { NavLink,Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container">
        <Link to="/" className="navbar-brand">React Test</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} aria-current="page">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/generate-invoice" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} aria-current="page">
                Generate Invoice
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/ai-bot" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} aria-current="page">
                AI Bot
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
