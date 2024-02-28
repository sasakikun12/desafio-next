import api from "../services/api";

const getAllSales = (token, userId) =>
  api.get(`/allSales/${userId}`, { headers: { authorization: token } });

const removeSale = (token, id) =>
  api.delete(`/sales/${id}`, { headers: { authorization: token } });

const updateSale = (token, { id, productId, value, quantity, saleDate }) =>
  api.put(
    `/sales`,
    { id, productId, value, quantity, saleDate },
    { headers: { authorization: token } }
  );

const addSales = (token, sale) =>
  api.post("/sales", sale, { headers: { authorization: token } });

export { getAllSales, removeSale, updateSale, addSales };
