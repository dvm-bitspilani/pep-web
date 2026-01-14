import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Home.module.scss';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
};

const Home: React.FC = () => {
    // FAQ Data
    const faqs = [
        { q: "Who can participate?", a: "Undergraduate students from any recognized college or university can participate." },
        { q: "Is it a team event?", a: "Yes, you can participate individually or in a team of up to 4 members." },
        { q: "What is the registration fee?", a: "Early bird fee is ₹200 (until 5th Feb). Regular fee is ₹250." },
        { q: "Will I get a certificate?", a: "Yes, all participants who submit a paper will receive a certificate of participation." }
    ];

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className={styles.homecontainer}>
            <Navbar />
            
            {/* Hero Section */}
            <section className={styles.hero}>
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                    <motion.h1 variants={fadeInUp}>Paper Presentation 2026</motion.h1>
                    <motion.p variants={fadeInUp}>
                        Unleash your intellect. Present your ideas. Compete with the best minds across the nation
                        at India's oldest undergraduate paper presentation competition.
                    </motion.p>
                    <motion.div variants={fadeInUp}>
                        <Link to="/registration" className={styles.ctaButton}>Register Now</Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Past Judges Section */}
            <section className={styles.section}>
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    Past <span>Judges</span>
                </motion.h2>
                <motion.div 
                    className={styles.grid}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {[1, 2, 3].map((i) => (
                        <motion.div key={i} className={styles.judgeCard} variants={fadeInUp}>
                            <div className={styles.image}>
                                {/* Placeholder for Judge Image */}
                                <div style={{ width: '100%', height: '100%', background: '#333' }}></div> 
                            </div>
                            <h3>Dr. Distinguished Expert</h3>
                            <p>Senior Professor, IIT Delhi</p>
                            <p className={styles.achievement}>20+ Years Research Experience</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

             {/* Timeline Section */}
             <section className={styles.section}>
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    Event <span>Timeline</span>
                </motion.h2>
                <div className={styles.timeline}>
                    {[
                        { title: "Early Bird Registration Ends", date: "5th Feb" },
                        { title: "Abstract Submission Deadline", date: "20th Feb" },
                        { title: "Paper Submission Deadline", date: "5th Mar" },
                        { title: "APOGEE 2026", date: "28th Mar" }
                    ].map((item, index) => (
                        <motion.div 
                            key={index} 
                            className={styles.timelineItem}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className={styles.timelineContent}>
                                <span className={styles.date}>{item.date}</span>
                                <h3>{item.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Rules Section */}
            <section className={styles.section}>
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    Rules & <span>Guidelines</span>
                </motion.h2>
                <div className={styles.grid}>
                    <motion.div className={styles.card} whileHover={{ scale: 1.02 }}>
                        <h3>Submission</h3>
                        <p>All abstracts must be submitted in PDF format via the portal. Late submissions will not be accepted.</p>
                    </motion.div>
                    <motion.div className={styles.card} whileHover={{ scale: 1.02 }}>
                        <h3>Formatting</h3>
                        <p>Papers must follow the IEEE two-column format. Max page limit is 6 pages.</p>
                    </motion.div>
                    <motion.div className={styles.card} whileHover={{ scale: 1.02 }}>
                        <h3>Eligibility</h3>
                        <p>Open to all undergraduate students. Cross-college teams are allowed.</p>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className={styles.section}>
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    Frequently Asked <span>Questions</span>
                </motion.h2>
                <div className={styles.accordion}>
                    {faqs.map((faq, index) => (
                        <div key={index} className={styles.accordionItem}>
                            <button className={styles.accordionHeader} onClick={() => toggleFaq(index)}>
                                {faq.q}
                                {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                            <AnimatePresence>
                                {openFaq === index && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className={styles.accordionContent}
                                    >
                                        <div style={{ paddingBottom: '1.5rem' }}>{faq.a}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
