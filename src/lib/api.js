const API_BASE = 'https://halkpazarim-backend.onrender.com/api';

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);

  if (!res.ok) {
    throw new Error('fetchProducts failed');
  }

  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);

  if (!res.ok) {
    throw new Error('fetchProduct failed');
  }

  return res.json();
}
