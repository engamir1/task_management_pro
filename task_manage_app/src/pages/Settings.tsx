import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Header } from "@/components/Header";

export default function Settings() {
  return (
    <>
      <Header
        title="Settings"
        description="Configure your task management preferences"
      />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you want to receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about your tasks via email
                </p>
              </div>
              <Switch id="email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications about task updates
                </p>
              </div>
              <Switch id="push-notifications" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Preferences</CardTitle>
            <CardDescription>
              Customize your task management experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="due-date-reminders">Due Date Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get reminders before task due dates
                </p>
              </div>
              <Switch id="due-date-reminders" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-archive">Auto-archive Completed Tasks</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically archive tasks when completed
                </p>
              </div>
              <Switch id="auto-archive" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}