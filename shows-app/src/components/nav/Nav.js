import './Nav.css';
import {Link} from 'react-router-dom';

const Nav = () => {
    const showMenuHandler = () => {
        const navbarLinks = document.getElementsByClassName('navbar-links')[0];
        navbarLinks.classList.toggle('active');
    }

    return (
        <nav className="navbar">
        <div className="brand-title">MoviePedia</div>
        <a className="toggle-button" onClick={showMenuHandler}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className="navbar-links">
          <ul>
            <li><Link to="/" onClick={showMenuHandler}>Home</Link></li>
            <li><a href="#" onClick={showMenuHandler}>Actors</a></li>
            <li><Link to="/shows/search" onClick={showMenuHandler}>Shows</Link></li>
          </ul>
        </div>
      </nav>
    )
}

export default Nav;