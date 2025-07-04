import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "../globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <SidebarProvider>
          <AppSidebar  />
          <main className="w-full h-full">
            <SidebarTrigger  />
            {children}
          </main>
        </SidebarProvider>
  )
}