import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "wouter";
import { Search, User, Heart, ShoppingBag, Menu, Gem, ChevronDown, LogOut, Star } from "lucide-react";
import type { CartItem } from "@shared/schema";

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export default function Header({ onMobileMenuToggle }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  
  const isHomePage = location === '/';

  const { data: cartItems = [] } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
    enabled: isAuthenticated,
  });

  const { data: wishlistItems = [] } = useQuery<any[]>({
    queryKey: ["/api/wishlist"],
    enabled: isAuthenticated,
  });

  // Handle scroll behavior for header styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${
      isHomePage && !isScrolled 
        ? 'bg-transparent border-transparent' 
        : 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-luxury'
    }`}>
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex h-14 sm:h-16 lg:h-18 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center space-x-1.5 sm:space-x-2 group" data-testid="link-home">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isHomePage && !isScrolled 
                    ? 'bg-gold-500/20 backdrop-blur-sm group-hover:bg-gold-500/30' 
                    : 'bg-gradient-to-br from-gold-500 to-gold-600 group-hover:from-gold-400 group-hover:to-gold-500'
                }`}>
                  <Gem className={`transition-colors duration-300 ${
                    isHomePage && !isScrolled 
                      ? 'text-gold-300' 
                      : 'text-onyx'
                  }`} size={14} />
                </div>
                <span className={`font-serif font-semibold text-base sm:text-lg lg:text-xl transition-all duration-300 ${
                  isHomePage && !isScrolled 
                    ? 'text-ivory group-hover:text-gold-300' 
                    : 'text-foreground group-hover:text-gold-600'
                }`}>
                  <span className="relative">
                    Artisanal
                    <span className="gold-accent ml-1">Jewels</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-600 group-hover:w-full transition-all duration-500"></div>
                  </span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="nav-item relative group">
              <Link href="/catalog">
                <div className={`flex items-center space-x-1 font-medium cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isHomePage && !isScrolled 
                    ? 'text-ivory/90 hover:text-gold-300' 
                    : 'text-foreground hover:text-gold-600'
                } after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-gold-500 after:to-gold-600 hover:after:w-full after:transition-all after:duration-300`} data-testid="link-collections">
                  <span>Collections</span>
                  <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
                </div>
              </Link>
              <div className="nav-dropdown absolute top-full left-0 mt-2 w-64 bg-background/95 backdrop-blur-xl rounded-xl shadow-luxury border border-gold-500/20 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="space-y-2">
                  <Link href="/catalog?category=engagement-rings" className="block px-3 py-2 text-sm text-foreground hover:bg-gold-500/10 rounded-lg transition-colors">
                    Engagement Rings
                  </Link>
                  <Link href="/catalog?category=necklaces" className="block px-3 py-2 text-sm text-foreground hover:bg-gold-500/10 rounded-lg transition-colors">
                    Necklaces
                  </Link>
                  <Link href="/catalog?category=earrings" className="block px-3 py-2 text-sm text-foreground hover:bg-gold-500/10 rounded-lg transition-colors">
                    Earrings
                  </Link>
                  <Link href="/catalog?category=bracelets" className="block px-3 py-2 text-sm text-foreground hover:bg-gold-500/10 rounded-lg transition-colors">
                    Bracelets
                  </Link>
                </div>
              </div>
            </div>
            <Link 
              href="/about" 
              className={`relative font-medium transition-all duration-300 hover:scale-105 ${
                isHomePage && !isScrolled 
                  ? 'text-ivory/90 hover:text-gold-300' 
                  : 'text-foreground hover:text-gold-600'
              } after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-gold-500 after:to-gold-600 hover:after:w-full after:transition-all after:duration-300`} 
              data-testid="link-about"
            >
              About
            </Link>
            <Link 
              href="/craftsmanship" 
              className={`relative font-medium transition-all duration-300 hover:scale-105 ${
                isHomePage && !isScrolled 
                  ? 'text-ivory/90 hover:text-gold-300' 
                  : 'text-foreground hover:text-gold-600'
              } after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-gold-500 after:to-gold-600 hover:after:w-full after:transition-all after:duration-300`} 
              data-testid="link-craftsmanship"
            >
              Craftsmanship
            </Link>
            <Link 
              href="/contact" 
              className={`relative font-medium transition-all duration-300 hover:scale-105 ${
                isHomePage && !isScrolled 
                  ? 'text-ivory/90 hover:text-gold-300' 
                  : 'text-foreground hover:text-gold-600'
              } after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-gold-500 after:to-gold-600 hover:after:w-full after:transition-all after:duration-300`} 
              data-testid="link-contact"
            >
              Contact
            </Link>
          </nav>

          {/* Search, Account, Wishlist, Cart */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search - Hidden on mobile, shown on larger screens */}
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative group">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  isHomePage && !isScrolled 
                    ? 'text-ivory/60 group-focus-within:text-gold-300' 
                    : 'text-muted-foreground group-focus-within:text-gold-600'
                }`} size={16} />
                <Input
                  type="search"
                  placeholder="Search luxury jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 w-64 transition-all duration-300 focus:ring-2 focus:ring-gold-500/50 ${
                    isHomePage && !isScrolled 
                      ? 'bg-white/10 border-white/20 text-ivory placeholder:text-ivory/60 backdrop-blur-sm' 
                      : 'bg-background border-border text-foreground'
                  }`}
                  data-testid="input-header-search"
                />
              </div>
            </form>
            
            {/* Search Icon for mobile */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMobileSearchToggle}
              className={`md:hidden p-2 transition-all duration-300 hover:scale-105 ${
                isHomePage && !isScrolled 
                  ? 'text-ivory/90 hover:text-gold-300 hover:bg-white/10' 
                  : 'text-muted-foreground hover:text-gold-600 hover:bg-gold-500/10'
              }`}
              data-testid="button-search-mobile"
            >
              <Search size={20} />
            </Button>
            
            {/* Account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`p-2 transition-all duration-300 hover:scale-105 ${
                      isHomePage && !isScrolled 
                        ? 'text-ivory/90 hover:text-gold-300 hover:bg-white/10' 
                        : 'text-muted-foreground hover:text-gold-600 hover:bg-gold-500/10'
                    }`}
                    data-testid="button-account"
                  >
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 luxury-card border-gold-500/20">
                  <div className="flex items-center justify-start gap-3 p-4">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user && (
                        <p className="text-sm font-semibold text-foreground">
                          {user.firstName} {user.lastName}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-gold-500/20" />
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="w-full cursor-pointer hover:bg-gold-500/10 transition-colors">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="w-full cursor-pointer hover:bg-gold-500/10 transition-colors">
                      Order History
                    </Link>
                  </DropdownMenuItem>
                  {(user as any)?.role === "admin" && (
                    <>
                      <DropdownMenuSeparator className="bg-gold-500/20" />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="w-full cursor-pointer hover:bg-gold-500/10 transition-colors">
                          <Star className="mr-2 h-4 w-4 text-gold-500" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-gold-500/20" />
                  <DropdownMenuItem
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                    onClick={logout}
                    data-testid="button-logout"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`hidden sm:inline-flex font-medium transition-all duration-300 hover:scale-105 ${
                      isHomePage && !isScrolled 
                        ? 'text-ivory/90 hover:text-gold-300 hover:bg-white/10' 
                        : 'text-foreground hover:text-gold-600 hover:bg-gold-500/10'
                    }`}
                    data-testid="button-login"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-onyx font-semibold transition-all duration-300 hover:scale-105 hover:shadow-gold-glow px-4"
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
                className={`p-2 relative transition-all duration-300 hover:scale-105 ${
                  isHomePage && !isScrolled 
                    ? 'text-ivory/90 hover:text-gold-300 hover:bg-white/10' 
                    : 'text-muted-foreground hover:text-gold-600 hover:bg-gold-500/10'
                }`}
                data-testid="button-wishlist"
              >
                <Heart size={20} />
                {isAuthenticated && wishlistItems.length > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-gold-500 to-gold-600 text-onyx border-0"
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
                className={`p-2 relative transition-all duration-300 hover:scale-105 ${
                  isHomePage && !isScrolled 
                    ? 'text-ivory/90 hover:text-gold-300 hover:bg-white/10' 
                    : 'text-muted-foreground hover:text-gold-600 hover:bg-gold-500/10'
                }`}
                data-testid="button-cart"
              >
                <ShoppingBag size={20} />
                {cartItems.length > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-gold-500 to-gold-600 text-onyx border-0"
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
              className={`lg:hidden p-2 transition-all duration-300 hover:scale-105 ${
                isHomePage && !isScrolled 
                  ? 'text-ivory/90 hover:text-gold-300 hover:bg-white/10' 
                  : 'text-muted-foreground hover:text-gold-600 hover:bg-gold-500/10'
              }`}
              data-testid="button-mobile-menu"
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className={`md:hidden border-t px-3 py-3 transition-all duration-300 ${
            isHomePage && !isScrolled 
              ? 'border-white/20 bg-black/20 backdrop-blur-sm' 
              : 'border-border bg-background/95'
          }`}>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  isHomePage && !isScrolled 
                    ? 'text-ivory/60' 
                    : 'text-muted-foreground'
                }`} size={16} />
                <Input
                  type="search"
                  placeholder="Search jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 w-full transition-all duration-300 focus:ring-2 focus:ring-gold-500/50 ${
                    isHomePage && !isScrolled 
                      ? 'bg-white/10 border-white/20 text-ivory placeholder:text-ivory/60' 
                      : 'bg-background border-border text-foreground'
                  }`}
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