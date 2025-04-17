import { useTaskContext } from "@/contexts/TaskContext";
import { Card } from "@/components/ui/card";
import { TaskCharts } from "@/components/charts/ChartComponents";

export default function Statistics() {
  const { tasks } = useTaskContext();

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;
  const todoTasks = tasks.filter((t) => t.status === "todo").length;

  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks * 100).toFixed(1) : 0;

  // Calculate category distribution
  const categoryDistribution = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold">Task Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <h3 className="text-lg font-medium">Total Tasks</h3>
          <p className="text-3xl font-bold mt-2">{totalTasks}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium">Completion Rate</h3>
          <p className="text-3xl font-bold mt-2">{completionRate}%</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium">In Progress</h3>
          <p className="text-3xl font-bold mt-2">{inProgressTasks}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium">Todo</h3>
          <p className="text-3xl font-bold mt-2">{todoTasks}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-xl font-medium mb-4">Task Status Distribution</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Completed</span>
              <span className="font-medium">{completedTasks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>In Progress</span>
              <span className="font-medium">{inProgressTasks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Todo</span>
              <span className="font-medium">{todoTasks}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-medium mb-4">Category Distribution</h3>
          <div className="space-y-4">
            {Object.entries(categoryDistribution).map(([category, count]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="capitalize">{category}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <TaskCharts />
    </div>
  );
}