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
import { Package, Users, DollarSign, TrendingUp, Plus } from "lucide-react";
import { Link } from "wouter";
import type { Product, Order } from "@shared/schema";

export default function AdminDashboard() {
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

    if (!isLoading && user?.role !== "admin") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      });
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/admin/products"],
    enabled: isAuthenticated && user?.role === "admin",
  });

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
    enabled: isAuthenticated && user?.role === "admin",
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-shimmer w-32 h-8 rounded bg-muted"></div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background">
        <Header onMobileMenuToggle={() => {}} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);
  const activeProducts = products.filter(p => p.isActive).length;
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => {}} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-3xl text-foreground mb-2" data-testid="text-admin-dashboard-title">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your jewelry store
            </p>
          </div>
          <Link href="/admin/products">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" data-testid="button-manage-products">
              <Plus size={16} className="mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold price-highlight" data-testid="text-total-revenue">
                {formatPrice(totalRevenue, "USD")}
              </div>
              <p className="text-xs text-muted-foreground">From {orders.length} orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-active-products">{activeProducts}</div>
              <p className="text-xs text-muted-foreground">Out of {products.length} total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-orders">{orders.length}</div>
              <p className="text-xs text-muted-foreground">Total orders placed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Order</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold price-highlight" data-testid="text-average-order">
                {orders.length > 0 ? formatPrice(totalRevenue / orders.length, "USD") : "$0.00"}
              </div>
              <p className="text-xs text-muted-foreground">Per order value</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No orders yet</p>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground" data-testid={`text-order-${order.id}`}>
                          Order #{order.id}
                        </p>
                        <p className="text-sm text-muted-foreground">{order.email}</p>
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
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/products">
                <Button className="w-full justify-start" variant="outline" data-testid="button-products">
                  <Package size={16} className="mr-2" />
                  Manage Products
                </Button>
              </Link>
              <Button className="w-full justify-start" variant="outline" data-testid="button-orders">
                <TrendingUp size={16} className="mr-2" />
                View All Orders
              </Button>
              <Button className="w-full justify-start" variant="outline" data-testid="button-customers">
                <Users size={16} className="mr-2" />
                Customer Management
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        {products.some(p => p.stock < 5) && (
          <Card className="mt-8 border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Low Stock Alert</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {products
                  .filter(p => p.stock < 5)
                  .map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <span className="text-foreground">{product.title}</span>
                      <Badge variant="destructive" data-testid={`badge-stock-${product.id}`}>
                        {product.stock} left
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}
