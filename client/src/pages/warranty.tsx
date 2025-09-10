import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, Gem, Award, CheckCircle, Star } from "lucide-react";

export default function Warranty() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                Lifetime <span className="gold-accent">Warranty</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Your investment in fine jewelry is protected with our comprehensive 
                warranty coverage, ensuring your pieces remain beautiful for generations.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <Shield className="w-4 h-4 mr-1" />
                Lifetime Coverage
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                <Award className="w-4 h-4 mr-1" />
                Master Craftsmanship
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                <Star className="w-4 h-4 mr-1" />
                Free Inspections
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Coverage */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What's Covered
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive warranty protects your investment with coverage for craftsmanship, 
              materials, and structural integrity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Gem className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Craftsmanship Defects</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Full coverage for any manufacturing defects or workmanship issues for the lifetime of the piece.
                </p>
                <div className="text-sm text-muted-foreground">
                  <p>• Prong loosening</p>
                  <p>• Setting failures</p>
                  <p>• Structural weakness</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Material Quality</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Guarantee on the quality and authenticity of all precious metals and gemstones.
                </p>
                <div className="text-sm text-muted-foreground">
                  <p>• Metal purity verification</p>
                  <p>• Gemstone authenticity</p>
                  <p>• Diamond grading accuracy</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Structural Integrity</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Protection against structural failures under normal wear conditions.
                </p>
                <div className="text-sm text-muted-foreground">
                  <p>• Chain link integrity</p>
                  <p>• Clasp functionality</p>
                  <p>• Joint reinforcement</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Warranty Terms */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center">
            Warranty Terms & Conditions
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                What's Included
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Free Repairs</h4>
                    <p className="text-muted-foreground text-sm">All covered repairs performed at no cost to you.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Annual Inspections</h4>
                    <p className="text-muted-foreground text-sm">Free yearly checkups to catch issues early.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Cleaning Services</h4>
                    <p className="text-muted-foreground text-sm">Professional cleaning and polishing included.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Rhodium Plating</h4>
                    <p className="text-muted-foreground text-sm">White gold re-plating every 2 years.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Important Notes</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2">Normal Wear Coverage</h4>
                  <p className="text-muted-foreground text-sm">
                    Warranty covers defects and failures under normal wear conditions. 
                    Damage from accidents or abuse is not covered.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2">Original Purchase Required</h4>
                  <p className="text-muted-foreground text-sm">
                    Warranty is valid only for original purchasers with proof of purchase. 
                    Some services may be available to subsequent owners for a fee.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2">Professional Service Only</h4>
                  <p className="text-muted-foreground text-sm">
                    All warranty work must be performed by our certified jewelers. 
                    Repairs by others may void warranty coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Levels */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Service Levels
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Different warranty coverage levels based on your purchase value and item type.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <Badge className="bg-bronze-100 text-bronze-800 mb-4">Essential</Badge>
                <h3 className="font-semibold text-xl mb-3">Under $1,000</h3>
                <div className="space-y-2 text-sm text-muted-foreground mb-6">
                  <p>• 2-year craftsmanship warranty</p>
                  <p>• Annual inspection included</p>
                  <p>• Basic cleaning services</p>
                  <p>• Standard repair timeline</p>
                </div>
                <p className="font-semibold text-primary">Included with purchase</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-primary">
              <CardContent className="p-8">
                <Badge className="bg-primary text-primary-foreground mb-4">Premium</Badge>
                <h3 className="font-semibold text-xl mb-3">$1,000 - $5,000</h3>
                <div className="space-y-2 text-sm text-muted-foreground mb-6">
                  <p>• 5-year craftsmanship warranty</p>
                  <p>• Bi-annual inspections</p>
                  <p>• Professional cleaning & polishing</p>
                  <p>• Priority repair service</p>
                  <p>• Rhodium plating included</p>
                </div>
                <p className="font-semibold text-primary">Included with purchase</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <Badge className="bg-amber-100 text-amber-800 mb-4">Lifetime</Badge>
                <h3 className="font-semibold text-xl mb-3">Over $5,000</h3>
                <div className="space-y-2 text-sm text-muted-foreground mb-6">
                  <p>• Lifetime craftsmanship warranty</p>
                  <p>• Quarterly inspections</p>
                  <p>• White-glove service</p>
                  <p>• Express repair service</p>
                  <p>• All maintenance included</p>
                  <p>• Concierge pickup/delivery</p>
                </div>
                <p className="font-semibold text-primary">Included with purchase</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Care Instructions */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Maintaining Your Warranty
              </h2>
              <p className="text-muted-foreground mb-6">
                Follow these simple care guidelines to ensure your warranty remains valid 
                and your jewelry maintains its beauty.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Regular Inspections</h4>
                    <p className="text-muted-foreground text-sm">Schedule annual checkups to catch issues early.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Gem className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Proper Storage</h4>
                    <p className="text-muted-foreground text-sm">Store pieces separately to prevent scratching.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Gentle Cleaning</h4>
                    <p className="text-muted-foreground text-sm">Clean regularly with appropriate methods.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Shield className="w-24 h-24 text-primary/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Warranty Protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Claims */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Need Warranty Service?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact our service team to schedule your warranty inspection or repair service.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Service Email</h4>
              <p className="text-muted-foreground">service@artisanaljewels.com</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Service Phone</h4>
              <p className="text-muted-foreground">+61 451565356</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Service Hours</h4>
              <p className="text-muted-foreground">Mon-Fri: 9am-5pm AEST</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}