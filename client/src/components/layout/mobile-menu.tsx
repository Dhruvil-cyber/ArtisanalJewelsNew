import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { X, User, Heart, ShoppingBag, Settings } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-background shadow-xl transform transition-transform duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="font-serif font-semibold text-xl text-primary">Menu</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground"
              data-testid="button-close-mobile-menu"
            >
              <X size={20} />
            </Button>
          </div>
          
          <nav className="space-y-1">
            <Link href="/catalog">
              <Button 
                variant="ghost" 
                className="w-full justify-start py-3 text-foreground font-medium border-b border-border rounded-none"
                onClick={onClose}
                data-testid="link-mobile-collections"
              >
                Collections
              </Button>
            </Link>
            
            <Link href="/about">
              <Button 
                variant="ghost" 
                className="w-full justify-start py-3 text-foreground font-medium border-b border-border rounded-none"
                onClick={onClose}
                data-testid="link-mobile-about"
              >
                About
              </Button>
            </Link>
            
            <Link href="/craftsmanship">
              <Button 
                variant="ghost" 
                className="w-full justify-start py-3 text-foreground font-medium border-b border-border rounded-none"
                onClick={onClose}
                data-testid="link-mobile-craftsmanship"
              >
                Craftsmanship
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button 
                variant="ghost" 
                className="w-full justify-start py-3 text-foreground font-medium border-b border-border rounded-none"
                onClick={onClose}
                data-testid="link-mobile-contact"
              >
                Contact
              </Button>
            </Link>

            <Separator className="my-4" />

            {isAuthenticated ? (
              <>
                <Link href="/account">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start py-3 text-foreground font-medium"
                    onClick={onClose}
                    data-testid="link-mobile-account"
                  >
                    <User size={16} className="mr-3" />
                    Account Dashboard
                  </Button>
                </Link>

                {(user as any)?.role === "admin" && (
                  <Link href="/admin">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start py-3 text-foreground font-medium"
                      onClick={onClose}
                      data-testid="link-mobile-admin"
                    >
                      <Settings size={16} className="mr-3" />
                      Admin Panel
                    </Button>
                  </Link>
                )}

                <Link href="/wishlist">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start py-3 text-foreground font-medium"
                    onClick={onClose}
                    data-testid="link-mobile-wishlist"
                  >
                    <Heart size={16} className="mr-3" />
                    Wishlist
                  </Button>
                </Link>

                <Link href="/cart">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start py-3 text-foreground font-medium"
                    onClick={onClose}
                    data-testid="link-mobile-cart"
                  >
                    <ShoppingBag size={16} className="mr-3" />
                    Shopping Cart
                  </Button>
                </Link>

                <Separator className="my-4" />

                <Button 
                  variant="ghost" 
                  className="w-full justify-start py-3 text-foreground font-medium"
                  onClick={() => {
                    onClose();
                    window.location.href = "/api/logout";
                  }}
                  data-testid="button-mobile-logout"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="ghost" 
                className="w-full justify-start py-3 text-foreground font-medium"
                onClick={() => {
                  onClose();
                  window.location.href = "/api/login";
                }}
                data-testid="button-mobile-login"
              >
                <User size={16} className="mr-3" />
                Sign In
              </Button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
