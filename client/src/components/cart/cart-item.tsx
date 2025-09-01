import { useState } from "react";
import { formatPrice } from "@/lib/formatters";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";
import type { CartItem as CartItemType } from "@shared/schema";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  isUpdating: boolean;
}

export default function CartItem({ item, onUpdateQuantity, onRemove, isUpdating }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  // Mock product data since cart item doesn't include full product details
  const mockProduct = {
    id: item.productId,
    title: "Classic Solitaire Diamond Ring",
    handle: "classic-solitaire-diamond-ring",
    shortDescription: "1ct Diamond, 14k Gold",
    basePrice: "3200.00",
    currency: "USD",
    images: [
      {
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        alt: "Classic diamond engagement ring"
      }
    ]
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) return; // Max quantity limit
    
    setQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };

  const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      handleQuantityChange(value);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  // Calculate total price for this item
  const itemTotal = parseFloat(mockProduct.basePrice) * quantity;

  return (
    <Card className="overflow-hidden" data-testid={`cart-item-${item.id}`}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <Link href={`/product/${mockProduct.handle}`}>
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0 cursor-pointer">
              <img
                src={mockProduct.images[0]?.url}
                alt={mockProduct.images[0]?.alt || mockProduct.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                data-testid={`img-cart-item-${item.id}`}
              />
            </div>
          </Link>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <Link href={`/product/${mockProduct.handle}`}>
              <h3 className="font-medium text-foreground mb-1 hover:text-accent transition-colors cursor-pointer" data-testid={`text-cart-item-title-${item.id}`}>
                {mockProduct.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mb-2" data-testid={`text-cart-item-description-${item.id}`}>
              {mockProduct.shortDescription}
            </p>
            
            {item.variantId && (
              <Badge variant="secondary" className="text-xs" data-testid={`badge-cart-item-variant-${item.id}`}>
                Variant ID: {item.variantId}
              </Badge>
            )}
          </div>

          {/* Price and Controls */}
          <div className="flex flex-col items-end justify-between">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {formatPrice(mockProduct.basePrice, mockProduct.currency)} each
              </p>
              <p className="font-semibold text-foreground price-highlight" data-testid={`text-cart-item-total-${item.id}`}>
                {formatPrice(itemTotal.toFixed(2), mockProduct.currency)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || isUpdating}
                className="w-8 h-8 p-0"
                data-testid={`button-decrease-quantity-${item.id}`}
              >
                <Minus size={14} />
              </Button>
              
              <Input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={handleQuantityInputChange}
                disabled={isUpdating}
                className="w-16 text-center"
                data-testid={`input-quantity-${item.id}`}
              />
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10 || isUpdating}
                className="w-8 h-8 p-0"
                data-testid={`button-increase-quantity-${item.id}`}
              >
                <Plus size={14} />
              </Button>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={isUpdating}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-2"
              data-testid={`button-remove-${item.id}`}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
