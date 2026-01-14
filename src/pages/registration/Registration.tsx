import Navbar from "../../components/Navbar/Navbar";
import styles from "./Registration.module.scss";
import FormSection from "./component/FormSection/FormSection";
import Sidebar from "./component/Sidebar/Sidebar";


function Registration() {
    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.backgroundAnimation}>
                <div className={styles.blob1}></div>
                <div className={styles.blob2}></div>
                <div className={styles.blob3}></div>
            </div>
            
            <div className={styles.contentWrapper} style={{ paddingTop: '80px' }}>
                <Sidebar />
                <FormSection />
            </div>
        </div>
    )
}

export default Registration;
