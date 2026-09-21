import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  Sprout, LayoutDashboard, SproutIcon as PlantIcon, FlaskConical, Leaf,
  CloudSun, BookOpen, History, BarChart3, Settings, LogOut, Menu, X,
  ChevronRight, Shield
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const farmerNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Farms", href: "/farms", icon: Sprout },
  { label: "Soil Analysis", href: "/soil-analysis", icon: FlaskConical },
  { label: "My Crops", href: "/crops", icon: PlantIcon },
  { label: "Fertilizer Recommendation", href: "/recommendation", icon: Leaf },
  { label: "Weather", href: "/weather", icon: CloudSun },
  { label: "Fertilizer Guide", href: "/fertilizers", icon: BookOpen },
  { label: "Recommendation History", href: "/history", icon: History },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

const adminNavItems = [
  { label: "Admin Dashboard", href: "/admin/dashboard", icon: Shield },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Farms", href: "/farms", icon: Sprout },
  { label: "Soil Analysis", href: "/soil-analysis", icon: FlaskConical },
  { label: "My Crops", href: "/crops", icon: PlantIcon },
  { label: "Fertilizer Recommendation", href: "/recommendation", icon: Leaf },
  { label: "Weather", href: "/weather", icon: CloudSun },
  { label: "Fertilizer Guide", href: "/fertilizers", icon: BookOpen },
  { label: "Recommendation History", href: "/history", icon: History },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = user?.role === "admin" ? adminNavItems : farmerNavItems;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const Sidebar = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-farm-600 text-white">
          <Sprout className="h-5 w-5" />
        </div>
        <span className="font-bold text-lg text-farm-700 dark:text-farm-400">AgriSmart</span>
      </div>

      {/* User Info */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-farm-100 text-farm-700 font-semibold">
            {user?.name?.charAt(0) || "F"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.role === "admin" ? "Administrator" : "Farmer"}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <ScrollArea className="flex-1 py-2">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-farm-50 text-farm-700 dark:bg-farm-900/30 dark:text-farm-400"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4.5 w-4.5" />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight className="h-3.5 w-3.5 text-farm-600" />}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Logout */}
      <div className="p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="h-4.5 w-4.5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col border-r bg-card">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-72 bg-card shadow-xl">
            <button
              className="absolute right-3 top-4 p-1 rounded-md hover:bg-muted"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6">
          <button className="lg:hidden p-2 rounded-md hover:bg-muted" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
