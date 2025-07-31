import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Send, Eye, Save, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmailComposer = () => {
  const { toast } = useToast();
  const [emailTemplate, setEmailTemplate] = useState({
    subject: "Weekly Tutoring Session Reminder",
    body: `Hi {{studentName}},

This is your weekly reminder about our tutoring session:

📅 **When:** {{sessionTime}}
📍 **Where:** {{location}}
📚 **Subject:** {{subject}}

What to bring:
• Your textbook and notes
• Any questions from this week's material
• Calculator (if needed)

If you can't make it, please let me know at least 24 hours in advance so we can reschedule.

Looking forward to seeing you!

Best regards,
{{teacherName}}
Teaching Assistant`
  });

  const [scheduleSettings, setScheduleSettings] = useState({
    dayOfWeek: "Tuesday",
    time: "09:00",
    timezone: "EST"
  });

  const previewVariables = {
    studentName: "Alice Johnson",
    sessionTime: "Tuesday, 2:00 PM",
    location: "Library Study Room 203",
    subject: "Math 101",
    teacherName: "Your Name"
  };

  const renderPreview = (text: string) => {
    let preview = text;
    Object.entries(previewVariables).forEach(([key, value]) => {
      preview = preview.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return preview;
  };

  const handleSaveTemplate = () => {
    toast({
      title: "Template saved!",
      description: "Your email template has been saved successfully.",
    });
  };

  const handleSendTest = () => {
    toast({
      title: "Test email sent!",
      description: "A test email has been sent to your email address.",
    });
  };

  const templates = [
    {
      name: "Weekly Reminder",
      description: "Standard weekly tutoring reminder",
      active: true
    },
    {
      name: "Cancellation Notice",
      description: "For canceled sessions",
      active: false
    },
    {
      name: "Schedule Change",
      description: "For time/location changes",
      active: false
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Email Templates</h1>
          <p className="text-muted-foreground">Create and manage your tutoring reminder emails</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleSendTest}>
            <Send className="h-4 w-4 mr-2" />
            Send Test
          </Button>
          <Button size="sm" onClick={handleSaveTemplate}>
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Template Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Templates</CardTitle>
            <CardDescription>Choose an email template</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {templates.map((template, index) => (
              <div 
                key={index}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  template.active ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{template.name}</p>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </div>
                  {template.active && <Badge variant="default" className="text-xs">Active</Badge>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Email Composer */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Composer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="compose" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="compose">Compose</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>
              
              <TabsContent value="compose" className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject Line</Label>
                  <Input
                    id="subject"
                    value={emailTemplate.subject}
                    onChange={(e) => setEmailTemplate(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Enter email subject"
                  />
                </div>
                
                <div>
                  <Label htmlFor="body">Email Body</Label>
                  <Textarea
                    id="body"
                    value={emailTemplate.body}
                    onChange={(e) => setEmailTemplate(prev => ({ ...prev, body: e.target.value }))}
                    placeholder="Enter email content"
                    className="min-h-[400px]"
                  />
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Available Variables:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <code className="bg-background px-2 py-1 rounded">{"{{studentName}}"}</code>
                    <code className="bg-background px-2 py-1 rounded">{"{{sessionTime}}"}</code>
                    <code className="bg-background px-2 py-1 rounded">{"{{location}}"}</code>
                    <code className="bg-background px-2 py-1 rounded">{"{{subject}}"}</code>
                    <code className="bg-background px-2 py-1 rounded">{"{{teacherName}}"}</code>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="space-y-4">
                <div className="border rounded-lg p-6 bg-background">
                  <div className="border-b pb-4 mb-4">
                    <h3 className="font-semibold">Subject: {renderPreview(emailTemplate.subject)}</h3>
                    <p className="text-sm text-muted-foreground">To: {previewVariables.studentName} &lt;alice.j@university.edu&gt;</p>
                  </div>
                  <div className="whitespace-pre-wrap">
                    {renderPreview(emailTemplate.body)}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  This is how your email will appear to students
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dayOfWeek">Day of Week</Label>
                    <select 
                      id="dayOfWeek"
                      value={scheduleSettings.dayOfWeek}
                      onChange={(e) => setScheduleSettings(prev => ({ ...prev, dayOfWeek: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={scheduleSettings.time}
                      onChange={(e) => setScheduleSettings(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <select 
                      id="timezone"
                      value={scheduleSettings.timezone}
                      onChange={(e) => setScheduleSettings(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="EST">EST (Eastern)</option>
                      <option value="CST">CST (Central)</option>
                      <option value="MST">MST (Mountain)</option>
                      <option value="PST">PST (Pacific)</option>
                    </select>
                  </div>
                </div>
                
                <div className="bg-info/10 border border-info/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-info">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Next Scheduled Send:</span>
                  </div>
                  <p className="text-sm mt-1">
                    {scheduleSettings.dayOfWeek} at {scheduleSettings.time} {scheduleSettings.timezone}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailComposer;