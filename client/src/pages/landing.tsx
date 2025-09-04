import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import ProductGrid from "@/components/product/product-grid";
import { PromoBanner } from "@/components/PromoBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Heart, Shield, Truck, RotateCcw, Star, Check } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Landing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");

  // Fetch featured products
  const { data: featuredProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true, limit: 4 }],
    queryFn: () => fetch("/api/products?featured=true&limit=4").then(res => res.json()),
  });

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    console.log("Newsletter signup:", email);
  };

  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[600px] luxury-gradient overflow-hidden">
          <div className="hero-pattern absolute inset-0"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-primary/20 border border-primary rounded-full text-primary font-semibold text-sm tracking-wide">
                  SINCE 1985 • MELBOURNE, AUSTRALIA
                </span>
              </div>
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                Artisanal <span className="gold-accent">Luxury</span> Jewelry
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Discover our collection of timeless pieces, each meticulously crafted by master artisans using the finest materials and techniques passed down through generations in the heart of Melbourne.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="luxury-border bg-primary hover:bg-primary/90 text-black px-8 py-4 font-semibold transition-all duration-300 transform hover:scale-105"
                  data-testid="button-explore-collections"
                >
                  Explore Collections
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 font-semibold transition-all duration-300"
                  data-testid="button-watch-story"
                >
                  Our Craftsmanship Story
                </Button>
              </div>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-8 text-white/70">
              <div className="flex items-center space-x-2">
                <Shield className="text-accent" size={20} />
                <span className="text-sm">Lifetime Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="text-accent" size={20} />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="text-accent" size={20} />
                <span className="text-sm">30-Day Returns</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
                Featured Collections
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our carefully curated collections, each telling a unique story of craftsmanship and elegance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Collection Cards */}
              {[
                {
                  title: "Engagement Rings",
                  description: "Timeless symbols of love, crafted with the finest diamonds and precious metals.",
                  price: "From $2,500",
                  image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                },
                {
                  title: "Necklaces", 
                  description: "Elegant pieces that grace the neckline with sophistication and style.",
                  price: "From $890",
                  image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                },
                {
                  title: "Earrings",
                  description: "From subtle studs to statement drops, perfect for every occasion.",
                  price: "From $450", 
                  image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                }
              ].map((collection, index) => (
                <div key={index} className="card-hover bg-card rounded-lg overflow-hidden shadow-md border border-border">
                  <img 
                    src={collection.image} 
                    alt={`${collection.title} collection`}
                    className="w-full h-64 object-cover" 
                  />
                  <div className="p-6">
                    <h3 className="font-serif font-semibold text-xl text-foreground mb-2">{collection.title}</h3>
                    <p className="text-muted-foreground mb-4">{collection.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{collection.price}</span>
                      <Button 
                        variant="ghost"
                        className="text-accent hover:text-accent/80 font-medium"
                        data-testid={`button-explore-${collection.title.toLowerCase().replace(" ", "-")}`}
                      >
                        Explore Collection <span className="ml-2">→</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-semibold"
                data-testid="button-view-all-products"
              >
                View All Products
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
                Bestsellers
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our most loved pieces, chosen by discerning customers worldwide.
              </p>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-card rounded-lg border border-border p-4">
                    <div className="loading-shimmer w-full h-64 rounded bg-muted mb-4"></div>
                    <div className="loading-shimmer w-3/4 h-4 rounded bg-muted mb-2"></div>
                    <div className="loading-shimmer w-1/2 h-4 rounded bg-muted"></div>
                  </div>
                ))}
              </div>
            ) : (
              <ProductGrid products={featuredProducts} />
            )}
            
            <div className="text-center mt-12">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-semibold"
                data-testid="button-view-all-products-featured"
              >
                View All Products
              </Button>
            </div>
          </div>
        </section>

        {/* Craftsmanship Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
                  Master <span className="text-accent">Craftsmanship</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Each piece in our collection is meticulously handcrafted by skilled artisans who have dedicated their lives to perfecting their craft. Using time-honored techniques passed down through generations, we create jewelry that tells a story of excellence and passion.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    {
                      title: "Ethical Sourcing",
                      description: "Responsibly sourced materials from certified suppliers worldwide."
                    },
                    {
                      title: "Quality Guarantee", 
                      description: "Every piece comes with our lifetime craftsmanship warranty."
                    },
                    {
                      title: "Custom Design",
                      description: "Personalized pieces crafted to your exact specifications."
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-1">
                        <Check className="text-accent-foreground" size={12} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{feature.title}</h4>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 font-semibold"
                  data-testid="button-learn-process"
                >
                  Learn About Our Process
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Artisan crafting jewelry in workshop" 
                  className="rounded-lg shadow-lg" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Close-up of jewelry crafting tools and gems" 
                  className="rounded-lg shadow-lg mt-8" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Master jeweler inspecting a diamond" 
                  className="rounded-lg shadow-lg -mt-8" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Beautiful finished jewelry pieces" 
                  className="rounded-lg shadow-lg" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {[
                { icon: Shield, title: "Lifetime Warranty", description: "Comprehensive coverage on all craftsmanship" },
                { icon: Star, title: "Certified Gemstones", description: "GIA certified diamonds and precious stones" },
                { icon: Truck, title: "Free Shipping", description: "Insured delivery worldwide" },
                { icon: RotateCcw, title: "30-Day Returns", description: "Hassle-free return policy" }
              ].map((badge, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                    <badge.icon className="text-accent-foreground" size={24} />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{badge.title}</h4>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </div>
              ))}
            </div>
            
            {/* Customer Testimonials */}
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground mb-4">
                What Our Customers Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear from customers who have experienced the quality and beauty of our jewelry.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  rating: 5,
                  comment: "The engagement ring I purchased exceeded all expectations. The craftsmanship is incredible and the customer service was outstanding throughout the entire process.",
                  name: "Sarah M.",
                  verified: true
                },
                {
                  rating: 5,
                  comment: "I've been a customer for over 5 years and every piece I've purchased has been perfect. The quality is unmatched and the designs are timeless.",
                  name: "James R.",
                  verified: true
                },
                {
                  rating: 5,
                  comment: "The custom necklace they created for my anniversary was absolutely stunning. They brought my vision to life perfectly and the delivery was right on time.",
                  name: "Maria L.",
                  verified: true
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-card rounded-lg p-6 shadow-md border border-border">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">{testimonial.name}</h5>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.verified ? "Verified Customer" : "Customer"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white mb-4">
                Stay in the Know
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Be the first to discover new collections, exclusive offers, and jewelry care tips from our master craftsmen.
              </p>
              
              <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-background text-foreground"
                    data-testid="input-newsletter-email"
                    required
                  />
                  <Button 
                    type="submit"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 font-semibold whitespace-nowrap"
                    data-testid="button-newsletter-subscribe"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-sm text-gray-300 mt-3">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
