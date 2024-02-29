import api from "../services/api";

const getAllSales = (token, userId) =>
  api.get(`/allSales/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const removeSale = (token, id) =>
  api.delete(`/sales/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

const editSale = (token, { id, productId, value, quantity, saleDate }) =>
  api.put(
    `/sales`,
    { id, productId, value, quantity, saleDate },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

const addSale = (token, sale) =>
  api.post("/sales", sale, {
    headers: { Authorization: `Bearer ${token}` },
  });

export { getAllSales, removeSale, editSale, addSale };
