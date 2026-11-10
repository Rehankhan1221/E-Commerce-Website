import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Tag,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from "./Cart.module.css";

function Cart({ cartItems = [], onUpdateQuantity, onRemoveItem, onClearCart }) {
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);

  const allSelected =
    cartItems.length > 0 &&
    cartItems.every((item) => selectedItems.includes(item.id));

  const toggleSelectAll = () => {
    setSelectedItems(allSelected ? [] : cartItems.map((item) => item.id));
  };

  const toggleItemSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 10;
  const total = subtotal + shipping;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <main className={styles.cartPage}>
      {/* Cart Hero */}
      <section className={styles.cartHero}>
        <div className={styles.breadcrumb}>
          <span onClick={() => navigate("/")}>Home</span>
          <ArrowRight size={15} />
          <span>Shopping Cart</span>
        </div>

        <div className={styles.heroContent}>
          <div>
            <span className={styles.heroLabel}>YOUR SHOPPING BAG</span>

            <h1>
              Your Shopping <span>Cart</span>
            </h1>

            <p>Review your items and proceed to checkout.</p>
          </div>

          <div className={styles.heroIcon}>
            <ShoppingCart size={90} strokeWidth={1.4} />
          </div>
        </div>
      </section>

      {/* Cart Content */}
      {cartItems.length === 0 ? (
        <section className={styles.emptyCart}>
          <div className={styles.emptyIcon}>
            <ShoppingCart size={65} />
          </div>

          <h2>Your Cart is Empty!</h2>

          <p>Looks like you haven't added anything to your cart yet.</p>

          <button onClick={() => navigate("/")}>
            Explore Products <ArrowRight size={18} />
          </button>
        </section>
      ) : (
        <section className={styles.cartLayout}>
          {/* Product List */}
          <div className={styles.cartProducts}>
            <div className={styles.productsHeader}>
              <h2>
                Shopping Cart <span>({totalItems} items)</span>
              </h2>

              <div className={styles.cartActions}>
                <label>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                  Select All
                </label>

                <button
                  onClick={() => {
                    if (selectedItems.length === 0) return;

                    selectedItems.forEach(onRemoveItem);
                    setSelectedItems([]);
                  }}
                  disabled={selectedItems.length === 0}
                >
                  <Trash2 size={16} />
                  Remove Selected
                </button>

                <button
                  onClick={() => {
                    onClearCart?.();
                    setSelectedItems([]);
                  }}
                >
                  Remove All
                </button>
              </div>
            </div>

            {cartItems.map((item) => (
              <article className={styles.cartItem} key={item.id}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleItemSelection(item.id)}
                  aria-label={`Select ${item.name}`}
                />

                <div className={styles.productImage}>
                  <img src={item.image} alt={item.name} />
                </div>

                <div className={styles.productDetails}>
                  <span className={styles.productCategory}>
                    {item.category}
                  </span>

                  <h3>{item.name}</h3>

                  <div className={styles.productRating}>
                    ★ {item.rating} ({item.reviews} reviews)
                  </div>

                  <div className={styles.productPrice}>
                    <strong>${item.price.toFixed(2)}</strong>
                    <del>${item.oldPrice.toFixed(2)}</del>
                  </div>
                </div>

                <div className={styles.quantityControl}>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={15} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <div className={styles.itemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  className={styles.removeButton}
                  onClick={() => onRemoveItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={19} />
                </button>
              </article>
            ))}

            <button
              className={styles.continueShopping}
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </button>
          </div>

          {/* Order Summary */}
          <aside className={styles.orderSummary}>
            <div className={styles.summaryHeader}>
              <Tag size={22} />
              <h2>Order Summary</h2>
            </div>

            <div className={styles.summaryBody}>
              <div className={styles.summaryRow}>
                <span>Subtotal ({totalItems} items)</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <strong className={styles.shippingValue}>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </strong>
              </div>

              <div className={styles.shippingMessage}>
                <ShieldCheck size={17} />
                {shipping === 0
                  ? "You qualify for free shipping!"
                  : `Add $${(100 - subtotal).toFixed(2)} more for free shipping.`}
              </div>

              <div className={styles.summaryDivider}></div>

              <div className={styles.totalRow}>
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>

              <button
                className={styles.checkoutButton}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
                <ArrowRight size={19} />
              </button>

              <div className={styles.securityNote}>
                <ShieldCheck size={22} />
                <div>
                  <strong>Secure & Safe Shopping</strong>
                  <span>Your information is protected.</span>
                </div>
              </div>
            </div>
          </aside>
        </section>
      )}

      {/* Special Offer */}
      <section className={styles.cartOffer}>
        <div className={styles.offerIcon}>
          <Tag size={35} />
        </div>

        <div>
          <h2>Special Offer!</h2>
          <p>Get 10% off on your next order.</p>
        </div>

        <div className={styles.couponCode}>
          Use code: <strong>SHOP10</strong>
        </div>

        <button onClick={() => navigate("/")}>
          Shop More <ArrowRight size={17} />
        </button>
      </section>
    </main>
  );
}

export default Cart;
