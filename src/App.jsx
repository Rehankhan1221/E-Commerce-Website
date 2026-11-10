import { useState } from "react";

import Categories from "./Components/Categories/Categories";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import Footer from "./Components/Footer/Footer";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Newsletter from "./Components/Newsletter/Newsletter";
import SpecialOffer from "./Components/SpecialOffer/SpecialOffer";
import Testimonials from "./Components/Testimonials/Testimonials";
import WhyChooseUs from "./Components/WhyChooseUs/WhyChooseUs";
import ScrollReveal from "./Components/ScrollReveal/ScrollReveal";
import { Routes, Route } from "react-router-dom";
import Cart from "./Components/Cart/Cart";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Wishlist from "./Components/Wishlist/Wishlist";
import Checkout from "./Components/Checkout";

const App = () => {
  const [notifications, setNotifications] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleWishlist = (product) => {
    const isAlreadyAdded = wishlist.some((item) => item.id === product.id);

    setWishlist((prev) =>
      isAlreadyAdded
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product],
    );

    if (isAlreadyAdded) {
      removeWishlistNotification(product.id);
    } else {
      addNotification(`${product.name} added to your wishlist ❤️`, product.id);
    }
  };

  const addNotification = (message, productId) => {
    const newNotification = {
      id: Date.now(),
      productId,
      message,
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);

    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const removeWishlistNotification = (productId) => {
    setNotifications((prev) =>
      prev.filter(
        (notification) =>
          notification.productId !== productId || notification.read,
      ),
    );
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);

      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item,
      ),
    );
  };

  const removeCartItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div>
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        notifications={notifications}
        toastMessage={toastMessage}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onDismissToast={() => setToastMessage("")}
        cartItems={cartItems}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />

              <section id="categories">
                <ScrollReveal>
                  <Categories onSelectCategory={setSearchQuery} />
                </ScrollReveal>
              </section>

              <section id="deals">
                <ScrollReveal>
                  <FeaturedProducts
                    wishlist={wishlist}
                    onToggleWishlist={toggleWishlist}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onAddNotification={addNotification}
                    onRemoveNotification={removeWishlistNotification}
                    onAddToCart={addToCart}
                    cartItems={cartItems}
                  />
                </ScrollReveal>
              </section>

              <section id="about">
                <ScrollReveal>
                  <WhyChooseUs />
                </ScrollReveal>
              </section>

              <ScrollReveal>
                <Testimonials />
              </ScrollReveal>

              <section id="contact">
                <ScrollReveal>
                  <Newsletter />
                </ScrollReveal>
              </section>

              <Footer />

              <SpecialOffer />
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeCartItem}
              onClearCart={clearCart}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onAddToCart={addToCart}
              cartItems={cartItems}
            />
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProductDetails
              onAddToCart={addToCart}
              cartItems={cartItems}
              onAddNotification={addNotification}
              onRemoveNotification={removeWishlistNotification}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cartItems={cartItems} onClearCart={clearCart} />}
        />
      </Routes>
    </div>
  );
};

export default App;
