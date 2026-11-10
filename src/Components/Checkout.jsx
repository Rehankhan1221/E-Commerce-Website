import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Check,
} from "lucide-react";
import styles from "./Checkout.module.css";

function Checkout({ cartItems = [], onClearCart }) {
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shippingCost = shippingMethod === "express" ? 15 : 0;

  const orderTotal = subtotal + shippingCost;

  const handlePlaceOrder = () => {
    onClearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <main className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <Check size={45} />
          </div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for shopping with SHOPORA. Your demo order has been
            confirmed.
          </p>

          <h2>${orderTotal.toFixed(2)}</h2>

          <button onClick={() => navigate("/")}>
            Continue Shopping
            <ArrowRight size={18} />
          </button>
        </div>
      </main>
    );
  }
  if (cartItems.length === 0) {
    return (
      <main className={styles.successPage}>
        <div className={styles.successCard}>
          <ShoppingBag size={45} />

          <h1>Your Cart is Empty</h1>

          <p>Add some products before proceeding to checkout.</p>

          <button onClick={() => navigate("/")}>
            Continue Shopping
            <ArrowRight size={18} />
          </button>
        </div>
      </main>
    );
  }
  return (
    <main className={styles.checkoutPage}>
      <section className={styles.checkoutHero}>
        <div className={styles.breadcrumb}>
          <span onClick={() => navigate("/")}>Home</span>
          <ArrowRight size={15} />
          <span onClick={() => navigate("/cart")}>Cart</span>
          <ArrowRight size={15} />
          <span>Checkout</span>
        </div>

        <h1>
          Complete Your <span>Order</span>
        </h1>

        <p>Just a few more steps to get your favorites delivered.</p>
      </section>

      <section className={styles.checkoutContent}>
        <div className={styles.checkoutForm}>
          <h2>Delivery Information</h2>
          <p>Enter your details to receive your order.</p>

          <form
            id="checkoutForm"
            className={styles.deliveryForm}
            onSubmit={(e) => {
              e.preventDefault();
              handlePlaceOrder();
            }}
          >
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  minLength={3}
                  maxLength={50}
                  pattern="[A-Za-z ]+"
                  title="Name should contain letters only"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Please enter a valid email address, e.g. example@email.com"
                  maxLength={100}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+92 300 1234567"
                  pattern="(\+92|0)?[0-9]{10}"
                  title="Enter a valid Pakistani phone number"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>City *</label>
                <input
                  type="text"
                  placeholder="Enter your city"
                  minLength={2}
                  maxLength={40}
                  pattern="[A-Za-z ]+"
                  title="Enter a valid city name"
                  required
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Complete Address *</label>
                <textarea
                  placeholder="House number, street, area..."
                  rows="4"
                  minLength={10}
                  maxLength={200}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal code"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  title="Enter a valid 5-digit postal code"
                />
              </div>
            </div>
          </form>

          <h2>Shipping Method</h2>

          <div className={styles.shippingOptions}>
            <label className={styles.shippingOption}>
              <input
                type="radio"
                name="shipping"
                value="standard"
                checked={shippingMethod === "standard"}
                onChange={() => setShippingMethod("standard")}
              />
              <Truck size={23} />
              <div>
                <strong>Standard Delivery</strong>
                <span>5–7 business days</span>
              </div>
              <strong>FREE</strong>
            </label>

            <label className={styles.shippingOption}>
              <input
                type="radio"
                name="shipping"
                value="express"
                checked={shippingMethod === "express"}
                onChange={() => setShippingMethod("express")}
              />
              <Truck size={23} />
              <div>
                <strong>Express Delivery</strong>
                <span>1–2 business days</span>
              </div>
              <strong>$15.00</strong>
            </label>
          </div>

          <h2>Payment Method</h2>

          <div className={styles.paymentOptions}>
            <label className={styles.paymentOption}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <div className={styles.paymentInfo}>
                <strong>Cash on Delivery</strong>
                <span>Pay when your order arrives.</span>
              </div>
              <span className={styles.paymentBadge}>Popular</span>
            </label>

            <label className={styles.paymentOption}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <div className={styles.paymentInfo}>
                <strong>Credit / Debit Card</strong>
                <span>Demo card payment option.</span>
              </div>
              <ShieldCheck size={22} />
            </label>
          </div>

          <button
            type="submit"
            form="checkoutForm"
            className={styles.placeOrderButton}
          >
            Place Order
            <ArrowRight size={19} />
          </button>

          <button
            className={styles.backButton}
            onClick={() => navigate("/cart")}
          >
            <ArrowLeft size={17} />
            Back to Cart
          </button>
        </div>

        <aside className={styles.orderSummary}>
          <h2>
            <ShoppingBag size={21} />
            Your Order
          </h2>

          {cartItems.map((item) => (
            <div className={styles.orderItem} key={item.id}>
              <img src={item.image} alt={item.name} />

              <div>
                <h4>{item.name}</h4>
                <span>Qty: {item.quantity}</span>
              </div>

              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}

          <div className={styles.checkoutTotals}>
            <div>
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>

            <div>
              <span>Shipping</span>
              <strong>
                {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
              </strong>
            </div>

            <div className={styles.checkoutGrandTotal}>
              <span>Total</span>
              <strong>${orderTotal.toFixed(2)}</strong>
            </div>
          </div>
          <div className={styles.securityNote}>
            <ShieldCheck size={20} />
            Secure checkout experience
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Checkout;
