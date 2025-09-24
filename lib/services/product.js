import { api } from "@/lib/axios";

export async function getProducts(limit = 5) {
  const { data } = await api.get(`/products?limit=${limit}`);
  return data;
}

export async function getProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}
