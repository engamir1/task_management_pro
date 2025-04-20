
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TaskProvider } from "./contexts/TaskContext";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Statistics from "@/pages/Statistics";
import { Teams } from "@/pages/Teams";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BrowserRouter>
          <TaskProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/"
                  element={
                    // <ProtectedRoute>
                      <Layout>
                        <Index />
                      </Layout>
                    // </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                      <Layout>
                        <Profile />
                      </Layout>
                  }
                />
                <Route
                  path="/settings"
                  element={
                      <Layout>
                        <Settings />
                      </Layout>
                  }
                />
                <Route
                  path="/statistics"
                  element={
                      <Layout>
                        <Statistics />
                      </Layout>
                  }
                />
                <Route
                  path="/teams"
                  element={
                      <Layout>
                        <Teams />
                      </Layout>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </TaskProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
