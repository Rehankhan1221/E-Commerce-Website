import { useEffect, useState } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import styles from "./SpecialOffer.module.css";

function SpecialOffer() {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAd(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!showAd) return null;

  return (
    <div className={styles.adContainer}>
      <button
        className={styles.closeButton}
        onClick={() => setShowAd(false)}
        aria-label="Close advertisement"
      >
        <X size={18} />
      </button>

      <span className={styles.adTag}>
        <Sparkles size={13} />
        SPECIAL OFFER
      </span>

      <div className={styles.adImage}>
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
          alt="Special offer sneakers"
        />

        <span className={styles.discountBadge}>50% OFF</span>
      </div>

      <div className={styles.adContent}>
        <h3>Big Deals. Bigger Savings!</h3>

        <p>
          Grab your favorite products at amazing prices. Limited time offer!
        </p>

        <button className={styles.adButton}>
          Shop Now
          <ArrowRight size={16} />
        </button>
      </div>

      <span className={styles.adFooter}>SHOPORA • DON'T MISS OUT</span>
    </div>
  );
}

export default SpecialOffer;
