import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Award, Users, Clock, Star, MapPin } from "lucide-react";

export default function OurStory() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <Heart className="w-16 h-16 text-rose-600 mx-auto mb-4" />
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                Our <span className="gold-accent">Story</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A journey of passion, craftsmanship, and dedication to creating 
                jewelry that captures life's most precious moments.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100">
                <Clock className="w-4 h-4 mr-1" />
                Since 1985
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                <MapPin className="w-4 h-4 mr-1" />
                Melbourne, Australia
              </Badge>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                <Award className="w-4 h-4 mr-1" />
                40 Years Excellence
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* The Beginning */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-6">
                The Beginning
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Artisanal Jewels was founded in 1985 by master craftsman David Chen, 
                whose vision was to create jewelry that tells stories and captures the 
                essence of life's most meaningful moments.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Starting as a small workshop in Melbourne's jewelry quarter, David combined 
                traditional European techniques with modern innovation to create pieces that 
                were both timeless and contemporary.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-semibold">1985:</span>
                  <span className="text-muted-foreground">Founded in Melbourne</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="font-semibold">1990:</span>
                  <span className="text-muted-foreground">First industry recognition</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-primary" />
                  <span className="font-semibold">1995:</span>
                  <span className="text-muted-foreground">Expanded to custom designs</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Heart className="w-24 h-24 text-primary/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">David Chen, Founder</p>
                  <p className="text-sm text-muted-foreground mt-2">Master Craftsman since 1985</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do, from selecting materials to 
              crafting each piece with meticulous attention to detail.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Excellence</h3>
                <p className="text-muted-foreground text-sm">
                  Uncompromising quality in every design, material, and craftsmanship detail.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Passion</h3>
                <p className="text-muted-foreground text-sm">
                  Deep love for the art of jewelry making drives our creative process.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Legacy</h3>
                <p className="text-muted-foreground text-sm">
                  Creating heirloom pieces that will be treasured for generations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Innovation</h3>
                <p className="text-muted-foreground text-sm">
                  Blending traditional techniques with modern design and technology.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Four Decades of Excellence
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our journey to becoming Melbourne's premier jewelry destination.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">85</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">1985 - The Foundation</h3>
                  <p className="text-muted-foreground">
                    David Chen opens his first workshop in Melbourne, focusing on bespoke engagement rings 
                    and wedding bands with traditional European craftsmanship techniques.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-secondary-foreground font-bold">92</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">1992 - Recognition</h3>
                  <p className="text-muted-foreground">
                    Received the Melbourne Artisan Excellence Award, establishing our reputation 
                    for exceptional craftsmanship and innovative designs in the Australian market.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-accent-foreground font-bold">98</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">1998 - Expansion</h3>
                  <p className="text-muted-foreground">
                    Opened our flagship showroom and introduced our signature custom design service, 
                    allowing clients to create completely personalized jewelry pieces.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">05</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2005 - Innovation</h3>
                  <p className="text-muted-foreground">
                    Pioneered the use of CAD design and 3D printing in custom jewelry creation, 
                    while maintaining our commitment to traditional hand-finishing techniques.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-secondary-foreground font-bold">15</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2015 - Sustainability</h3>
                  <p className="text-muted-foreground">
                    Committed to ethical sourcing and sustainable practices, becoming certified 
                    for conflict-free diamonds and responsible precious metal sourcing.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-accent-foreground font-bold">25</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2025 - Digital Evolution</h3>
                  <p className="text-muted-foreground">
                    Launched our comprehensive online platform while maintaining our commitment 
                    to personal service and artisanal craftsmanship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The talented artisans and specialists who bring your jewelry dreams to life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">David Chen</h3>
                <p className="text-primary font-medium mb-3">Master Craftsman & Founder</p>
                <p className="text-muted-foreground text-sm">
                  40 years of experience in fine jewelry creation, specializing in 
                  custom engagement rings and vintage restoration.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Sarah Mitchell</h3>
                <p className="text-primary font-medium mb-3">Design Director</p>
                <p className="text-muted-foreground text-sm">
                  Award-winning designer with expertise in contemporary styles and 
                  sustainable jewelry practices.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-accent" />
                </div>
                <h3 className="font-semibold text-xl mb-2">James Rodriguez</h3>
                <p className="text-primary font-medium mb-3">Senior Goldsmith</p>
                <p className="text-muted-foreground text-sm">
                  Master goldsmith specializing in intricate hand-engraving and 
                  complex setting techniques.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Looking Forward */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Looking Forward
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            As we look to the future, we remain committed to our founding principles of 
            excellence, craftsmanship, and personal service. We continue to evolve while 
            honoring the traditions that make each piece of jewelry truly special.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every piece we create carries forward our legacy of passion, precision, and 
            the timeless art of fine jewelry making.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}