export async function fetchProducts() {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/products`);

  if (!res.ok) {
    throw new Error('fetchProducts failed');
  }

  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/products/${id}`);

  if (!res.ok) {
    throw new Error('fetchProduct failed');
  }

  return res.json();
}
