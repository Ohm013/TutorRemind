import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Users, Mail, Calendar, Settings } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "students", label: "Students", icon: Users },
    { id: "emails", label: "Email Templates", icon: Mail },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="bg-card border-r border-border h-screen w-64 p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-foreground">TutorRemind</h2>
        <p className="text-sm text-muted-foreground">Teaching Assistant Tools</p>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-8">
        <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-lg text-white">
          <h3 className="font-semibold text-sm">Prototype Mode</h3>
          <p className="text-xs opacity-90">Connect Supabase for full functionality</p>
        </div>
      </div>
    </div>
  );
};

export default Navigation;