import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { formatPrice } from "@/lib/formatters";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Wishlist() {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: wishlistProducts = [], isLoading: isLoadingWishlist } = useQuery<Product[]>({
    queryKey: ["/api/wishlist"],
    enabled: isAuthenticated,
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest("DELETE", `/api/wishlist/${productId}`);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to remove from wishlist.",
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
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading || isLoadingWishlist) {
    return (
      <div className="min-h-screen bg-background">
        <Header onMobileMenuToggle={() => {}} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="loading-shimmer w-48 h-8 rounded bg-muted mb-2"></div>
            <div className="loading-shimmer w-64 h-4 rounded bg-muted"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="loading-shimmer aspect-square bg-muted"></div>
                <CardContent className="p-4">
                  <div className="loading-shimmer h-4 bg-muted rounded mb-2"></div>
                  <div className="loading-shimmer h-6 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => {}} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif font-bold text-3xl text-foreground mb-2" data-testid="text-wishlist-title">
            My Wishlist
          </h1>
          <p className="text-muted-foreground">
            {wishlistProducts.length === 0 
              ? "You haven't saved any items yet" 
              : `${wishlistProducts.length} saved ${wishlistProducts.length === 1 ? 'item' : 'items'}`
            }
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="font-serif font-bold text-2xl text-foreground mb-4">Your Wishlist is Empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Browse our collection and save items you love for later. We'll keep them here waiting for you.
            </p>
            <Link href="/catalog">
              <Button size="lg" data-testid="button-browse-products">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => {
              const images = Array.isArray(product.images) ? product.images : [];
              const primaryImage = images.find(img => img.isPrimary) || images[0];

              return (
                <Card key={product.id} className="group card-hover overflow-hidden" data-testid={`card-wishlist-product-${product.id}`}>
                  <div className="relative aspect-square overflow-hidden">
                    {primaryImage ? (
                      <Link href={`/product/${product.handle}`}>
                        <img
                          src={primaryImage.url}
                          alt={primaryImage.alt || product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                          data-testid={`img-wishlist-product-${product.id}`}
                        />
                      </Link>
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">No image</p>
                      </div>
                    )}

                    {/* Remove from wishlist button */}
                    <div className="absolute top-3 right-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-10 h-10 p-0 bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeFromWishlistMutation.mutate(product.id)}
                        disabled={removeFromWishlistMutation.isPending}
                        data-testid={`button-remove-wishlist-${product.id}`}
                      >
                        <Trash2 size={16} />
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
                          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2" data-testid={`text-wishlist-product-title-${product.id}`}>
                            {product.title}
                          </h3>
                        </Link>
                        {product.shortDescription && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {product.shortDescription}
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="price-highlight font-bold text-lg" data-testid={`text-wishlist-product-price-${product.id}`}>
                          {formatPrice(product.basePrice, product.currency)}
                        </p>
                        {product.stock > 0 && (
                          <p className="text-xs text-green-600">
                            {product.stock} available
                          </p>
                        )}
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

                      {/* Action buttons */}
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                          onClick={() => addToCartMutation.mutate(product.id)}
                          disabled={product.stock === 0 || addToCartMutation.isPending}
                          data-testid={`button-add-to-cart-${product.id}`}
                        >
                          <ShoppingBag size={14} className="mr-1" />
                          {product.stock === 0 ? "Out of Stock" : addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                        </Button>
                        <Link href={`/product/${product.handle}`}>
                          <Button 
                            variant="outline" 
                            size="sm"
                            data-testid={`button-view-product-${product.id}`}
                          >
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Continue shopping */}
        {wishlistProducts.length > 0 && (
          <div className="text-center mt-12 pt-8 border-t border-border">
            <Link href="/catalog">
              <Button variant="outline" size="lg" data-testid="button-continue-shopping">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}