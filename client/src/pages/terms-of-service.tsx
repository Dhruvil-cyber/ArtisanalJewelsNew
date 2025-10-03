import { useEffect, useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import { Separator } from "@/components/ui/separator";

export default function TermsOfService() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4" data-testid="heading-terms-of-service">
          Terms of Service
        </h1>
        <p className="text-muted-foreground mb-8" data-testid="text-last-updated">
          Last Updated: October 3, 2025
        </p>

        <Separator className="mb-8" />

        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">1. Agreement to Terms</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Welcome to Artisanal Jewels. By accessing our website, creating an account, or making a purchase, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
            </p>
            <p className="text-foreground leading-relaxed">
              These terms apply to all visitors, users, and customers of our website and services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">2. Use of Our Services</h2>
            
            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">2.1 Eligibility</h3>
            <p className="text-foreground leading-relaxed mb-4">
              You must be at least 18 years old to use our services and make purchases. By using our website, you represent that you are of legal age and have the legal capacity to enter into binding contracts.
            </p>

            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">2.2 Account Registration</h3>
            <p className="text-foreground leading-relaxed mb-4">
              When creating an account, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>

            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">2.3 Prohibited Uses</h3>
            <p className="text-foreground leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Use our services for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our services</li>
              <li>Use automated systems to access our website without permission</li>
              <li>Reproduce, duplicate, or copy any part of our website without authorization</li>
              <li>Engage in fraudulent activities or impersonate others</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">3. Products and Services</h2>
            
            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">3.1 Product Information</h3>
            <p className="text-foreground leading-relaxed mb-4">
              We strive to provide accurate product descriptions, images, and specifications. However:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Product images are for illustrative purposes and may vary slightly from actual items</li>
              <li>Natural gemstones and materials may have slight variations in color and appearance</li>
              <li>We do not warrant that product descriptions are accurate, complete, or error-free</li>
              <li>We reserve the right to correct errors or update information at any time</li>
            </ul>

            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">3.2 Pricing and Availability</h3>
            <p className="text-foreground leading-relaxed mb-4">
              All prices are displayed in Australian Dollars (AUD) for international customers and Indian Rupees (INR) for Indian customers. Prices are subject to change without notice. We reserve the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Modify or discontinue products without prior notice</li>
              <li>Limit quantities available for purchase</li>
              <li>Refuse orders at our sole discretion</li>
              <li>Correct pricing errors even after an order is placed</li>
            </ul>

            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">3.3 Custom Orders</h3>
            <p className="text-foreground leading-relaxed">
              Custom-made jewelry pieces are subject to specific terms. Custom orders require advance payment and cannot be cancelled once production begins. Custom pieces are non-refundable except in cases of manufacturing defects.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">4. Orders and Payment</h2>
            
            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">4.1 Order Acceptance</h3>
            <p className="text-foreground leading-relaxed mb-4">
              Your order constitutes an offer to purchase. We reserve the right to accept or reject any order for any reason. Order confirmation does not guarantee acceptance. We will notify you if we cannot fulfill your order.
            </p>

            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">4.2 Payment Processing</h3>
            <p className="text-foreground leading-relaxed mb-4">
              We accept payments through:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li><strong>Stripe:</strong> For international customers (credit/debit cards in AUD)</li>
              <li><strong>Razorpay:</strong> For Indian customers (UPI, cards, wallets in INR)</li>
            </ul>
            <p className="text-foreground leading-relaxed mt-4">
              Payment must be received in full before order processing. You represent that you have the legal right to use any payment method provided.
            </p>

            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">4.3 Currency and Conversion</h3>
            <p className="text-foreground leading-relaxed">
              Prices are listed in AUD for international customers and automatically converted to INR for Indian customers at a rate of 1 AUD = 60 INR. Exchange rates are fixed at the time of purchase.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">5. Shipping and Delivery</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Please refer to our Shipping & Returns page for detailed information. Key points:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Shipping times are estimates and not guaranteed</li>
              <li>Risk of loss passes to you upon delivery to the carrier</li>
              <li>You are responsible for providing accurate shipping information</li>
              <li>International orders may be subject to customs duties and taxes</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">6. Returns and Refunds</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We offer a 30-day return policy for eligible items. Please see our Shipping & Returns page for complete details. Key conditions:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Items must be unused, in original condition with tags attached</li>
              <li>Custom and personalized items are non-refundable</li>
              <li>Refunds are processed to the original payment method</li>
              <li>Return shipping costs are the customer's responsibility unless item is defective</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">7. Intellectual Property</h2>
            <p className="text-foreground leading-relaxed mb-4">
              All content on our website, including but not limited to text, images, logos, designs, graphics, and software, is the property of Artisanal Jewels or our licensors and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-foreground leading-relaxed">
              You may not reproduce, distribute, modify, or create derivative works without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">8. Product Authenticity and Warranties</h2>
            
            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">8.1 Authenticity Guarantee</h3>
            <p className="text-foreground leading-relaxed mb-4">
              We guarantee that all jewelry sold on our website is authentic and made with genuine materials as described. Each piece comes with a certificate of authenticity.
            </p>

            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">8.2 Limited Warranty</h3>
            <p className="text-foreground leading-relaxed mb-4">
              We provide a 1-year limited warranty against manufacturing defects. This warranty:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Covers manufacturing defects in materials and workmanship</li>
              <li>Does not cover normal wear and tear, damage from misuse, or unauthorized repairs</li>
              <li>Requires proof of purchase and original receipt</li>
              <li>Is void if the product has been modified or repaired by unauthorized parties</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">9. Limitation of Liability</h2>
            <p className="text-foreground leading-relaxed mb-4">
              To the fullest extent permitted by law, Artisanal Jewels shall not be liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Indirect, incidental, special, or consequential damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Damages arising from unauthorized access to your account</li>
              <li>Delays or failures in delivery beyond our control</li>
            </ul>
            <p className="text-foreground leading-relaxed mt-4">
              Our total liability shall not exceed the amount you paid for the product in question.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">10. Indemnification</h2>
            <p className="text-foreground leading-relaxed">
              You agree to indemnify and hold harmless Artisanal Jewels, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising from your violation of these terms or your use of our services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">11. Dispute Resolution</h2>
            
            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">11.1 Governing Law</h3>
            <p className="text-foreground leading-relaxed mb-4">
              These terms are governed by the laws of Australia and India, depending on your location and the jurisdiction of purchase.
            </p>

            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">11.2 Arbitration</h3>
            <p className="text-foreground leading-relaxed">
              Any disputes arising from these terms or your use of our services shall be resolved through binding arbitration, except where prohibited by law. You agree to waive your right to a jury trial or to participate in class action lawsuits.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">12. Modifications to Terms</h2>
            <p className="text-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes constitutes acceptance of the modified terms. We recommend reviewing these terms periodically.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">13. Termination</h2>
            <p className="text-foreground leading-relaxed">
              We may terminate or suspend your account and access to our services immediately, without prior notice, for any violation of these terms. Upon termination, your right to use our services will cease immediately. All provisions that should survive termination shall do so, including ownership provisions, warranty disclaimers, and limitations of liability.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">14. Severability</h2>
            <p className="text-foreground leading-relaxed">
              If any provision of these terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">15. Contact Information</h2>
            <p className="text-foreground leading-relaxed mb-4">
              For questions or concerns about these Terms of Service, please contact us:
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <p className="text-foreground mb-2"><strong>Artisanal Jewels</strong></p>
              <p className="text-foreground">Email: legal@artisanaljewels.com</p>
              <p className="text-foreground">Phone: +61 2 9876 5432 (Australia)</p>
              <p className="text-foreground">Phone: +91 22 1234 5678 (India)</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
