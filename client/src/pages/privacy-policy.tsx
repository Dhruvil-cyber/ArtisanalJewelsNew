import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4" data-testid="heading-privacy-policy">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-8" data-testid="text-last-updated">
          Last Updated: October 3, 2025
        </p>

        <Separator className="mb-8" />

        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">1. Introduction</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Welcome to Artisanal Jewels. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, store, and protect your information when you visit our website or make a purchase from us.
            </p>
            <p className="text-foreground leading-relaxed">
              This policy applies to all information collected through our website, mobile application (if applicable), email, text, and other electronic communications.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">2. Information We Collect</h2>
            
            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">2.1 Personal Information</h3>
            <p className="text-foreground leading-relaxed mb-4">
              When you create an account, place an order, or interact with our services, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Name and contact information (email address, phone number, billing and shipping addresses)</li>
              <li>Payment information (credit card details, billing address)</li>
              <li>Account credentials (username, password)</li>
              <li>Purchase history and preferences</li>
              <li>Product reviews and ratings you submit</li>
            </ul>

            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-foreground leading-relaxed mb-4">
              When you visit our website, we automatically collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Device and browser information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, click patterns)</li>
              <li>Location data (approximate location based on IP address)</li>
              <li>Cookies and similar tracking technologies (see our Cookie Policy for details)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">3. How We Use Your Information</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li><strong>Order Processing:</strong> To process your orders, arrange delivery, and provide customer support</li>
              <li><strong>Account Management:</strong> To create and manage your account, including authentication and security</li>
              <li><strong>Communication:</strong> To send order confirmations, shipping updates, and respond to inquiries</li>
              <li><strong>Marketing:</strong> To send promotional emails about new products, special offers (with your consent)</li>
              <li><strong>Personalization:</strong> To personalize your shopping experience and recommend products</li>
              <li><strong>Analytics:</strong> To understand how customers use our website and improve our services</li>
              <li><strong>Fraud Prevention:</strong> To detect and prevent fraudulent transactions and unauthorized access</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We do not sell your personal information. We may share your data with:
            </p>
            
            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">4.1 Service Providers</h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground mb-4">
              <li><strong>Payment Processors:</strong> Stripe and Razorpay for secure payment processing</li>
              <li><strong>Shipping Partners:</strong> Courier services for order delivery</li>
              <li><strong>Email Services:</strong> SendGrid for transactional and marketing emails</li>
              <li><strong>Cloud Hosting:</strong> For website hosting and data storage</li>
            </ul>

            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">4.2 Legal Requirements</h3>
            <p className="text-foreground leading-relaxed">
              We may disclose your information if required by law, court order, or government authority, or to protect our rights, property, or safety.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">5. Data Security</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure payment processing through PCI-DSS compliant providers</li>
              <li>Password encryption and secure authentication</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and employee training</li>
            </ul>
            <p className="text-foreground leading-relaxed mt-4">
              However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but continually work to protect your data.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">6. Your Rights and Choices</h2>
            <p className="text-foreground leading-relaxed mb-4">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and personal data</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time</li>
              <li><strong>Data Portability:</strong> Request your data in a portable format</li>
              <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
            </ul>
            <p className="text-foreground leading-relaxed mt-4">
              To exercise these rights, please contact us at privacy@artisanaljewels.com or through your account settings.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">7. Data Retention</h2>
            <p className="text-foreground leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Order and transaction data is typically retained for 7 years for tax and legal compliance purposes. Account information is retained until you request deletion.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">8. International Data Transfers</h2>
            <p className="text-foreground leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy and applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">9. Children's Privacy</h2>
            <p className="text-foreground leading-relaxed">
              Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">10. Third-Party Links</h2>
            <p className="text-foreground leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">11. Updates to This Policy</h2>
            <p className="text-foreground leading-relaxed">
              We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by email or through a notice on our website. The "Last Updated" date at the top of this page indicates when the policy was last revised.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">12. Contact Us</h2>
            <p className="text-foreground leading-relaxed mb-4">
              If you have questions, concerns, or requests regarding this privacy policy or our data practices, please contact us:
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <p className="text-foreground mb-2"><strong>Artisanal Jewels</strong></p>
              <p className="text-foreground">Email: privacy@artisanaljewels.com</p>
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
