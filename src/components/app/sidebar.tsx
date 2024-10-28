import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "~/components/ui/sidebar";
import { Logo } from "~/components/logo";
import { UserDropdown } from "~/components/user/dropdown";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="py-6">
        <Logo className="h-8 w-auto" />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <UserDropdown />
      </SidebarFooter>
    </Sidebar>
  );
}
