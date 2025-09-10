import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gem, Hammer, Eye, Award, Star, Clock } from "lucide-react";

export default function Craftsmanship() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <Hammer className="w-16 h-16 text-amber-600 mx-auto mb-4" />
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                Master <span className="gold-accent">Craftsmanship</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Discover the artistry, skill, and passion that goes into creating 
                each piece of jewelry. Where traditional techniques meet modern precision.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                <Award className="w-4 h-4 mr-1" />
                Master Artisans
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                <Clock className="w-4 h-4 mr-1" />
                40+ Years Experience
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <Star className="w-4 h-4 mr-1" />
                Hand-Finished
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* The Craft */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-6">
                The Art of Fine Jewelry
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Each piece begins as a vision - a moment, a feeling, a story waiting to be told. 
                Our master craftsmen transform precious metals and gemstones into wearable art 
                through time-honored techniques passed down through generations.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                From the initial sketch to the final polish, every step is executed with 
                meticulous attention to detail, ensuring that each piece meets our exacting 
                standards of beauty, durability, and emotional resonance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Gem className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Hand-selected premium materials</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Microscopic precision in every detail</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Quality assurance at every stage</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Hammer className="w-24 h-24 text-primary/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Traditional Tools</p>
                  <p className="text-sm text-muted-foreground mt-2">Modern Precision</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Creation Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From concept to completion, each piece follows our rigorous process 
              that ensures exceptional quality and lasting beauty.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold text-lg">1</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Design Conception</h3>
                  <p className="text-muted-foreground text-sm">
                    Every piece starts with inspiration. Our designers create detailed sketches 
                    and 3D models to perfect proportions and aesthetics.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-600 font-bold text-lg">2</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Material Selection</h3>
                  <p className="text-muted-foreground text-sm">
                    We hand-select the finest precious metals and certified gemstones, 
                    ensuring each component meets our strict quality standards.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-amber-600 font-bold text-lg">3</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Metalwork</h3>
                  <p className="text-muted-foreground text-sm">
                    Master goldsmiths shape, forge, and form the metal components using 
                    traditional techniques combined with modern precision tools.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 font-bold text-lg">4</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Stone Setting</h3>
                  <p className="text-muted-foreground text-sm">
                    Expert setters carefully position and secure each gemstone using 
                    appropriate techniques for maximum security and light reflection.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-rose-600 font-bold text-lg">5</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Finishing</h3>
                  <p className="text-muted-foreground text-sm">
                    Meticulous hand-finishing includes polishing, texturing, and surface 
                    treatments to achieve the perfect final appearance.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-indigo-600 font-bold text-lg">6</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Quality Control</h3>
                  <p className="text-muted-foreground text-sm">
                    Each completed piece undergoes rigorous inspection to ensure it meets 
                    our exacting standards before reaching you.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Techniques */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Traditional Techniques
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Time-honored methods that have been perfected over centuries, 
              ensuring each piece is crafted with authentic artistry.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="text-center">
                <Hammer className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Hand Forging</h3>
                <p className="text-muted-foreground">
                  Ancient technique of shaping metal through controlled hammering, 
                  creating unique textures and ensuring optimal metal density.
                </p>
              </div>
              
              <div className="text-center">
                <Gem className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Precision Setting</h3>
                <p className="text-muted-foreground">
                  Microscopic placement of gemstones using traditional prong, bezel, 
                  and pavé techniques for maximum security and brilliance.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Hand Engraving</h3>
                <p className="text-muted-foreground">
                  Intricate patterns and designs carved by hand using traditional 
                  gravers, adding personalized details and decorative elements.
                </p>
              </div>
              
              <div className="text-center">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Lost Wax Casting</h3>
                <p className="text-muted-foreground">
                  Ancient technique for creating complex forms and intricate details 
                  that would be impossible through other metalworking methods.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Chain Making</h3>
                <p className="text-muted-foreground">
                  Individual links crafted and joined by hand to create chains with 
                  perfect drape, strength, and visual consistency.
                </p>
              </div>
              
              <div className="text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Surface Finishing</h3>
                <p className="text-muted-foreground">
                  Multiple stages of polishing, brushing, and texturing to achieve 
                  the perfect surface quality and desired aesthetic effect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Eye className="w-24 h-24 text-primary/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Quality Inspection</p>
                  <p className="text-sm text-muted-foreground mt-2">10x Magnification</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Uncompromising Quality
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Every piece that leaves our workshop must meet the highest standards of 
                craftsmanship, durability, and aesthetic perfection. Our multi-stage 
                quality control process ensures consistent excellence.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Eye className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Microscopic Inspection</h4>
                    <p className="text-muted-foreground text-sm">Every detail examined under 10x magnification for perfection.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Gem className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Gemstone Verification</h4>
                    <p className="text-muted-foreground text-sm">Each stone verified for authenticity, grade, and secure setting.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Structural Testing</h4>
                    <p className="text-muted-foreground text-sm">Durability testing ensures pieces withstand daily wear.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Final Polish</h4>
                    <p className="text-muted-foreground text-sm">Hand-polished to perfection before packaging.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Innovation */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Tradition Meets Innovation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              While honoring traditional methods, we embrace modern technology 
              to enhance precision and expand creative possibilities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="font-semibold text-xl mb-4 flex items-center">
                  <Hammer className="w-6 h-6 text-primary mr-3" />
                  Traditional Methods
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• Hand forging and forming techniques</p>
                  <p>• Traditional stone setting methods</p>
                  <p>• Classical engraving and texturing</p>
                  <p>• Time-honored polishing processes</p>
                  <p>• Master craftsman expertise</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <h3 className="font-semibold text-xl mb-4 flex items-center">
                  <Star className="w-6 h-6 text-primary mr-3" />
                  Modern Innovation
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• CAD design and 3D modeling</p>
                  <p>• Precision laser technology</p>
                  <p>• Advanced metallurgy techniques</p>
                  <p>• Digital quality verification</p>
                  <p>• Enhanced durability testing</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Gem className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Experience Master Craftsmanship
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover the difference that true artistry makes. Each piece carries 
            the legacy of traditional craftsmanship and modern excellence.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit our workshop to witness the creation process firsthand and 
            meet the artisans who bring your jewelry dreams to life.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}