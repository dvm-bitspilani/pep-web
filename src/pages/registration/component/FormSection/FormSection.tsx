import React, { useState } from "react";
import styles from "./FormSection.module.scss";

type CategoryOption = {
    label: string;
    value: string;
};

const CATEGORY_OPTIONS: CategoryOption[] = [
    { label: "CS/IT", value: "cs_it" },
    { label: "Economics/Finance", value: "economics_finance" },
    { label: "Electrical (EEE/ENI/ECE)", value: "electrical" },
    { label: "Physics", value: "physics" },
    { label: "Chemistry", value: "chemistry" },
    { label: "Maths", value: "maths" },
    { label: "Biology", value: "biology" },
    { label: "Civil", value: "civil" },
    { label: "Mechanics", value: "mechanics" },
    { label: "Chemical", value: "chemical" },
    { label: "Humanities and Social Science", value: "humanities_social_science" },
    { label: "Management", value: "management" },
];

const FormSection: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        coAuthor: "",
        email: "",
        contact: "",
        institute: "",
        category: "",
        title: "",
        driveLink: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };

    return (
        <div className={styles.container}>

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
                    <label>Co-Author Name (optional)</label>
                    <input
                        type="text"
                        name="coAuthor"
                        placeholder="Co-author name"
                        value={formData.coAuthor}
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
                        name="contact"
                        placeholder="+91 XXXXX XXXXX"
                        required
                        value={formData.contact}
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
                            <option key={category.label} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select></div>

                <div className={styles.formGroup}>
                    <label>
                        Title of Your Paper <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter the complete title of your research paper"
                        required
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>
                        Google Drive Link <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="url"
                        name="driveLink"
                        placeholder="https://drive.google.com/..."
                        required
                        value={formData.driveLink}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className={styles.registerButton}>
                    Register
                </button>
            </form>

        </div>
    );
};

export default FormSection;

