import api from "../services/api";

const getAllProducts = (token, userId) =>
  api.get(`/allProducts/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const removeProduct = (token, id) =>
  api.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const addProduct = (token, product) =>
  api.post("/products", product, {
    headers: { Authorization: `Bearer ${token}` },
  });

const editProduct = (token, product) =>
  api.put("/products", product, {
    headers: { Authorization: `Bearer ${token}` },
  });

const addDiscount = (token, discount) =>
  api.post("/productsDiscount", discount, {
    headers: { Authorization: `Bearer ${token}` },
  });

const getAllDiscounts = (token, userId) =>
  api.get(`/allProductsDiscount/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const removeDiscount = (token, productId) =>
  api.delete(`/productsDiscount/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const editDiscount = (token, discount) =>
  api.put("/productsDiscount", discount, {
    headers: { Authorization: `Bearer ${token}` },
  });

export {
  getAllProducts,
  removeProduct,
  addProduct,
  editProduct,
  addDiscount,
  getAllDiscounts,
  removeDiscount,
  editDiscount,
};
