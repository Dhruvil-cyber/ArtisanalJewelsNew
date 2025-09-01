import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { Category } from "@shared/schema";

interface ProductFiltersProps {
  categories: Category[];
  filters: {
    search: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    metal: string;
    gemstone: string;
    sortBy: string;
  };
  onFilterChange: (filters: any) => void;
}

export default function ProductFilters({ categories, filters, onFilterChange }: ProductFiltersProps) {
  const activeFilters = Object.entries(filters).filter(([key, value]) => 
    value && key !== "sortBy" && key !== "search"
  );

  const clearFilter = (key: string) => {
    onFilterChange({ [key]: "" });
  };

  const clearAllFilters = () => {
    onFilterChange({
      category: "",
      minPrice: "",
      maxPrice: "",
      metal: "",
      gemstone: "",
    });
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Filters</span>
          {activeFilters.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-clear-all-filters"
            >
              Clear All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div>
            <Label className="text-sm font-medium mb-2 block">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map(([key, value]) => (
                <Badge 
                  key={key} 
                  variant="secondary" 
                  className="flex items-center gap-1"
                  data-testid={`badge-filter-${key}`}
                >
                  {key === "category" 
                    ? categories.find(c => c.id.toString() === value)?.name || value
                    : `${key}: ${value}`
                  }
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearFilter(key)}
                    className="h-auto p-0 hover:bg-transparent"
                    data-testid={`button-remove-filter-${key}`}
                  >
                    <X size={12} />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Category</Label>
          <Select 
            value={filters.category} 
            onValueChange={(value) => onFilterChange({ category: value })}
          >
            <SelectTrigger data-testid="select-category-filter">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Price Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="minPrice" className="text-xs text-muted-foreground">Min</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="$0"
                value={filters.minPrice}
                onChange={(e) => onFilterChange({ minPrice: e.target.value })}
                data-testid="input-min-price"
              />
            </div>
            <div>
              <Label htmlFor="maxPrice" className="text-xs text-muted-foreground">Max</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="$10,000"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
                data-testid="input-max-price"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Metal Type */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Metal</Label>
          <Select 
            value={filters.metal} 
            onValueChange={(value) => onFilterChange({ metal: value })}
          >
            <SelectTrigger data-testid="select-metal-filter">
              <SelectValue placeholder="All metals" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All metals</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="white-gold">White Gold</SelectItem>
              <SelectItem value="rose-gold">Rose Gold</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Gemstone */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Gemstone</Label>
          <Select 
            value={filters.gemstone} 
            onValueChange={(value) => onFilterChange({ gemstone: value })}
          >
            <SelectTrigger data-testid="select-gemstone-filter">
              <SelectValue placeholder="All gemstones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All gemstones</SelectItem>
              <SelectItem value="diamond">Diamond</SelectItem>
              <SelectItem value="pearl">Pearl</SelectItem>
              <SelectItem value="ruby">Ruby</SelectItem>
              <SelectItem value="sapphire">Sapphire</SelectItem>
              <SelectItem value="emerald">Emerald</SelectItem>
              <SelectItem value="amethyst">Amethyst</SelectItem>
              <SelectItem value="topaz">Topaz</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Sort By */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Sort By</Label>
          <Select 
            value={filters.sortBy} 
            onValueChange={(value) => onFilterChange({ sortBy: value })}
          >
            <SelectTrigger data-testid="select-sort-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
