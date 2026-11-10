import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import styles from "./Wishlist.module.css";

function Wishlist({
  wishlist = [],
  onToggleWishlist,
  onAddToCart,
  cartItems = [],
}) {
  const navigate = useNavigate();

  return (
    <section className={styles.wishlistPage}>
      <div className={styles.wishlistHeader}>
        <span className={styles.eyebrow}>YOUR FAVORITES</span>
        <h1>
          My <span>Wishlist</span>
        </h1>
        <p>All the products you love, saved in one place.</p>
        <span className={styles.itemCount}>
          {wishlist.length} Saved Products
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className={styles.emptyWishlist}>
          <div className={styles.emptyIcon}>
            <Heart size={38} />
          </div>

          <h2>Your wishlist is empty!</h2>
          <p>
            You haven't saved any products yet. Explore our collection and save
            your favorites here.
          </p>

          <button onClick={() => navigate("/")}>
            Explore Products <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <div className={styles.wishlistGrid}>
          {wishlist.map((product) => (
            <div className={styles.wishlistCard} key={product.id}>
              <div className={styles.productImage}>
                <img src={product.image} alt={product.name} />

                <button
                  className={styles.removeButton}
                  onClick={() => onToggleWishlist(product)}
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <div className={styles.productInfo}>
                <span>{product.category}</span>
                <h3>{product.name}</h3>

                <strong>${product.price}</strong>
                <button
                  className={styles.cartButton}
                  onClick={() => onAddToCart(product)}
                >
                  <ShoppingBag size={17} />

                  {cartItems.some((item) => item.id === product.id)
                    ? "Added to Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Wishlist;
