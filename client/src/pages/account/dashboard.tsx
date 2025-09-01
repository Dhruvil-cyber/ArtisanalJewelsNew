import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/formatters";
import { User, Package, Heart, Settings } from "lucide-react";
import type { Order, Product } from "@shared/schema";

export default function AccountDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
    enabled: isAuthenticated,
  });

  const { data: wishlist = [] } = useQuery<Product[]>({
    queryKey: ["/api/wishlist"],
    enabled: isAuthenticated,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-shimmer w-32 h-8 rounded bg-muted"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => {}} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif font-bold text-3xl text-foreground mb-2" data-testid="text-dashboard-title">
            Account Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.firstName || user?.email?.split('@')[0] || 'Customer'}!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Account Info */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Information</CardTitle>
              <User className="h-4 w-4 text-muted-foreground ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Email: {user?.email}</p>
                {user?.firstName && (
                  <p className="text-sm text-muted-foreground">
                    Name: {user.firstName} {user.lastName}
                  </p>
                )}
                <Button variant="outline" size="sm" className="mt-4" data-testid="button-edit-profile">
                  <Settings size={16} className="mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-orders-count">{orders.length}</div>
              <p className="text-xs text-muted-foreground">Total orders placed</p>
              {orders.length > 0 && (
                <Button variant="outline" size="sm" className="mt-4" data-testid="button-view-orders">
                  View All Orders
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Wishlist */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-wishlist-count">{wishlist.length}</div>
              <p className="text-xs text-muted-foreground">Saved items</p>
              {wishlist.length > 0 && (
                <Button variant="outline" size="sm" className="mt-4" data-testid="button-view-wishlist">
                  View Wishlist
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders List */}
        {orders.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground" data-testid={`text-order-${order.id}`}>
                        Order #{order.id}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        {formatPrice(order.total, order.currency)}
                      </p>
                      <Badge 
                        variant={order.status === "delivered" ? "default" : "secondary"}
                        data-testid={`badge-status-${order.id}`}
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="flex justify-center mt-8">
          <Button 
            onClick={() => window.location.href = "/api/logout"}
            variant="outline"
            data-testid="button-logout"
          >
            Logout
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
