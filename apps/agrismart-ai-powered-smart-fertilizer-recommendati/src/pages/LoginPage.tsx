import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sprout, LogIn, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
      setLoading(false);
    }, 500);
  };

  const handleDemoLogin = () => {
    demoLogin();
    toast.success("Logged in as demo farmer");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-farm-600 text-white">
              <Sprout className="h-7 w-7" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Welcome back to AgriSmart</h1>
          <p className="text-muted-foreground">Sign in to access your farm dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="rajesh@demo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="demo123"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-farm-600 hover:bg-farm-700 text-white gap-2" disabled={loading}>
                {loading ? <span className="animate-pulse">Signing in...</span> : <><LogIn className="h-4 w-4" /> Sign In</>}
              </Button>
            </form>

            <div className="mt-4 space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Demo Access</span></div>
              </div>
              <Button variant="outline" className="w-full gap-2" onClick={handleDemoLogin}>
                <Sprout className="h-4 w-4" /> Continue as Demo Farmer
              </Button>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/register" className="font-medium text-farm-600 hover:underline">Sign up</Link>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
              <p className="font-medium mb-1">Demo credentials:</p>
              <p>Email: rajesh@demo.com | Password: demo123</p>
              <p>Admin: admin@agrismart.com | Password: admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
