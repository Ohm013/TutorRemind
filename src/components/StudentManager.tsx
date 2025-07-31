import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Plus, Mail, Trash2, UserPlus, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentManager = () => {
  const { toast } = useToast();
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [newStudent, setNewStudent] = useState({ name: "", email: "" });
  
  const [students] = useState([
    { id: 1, name: "Alice Johnson", email: "alice.j@university.edu", class: "Math 101" },
    { id: 2, name: "Bob Smith", email: "bob.smith@university.edu", class: "Math 101" },
    { id: 3, name: "Carol White", email: "carol.w@university.edu", class: "Physics 201" },
    { id: 4, name: "David Brown", email: "david.b@university.edu", class: "Math 101" },
    { id: 5, name: "Emma Davis", email: "emma.d@university.edu", class: "Chemistry 150" },
    { id: 6, name: "Frank Wilson", email: "frank.w@university.edu", class: "Physics 201" },
  ]);

  const classes = ["Math 101", "Physics 201", "Chemistry 150"];

  const handleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map(s => s.id));
    }
  };

  const handleStudentSelect = (studentId: number) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSendReminder = () => {
    if (selectedStudents.length === 0) {
      toast({
        title: "No students selected",
        description: "Please select at least one student to send reminders to.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Reminders sent!",
      description: `Weekly tutoring reminders sent to ${selectedStudents.length} students.`,
    });
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email) {
      toast({
        title: "Missing information",
        description: "Please enter both name and email for the student.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Student added!",
      description: `${newStudent.name} has been added to your student list.`,
    });
    setNewStudent({ name: "", email: "" });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground">Manage your student lists and send reminders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
          <Button 
            size="sm" 
            onClick={handleSendReminder}
            disabled={selectedStudents.length === 0}
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Reminder ({selectedStudents.length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Student Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Add New Student
            </CardTitle>
            <CardDescription>
              Add students to your tutoring classes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                placeholder="Enter student name"
                value={newStudent.name}
                onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="studentEmail">Email Address</Label>
              <Input
                id="studentEmail"
                type="email"
                placeholder="student@university.edu"
                value={newStudent.email}
                onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <Button onClick={handleAddStudent} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </CardContent>
        </Card>

        {/* Student List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Student List ({students.length})</CardTitle>
                <CardDescription>
                  Select students to send weekly tutoring reminders
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {selectedStudents.length === students.length ? "Deselect All" : "Select All"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {students.map((student, index) => (
                <div key={student.id}>
                  <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={() => handleStudentSelect(student.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{student.class}</Badge>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < students.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Students by Class</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {classes.map((className) => {
              const classStudents = students.filter(s => s.class === className);
              const selectedInClass = selectedStudents.filter(id => 
                students.find(s => s.id === id)?.class === className
              ).length;
              
              return (
                <div key={className} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">{className}</h3>
                  <p className="text-muted-foreground">
                    {classStudents.length} total students
                  </p>
                  <p className="text-sm text-primary">
                    {selectedInClass} selected for reminder
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManager;