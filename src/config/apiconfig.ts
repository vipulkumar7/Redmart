export const API_BASE_URL = "https://vipul-redmart-node.vercel.app/api/v1";

const API_ENDPOINTS = {
  createUser: `${API_BASE_URL}/register`,
  loginUser: `${API_BASE_URL}/login`,
  isGoogleLoginUser: `${API_BASE_URL}/google-login-check`,
  getProducts: `${API_BASE_URL}/products`,
  latestProducts: `${API_BASE_URL}/latest-products`,
  featureProducts: `${API_BASE_URL}/feature-products`,
  exclusiveProducts: `${API_BASE_URL}/exclusive-products`,
  getQuotes: `${API_BASE_URL}/quotes`,
  relatedProducts: `${API_BASE_URL}/related-products`,
  addToCart: `${API_BASE_URL}/add-to-cart`,
  getCart: `${API_BASE_URL}/get-cart`,
  deleteCart: `${API_BASE_URL}/cart-delete`,
  increaseCart: `${API_BASE_URL}/cart-increase`,
  decreaseCart: `${API_BASE_URL}/cart-decrease`,
  addAdress: `${API_BASE_URL}/add-address`,
  getAdress: `${API_BASE_URL}/get-address`,
  editAdress: `${API_BASE_URL}/update-address`,
  deleteAdress: `${API_BASE_URL}/delete-address`,
  createCheckoutsession: `${API_BASE_URL}/create-checkout-session`,
  // Add more endpoints as needed
};

export default API_ENDPOINTS;
