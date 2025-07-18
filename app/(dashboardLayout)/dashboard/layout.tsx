import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <main className="flex-1 bg-gray-50">{children}</main>
            </div>
        </SidebarProvider>

    );
};

export default layout;