import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Users, Search, Mail, Calendar, DollarSign, ShoppingBag } from 'lucide-react';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

interface CustomerStats {
  totalOrders: number;
  totalSpent: number;
  lastOrder: Date | null;
}

interface Customer {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  createdAt: Date | null;
  isVerified: boolean | null;
  lastLoginAt: Date | null;
  stats: CustomerStats;
}

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: customers = [], isLoading } = useQuery<Customer[]>({
    queryKey: ['/api/admin/customers'],
  });

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const customerStats = {
    totalCustomers: customers.length,
    totalRevenue: customers.reduce((sum, customer) => sum + customer.stats.totalSpent, 0),
    avgOrderValue: customers.length > 0 
      ? customers.reduce((sum, customer) => sum + customer.stats.totalSpent, 0) / 
        customers.reduce((sum, customer) => sum + customer.stats.totalOrders, 0) || 0
      : 0,
    activeCustomers: customers.filter(customer => customer.stats.totalOrders > 0).length
  };

  const formatDate = (date: Date | null | string) => {
    if (!date) return 'Never';
    const d = new Date(date);
    return d.toLocaleDateString('en-AU', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading customers...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-yellow-400 mb-2">Customer Management</h1>
            <p className="text-gray-400">Manage and view all registered customers</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{customerStats.totalCustomers}</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Active Customers</CardTitle>
                <ShoppingBag className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{customerStats.activeCustomers}</div>
                <p className="text-xs text-gray-400">Customers with orders</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{formatCurrency(customerStats.totalRevenue)}</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Avg Order Value</CardTitle>
                <DollarSign className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{formatCurrency(customerStats.avgOrderValue)}</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="bg-gray-900 border-gray-800 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search customers by email or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                    data-testid="input-customer-search"
                  />
                </div>
                <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Customers Table */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">All Customers ({filteredCustomers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 hover:bg-gray-800">
                      <TableHead className="text-gray-300">Customer</TableHead>
                      <TableHead className="text-gray-300">Email</TableHead>
                      <TableHead className="text-gray-300">Role</TableHead>
                      <TableHead className="text-gray-300">Orders</TableHead>
                      <TableHead className="text-gray-300">Total Spent</TableHead>
                      <TableHead className="text-gray-300">Last Order</TableHead>
                      <TableHead className="text-gray-300">Joined</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow 
                        key={customer.id} 
                        className="border-gray-700 hover:bg-gray-800"
                        data-testid={`row-customer-${customer.id}`}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-yellow-400 text-black font-semibold flex items-center justify-center">
                              {(customer.firstName?.[0] || customer.email?.[0] || 'U').toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium text-white" data-testid={`text-customer-name-${customer.id}`}>
                                {customer.firstName && customer.lastName 
                                  ? `${customer.firstName} ${customer.lastName}`
                                  : customer.email
                                }
                              </div>
                              <div className="text-sm text-gray-400">ID: {customer.id.slice(0, 8)}...</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Mail className="h-4 w-4" />
                            {customer.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={customer.role === 'admin' ? 'destructive' : 'secondary'}
                            className={customer.role === 'admin' 
                              ? 'bg-red-600 text-white' 
                              : 'bg-gray-700 text-gray-300'
                            }
                          >
                            {customer.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white font-medium" data-testid={`text-orders-${customer.id}`}>
                          {customer.stats.totalOrders}
                        </TableCell>
                        <TableCell className="text-white font-medium" data-testid={`text-spent-${customer.id}`}>
                          {formatCurrency(customer.stats.totalSpent)}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {formatDate(customer.stats.lastOrder)}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {formatDate(customer.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={customer.isVerified ? 'default' : 'outline'}
                            className={customer.isVerified 
                              ? 'bg-green-600 text-white' 
                              : 'border-gray-600 text-gray-400'
                            }
                          >
                            {customer.isVerified ? 'Verified' : 'Unverified'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredCustomers.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No customers found matching your search.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}