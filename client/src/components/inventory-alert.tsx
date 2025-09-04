import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Package, X, Zap, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface InventoryAlert {
  id: string;
  productId: number;
  productTitle: string;
  currentStock: number;
  threshold: number;
  severity: "low" | "critical" | "out";
  lastUpdated: Date;
}

interface InventoryAlertProps {
  alert: InventoryAlert;
  onDismiss?: (alertId: string) => void;
  variant?: "toast" | "badge" | "banner";
  showAnimation?: boolean;
}

export function InventoryAlert({ 
  alert, 
  onDismiss, 
  variant = "toast",
  showAnimation = true 
}: InventoryAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "low": return "secondary";
      case "out": return "destructive";
      default: return "secondary";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <AlertTriangle className="w-4 h-4" />;
      case "low": return <TrendingDown className="w-4 h-4" />;
      case "out": return <Package className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getMessage = () => {
    switch (alert.severity) {
      case "out":
        return `${alert.productTitle} is out of stock!`;
      case "critical":
        return `Only ${alert.currentStock} left in stock for ${alert.productTitle}`;
      case "low":
        return `Low stock alert: ${alert.currentStock} remaining for ${alert.productTitle}`;
      default:
        return `Stock update for ${alert.productTitle}`;
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss?.(alert.id), 300);
  };

  if (variant === "badge") {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30,
          duration: 0.3 
        }}
      >
        <Badge 
          variant={getSeverityColor(alert.severity)}
          className="flex items-center gap-1 text-xs font-medium"
          data-testid={`badge-inventory-${alert.severity}`}
        >
          {getSeverityIcon(alert.severity)}
          {alert.severity === "out" ? "Out of Stock" : `${alert.currentStock} left`}
        </Badge>
      </motion.div>
    );
  }

  if (variant === "banner") {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden ${
              alert.severity === "critical" || alert.severity === "out" 
                ? "bg-destructive/10 border-destructive/20" 
                : "bg-secondary/10 border-secondary/20"
            } border rounded-lg`}
          >
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className={
                    alert.severity === "critical" || alert.severity === "out"
                      ? "text-destructive"
                      : "text-secondary-foreground"
                  }
                >
                  {getSeverityIcon(alert.severity)}
                </motion.div>
                <div>
                  <p className="font-medium text-sm">{getMessage()}</p>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {alert.lastUpdated.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              {onDismiss && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="h-8 w-8 p-0"
                  data-testid={`button-dismiss-alert-${alert.id}`}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Toast variant (default)
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed top-4 right-4 z-50 max-w-sm w-full ${
            alert.severity === "critical" || alert.severity === "out"
              ? "bg-destructive text-destructive-foreground"
              : "bg-secondary text-secondary-foreground"
          } rounded-lg shadow-lg border`}
          data-testid={`toast-inventory-alert-${alert.id}`}
        >
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ 
                    rotate: [0, -15, 15, -15, 0],
                    scale: [1, 1.2, 1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  {getSeverityIcon(alert.severity)}
                </motion.div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">
                    Inventory Alert
                  </h4>
                  <p className="text-sm opacity-90">
                    {getMessage()}
                  </p>
                  <p className="text-xs opacity-70 mt-1">
                    Threshold: {alert.threshold} items
                  </p>
                </div>
              </div>
              {onDismiss && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="h-6 w-6 p-0 hover:bg-white/20"
                  data-testid={`button-dismiss-toast-${alert.id}`}
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Animated progress bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 4 }}
            className="h-1 bg-white/30 origin-left"
            onAnimationComplete={() => onDismiss && handleDismiss()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface InventoryAlertListProps {
  alerts: InventoryAlert[];
  onDismiss?: (alertId: string) => void;
  maxVisible?: number;
}

export function InventoryAlertList({ 
  alerts, 
  onDismiss, 
  maxVisible = 3 
}: InventoryAlertListProps) {
  const visibleAlerts = alerts.slice(0, maxVisible);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {visibleAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <InventoryAlert
              alert={alert}
              onDismiss={onDismiss}
              variant="toast"
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {alerts.length > maxVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Badge variant="secondary" className="text-xs">
            +{alerts.length - maxVisible} more alerts
          </Badge>
        </motion.div>
      )}
    </div>
  );
}

// Playful notification center button with animation
interface NotificationCenterButtonProps {
  alertCount: number;
  onClick: () => void;
}

export function NotificationCenterButton({ 
  alertCount, 
  onClick 
}: NotificationCenterButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="relative p-2"
      data-testid="button-notification-center"
    >
      <Package className="w-5 h-5" />
      {alertCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute -top-1 -right-1"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="bg-destructive text-destructive-foreground rounded-full min-w-[18px] h-[18px] flex items-center justify-center text-xs font-medium"
          >
            {alertCount > 99 ? "99+" : alertCount}
          </motion.div>
        </motion.div>
      )}
    </Button>
  );
}