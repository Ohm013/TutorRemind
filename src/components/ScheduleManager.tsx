import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Clock, Plus, Settings, Trash2, Play, Pause } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const ScheduleManager = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [activeSchedules, setActiveSchedules] = useState([
    {
      id: 1,
      className: "Math 101",
      dayOfWeek: 1, // Monday = 1, Sunday = 0
      time: "14:00",
      isActive: true,
      students: 24,
      location: "Library Room 203",
      lastSent: "2024-01-15",
      nextSend: "2024-01-22"
    },
    {
      id: 2,
      className: "Physics 201",
      dayOfWeek: 2, // Tuesday
      time: "10:00",
      isActive: true,
      students: 18,
      location: "Science Building 401",
      lastSent: "2024-01-16",
      nextSend: "2024-01-23"
    },
    {
      id: 3,
      className: "Chemistry 150",
      dayOfWeek: 4, // Thursday
      time: "15:30",
      isActive: false,
      students: 31,
      location: "Chemistry Lab 2",
      lastSent: "2024-01-11",
      nextSend: "2024-01-25"
    }
  ]);

  const [newSchedule, setNewSchedule] = useState({
    className: "",
    dayOfWeek: 1,
    time: "09:00",
    location: ""
  });

  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const toggleSchedule = (id: number) => {
    setActiveSchedules(prev => 
      prev.map(schedule => 
        schedule.id === id 
          ? { ...schedule, isActive: !schedule.isActive }
          : schedule
      )
    );
    
    const schedule = activeSchedules.find(s => s.id === id);
    toast({
      title: `Schedule ${schedule?.isActive ? 'paused' : 'activated'}`,
      description: `${schedule?.className} reminders have been ${schedule?.isActive ? 'paused' : 'activated'}.`,
    });
  };

  const addNewSchedule = () => {
    if (!newSchedule.className || !newSchedule.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...activeSchedules.map(s => s.id)) + 1;
    setActiveSchedules(prev => [...prev, {
      id: newId,
      className: newSchedule.className,
      dayOfWeek: newSchedule.dayOfWeek,
      time: newSchedule.time,
      isActive: true,
      students: 0,
      location: newSchedule.location,
      lastSent: "",
      nextSend: format(addDays(new Date(), 7), "yyyy-MM-dd")
    }]);

    setNewSchedule({
      className: "",
      dayOfWeek: 1,
      time: "09:00",
      location: ""
    });

    toast({
      title: "Schedule created!",
      description: `Weekly reminders for ${newSchedule.className} have been set up.`,
    });
  };

  const deleteSchedule = (id: number) => {
    setActiveSchedules(prev => prev.filter(s => s.id !== id));
    toast({
      title: "Schedule deleted",
      description: "The reminder schedule has been removed.",
    });
  };

  // Generate upcoming reminders for calendar
  const getUpcomingReminders = () => {
    const reminders = [];
    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 0 });

    for (let week = 0; week < 4; week++) {
      activeSchedules.forEach(schedule => {
        if (schedule.isActive) {
          const reminderDate = addDays(startOfCurrentWeek, week * 7 + schedule.dayOfWeek);
          if (reminderDate >= today) {
            reminders.push({
              date: reminderDate,
              className: schedule.className,
              time: schedule.time,
              location: schedule.location
            });
          }
        }
      });
    }
    return reminders;
  };

  const upcomingReminders = getUpcomingReminders();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule Management</h1>
          <p className="text-muted-foreground">Manage weekly reminder schedules for your classes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Schedule
          </Button>
        </div>
      </div>

      <Tabs defaultValue="schedules" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedules">Active Schedules</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="new">Create Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="schedules" className="space-y-4">
          <div className="grid gap-4">
            {activeSchedules.map((schedule) => (
              <Card key={schedule.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{schedule.className}</h3>
                        <p className="text-muted-foreground">
                          Every {daysOfWeek[schedule.dayOfWeek]} at {format(new Date(`2000-01-01T${schedule.time}`), 'h:mm a')}
                        </p>
                        <p className="text-sm text-muted-foreground">{schedule.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{schedule.students} students</p>
                        <p className="text-xs text-muted-foreground">
                          Next: {format(new Date(schedule.nextSend), 'MMM d')}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={schedule.isActive ? "default" : "secondary"}>
                          {schedule.isActive ? "Active" : "Paused"}
                        </Badge>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleSchedule(schedule.id)}
                          >
                            {schedule.isActive ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteSchedule(schedule.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Upcoming Reminders</CardTitle>
                <CardDescription>Calendar view of scheduled email reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className={cn("rounded-md border pointer-events-auto")}
                  modifiers={{
                    reminder: upcomingReminders.map(r => r.date)
                  }}
                  modifiersStyles={{
                    reminder: { 
                      backgroundColor: 'hsl(var(--primary))', 
                      color: 'hsl(var(--primary-foreground))',
                      fontWeight: 'bold'
                    }
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next 7 Days</CardTitle>
                <CardDescription>Upcoming reminder schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingReminders.slice(0, 7).map((reminder, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{reminder.className}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(reminder.date, 'MMM d')} at {format(new Date(`2000-01-01T${reminder.time}`), 'h:mm a')}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {format(reminder.date, 'EEE')}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Create New Schedule</CardTitle>
              <CardDescription>Set up weekly reminders for a new class</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="className">Class Name</Label>
                  <Input
                    id="className"
                    placeholder="e.g., Math 101"
                    value={newSchedule.className}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, className: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Library Room 203"
                    value={newSchedule.location}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dayOfWeek">Day of Week</Label>
                  <select
                    id="dayOfWeek"
                    value={newSchedule.dayOfWeek}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, dayOfWeek: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  >
                    {daysOfWeek.map((day, index) => (
                      <option key={index} value={index}>{day}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="time">Reminder Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newSchedule.time}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={addNewSchedule}>Create Schedule</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScheduleManager;