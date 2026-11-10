import styles from "./Navbar.module.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { products } from "../data/products";
import {
  ShoppingBag,
  Search,
  Heart,
  ShoppingCart,
  UserRound,
  ChevronDown,
  Bell,
  CheckCircle2,
  X,
  Menu,
  House,
  Grid2X2,
  Tag,
  Info,
  Mail,
} from "lucide-react";

function Navbar({
  searchQuery,
  onSearchChange,
  notifications = [],
  toastMessage,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismissToast,
  cartItems = [],
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSearchResultClick = () => {
    navigate("/");

    setTimeout(() => {
      document.getElementById("deals")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    onSearchChange(searchQuery);
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const searchResults = searchQuery.trim()
    ? products
        .filter((product) => {
          const search = searchQuery.trim().toLowerCase();

          return (
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
          );
        })
        .slice(0, 5)
    : [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const sectionIds = ["categories", "deals", "about", "contact"];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-110px 0px -65% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      if (window.scrollY < 180) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const hash = location.hash;

    if (!hash) return;

    const scrollToSection = () => {
      const section = document.querySelector(hash);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    const timer = setTimeout(scrollToSection, 300);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  const isActiveLink = (section) =>
    location.pathname === "/" && activeSection === section;
  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      {/* Top announcement bar */}
      <div className={styles.topBar}>
        <p>Free Shipping on Orders Over $50</p>
        <span>30-Day Easy Returns</span>
      </div>

      {/* Main Navbar */}
      <nav className={styles.navbar} ref={navbarRef}>
        {/* Logo */}
        <div className={styles.logo}>
          <ShoppingBag size={27} strokeWidth={2.5} />
          <h2>
            SHOPORA<span>.</span>
          </h2>
        </div>

        {/* Navigation Links */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
        <div
          className={`${styles.navLinks} ${
            isMobileMenuOpen ? styles.mobileMenuOpen : ""
          }`}
        >
          <NavLink
            to="/"
            className={isActiveLink("home") ? styles.activeLink : ""}
            onClick={(e) => {
              setIsMobileMenuOpen(false);

              if (location.pathname === "/") {
                e.preventDefault();

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });

                setActiveSection("home");
              }
            }}
          >
            <House size={18} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/#categories"
            className={isActiveLink("categories") ? styles.activeLink : ""}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Grid2X2 size={18} />
            <span>Categories</span>
          </NavLink>

          <NavLink
            to="/#deals"
            className={isActiveLink("deals") ? styles.activeLink : ""}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Tag size={18} />
            <span>Deals</span>
          </NavLink>
          <NavLink
            to="/#about"
            className={isActiveLink("about") ? styles.activeLink : ""}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Info size={18} />
            <span>About</span>
          </NavLink>

          <NavLink
            to="/#contact"
            className={isActiveLink("contact") ? styles.activeLink : ""}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Mail size={18} />
            <span>Contact</span>
          </NavLink>
        </div>

        {/* Search */}
        <div className={styles.searchWrapper}>
          <div className={styles.searchBox}>
            <Search size={19} />

            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          {searchQuery.trim() && (
            <div className={styles.searchDropdown}>
              <div className={styles.searchDropdownHeader}>
                <span>Search Results</span>
                <span>{searchResults.length} found</span>
              </div>

              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <div
                    key={product.id}
                    className={styles.searchResultItem}
                    onClick={handleSearchResultClick}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={product.image} alt={product.name} />

                    <div className={styles.searchResultInfo}>
                      <h4>{product.name}</h4>
                      <span>{product.category}</span>
                    </div>

                    <strong>${product.price}</strong>
                  </div>
                ))
              ) : (
                <p className={styles.searchNoResults}>No products found.</p>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button aria-label="Wishlist" onClick={() => navigate("/wishlist")}>
            <Heart />
          </button>

          <div className={styles.notificationWrapper} ref={notificationRef}>
            <button
              className={styles.notificationButton}
              aria-label="Notifications"
              onClick={() => {
                const willOpen = !isNotificationOpen;

                setIsNotificationOpen(willOpen);

                if (willOpen) {
                  onMarkAllAsRead?.();
                }
              }}
            >
              <Bell size={21} />

              {unreadCount > 0 && (
                <span className={styles.notificationBadge}>
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className={styles.notificationDropdown}>
                <div className={styles.dropdownHeader}>
                  <h3>Notifications</h3>
                  <span>{unreadCount} Unread</span>
                </div>

                <div className={styles.notificationList}>
                  {notifications.length === 0 ? (
                    <p className={styles.emptyNotifications}>
                      No notifications yet.
                    </p>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`${styles.notificationItem} ${
                          !notification.read ? styles.unreadNotification : ""
                        }`}
                      >
                        <Bell size={17} />

                        <span>{notification.message}</span>

                        {!notification.read && (
                          <button onClick={() => onMarkAsRead(notification.id)}>
                            Mark as Read
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            aria-label="Shopping cart"
            onClick={() => navigate("/cart")}
            className={styles.cartButton}
          >
            <ShoppingCart />

            {cartCount > 0 && (
              <span className={styles.cartBadge}>
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          <button aria-label="Account">
            <UserRound />
            <ChevronDown size={15} />
          </button>
        </div>
      </nav>
      {toastMessage && (
        <div className={styles.notificationToast}>
          <div className={styles.toastIcon}>
            <CheckCircle2 size={22} />
          </div>

          <div className={styles.toastContent}>
            <strong>Successfully Updated!</strong>
            <span>{toastMessage}</span>
          </div>

          <button
            className={styles.toastClose}
            onClick={onDismissToast}
            aria-label="Close notification"
          >
            <X size={18} />
          </button>

          <div className={styles.toastProgress}></div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
