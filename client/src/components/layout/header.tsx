import { useState } from "react";
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

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer" data-testid="link-home">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Gem className="text-primary-foreground" size={16} />
                </div>
                <span className="font-serif font-semibold text-xl">
                  Artisanal Jewels
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="nav-item relative">
              <Link href="/catalog">
                <div className="flex items-center space-x-1 cursor-pointer hover:text-primary transition-colors" data-testid="link-collections">
                  <span>Collections</span>
                  <ChevronDown size={16} />
                </div>
              </Link>
              <div className="nav-dropdown absolute top-full left-0 mt-2 w-48 bg-popover rounded-md shadow-lg p-2">
                <Link href="/catalog?category=engagement-rings" className="block px-3 py-2 text-sm hover:bg-accent rounded-md">
                  Engagement Rings
                </Link>
                <Link href="/catalog?category=necklaces" className="block px-3 py-2 text-sm hover:bg-accent rounded-md">
                  Necklaces
                </Link>
                <Link href="/catalog?category=earrings" className="block px-3 py-2 text-sm hover:bg-accent rounded-md">
                  Earrings
                </Link>
                <Link href="/catalog?category=bracelets" className="block px-3 py-2 text-sm hover:bg-accent rounded-md">
                  Bracelets
                </Link>
              </div>
            </div>
            <Link href="/about" className="hover:text-primary transition-colors" data-testid="link-about">
              About
            </Link>
            <Link href="/craftsmanship" className="hover:text-primary transition-colors" data-testid="link-craftsmanship">
              Craftsmanship
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors" data-testid="link-contact">
              Contact
            </Link>
          </nav>

          {/* Search, Account, Wishlist, Cart */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop */}
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
            
            {/* Search Icon - Mobile */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMobileSearchToggle}
              className="md:hidden"
              data-testid="button-search-mobile"
            >
              <Search size={20} />
            </Button>
            
            {/* Account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" data-testid="button-account">
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user && (
                        <p className="font-medium text-sm">
                          {user.firstName} {user.lastName}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="w-full cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="w-full cursor-pointer">
                      Order History
                    </Link>
                  </DropdownMenuItem>
                  {(user as any)?.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="w-full cursor-pointer">
                          <Star className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={handleLogout}
                    data-testid="button-logout"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex" data-testid="button-login">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" data-testid="button-signup">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="sm" className="relative" data-testid="button-wishlist">
                <Heart size={20} />
                {isAuthenticated && wishlistItems.length > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                    data-testid="badge-wishlist-count"
                  >
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative" data-testid="button-cart">
                <ShoppingBag size={20} />
                {cartItems.length > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                    data-testid="badge-cart-count"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onMobileMenuToggle}
              className="lg:hidden"
              data-testid="button-mobile-menu"
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
        
        {/* Mobile Search */}
        {showMobileSearch && (
          <div className="md:hidden border-t py-3">
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