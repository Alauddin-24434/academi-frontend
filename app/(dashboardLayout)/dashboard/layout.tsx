import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        {/* Sidebar on the left */}
        <AppSidebar />

        {/* Right section with Header on top and content below */}
        <div className="flex flex-col flex-1">
          {/* Header at the top */}
          <Header title="Dashboard" />

          {/* Main content */}
          <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default layout;
