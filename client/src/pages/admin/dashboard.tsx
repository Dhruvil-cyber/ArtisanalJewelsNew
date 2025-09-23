import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useInventoryMonitoring } from "@/hooks/use-inventory-monitoring";
import { NotificationCenterButton, InventoryAlert } from "@/components/inventory-alert";
import { InventoryTracker } from "@/components/inventory-tracker";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/formatters";
import { Package, Users, DollarSign, TrendingUp, Plus, BarChart3, AlertTriangle, UserCheck, Mail, MessageSquare } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import type { Product, Order } from "@shared/schema";

export default function AdminDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const { alerts, alertStats, dismissAlert, refreshInventory } = useInventoryMonitoring({
    enabled: isAuthenticated && (user as any)?.role === "admin",
    pollInterval: 15000 // Check every 15 seconds for admin
  });
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);

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

    if (!isLoading && (user as any)?.role !== "admin") {
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
    enabled: isAuthenticated && (user as any)?.role === "admin",
  });

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
    enabled: isAuthenticated && (user as any)?.role === "admin",
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-shimmer w-32 h-8 rounded bg-muted"></div>
      </div>
    );
  }

  if ((user as any)?.role !== "admin") {
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
          <div className="flex items-center gap-4">
            {/* Inventory Notification Center */}
            <NotificationCenterButton
              alertCount={alertStats.total}
              onClick={() => setShowNotificationCenter(!showNotificationCenter)}
            />
            <Link href="/admin/products">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" data-testid="button-manage-products">
                <Plus size={16} className="mr-2" />
                Add Product
              </Button>
            </Link>
            <Link href="/admin/banners">
              <Button variant="outline" data-testid="button-manage-banners">
                <Plus size={16} className="mr-2" />
                Manage Banners
              </Button>
            </Link>
          </div>
        </div>

        {/* Inventory Alerts Panel */}
        {showNotificationCenter && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                Inventory Alerts ({alertStats.total})
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshInventory}
                  data-testid="button-refresh-inventory"
                >
                  Refresh
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotificationCenter(false)}
                  data-testid="button-close-notification-center"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {alerts.length === 0 ? (
                <p className="text-muted-foreground">No inventory alerts at this time.</p>
              ) : (
                <div className="space-y-2">
                  {alerts.map((alert) => (
                    <InventoryAlert
                      key={alert.id}
                      alert={alert}
                      onDismiss={dismissAlert}
                      variant="banner"
                    />
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>Critical: {alertStats.critical} | Low: {alertStats.low} | Out of Stock: {alertStats.out}</span>
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </CardContent>
          </Card>
        )}

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
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          {formatPrice(order.total, order.currency || "USD")}
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
              <Link href="/admin/orders">
                <Button className="w-full justify-start" variant="outline" data-testid="button-orders">
                  <TrendingUp size={16} className="mr-2" />
                  Manage Orders
                </Button>
              </Link>
              <Link href="/admin/reviews">
                <Button className="w-full justify-start" variant="outline" data-testid="button-reviews">
                  <MessageSquare size={16} className="mr-2" />
                  Review Management
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button className="w-full justify-start" variant="outline" data-testid="button-analytics">
                  <BarChart3 size={16} className="mr-2" />
                  Analytics Dashboard
                </Button>
              </Link>
              <Button className="w-full justify-start" variant="outline" data-testid="button-orders">
                <TrendingUp size={16} className="mr-2" />
                View All Orders
              </Button>
              <Link href="/admin/customers">
                <Button className="w-full justify-start" variant="outline" data-testid="button-customers">
                  <UserCheck size={16} className="mr-2" />
                  Customer Management
                </Button>
              </Link>
              <Link href="/admin/newsletter">
                <Button className="w-full justify-start" variant="outline" data-testid="button-newsletter">
                  <Mail size={16} className="mr-2" />
                  Newsletter Management
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Comprehensive Inventory Tracker */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Inventory Management</h2>
          <InventoryTracker 
            showSearch={true}
            showFilters={true}
            maxHeight="500px"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
