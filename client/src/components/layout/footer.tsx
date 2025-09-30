import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube } from "lucide-react";
import logoImage from "@assets/artisanal-jewels-logo.png";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img 
                src={logoImage} 
                alt="Artisanal Jewels" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Crafting timeless jewelry pieces with passion and precision since 1985. Each creation tells a unique story of excellence and artistry.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 bg-gray-700 rounded-full hover:bg-accent text-white hover:text-accent-foreground p-0"
                data-testid="link-facebook"
              >
                <Facebook size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 bg-gray-700 rounded-full hover:bg-accent text-white hover:text-accent-foreground p-0"
                data-testid="link-instagram"
              >
                <Instagram size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-10 h-10 bg-gray-700 rounded-full hover:bg-accent text-white hover:text-accent-foreground p-0"
                data-testid="link-youtube"
              >
                <Youtube size={16} />
              </Button>
            </div>
          </div>
          
          {/* Collections */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Collections</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog?category=engagement-rings">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-engagement-rings">
                    Engagement Rings
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=wedding-bands">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-wedding-bands">
                    Wedding Bands
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=necklaces">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-necklaces">
                    Necklaces
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=earrings">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-earrings">
                    Earrings
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=bracelets">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-bracelets">
                    Bracelets
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/custom-design">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-custom-design">
                    Custom Design
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Care</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-contact">
                    Contact Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/size-guide">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-size-guide">
                    Size Guide
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/care-instructions">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-care">
                    Care Instructions
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/shipping">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-shipping">
                    Shipping & Returns
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/warranty">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-warranty">
                    Warranty
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-faq">
                    FAQ
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-about">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/our-story">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-story">
                    Our Story
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/craftsmanship">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-craftsmanship">
                    Craftsmanship
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/press">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-press">
                    Press
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-careers">
                    Careers
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/sustainability">
                  <span className="text-gray-300 hover:text-accent transition-colors cursor-pointer" data-testid="link-footer-sustainability">
                    Ethics & Sustainability
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Artisanal Jewels. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy">
                <span className="text-gray-400 hover:text-accent text-sm transition-colors cursor-pointer" data-testid="link-footer-privacy">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-gray-400 hover:text-accent text-sm transition-colors cursor-pointer" data-testid="link-footer-terms">
                  Terms of Service
                </span>
              </Link>
              <Link href="/cookies">
                <span className="text-gray-400 hover:text-accent text-sm transition-colors cursor-pointer" data-testid="link-footer-cookies">
                  Cookie Policy
                </span>
              </Link>
            </div>
          </div>
          
          {/* Payment Methods */}
          <div className="flex justify-center mt-6 space-x-4">
            <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">VISA</span>
            </div>
            <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">MC</span>
            </div>
            <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">AMEX</span>
            </div>
            <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">PP</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
