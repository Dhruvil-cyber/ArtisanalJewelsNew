import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { formatPrice } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { useProductStockStatus } from "@/hooks/use-inventory-monitoring";
import { InventoryAlert } from "@/components/inventory-alert";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
}

export default function ProductCard({ product, showActions = true }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { stock, status, needsAlert } = useProductStockStatus(product.id);

  const addToWishlistMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest("POST", "/api/wishlist", { productId });
      return response.json();
    },
    onSuccess: () => {
      setIsWishlisted(true);
      toast({
        title: "Added to wishlist",
        description: "Item has been saved to your wishlist.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to add items to wishlist.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add to wishlist.",
        variant: "destructive",
      });
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest("POST", "/api/cart", { 
        productId, 
        quantity: 1 
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Added to cart",
        description: "Item has been added to your shopping cart.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to add items to cart.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add to cart.",
        variant: "destructive",
      });
    },
  });

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to wishlist.",
        variant: "destructive",
      });
      return;
    }

    addToWishlistMutation.mutate(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) {
      toast({
        title: "Out of stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    addToCartMutation.mutate(product.id);
  };

  const images = Array.isArray(product.images) ? product.images : [];
  const mainImage = images.length > 0 ? images[0] : null;

  const averageRating = (product as any).averageRating || 0;
  const reviewCount = (product as any).reviewCount || 0;

  return (
    <div 
      className="group bg-card rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden card-hover"
      data-testid={`card-product-${product.id}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted/50">
        <Link href={`/product/${product.handle}`}>
          {mainImage ? (
            <img 
              src={mainImage.url} 
              alt={mainImage.alt || product.title}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              data-testid={`img-product-${product.id}`}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </Link>
        
        {!imageLoaded && mainImage && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isFeatured && (
            <Badge variant="default" data-testid={`badge-featured-${product.id}`}>
              Featured
            </Badge>
          )}
          
          {needsAlert && (
            <InventoryAlert
              alert={{
                id: `${product.id}-${status}`,
                productId: product.id,
                productTitle: product.title,
                currentStock: stock,
                threshold: status === "critical" ? 3 : 10,
                severity: status === "out" ? "out" : status === "critical" ? "critical" : "low",
                lastUpdated: new Date()
              }}
              variant="badge"
              showAnimation={true}
            />
          )}
        </div>

        {/* Wishlist Button */}
        {showActions && (
          <button
            onClick={handleWishlistToggle}
            disabled={addToWishlistMutation.isPending}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
            data-testid={`button-wishlist-${product.id}`}
          >
            <Heart 
              size={18} 
              className={isWishlisted ? 'text-primary fill-current' : 'text-gray-600'}
            />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/product/${product.handle}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors" data-testid={`text-title-${product.id}`}>
            {product.title}
          </h3>
        </Link>

        {product.shortDescription && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-testid={`text-description-${product.id}`}>
            {product.shortDescription}
          </p>
        )}

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold price-highlight" data-testid={`text-price-${product.id}`}>
              {formatPrice(product.basePrice, product.currency || undefined)}
            </span>
            {needsAlert && (
              <p className="text-xs text-muted-foreground mt-1">
                {stock} left
              </p>
            )}
          </div>

          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(averageRating) ? 'text-primary fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground" data-testid={`text-reviews-${product.id}`}>
                ({reviewCount})
              </span>
            </div>
          )}
        </div>
        
        {showActions && (
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || addToCartMutation.isPending}
            className="w-full"
            size="sm"
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingBag size={16} className="mr-2" />
            {product.stock === 0 ? "Out of Stock" : addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
          </Button>
        )}
      </div>
    </div>
  );
}