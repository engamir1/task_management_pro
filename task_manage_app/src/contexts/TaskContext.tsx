
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "@/components/ui/sonner";

// Define task types and interfaces
export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in-progress" | "completed";
export type TaskCategory = "work" | "personal" | "shopping" | "health" | "other";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  tags: string[];
  dueDate?: string;
  createdAt: string;
}

// Create sample data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the proposal for the new client project",
    status: "in-progress",
    priority: "high",
    category: "work",
    tags: ["proposal", "client"],
    dueDate: "2025-04-20",
    createdAt: "2025-04-12",
  },
  {
    id: "2",
    title: "Go grocery shopping",
    description: "Buy fruits, vegetables, and milk",
    status: "todo",
    priority: "medium",
    category: "shopping",
    tags: ["groceries", "shopping"],
    dueDate: "2025-04-17",
    createdAt: "2025-04-13",
  },
  {
    id: "3",
    title: "Morning workout",
    description: "30 minutes cardio and stretching",
    status: "completed",
    priority: "medium",
    category: "health",
    tags: ["exercise", "health"],
    createdAt: "2025-04-14",
  },
  {
    id: "4",
    title: "Read new book",
    description: "Start reading the new novel",
    status: "todo",
    priority: "low",
    category: "personal",
    tags: ["reading", "leisure"],
    createdAt: "2025-04-15",
  },
  {
    id: "5",
    title: "Schedule dentist appointment",
    description: "Call the dentist for a check-up",
    status: "todo",
    priority: "high",
    category: "health",
    tags: ["health", "appointment"],
    dueDate: "2025-04-25",
    createdAt: "2025-04-16",
  },
];

// Define the shape of our context
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  filterTasks: (filters: {
    status?: TaskStatus[];
    priority?: TaskPriority[];
    category?: TaskCategory[];
    search?: string;
  }) => Task[];
}

// Create the context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Create the provider component
export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast.success("Task added successfully!");
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
    toast.success("Task updated successfully!");
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully!");
  };

  const filterTasks = (filters: {
    status?: TaskStatus[];
    priority?: TaskPriority[];
    category?: TaskCategory[];
    search?: string;
  }) => {
    return tasks.filter((task) => {
      // Filter by status
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(task.status)) return false;
      }

      // Filter by priority
      if (filters.priority && filters.priority.length > 0) {
        if (!filters.priority.includes(task.priority)) return false;
      }

      // Filter by category
      if (filters.category && filters.category.length > 0) {
        if (!filters.category.includes(task.category)) return false;
      }

      // Filter by search term
      if (filters.search && filters.search.trim() !== "") {
        const searchTerm = filters.search.toLowerCase();
        return (
          task.title.toLowerCase().includes(searchTerm) ||
          task.description.toLowerCase().includes(searchTerm)
        );
      }

      return true;
    });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, filterTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Create a custom hook for using the task context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

// Helper to get task counts by status
export const useTaskStatistics = () => {
  const { tasks } = useTaskContext();
  
  return {
    total: tasks.length,
    todo: tasks.filter(task => task.status === "todo").length,
    inProgress: tasks.filter(task => task.status === "in-progress").length,
    completed: tasks.filter(task => task.status === "completed").length,
    byPriority: {
      high: tasks.filter(task => task.priority === "high").length,
      medium: tasks.filter(task => task.priority === "medium").length,
      low: tasks.filter(task => task.priority === "low").length
    },
    byCategory: {
      work: tasks.filter(task => task.category === "work").length,
      personal: tasks.filter(task => task.category === "personal").length,
      shopping: tasks.filter(task => task.category === "shopping").length,
      health: tasks.filter(task => task.category === "health").length,
      other: tasks.filter(task => task.category === "other").length
    }
  };
};
