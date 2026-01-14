import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { API_BASE_URL } from "../../config";
import styles from "./Submissions.module.scss";

const Submissions: React.FC = () => {
  // Hardcoded deadline for Abstract Submission
  const DEADLINE_ABSTRACT = new Date("2026-02-20T23:59:59");
  const currentDate = new Date();
  const isAbstractOpen = currentDate <= DEADLINE_ABSTRACT;

  const [formData, setFormData] = useState({
    email: "",
    google_form_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    axios
      .post(`${API_BASE_URL}/registrations/submit-abstract/`, formData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setSuccess("Abstract submitted successfully!");
          setFormData({ email: "", google_form_url: "" });
        } else {
          setError(
            response.data.error ||
              response.data.message ||
              "Submission failed"
          );
        }
      })
      .catch((error) => {
        setError(
          error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "Network error. Please try again later."
        );
      })
      .finally(() => {
        setLoading(false);
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
          Abstract Submission
        </motion.h1>

        <motion.div
          className={styles.formContainer}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isAbstractOpen ? (
            <>
              {error && <div className={styles.error}>{error}</div>}
              {success && <div className={styles.success}>{success}</div>}
              {!success && (
                <div className={styles.info}>
                  <strong>Deadline: 20th Feb 2026</strong>
                  <p>Please ensure you have registered before submitting your abstract.</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>
                    Registered Email <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your registered email"
                    required
                    value={formData.email}
                    onChange={handleChange}
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
                    value={formData.google_form_url}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Abstract"}
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
    </>
  );
};

export default Submissions;
