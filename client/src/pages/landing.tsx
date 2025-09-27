import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import ProductGrid from "@/components/product/product-grid";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Heart, Shield, Truck, RotateCcw, Star, Check } from "lucide-react";
import { CustomerTestimonials } from "@/components/customer-testimonials";
import type { Product, Banner } from "@shared/schema";

export default function Landing() {
  const { isAuthenticated } = useAuth();

  // Fetch featured products  
  const { data: featuredProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true, limit: 4 }],
  });

  // Fetch active banners
  const { data: banners = [] } = useQuery<Banner[]>({
    queryKey: ["/api/banners"],
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] luxury-gradient overflow-hidden">
        <div className="hero-pattern absolute inset-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: banners.length > 0 && banners[0].images && Array.isArray(banners[0].images) && banners[0].images.length > 0
              ? `url('${banners[0].images[0].url}')`
              : "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl w-full">
            <div className="mb-3 sm:mb-4">
              <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/20 border border-primary rounded-full text-primary font-semibold text-xs sm:text-sm tracking-wide">
                SINCE 1985 • MELBOURNE, AUSTRALIA
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-6 leading-tight">
              {banners.length > 0 && banners[0].title
                ? banners[0].title
                : <>Artisanal <span className="gold-accent">Luxury</span> Jewelry</>
              }
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
              {banners.length > 0 && banners[0].description
                ? banners[0].description
                : "Discover our collection of timeless pieces, each meticulously crafted by master artisans using the finest materials and techniques passed down through generations in the heart of Melbourne."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {isAuthenticated ? (
                <>
                  <Link href="/catalog" className="w-full sm:w-auto">
                    <Button 
                      className="w-full luxury-border bg-primary hover:bg-primary/90 text-black px-6 py-3 sm:px-8 sm:py-4 font-semibold transition-all duration-300 transform hover:scale-105"
                      data-testid="button-explore-collections"
                    >
                      Explore Collections
                    </Button>
                  </Link>
                  <Link href="/about" className="w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-white text-white hover:bg-white hover:text-black px-6 py-3 sm:px-8 sm:py-4 font-semibold transition-all duration-300"
                      data-testid="button-watch-story"
                    >
                      Our Craftsmanship Story
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="w-full sm:w-auto">
                    <Button 
                      className="w-full luxury-border bg-primary hover:bg-primary/90 text-black px-6 py-3 sm:px-8 sm:py-4 font-semibold transition-all duration-300 transform hover:scale-105"
                      data-testid="button-visitor-login"
                    >
                      Login to View Collections
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-white text-white hover:bg-white hover:text-black px-6 py-3 sm:px-8 sm:py-4 font-semibold transition-all duration-300"
                      data-testid="button-visitor-signup"
                    >
                      Create Account
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-14 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2">Lifetime Warranty</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Premium protection for your investment</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Truck className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2">Free Shipping</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Complimentary delivery worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <RotateCcw className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2">30-Day Returns</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Hassle-free return policy</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2">Handcrafted</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Artisan-made with love and care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-10 sm:py-14 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3 sm:mb-4">Featured Collections</h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated collections, each telling a unique story of craftsmanship and elegance.
            </p>
          </div>
          
          <ProductGrid 
            products={featuredProducts} 
            showActions={true}
          />
          
          <div className="text-center mt-8 sm:mt-10">
            <Link href="/catalog">
              <Button 
                variant="outline" 
                className="px-6 py-3 sm:px-8 sm:py-4 font-semibold"
                data-testid="button-view-all"
              >
                View All Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quality Promise Section */}
      <section className="py-10 sm:py-14 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4 sm:mb-6">
                Our Promise of <span className="text-primary">Excellence</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Every piece in our collection represents decades of expertise and a commitment to uncompromising quality. 
                From ethically sourced materials to traditional techniques refined over generations, we ensure each creation 
                meets our exacting standards.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-foreground">Ethically Sourced Materials</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Conflict-free diamonds and responsibly mined precious metals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-foreground">Master Craftsmanship</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Handcrafted by artisans with over 30 years of experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-foreground">Quality Guarantee</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Comprehensive lifetime warranty and expert maintenance</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-lg shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
                  alt="Master craftsman at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-10 sm:py-14 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3 sm:mb-4">What Our Customers Say</h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              Read what our valued customers have to say about their experience with Artisanal Jewels.
            </p>
          </div>
          <CustomerTestimonials />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-10 sm:py-14 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}