import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Catalog from "@/pages/catalog";
import ProductDetail from "@/pages/product-detail";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import AccountDashboard from "@/pages/account/dashboard";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProducts from "@/pages/admin/products";
import AdminAnalytics from "@/pages/admin/analytics";

// Simple landing page without the problematic components
function SimpleLanding() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-yellow-400 mb-4">Artisanal Jewels</h1>
          <p className="text-xl text-gray-300 mb-8">Luxury Jewelry Since 1985</p>
          <div className="space-x-4">
            <a href="/login" className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              Login
            </a>
            <a href="/register" className="border border-yellow-400 text-yellow-400 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition-colors">
              Register
            </a>
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Melbourne, Australia • +61 451565356</p>
        </div>
      </div>
    </div>
  );
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">Artisanal Jewels</h1>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <>
          <Route path="/" component={SimpleLanding} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/catalog" component={Catalog} />
          <Route path="/product/:handle" component={ProductDetail} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/login" component={() => { window.location.href = '/'; return null; }} />
          <Route path="/register" component={() => { window.location.href = '/'; return null; }} />
          <Route path="/catalog" component={Catalog} />
          <Route path="/product/:handle" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/account" component={AccountDashboard} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/products" component={AdminProducts} />
          <Route path="/admin/analytics" component={AdminAnalytics} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;