import { Link } from "react-router";
import apoogee from "../../../public/svgs/apogee26logo.svg";
import { contacts } from "./contactList";
import styles from "./Contacts.module.scss";
import contactIcon from "/Contacts/contactIcon.svg";

export default function Contacts(): React.ReactElement {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.title}>
                    <img src={apoogee} alt="APOGEE Logo" />
                </div>
                <Link to="/" style={{textDecoration: "none"}}>
                    <div className={styles.registerBtn}>
                        Register
                    </div>
                </Link>
            </header>

            <main className={styles.main}>
                <div className={styles.heading}>
                    <img src={contactIcon} alt="" className={styles.contactIcon} />
                    <span>Contact Us</span>
                </div>
                
                <div className={styles.box}>
                    {contacts.map((contact) => (
                        <div key={contact.id} className={styles.card}>
                            <div className={styles.info}>
                                <h3 className={styles.name}>{contact.name}</h3>
                                
                                {/* Visible on Desktop */}
                                <div className={styles.detailsDesktop}>
                                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                    <span>|</span>
                                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                                </div>
                            </div>

                            {/* Visible on Mobile */}
                            <div className={styles.actionsMobile}>
                                <a
                                    href={`tel:${contact.phone}`}
                                    className={styles.iconBtn}
                                    title="Call"
                                >
                                    <svg
                                        className={styles.icon}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </a>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className={styles.iconBtn}
                                    title="Email"
                                >
                                    <svg
                                        className={styles.icon}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
