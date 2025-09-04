import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Gem, Star, Shield, Droplets, Sun, AlertTriangle, Sparkles, Clock } from "lucide-react";

export default function CareInstructions() {
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
        <section className="py-24 bg-gradient-to-br from-background to-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                Jewelry <span className="text-accent">Care</span> Guide
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Preserve the beauty and longevity of your precious jewelry with our expert care and maintenance tips.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="general" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-4 mb-12">
                <TabsTrigger value="general" className="text-lg py-3" data-testid="tab-general">
                  <Sparkles className="w-5 h-5 mr-2" />
                  General Care
                </TabsTrigger>
                <TabsTrigger value="metals" className="text-lg py-3" data-testid="tab-metals">
                  <Shield className="w-5 h-5 mr-2" />
                  Metals
                </TabsTrigger>
                <TabsTrigger value="gemstones" className="text-lg py-3" data-testid="tab-gemstones">
                  <Gem className="w-5 h-5 mr-2" />
                  Gemstones
                </TabsTrigger>
                <TabsTrigger value="storage" className="text-lg py-3" data-testid="tab-storage">
                  <Clock className="w-5 h-5 mr-2" />
                  Storage
                </TabsTrigger>
              </TabsList>

              {/* General Care */}
              <TabsContent value="general">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h2 className="font-serif font-bold text-3xl text-foreground mb-6">
                      Daily Care Essentials
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Following these simple daily practices will keep your jewelry looking beautiful for years to come.
                    </p>

                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <Droplets className="w-5 h-5 text-accent mr-2" />
                            Keep Away from Water
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-3">
                            Remove jewelry before swimming, showering, or doing dishes. Chlorine and soap can damage metals and dull gemstones.
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Pool chlorine can discolor gold and silver</li>
                            <li>• Soap residue builds up over time</li>
                            <li>• Hot water can loosen prong settings</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <Sun className="w-5 h-5 text-accent mr-2" />
                            Avoid Chemicals
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-3">
                            Put jewelry on after applying makeup, perfume, and hairspray. These chemicals can tarnish metals and damage stones.
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Perfume can cloud gemstones</li>
                            <li>• Hairspray creates sticky buildup</li>
                            <li>• Makeup can scratch soft metals</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <AlertTriangle className="w-5 h-5 text-accent mr-2" />
                            Handle with Care
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-3">
                            Remove jewelry during physical activities, sports, or when doing manual work to prevent damage.
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Exercise can damage settings</li>
                            <li>• Gardening exposes jewelry to dirt and chemicals</li>
                            <li>• Heavy lifting can bend or break delicate pieces</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle>Professional Maintenance Schedule</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                            <span className="font-medium">Professional Cleaning</span>
                            <span className="text-accent">Every 6 months</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                            <span className="font-medium">Prong Inspection</span>
                            <span className="text-accent">Every 12 months</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                            <span className="font-medium">Ring Sizing Check</span>
                            <span className="text-accent">As needed</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                            <span className="font-medium">Insurance Appraisal</span>
                            <span className="text-accent">Every 2-3 years</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>When to Seek Professional Help</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-muted-foreground">
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                            <span>Loose stones or prongs</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                            <span>Visible scratches or dents</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                            <span>Difficulty with clasps or closures</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                            <span>Tarnishing that won't clean</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                            <span>Ring doesn't fit properly</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Metal Care */}
              <TabsContent value="metals">
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="font-serif font-bold text-3xl text-foreground mb-4">
                      Metal-Specific Care
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Different precious metals require specific care techniques to maintain their beauty and integrity.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Gold</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Cleaning</h4>
                          <p className="text-sm text-muted-foreground">
                            Use warm soapy water and a soft brush. Dry completely with a lint-free cloth.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Special Care</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Higher karat gold is softer and more prone to scratches</li>
                            <li>• White gold may need rhodium replating over time</li>
                            <li>• Avoid ammonia-based cleaners</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Silver</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Cleaning</h4>
                          <p className="text-sm text-muted-foreground">
                            Use a silver polishing cloth or mild silver cleaner. Never use baking soda or toothpaste.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Tarnish Prevention</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Store in anti-tarnish pouches</li>
                            <li>• Wear regularly to prevent tarnishing</li>
                            <li>• Keep away from rubber and latex</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Platinum</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Cleaning</h4>
                          <p className="text-sm text-muted-foreground">
                            Soak in warm soapy water and gently scrub with a soft brush. Rinse and dry thoroughly.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Maintenance</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Develops a natural patina over time</li>
                            <li>• Can be re-polished to restore shine</li>
                            <li>• Very durable but can show scratches</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Rose Gold</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Cleaning</h4>
                          <p className="text-sm text-muted-foreground">
                            Clean gently with warm soapy water. The copper content makes it more durable than yellow gold.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Special Notes</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Color may deepen slightly over time</li>
                            <li>• Less likely to cause allergies than white gold</li>
                            <li>• Harder than yellow gold due to copper content</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Sterling Silver</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Cleaning</h4>
                          <p className="text-sm text-muted-foreground">
                            Use specialized silver cleaner or polishing cloth. Clean regularly to prevent heavy tarnishing.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Care Tips</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• 92.5% silver, softer than other metals</li>
                            <li>• Store with anti-tarnish strips</li>
                            <li>• Avoid exposure to salt water</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Alternative Metals</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Titanium & Stainless Steel</h4>
                          <p className="text-sm text-muted-foreground">
                            Very low maintenance. Clean with soap and water. Extremely durable and hypoallergenic.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Benefits</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Won't tarnish or corrode</li>
                            <li>• Lightweight and comfortable</li>
                            <li>• Suitable for sensitive skin</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Gemstone Care */}
              <TabsContent value="gemstones">
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="font-serif font-bold text-3xl text-foreground mb-4">
                      Gemstone Care Guide
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Each gemstone has unique properties that require specific care approaches for optimal preservation.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                          <Star className="w-5 h-5 text-accent mr-2" />
                          Diamond Care
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Cleaning</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Soak in warm, soapy water and scrub gently with a soft toothbrush. Rinse and dry with lint-free cloth.
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Use ammonia solution for stubborn oil buildup</li>
                            <li>• Professional ultrasonic cleaning is safe</li>
                            <li>• Clean regularly to maintain brilliance</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Special Care</h4>
                          <p className="text-sm text-muted-foreground">
                            Despite being the hardest natural substance, diamonds can chip if struck at the right angle. Check prong settings regularly.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                          <Gem className="w-5 h-5 text-accent mr-2" />
                          Colored Gemstones
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Sapphires & Rubies</h4>
                          <p className="text-sm text-muted-foreground">
                            Very durable (9 on Mohs scale). Clean with warm soapy water and soft brush. Ultrasonic cleaning is generally safe.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Emeralds</h4>
                          <p className="text-sm text-muted-foreground">
                            More fragile due to natural inclusions. Clean only with warm soapy water. Avoid ultrasonic cleaners and heat.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Tanzanite & Aquamarine</h4>
                          <p className="text-sm text-muted-foreground">
                            Handle carefully - moderately hard stones. Clean with mild soap and water. Avoid sudden temperature changes.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                          <Shield className="w-5 h-5 text-accent mr-2" />
                          Delicate Gemstones
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Pearls</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Wipe with damp cloth after wearing</li>
                            <li>• Store separately to prevent scratching</li>
                            <li>• Restring every 2-3 years if worn regularly</li>
                            <li>• Never use ultrasonic cleaners or chemicals</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Opal</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Very sensitive to temperature changes</li>
                            <li>• Clean only with damp cloth</li>
                            <li>• Store away from heat sources</li>
                            <li>• Avoid ultrasonic cleaners completely</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Turquoise & Coral</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Very porous - avoid all chemicals</li>
                            <li>• Clean with dry, soft cloth only</li>
                            <li>• Protect from perfumes and lotions</li>
                            <li>• Professional cleaning recommended</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Hardness Scale Reference</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Diamond</span>
                            <span className="text-sm text-accent">10 (Hardest)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Ruby/Sapphire</span>
                            <span className="text-sm text-accent">9</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Emerald</span>
                            <span className="text-sm text-accent">7.5-8</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Amethyst/Quartz</span>
                            <span className="text-sm text-accent">7</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Opal</span>
                            <span className="text-sm text-accent">5.5-6.5</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Pearl</span>
                            <span className="text-sm text-accent">2.5-4.5</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          Lower numbers indicate softer stones that require more careful handling.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Storage */}
              <TabsContent value="storage">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h2 className="font-serif font-bold text-3xl text-foreground mb-6">
                      Proper Storage Solutions
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Correct storage prevents damage, tangling, and tarnishing while keeping your jewelry organized and easily accessible.
                    </p>

                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Individual Compartments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-3">
                            Store each piece separately to prevent scratching and tangling. Use soft-lined jewelry boxes with individual compartments.
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Prevents metals from scratching each other</li>
                            <li>• Keeps chains from tangling</li>
                            <li>• Protects gemstones from impact</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Environment Control</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-3">
                            Store jewelry in a cool, dry place away from direct sunlight and extreme temperatures.
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Avoid bathroom storage (humidity)</li>
                            <li>• Keep away from heating vents</li>
                            <li>• Use silica gel packets for moisture control</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Security Considerations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-3">
                            Valuable pieces should be stored in a home safe or safety deposit box when not being worn regularly.
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Consider insurance requirements</li>
                            <li>• Document pieces with photos</li>
                            <li>• Keep receipts and certificates</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle>Storage Solutions by Type</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Rings</h4>
                            <p className="text-sm text-muted-foreground">
                              Ring rolls, ring cushions, or individual ring boxes. Keep engagement rings in original boxes when not worn.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Necklaces</h4>
                            <p className="text-sm text-muted-foreground">
                              Hang on hooks or lay flat in compartments. Never ball up chains - this can cause permanent kinks.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Earrings</h4>
                            <p className="text-sm text-muted-foreground">
                              Earring cards, small compartments, or hanging organizers. Keep pairs together to prevent loss.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Bracelets</h4>
                            <p className="text-sm text-muted-foreground">
                              Bracelet bars or flat storage. Tennis bracelets should be stored flat to maintain their shape.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Watches</h4>
                            <p className="text-sm text-muted-foreground">
                              Watch boxes or cushions. Automatic watches may need winders if worn regularly.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Travel Storage Tips</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-foreground">Jewelry Travel Case</h4>
                            <p className="text-sm text-muted-foreground">
                              Invest in a quality travel jewelry case with secure compartments and locks.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Individual Pouches</h4>
                            <p className="text-sm text-muted-foreground">
                              Use soft pouches for each piece to prevent scratching during transport.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Carry-On Only</h4>
                            <p className="text-sm text-muted-foreground">
                              Never pack valuable jewelry in checked luggage - always keep it with you.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Professional Services */}
            <section className="mt-16 bg-muted rounded-lg p-8">
              <div className="text-center">
                <h2 className="font-serif font-bold text-2xl text-foreground mb-4">
                  Professional Jewelry Services
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our expert jewelers provide comprehensive care and maintenance services to keep your jewelry looking its best.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-accent mx-auto mb-2" />
                    <h3 className="font-medium text-foreground">Professional Cleaning</h3>
                  </div>
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-accent mx-auto mb-2" />
                    <h3 className="font-medium text-foreground">Prong Inspection</h3>
                  </div>
                  <div className="text-center">
                    <Gem className="w-8 h-8 text-accent mx-auto mb-2" />
                    <h3 className="font-medium text-foreground">Stone Tightening</h3>
                  </div>
                  <div className="text-center">
                    <Star className="w-8 h-8 text-accent mx-auto mb-2" />
                    <h3 className="font-medium text-foreground">Polishing & Refinishing</h3>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button className="bg-accent hover:bg-accent/90 text-white">
                      Schedule Service
                    </Button>
                  </Link>
                  <Link href="/catalog">
                    <Button variant="outline">
                      Browse Collections
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}