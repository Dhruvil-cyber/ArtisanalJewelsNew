import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileMenu from "@/components/layout/mobile-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Heart, Award, MapPin, Clock, Briefcase, GraduationCap, Star } from "lucide-react";

export default function Careers() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openPositions = [
    {
      title: "Senior Jewelry Designer",
      department: "Design",
      type: "Full-time",
      location: "Melbourne, VIC",
      experience: "5+ years",
      description: "Lead our design team in creating innovative jewelry pieces that blend traditional craftsmanship with contemporary aesthetics.",
      requirements: [
        "Bachelor's degree in Jewelry Design or related field",
        "5+ years experience in fine jewelry design",
        "Proficiency in CAD software (Rhino, Matrix)",
        "Strong understanding of gemstones and precious metals",
        "Portfolio demonstrating creative and technical skills"
      ]
    },
    {
      title: "Master Goldsmith",
      department: "Production",
      type: "Full-time", 
      location: "Melbourne, VIC",
      experience: "10+ years",
      description: "Join our workshop team to create exceptional handcrafted jewelry using traditional techniques combined with modern precision.",
      requirements: [
        "Certified goldsmith with 10+ years experience",
        "Expertise in setting, sizing, and repair",
        "Knowledge of traditional hand-forging techniques",
        "Experience with precision tools and equipment",
        "Commitment to quality and attention to detail"
      ]
    },
    {
      title: "Customer Experience Specialist",
      department: "Sales",
      type: "Full-time",
      location: "Melbourne, VIC",
      experience: "2+ years",
      description: "Provide exceptional service to our clients, guiding them through the jewelry selection and custom design process.",
      requirements: [
        "2+ years in luxury retail or customer service",
        "Excellent communication and interpersonal skills",
        "Knowledge of fine jewelry and gemstones preferred",
        "Ability to build relationships and trust with clients",
        "Fluent in English; additional languages a plus"
      ]
    },
    {
      title: "Digital Marketing Manager",
      department: "Marketing",
      type: "Full-time",
      location: "Melbourne, VIC / Remote",
      experience: "3+ years",
      description: "Drive our digital presence and online growth through strategic marketing campaigns and brand storytelling.",
      requirements: [
        "Bachelor's degree in Marketing or related field",
        "3+ years digital marketing experience",
        "Experience with luxury brands preferred",
        "Proficiency in social media, SEO, and analytics",
        "Creative thinking with analytical mindset"
      ]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, wellness programs, and mental health support."
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description: "Ongoing training, skill development programs, and industry conference attendance."
    },
    {
      icon: Award,
      title: "Recognition & Growth",
      description: "Performance-based bonuses, career advancement opportunities, and achievement recognition."
    },
    {
      icon: Clock,
      title: "Work-Life Balance",
      description: "Flexible working arrangements, generous leave policies, and family-friendly workplace."
    },
    {
      icon: Users,
      title: "Team Culture",
      description: "Collaborative environment, team building events, and inclusive workplace culture."
    },
    {
      icon: Star,
      title: "Perks & Benefits",
      description: "Employee discounts, retirement planning, and special milestone recognition."
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
      <section className="relative py-20 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <Users className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                Join Our <span className="gold-accent">Team</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Be part of a passionate team dedicated to creating exceptional jewelry 
                and providing unparalleled customer experiences.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                <Heart className="w-4 h-4 mr-1" />
                Passionate Team
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                <Award className="w-4 h-4 mr-1" />
                Growth Opportunities
              </Badge>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                <Star className="w-4 h-4 mr-1" />
                Great Benefits
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Artisanal Jewels?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join a company where craftsmanship meets innovation, and where your passion 
              for excellence is valued and nurtured.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                Our Culture
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We believe that exceptional jewelry comes from exceptional people. Our team 
                is built on a foundation of mutual respect, continuous learning, and shared 
                passion for creating beautiful, meaningful pieces.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Passion-Driven</h4>
                    <p className="text-muted-foreground text-sm">Work with people who genuinely love what they do.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Collaborative</h4>
                    <p className="text-muted-foreground text-sm">Everyone's voice matters in our creative process.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Excellence-Focused</h4>
                    <p className="text-muted-foreground text-sm">Commitment to the highest standards in everything we do.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-24 h-24 text-primary/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Our Team</p>
                  <p className="text-sm text-muted-foreground mt-2">Passionate Artisans</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Benefits & Perks
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We invest in our team's success and well-being with comprehensive benefits and growth opportunities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-xl mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Open Positions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore current opportunities to join our talented team.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="mb-4 lg:mb-0">
                      <h3 className="font-semibold text-2xl text-foreground mb-2">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {position.department}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {position.type}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {position.location}
                        </div>
                        <Badge variant="outline">{position.experience}</Badge>
                      </div>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" data-testid={`button-apply-${index}`}>
                      Apply Now
                    </Button>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {position.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Requirements:</h4>
                    <ul className="space-y-2">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Application Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our straightforward hiring process is designed to get to know you and your skills.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold text-lg">1</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Apply</h3>
                  <p className="text-muted-foreground text-sm">
                    Submit your resume and cover letter through our online portal.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-600 font-bold text-lg">2</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Screen</h3>
                  <p className="text-muted-foreground text-sm">
                    Initial phone or video call to discuss your experience and interests.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-amber-600 font-bold text-lg">3</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Interview</h3>
                  <p className="text-muted-foreground text-sm">
                    In-person or virtual interview with the hiring manager and team.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 font-bold text-lg">4</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Offer</h3>
                  <p className="text-muted-foreground text-sm">
                    Reference checks, offer discussion, and welcome to the team!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Don't See Your Role?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for excellence. 
            Send us your resume and let us know how you'd like to contribute.
          </p>
          
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h4 className="font-semibold text-xl mb-4">Human Resources</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: careers@artisanaljewels.com</p>
                <p>Phone: +61 451565356</p>
                <p>Address: Melbourne, Australia</p>
              </div>
              <Button className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="button-contact-hr">
                Contact HR Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}