import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import { useToast } from "@/hooks/use-toast";
import type { Banner, InsertBanner } from "@shared/schema";

interface BannerFormProps {
  banner?: Banner;
  onSubmit: (data: InsertBanner) => void;
  isLoading: boolean;
}

const BannerForm = ({ banner, onSubmit, isLoading }: BannerFormProps) => {
  const [formData, setFormData] = useState<InsertBanner>({
    title: banner?.title || "",
    description: banner?.description || "",
    images: banner?.images || [],
    isActive: banner?.isActive !== false,
    sortOrder: banner?.sortOrder || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Banner Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
          data-testid="input-banner-title"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ""}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          data-testid="textarea-banner-description"
        />
      </div>

      <div>
        <Label htmlFor="images">Banner Images</Label>
        <div className="space-y-4">
          {/* Display existing images */}
          {formData.images && Array.isArray(formData.images) && formData.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(formData.images as any[]).map((image: any, index: number) => (
                <div key={index} className="relative border rounded-lg p-3">
                  <img
                    src={image.url}
                    alt={image.alt || `Banner image ${index + 1}`}
                    className="w-full h-40 object-cover rounded"
                  />
                  <div className="mt-2 space-y-2">
                    <Input
                      placeholder="Alt text"
                      value={image.alt || ""}
                      onChange={(e) => {
                        const newImages = [...(Array.isArray(formData.images) ? formData.images : [])];
                        newImages[index] = { ...newImages[index], alt: e.target.value };
                        setFormData(prev => ({ ...prev, images: newImages }));
                      }}
                      className="text-sm"
                      data-testid={`input-banner-image-alt-${index}`}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const newImages = Array.isArray(formData.images) ? formData.images.filter((_, i) => i !== index) : [];
                        setFormData(prev => ({ ...prev, images: newImages }));
                      }}
                      className="w-full text-xs"
                      data-testid={`button-remove-banner-image-${index}`}
                    >
                      Remove Image
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* File upload input */}
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  Array.from(files).forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        const newImage = {
                          url: event.target.result as string,
                          alt: file.name.replace(/\.[^/.]+$/, "") // Remove file extension for alt text
                        };
                        setFormData(prev => ({
                          ...prev,
                          images: [...(Array.isArray(prev.images) ? prev.images : []), newImage]
                        }));
                      }
                    };
                    reader.readAsDataURL(file);
                  });
                }
                // Clear the input
                e.target.value = '';
              }}
              className="hidden"
              id="bannerImageUpload"
              data-testid="input-banner-image-upload"
            />
            <label htmlFor="bannerImageUpload" className="cursor-pointer">
              <div className="space-y-2">
                <div className="text-muted-foreground">
                  📸 Click to upload banner images
                </div>
                <div className="text-sm text-muted-foreground">
                  Select multiple images at once (JPG, PNG, GIF)
                </div>
                <Button type="button" variant="outline" className="mt-2">
                  Choose Images
                </Button>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sortOrder">Sort Order</Label>
          <Input
            id="sortOrder"
            type="number"
            value={formData.sortOrder || 0}
            onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
            data-testid="input-banner-sort-order"
          />
        </div>
        <div className="flex items-center space-x-2 mt-6">
          <Switch
            id="isActive"
            checked={formData.isActive || false}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
            data-testid="switch-banner-active"
          />
          <Label htmlFor="isActive">Active Banner</Label>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        data-testid="button-save-banner"
      >
        {isLoading ? "Saving..." : banner ? "Update Banner" : "Create Banner"}
      </Button>
    </form>
  );
};

export default function AdminBanners() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  // Fetch banners
  const { data: banners = [], isLoading } = useQuery<Banner[]>({
    queryKey: ["/api/admin/banners"],
  });

  // Create banner mutation
  const createBannerMutation = useMutation({
    mutationFn: (data: InsertBanner) => apiRequest("POST", "/api/admin/banners", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/banners"] });
      setIsCreateDialogOpen(false);
      toast({
        title: "Success",
        description: "Banner created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create banner",
        variant: "destructive",
      });
    },
  });

  // Update banner mutation
  const updateBannerMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertBanner> }) =>
      apiRequest("PUT", `/api/admin/banners/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/banners"] });
      setEditingBanner(null);
      toast({
        title: "Success",
        description: "Banner updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update banner",
        variant: "destructive",
      });
    },
  });

  // Delete banner mutation
  const deleteBannerMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/banners/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/banners"] });
      toast({
        title: "Success",
        description: "Banner deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete banner",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => {}} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Link href="/admin">
                <Button variant="outline" size="sm" data-testid="button-back-dashboard">
                  ← Dashboard
                </Button>
              </Link>
            </div>
            <h1 className="font-serif font-bold text-3xl text-foreground mb-2" data-testid="text-banners-title">
              Banner Management
            </h1>
            <p className="text-muted-foreground">
              Manage homepage hero banners and promotional images
            </p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" data-testid="button-add-banner">
                <Plus size={16} className="mr-2" />
                Add Banner
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Banner</DialogTitle>
              </DialogHeader>
              <BannerForm
                onSubmit={(data) => createBannerMutation.mutate(data)}
                isLoading={createBannerMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading banners...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {banners.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <p className="text-muted-foreground mb-4">No banners created yet</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  Create your first banner
                </Button>
              </div>
            ) : (
              banners.map((banner) => (
                <div key={banner.id} className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg" data-testid={`text-banner-title-${banner.id}`}>
                        {banner.title}
                      </h3>
                      {banner.description && (
                        <p className="text-muted-foreground mt-1">{banner.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Sort Order: {banner.sortOrder}</span>
                        <span className={banner.isActive ? "text-green-600" : "text-red-600"}>
                          {banner.isActive ? "Active" : "Inactive"}
                        </span>
                        <span>{Array.isArray(banner.images) ? banner.images.length : 0} images</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingBanner(banner)}
                        data-testid={`button-edit-banner-${banner.id}`}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this banner?")) {
                            deleteBannerMutation.mutate(banner.id);
                          }
                        }}
                        data-testid={`button-delete-banner-${banner.id}`}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Show preview of banner images */}
                  {banner.images && Array.isArray(banner.images) && banner.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {(banner.images as any[]).slice(0, 4).map((image: any, index: number) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={image.alt || `Banner preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      ))}
                      {Array.isArray(banner.images) && banner.images.length > 4 && (
                        <div className="w-full h-20 bg-muted rounded flex items-center justify-center text-sm text-muted-foreground">
                          +{Array.isArray(banner.images) ? banner.images.length - 4 : 0} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Edit banner dialog */}
        <Dialog open={!!editingBanner} onOpenChange={(open) => !open && setEditingBanner(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Banner</DialogTitle>
            </DialogHeader>
            {editingBanner && (
              <BannerForm
                banner={editingBanner}
                onSubmit={(data) => updateBannerMutation.mutate({ id: editingBanner.id, data })}
                isLoading={updateBannerMutation.isPending}
              />
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}