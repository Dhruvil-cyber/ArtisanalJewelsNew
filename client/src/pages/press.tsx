import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, Award, Calendar, Download, ExternalLink, Star } from "lucide-react";

export default function Press() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pressReleases = [
    {
      date: "2025-01-15",
      title: "Artisanal Jewels Launches Revolutionary Custom Design Platform",
      excerpt: "New online platform combines traditional craftsmanship with cutting-edge 3D visualization technology, allowing customers to design bespoke jewelry from anywhere in the world.",
      category: "Product Launch",
      downloadLink: "#"
    },
    {
      date: "2024-12-08",
      title: "Melbourne Jeweler Wins International Craftsmanship Excellence Award",
      excerpt: "David Chen and the Artisanal Jewels team recognized for outstanding contribution to traditional jewelry making techniques and sustainable practices.",
      category: "Award",
      downloadLink: "#"
    },
    {
      date: "2024-11-22",
      title: "Artisanal Jewels Celebrates 40 Years of Fine Jewelry Creation",
      excerpt: "Four decades of excellence in luxury jewelry design and craftsmanship, serving Melbourne and international clients with bespoke creations.",
      category: "Milestone",
      downloadLink: "#"
    },
    {
      date: "2024-10-14",
      title: "Sustainable Luxury: Artisanal Jewels' Commitment to Ethical Sourcing",
      excerpt: "Company achieves full certification for conflict-free diamonds and responsibly sourced precious metals, setting new industry standards.",
      category: "Sustainability",
      downloadLink: "#"
    }
  ];

  const mediaFeatures = [
    {
      publication: "Vogue Australia",
      date: "2024-12-01",
      title: "Melbourne's Hidden Gem: The Artisan Behind Australia's Most Coveted Engagement Rings",
      type: "Feature Article",
      link: "#"
    },
    {
      publication: "Australian Financial Review",
      date: "2024-11-15",
      title: "Luxury Jewelry Market Thrives as Artisanal Jewels Reports Record Year",
      type: "Business Profile",
      link: "#"
    },
    {
      publication: "Belle Magazine",
      date: "2024-10-28",
      title: "The Art of Slow Luxury: How Traditional Craftsmanship Survives in Digital Age",
      type: "Lifestyle Feature",
      link: "#"
    },
    {
      publication: "Harper's Bazaar",
      date: "2024-09-12",
      title: "Custom Jewelry Renaissance: Why Bespoke is the New Luxury Standard",
      type: "Trend Report",
      link: "#"
    }
  ];

  const awards = [
    {
      year: "2024",
      award: "International Craftsmanship Excellence Award",
      organization: "World Jewelry Federation",
      description: "Recognition for outstanding traditional techniques and innovation in fine jewelry"
    },
    {
      year: "2023",
      award: "Sustainable Business Leader",
      organization: "Australian Jewelry Association",
      description: "Leading the industry in ethical sourcing and environmental responsibility"
    },
    {
      year: "2022",
      award: "Master Craftsman Recognition",
      organization: "Victorian Artisan Guild",
      description: "Lifetime achievement in preserving traditional jewelry making techniques"
    },
    {
      year: "2020",
      award: "Innovation in Custom Design",
      organization: "Melbourne Design Awards",
      description: "Revolutionary approach to bespoke jewelry creation and client collaboration"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950/20 dark:to-blue-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <Newspaper className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                Press & <span className="gold-accent">Media</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stay updated with the latest news, awards, and media coverage 
                of our journey in fine jewelry craftsmanship.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
                <Award className="w-4 h-4 mr-1" />
                Award Winner
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                <Newspaper className="w-4 h-4 mr-1" />
                Media Featured
              </Badge>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                <Star className="w-4 h-4 mr-1" />
                Industry Leader
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Press Releases
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Latest announcements and news from Artisanal Jewels.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {pressReleases.map((release, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="flex items-center space-x-4 mb-2 lg:mb-0">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">
                        {new Date(release.date).toLocaleDateString('en-AU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <Badge variant="outline">{release.category}</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-fit" data-testid={`button-download-${index}`}>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                  <h3 className="font-semibold text-xl text-foreground mb-3">
                    {release.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {release.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Media Coverage
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Featured stories and articles about our craftsmanship and business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {mediaFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg text-primary mb-1">
                        {feature.publication}
                      </h4>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(feature.date).toLocaleDateString('en-AU')}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.type}
                    </Badge>
                  </div>
                  <h3 className="font-medium text-foreground mb-4 leading-tight">
                    {feature.title}
                  </h3>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary" data-testid={`button-read-${index}`}>
                    Read Article
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Awards & Recognition
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry recognition for our commitment to excellence and innovation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {awards.map((award, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg text-foreground">
                          {award.award}
                        </h3>
                        <Badge variant="secondary">{award.year}</Badge>
                      </div>
                      <p className="text-primary font-medium mb-2">
                        {award.organization}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {award.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Media Resources
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Download our complete media kit including high-resolution images, 
            company information, and executive biographies.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Download className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Brand Assets</h4>
                <p className="text-sm text-muted-foreground mb-4">Logos, brand guidelines, and visual assets</p>
                <Button variant="outline" size="sm" data-testid="button-download-brand">
                  Download
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Download className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Product Images</h4>
                <p className="text-sm text-muted-foreground mb-4">High-resolution jewelry photography</p>
                <Button variant="outline" size="sm" data-testid="button-download-images">
                  Download
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Download className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Company Info</h4>
                <p className="text-sm text-muted-foreground mb-4">Fact sheets and executive biographies</p>
                <Button variant="outline" size="sm" data-testid="button-download-info">
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Press Contact
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            For media inquiries, interviews, or additional information, please contact our press team.
          </p>
          
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Media Relations</h4>
                  <p className="text-muted-foreground mb-1">Sarah Mitchell</p>
                  <p className="text-muted-foreground mb-1">Director of Communications</p>
                  <p className="text-primary">press@artisanaljewels.com</p>
                  <p className="text-primary">+61 451565356</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Business Inquiries</h4>
                  <p className="text-muted-foreground mb-1">David Chen</p>
                  <p className="text-muted-foreground mb-1">Founder & CEO</p>
                  <p className="text-primary">business@artisanaljewels.com</p>
                  <p className="text-primary">+61 451565356</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}