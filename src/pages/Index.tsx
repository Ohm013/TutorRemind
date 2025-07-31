import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import ScheduleManager from "@/components/ScheduleManager";
import StudentManager from "@/components/StudentManager";
import EmailComposer from "@/components/EmailComposer";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "students":
        return <StudentManager />;
      case "emails":
        return <EmailComposer />;
      case "schedule":
        return <ScheduleManager />;
      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Settings</h1>
            <p className="text-muted-foreground">Application settings will be available in the full version.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
