import styles from "./Registration.module.scss";
import Sidebar from "./component/Sidebar/Sidebar";
import FormSection from "./component/FormSection/FormSection";

function Registration() {
    return (
        <div className={styles.page}>
        <Sidebar></Sidebar>
        <FormSection></FormSection>
        </div>
    )
}

export default Registration
