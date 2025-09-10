import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Shield, RotateCcw, Package, Clock, Globe } from "lucide-react";

export default function ShippingReturns() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <Truck className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                Shipping & <span className="gold-accent">Returns</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're committed to delivering your jewelry safely and providing 
                flexible return options for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Shipping Options
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the delivery method that best suits your needs, all with full insurance and tracking.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Standard Delivery</h3>
                <div className="mb-4">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    FREE on orders over $500
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  5-7 business days delivery with signature required and full insurance coverage.
                </p>
                <p className="font-semibold text-lg">$25 AUD</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow border-primary">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Express Delivery</h3>
                <div className="mb-4">
                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                    Most Popular
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  2-3 business days delivery with premium packaging and white-glove service.
                </p>
                <p className="font-semibold text-lg">$50 AUD</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">International</h3>
                <div className="mb-4">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                    Worldwide shipping
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">
                  7-14 business days with customs clearance support and full tracking.
                </p>
                <p className="font-semibold text-lg">From $75 AUD</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Shipping Details */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center">
            Shipping Information
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Packaging & Security</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Secure Packaging</h4>
                    <p className="text-muted-foreground">All jewelry is packaged in our signature boxes with tamper-evident seals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Package className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Full Insurance</h4>
                    <p className="text-muted-foreground">Every shipment is fully insured for the full retail value.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Truck className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Signature Required</h4>
                    <p className="text-muted-foreground">Adult signature required for all deliveries over $100.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Processing Time</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Ready-to-Ship Items</h4>
                    <p className="text-muted-foreground">1-2 business days for items in stock.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Made-to-Order</h4>
                    <p className="text-muted-foreground">3-5 business days for personalized items.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Custom Designs</h4>
                    <p className="text-muted-foreground">4-8 weeks depending on complexity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Returns Policy */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <RotateCcw className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Returns & Exchanges
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your satisfaction is our priority. We offer flexible return and exchange options.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Return Policy</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-lg mb-2">30-Day Return Window</h4>
                  <p className="text-muted-foreground">
                    Return or exchange unworn items within 30 days of delivery for a full refund or store credit.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-lg mb-2">Condition Requirements</h4>
                  <p className="text-muted-foreground">
                    Items must be unworn, undamaged, and in original packaging with all tags attached.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-lg mb-2">Return Shipping</h4>
                  <p className="text-muted-foreground">
                    We provide prepaid return labels for all returns within Australia.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Exchange Process</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-primary text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Contact Us</h4>
                    <p className="text-muted-foreground text-sm">Email us at returns@artisanaljewels.com to initiate your return.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-primary text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Receive Return Kit</h4>
                    <p className="text-muted-foreground text-sm">We'll send you a prepaid return label and instructions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-primary text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Ship & Process</h4>
                    <p className="text-muted-foreground text-sm">Send the item back and we'll process your refund within 5-7 days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Circumstances */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-12 text-center">
            Special Circumstances
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-4">Custom & Personalized Items</h3>
                <p className="text-muted-foreground mb-4">
                  Custom designs and personalized items are final sale due to their unique nature. 
                  We'll work with you during the design process to ensure complete satisfaction.
                </p>
                <div className="text-sm text-muted-foreground">
                  <p>• Engagement rings with custom settings</p>
                  <p>• Engraved jewelry</p>
                  <p>• Made-to-measure pieces</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-4">Damaged or Defective Items</h3>
                <p className="text-muted-foreground mb-4">
                  If you receive a damaged or defective item, we'll provide a full refund 
                  or replacement at no cost to you.
                </p>
                <div className="text-sm text-muted-foreground">
                  <p>• Report within 48 hours of delivery</p>
                  <p>• Photos required for damage claims</p>
                  <p>• Express replacement available</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Questions About Shipping or Returns?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our customer service team is here to help with any questions about your order.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Email Support</h4>
              <p className="text-muted-foreground">support@artisanaljewels.com</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Phone Support</h4>
              <p className="text-muted-foreground">+61 451565356</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Business Hours</h4>
              <p className="text-muted-foreground">Mon-Fri: 9am-6pm AEST</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}