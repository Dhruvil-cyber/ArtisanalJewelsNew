import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Ruler, Hand, Users, Download, Phone } from "lucide-react";

export default function SizeGuide() {
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
                Size <span className="text-accent">Guide</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Find your perfect fit with our comprehensive sizing guide for rings, necklaces, and bracelets.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="rings" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-12">
                <TabsTrigger value="rings" className="text-lg py-3" data-testid="tab-rings">
                  <Hand className="w-5 h-5 mr-2" />
                  Rings
                </TabsTrigger>
                <TabsTrigger value="necklaces" className="text-lg py-3" data-testid="tab-necklaces">
                  <Ruler className="w-5 h-5 mr-2" />
                  Necklaces
                </TabsTrigger>
                <TabsTrigger value="bracelets" className="text-lg py-3" data-testid="tab-bracelets">
                  <Users className="w-5 h-5 mr-2" />
                  Bracelets
                </TabsTrigger>
              </TabsList>

              {/* Ring Sizing */}
              <TabsContent value="rings">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h2 className="font-serif font-bold text-3xl text-foreground mb-6">
                      Ring Sizing Guide
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Getting the right ring size is crucial for comfort and security. Follow our guide to find your perfect fit.
                    </p>

                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Method 1: Measure an Existing Ring</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-muted-foreground">
                            1. Place an existing ring that fits well on a ruler
                          </p>
                          <p className="text-muted-foreground">
                            2. Measure the inner diameter in millimeters
                          </p>
                          <p className="text-muted-foreground">
                            3. Use our conversion table below to find your size
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Method 2: Measure Your Finger</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-muted-foreground">
                            1. Wrap a string or paper strip around your finger
                          </p>
                          <p className="text-muted-foreground">
                            2. Mark where the ends meet
                          </p>
                          <p className="text-muted-foreground">
                            3. Measure the length in millimeters
                          </p>
                          <p className="text-muted-foreground">
                            4. Divide by 3.14 to get the diameter
                          </p>
                        </CardContent>
                      </Card>

                      <div className="bg-accent/10 p-4 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">💡 Pro Tips</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Measure at the end of the day when fingers are largest</li>
                          <li>• Ensure the ring can slide over your knuckle</li>
                          <li>• Consider the width of the band (wider bands fit tighter)</li>
                          <li>• Account for temperature changes</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Ring Size Conversion Chart</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Australia/UK</th>
                                <th className="text-left py-2">US/Canada</th>
                                <th className="text-left py-2">Diameter (mm)</th>
                                <th className="text-left py-2">Circumference (mm)</th>
                              </tr>
                            </thead>
                            <tbody className="text-muted-foreground">
                              <tr className="border-b"><td className="py-2">F</td><td>3</td><td>14.1</td><td>44.2</td></tr>
                              <tr className="border-b"><td className="py-2">G</td><td>3.5</td><td>14.5</td><td>45.5</td></tr>
                              <tr className="border-b"><td className="py-2">H</td><td>4</td><td>14.9</td><td>46.8</td></tr>
                              <tr className="border-b"><td className="py-2">I</td><td>4.5</td><td>15.3</td><td>48.0</td></tr>
                              <tr className="border-b"><td className="py-2">J</td><td>5</td><td>15.7</td><td>49.3</td></tr>
                              <tr className="border-b"><td className="py-2">K</td><td>5.5</td><td>16.1</td><td>50.6</td></tr>
                              <tr className="border-b"><td className="py-2">L</td><td>6</td><td>16.5</td><td>51.9</td></tr>
                              <tr className="border-b"><td className="py-2">M</td><td>6.5</td><td>16.9</td><td>53.1</td></tr>
                              <tr className="border-b"><td className="py-2">N</td><td>7</td><td>17.3</td><td>54.4</td></tr>
                              <tr className="border-b"><td className="py-2">O</td><td>7.5</td><td>17.7</td><td>55.7</td></tr>
                              <tr className="border-b"><td className="py-2">P</td><td>8</td><td>18.1</td><td>57.0</td></tr>
                              <tr className="border-b"><td className="py-2">Q</td><td>8.5</td><td>18.5</td><td>58.3</td></tr>
                              <tr className="border-b"><td className="py-2">R</td><td>9</td><td>18.9</td><td>59.5</td></tr>
                              <tr className="border-b"><td className="py-2">S</td><td>9.5</td><td>19.4</td><td>60.8</td></tr>
                              <tr className="border-b"><td className="py-2">T</td><td>10</td><td>19.8</td><td>62.1</td></tr>
                              <tr className="border-b"><td className="py-2">U</td><td>10.5</td><td>20.2</td><td>63.4</td></tr>
                              <tr className="border-b"><td className="py-2">V</td><td>11</td><td>20.6</td><td>64.6</td></tr>
                              <tr className="border-b"><td className="py-2">W</td><td>11.5</td><td>21.0</td><td>65.9</td></tr>
                              <tr className="border-b"><td className="py-2">X</td><td>12</td><td>21.4</td><td>67.2</td></tr>
                              <tr className="border-b"><td className="py-2">Y</td><td>12.5</td><td>21.8</td><td>68.5</td></tr>
                              <tr><td className="py-2">Z</td><td>13</td><td>22.2</td><td>69.7</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Necklace Sizing */}
              <TabsContent value="necklaces">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h2 className="font-serif font-bold text-3xl text-foreground mb-6">
                      Necklace Length Guide
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      The perfect necklace length depends on your personal style, neckline, and the occasion.
                    </p>

                    <div className="space-y-6">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Choker</span>
                              <span className="text-muted-foreground">35-40cm (14-16")</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Sits snugly around the neck. Perfect for high necklines and casual wear.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Princess</span>
                              <span className="text-muted-foreground">40-45cm (16-18")</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Falls just below the collarbone. The most popular and versatile length.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Matinee</span>
                              <span className="text-muted-foreground">50-60cm (20-24")</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Falls at or just below the bust line. Great for business attire.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Opera</span>
                              <span className="text-muted-foreground">70-90cm (28-36")</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Long and dramatic. Can be worn long or doubled for a layered look.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Rope</span>
                              <span className="text-muted-foreground">100cm+ (40"+)</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Very long and versatile. Can be wrapped multiple times or knotted.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>How to Measure</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          Use a flexible measuring tape or string to measure around your neck where you'd like the necklace to sit.
                        </p>
                        
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="font-semibold mb-2">Style Tips</h3>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            <li>• High necklines: Choose shorter lengths (choker to princess)</li>
                            <li>• V-necks: Longer lengths (princess to matinee) create a flattering line</li>
                            <li>• Strapless: Any length works, opera length is especially elegant</li>
                            <li>• Layering: Combine different lengths for a trendy look</li>
                            <li>• Pendant size: Larger pendants need longer chains</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Popular Combinations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-foreground">Everyday Elegance</h4>
                            <p className="text-sm text-muted-foreground">Princess length (45cm) with a small pendant</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Business Professional</h4>
                            <p className="text-sm text-muted-foreground">Matinee length (60cm) with minimal design</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Evening Glamour</h4>
                            <p className="text-sm text-muted-foreground">Opera length (80cm) with statement piece</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Bracelet Sizing */}
              <TabsContent value="bracelets">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h2 className="font-serif font-bold text-3xl text-foreground mb-6">
                      Bracelet Sizing Guide
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      A well-fitted bracelet should be comfortable and secure, with just the right amount of movement.
                    </p>

                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">How to Measure Your Wrist</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-muted-foreground">
                            1. Use a flexible measuring tape or string
                          </p>
                          <p className="text-muted-foreground">
                            2. Wrap it around your wrist just below the wrist bone
                          </p>
                          <p className="text-muted-foreground">
                            3. Make sure it's snug but not tight
                          </p>
                          <p className="text-muted-foreground">
                            4. Note the measurement in centimeters/inches
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Adding the Right Ease</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium">Snug Fit</h4>
                              <p className="text-sm text-muted-foreground">Wrist measurement + 1.3cm (0.5") for charm bracelets and tennis bracelets</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Comfortable Fit</h4>
                              <p className="text-sm text-muted-foreground">Wrist measurement + 1.9cm (0.75") for most chain bracelets</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Loose Fit</h4>
                              <p className="text-sm text-muted-foreground">Wrist measurement + 2.5cm (1") for bangles and statement pieces</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="bg-accent/10 p-4 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">💡 Fitting Tips</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• A properly fitted bracelet should slide over your hand</li>
                          <li>• You should be able to slide a finger underneath</li>
                          <li>• Consider the bracelet style - rigid bangles need more room</li>
                          <li>• Chain bracelets can be more forgiving than solid bangles</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Bracelet Size Chart</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Wrist Size</th>
                                <th className="text-left py-2">Bracelet Size</th>
                                <th className="text-left py-2">Fit Type</th>
                              </tr>
                            </thead>
                            <tbody className="text-muted-foreground">
                              <tr className="border-b"><td className="py-2">14cm (5.5")</td><td>15.5cm (6")</td><td>Comfortable</td></tr>
                              <tr className="border-b"><td className="py-2">15cm (6")</td><td>16.5cm (6.5")</td><td>Comfortable</td></tr>
                              <tr className="border-b"><td className="py-2">16cm (6.5")</td><td>17.5cm (7")</td><td>Comfortable</td></tr>
                              <tr className="border-b"><td className="py-2">17cm (7")</td><td>18.5cm (7.5")</td><td>Comfortable</td></tr>
                              <tr className="border-b"><td className="py-2">18cm (7.5")</td><td>19.5cm (8")</td><td>Comfortable</td></tr>
                              <tr className="border-b"><td className="py-2">19cm (8")</td><td>20.5cm (8.5")</td><td>Comfortable</td></tr>
                              <tr><td className="py-2">20cm (8.5")</td><td>21.5cm (9")</td><td>Comfortable</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Different Bracelet Types</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-foreground">Chain Bracelets</h4>
                            <p className="text-sm text-muted-foreground">Flexible and adjustable. Standard comfort fit works well.</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Tennis Bracelets</h4>
                            <p className="text-sm text-muted-foreground">Should fit snugly but not tight. Avoid loose fit for security.</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Bangles</h4>
                            <p className="text-sm text-muted-foreground">Rigid style needs loose fit to slide over hand comfortably.</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Charm Bracelets</h4>
                            <p className="text-sm text-muted-foreground">Start with comfortable fit, consider room for additional charms.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Help Section */}
            <section className="mt-16 bg-muted rounded-lg p-8">
              <div className="text-center">
                <h2 className="font-serif font-bold text-2xl text-foreground mb-4">
                  Need Help with Sizing?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our jewelry experts are here to help you find the perfect fit. Get personalized sizing assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button className="bg-accent hover:bg-accent/90 text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Book Consultation
                    </Button>
                  </Link>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Size Guide PDF
                  </Button>
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