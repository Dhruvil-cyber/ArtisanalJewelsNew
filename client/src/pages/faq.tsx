import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { HelpCircle, Search, Gem, Shield, Truck, CreditCard } from "lucide-react";

export default function FAQ() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      id: "jewelry",
      title: "Jewelry & Products",
      icon: Gem,
      questions: [
        {
          question: "What materials do you use in your jewelry?",
          answer: "We use only the finest materials including 14k and 18k gold, platinum, sterling silver, and certified diamonds and gemstones. All our pieces are crafted with ethically sourced materials and come with certificates of authenticity."
        },
        {
          question: "Are your diamonds certified?",
          answer: "Yes, all our diamonds above 0.3 carats come with certificates from recognized gemological institutes such as GIA, AGS, or similar reputable organizations. These certificates verify the diamond's cut, clarity, color, and carat weight."
        },
        {
          question: "Can I customize existing designs?",
          answer: "Absolutely! Most of our designs can be customized to your preferences. You can modify metal type, gemstone selection, size, and other details. Our design team will work with you to create your perfect piece."
        },
        {
          question: "How do I know what size to order?",
          answer: "We provide detailed sizing guides for rings, necklaces, and bracelets on our Size Guide page. You can also visit our showroom for professional sizing, or we can send you a ring sizer kit for accurate measurements at home."
        },
        {
          question: "What's the difference between 14k and 18k gold?",
          answer: "14k gold contains 58.3% pure gold and is more durable, making it ideal for everyday wear. 18k gold contains 75% pure gold, offering richer color and higher value, perfect for special occasion pieces. Both are excellent choices depending on your needs."
        }
      ]
    },
    {
      id: "ordering",
      title: "Ordering & Payment",
      icon: CreditCard,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. For high-value purchases over $10,000, we also offer financing options through our partner institutions."
        },
        {
          question: "Is it safe to order online?",
          answer: "Yes, your security is our priority. We use SSL encryption and secure payment processing to protect your personal and financial information. Our website is regularly tested and certified for security compliance."
        },
        {
          question: "Can I place an order over the phone?",
          answer: "Absolutely! Call us at +61 451565356 during business hours (Mon-Fri 9am-6pm AEST) and our specialists can help you place an order, answer questions, or provide personalized recommendations."
        },
        {
          question: "Do you offer payment plans?",
          answer: "Yes, we offer flexible payment plans for purchases over $2,000. Options include 3, 6, or 12-month interest-free plans, subject to credit approval. Contact us to discuss the best payment option for your purchase."
        },
        {
          question: "Can I reserve an item?",
          answer: "Yes, we can place items on hold for up to 72 hours with a 10% deposit. For custom orders or special requests, we require a 50% deposit to begin production with the balance due upon completion."
        }
      ]
    },
    {
      id: "shipping",
      title: "Shipping & Delivery",
      icon: Truck,
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 5-7 business days within Australia. Express shipping (2-3 days) and overnight delivery are available. International shipping takes 7-14 business days depending on destination and customs processing."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship worldwide! International shipping costs vary by destination and package weight. All international shipments include tracking and insurance. Please note that customs duties and taxes may apply in your country."
        },
        {
          question: "Is shipping insured?",
          answer: "Yes, all shipments are fully insured for their retail value at no extra cost. We also provide tracking information and require adult signature upon delivery for all orders over $100."
        },
        {
          question: "Can I expedite my order?",
          answer: "Yes, rush orders are available for in-stock items. Express processing can reduce preparation time to 24 hours, combined with overnight shipping for next-day delivery. Additional fees apply for rush services."
        },
        {
          question: "What if I'm not home for delivery?",
          answer: "Our shipping partners will attempt delivery 2-3 times and leave notifications. You can reschedule delivery online or collect from the local post office. For security, valuable items require signature confirmation."
        }
      ]
    },
    {
      id: "care",
      title: "Care & Warranty",
      icon: Shield,
      questions: [
        {
          question: "How should I care for my jewelry?",
          answer: "Clean gently with warm soapy water and a soft brush. Store pieces separately to prevent scratching. Remove jewelry during physical activities, swimming, or using chemicals. Professional cleaning is recommended annually."
        },
        {
          question: "What does your warranty cover?",
          answer: "Our warranty covers manufacturing defects, craftsmanship issues, and structural failures under normal wear. Coverage varies by purchase amount: 2 years for items under $1,000, 5 years for $1,000-$5,000, and lifetime coverage for purchases over $5,000."
        },
        {
          question: "How often should I have my jewelry inspected?",
          answer: "We recommend annual inspections for most pieces, especially rings with settings. Our warranty includes free annual checkups where we'll examine prongs, settings, and overall condition, plus professional cleaning and polishing."
        },
        {
          question: "Can you repair jewelry not purchased from you?",
          answer: "Yes, our master jewelers can repair most jewelry regardless of where it was purchased. We provide free estimates and use original materials when possible. Repair time typically ranges from 1-3 weeks depending on complexity."
        },
        {
          question: "My stone fell out - is this covered?",
          answer: "If the stone loss is due to a setting defect or craftsmanship issue, it's covered under warranty. We'll reset the stone at no charge or replace it if lost due to covered failure. Normal wear and damage are not covered."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <HelpCircle className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                Frequently Asked <span className="gold-accent">Questions</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Find answers to common questions about our jewelry, ordering process, 
                shipping, and care instructions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search frequently asked questions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="input-search-faq"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or browse our FAQ categories below.
                </p>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div key={category.id}>
                  <div className="flex items-center mb-6">
                    <category.icon className="w-6 h-6 text-primary mr-3" />
                    <h2 className="font-serif text-3xl font-bold text-foreground">
                      {category.title}
                    </h2>
                  </div>
                  
                  <Card>
                    <CardContent className="p-6">
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, index) => (
                          <AccordionItem key={index} value={`${category.id}-${index}`}>
                            <AccordionTrigger className="text-left hover:text-primary">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our customer service team is here to help with any questions not covered in our FAQ.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Email Support</h4>
                <p className="text-muted-foreground mb-2">support@artisanaljewels.com</p>
                <p className="text-sm text-muted-foreground">Response within 24 hours</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Phone Support</h4>
                <p className="text-muted-foreground mb-2">+61 451565356</p>
                <p className="text-sm text-muted-foreground">Mon-Fri: 9am-6pm AEST</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Live Chat</h4>
                <p className="text-muted-foreground mb-2">Available on our website</p>
                <p className="text-sm text-muted-foreground">Mon-Fri: 9am-6pm AEST</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}