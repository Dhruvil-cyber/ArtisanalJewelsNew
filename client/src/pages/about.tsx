import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Award, Users, Heart, MapPin, Clock, Star } from "lucide-react";

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-background to-muted">
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
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
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
      <section className="py-12 sm:py-16 lg:py-20 bg-muted">
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
              <p className="text-muted-foreground">We are committed to responsible sourcing practices, ensuring all our materials are ethically obtained and conflict-free.</p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-xl text-foreground mb-3">Customer Excellence</h3>
              <p className="text-muted-foreground">Your satisfaction is our priority. We provide exceptional service from consultation to after-sales support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Meet Our Artisans
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our talented team of master craftspeople brings decades of experience and passion to every creation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
                alt="Alessandro Rossi"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-xl text-foreground mb-2">Alessandro Rossi</h3>
              <p className="text-accent mb-2">Founder & Master Jeweler</p>
              <p className="text-sm text-muted-foreground">40+ years of experience in traditional European jewelry making techniques.</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b589?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
                alt="Sofia Martinez"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-xl text-foreground mb-2">Sofia Martinez</h3>
              <p className="text-accent mb-2">Design Director</p>
              <p className="text-sm text-muted-foreground">Specializes in contemporary designs with classical influences.</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
                alt="Marcus Chen"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-xl text-foreground mb-2">Marcus Chen</h3>
              <p className="text-accent mb-2">Stone Setting Expert</p>
              <p className="text-sm text-muted-foreground">Master of precision stone setting and custom mounting techniques.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl mb-6">
            Experience the Artisanal Difference
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Visit our Melbourne showroom to see our craftsmanship up close and discover your perfect piece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                variant="secondary" 
                size="lg" 
                className="px-8 py-4 font-semibold"
                data-testid="button-contact-us"
              >
                Schedule a Consultation
              </Button>
            </Link>
            <Link href="/catalog">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 font-semibold border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent"
                data-testid="button-view-collections"
              >
                View Our Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}