import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/formatters";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@shared/schema";

interface RelatedProductsProps {
  currentProduct: Product;
}

export default function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const { data: relatedProducts, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", "related", currentProduct.id],
    queryFn: async () => {
      // First try to get products from the same category
      let url = `/api/products?category=${currentProduct.category}&limit=4`;
      let response = await fetch(url);
      let products: Product[] = await response.json();
      
      // Filter out the current product
      products = products.filter(p => p.id !== currentProduct.id);
      
      // If we don't have enough products from the same category, get more by similar attributes
      if (products.length < 3) {
        const additionalFilters = [];
        if (currentProduct.metal) {
          additionalFilters.push(`metal=${currentProduct.metal}`);
        }
        if (currentProduct.gemstone) {
          additionalFilters.push(`gemstone=${currentProduct.gemstone}`);
        }
        
        if (additionalFilters.length > 0) {
          const additionalUrl = `/api/products?${additionalFilters.join('&')}&limit=4`;
          const additionalResponse = await fetch(additionalUrl);
          const additionalProducts: Product[] = await additionalResponse.json();
          
          // Add products that we don't already have
          const existingIds = products.map(p => p.id);
          const newProducts = additionalProducts.filter(p => 
            p.id !== currentProduct.id && !existingIds.includes(p.id)
          );
          
          products = [...products, ...newProducts].slice(0, 4);
        }
      }
      
      return products.slice(0, 4);
    },
    enabled: !!currentProduct,
  });

  if (isLoading) {
    return (
      <section className="mt-16">
        <h2 className="font-serif font-bold text-2xl text-foreground mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="loading-shimmer aspect-square bg-muted"></div>
              <CardContent className="p-4">
                <div className="loading-shimmer h-4 bg-muted rounded mb-2"></div>
                <div className="loading-shimmer h-6 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="font-serif font-bold text-2xl text-foreground mb-8">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => {
          const images = Array.isArray(product.images) ? product.images : [];
          const primaryImage = images.find(img => img.isPrimary) || images[0];
          
          return (
            <Card key={product.id} className="group card-hover overflow-hidden" data-testid={`card-related-product-${product.id}`}>
              <div className="relative aspect-square overflow-hidden">
                {primaryImage ? (
                  <img
                    src={primaryImage.url}
                    alt={primaryImage.alt || product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    data-testid={`img-related-product-${product.id}`}
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">No image</p>
                  </div>
                )}
                
                {/* Quick action buttons */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-y-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-10 h-10 p-0 bg-background/80 backdrop-blur-sm"
                    data-testid={`button-wishlist-${product.id}`}
                  >
                    <Heart size={16} />
                  </Button>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 space-y-1">
                  {product.isFeatured && (
                    <Badge variant="secondary" className="bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  )}
                  {product.stock === 0 && (
                    <Badge variant="destructive">
                      Out of Stock
                    </Badge>
                  )}
                  {product.stock > 0 && product.stock <= 5 && (
                    <Badge variant="outline" className="bg-orange-100 text-orange-800">
                      Low Stock
                    </Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <Link href={`/product/${product.handle}`}>
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2" data-testid={`text-related-product-title-${product.id}`}>
                        {product.title}
                      </h3>
                    </Link>
                    {product.shortDescription && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="price-highlight font-bold text-lg" data-testid={`text-related-product-price-${product.id}`}>
                        {formatPrice(product.basePrice, product.currency)}
                      </p>
                      {product.stock > 0 && (
                        <p className="text-xs text-green-600">
                          {product.stock} available
                        </p>
                      )}
                    </div>

                    <Link href={`/product/${product.handle}`}>
                      <Button 
                        size="sm" 
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        data-testid={`button-view-product-${product.id}`}
                      >
                        <ShoppingBag size={14} className="mr-1" />
                        View
                      </Button>
                    </Link>
                  </div>

                  {/* Product attributes */}
                  <div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
                    {product.metal && (
                      <Badge variant="outline" className="text-xs">
                        {product.metal.replace('-', ' ')}
                      </Badge>
                    )}
                    {product.gemstone && (
                      <Badge variant="outline" className="text-xs">
                        {product.gemstone}
                      </Badge>
                    )}
                    {product.carat && (
                      <Badge variant="outline" className="text-xs">
                        {product.carat}ct
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {relatedProducts.length >= 4 && (
        <div className="text-center mt-8">
          <Link href="/catalog">
            <Button variant="outline" size="lg" data-testid="button-view-all-products">
              View All Products
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}