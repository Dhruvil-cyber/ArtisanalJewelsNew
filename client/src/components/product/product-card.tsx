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
import { Heart, Star, ShoppingBag, Eye } from "lucide-react";
import { useProductStockStatus } from "@/hooks/use-inventory-monitoring";
import { InventoryAlert } from "@/components/inventory-alert";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  showActions?: boolean; // Control whether to show wishlist and cart buttons
}

export default function ProductCard({ product, showActions = true }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
        title: "✨ Added to wishlist",
        description: "Item has been saved to your luxury collection.",
        className: "border-gold-500/20 bg-background/95 backdrop-blur-sm",
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
        title: "🛍️ Added to cart",
        description: "Item has been added to your shopping cart.",
        className: "border-gold-500/20 bg-background/95 backdrop-blur-sm",
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

  // Use real review data from API
  const averageRating = (product as any).averageRating || 0;
  const reviewCount = (product as any).reviewCount || 0;

  return (
    <div 
      className="group relative luxury-card rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${product.id}`}
      style={{
        background: 'linear-gradient(135deg, hsl(0, 0%, 100%) 0%, hsl(220, 14%, 98%) 100%)',
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30">
        <Link href={`/product/${product.handle}`}>
          {mainImage ? (
            <img 
              src={mainImage.url} 
              alt={mainImage.alt || product.title}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              data-testid={`img-product-${product.id}`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/50 flex items-center justify-center">
              <span className="text-muted-foreground font-medium">No image available</span>
            </div>
          )}
        </Link>
        
        {/* Image Loading Skeleton */}
        {!imageLoaded && mainImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/50 animate-pulse" />
        )}
        
        {/* Image Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isFeatured && (
            <Badge className="bg-gradient-to-r from-gold-500 to-gold-600 text-onyx text-xs font-semibold px-3 py-1 rounded-full shadow-luxury border-0" data-testid={`badge-featured-${product.id}`}>
              ✨ Bestseller
            </Badge>
          )}
          
          {/* Dynamic Inventory Badges */}
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
            className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-luxury hover:shadow-gold-glow border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 hover:scale-110 group/wishlist"
            data-testid={`button-wishlist-${product.id}`}
          >
            <Heart 
              size={16} 
              className={`transition-all duration-300 ${
                isWishlisted 
                  ? 'text-gold-600 fill-current' 
                  : 'text-gold-600 group-hover/wishlist:text-gold-500 group-hover/wishlist:fill-current'
              }`}
            />
          </button>
        )}

        {/* Quick Actions - Show on Hover */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-3 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          {showActions && (
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || addToCartMutation.isPending}
              className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-onyx py-3 px-4 rounded-lg font-semibold hover:shadow-gold-glow transition-all duration-300 hover:scale-105 text-sm flex items-center justify-center gap-2"
              data-testid={`button-add-to-cart-${product.id}`}
            >
              <ShoppingBag size={16} />
              {product.stock === 0 ? "Out of Stock" : addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
            </button>
          )}
          <Link href={`/product/${product.handle}`}>
            <button 
              className="px-4 py-3 bg-white/95 backdrop-blur-md border border-gold-500/30 hover:border-gold-500/50 rounded-lg font-semibold hover:bg-white transition-all duration-300 hover:scale-105 text-sm text-gold-600 hover:text-gold-500 flex items-center justify-center gap-2"
              data-testid={`button-view-product-${product.id}`}
            >
              <Eye size={16} />
              View
            </button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Link href={`/product/${product.handle}`}>
          <h3 className="font-serif font-semibold text-lg text-foreground mb-3 line-clamp-2 hover:text-gold-600 transition-colors duration-300 leading-tight tracking-wide" data-testid={`text-title-${product.id}`}>
            {product.title}
          </h3>
        </Link>

        {/* Description */}
        {product.shortDescription && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed" data-testid={`text-description-${product.id}`}>
            {product.shortDescription}
          </p>
        )}

        {/* Price and Rating Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-gold-600 tracking-tight" data-testid={`text-price-${product.id}`}>
                {formatPrice(product.basePrice, product.currency || undefined)}
              </span>
            </div>
            {needsAlert && (
              <span className="text-xs text-muted-foreground mt-1">
                {stock} left in stock
              </span>
            )}
          </div>

          {/* Rating */}
          {reviewCount > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`transition-colors duration-200 ${
                      i < Math.floor(averageRating)
                        ? 'text-gold-500 fill-current'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground font-medium" data-testid={`text-reviews-${product.id}`}>
                ({reviewCount})
              </span>
            </div>
          )}
        </div>
        
        {/* Subtle Gold Accent Line */}
        <div className="mt-4 pt-4 border-t border-gold-500/10">
          <div className="h-0.5 w-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full mx-auto opacity-50 group-hover:opacity-100 group-hover:w-16 transition-all duration-500"></div>
        </div>
      </div>
    </div>
  );
}