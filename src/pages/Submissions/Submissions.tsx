import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { API_BASE_URL } from "../../config";
import styles from "./Submissions.module.scss";

const Submissions: React.FC = () => {
    // Deadlines
    const DEADLINE_ABSTRACT = new Date("2026-02-20T23:59:59");
    const DEADLINE_PAPER = new Date("2026-03-05T23:59:59");
    
    const currentDate = new Date();
    const isAbstractOpen = currentDate <= DEADLINE_ABSTRACT;
    const isPaperOpen = currentDate <= DEADLINE_PAPER;

    // Abstract Submission State
    const [abstractFormData, setAbstractFormData] = useState({
        email: "",
        google_form_url: "",
    });
    const [abstractLoading, setAbstractLoading] = useState(false);
    const [abstractSuccess, setAbstractSuccess] = useState("");
    const [abstractError, setAbstractError] = useState("");

    // Paper Submission State
    const [paperFormData, setPaperFormData] = useState({
        email: "",
        paper_url: "",
    });
    const [paperLoading, setPaperLoading] = useState(false);
    const [paperSuccess, setPaperSuccess] = useState("");
    const [paperError, setPaperError] = useState("");

    // Handlers for Abstract
    const handleAbstractChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAbstractFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAbstractSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAbstractLoading(true);
        setAbstractError("");
        setAbstractSuccess("");

        axios
            .post(`${API_BASE_URL}/registrations/abstract_submission/`, abstractFormData)
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setAbstractSuccess("Abstract submitted successfully!");
                    setAbstractFormData({ email: "", google_form_url: "" });
                } else {
                    setAbstractError(response.data.error || response.data.message || "Submission failed");
                }
            })
            .catch((error) => {
                setAbstractError(
                    error.response?.data?.error ||
                    error.response?.data?.message ||
                    error.message ||
                    "Network error. Please try again later."
                );
            })
            .finally(() => {
                setAbstractLoading(false);
            });
    };

    // Handlers for Paper
    const handlePaperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaperFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePaperSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPaperLoading(true);
        setPaperError("");
        setPaperSuccess("");

        axios
            .post(`${API_BASE_URL}/registrations/paper_submission/`, paperFormData)
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setPaperSuccess("Paper submitted successfully!");
                    setPaperFormData({ email: "", paper_url: "" });
                } else {
                    setPaperError(response.data.error || response.data.message || "Submission failed");
                }
            })
            .catch((error) => {
                setPaperError(
                    error.response?.data?.error ||
                    error.response?.data?.message ||
                    error.message ||
                    "Network error. Please try again later."
                );
            })
            .finally(() => {
                setPaperLoading(false);
            });
    };

    return (
        <>
            <Navbar />
            <div className={styles.page}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Submissions
                </motion.h1>

                <div className={styles.submissionsGrid}>
                    {/* Abstract Submission Section */}
                    <div className={styles.submissionColumn}>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                        >
                            Abstract Submission
                        </motion.h2>
                        <motion.div
                            className={styles.formContainer}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {isAbstractOpen ? (
                                <>
                                    {abstractError && <div className={styles.error}>{abstractError}</div>}
                                    {abstractSuccess && <div className={styles.success}>{abstractSuccess}</div>}
                                    {!abstractSuccess && (
                                        <div className={styles.info}>
                                            <strong>Deadline: 20th Feb 2026</strong>
                                            <p>Please ensure you have registered before submitting your abstract.</p>
                                        </div>
                                    )}

                                    <form onSubmit={handleAbstractSubmit}>
                                        <div className={styles.formGroup}>
                                            <label>
                                                Registered Email <span className={styles.required}>*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Enter your registered email"
                                                required
                                                value={abstractFormData.email}
                                                onChange={handleAbstractChange}
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>
                                                Drive Link of Abstract <span className={styles.required}>*</span>
                                            </label>
                                            <input
                                                type="url"
                                                name="google_form_url"
                                                placeholder="https://drive.google.com/..."
                                                required
                                                value={abstractFormData.google_form_url}
                                                onChange={handleAbstractChange}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className={styles.submitButton}
                                            disabled={abstractLoading}
                                        >
                                            {abstractLoading ? "Submitting..." : "Submit Abstract"}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className={styles.deadlineClosed}>
                                    <h2>Submissions Closed</h2>
                                    <p>The deadline for abstract submission has passed.</p>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Paper Submission Section */}
                    <div className={styles.submissionColumn}>
                        <motion.h2
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            Paper Submission
                        </motion.h2>
                        <motion.div
                            className={styles.formContainer}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {isPaperOpen ? (
                                <>
                                    {paperError && <div className={styles.error}>{paperError}</div>}
                                    {paperSuccess && <div className={styles.success}>{paperSuccess}</div>}
                                    {!paperSuccess && (
                                        <div className={styles.info}>
                                            <strong>Deadline: 5th Mar 2026</strong>
                                            <p>Abstract submission must be cleared before submitting your paper.</p>
                                        </div>
                                    )}

                                    <form onSubmit={handlePaperSubmit}>
                                        <div className={styles.formGroup}>
                                            <label>
                                                Registered Email <span className={styles.required}>*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Enter your registered email"
                                                required
                                                value={paperFormData.email}
                                                onChange={handlePaperChange}
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>
                                                Drive Link of Paper <span className={styles.required}>*</span>
                                            </label>
                                            <input
                                                type="url"
                                                name="paper_url"
                                                placeholder="https://drive.google.com/..."
                                                required
                                                value={paperFormData.paper_url}
                                                onChange={handlePaperChange}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className={styles.submitButton}
                                            disabled={paperLoading}
                                        >
                                            {paperLoading ? "Submitting..." : "Submit Paper"}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className={styles.deadlineClosed}>
                                    <h2>Submissions Closed</h2>
                                    <p>The deadline for paper submission has passed.</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Submissions;
