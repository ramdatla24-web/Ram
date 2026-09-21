import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sprout, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "", location: "", farmSize: "" });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const success = register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        location: form.location,
        farmSize: Number(form.farmSize) || undefined,
      });
      if (success) {
        toast.success("Account created successfully!");
        navigate("/dashboard");
      } else {
        toast.error("An account with this email already exists");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-farm-600 text-white">
              <Sprout className="h-7 w-7" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Create Your AgriSmart Account</h1>
          <p className="text-muted-foreground">Start making smarter fertilizer decisions today</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Fill in your details to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Rajesh Kumar" value={form.name} onChange={(e) => update("name", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Punjab, India" value={form.location} onChange={(e) => update("location", e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmSize">Farm Size (hectares)</Label>
                <Input id="farmSize" type="number" placeholder="10" value={form.farmSize} onChange={(e) => update("farmSize", e.target.value)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Min 6 characters" value={form.password} onChange={(e) => update("password", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} required />
                </div>
              </div>
              <Button type="submit" className="w-full bg-farm-600 hover:bg-farm-700 text-white gap-2" disabled={loading}>
                {loading ? <span className="animate-pulse">Creating account...</span> : <><UserPlus className="h-4 w-4" /> Create Account</>}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="font-medium text-farm-600 hover:underline">Sign in</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
