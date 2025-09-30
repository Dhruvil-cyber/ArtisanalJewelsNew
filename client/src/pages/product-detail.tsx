import { useState } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { formatPrice } from "@/lib/formatters";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import RelatedProducts from "@/components/product/related-products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ShoppingBag, Star, Shield, Truck, RotateCcw } from "lucide-react";
import type { Product, ProductVariant, Review } from "@shared/schema";

interface ProductWithDetails extends Product {
  variants: ProductVariant[];
  reviews: Review[];
}

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery<ProductWithDetails>({
    queryKey: ["/api/products/handle", handle],
    enabled: !!handle,
  });

  const addToCartMutation = useMutation({
    mutationFn: async (data: { productId: number; variantId?: number; quantity: number }) => {
      const response = await apiRequest("POST", "/api/cart", data);
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
          title: "Please log in or register",
          description: (
            <div>
              You need an account to add items to cart.{" "}
              <a href="/login" className="underline font-medium">
                Login
              </a>{" "}
              or{" "}
              <a href="/register" className="underline font-medium">
                Sign up
              </a>
            </div>
          ),
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

  const addToWishlistMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest("POST", "/api/wishlist", { productId });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Added to wishlist",
        description: "Item has been saved to your wishlist.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Please log in or register",
          description: (
            <div>
              You need an account to save items to your wishlist.{" "}
              <a href="/login" className="underline font-medium">
                Login
              </a>{" "}
              or{" "}
              <a href="/register" className="underline font-medium">
                Sign up
              </a>
            </div>
          ),
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="loading-shimmer w-full h-96 rounded bg-muted"></div>
            <div className="space-y-4">
              <div className="loading-shimmer w-3/4 h-8 rounded bg-muted"></div>
              <div className="loading-shimmer w-1/2 h-6 rounded bg-muted"></div>
              <div className="loading-shimmer w-full h-24 rounded bg-muted"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const images = Array.isArray(product.images) ? product.images : [];
  const videos = Array.isArray(product.videos) ? product.videos : [];
  const allMedia = [...images.map((img, idx) => ({ ...img, type: 'image', index: idx })), ...videos.map((vid, idx) => ({ ...vid, type: 'video', index: idx }))];
  const hasVariants = product.variants && product.variants.length > 0;
  const displayPrice = selectedVariant ? selectedVariant.price : product.basePrice;

  const handleAddToCart = () => {
    addToCartMutation.mutate({
      productId: product.id,
      variantId: selectedVariant?.id,
      quantity,
    });
  };

  const handleAddToWishlist = () => {
    addToWishlistMutation.mutate(product.id);
  };

  const calculateAverageRating = () => {
    if (!product.reviews || product.reviews.length === 0) return 0;
    const total = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / product.reviews.length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Media (Images & Videos) */}
          <div className="space-y-4">
            {allMedia.length > 0 ? (
              <>
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  {allMedia[selectedImage]?.type === 'video' ? (
                    (() => {
                      const videoUrl = allMedia[selectedImage]?.url || '';
                      const videoType = allMedia[selectedImage]?.type;
                      
                      // YouTube embed
                      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                        const videoId = videoUrl.includes('youtu.be') 
                          ? videoUrl.split('youtu.be/')[1]?.split('?')[0]
                          : new URL(videoUrl).searchParams.get('v');
                        return (
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            data-testid="iframe-youtube-main"
                          />
                        );
                      }
                      
                      // Vimeo embed
                      if (videoUrl.includes('vimeo.com')) {
                        const videoId = videoUrl.split('vimeo.com/')[1]?.split('?')[0];
                        return (
                          <iframe
                            src={`https://player.vimeo.com/video/${videoId}`}
                            className="w-full h-full"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            data-testid="iframe-vimeo-main"
                          />
                        );
                      }
                      
                      // Instagram embed
                      if (videoUrl.includes('instagram.com')) {
                        return (
                          <div className="w-full h-full flex items-center justify-center bg-black/90 p-4">
                            <div className="text-center space-y-4">
                              <p className="text-white">Instagram videos cannot be embedded directly</p>
                              <a 
                                href={videoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block px-6 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors"
                              >
                                View on Instagram
                              </a>
                            </div>
                          </div>
                        );
                      }
                      
                      // Direct video file
                      return (
                        <video
                          src={videoUrl}
                          controls
                          className="w-full h-full object-cover"
                          data-testid="video-product-main"
                        >
                          Your browser does not support the video tag.
                        </video>
                      );
                    })()
                  ) : (
                    <img
                      src={allMedia[selectedImage]?.url || images[0]?.url}
                      alt={allMedia[selectedImage]?.alt || product.title}
                      className="w-full h-full object-cover"
                      data-testid="img-product-main"
                    />
                  )}
                </div>
                
                {allMedia.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {allMedia.map((media, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? "border-accent" : "border-border"
                        }`}
                        data-testid={`button-media-${index}`}
                      >
                        {media.type === 'video' ? (
                          <div className="relative w-full h-full bg-black/80 flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <div className="w-0 h-0 border-l-8 border-l-white border-y-6 border-y-transparent ml-1"></div>
                              </div>
                            </div>
                            {media.url.includes('youtube') || media.url.includes('youtu.be') ? (
                              <span className="text-white text-xs font-semibold">YouTube</span>
                            ) : media.url.includes('vimeo') ? (
                              <span className="text-white text-xs font-semibold">Vimeo</span>
                            ) : media.url.includes('instagram') ? (
                              <span className="text-white text-xs font-semibold">Instagram</span>
                            ) : (
                              <span className="text-white text-xs font-semibold">Video</span>
                            )}
                          </div>
                        ) : (
                          <img
                            src={media.url}
                            alt={media.alt || product.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">No media available</p>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-2" data-testid="text-product-title">
                {product.title}
              </h1>
              <p className="text-lg text-muted-foreground" data-testid="text-product-short-description">
                {product.shortDescription}
              </p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="price-highlight font-bold text-3xl" data-testid="text-product-price">
                {formatPrice(displayPrice, product?.currency ?? 'USD')}
              </p>
              {(product?.stock ?? 0) > 0 ? (
                <p className="text-sm text-green-600" data-testid="text-product-stock">
                  In stock ({product?.stock ?? 0} available)
                </p>
              ) : (
                <p className="text-sm text-red-600" data-testid="text-product-out-of-stock">
                  Out of stock
                </p>
              )}
            </div>

            {/* Variants */}
            {hasVariants && (
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Options</h3>
                <Select onValueChange={(value) => {
                  const variant = product.variants.find(v => v.id === parseInt(value));
                  setSelectedVariant(variant || null);
                }}>
                  <SelectTrigger data-testid="select-variant">
                    <SelectValue placeholder="Select variant" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variants.map((variant) => (
                      <SelectItem key={variant.id} value={variant.id.toString()}>
                        {variant.metal && `${variant.metal} `}
                        {variant.size && `Size ${variant.size} `}
                        {variant.gemstone && variant.gemstone}
                        - {formatPrice(variant.price, product?.currency ?? 'USD')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={(product?.stock ?? 0) === 0 || addToCartMutation.isPending}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  data-testid="button-add-to-cart"
                >
                  <ShoppingBag size={20} className="mr-2" />
                  {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleAddToWishlist}
                  disabled={addToWishlistMutation.isPending}
                  data-testid="button-add-to-wishlist"
                >
                  <Heart size={20} />
                </Button>
              </div>
              
              <Button 
                variant="secondary" 
                className="w-full"
                data-testid="button-buy-now"
              >
                Buy Now
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Shield className="text-accent mx-auto mb-2" size={24} />
                <p className="text-xs text-muted-foreground">Lifetime Warranty</p>
              </div>
              <div className="text-center">
                <Truck className="text-accent mx-auto mb-2" size={24} />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="text-accent mx-auto mb-2" size={24} />
                <p className="text-xs text-muted-foreground">30-Day Returns</p>
              </div>
            </div>

            <Separator />

            {/* Product Details */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product Details</h3>
              <div className="space-y-2 text-sm">
                {product.metal && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Metal:</span>
                    <span className="text-foreground capitalize">{product.metal.replace('-', ' ')}</span>
                  </div>
                )}
                {product.gemstone && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gemstone:</span>
                    <span className="text-foreground capitalize">{product.gemstone}</span>
                  </div>
                )}
                {product.carat && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Carat:</span>
                    <span className="text-foreground">{product.carat}ct</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKU:</span>
                  <span className="text-foreground">{product.sku}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Description</h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-product-description">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center space-x-4 mb-8">
            <h2 className="font-serif font-bold text-2xl text-foreground" data-testid="text-reviews-title">
              Customer Reviews
            </h2>
            {product.reviews && product.reviews.length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400" data-testid="stars-average-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < Math.floor(calculateAverageRating()) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground" data-testid="text-review-summary">
                  {calculateAverageRating().toFixed(1)} ({product.reviews.length} reviews)
                </span>
              </div>
            )}
          </div>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6" data-testid="container-reviews-list">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-card rounded-lg p-6 border border-border" data-testid={`card-review-${review.id}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400" data-testid={`stars-review-${review.id}`}>
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            fill={i < review.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-foreground" data-testid={`text-reviewer-name-${review.id}`}>
                        {review.customerName}
                      </span>
                      {review.isVerified && (
                        <Badge variant="secondary" className="text-xs" data-testid={`badge-verified-${review.id}`}>
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  {review.title && (
                    <h4 className="font-semibold text-foreground mb-2" data-testid={`text-review-title-${review.id}`}>
                      {review.title}
                    </h4>
                  )}
                  <p className="text-muted-foreground" data-testid={`text-review-comment-${review.id}`}>
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12" data-testid="container-no-reviews">
              <p className="text-muted-foreground text-lg mb-4">No reviews yet</p>
              <p className="text-sm text-muted-foreground">
                Be the first to review this product and help other customers make their decision.
              </p>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        <RelatedProducts currentProduct={product} />
      </main>

      <Footer />
    </div>
  );
}
