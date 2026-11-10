import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productApi";
import { Heart, ShoppingBag, Star, ArrowRight, Shuffle } from "lucide-react";

import styles from "./FeaturedProducts.module.css";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "../ScrollReveal/ScrollReveal";

function FeaturedProducts({
  wishlist,
  onToggleWishlist,
  onSearchChange,
  searchQuery = "",
  onAddNotification,
  onRemoveNotification,
  onAddToCart,
  cartItems = [],
}) {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();

        setApiProducts(products);
        setShuffledProducts(products);
        console.log("API Products:", products);
      } catch (err) {
        setError("Products load nahi ho sake.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);
  const formattedApiProducts = shuffledProducts.map((product) => ({
    id: `api-${product.id}`,
    name: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
    oldPrice: Number((product.price * 1.2).toFixed(2)),
    rating: product.rating,
    reviews: product.reviews.length,
    image: product.thumbnail,
    badge: "NEW",
    discount: "20% OFF",
  }));

  const allProducts = formattedApiProducts;

  const filteredProducts = allProducts.filter((product) => {
    const search = searchQuery.trim().toLowerCase();

    return (
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  });

  const visibleProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 8);
  const addToCart = (product) => {
    onAddToCart?.(product);
  };

  return (
    <>
      <section className={styles.productsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.eyebrow}>HANDPICKED FOR YOU</span>

            <h2>
              Featured <span>Products</span>
            </h2>

            <p>Discover our most loved products and latest trends.</p>
          </div>

          <div className={styles.headerActions}>
            {searchQuery && (
              <button
                className={styles.clearFilter}
                onClick={() => {
                  onSearchChange("");
                  setShowAll(false);
                }}
              >
                Clear Filter ✕
              </button>
            )}

            <button
              className={styles.shuffleButton}
              onClick={() => {
                const products = [...apiProducts];

                for (let i = products.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [products[i], products[j]] = [products[j], products[i]];
                }

                setShuffledProducts(products);
                setShowAll(false);
              }}
            >
              <Shuffle size={17} />
              Shuffle Products
            </button>

            <button
              className={styles.viewAll}
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "View Less" : "View All"}
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        <div className={styles.productGrid}>
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div className={styles.skeletonCard} key={index}>
                <div className={styles.skeletonImage}></div>

                <div className={styles.skeletonInfo}>
                  <div className={styles.skeletonCategory}></div>
                  <div className={styles.skeletonTitle}></div>
                  <div className={styles.skeletonRating}></div>
                  <div className={styles.skeletonPrice}></div>
                  <div className={styles.skeletonButton}></div>
                </div>
              </div>
            ))
          ) : error ? (
            <p className={`${styles.apiMessage} ${styles.apiError}`}>{error}</p>
          ) : filteredProducts.length === 0 ? (
            <p className={`${styles.apiMessage} ${styles.noResults}`}>
              No products found for "{searchQuery}"
            </p>
          ) : (
            visibleProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={(index % 4) * 100}>
                <div className={styles.productCard}>
                  <div className={styles.imageContainer}>
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => navigate(`/products/${product.id}`)}
                      style={{ cursor: "pointer" }}
                    />

                    <span className={styles.productBadge}>{product.badge}</span>

                    <span className={styles.discountBadge}>
                      {product.discount}
                    </span>

                    <button
                      className={styles.wishlistButton}
                      onClick={() => onToggleWishlist(product)}
                      aria-label="Toggle wishlist"
                    >
                      <Heart
                        size={19}
                        fill={
                          wishlist.some((item) => item.id === product.id)
                            ? "#ef4444"
                            : "none"
                        }
                        color={
                          wishlist.some((item) => item.id === product.id)
                            ? "#ef4444"
                            : "#252b3a"
                        }
                      />
                    </button>
                  </div>

                  <div className={styles.productInfo}>
                    <span className={styles.productCategory}>
                      {product.category}
                    </span>

                    <h3
                      onClick={() => navigate(`/products/${product.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {product.name}
                    </h3>

                    <div className={styles.rating}>
                      <Star size={15} fill="#ffb800" color="#ffb800" />
                      <strong>{product.rating}</strong>
                      <span>({product.reviews} reviews)</span>
                    </div>

                    <div className={styles.priceRow}>
                      <div className={styles.prices}>
                        <strong>${product.price}</strong>
                        <del>${product.oldPrice}</del>
                      </div>
                    </div>

                    <button
                      className={styles.addButton}
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingBag size={17} />

                      {cartItems.some((item) => item.id === product.id)
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))
          )}
        </div>
        <p className={styles.cartMessage}>
          {cartItems.length > 0
            ? `${cartItems.length} product(s) in your cart`
            : ""}
        </p>
      </section>
    </>
  );
}
export default FeaturedProducts;
