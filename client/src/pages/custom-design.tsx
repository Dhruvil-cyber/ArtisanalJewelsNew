import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Crown, Gem, Palette, Clock, Users, Award } from "lucide-react";

export default function CustomDesign() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jewelryType: "",
    budget: "",
    timeline: "",
    description: "",
    inspiration: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Custom design request:", formData);
  };

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
              <Crown className="w-16 h-16 text-amber-600 mx-auto mb-4" />
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                Custom <span className="gold-accent">Design</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Create a one-of-a-kind piece that tells your unique story. 
                Our master craftsmen will work with you to design and create 
                jewelry that perfectly captures your vision and dreams.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                <Palette className="w-4 h-4 mr-1" />
                Personal Design
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                <Gem className="w-4 h-4 mr-1" />
                Premium Materials
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <Award className="w-4 h-4 mr-1" />
                Master Craftsmanship
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Design Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From initial concept to final creation, we guide you through every step of bringing your dream jewelry to life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Consultation</h3>
                <p className="text-muted-foreground text-sm">
                  Share your vision and preferences with our design experts.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Design</h3>
                <p className="text-muted-foreground text-sm">
                  Receive detailed sketches and 3D renderings of your piece.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-600 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Approval</h3>
                <p className="text-muted-foreground text-sm">
                  Review and refine the design until it's perfect.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold text-lg">4</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Creation</h3>
                <p className="text-muted-foreground text-sm">
                  Master craftsmen bring your design to life with precision.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Custom Design Form */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Start Your Custom Design
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tell us about your dream piece and we'll begin the journey of creating something truly extraordinary.
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-xl">Design Consultation Request</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        data-testid="input-phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="jewelryType">Jewelry Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("jewelryType", value)}>
                        <SelectTrigger data-testid="select-jewelry-type">
                          <SelectValue placeholder="Select jewelry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engagement-ring">Engagement Ring</SelectItem>
                          <SelectItem value="wedding-band">Wedding Band</SelectItem>
                          <SelectItem value="necklace">Necklace</SelectItem>
                          <SelectItem value="earrings">Earrings</SelectItem>
                          <SelectItem value="bracelet">Bracelet</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger data-testid="select-budget">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-5k">Under $5,000</SelectItem>
                          <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="over-50k">Over $50,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeline">Timeline</Label>
                      <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger data-testid="select-timeline">
                          <SelectValue placeholder="When do you need this?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">As soon as possible</SelectItem>
                          <SelectItem value="1-month">Within 1 month</SelectItem>
                          <SelectItem value="3-months">Within 3 months</SelectItem>
                          <SelectItem value="6-months">Within 6 months</SelectItem>
                          <SelectItem value="flexible">Flexible timeline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Design Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your vision in detail - style, materials, special features, etc."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      required
                      data-testid="textarea-description"
                    />
                  </div>

                  <div>
                    <Label htmlFor="inspiration">Inspiration & References</Label>
                    <Textarea
                      id="inspiration"
                      placeholder="Share any inspiration sources, similar pieces you admire, or special meaning behind the design"
                      rows={3}
                      value={formData.inspiration}
                      onChange={(e) => handleInputChange("inspiration", e.target.value)}
                      data-testid="textarea-inspiration"
                    />
                  </div>

                  <div className="text-center pt-6">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                      data-testid="button-submit-design"
                    >
                      Request Design Consultation
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Custom Design?
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Expert Guidance</h3>
                <p className="text-muted-foreground">
                  Work directly with our master jewelers who bring decades of experience and artistic vision to your project.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Gem className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Premium Materials</h3>
                <p className="text-muted-foreground">
                  Access to the finest diamonds, gemstones, and precious metals sourced from trusted suppliers worldwide.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Lifetime Value</h3>
                <p className="text-muted-foreground">
                  Custom pieces become treasured heirlooms, maintaining their value and meaning for generations to come.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Crown className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ready to Create Something Extraordinary?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our design team to discuss your vision and begin the journey of creating your perfect piece.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Schedule Consultation
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Meet Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}