import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Menu, Plus } from "lucide-react";
import { useState } from "react";
import TaskForm from "./TaskForm";
import { useTaskContext } from "@/contexts/TaskContext";

interface HeaderProps {
  title?: string;
  description?: string;
  showControls?: boolean;
}

export function Header({ title, description, showControls = false }: HeaderProps) {
  const { addTask } = useTaskContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-muted-foreground mt-1">
            {description}
          </p>
        </div>
      </div>
      {showControls && (
        <div className="flex items-center space-x-2">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new task.
                </DialogDescription>
              </DialogHeader>
              <TaskForm
                onSubmit={(data) => {
                  addTask({
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    priority: data.priority,
                    category: data.category,
                    dueDate: data.dueDate,
                    tags: data.tags
                  });
                  setIsOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </header>
  );
}