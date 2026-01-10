import React, { useState } from "react";
import styles from "./FormSection.module.scss";
import Register from "./Register/Register";
import Payment from "./Payment/Payment";

const FormSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"register" | "payment">(
    "register"
  );
  const [registeredEmail, setRegisteredEmail] = useState<string>("");

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={
            styles.tab + (activeTab === "register" ? ` ${styles.active}` : "")
          }
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
        <button
          className={
            styles.tab + (activeTab === "payment" ? ` ${styles.active}` : "")
          }
          onClick={() => setActiveTab("payment")}
        >
          Payment
        </button>
      </div>
      {activeTab === "register" && (
        <Register
          onSuccess={(email) => {
            setRegisteredEmail(email);
            setActiveTab("payment");
          }}
        ></Register>
      )}
      {activeTab === "payment" && (
        <Payment initialEmail={registeredEmail}></Payment>
      )}
    </div>
  );
};

export default FormSection;
