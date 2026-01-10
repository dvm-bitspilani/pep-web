import React, { useState, useRef } from "react";
import styles from "./Register.module.scss";
import axios from "axios";
import { API_BASE_URL } from "../../../../../config";

const CATEGORY_OPTIONS = [
  "CS/IT",
  "Economics/Finance",
  "Electrical",
  "Physics",
  "Chemistry",
  "Maths",
  "Biology",
  "Civil",
  "Mechanics",
  "Chemical",
  "Humanities and Social Sciences",
  "Management",
];

const Register: React.FC<{ onSuccess: (email: string) => void }> = ({
  onSuccess,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_number: "",
    institute: "",
    paper_title: "",
    category: "",
    co_author1: "",
    co_author2: "",
    google_form_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    axios
      .post(`${API_BASE_URL}/registrations/register/`, formData)
      .then((response) => {
        if (response.status === 201) {
          setSuccess(`Registration successful!`);
          setTimeout(() => {
            onSuccess(formData.email);
          }, 2000);
        } else {
          setError(
            response.data.error ||
              response.data.message ||
              "Registration failed"
          );
        }
      })
      .catch((error) => {
        // console.error("There was an error submitting the form!", error);
        setError(
          error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "Network error. Please check if the backend is running."
        );
      })
      .finally(() => {
        scrollRef.current?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoading(false);
      });
  };

  return (
    <div className={styles.container} ref={scrollRef}>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
      <form className={styles.paperForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>
            Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Co-Author 1 Name (optional)</label>
          <input
            type="text"
            name="co_author1"
            placeholder="Co-author name"
            value={formData.co_author1}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Co-Author 2 Name (optional)</label>
          <input
            type="text"
            name="co_author2"
            placeholder="Co-author name"
            value={formData.co_author2}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            Email ID <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="your.email@institution.edu"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            Contact <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            name="contact_number"
            placeholder="Enter 10-digit number"
            required
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            value={formData.contact_number}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            Institute <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="institute"
            placeholder="Your university or institution name"
            required
            value={formData.institute}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            Category <span className={styles.required}>*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>
            Title of Your Paper <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="paper_title"
            placeholder="Enter the complete title of your research paper"
            required
            value={formData.paper_title}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            Google Drive Link <span className={styles.required}>*</span>
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
          className={styles.registerButton}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
