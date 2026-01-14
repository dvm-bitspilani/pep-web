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
        { 
            q: "Who can participate in the Paper Presentation competition?", 
            a: "Undergraduate students from any college or university across India are welcome to participate." 
        },
        { 
            q: "Can I participate individually or as a team?", 
            a: "You can participate individually or as a team of up to x members (needs to be specified). All members must be undergraduate students." 
        },
        { 
            q: "What are the paper categories?", 
            a: (
                <>
                    <p>Submissions are invited under all academic departments of BITS Pilani, including:</p>
                    <ul style={{ paddingLeft: '20px', marginTop: '10px', listStyleType: 'disc' }}>
                        <li>Biological Sciences</li>
                        <li>Chemical Engineering</li>
                        <li>Chemistry</li>
                        <li>Civil Engineering</li>
                        <li>Computer Science</li>
                        <li>Economics</li>
                        <li>Electrical & Electronics Engineering</li>
                        <li>Humanities and Social Sciences</li>
                        <li>Mechanical Engineering</li>
                        <li>Mathematics</li>
                        <li>Physics</li>
                        <li>Pharmacy</li>
                    </ul>
                    <p style={{ marginTop: '10px', fontStyle: 'italic', fontSize: '0.9em' }}>
                        (Participants can select the most relevant category for their work while submitting.)
                    </p>
                </>
            )
        },
        { 
            q: "What kind of papers can be submitted?", 
            a: "You may submit original research papers, review papers, design projects, or case studies. The work must be your own and should not have been published elsewhere." 
        },
        { 
            q: "How do I register and submit my paper?", 
            a: "Registration and submission links will be available on the official PEP website." 
        },
        { 
            q: "What is the judging process like?", 
            a: (
                <>
                    <p>Submissions are evaluated by BITS Pilani faculty members. Papers are judged based on:</p>
                    <ul style={{ paddingLeft: '20px', marginTop: '10px', listStyleType: 'disc' }}>
                        <li>Originality and relevance of research</li>
                        <li>Clarity of objectives and methodology</li>
                        <li>Quality of analysis and results</li>
                        <li>Presentation skills and ability to answer questions</li>
                    </ul>
                </>
            )
        },
        { 
            q: "What are the prizes?", 
            a: "Exciting cash prizes and certificates of excellence will be awarded to the best papers in each category." 
        },
        { 
            q: "Do I have to be present at BITS Pilani to present?", 
            a: "No, BITS Pilani professors will evaluate all submissions online." 
        },
        { 
            q: "Can I submit a paper I worked on as part of a course or internship?", 
            a: "Yes — as long as the work is your own and properly credited. Please make sure to mention any collaborations or acknowledgments in your paper." 
        },
        { 
            q: "Is there a registration fee?", 
            a: "Details regarding registration fees (if applicable) will be updated on the official website." 
        },
        { 
            q: "Will participants receive certificates?", 
            a: "Yes, all participants who successfully present their papers will receive participation certificates." 
        },
        { 
            q: "Who can I contact for queries?", 
            a: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                        <strong>Nitya Agarwal:</strong> +91 98737 77349<br/>
                        <a href="mailto:f20240749@pilani.bits-pilani.ac.in" style={{ color: 'inherit' }}>f20240749@pilani.bits-pilani.ac.in</a>
                    </div>
                    <div>
                        <strong>Anika Jha:</strong> +91 99007 24951<br/>
                        <a href="mailto:20240906@pilani.bits-pilani.ac.in" style={{ color: 'inherit' }}>20240906@pilani.bits-pilani.ac.in</a>
                    </div>
                </div>
            )
        }
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
                        { title: "APOGEE 2026", date: "TBA" }
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
