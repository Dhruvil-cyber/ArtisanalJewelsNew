import ProductCard from "./product-card";
import type { Product } from "@shared/schema";

interface ProductGridProps {
  products: Product[];
  showActions?: boolean; // Control whether to show wishlist and cart buttons
}

export default function ProductGrid({ products, showActions = true }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} showActions={showActions} />
      ))}
    </div>
  );
}
