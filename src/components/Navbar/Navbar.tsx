import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import apogeeLogo from '../../../public/svgs/apogee26logo.svg';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <a href="https://bits-apogee.org" target="_blank" rel="noopener noreferrer" className={styles.logo}>
        <img src={apogeeLogo} alt="APOGEE 2026" style={{ height: '40px' }} />
      </a>
      
      <div className={styles.navLinks}>
        <Link to="/" className={location.pathname === '/' ? styles.active : ''}>Home</Link>
        <Link to="/submissions" className={location.pathname === '/submissions' ? styles.active : ''}>Submissions</Link>
        <Link to="/contact" className={location.pathname === '/contact' ? styles.active : ''}>Contact</Link>
        <Link to="/registration" className={styles.ctaButton}>
          Register Now
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
