import { useState } from "react";
import { Send, Mail } from "lucide-react";
import styles from "./Newsletter.module.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setMessage("Thanks for subscribing to SHOPORA!");
    setEmail("");
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.icon}>
          <Mail size={28} />
        </div>

        <span className={styles.tag}>STAY IN THE LOOP</span>

        <h2>Get Exclusive Deals & Updates</h2>

        <p>
          Subscribe to our newsletter and never miss exciting offers, new
          arrivals and special discounts.
        </p>

        <form className={styles.form} onSubmit={handleSubscribe}>
          <div className={styles.inputBox}>
            <Mail size={19} />
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            Subscribe <Send size={16} />
          </button>
        </form>

        {message && <div className={styles.message}>{message}</div>}

        <small>No spam. Just amazing deals and updates.</small>
      </div>
    </section>
  );
}

export default Newsletter;
