import { useTaskContext } from "@/contexts/TaskContext";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = {
  completed: "#22C55E",
  inProgress: "#3B82F6",
  todo: "#EAB308",
};

export function TaskCharts() {
  const { tasks } = useTaskContext();

  // Calculate task completion by date
  const tasksByDate = tasks.reduce((acc, task) => {
    const date = new Date(task.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { completed: 0, inProgress: 0, todo: 0 };
    }
    acc[date][task.status === "completed" ? "completed" : task.status === "in-progress" ? "inProgress" : "todo"]++;
    return acc;
  }, {} as Record<string, { completed: number; inProgress: number; todo: number }>);

  const barChartData = Object.entries(tasksByDate).map(([date, stats]) => ({
    date,
    ...stats,
  }));

  // Calculate category distribution for pie chart
  const categoryData = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(categoryData).map(([name, value], index) => ({
    name,
    value,
    color: `hsl(${index * 60}, 70%, 50%)`,
  }));

  // Calculate completion rate for gauge
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const gaugeData = [
    { name: "completion", value: completionRate },
    { name: "remaining", value: 100 - completionRate },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Task Progress Bar Chart */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Task Progress Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill={COLORS.completed} name="Completed" />
              <Bar dataKey="inProgress" fill={COLORS.inProgress} name="In Progress" />
              <Bar dataKey="todo" fill={COLORS.todo} name="To Do" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Distribution Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Task Categories</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Completion Rate Gauge */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Completion Rate</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gaugeData}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
              >
                <Cell fill={COLORS.completed} />
                <Cell fill="#e5e5e5" />
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-2xl font-bold"
                fill="currentColor"
              >
                {`${Math.round(completionRate)}%`}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}