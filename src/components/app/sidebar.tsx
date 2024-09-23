import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "~/components/ui/sidebar";
import { Logo } from "~/components/logo";
import { ThemeSwitch } from "~/components/theme";
import { UserDropdown } from "~/components/user/dropdown";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="py-6">
        <Logo className="h-8 w-auto" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Item 1</SidebarLabel>
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <UserDropdown />
        <div className="ml-2">
          <ThemeSwitch />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
