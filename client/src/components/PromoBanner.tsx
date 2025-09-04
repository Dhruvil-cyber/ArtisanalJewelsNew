import { useState, useEffect } from "react";
import { X, Clock, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PromoBannerProps {
  onClose?: () => void;
}

export function PromoBanner({ onClose }: PromoBannerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [stockLeft] = useState(47); // Limited stock simulation

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="luxury-gradient text-white py-3 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gold-shimmer opacity-20"></div>
      <div className="container mx-auto relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-serif">50% OFF</span>
              <span className="text-sm">EVERYTHING</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="font-mono">
                  {String(timeLeft.hours).padStart(2, '0')}:
                  {String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <Package className="w-4 h-4" />
                <span>Only {stockLeft} left in stock!</span>
              </div>
            </div>
            
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
              data-testid="button-shop-now"
            >
              SHOP NOW
            </Button>
          </div>
          
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
              data-testid="button-close-promo"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}