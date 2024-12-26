import React, { useContext } from "react";
import { IsLoadingContext, UserContext } from "../contexts/context";
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
import {
  Home,
  Inbox,
  Phone,
  Settings,
  Signal,
  SquarePen,
  User,
} from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function App() {
  const { user, setUser } = useContext(UserContext);
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);
  const navigate = useNavigate();

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
      title: "Buy Airtime",
      url: "buyairtime",
      icon: Phone,
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
                  <div className="flex items-center justify-between">
                    <div>
                      <h1>
                        <strong>
                          {user.given_name ?? user.given_name}{" "}
                          {user.family_name ?? user.family_name}
                        </strong>
                      </h1>
                      <p className="text-sm text-ellipsis overflow-hidden max-w-40">
                        {user && user.email}
                      </p>
                    </div>
                    <div>
                      <Link
                        to="edit"
                        className="hover:bg-sidebar-foreground/5 rounded-sm block p-2"
                      >
                        <SquarePen size="20" />
                      </Link>
                    </div>
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
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
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
