import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useInventoryMonitoring } from "@/hooks/use-inventory-monitoring";
import { InventoryAlertList } from "@/components/inventory-alert";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Welcome from "@/pages/welcome";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Catalog from "@/pages/catalog";
import ProductDetail from "@/pages/product-detail";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import Wishlist from "@/pages/wishlist";
import AccountDashboard from "@/pages/account/dashboard";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProducts from "@/pages/admin/products";
import AdminBanners from "@/pages/admin/banners";
import AdminAnalytics from "@/pages/admin/analytics";
import AdminCustomers from "@/pages/admin/customers";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import SizeGuide from "@/pages/size-guide";
import CareInstructions from "@/pages/care-instructions";

// Remove SimpleLanding - now using dedicated Welcome page

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  const { alerts, dismissAlert } = useInventoryMonitoring({
    enabled: isAuthenticated, // Only monitor when logged in
    pollInterval: 30000 // Check every 30 seconds
  });

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
    <>
      {/* Global Inventory Alerts */}
      {isAuthenticated && alerts.length > 0 && (
        <InventoryAlertList
          alerts={alerts}
          onDismiss={dismissAlert}
          maxVisible={3}
        />
      )}
      
      <Switch>
      {!isAuthenticated ? (
        <>
          <Route path="/" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/catalog" component={Catalog} />
          <Route path="/product/:handle" component={ProductDetail} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/size-guide" component={SizeGuide} />
          <Route path="/care-instructions" component={CareInstructions} />
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
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/account" component={AccountDashboard} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/admin/products" component={AdminProducts} />
          <Route path="/admin/banners" component={AdminBanners} />
          <Route path="/admin/analytics" component={AdminAnalytics} />
          <Route path="/admin/customers" component={AdminCustomers} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/size-guide" component={SizeGuide} />
          <Route path="/care-instructions" component={CareInstructions} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
    </>
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