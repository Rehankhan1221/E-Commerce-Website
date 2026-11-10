import { Truck, ShieldCheck, RefreshCcw, Headset } from "lucide-react";
import styles from "./WhyChooseUs.module.css";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Enjoy free delivery on orders above $50.",
    color: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "Your payments are always safe and protected.",
    color: "purple",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "Simple and hassle-free return process.",
    color: "orange",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "We're always here whenever you need help.",
    color: "pink",
  },
];

function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span>THE SHOPORA EXPERIENCE</span>
          <h2>Why Shop With Us?</h2>
          <p>We make your shopping experience simple, safe and enjoyable.</p>
        </div>

        <div className={styles.benefits}>
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div className={styles.card} key={index}>
                <div className={`${styles.iconBox} ${styles[item.color]}`}>
                  <Icon size={28} strokeWidth={1.8} />
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
