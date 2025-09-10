import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Eye, EyeOff } from "lucide-react";

export default function Account() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      window.location.href = "/";
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: { firstName: string; lastName: string; email: string; password: string }) => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "Welcome to Artisanal Jewels!",
        description: "Your account has been created successfully.",
      });
      window.location.href = "/";
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate(loginData);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerData.firstName || !registerData.lastName || !registerData.email || !registerData.password) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }

    if (registerData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    const { confirmPassword, ...submitData } = registerData;
    registerMutation.mutate(submitData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setLocation("/")}
              className="font-serif text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
              data-testid="link-home"
            >
              Artisanal Jewels
            </button>
            <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
              <span>ENGAGEMENT RINGS</span>
              <span>DIAMOND RINGS</span>
              <span>WEDDING RINGS</span>
              <span>JEWELLERY</span>
              <span>GIFTS</span>
              <span>SALE</span>
              <span>READY TO WEAR</span>
              <span>EDUCATION</span>
              <span>OUR STORES</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-2">My account</h1>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-0 bg-white shadow-sm">
          {/* Sign In Section */}
          <div className="p-12 lg:p-16">
            <div className="max-w-md">
              <h2 className="text-3xl font-light text-gray-900 mb-2">Sign in</h2>
              <p className="text-gray-600 mb-8">Enter your details to sign into your account</p>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="w-full border-0 border-b border-gray-300 rounded-none pb-2 focus:border-gray-900 focus:ring-0 bg-transparent text-lg placeholder:text-gray-400"
                    data-testid="input-login-email"
                    required
                  />
                </div>

                <div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full border-0 border-b border-gray-300 rounded-none pb-2 focus:border-gray-900 focus:ring-0 bg-transparent text-lg placeholder:text-gray-400"
                    data-testid="input-login-password"
                    required
                  />
                </div>

                <div className="text-left">
                  <button
                    type="button"
                    className="text-sm text-gray-600 hover:text-gray-900 underline"
                    data-testid="link-forgot-password"
                  >
                    Forgot your password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-2 text-sm font-medium"
                  disabled={loginMutation.isPending}
                  data-testid="button-sign-in"
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </div>
          </div>

          {/* Create Account Section */}
          <div className="bg-gray-50 p-12 lg:p-16">
            <div className="max-w-md">
              <h2 className="text-3xl font-light text-gray-900 mb-2">Create an account</h2>
              <p className="text-gray-600 mb-6">Join the Artisanal Jewels community to:</p>

              {/* Benefits List */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Save items to your wishlist</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Easy order tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Faster checkout</span>
                </div>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={registerData.firstName}
                    onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                    className="w-full border-0 border-b border-gray-300 rounded-none pb-2 focus:border-gray-900 focus:ring-0 bg-transparent text-lg placeholder:text-gray-400"
                    data-testid="input-register-firstname"
                    required
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    placeholder="Surname"
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                    className="w-full border-0 border-b border-gray-300 rounded-none pb-2 focus:border-gray-900 focus:ring-0 bg-transparent text-lg placeholder:text-gray-400"
                    data-testid="input-register-lastname"
                    required
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="w-full border-0 border-b border-gray-300 rounded-none pb-2 focus:border-gray-900 focus:ring-0 bg-transparent text-lg placeholder:text-gray-400"
                    data-testid="input-register-email"
                    required
                  />
                </div>

                <div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="w-full border-0 border-b border-gray-300 rounded-none pb-2 focus:border-gray-900 focus:ring-0 bg-transparent text-lg placeholder:text-gray-400"
                    data-testid="input-register-password"
                    required
                  />
                </div>

                <div>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    className="w-full border-0 border-b border-gray-300 rounded-none pb-2 focus:border-gray-900 focus:ring-0 bg-transparent text-lg placeholder:text-gray-400"
                    data-testid="input-register-confirm-password"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-2 text-sm font-medium"
                  disabled={registerMutation.isPending}
                  data-testid="button-create-account"
                >
                  {registerMutation.isPending ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}