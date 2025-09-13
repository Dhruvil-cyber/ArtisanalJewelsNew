import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Search, User, Heart, ShoppingBag, Menu, Gem } from "lucide-react";
import type { CartItem } from "@shared/schema";

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export default function Header({ onMobileMenuToggle }: HeaderProps) {
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: cartItems = [] } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
    enabled: isAuthenticated,
  });

  const { data: wishlistItems = [] } = useQuery<any[]>({
    queryKey: ["/api/wishlist"],
    enabled: isAuthenticated,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center space-x-1.5 sm:space-x-2" data-testid="link-home">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                  <Gem className="text-accent" size={14} />
                </div>
                <span className="font-serif font-semibold text-base sm:text-lg lg:text-xl text-primary">Artisanal Jewels</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="nav-item relative">
              <Link href="/catalog">
                <span className="text-foreground hover:text-accent transition-colors font-medium cursor-pointer" data-testid="link-collections">
                  Collections
                </span>
              </Link>
              <div className="nav-dropdown absolute top-full left-0 mt-2 w-64 bg-card rounded-lg shadow-lg border border-border p-4">
                <div className="space-y-2">
                  <Link href="/catalog?category=engagement-rings">
                    <span className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors cursor-pointer">
                      Engagement Rings
                    </span>
                  </Link>
                  <Link href="/catalog?category=necklaces">
                    <span className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors cursor-pointer">
                      Necklaces
                    </span>
                  </Link>
                  <Link href="/catalog?category=earrings">
                    <span className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors cursor-pointer">
                      Earrings
                    </span>
                  </Link>
                  <Link href="/catalog?category=bracelets">
                    <span className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors cursor-pointer">
                      Bracelets
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/about">
              <span className="text-foreground hover:text-accent transition-colors font-medium cursor-pointer" data-testid="link-about">
                About
              </span>
            </Link>
            <Link href="/craftsmanship">
              <span className="text-foreground hover:text-accent transition-colors font-medium cursor-pointer" data-testid="link-craftsmanship">
                Craftsmanship
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-foreground hover:text-accent transition-colors font-medium cursor-pointer" data-testid="link-contact">
                Contact
              </span>
            </Link>
          </nav>

          {/* Search, Account, Wishlist, Cart */}
          <div className="flex items-center space-x-4">
            {/* Search - Hidden on mobile, shown on larger screens */}
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  type="search"
                  placeholder="Search jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                  data-testid="input-header-search"
                />
              </div>
            </form>
            
            {/* Search Icon for mobile */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              data-testid="button-search-mobile"
            >
              <Search size={20} />
            </Button>
            
            {/* Account */}
            {isAuthenticated ? (
              <div className="nav-item relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 text-muted-foreground hover:text-foreground"
                  data-testid="button-account"
                >
                  <User size={20} />
                </Button>
                <div className="nav-dropdown absolute top-full right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border p-2">
                  <div className="space-y-1">
                    <Link href="/account">
                      <span className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors cursor-pointer">
                        Dashboard
                      </span>
                    </Link>
                    {(user as any)?.role === "admin" && (
                      <Link href="/admin">
                        <span className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors cursor-pointer">
                          Admin Panel
                        </span>
                      </Link>
                    )}
                    <a 
                      href="/api/logout" 
                      className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-foreground hover:text-accent font-medium"
                    data-testid="button-login"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button 
                    size="sm"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-4"
                    data-testid="button-signup"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Wishlist */}
            <Link href="/wishlist">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 text-muted-foreground hover:text-foreground relative"
                data-testid="button-wishlist"
              >
                <Heart size={20} />
                {isAuthenticated && wishlistItems.length > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground"
                    data-testid="badge-wishlist-count"
                  >
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {/* Cart */}
            <Link href="/cart">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 text-muted-foreground hover:text-foreground relative"
                data-testid="button-cart"
              >
                <ShoppingBag size={20} />
                {cartItems.length > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground"
                    data-testid="badge-cart-count"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
              data-testid="button-mobile-menu"
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
