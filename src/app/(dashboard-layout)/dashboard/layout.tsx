import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (

        <SidebarProvider>
            <DashboardSidebar />

            <SidebarInset>
                <DashboardHeader />
                <main className="p-4">{children}</main>
            </SidebarInset>

        </SidebarProvider>


    );
};

export default layout;
