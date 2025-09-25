export const dynamic = "force-dynamic";

import MenuItem from "@/components/MenuItem";
import { getProducts } from "@/lib/services/product";

export default async function MenuPage() {
  let products = [];
  try {
    products = await getProducts(5);
  } catch (e) {
    return (
      <div className="px-4 py-16 max-w-2xl mx-auto text-center space-y-3">
        <h2 className="text-xl font-semibold">Gagal memuat produk</h2>
        <p className="text-sm text-muted-foreground">
          Coba refresh halaman atau kembali beberapa saat lagi.
        </p>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="px-4 py-16 max-w-2xl mx-auto text-center space-y-3">
        <h2 className="text-xl font-semibold">Belum ada produk</h2>
        <p className="text-sm text-muted-foreground">Silakan cek lagi nanti.</p>
      </div>
    );
  }

  return (
    <ul className="px-4 py-6 max-w-2xl mx-auto space-y-6">
      {products.map((product) => (
        <MenuItem key={product.id} product={product} />
      ))}
    </ul>
  );
}
