import { useEffect, useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import { Separator } from "@/components/ui/separator";

export default function CookiePolicy() {
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
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4" data-testid="heading-cookie-policy">
          Cookie Policy
        </h1>
        <p className="text-muted-foreground mb-8" data-testid="text-last-updated">
          Last Updated: October 3, 2025
        </p>

        <Separator className="mb-8" />

        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">1. What Are Cookies</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, understanding how you use our site, and improving our services.
            </p>
            <p className="text-foreground leading-relaxed">
              This Cookie Policy explains what cookies are, how we use them, the types of cookies we use, and how you can manage your cookie preferences.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">2. How We Use Cookies</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We use cookies for various purposes to enhance your browsing experience:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li><strong>Essential Operations:</strong> To make our website function properly and securely</li>
              <li><strong>Authentication:</strong> To keep you logged in and remember your session</li>
              <li><strong>Shopping Cart:</strong> To remember items you've added to your cart</li>
              <li><strong>Preferences:</strong> To remember your settings and choices</li>
              <li><strong>Analytics:</strong> To understand how visitors use our website</li>
              <li><strong>Marketing:</strong> To show you relevant advertisements and measure campaign effectiveness</li>
              <li><strong>Performance:</strong> To improve website speed and functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">3. Types of Cookies We Use</h2>
            
            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">3.1 Strictly Necessary Cookies</h3>
            <p className="text-foreground leading-relaxed mb-4">
              These cookies are essential for our website to function and cannot be disabled. They include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground mb-4">
              <li><strong>Session Cookies:</strong> Keep you logged in during your visit</li>
              <li><strong>Security Cookies:</strong> Protect against fraud and unauthorized access</li>
              <li><strong>Load Balancing:</strong> Distribute traffic across our servers</li>
              <li><strong>Cookie Consent:</strong> Remember your cookie preferences</li>
            </ul>
            <p className="text-muted-foreground italic">
              Duration: Session or up to 1 year
            </p>

            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">3.2 Functional Cookies</h3>
            <p className="text-foreground leading-relaxed mb-4">
              These cookies enable enhanced functionality and personalization:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground mb-4">
              <li><strong>Shopping Cart:</strong> Remember items in your cart between visits</li>
              <li><strong>Wishlist:</strong> Save your favorite products</li>
              <li><strong>Language Preferences:</strong> Remember your language choice</li>
              <li><strong>User Preferences:</strong> Store your display and filter settings</li>
            </ul>
            <p className="text-muted-foreground italic">
              Duration: Up to 1 year
            </p>

            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">3.3 Analytics Cookies</h3>
            <p className="text-foreground leading-relaxed mb-4">
              These cookies help us understand how visitors interact with our website:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground mb-4">
              <li><strong>Google Analytics:</strong> Track page views, session duration, and user behavior</li>
              <li><strong>Heatmaps:</strong> Understand which areas of our pages get the most attention</li>
              <li><strong>Conversion Tracking:</strong> Measure the effectiveness of our marketing</li>
              <li><strong>Performance Monitoring:</strong> Identify technical issues and slow pages</li>
            </ul>
            <p className="text-muted-foreground italic">
              Duration: Up to 2 years
            </p>

            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">3.4 Marketing Cookies</h3>
            <p className="text-foreground leading-relaxed mb-4">
              These cookies track your online activity to deliver relevant advertisements:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground mb-4">
              <li><strong>Advertising Networks:</strong> Show you relevant ads on other websites</li>
              <li><strong>Retargeting:</strong> Remind you about products you viewed</li>
              <li><strong>Social Media:</strong> Enable sharing and track social media campaigns</li>
              <li><strong>Email Marketing:</strong> Track email campaign effectiveness</li>
            </ul>
            <p className="text-muted-foreground italic">
              Duration: Up to 2 years
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">4. Third-Party Cookies</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We also use cookies from trusted third-party services:
            </p>
            
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Google Analytics</h4>
                <p className="text-foreground text-sm mb-2">
                  Helps us understand website traffic and user behavior to improve our services.
                </p>
                <p className="text-muted-foreground text-sm">
                  Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">policies.google.com/privacy</a>
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Stripe</h4>
                <p className="text-foreground text-sm mb-2">
                  Secure payment processing for international customers.
                </p>
                <p className="text-muted-foreground text-sm">
                  Privacy Policy: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">stripe.com/privacy</a>
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Razorpay</h4>
                <p className="text-foreground text-sm mb-2">
                  Secure payment processing for Indian customers.
                </p>
                <p className="text-muted-foreground text-sm">
                  Privacy Policy: <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">razorpay.com/privacy</a>
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Social Media Platforms</h4>
                <p className="text-foreground text-sm">
                  Facebook, Instagram, and other social platforms may place cookies when you interact with social sharing buttons or embedded content.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">5. Managing Your Cookie Preferences</h2>
            
            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">5.1 Browser Settings</h3>
            <p className="text-foreground leading-relaxed mb-4">
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground mb-4">
              <li>View and delete existing cookies</li>
              <li>Block third-party cookies</li>
              <li>Block all cookies (may affect website functionality)</li>
              <li>Clear cookies when you close your browser</li>
            </ul>
            <p className="text-foreground leading-relaxed">
              For instructions on managing cookies in your browser:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
            </ul>

            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">5.2 Opt-Out Options</h3>
            <p className="text-foreground leading-relaxed mb-4">
              You can opt out of certain types of cookies:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li><strong>Google Analytics:</strong> Use the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
              <li><strong>Advertising:</strong> Visit <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Digital Advertising Alliance</a> or <a href="http://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Your Online Choices</a></li>
            </ul>

            <h3 className="font-semibold text-lg text-foreground mt-6 mb-3">5.3 Mobile Devices</h3>
            <p className="text-foreground leading-relaxed">
              On mobile devices, you can manage tracking through your device settings. iOS users can enable "Limit Ad Tracking," and Android users can opt out of personalized ads in Google Settings.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">6. Impact of Disabling Cookies</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Disabling cookies may affect your experience on our website:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>You may need to log in each time you visit</li>
              <li>Shopping cart may not retain items between sessions</li>
              <li>Personalized features and recommendations may not work</li>
              <li>Some pages or features may not function properly</li>
              <li>You may see less relevant advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">7. Do Not Track Signals</h2>
            <p className="text-foreground leading-relaxed">
              Some browsers offer a "Do Not Track" (DNT) feature that signals websites you visit that you do not want to be tracked. Currently, there is no universal standard for how DNT signals should be interpreted. We do not currently respond to DNT signals, but we respect your privacy choices through other means described in this policy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">8. Updates to This Policy</h2>
            <p className="text-foreground leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. We will notify you of significant changes by posting a notice on our website. The "Last Updated" date at the top indicates when this policy was last revised.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-4">9. Contact Us</h2>
            <p className="text-foreground leading-relaxed mb-4">
              If you have questions about our use of cookies, please contact us:
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
