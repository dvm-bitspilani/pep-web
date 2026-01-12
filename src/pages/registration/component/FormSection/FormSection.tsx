import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./FormSection.module.scss";
import Payment from "./Payment/Payment";
import Register from "./Register/Register";

const FormSection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"register" | "payment">("register");
  const [registeredEmail, setRegisteredEmail] = useState<string>("");

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    const status = searchParams.get('status');
    const errorMessage = searchParams.get('message');

    if ((status && orderId) || errorMessage) {
      setActiveTab("payment");
    }
  }, [searchParams]);

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className={styles.glassCard}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "register" ? styles.active : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Register
            {activeTab === "register" && (
              <motion.div
                className={styles.activeIndicator}
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
          <button
            className={`${styles.tab} ${activeTab === "payment" ? styles.active : ""}`}
            onClick={() => setActiveTab("payment")}
          >
            Payment
            {activeTab === "payment" && (
              <motion.div
                className={styles.activeIndicator}
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        </div>

        <div className={styles.contentContainer}>
          <AnimatePresence mode="wait">
            {activeTab === "register" ? (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                style={{ width: "100%" }}
              >
                <Register
                  onSuccess={(email) => {
                    setRegisteredEmail(email);
                    setActiveTab("payment");
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                style={{ width: "100%" }}
              >
                <Payment initialEmail={registeredEmail} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default FormSection;
