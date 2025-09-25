const BASE = process.env.NEXT_PUBLIC_API_BASE || "https://fakestoreapi.com";

export async function getProducts(limit = 5) {
  const res = await fetch(`${BASE}/products?limit=${limit}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id}: ${res.status}`);
  }
  return res.json();
}
