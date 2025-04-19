
import { useTaskStatistics } from "@/contexts/TaskContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CheckCircle, Circle, Clock, ListChecks } from "lucide-react";

export function TaskStats() {
  const stats = useTaskStatistics();
  
  // Data for the pie chart
  const statusData = [
    { name: "To Do", value: stats.todo, color: "#EAB308" },
    { name: "In Progress", value: stats.inProgress, color: "#3B82F6" },
    { name: "Completed", value: stats.completed, color: "#22C55E" },
  ];
  
  // Filter out zero values
  const filteredStatusData = statusData.filter(item => item.value > 0);
  
  // Calculate completion percentage
  const completionPercentage = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <ListChecks className="h-4 w-4 mr-2 text-primary" />
            Total Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.todo} pending, {stats.inProgress} in progress
          </p>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Circle className="h-4 w-4 mr-2 text-yellow-500" />
            To Do
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.todo}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.byPriority.high} high priority
          </p>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Clock className="h-4 w-4 mr-2 text-blue-500" />
            In Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.inProgress}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Focus on these tasks
          </p>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completed}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Well done!
          </p>
        </CardContent>
      </Card>
      
      {/* Additional stats for larger screens */}
      <Card className="glass-card col-span-1 md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <div className="flex justify-between mb-1 text-xs">
              <span>Overall completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card col-span-1 md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Task Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[180px]">
          {filteredStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={filteredStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {filteredStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
              No task data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
