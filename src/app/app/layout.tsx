import { cookies } from "next/headers";

import { SidebarLayout, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app/sidebar";

const SIDEBAR_STATE_COOKIE = "app:sidebar:state";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    (<SidebarLayout
      sidebarStateCookie={SIDEBAR_STATE_COOKIE}
      defaultOpen={(await cookies()).get(SIDEBAR_STATE_COOKIE)?.value === "true"}
    >
      <AppSidebar />
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarLayout>)
  );
}
