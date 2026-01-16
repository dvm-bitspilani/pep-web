import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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
    // Mouse Motion Values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const maskImage = useMotionTemplate`radial-gradient(
        400px circle at ${mouseX}px ${mouseY}px,
        black 0%,
        transparent 100%
    )`;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

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
                {/* Interactive Background */}
                <motion.div 
                    className={styles.interactiveBackground}
                    style={{ maskImage, WebkitMaskImage: maskImage }}
                />
                
                <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ zIndex: 2 }}>
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
                    <motion.div className={styles.card} style={{ gridColumn: '1 / -1' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h3>Registration Rules</h3>
                        <ol style={{ paddingLeft: '20px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.8' }}>
                            <li style={{ marginBottom: '10px' }}>Any team/individual participating in the event must currently be enrolled in any undergraduate course in a college.</li>
                            <li style={{ marginBottom: '10px' }}>Submissions are invited across all academic departments of BITS Pilani, including but not limited to Biological Sciences, Chemical Engineering, Chemistry, Civil Engineering, Computer Science, Economics, Electrical & Electronics Engineering, Humanities and Social Sciences, Mechanical Engineering, Mathematics, Physics, and Pharmacy. Participants must select the most appropriate category at the time of submission.</li>
                            <li style={{ marginBottom: '10px' }}>There can be a maximum of 2 co-authors mentioned in the submission form. Only the author has to make submissions. (A team of total 3 members is allowed - 1 author, 2 co authors, this can be relaxed on a case-by-case basis).</li>
                            <li style={{ marginBottom: '10px' }}>Participants may submit original research papers, review papers, design projects, or case studies. The work must be original, unpublished, and authored by the participants. Papers developed as part of academic coursework, internships, or research projects may be submitted, provided the work is original and all collaborations, guidance, or institutional support are clearly acknowledged.</li>
                            <li style={{ marginBottom: '10px' }}>It is expected that the abstract is submitted before the deadline as we get these abstracts verified. The professors will review these abstracts and the scores and comments (if any) will be shared with you. You can use these to update your paper as per the scope of the competition and the expectations of judges.</li>
                            <li style={{ marginBottom: '10px' }}>The paper submission deadline is strict and should be adhered to.</li>
                            <li style={{ marginBottom: '10px' }}>There will be a strict plagiarism and AI check at each stage. Failure to meet it would lead to straight disqualification without intimation.</li>
                            <li style={{ marginBottom: '10px' }}>Each submission must strictly adhere to the formatting guidelines mentioned below. (We have also attached the sample LaTeX files)</li>
                            <li style={{ marginBottom: '10px' }}>If the paper was written with the help of a professor, the name and contact details of the same must be shared.</li>
                            <li style={{ marginBottom: '10px' }}>Participants are allowed to submit multiple papers. But they might be restricted while presenting during APOGEE due to available time slots.</li>
                            <li style={{ marginBottom: '10px' }}>The evaluation of papers will be conducted online by BITS Pilani faculty. Selected finalists will be required to present their papers via an online meet during APOGEE at BITS Pilani, subject to schedule and time-slot availability.</li>
                            <li style={{ marginBottom: '10px' }}>Participation certificates will be awarded to all teams whose papers are accepted and successfully presented as per the competition guidelines.</li>
                            <li style={{ marginBottom: '10px' }}>All official communication regarding submissions, reviews, and presentations will be shared via the registered email ID. For queries, participants may contact the Paper Presentation team through the details provided on the official website.</li>
                        </ol>
                    </motion.div>

                    <motion.div className={styles.card} style={{ gridColumn: '1 / -1' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h3>Format Guidelines</h3>
                        <p style={{ marginBottom: '15px' }}>This conference uses the IEEE format while accepting paper submissions.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <a 
                                href="https://docs.google.com/document/d/1EjJqchIqQEU1iqOL18_rxgkwvdwfyvZg/edit?usp=sharing&ouid=117805771559184851792&rtpof=true&sd=true" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: '#00f3ff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <span>📄 Abstract Submission Format</span>
                            </a>
                            <a 
                                href="https://docs.google.com/document/d/1ogQ0l24drsTZBc3gTs4fGhtlQcm-W1YI/edit?usp=sharing&ouid=117805771559184851792&rtpof=true&sd=true" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: '#00f3ff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <span>📄 Paper Submission Format</span>
                            </a>
                        </div>
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
