import styles from "./Registration.module.scss";
import FormSection from "./component/FormSection/FormSection";
import Sidebar from "./component/Sidebar/Sidebar";


function Registration() {
    return (
        <div className={styles.page}>
            <div className={styles.backgroundAnimation}>
                <div className={styles.blob1}></div>
                <div className={styles.blob2}></div>
                <div className={styles.blob3}></div>
            </div>
            
            <div className={styles.contentWrapper}>
                <Sidebar />
                <FormSection />
            </div>
        </div>
    )
}

export default Registration;
