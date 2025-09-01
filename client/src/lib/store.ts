import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  productId: number;
  variantId?: number;
  quantity: number;
  addedAt: Date;
}

interface WishlistItem {
  productId: number;
  addedAt: Date;
}

interface StoreState {
  // Cart state
  cartItems: CartItem[];
  addToCart: (productId: number, variantId?: number, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;

  // Wishlist state
  wishlistItems: WishlistItem[];
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: number) => boolean;

  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;

  // Recently viewed products
  recentlyViewed: number[];
  addToRecentlyViewed: (productId: number) => void;
  clearRecentlyViewed: () => void;

  // Filters state
  activeFilters: {
    category?: string;
    priceRange?: [number, number];
    metal?: string;
    gemstone?: string;
    sortBy?: string;
  };
  setFilters: (filters: any) => void;
  clearFilters: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cartItems: [],
      
      addToCart: (productId: number, variantId?: number, quantity = 1) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            item => item.productId === productId && item.variantId === variantId
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map(item =>
                item.id === existingItem.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          const newItem: CartItem = {
            id: Date.now() + Math.random(),
            productId,
            variantId,
            quantity,
            addedAt: new Date(),
          };

          return {
            cartItems: [...state.cartItems, newItem],
          };
        });
      },

      removeFromCart: (id: number) => {
        set((state) => ({
          cartItems: state.cartItems.filter(item => item.id !== id),
        }));
      },

      updateCartQuantity: (id: number, quantity: number) => {
        set((state) => ({
          cartItems: state.cartItems.map(item =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      getCartTotal: () => {
        // This would typically calculate based on actual product prices
        // For now, return item count as placeholder
        return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
      },

      getCartItemCount: () => {
        return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
      },

      // Wishlist state
      wishlistItems: [],

      addToWishlist: (productId: number) => {
        set((state) => {
          if (state.wishlistItems.some(item => item.productId === productId)) {
            return state; // Already in wishlist
          }

          return {
            wishlistItems: [
              ...state.wishlistItems,
              { productId, addedAt: new Date() }
            ],
          };
        });
      },

      removeFromWishlist: (productId: number) => {
        set((state) => ({
          wishlistItems: state.wishlistItems.filter(
            item => item.productId !== productId
          ),
        }));
      },

      clearWishlist: () => {
        set({ wishlistItems: [] });
      },

      isInWishlist: (productId: number) => {
        return get().wishlistItems.some(item => item.productId === productId);
      },

      // Search state
      searchQuery: "",
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      searchHistory: [],

      addToSearchHistory: (query: string) => {
        if (!query.trim()) return;
        
        set((state) => {
          const filteredHistory = state.searchHistory.filter(
            item => item.toLowerCase() !== query.toLowerCase()
          );
          return {
            searchHistory: [query, ...filteredHistory].slice(0, 10), // Keep last 10 searches
          };
        });
      },

      clearSearchHistory: () => set({ searchHistory: [] }),

      // Recently viewed products
      recentlyViewed: [],

      addToRecentlyViewed: (productId: number) => {
        set((state) => {
          const filtered = state.recentlyViewed.filter(id => id !== productId);
          return {
            recentlyViewed: [productId, ...filtered].slice(0, 20), // Keep last 20 viewed
          };
        });
      },

      clearRecentlyViewed: () => set({ recentlyViewed: [] }),

      // Filters state
      activeFilters: {},

      setFilters: (filters: any) => {
        set((state) => ({
          activeFilters: { ...state.activeFilters, ...filters },
        }));
      },

      clearFilters: () => set({ activeFilters: {} }),
    }),
    {
      name: 'artisanal-jewels-store',
      partialize: (state) => ({
        cartItems: state.cartItems,
        wishlistItems: state.wishlistItems,
        searchHistory: state.searchHistory,
        recentlyViewed: state.recentlyViewed,
      }),
    }
  )
);

// Selectors for better performance
export const useCartItems = () => useStore(state => state.cartItems);
export const useCartCount = () => useStore(state => state.getCartItemCount());
export const useWishlist = () => useStore(state => state.wishlistItems);
export const useSearchQuery = () => useStore(state => state.searchQuery);
export const useActiveFilters = () => useStore(state => state.activeFilters);
export const useRecentlyViewed = () => useStore(state => state.recentlyViewed);
