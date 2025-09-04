import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter,
  Truck,
  TrendingUp,
  TrendingDown,
  BarChart3
} from 'lucide-react';
import type { Product } from '@shared/schema';

interface InventoryTrackerProps {
  showSearch?: boolean;
  showFilters?: boolean;
  maxHeight?: string;
}

export function InventoryTracker({ 
  showSearch = true, 
  showFilters = true, 
  maxHeight = '600px' 
}: InventoryTrackerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out' | 'critical'>('all');

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Calculate inventory statistics
  const inventoryStats = {
    totalProducts: products.length,
    inStock: products.filter(p => (p.stock || 0) > 5).length,
    lowStock: products.filter(p => (p.stock || 0) > 0 && (p.stock || 0) <= 5).length,
    outOfStock: products.filter(p => (p.stock || 0) === 0).length,
    criticalStock: products.filter(p => (p.stock || 0) <= 2 && (p.stock || 0) > 0).length,
    totalValue: products.reduce((sum, p) => sum + ((p.stock || 0) * parseFloat(p.basePrice?.toString() || '0')), 0)
  };

  // Filter products based on search and stock filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchTerm || 
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const stock = product.stock || 0;
    let matchesStockFilter = true;
    
    switch (stockFilter) {
      case 'low':
        matchesStockFilter = stock > 0 && stock <= 5;
        break;
      case 'out':
        matchesStockFilter = stock === 0;
        break;
      case 'critical':
        matchesStockFilter = stock <= 2 && stock > 0;
        break;
      default:
        matchesStockFilter = true;
    }
    
    return matchesSearch && matchesStockFilter;
  });

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-600', icon: XCircle };
    if (stock <= 2) return { label: 'Critical', color: 'bg-red-500', icon: AlertTriangle };
    if (stock <= 5) return { label: 'Low Stock', color: 'bg-yellow-500', icon: AlertTriangle };
    return { label: 'In Stock', color: 'bg-green-600', icon: CheckCircle };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
  };

  const getStockProgress = (stock: number, maxStock = 20) => {
    return Math.min((stock / maxStock) * 100, 100);
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Loading inventory...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Products</p>
                <p className="text-2xl font-bold text-white">{inventoryStats.totalProducts}</p>
              </div>
              <Package className="h-6 w-6 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">In Stock</p>
                <p className="text-2xl font-bold text-green-400">{inventoryStats.inStock}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-400">{inventoryStats.lowStock}</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Critical</p>
                <p className="text-2xl font-bold text-red-400">{inventoryStats.criticalStock}</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Out of Stock</p>
                <p className="text-2xl font-bold text-red-500">{inventoryStats.outOfStock}</p>
              </div>
              <XCircle className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Value</p>
                <p className="text-lg font-bold text-yellow-400">
                  {formatCurrency(inventoryStats.totalValue)}
                </p>
              </div>
              <BarChart3 className="h-6 w-6 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {showSearch && (
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search products by name or SKU..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                      data-testid="input-inventory-search"
                    />
                  </div>
                </div>
              )}
              
              {showFilters && (
                <div className="flex gap-2">
                  <Button
                    variant={stockFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStockFilter('all')}
                    className="bg-yellow-400 text-black hover:bg-yellow-300"
                  >
                    All ({inventoryStats.totalProducts})
                  </Button>
                  <Button
                    variant={stockFilter === 'critical' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStockFilter('critical')}
                    className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                  >
                    Critical ({inventoryStats.criticalStock})
                  </Button>
                  <Button
                    variant={stockFilter === 'low' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStockFilter('low')}
                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  >
                    Low ({inventoryStats.lowStock})
                  </Button>
                  <Button
                    variant={stockFilter === 'out' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStockFilter('out')}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Out ({inventoryStats.outOfStock})
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Package className="h-5 w-5 text-yellow-400" />
            Inventory Overview ({filteredProducts.length} items)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto" style={{ maxHeight }}>
            <Table>
              <TableHeader className="sticky top-0 bg-gray-800">
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300 font-semibold">Product</TableHead>
                  <TableHead className="text-gray-300 font-semibold">SKU</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Stock Level</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Status</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Unit Price</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Total Value</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const stock = product.stock || 0;
                  const status = getStockStatus(stock);
                  const StatusIcon = status.icon;
                  const unitPrice = parseFloat(product.basePrice?.toString() || '0');
                  const totalValue = stock * unitPrice;

                  return (
                    <TableRow 
                      key={product.id} 
                      className="border-gray-700 hover:bg-gray-800"
                      data-testid={`row-product-${product.id}`}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {product.images && product.images.length > 0 && (
                            <img
                              src={product.images[0]?.url || '/api/placeholder/product.jpg'}
                              alt={product.title}
                              className="w-10 h-10 rounded-lg object-cover bg-gray-800"
                            />
                          )}
                          <div>
                            <div className="font-medium text-white" data-testid={`text-product-title-${product.id}`}>
                              {product.title}
                            </div>
                            <div className="text-sm text-gray-400">{product.shortDescription}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300 font-mono text-sm">
                        {product.sku || 'N/A'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`h-4 w-4 ${
                            stock === 0 ? 'text-red-500' : 
                            stock <= 2 ? 'text-red-400' :
                            stock <= 5 ? 'text-yellow-400' : 'text-green-400'
                          }`} />
                          <span className="text-white font-semibold" data-testid={`text-stock-${product.id}`}>
                            {stock}
                          </span>
                          <span className="text-gray-400">units</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${status.color} text-white hover:${status.color}`}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white font-medium">
                        {formatCurrency(unitPrice)}
                      </TableCell>
                      <TableCell className="text-white font-medium" data-testid={`text-value-${product.id}`}>
                        {formatCurrency(totalValue)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={getStockProgress(stock)} 
                            className="w-20 h-2"
                          />
                          <span className="text-sm text-gray-400 w-12">
                            {Math.round(getStockProgress(stock))}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}