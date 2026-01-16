import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import apogeeLogo from '../../../public/svgs/apogee26logo.svg';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const menuVariants: Variants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        closed: { opacity: 0, y: 20 },
        open: { opacity: 1, y: 0 }
    };

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/submissions', label: 'Submissions' },
        { path: '/contact', label: 'Contact' }
    ];

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <a href="https://bits-apogee.org" target="_blank" rel="noopener noreferrer" className={styles.logo}>
                <img src={apogeeLogo} alt="APOGEE 2026" style={{ height: '40px' }} />
            </a>

            {/* Desktop Navigation */}
            <div className={styles.navLinks}>
                <Link to="/" className={location.pathname === '/' ? styles.active : ''}>Home</Link>
                <Link to="/submissions" className={location.pathname === '/submissions' ? styles.active : ''}>Submissions</Link>
                <Link to="/contact" className={location.pathname === '/contact' ? styles.active : ''}>Contact</Link>
                <Link to="/registration" className={styles.ctaButton}>
                    Register Now
                </Link>
            </div>

            {/* Mobile Hamburger Button - Only visible when menu is CLOSED */}
            {!isMobileMenuOpen && (
                <div className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
                    <Menu size={28} color="#fff" />
                </div>
            )}

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                         {/* Close Button Inside Menu */}
                        <div className={styles.closeBtn} onClick={toggleMobileMenu}>
                            <X size={32} color="#fff" />
                        </div>

                        <div className={styles.mobileNavLinks}>
                            {navItems.map((item) => (
                                <motion.div key={item.path} variants={itemVariants}>
                                    <Link 
                                        to={item.path} 
                                        className={location.pathname === item.path ? styles.active : ''}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div variants={itemVariants}>
                                <Link 
                                    to="/registration" 
                                    className={styles.mobileCtaButton}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Register Now
                                </Link>
                            </motion.div>
                        </div>
                        
                        {/* Decorative Elements */}
                        <div className={styles.decorationCircle1} />
                        <div className={styles.decorationCircle2} />
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
