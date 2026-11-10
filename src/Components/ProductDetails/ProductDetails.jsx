import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts } from "../../services/productApi";

import {
  Heart,
  ShoppingBag,
  Star,
  Plus,
  Minus,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
} from "lucide-react";

import styles from "./ProductDetails.module.css";
import ScrollReveal from "../ScrollReveal/ScrollReveal";

function ProductDetails({
  onAddToCart,
  cartItems = [],
  onAddNotification,
  onRemoveNotification,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const allProducts = apiProducts;

  const product = allProducts.find((item) => String(item.id) === id);

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();

        const formattedProducts = data.map((product) => ({
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

        setApiProducts(formattedProducts);
      } catch (err) {
        setError("Products load nahi ho sake.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [id]);

  if (loading) {
    return (
      <div className={styles.notFound}>
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.notFound}>
        <h2>{error}</h2>
        <button onClick={() => navigate("/")}>Back to Shop</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found!</h2>
        <button onClick={() => navigate("/")}>Back to Shop</button>
      </div>
    );
  }

  const cartProduct = cartItems.find((item) => item.id === product.id);

  const cartQuantity = cartProduct?.quantity || 0;

  const relatedProducts = allProducts.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );

  const secondaryProduct =
    relatedProducts[0] || allProducts.find((item) => item.id !== product.id);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart?.(product);
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const toggleWishlist = () => {
    setIsWishlisted((prev) => !prev);

    if (isWishlisted) {
      onRemoveNotification?.(product.id);
    } else {
      onAddNotification?.(
        `${product.name} added to your wishlist ❤️`,
        product.id,
      );
    }
  };

  return (
    <main className={styles.detailsPage}>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          <ArrowLeft size={17} />
          Continue Shopping
        </button>

        <div className={styles.breadcrumb}>
          <span onClick={() => navigate("/")}>Home</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <strong>{product.name}</strong>
        </div>

        <section className={styles.productHero}>
          {/* LEFT CONTENT */}

          <ScrollReveal>
            <div className={styles.heroContent}>
              <span className={styles.saleTag}>
                <span className={styles.tagDot}></span>
                {product.badge || "SHOPORA EXCLUSIVE"}
              </span>

              <span className={styles.category}>{product.category}</span>

              <h1>{product.name}</h1>

              <div className={styles.rating}>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={17}
                      fill={
                        star <= Math.round(product.rating) ? "#ffcf40" : "none"
                      }
                      color="#ffcf40"
                    />
                  ))}
                </div>

                <strong>{product.rating}</strong>
                <span>({product.reviews} reviews)</span>
              </div>

              <div className={styles.priceBox}>
                <strong>${product.price}</strong>

                {product.oldPrice > product.price && (
                  <del>${product.oldPrice}</del>
                )}
              </div>

              {discount > 0 && (
                <div className={styles.discountText}>
                  Limited Deal — Save <strong>{discount}%</strong>
                </div>
              )}

              <p className={styles.description}>{product.description}</p>

              <div className={styles.stock}>
                <span />
                In Stock — Ready to Ship
              </div>

              <div className={styles.quantitySection}>
                <span>Quantity</span>

                <div className={styles.quantityControl}>
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>

                  <strong>{quantity}</strong>

                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.addButton} onClick={handleAddToCart}>
                  {added ? <Check size={19} /> : <ShoppingBag size={19} />}
                  {added ? "Added Successfully" : "Add to Cart"}
                </button>

                <button
                  className={`${styles.wishlistButton} ${
                    isWishlisted ? styles.wishlisted : ""
                  }`}
                  onClick={toggleWishlist}
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    size={21}
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                </button>
              </div>

              {cartQuantity > 0 && (
                <p className={styles.cartStatus}>
                  <Check size={15} />
                  {cartQuantity} already in your cart
                </p>
              )}

              <div className={styles.customerInfo}>
                <div className={styles.benefitItem}>
                  <Truck size={21} />
                  <span>Free Shipping</span>
                </div>

                <div className={styles.benefitItem}>
                  <ShieldCheck size={21} />
                  <span>Secure Payment</span>
                </div>

                <div className={styles.benefitItem}>
                  <RotateCcw size={21} />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT PRODUCT VISUAL */}

          <ScrollReveal>
            <div className={styles.heroVisual}>
              <div className={styles.glowCircle}></div>

              <div className={styles.discountBadge}>
                <span>UP TO</span>
                <strong>{discount}%</strong>
                <span>OFF</span>
              </div>

              <div className={styles.mainProduct}>
                <img src={product.image} alt={product.name} />
              </div>

              {secondaryProduct && (
                <div className={styles.secondaryProduct}>
                  <img
                    src={secondaryProduct.image}
                    alt={secondaryProduct.name}
                  />
                </div>
              )}

              <div className={styles.productLabel}>
                <span>SHOPORA</span>
                <strong>{product.name}</strong>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* RELATED PRODUCTS */}

        <ScrollReveal>
          <section className={styles.relatedSection}>
            <span>YOU MAY ALSO LIKE</span>

            <h2>Explore More Products</h2>

            <div className={styles.relatedGrid}>
              {relatedProducts.slice(0, 4).map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 150}>
                  <div
                    className={styles.relatedCard}
                    onClick={() => {
                      navigate(`/products/${item.id}`);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <img src={item.image} alt={item.name} />
                    <span>{item.category}</span>
                    <h3>{item.name}</h3>
                    <strong>${item.price}</strong>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>
    </main>
  );
}

export default ProductDetails;
