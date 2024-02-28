import api from "../services/api";

const getAllSales = (token, userId) =>
  api.get(`/allSales/${userId}`, { Authorization: `Bearer ${token}` });

const removeSale = (token, id) =>
  api.delete(`/sales/${id}`, { Authorization: `Bearer ${token}` });

const updateSale = (token, { id, productId, value, quantity, saleDate }) =>
  api.put(
    `/sales`,
    { id, productId, value, quantity, saleDate },
    { Authorization: `Bearer ${token}` }
  );

const addSales = (token, sale) =>
  api.post("/sales", sale, { Authorization: `Bearer ${token}` });

export { getAllSales, removeSale, updateSale, addSales };
