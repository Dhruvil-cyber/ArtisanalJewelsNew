import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-400 mb-4 font-serif">
            Artisanal Jewels
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light">
            Luxury Jewelry Since 1985
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/login">
              <Button 
                className="bg-yellow-400 text-black px-8 py-4 text-lg font-semibold hover:bg-yellow-300 transition-all duration-300 rounded-lg min-w-[120px]"
                data-testid="button-welcome-login"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button 
                variant="outline"
                className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 text-lg font-semibold hover:bg-yellow-400 hover:text-black transition-all duration-300 rounded-lg min-w-[120px]"
                data-testid="button-welcome-register"
              >
                Register
              </Button>
            </Link>
          </div>
          
          <p className="text-gray-400 text-sm">
            Melbourne, Australia • +61 451565356
          </p>
        </div>
      </div>
    </div>
  );
}