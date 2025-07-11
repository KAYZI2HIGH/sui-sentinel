import { auth } from "@/auth";
import AppSidebar from "@/components/custom-ui/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getProjects } from "@/lib/actions";

export default async function DashboardWithSidebarLayout({
  children,
  params
}: {
    children: React.ReactNode;
  params: Promise<{id: string}>
  }) {
  const { id } = await params
  return (
    <SidebarProvider>
      <AppSidebar currentProjectId={id} />
      <main> 
        {children}
      </main>
    </SidebarProvider>
  );
}
