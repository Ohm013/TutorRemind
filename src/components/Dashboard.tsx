import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Mail, Plus, Settings } from "lucide-react";

const Dashboard = () => {
  const [activeClasses] = useState([
    {
      id: 1,
      name: "Math 101",
      students: 24,
      nextReminder: "Tuesday, 2:00 PM",
      status: "active"
    },
    {
      id: 2,
      name: "Physics 201",
      students: 18,
      nextReminder: "Wednesday, 10:00 AM",
      status: "active"
    },
    {
      id: 3,
      name: "Chemistry 150",
      students: 31,
      nextReminder: "Thursday, 3:30 PM",
      status: "paused"
    }
  ]);

  const stats = [
    {
      title: "Total Students",
      value: "73",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Active Classes",
      value: "3",
      icon: Calendar,
      color: "text-accent"
    },
    {
      title: "Emails This Week",
      value: "146",
      icon: Mail,
      color: "text-info"
    },
    {
      title: "Next Reminder",
      value: "2h 15m",
      icon: Clock,
      color: "text-warning"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tutoring Reminders</h1>
          <p className="text-muted-foreground">Manage your weekly student reminders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Class
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Classes Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Your Classes</CardTitle>
          <CardDescription>
            Manage tutoring sessions and weekly reminders for each class
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeClasses.map((classItem) => (
              <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{classItem.name}</h3>
                    <p className="text-sm text-muted-foreground">{classItem.students} students</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">Next reminder</p>
                    <p className="text-sm text-muted-foreground">{classItem.nextReminder}</p>
                  </div>
                  <Badge variant={classItem.status === "active" ? "default" : "secondary"}>
                    {classItem.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Manage Students</h3>
            <p className="text-sm text-muted-foreground">Add or remove students from classes</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Email Templates</h3>
            <p className="text-sm text-muted-foreground">Customize your reminder messages</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-info mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Schedule Settings</h3>
            <p className="text-sm text-muted-foreground">Configure weekly reminder times</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;