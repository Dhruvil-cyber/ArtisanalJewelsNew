import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Shield, Heart, Globe, Recycle, Award } from "lucide-react";

export default function EthicsSustainability() {
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
              <Leaf className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                Ethics & <span className="gold-accent">Sustainability</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our unwavering commitment to responsible practices, ethical sourcing, 
                and environmental stewardship in every aspect of our business.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <Shield className="w-4 h-4 mr-1" />
                Conflict-Free
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                <Recycle className="w-4 h-4 mr-1" />
                Sustainable Practices
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                <Award className="w-4 h-4 mr-1" />
                Certified Ethical
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Our Commitment
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                At Artisanal Jewels, we believe that true beauty comes from doing what's right. 
                Since our founding in 1985, we have been committed to ethical practices that 
                respect both people and our planet.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Every piece of jewelry we create reflects our values of integrity, responsibility, 
                and respect for the communities and environments that provide our precious materials.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">100% conflict-free diamonds and gemstones</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Leaf className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Responsibly sourced precious metals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Fair trade and community support</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Leaf className="w-24 h-24 text-primary/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Sustainable Sourcing</p>
                  <p className="text-sm text-muted-foreground mt-2">Ethical Practices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Areas */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Key Focus Areas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We approach sustainability and ethics through multiple interconnected initiatives 
              that create positive impact across our value chain.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Responsible Sourcing</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  All diamonds and gemstones are certified conflict-free and sourced from 
                  mines that adhere to strict labor and environmental standards.
                </p>
                <div className="text-xs text-muted-foreground">
                  <p>• Kimberley Process certified diamonds</p>
                  <p>• Traceable supply chains</p>
                  <p>• Regular supplier audits</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Recycle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Sustainable Materials</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Recycled precious metals and lab-grown alternatives reduce environmental 
                  impact while maintaining exceptional quality.
                </p>
                <div className="text-xs text-muted-foreground">
                  <p>• 75% recycled gold and silver</p>
                  <p>• Lab-grown diamond options</p>
                  <p>• Sustainable packaging</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Community Impact</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Supporting mining communities through fair trade practices and 
                  educational programs that create lasting positive change.
                </p>
                <div className="text-xs text-muted-foreground">
                  <p>• Fair wage initiatives</p>
                  <p>• Education and training programs</p>
                  <p>• Healthcare support</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Environmental Protection</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Minimizing our environmental footprint through sustainable practices 
                  and supporting reforestation and conservation efforts.
                </p>
                <div className="text-xs text-muted-foreground">
                  <p>• Carbon neutral operations</p>
                  <p>• Water conservation programs</p>
                  <p>• Habitat restoration support</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Workshop Practices</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Eco-friendly workshop operations with renewable energy, 
                  waste reduction, and sustainable crafting techniques.
                </p>
                <div className="text-xs text-muted-foreground">
                  <p>• 100% renewable energy</p>
                  <p>• Zero waste to landfill</p>
                  <p>• Eco-friendly chemicals</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Award className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl mb-3">Transparency</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Open communication about our practices with detailed reporting 
                  and third-party certifications validating our commitments.
                </p>
                <div className="text-xs text-muted-foreground">
                  <p>• Annual sustainability reports</p>
                  <p>• Third-party certifications</p>
                  <p>• Open supply chain data</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Certifications & Partnerships
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our commitment is validated by leading industry organizations and certification bodies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Responsible Jewellery Council</h3>
                <p className="text-sm text-muted-foreground">Certified member committed to ethical practices</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Kimberley Process</h3>
                <p className="text-sm text-muted-foreground">100% conflict-free diamond certification</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Fairtrade Gold</h3>
                <p className="text-sm text-muted-foreground">Supporting responsible artisanal mining</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Leaf className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Carbon Neutral</h3>
                <p className="text-sm text-muted-foreground">Verified carbon neutral business operations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline of Progress */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Sustainability Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our ongoing commitment to ethical and sustainable practices.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">15</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2015 - Ethical Sourcing Initiative</h3>
                  <p className="text-muted-foreground">
                    Launched comprehensive ethical sourcing program, becoming certified conflict-free 
                    and establishing direct relationships with responsible miners.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">18</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2018 - Sustainable Materials Program</h3>
                  <p className="text-muted-foreground">
                    Introduced recycled precious metals program, achieving 50% recycled content 
                    and launching lab-grown diamond options for environmentally conscious clients.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">20</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2020 - Carbon Neutral Operations</h3>
                  <p className="text-muted-foreground">
                    Achieved carbon neutrality through renewable energy adoption, efficiency improvements, 
                    and verified offset programs supporting reforestation projects.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">22</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2022 - Community Partnership Expansion</h3>
                  <p className="text-muted-foreground">
                    Expanded community support programs in mining regions, funding education 
                    initiatives and healthcare access for over 1,000 families.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">25</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2025 - Next Generation Goals</h3>
                  <p className="text-muted-foreground">
                    Targeting 100% sustainable materials, zero waste operations, and expansion 
                    of community programs to new regions while maintaining craft excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Measuring Our Impact
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transparent reporting on our sustainability and ethical impact metrics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <h3 className="font-semibold text-lg mb-2">Conflict-Free</h3>
                <p className="text-sm text-muted-foreground">All diamonds and gemstones certified conflict-free</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-3xl font-bold text-primary mb-2">75%</div>
                <h3 className="font-semibold text-lg mb-2">Recycled Content</h3>
                <p className="text-sm text-muted-foreground">Precious metals from recycled sources</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-3xl font-bold text-primary mb-2">0</div>
                <h3 className="font-semibold text-lg mb-2">Carbon Footprint</h3>
                <p className="text-sm text-muted-foreground">Net zero carbon emissions through offsets</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-3xl font-bold text-primary mb-2">1K+</div>
                <h3 className="font-semibold text-lg mb-2">Lives Impacted</h3>
                <p className="text-sm text-muted-foreground">Families supported through community programs</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Leaf className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            When you choose Artisanal Jewels, you're not just buying beautiful jewelry – 
            you're supporting ethical practices and positive impact around the world.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Together, we can ensure that beauty and responsibility go hand in hand, 
            creating a more sustainable and ethical future for the jewelry industry.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}