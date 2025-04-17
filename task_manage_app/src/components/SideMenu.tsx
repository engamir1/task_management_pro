import { Link, useSearchParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTaskContext, TaskCategory, TaskStatus } from "@/contexts/TaskContext";
import { LayoutDashboard, CheckCircle2, Clock, AlertCircle, Tag, Settings, User, BarChart, Users } from "lucide-react";
import { useSideMenu } from "@/contexts/SideMenuContext";
import { cn } from "@/lib/utils";

export function SideMenu() {
  const { tasks } = useTaskContext();
  const [searchParams] = useSearchParams();

  const menuSections = [
    {
      title: "Navigation",
      items: [
        { icon: LayoutDashboard, label: "Dashboard", href: "/", iconColor: "text-primary" },
        { icon: BarChart, label: "Statistics", href: "/statistics", iconColor: "text-blue-500" },
        { icon: Users, label: "Teams", href: "/teams", iconColor: "text-green-500" },
        { icon: User, label: "Profile", href: "/profile", iconColor: "text-purple-500" },
        { icon: Settings, label: "Settings", href: "/settings", iconColor: "text-gray-500" },
      ],
    },
    {
      title: "Task Status",
      items: [
        {
          icon: CheckCircle2,
          label: "Completed",
          count: tasks.filter((t) => t.status === "completed").length,
          href: "/?status=completed",
          iconColor: "text-green-500"
        },
        {
          icon: Clock,
          label: "In Progress",
          count: tasks.filter((t) => t.status === "in-progress").length,
          href: "/?status=in-progress",
          iconColor: "text-blue-500"
        },
        {
          icon: AlertCircle,
          label: "Todo",
          count: tasks.filter((t) => t.status === "todo").length,
          href: "/?status=todo",
          iconColor: "text-yellow-500"
        },
      ],
    },
    {
      title: "Categories",
      items: ["work", "personal", "shopping", "health", "other"].map((category) => ({
        icon: Tag,
        label: category,
        count: tasks.filter((t) => t.category === category).length,
        href: `/?category=${category}`,
        iconColor: "text-indigo-500"
      })),
    },
  ];

  const { isOpen } = useSideMenu();

  return (
    <div
      className={cn(
        "h-screen border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
        isOpen ? "w-64" : "w-0 opacity-0 overflow-hidden"
      )}
    >
      <ScrollArea className="h-full py-6">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Tasky</h2>
          {menuSections.map((section) => (
            <div key={section.title} className="px-3 py-2">
              <h3 className="mb-2 px-1 text-sm font-medium text-muted-foreground">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start transition-all duration-200 hover:scale-[1.02]",
                        item.href && searchParams.get("status") === item.href.split("=")[1] && "bg-primary/10 text-primary font-bold",
                        item.href && searchParams.get("category") === item.href.split("=")[1] && "bg-primary/10 text-primary font-bold",
                        item.href && useLocation().pathname === item.href && "bg-primary/10 text-primary font-bold"
                      )}
                      asChild={Boolean(item.href)}
                    >
                      {item.href ? (
                        <Link to={item.href} className="flex items-center">
                          <Icon className={cn("mr-2 h-4 w-4", item.iconColor)} />
                          <span>{item.label}</span>
                        </Link>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <Icon className="mr-2 h-4 w-4" />
                            <span>{item.label}</span>
                          </div>
                          {item.count !== undefined && (
                            <span className="ml-auto text-muted-foreground text-sm">
                              {item.count}
                            </span>
                          )}
                        </div>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}