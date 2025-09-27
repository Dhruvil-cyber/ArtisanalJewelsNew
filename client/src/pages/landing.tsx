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
      <section className="relative min-h-[80vh] lg:min-h-[90vh] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: banners.length > 0 && banners[0].images && Array.isArray(banners[0].images) && banners[0].images.length > 0
              ? `url('${banners[0].images[0].url}')`
              : "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&h=1600')"
          }}
        >
          {/* Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-onyx/90 via-charcoal/70 to-onyx/60"></div>
          {/* Subtle Gold Accent Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-gold-500/5"></div>
        </div>
        
        {/* Hero Pattern */}
        <div className="hero-pattern absolute inset-0 mix-blend-overlay opacity-20"></div>
        
        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')"
        }}></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center min-h-[80vh] lg:min-h-[90vh]">
          <div className="max-w-3xl w-full">
            {/* Badge */}
            <div className="mb-6 sm:mb-8 animate-fade-in">
              <span className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-gold-500/20 to-gold-300/20 backdrop-blur-sm border border-gold-500/30 rounded-full text-gold-300 font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-luxury">
                <span className="w-2 h-2 bg-gold-500 rounded-full mr-3 animate-pulse"></span>
                Since 1985 • Melbourne, Australia
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-ivory mb-6 sm:mb-8 leading-[0.9] tracking-tighter">
              {banners.length > 0 && banners[0].title ? (
                <span className="block">
                  {banners[0].title.split(' ').map((word, index, words) => (
                    <span key={index} className={index === Math.floor(words.length / 2) ? "gold-accent block" : ""}>
                      {word}{index < words.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="block">
                  Artisanal{' '}
                  <span className="gold-accent block sm:inline">Luxury</span>{' '}
                  Jewelry
                </span>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-ivory/90 mb-8 sm:mb-12 leading-relaxed font-light max-w-2xl">
              {banners.length > 0 && banners[0].description
                ? banners[0].description
                : "Discover our collection of timeless pieces, each meticulously crafted by master artisans using the finest materials and techniques passed down through generations."
              }
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {isAuthenticated ? (
                <>
                  <Link href="/catalog" className="group">
                    <Button 
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-onyx px-8 py-4 sm:px-10 sm:py-5 font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-gold-glow rounded-xl"
                      data-testid="button-explore-collections"
                    >
                      Explore Collections
                      <div className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</div>
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="w-full sm:w-auto border-2 border-ivory/30 text-ivory hover:bg-ivory/10 hover:border-ivory/50 backdrop-blur-sm px-8 py-4 sm:px-10 sm:py-5 font-semibold text-base sm:text-lg transition-all duration-300 rounded-xl"
                      data-testid="button-watch-story"
                    >
                      Our Story
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="group">
                    <Button 
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-onyx px-8 py-4 sm:px-10 sm:py-5 font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-gold-glow rounded-xl"
                      data-testid="button-visitor-login"
                    >
                      Login to View Collections
                      <div className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</div>
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="w-full sm:w-auto border-2 border-ivory/30 text-ivory hover:bg-ivory/10 hover:border-ivory/50 backdrop-blur-sm px-8 py-4 sm:px-10 sm:py-5 font-semibold text-base sm:text-lg transition-all duration-300 rounded-xl"
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
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-ivory/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold-500 rounded-full mt-2 animate-pulse"></div>
          </div>
          <p className="text-ivory/70 text-xs mt-2 text-center">Scroll to explore</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-gold-500/10 to-gold-600/10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-luxury">
                <Shield className="text-gold-600" size={24} />
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2">Lifetime Warranty</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Premium protection for your investment</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-gold-500/10 to-gold-600/10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-luxury">
                <Truck className="text-gold-600" size={24} />
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2">Free Shipping</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Complimentary delivery worldwide</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-gold-500/10 to-gold-600/10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-luxury">
                <RotateCcw className="text-gold-600" size={24} />
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2">30-Day Returns</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Hassle-free return policy</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-gold-500/10 to-gold-600/10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-luxury">
                <Heart className="text-gold-600" size={24} />
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2">Handcrafted</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Artisan-made with love and care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 tracking-tight">
              Featured <span className="gold-accent">Collections</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore our carefully curated collections, each telling a unique story of craftsmanship and elegance.
            </p>
          </div>
          
          <ProductGrid 
            products={featuredProducts} 
            showActions={true}
          />
          
          <div className="text-center mt-10 sm:mt-12">
            <Link href="/catalog">
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 font-semibold border-2 hover:bg-gold-500/10 hover:border-gold-500 transition-all duration-300"
                data-testid="button-view-all"
              >
                View All Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quality Promise Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6 tracking-tight">
                Our Promise of <span className="gold-accent">Excellence</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
                Every piece in our collection represents decades of expertise and a commitment to uncompromising quality. 
                From ethically sourced materials to traditional techniques refined over generations, we ensure each creation 
                meets our exacting standards.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg text-foreground mb-2">Ethically Sourced Materials</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">Conflict-free diamonds and responsibly mined precious metals</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg text-foreground mb-2">Master Craftsmanship</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">Handcrafted by artisans with over 30 years of experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg text-foreground mb-2">Quality Guarantee</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">Comprehensive lifetime warranty and expert maintenance</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-square overflow-hidden rounded-2xl shadow-luxury group-hover:shadow-luxury-hover transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
                  alt="Master craftsman at work"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-luxury border border-gold-500/20">
                <div className="text-center">
                  <div className="text-3xl font-bold gold-accent">40+</div>
                  <div className="text-sm text-muted-foreground">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 tracking-tight">
              What Our <span className="gold-accent">Customers Say</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Read what our valued customers have to say about their experience with Artisanal Jewels.
            </p>
          </div>
          <CustomerTestimonials />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}