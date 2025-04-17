
import { DashboardLayout } from "@/components/DashboardLayout";
import { Header } from "@/components/Header";

const Index = () => {
  return (
    <>
      <Header
        title="Task Dashboard"
        description="View and manage all your tasks in one place"
        showControls={true}
      />
      <DashboardLayout />
    </>
  );
};

export default Index;
