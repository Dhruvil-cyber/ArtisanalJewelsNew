import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";

interface Review {
  id: number;
  customerName?: string;
  rating: number;
  title?: string;
  comment?: string;
  isApproved: boolean;
}

export function CustomerTestimonials() {
  // Fetch approved reviews for testimonials
  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ["/api/reviews/approved"],
  });

  // Filter for approved reviews with comments and show max 3
  const testimonials = reviews
    .filter(review => review.isApproved && review.comment && review.customerName)
    .slice(0, 3);

  // Don't render the section if no reviews
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="text-center mb-12">
      <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground mb-4">
        What Our Customers Say
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Hear from customers who have experienced the quality and beauty of our jewelry.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {testimonials.map((review) => (
          <div key={review.id} className="bg-card rounded-lg p-6 shadow-md border border-border">
            <div className="flex text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />
              ))}
            </div>
            {review.title && (
              <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
            )}
            <p className="text-muted-foreground mb-4">
              "{review.comment}"
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                {review.customerName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h5 className="font-semibold text-foreground">{review.customerName}</h5>
                <p className="text-sm text-muted-foreground">Verified Customer</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}