import api from "../services/api";

const getAllProducts = (token, userId) =>
  api.get(`/allProducts/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const removeProduct = (token, id) =>
  api.delete(`/products/${id}`, {
    headers: { authorization: token },
  });

const addProduct = (token, product) =>
  api.post("/products", product, { headers: { authorization: token } });

const editProduct = (token, product) =>
  api.put("/products", product, {
    headers: { authorization: token },
  });

const addDiscount = (token, discount) =>
  api.post("/productsDiscount", discount, {
    headers: { authorization: token },
  });

const getAllDiscounts = (token, userId) =>
  api.get(`/allProductsDiscount/${userId}`, {
    headers: { authorization: token },
  });

const removeDiscount = (token, productId) =>
  api.delete(`/productsDiscount/${productId}`, {
    headers: { authorization: token },
  });

const editDiscount = (token, discount) =>
  api.put("/productsDiscount", discount, {
    headers: { authorization: token },
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
