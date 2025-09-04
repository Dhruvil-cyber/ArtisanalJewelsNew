import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Award, Users, Heart, MapPin, Clock, Star } from "lucide-react";

export default function About() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-background to-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                Our <span className="text-accent">Story</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Since 1985, Artisanal Jewels has been crafting timeless jewelry pieces with passion and precision in the heart of Melbourne, Australia. Our legacy is built on exceptional craftsmanship, ethical sourcing, and creating memories that last a lifetime.
              </p>
            </div>
          </div>
        </section>

        {/* Company History */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground mb-6">
                  Four Decades of <span className="text-accent">Excellence</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent text-white rounded-full p-2 mt-1">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">1985 - The Beginning</h3>
                      <p className="text-muted-foreground">Founded by master jeweler Alessandro Rossi in Melbourne's jewelry quarter, with a vision to create extraordinary pieces that tell unique stories.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent text-white rounded-full p-2 mt-1">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">1995 - Recognition</h3>
                      <p className="text-muted-foreground">Received the Australian Jewelry Excellence Award for our innovative designs and commitment to traditional craftsmanship.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent text-white rounded-full p-2 mt-1">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">2010 - Ethical Commitment</h3>
                      <p className="text-muted-foreground">Became one of the first certified conflict-free diamond retailers in Australia, establishing our ethical sourcing standards.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent text-white rounded-full p-2 mt-1">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">Today - Growing Legacy</h3>
                      <p className="text-muted-foreground">Now led by the second generation, we continue to honor our heritage while embracing modern techniques and sustainable practices.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Artisanal Jewels workshop"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">40+</div>
                    <div className="text-sm text-muted-foreground">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide every decision we make and every piece we create.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-xl text-foreground mb-3">Exceptional Craftsmanship</h3>
                <p className="text-muted-foreground">Every piece is meticulously handcrafted by our skilled artisans using time-honored techniques passed down through generations.</p>
              </div>
              
              <div className="text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-xl text-foreground mb-3">Ethical Sourcing</h3>
                <p className="text-muted-foreground">We are committed to responsible sourcing of all materials, ensuring our diamonds and precious metals are conflict-free.</p>
              </div>
              
              <div className="text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-xl text-foreground mb-3">Personal Service</h3>
                <p className="text-muted-foreground">We believe every customer deserves personalized attention and expert guidance in selecting or creating their perfect piece.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Contact */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground mb-6">
                  Visit Our <span className="text-accent">Melbourne</span> Showroom
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Experience our collections in person at our beautiful showroom located in Melbourne's premier jewelry district. Our expert consultants are ready to help you find or create the perfect piece.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-accent" />
                    <span className="text-foreground">123 Collins Street, Melbourne VIC 3000, Australia</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <div>
                      <div className="text-foreground font-medium">Monday - Friday: 9:00 AM - 6:00 PM</div>
                      <div className="text-muted-foreground">Saturday: 10:00 AM - 5:00 PM</div>
                      <div className="text-muted-foreground">Sunday: 11:00 AM - 4:00 PM</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button className="bg-accent hover:bg-accent/90 text-white px-6 py-3">
                      Contact Us
                    </Button>
                  </Link>
                  <Link href="/catalog">
                    <Button variant="outline" className="px-6 py-3">
                      Browse Collections
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Melbourne showroom"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground mb-4">
                Awards & Recognition
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our commitment to excellence has been recognized by industry leaders and customers alike.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { year: "2023", award: "Best Jewelry Store", org: "Melbourne Business Awards" },
                { year: "2022", award: "Ethical Business of the Year", org: "Australian Jewelry Association" },
                { year: "2021", award: "Customer Choice Award", org: "Jewelry Review Australia" },
                { year: "2020", award: "Craftmanship Excellence", org: "International Jewelry Guild" }
              ].map((award, index) => (
                <div key={index} className="text-center p-6 bg-background rounded-lg shadow-sm">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-2xl font-bold text-accent mb-2">{award.year}</div>
                  <h3 className="font-semibold text-foreground mb-1">{award.award}</h3>
                  <p className="text-sm text-muted-foreground">{award.org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}