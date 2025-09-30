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

  const { data: featuredProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true, limit: 4 }],
  });

  const { data: banners = [] } = useQuery<Banner[]>({
    queryKey: ["/api/banners"],
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        {banners.length > 0 && banners[0].images && Array.isArray(banners[0].images) && banners[0].images.length > 0 && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: `url('${banners[0].images[0].url}')`
            }}
          />
        )}
        
        <div className="gradient-overlay absolute inset-0" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif">
              {banners.length > 0 && banners[0].title ? banners[0].title : "Artisanal Luxury Jewelry"}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              {banners.length > 0 && banners[0].description
                ? banners[0].description
                : "Discover our collection of timeless pieces, crafted with precision and passion."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <>
                  <Link href="/catalog">
                    <Button size="lg" className="w-full sm:w-auto" data-testid="button-explore-collections">
                      Explore Collections
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto" data-testid="button-watch-story">
                      Our Story
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button size="lg" className="w-full sm:w-auto" data-testid="button-visitor-login">
                      Login to View Collections
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto" data-testid="button-visitor-signup">
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
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Lifetime Warranty</h3>
              <p className="text-sm text-muted-foreground">Premium protection</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Truck className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">Worldwide delivery</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <RotateCcw className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">30-Day Returns</h3>
              <p className="text-sm text-muted-foreground">Hassle-free policy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Handcrafted</h3>
              <p className="text-sm text-muted-foreground">Made with care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Featured Collections
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated collections
            </p>
          </div>
          
          <ProductGrid 
            products={featuredProducts} 
            showActions={true}
          />
          
          <div className="text-center mt-12">
            <Link href="/catalog">
              <Button variant="outline" size="lg" data-testid="button-view-all">
                View All Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
                Our Promise of Excellence
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Every piece represents decades of expertise and commitment to quality.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Ethically Sourced</h4>
                    <p className="text-sm text-muted-foreground">Conflict-free diamonds and responsibly mined metals</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Master Craftsmanship</h4>
                    <p className="text-sm text-muted-foreground">Handcrafted by artisans with 30+ years experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Quality Guarantee</h4>
                    <p className="text-sm text-muted-foreground">Lifetime warranty and expert maintenance</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-lg">
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

      {/* Testimonials */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Read what our valued customers have to say
            </p>
          </div>
          <CustomerTestimonials />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}