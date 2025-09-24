import MenuItem from "@/components/MenuItem";
import { getProducts } from "@/lib/services/product";

const MenuPage = async () => {
  const products = await getProducts(5);
  return (
    <ul className="px-4 py-6 max-w-2xl mx-auto space-y-6">
      {products.map((product) => (
        <MenuItem key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default MenuPage;
