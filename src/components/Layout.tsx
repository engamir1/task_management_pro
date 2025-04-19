import { ReactNode } from "react";
import { AppBar } from "@/components/AppBar";
import { SideMenu } from "@/components/SideMenu";
import { SideMenuProvider } from "@/contexts/SideMenuContext";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SideMenuProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <AppBar />
        <div className="flex flex-1 overflow-hidden">
          <SideMenu />
          <div className="flex-1 overflow-auto">
            <div className="container py-8 px-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </SideMenuProvider>
  );
}