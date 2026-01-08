"use client";
import { ReactNode, useState } from "react";
import {
  Menu,
  X,
  Home,
  Settings,
  User,
  ListOrdered,
  Car,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  Users,
  ShoppingCart,
  Gauge,
  Tag,
  LogOut,
  ListCheck,
} from "lucide-react";
import { AdminUser } from "@/models";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Sidebar({
  user,
  children,
}: {
  user: AdminUser | null;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // if (!user) router.push("/login");
  if (!user) return children;
  const [collapsed, setCollapsed] = useState(false);
  const onToggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const menuItems = [
    { id: "", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "products", label: "Cars", icon: Car },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "engines", label: "Engines", icon: Gauge },
    { id: "brands", label: "Brands", icon: Tag },
    { id: "features", label: "Features", icon: ListCheck },
  ];
  const pathname = usePathname();

  return (
    <div className="flex h-screen ">
      <div
        className={cn(
          "fixed left-0 top-0 h-screen border-r border-sidebar-border/10 flex flex-col transition-all duration-300",
          "bg-gradient-to-b from-muted to-primary-foreground",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-sidebar-border/10">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Car className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">CarRental</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto shadow-lg shadow-primary/20">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
        </div>
        <div className="px-3 py-2 border-b border-sidebar-border/10">
          <button
            onClick={onToggleCollapse}
            className="w-full justify-center text-center flex py-2 hover:text-background text-muted-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === `/${item.id}`;

            return (
              <Link
                href={`/${item.id}`}
                key={item.id}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                  collapsed && "justify-center"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border/10">
          <Link
            href={"/api/logout"}
            className={cn(
              "w-full justify-start flex items-center py-2 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </Link>
        </div>
      </div>

      {/* Top bar for mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-900 text-white flex items-center justify-between p-4 z-50">
        <h1 className="text-lg font-medium">My App</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Main content */}
      <main
        className={cn(
          !collapsed ? "w-full md:pl-64" : "pl-20 w-full",
          "transition-all duration-300"
        )}
      >
        {children}
      </main>
    </div>
  );
}
