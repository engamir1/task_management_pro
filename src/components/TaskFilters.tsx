
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal, X } from "lucide-react";
import { TaskCategory, TaskPriority, TaskStatus } from "@/contexts/TaskContext";

interface TaskFiltersProps {
  appliedFilters: {
    status: TaskStatus[];
    priority: TaskPriority[];
    category: TaskCategory[];
    search: string;
  };
  onFilterChange: (filters: {
    status?: TaskStatus[];
    priority?: TaskPriority[];
    category?: TaskCategory[];
    search?: string;
  }) => void;
  onClearFilters: () => void;
}

export function TaskFilters({
  appliedFilters,
  onFilterChange,
  onClearFilters,
}: TaskFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState({ ...appliedFilters });

  const handleStatusChange = (status: TaskStatus) => {
    const newStatuses = localFilters.status.includes(status)
      ? localFilters.status.filter((s) => s !== status)
      : [...localFilters.status, status];
    
    setLocalFilters({ ...localFilters, status: newStatuses });
  };

  const handlePriorityChange = (priority: TaskPriority) => {
    const newPriorities = localFilters.priority.includes(priority)
      ? localFilters.priority.filter((p) => p !== priority)
      : [...localFilters.priority, priority];
    
    setLocalFilters({ ...localFilters, priority: newPriorities });
  };

  const handleCategoryChange = (category: TaskCategory) => {
    const newCategories = localFilters.category.includes(category)
      ? localFilters.category.filter((c) => c !== category)
      : [...localFilters.category, category];
    
    setLocalFilters({ ...localFilters, category: newCategories });
  };

  const handleSearchChange = (search: string) => {
    setLocalFilters({ ...localFilters, search });
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      status: [],
      priority: [],
      category: [],
      search: "",
    };
    setLocalFilters(emptyFilters);
    onClearFilters();
    setIsOpen(false);
  };

  // Calculate the total number of active filters
  const activeFilterCount = [
    ...appliedFilters.status,
    ...appliedFilters.priority,
    ...appliedFilters.category,
  ].length + (appliedFilters.search ? 1 : 0);

  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search tasks..."
          value={appliedFilters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="max-w-md"
        />
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter Tasks</SheetTitle>
            <SheetDescription>
              Apply filters to narrow down your tasks
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label className="text-base">Status</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="status-todo"
                    checked={localFilters.status.includes("todo")}
                    onCheckedChange={() => handleStatusChange("todo")}
                  />
                  <label
                    htmlFor="status-todo"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    To Do
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="status-in-progress"
                    checked={localFilters.status.includes("in-progress")}
                    onCheckedChange={() => handleStatusChange("in-progress")}
                  />
                  <label
                    htmlFor="status-in-progress"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    In Progress
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="status-completed"
                    checked={localFilters.status.includes("completed")}
                    onCheckedChange={() => handleStatusChange("completed")}
                  />
                  <label
                    htmlFor="status-completed"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Completed
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Priority</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="priority-low"
                    checked={localFilters.priority.includes("low")}
                    onCheckedChange={() => handlePriorityChange("low")}
                  />
                  <label
                    htmlFor="priority-low"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Low
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="priority-medium"
                    checked={localFilters.priority.includes("medium")}
                    onCheckedChange={() => handlePriorityChange("medium")}
                  />
                  <label
                    htmlFor="priority-medium"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Medium
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="priority-high"
                    checked={localFilters.priority.includes("high")}
                    onCheckedChange={() => handlePriorityChange("high")}
                  />
                  <label
                    htmlFor="priority-high"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    High
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Category</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="category-work"
                    checked={localFilters.category.includes("work")}
                    onCheckedChange={() => handleCategoryChange("work")}
                  />
                  <label
                    htmlFor="category-work"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Work
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="category-personal"
                    checked={localFilters.category.includes("personal")}
                    onCheckedChange={() => handleCategoryChange("personal")}
                  />
                  <label
                    htmlFor="category-personal"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Personal
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="category-shopping"
                    checked={localFilters.category.includes("shopping")}
                    onCheckedChange={() => handleCategoryChange("shopping")}
                  />
                  <label
                    htmlFor="category-shopping"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Shopping
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="category-health"
                    checked={localFilters.category.includes("health")}
                    onCheckedChange={() => handleCategoryChange("health")}
                  />
                  <label
                    htmlFor="category-health"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Health
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="category-other"
                    checked={localFilters.category.includes("other")}
                    onCheckedChange={() => handleCategoryChange("other")}
                  />
                  <label
                    htmlFor="category-other"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Other
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <Button variant="outline" onClick={handleClearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
