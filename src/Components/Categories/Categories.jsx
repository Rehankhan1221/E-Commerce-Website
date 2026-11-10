import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { fetchProducts } from "../../services/productApi";
import styles from "./Categories.module.css";

function Categories({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchProducts();

        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Categories load failed:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);
  const visibleCategories = showAll ? categories : categories.slice(0, 6);
  return (
    <section className={styles.categoriesSection}>
      <div className={styles.sectionHeader}>
        <div>
          <span className={styles.eyebrow}>EXPLORE SHOPORA</span>
          <h2>
            Shop by <span>Category</span>
          </h2>
          <p>Everything you love, all in one place.</p>
        </div>

        <button
          className={styles.viewAll}
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "View Less" : "View All"}
          <ArrowUpRight size={18} />
        </button>
      </div>

      <div className={styles.categoryGrid}>
        {loading ? (
          <p>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          visibleCategories.map((category, index) => (
            <div
              className={styles.categoryCard}
              style={{
                backgroundColor: [
                  "#e0e7ff",
                  "#fce7f3",
                  "#ffedd5",
                  "#dcfce7",
                  "#f3e8ff",
                  "#fef3c7",
                ][index % 6],
                cursor: "pointer",
              }}
              key={category}
              onClick={() => {
                onSelectCategory(category);

                document.getElementById("deals")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <div className={styles.cardText}>
                <h3>{category}</h3>
                <p>Explore our {category} collection</p>
                <span className={styles.shopLink}>
                  Explore <ArrowUpRight size={15} />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Categories;
