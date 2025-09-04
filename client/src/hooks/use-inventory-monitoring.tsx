import { useState, useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { InventoryAlert } from "@/components/inventory-alert";
import type { Product } from "@shared/schema";

interface InventoryThreshold {
  low: number;
  critical: number;
}

interface InventoryMonitoringConfig {
  enabled: boolean;
  pollInterval: number; // in milliseconds
  thresholds: InventoryThreshold;
}

const defaultConfig: InventoryMonitoringConfig = {
  enabled: true,
  pollInterval: 30000, // 30 seconds
  thresholds: {
    low: 10,
    critical: 3
  }
};

export function useInventoryMonitoring(config: Partial<InventoryMonitoringConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config };
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
  const queryClient = useQueryClient();

  // Fetch products with stock information
  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    enabled: finalConfig.enabled,
    refetchInterval: finalConfig.pollInterval,
    staleTime: finalConfig.pollInterval - 5000, // Slightly less than poll interval
  });

  // Generate alerts based on current stock levels
  const generateAlerts = useCallback((products: Product[]): InventoryAlert[] => {
    const currentTime = new Date();
    const newAlerts: InventoryAlert[] = [];

    products.forEach(product => {
      const stock = product.stock || 0;
      let severity: "low" | "critical" | "out" | null = null;

      if (stock === 0) {
        severity = "out";
      } else if (stock <= finalConfig.thresholds.critical) {
        severity = "critical";
      } else if (stock <= finalConfig.thresholds.low) {
        severity = "low";
      }

      if (severity) {
        const alertId = `${product.id}-${severity}-${stock}`;
        
        // Only create alert if not dismissed
        if (!dismissedAlerts.has(alertId)) {
          newAlerts.push({
            id: alertId,
            productId: product.id,
            productTitle: product.title,
            currentStock: stock,
            threshold: severity === "critical" ? finalConfig.thresholds.critical : finalConfig.thresholds.low,
            severity,
            lastUpdated: currentTime
          });
        }
      }
    });

    return newAlerts.sort((a, b) => {
      // Sort by severity: out > critical > low
      const severityOrder = { out: 3, critical: 2, low: 1 };
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[b.severity] - severityOrder[a.severity];
      }
      // Then by stock level (ascending)
      return a.currentStock - b.currentStock;
    });
  }, [finalConfig.thresholds, dismissedAlerts]);

  // Update alerts when products change
  useEffect(() => {
    if (products.length > 0) {
      const newAlerts = generateAlerts(products);
      setAlerts(newAlerts);
    }
  }, [products, generateAlerts]);

  // Dismiss alert handler
  const dismissAlert = useCallback((alertId: string) => {
    setDismissedAlerts(prev => new Set(prev).add(alertId));
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  }, []);

  // Clear all dismissed alerts (useful for admin reset)
  const clearDismissedAlerts = useCallback(() => {
    setDismissedAlerts(new Set());
    if (products.length > 0) {
      setAlerts(generateAlerts(products));
    }
  }, [products, generateAlerts]);

  // Get alerts by severity
  const getAlertsBySeverity = useCallback((severity: "low" | "critical" | "out") => {
    return alerts.filter(alert => alert.severity === severity);
  }, [alerts]);

  // Get alert statistics
  const getAlertStats = useCallback(() => {
    const stats = {
      total: alerts.length,
      out: alerts.filter(a => a.severity === "out").length,
      critical: alerts.filter(a => a.severity === "critical").length,
      low: alerts.filter(a => a.severity === "low").length
    };
    return stats;
  }, [alerts]);

  // Force refresh inventory data
  const refreshInventory = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["/api/products"] });
  }, [queryClient]);

  return {
    alerts,
    alertStats: getAlertStats(),
    isLoading,
    error,
    dismissAlert,
    clearDismissedAlerts,
    getAlertsBySeverity,
    refreshInventory,
    config: finalConfig
  };
}

// Hook for checking individual product stock status
export function useProductStockStatus(productId: number, thresholds?: InventoryThreshold) {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    staleTime: 30000,
  });

  const product = products.find(p => p.id === productId);
  const stock = product?.stock || 0;
  const defaultThresholds = { low: 10, critical: 3 };
  const finalThresholds = { ...defaultThresholds, ...thresholds };

  let status: "in_stock" | "low" | "critical" | "out" = "in_stock";
  let needsAlert = false;

  if (stock === 0) {
    status = "out";
    needsAlert = true;
  } else if (stock <= finalThresholds.critical) {
    status = "critical";
    needsAlert = true;
  } else if (stock <= finalThresholds.low) {
    status = "low";
    needsAlert = true;
  }

  return {
    stock,
    status,
    needsAlert,
    thresholds: finalThresholds,
    product
  };
}