import { Star, Quote } from "lucide-react";
import styles from "./Testimonials.module.css";

const reviews = [
  {
    name: "Sarah Ahmed",
    role: "Verified Customer",
    initials: "SA",
    color: "purple",
    review:
      "Amazing shopping experience! The product quality was excellent and delivery was super fast.",
  },
  {
    name: "Ali Hassan",
    role: "Verified Customer",
    initials: "AH",
    color: "orange",
    review:
      "I love the variety of products here. The website is easy to use and the prices are reasonable.",
  },
  {
    name: "Ayesha Khan",
    role: "Verified Customer",
    initials: "AK",
    color: "pink",
    review:
      "Great customer support and a smooth shopping experience. Definitely worth recommending!",
  },
];

function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span>HAPPY CUSTOMERS</span>
          <h2>What People Say About Us</h2>
          <p>Real experiences that make us love what we do.</p>
        </div>

        <div className={styles.reviewGrid}>
          {reviews.map((item) => (
            <div className={styles.card} key={item.initials}>
              <div className={styles.cardTop}>
                <Quote size={30} />
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>

              <p className={styles.review}>{item.review}</p>

              <div className={styles.customer}>
                <div className={`${styles.avatar} ${styles[item.color]}`}>
                  {item.initials}
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
