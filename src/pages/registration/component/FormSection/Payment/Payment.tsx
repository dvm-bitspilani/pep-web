import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Payment.module.scss";
import axios from "axios";
import { API_BASE_URL } from "../../../../../config";

const Payment: React.FC<{ initialEmail?: string }> = ({ initialEmail }) => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(initialEmail || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentData, setPaymentData] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<{
    type: 'success' | 'failure' | 'pending' | 'error' | null;
    message: string;
    orderId?: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    setEmail(initialEmail || "");
  }, [initialEmail]);

  useEffect(() => {
    // Check for payment status from URL parameters
    const orderId = searchParams.get('order_id');
    const status = searchParams.get('status');
    const errorMessage = searchParams.get('message');

    if (status === 'success' && orderId) {
      setPaymentStatus({
        type: 'success',
        message: 'Payment completed successfully! You will receive a confirmation email shortly.',
        orderId
      });
    } else if (status === 'failure' && orderId) {
      setPaymentStatus({
        type: 'failure',
        message: 'Payment failed. Please try again or contact support if the issue persists.',
        orderId
      });
    } else if (status === 'pending' && orderId) {
      setPaymentStatus({
        type: 'pending',
        message: 'Payment is being processed. Please wait while we confirm the transaction.',
        orderId
      });
    } else if (errorMessage) {
      setPaymentStatus({
        type: 'error',
        message: `Payment error: ${errorMessage}`
      });
    }
  }, [searchParams]);

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
      {paymentStatus.type && (
        <div className={
          paymentStatus.type === 'success' ? styles.success :
          paymentStatus.type === 'failure' ? styles.failure :
          paymentStatus.type === 'pending' ? styles.pending :
          styles.error
        }>
          {paymentStatus.orderId && (
            <div style={{ marginBottom: '0.5vw', fontWeight: 'bold' }}>
              Order ID: {paymentStatus.orderId}
            </div>
          )}
          {paymentStatus.message}
        </div>
      )}
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
