import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./FormSection.module.scss";
import Register from "./Register/Register";
import Payment from "./Payment/Payment";

const FormSection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"register" | "payment">(
    "register"
  );
  const [registeredEmail, setRegisteredEmail] = useState<string>("");

  useEffect(() => {
    // Check if there are payment status parameters in the URL
    const orderId = searchParams.get('order_id');
    const status = searchParams.get('status');
    const errorMessage = searchParams.get('message');

    // If payment status parameters are present, switch to payment tab
    if ((status && orderId) || errorMessage) {
      setActiveTab("payment");
    }
  }, [searchParams]);

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
