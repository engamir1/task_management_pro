
import { useState } from "react";
import { Task, useTaskContext } from "@/contexts/TaskContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, Edit, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import TaskForm from "./TaskForm";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { deleteTask, updateTask } = useTaskContext();
  const [isOpen, setIsOpen] = useState(false);

  const statusColors = {
    "todo": "bg-yellow-500",
    "in-progress": "bg-blue-500",
    "completed": "bg-green-500"
  };

  const priorityColors = {
    "low": "bg-gray-500",
    "medium": "bg-orange-500",
    "high": "bg-red-500"
  };

  const categoryColors = {
    "work": "bg-indigo-500",
    "personal": "bg-purple-500",
    "shopping": "bg-green-500",
    "health": "bg-blue-500",
    "other": "bg-gray-500"
  };

  const handleStatusChange = (newStatus: Task["status"]) => {
    updateTask(task.id, { status: newStatus });
  };

  return (
    <Card className="glass-card hover-scale animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium line-clamp-1">{task.title}</CardTitle>
          <div className="flex space-x-1">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <TaskForm 
                  task={task} 
                  onSubmit={(updatedTask) => {
                    updateTask(task.id, updatedTask);
                    setIsOpen(false);
                  }}
                />
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Task</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this task? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive" onClick={() => deleteTask(task.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          <Badge className={cn("text-white", statusColors[task.status])}>
            {task.status === "in-progress" ? "In Progress" : task.status === "todo" ? "To Do" : "Completed"}
          </Badge>
          <Badge className={cn("text-white", priorityColors[task.priority])}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
          <Badge className={cn("text-white", categoryColors[task.category])}>
            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
          {task.description}
        </p>
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {task.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className={cn("bg-opacity-20", priorityColors[task.priority])}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Created: {task.createdAt}</span>
        </div>
        {task.dueDate && (
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <CalendarIcon className="h-3 w-3" />
            <span>Due: {task.dueDate}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <RadioGroup
          value={task.status}
          onValueChange={handleStatusChange}
          className="flex gap-4 w-full"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="todo" id="todo" />
            <label htmlFor="todo" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">To Do</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="in-progress" id="in-progress" />
            <label htmlFor="in-progress" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">In Progress</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="completed" id="completed" />
            <label htmlFor="completed" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Completed</label>
          </div>
        </RadioGroup>
      </CardFooter>
    </Card>
  );
}
