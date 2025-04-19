
import { useState, useEffect } from "react";
import { useTaskContext, TaskCategory, TaskPriority, TaskStatus } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { TaskCard } from "@/components/TaskCard";
import { TaskFilters } from "@/components/TaskFilters";
import { TaskStats } from "@/components/TaskStats";
import TaskForm from "@/components/TaskForm";
import { useSearchParams } from "react-router-dom";

export function DashboardLayout() {
  const { tasks, addTask, filterTasks } = useTaskContext();
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<{
    status: TaskStatus[];
    priority: TaskPriority[];
    category: TaskCategory[];
    search: string;
  }>({
    status: [],
    priority: [],
    category: [],
    search: "",
  });

  useEffect(() => {
    const statusParam = searchParams.get("status");
    const categoryParam = searchParams.get("category");

    if (statusParam || categoryParam) {
      setFilters(prev => ({
        ...prev,
        status: statusParam ? [statusParam as TaskStatus] : [],
        category: categoryParam ? [categoryParam as TaskCategory] : []
      }));
    }
  }, [searchParams]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      priority: [],
      category: [],
      search: "",
    });
  };

  const filteredTasks = filterTasks(filters);

  return (
    <div className="space-y-8">
      <TaskStats />

      <div className="mb-6">
        <TaskFilters
          appliedFilters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="text-muted-foreground mb-4 text-lg">
              No tasks found
            </div>
            <p className="max-w-md text-sm text-muted-foreground mb-4">
              {tasks.length > 0
                ? "No tasks match your current filters. Try changing or clearing the filters."
                : "You don't have any tasks yet. Create your first task to get started."}
            </p>
            {tasks.length > 0 ? (
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            ) : (
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}