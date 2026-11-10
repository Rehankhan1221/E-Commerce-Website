const API_URL = "https://dummyjson.com/products?limit=100";

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data.products;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};