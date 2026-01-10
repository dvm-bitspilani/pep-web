import React, { useState, useEffect } from "react";
import styles from "./Payment.module.scss";
import axios from "axios";
import { API_BASE_URL } from "../../../../../config";

const Payment: React.FC<{ initialEmail?: string }> = ({ initialEmail }) => {
  const [email, setEmail] = useState(initialEmail || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    setEmail(initialEmail || "");
  }, [initialEmail]);

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPaymentData(null);

    axios
      .post(`${API_BASE_URL}/registrations/payment/`, { email_id: email })
      .then((response) => {
        if (response.status === 200) {
          setPaymentData(response.data);
          setTimeout(() => {
            submitToPaytm(response.data);
          }, 2000);
        } else {
          setError(
            response.data.error ||
              response.data.message ||
              "Payment initiation failed"
          );
        }
      })
      .catch((error) => {
        setError(
          error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "Network error. Please check if the backend is running."
        );
        // console.error("There was an error initiating the payment!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const submitToPaytm = (data: any) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.paytm_url;

    // Add all payment details as hidden fields
    Object.keys(data.payment_details).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = data.payment_details[key];
      form.appendChild(input);
    });

    // Add checksum
    const checksumInput = document.createElement("input");
    checksumInput.type = "hidden";
    checksumInput.name = "CHECKSUMHASH";
    checksumInput.value = data.checksum;
    form.appendChild(checksumInput);

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>{error}</div>}
      {/* {success && <div className={styles.success}>{success}</div>} */}
      {!paymentData ? (
        <>
          <div className={styles.info}>
            <strong>Registration Fee: ₹200</strong>
            <p>
              This is a one-time registration fee for PEP 2026.
            </p>
          </div>
          <form className={styles.paperForm} onSubmit={handlePayment}>
            <div className={styles.formGroup}>
              <label>
                Registered Email <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your registered email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className={styles.registerButton}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Payment"}
            </button>
          </form>
        </>
      ) : (
        <div className={styles.success}>
          <h3 style={{ marginBottom: "10px" }}>Payment Initiated!</h3>
          <p style={{ marginBottom: "10px" }}>
            Redirecting to Paytm payment gateway...
          </p>
          <div className={styles.invoice}>
            <div className={styles["invoice-row"]}>
              <span>Order ID:</span>
              <strong>{paymentData.payment_details.ORDER_ID}</strong>
            </div>
            <div className={styles["invoice-row"]}>
              <span>Email:</span>
              <strong>{paymentData.payment_details.EMAIL}</strong>
            </div>
            <div className={styles["invoice-row"]}>
              <span>Amount:</span>
              <strong>₹{paymentData.payment_details.TXN_AMOUNT}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
