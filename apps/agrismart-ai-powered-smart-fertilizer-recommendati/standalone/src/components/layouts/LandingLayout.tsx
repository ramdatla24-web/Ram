import { Link, useLocation } from "react-router-dom";
import { Sprout, Menu, X, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export function LandingLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Fertilizer Guide", href: "/fertilizers" },
    { label: "About", href: "/#about" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-farm-600 text-white">
              <Sprout className="h-5 w-5" />
            </div>
            <span className="text-farm-700 dark:text-farm-400">AgriSmart</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-farm-600",
                  location.pathname === item.href ? "text-farm-600" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="bg-farm-600 hover:bg-farm-700 text-white">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="gap-2">
                    <LogIn className="h-4 w-4" /> Login
                  </Button>
                </Link>
                <Link to="/recommendation">
                  <Button className="bg-farm-600 hover:bg-farm-700 text-white">Get Recommendation</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-background p-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-farm-600"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Link to="/login" className="flex-1">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/recommendation" className="flex-1">
                <Button className="w-full bg-farm-600 hover:bg-farm-700 text-white">Get Recommendation</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-farm-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-farm-600">
                  <Sprout className="h-4 w-4" />
                </div>
                <span className="font-bold text-lg">AgriSmart</span>
              </div>
              <p className="text-sm text-farm-200">AI-powered smart fertilizer recommendations for better farming.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <div className="space-y-2 text-sm text-farm-200">
                <p>Soil Analysis</p>
                <p>Crop Management</p>
                <p>Weather Integration</p>
                <p>AI Recommendations</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <div className="space-y-2 text-sm text-farm-200">
                <p>Fertilizer Guide</p>
                <p>Best Practices</p>
                <p>Research Papers</p>
                <p>Support</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-farm-200">
                <p>info@agrismart.com</p>
                <p>+91 90000 00000</p>
                <p>New Delhi, India</p>
              </div>
            </div>
          </div>
          <div className="border-t border-farm-800 mt-8 pt-8 text-center text-sm text-farm-300">
            © 2026 AgriSmart. All rights reserved. AI recommendations are decision-support tools — verify with local agricultural experts.
          </div>
        </div>
      </footer>
    </div>
  );
}
