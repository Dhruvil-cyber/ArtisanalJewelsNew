import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { formatPrice } from "@/lib/formatters";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { useProductStockStatus } from "@/hooks/use-inventory-monitoring";
import { InventoryAlert } from "@/components/inventory-alert";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  showActions?: boolean; // Control whether to show wishlist and cart buttons
}

export default function ProductCard({ product, showActions = true }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
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

  // Use real review data from API
  const averageRating = (product as any).averageRating || 0;
  const reviewCount = (product as any).reviewCount || 0;

  return (
    <Card className="card-hover bg-card overflow-hidden shadow-md border border-border group">
      <Link href={`/product/${product.handle}`}>
        <div className="relative cursor-pointer">
          {mainImage ? (
            <img 
              src={mainImage.url} 
              alt={mainImage.alt || product.title}
              className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
              data-testid={`img-product-${product.id}`}
            />
          ) : (
            <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
          
          {showActions && (
            <div className="absolute top-2 right-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWishlistToggle}
                disabled={addToWishlistMutation.isPending}
                className={`w-8 h-8 bg-white/90 rounded-full flex items-center justify-center transition-colors ${
                  isWishlisted ? "text-accent" : "text-muted-foreground hover:text-accent"
                }`}
                data-testid={`button-wishlist-${product.id}`}
              >
                <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
              </Button>
            </div>
          )}
          
          {product.isFeatured && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-accent text-accent-foreground" data-testid={`badge-featured-${product.id}`}>
                Bestseller
              </Badge>
            </div>
          )}
          
          {/* Dynamic Inventory Badges */}
          {needsAlert && (
            <div className="absolute top-2 left-2">
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
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="p-2 sm:p-3 lg:p-4">
        <Link href={`/product/${product.handle}`}>
          <div className="cursor-pointer">
            <h3 className="font-medium text-foreground mb-1 line-clamp-2 text-sm sm:text-base" data-testid={`text-title-${product.id}`}>
              {product.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-1" data-testid={`text-description-${product.id}`}>
              {product.shortDescription}
            </p>
          </div>
        </Link>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="price-highlight font-bold text-sm sm:text-base lg:text-lg" data-testid={`text-price-${product.id}`}>
              {formatPrice(product.basePrice, product.currency || undefined)}
            </span>
            {needsAlert && (
              <span className="text-xs text-muted-foreground mt-1 hidden sm:block">
                {stock} left in stock
              </span>
            )}
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    fill={i < Math.floor(averageRating) ? "currentColor" : "none"}
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
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            size="sm"
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingBag size={16} className="mr-2" />
            {product.stock === 0 ? "Out of Stock" : addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
