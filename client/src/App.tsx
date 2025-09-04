import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Simple test component
function TestLogin() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">Artisanal Jewels</h1>
        <h2 className="text-2xl mb-8">Login Page</h2>
        <div className="bg-white/10 p-8 rounded-lg">
          <p className="mb-4">Login form will be here</p>
          <button className="bg-yellow-400 text-black px-6 py-2 rounded">Test Button</button>
        </div>
      </div>
    </div>
  );
}

function TestHome() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">Artisanal Jewels</h1>
        <h2 className="text-2xl mb-8">Home Page</h2>
        <p>React app is working!</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={TestHome} />
      <Route path="/login" component={TestLogin} />
      <Route>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">404</h1>
            <p>Page not found</p>
            <a href="/" className="text-yellow-400 underline">Go home</a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;