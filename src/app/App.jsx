import React, { useContext } from "react";
import { TokenContext, UserContext } from "../contexts/context";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/components/ui/sidebar";
import { Home, Inbox, Phone, Settings, Signal, User } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import dashboardServices from "../services/dashboard.service";

export default function App() {
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      const getUserData = await dashboardServices.getUserData(token);
      setUser(getUserData);
      setIsLoading(false);
    })();
  }, []);

  function logout() {
    localStorage.clear();
    navigate("/signin");
  }

  // Menu items.
  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Buy Data",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Buy Bulk SMS Data",
      url: "#",
      icon: Signal,
    },
    {
      title: "Buy Airtime",
      url: "#",
      icon: Phone,
    },
    {
      title: "Account",
      url: "#",
      icon: User,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#000" loading={isLoading} size={100} />
    </div>
  ) : (
    <main className="flex">
      <section>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div>
                    <strong>{user && user.email}</strong>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup />
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
              <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="text-red-500 hover:bg-red-500/5 hover:text-red-500"
                    onClick={logout}
                  >
                    Logout
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarTrigger />
        </SidebarProvider>
      </section>

      <section className="p-6 w-full">
        <Outlet />
      </section>
    </main>
  );
}
