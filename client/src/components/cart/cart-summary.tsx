import { formatPrice } from "@/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Shield, Truck, RotateCcw } from "lucide-react";
import type { CartItem } from "@shared/schema";

interface CartSummaryProps {
  items: CartItem[];
  onCheckout: () => void;
}

export default function CartSummary({ items, onCheckout }: CartSummaryProps) {
  // Mock pricing calculations since we don't have full product details
  const subtotal = items.reduce((sum, item) => {
    // Mock price calculation - in real app, you'd fetch product details
    const mockPrice = 3200; // Default price per item
    return sum + (mockPrice * item.quantity);
  }, 0);

  const shipping = subtotal > 5000 ? 0 : 50; // Free shipping over $5000
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const currency = "USD";

  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Items Count */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Items ({items.length})</span>
          <span className="text-foreground" data-testid="text-cart-subtotal">
            {formatPrice(subtotal.toFixed(2), currency)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground" data-testid="text-cart-shipping">
            {shipping === 0 ? (
              <Badge variant="secondary" className="text-xs">FREE</Badge>
            ) : (
              formatPrice(shipping.toFixed(2), currency)
            )}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground" data-testid="text-cart-tax">
            {formatPrice(tax.toFixed(2), currency)}
          </span>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between text-lg font-semibold">
          <span className="text-foreground">Total</span>
          <span className="text-foreground price-highlight" data-testid="text-cart-total">
            {formatPrice(total.toFixed(2), currency)}
          </span>
        </div>

        {/* Free Shipping Threshold */}
        {shipping > 0 && (
          <div className="text-xs text-muted-foreground text-center p-2 bg-muted rounded-lg">
            Add {formatPrice((5000 - subtotal).toFixed(2), currency)} more for free shipping
          </div>
        )}

        {/* Checkout Button */}
        <Button 
          onClick={onCheckout}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          size="lg"
          data-testid="button-checkout"
        >
          Proceed to Checkout
        </Button>

        {/* Trust Badges */}
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center space-x-3 text-sm">
            <Shield className="text-accent flex-shrink-0" size={16} />
            <span className="text-muted-foreground">Lifetime warranty included</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Truck className="text-accent flex-shrink-0" size={16} />
            <span className="text-muted-foreground">
              {shipping === 0 ? "Free shipping on this order" : "Free shipping over $5,000"}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <RotateCcw className="text-accent flex-shrink-0" size={16} />
            <span className="text-muted-foreground">30-day hassle-free returns</span>
          </div>
        </div>

        {/* Security Info */}
        <div className="text-xs text-muted-foreground text-center pt-2">
          <p>🔒 Secure checkout with SSL encryption</p>
          <p className="mt-1">We accept Visa, Mastercard, Amex & PayPal</p>
        </div>
      </CardContent>
    </Card>
  );
}
