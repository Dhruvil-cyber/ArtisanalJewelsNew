import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { Search, User, Heart, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import logoImage from "@assets/artisanal-jewels-logo.png";
import type { CartItem } from "@shared/schema";

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export default function Header({ onMobileMenuToggle }: HeaderProps) {
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [, setLocation] = useLocation();

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
      setLocation(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setShowMobileSearch(false);
    }
  };

  const handleMobileSearchToggle = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center" data-testid="link-home">
                <img 
                  src={logoImage} 
                  alt="Artisanal Jewels" 
                  className="h-8 sm:h-10 lg:h-12 w-auto"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="nav-item relative">
              <Link href="/catalog">
                <div className="flex items-center space-x-1 text-foreground hover:text-accent transition-colors font-medium cursor-pointer" data-testid="link-collections">
                  <span>Collections</span>
                  <ChevronDown size={16} className="transition-transform duration-200" />
                </div>
              </Link>
              <div className="nav-dropdown absolute top-full left-0 mt-2 w-64 bg-card rounded-lg shadow-lg border border-border p-4">
                <div className="space-y-2">
                  <Link href="/catalog?category=engagement-rings" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors">
                    Engagement Rings
                  </Link>
                  <Link href="/catalog?category=necklaces" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors">
                    Necklaces
                  </Link>
                  <Link href="/catalog?category=earrings" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors">
                    Earrings
                  </Link>
                  <Link href="/catalog?category=bracelets" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors">
                    Bracelets
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/about" className="text-foreground hover:text-accent transition-colors font-medium" data-testid="link-about">
              About
            </Link>
            <Link href="/craftsmanship" className="text-foreground hover:text-accent transition-colors font-medium" data-testid="link-craftsmanship">
              Craftsmanship
            </Link>
            <Link href="/contact" className="text-foreground hover:text-accent transition-colors font-medium" data-testid="link-contact">
              Contact
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
              onClick={handleMobileSearchToggle}
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
                    <Link href="/account" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors">
                      Dashboard
                    </Link>
                    {(user as any)?.role === "admin" && (
                      <Link href="/admin" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors">
                        Admin Panel
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
        
        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden border-t border-border bg-background/95 px-3 py-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  type="search"
                  placeholder="Search jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                  data-testid="input-mobile-search"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
