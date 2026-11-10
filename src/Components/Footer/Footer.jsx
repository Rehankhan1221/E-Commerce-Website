import {
  ShoppingBag,
  Globe,
  MessageCircle,
  Camera,
  Code,
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <ShoppingBag size={27} />
              SHOPORA<span>.</span>
            </Link>

            <p>
              Discover amazing products, explore new styles and enjoy a better
              shopping experience with SHOPORA.
            </p>

            <div className={styles.socials}>
              <a href="#facebook" aria-label="Facebook">
                <Globe />
              </a>
              <a href="#instagram" aria-label="Instagram">
                <MessageCircle />
              </a>
              <a href="#twitter" aria-label="Twitter">
                <Camera />
              </a>
              <a href="#github" aria-label="GitHub">
                <Code />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.column}>
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/Course">Our Products</Link>
            <Link to="/Tasks">Latest Deals</Link>
            <Link to="/Profile">My Account</Link>
          </div>

          {/* Categories */}
          <div className={styles.column}>
            <h3>Categories</h3>
            <a href="#electronics">Electronics</a>
            <a href="#fashion">Fashion</a>
            <a href="#shoes">Shoes</a>
            <a href="#watches">Watches</a>
            <a href="#accessories">Accessories</a>
          </div>

          {/* Contact */}
          <div className={styles.column}>
            <h3>Contact Us</h3>

            <div className={styles.contact}>
              <MapPin size={17} />
              <span>Nowshera, Pakistan</span>
            </div>

            <div className={styles.contact}>
              <Mail size={17} />
              <span>support@shopora.com</span>
            </div>

            <div className={styles.contact}>
              <Phone size={17} />
              <span>+92 3409233253</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} SHOPORA. All rights reserved.</p>

          <div className={styles.bottomLinks}>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>
          </div>

          <a href="#" className={styles.backTop}>
            Back to top <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
