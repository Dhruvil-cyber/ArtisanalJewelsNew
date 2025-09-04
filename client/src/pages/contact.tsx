import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement contact form submission
      console.log("Contact form submitted:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      form.reset();
      alert("Thank you for your message! We'll get back to you within 24 hours.");
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Sorry, there was an error sending your message. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                Get in <span className="text-accent">Touch</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Have a question about our jewelry? Want to schedule a consultation? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Visit Our Showroom</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    123 Collins Street<br />
                    Melbourne VIC 3000<br />
                    Australia
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Call Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    <a href="tel:+61451565356" className="hover:text-accent transition-colors">
                      +61 451 565 356
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Free consultation available
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Email Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    <a href="mailto:hello@artisanaljewels.com.au" className="hover:text-accent transition-colors">
                      hello@artisanaljewels.com.au
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    We reply within 24 hours
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Opening Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Mon-Fri: 9:00 AM - 6:00 PM</div>
                    <div>Saturday: 10:00 AM - 5:00 PM</div>
                    <div>Sunday: 11:00 AM - 4:00 PM</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="font-serif font-bold text-3xl text-foreground mb-6">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Whether you're looking for a custom piece, have questions about our collections, or need jewelry repair services, we're here to help.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your full name" 
                                {...field} 
                                data-testid="input-contact-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="your@email.com" 
                                {...field} 
                                data-testid="input-contact-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel"
                              placeholder="+61 xxx xxx xxx" 
                              {...field} 
                              data-testid="input-contact-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="What can we help you with?" 
                              {...field} 
                              data-testid="input-contact-subject"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us more about your inquiry..."
                              className="min-h-[120px]"
                              {...field} 
                              data-testid="textarea-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-accent hover:bg-accent/90 text-white"
                      disabled={isSubmitting}
                      data-testid="button-send-message"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Location & Services */}
              <div>
                <h2 className="font-serif font-bold text-3xl text-foreground mb-6">
                  Visit Our Melbourne Showroom
                </h2>
                
                <div className="bg-background rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-lg text-foreground mb-4">Our Services</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Custom jewelry design & creation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Engagement ring consultations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Jewelry repairs & resizing</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Insurance valuations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Pearl restringing</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Watch battery replacement</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-background rounded-lg p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>40+ years of expert craftsmanship</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Certified conflict-free diamonds</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Lifetime warranty on craftsmanship</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Free consultation & quotes</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Award-winning customer service</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif font-bold text-3xl text-center text-foreground mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Do you offer custom jewelry design?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes! We specialize in creating unique, custom pieces. Our master jewelers work closely with you to bring your vision to life, from initial concept to final creation.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    What is your return policy?
                  </h3>
                  <p className="text-muted-foreground">
                    We offer a 30-day return policy on most items. Custom pieces may have different terms. All returns must be in original condition with original packaging.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Do you resize rings?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes, we provide professional ring resizing services. Most resizing can be completed within 3-5 business days. Some specialty rings may require additional time.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Are your diamonds certified?
                  </h3>
                  <p className="text-muted-foreground">
                    All our diamonds come with certification from reputable gemological institutes. We are committed to ethical sourcing and only deal in conflict-free diamonds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}