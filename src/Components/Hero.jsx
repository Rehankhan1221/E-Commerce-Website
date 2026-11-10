import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  Headphones,
  RefreshCcw,
} from "lucide-react";

import styles from "./Hero.module.css";

const slides = [
  {
    tag: "MEGA SALE",
    title: "Upgrade Your",
    highlight: "Style",
    discount: "70%",
    description:
      "Discover the latest tech, fashion and lifestyle essentials at amazing prices.",
    button: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=1000&auto=format&fit=crop",
    secondaryImage:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop",
  },
  {
    tag: "NEW COLLECTION",
    title: "Discover Your",
    highlight: "Next Favorite",
    discount: "50%",
    description:
      "Explore trending products and bring something special into your everyday life.",
    button: "Explore Now",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop",
    secondaryImage:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop",
  },
];

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroVisualRef = useRef(null);

  useEffect(() => {
    const heroVisual = heroVisualRef.current;

    if (!heroVisual) return;

    const handleScroll = () => {
      const movement = (window.scrollY - heroVisual.offsetTop) * 0.15;

      const limitedMovement = Math.max(-70, Math.min(movement, 70));

      heroVisual.style.setProperty("--parallax-offset", `${limitedMovement}px`);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const currentSlide = slides[activeSlide];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <span className={styles.saleTag}>
            <span className={styles.tagDot}></span>
            {currentSlide.tag}
          </span>

          <h1>
            {currentSlide.title}
            <span>{currentSlide.highlight}</span>
          </h1>

          <div className={styles.discountText}>
            Up to <strong>{currentSlide.discount}</strong> OFF
          </div>

          <p>{currentSlide.description}</p>

          <button className={styles.shopButton}>
            {currentSlide.button}
            <ArrowRight size={19} />
          </button>

          <div className={styles.customerInfo}>
            <div className={styles.avatarGroup}>
              <span>R</span>
              <span>A</span>
              <span>S</span>
              <span>M</span>
            </div>

            <div>
              <strong>10k+ Happy Customers</strong>
              <small>Shopping made better</small>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual} ref={heroVisualRef}>
          <div className={styles.glowCircle}></div>

          <div className={styles.discountBadge}>
            <span>UP TO</span>
            <strong>{currentSlide.discount}</strong>
            <span>OFF</span>
          </div>

          <div className={styles.mainProduct}>
            <img src={currentSlide.image} alt="Featured SHOPORA product" />
          </div>

          <div className={styles.secondaryProduct}>
            <img src={currentSlide.secondaryImage} alt="Featured headphones" />
          </div>

          <div className={styles.productLabel}>
            <span>SHOPORA</span>
            <strong>Trending Products</strong>
          </div>
        </div>

        <button
          className={`${styles.sliderArrow} ${styles.prevArrow}`}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={23} />
        </button>

        <button
          className={`${styles.sliderArrow} ${styles.nextArrow}`}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={23} />
        </button>

        <div className={styles.sliderDots}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={activeSlide === index ? styles.activeDot : ""}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.benefits}>
        <div className={styles.benefitItem}>
          <Truck />
          <div>
            <strong>Free Shipping</strong>
            <span>On orders over $50</span>
          </div>
        </div>

        <div className={styles.benefitItem}>
          <ShieldCheck />
          <div>
            <strong>Secure Payment</strong>
            <span>100% protected</span>
          </div>
        </div>

        <div className={styles.benefitItem}>
          <Headphones />
          <div>
            <strong>24/7 Support</strong>
            <span>We're here to help</span>
          </div>
        </div>

        <div className={styles.benefitItem}>
          <RefreshCcw />
          <div>
            <strong>Easy Returns</strong>
            <span>30 days return policy</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
