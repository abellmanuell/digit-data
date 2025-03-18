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
  useSidebar,
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
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
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
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Buy Airtime",
      url: "buyairtime",
      icon: Phone,
    },
    {
      title: "Buy Data",
      url: "buydata",
      icon: Inbox,
    },
    /*  {
      title: "Buy Bulk SMS Data",
      url: "#",
      icon: Signal,
    },
    {
      title: "Account",
      url: "#",
      icon: User,
    }, */
    {
      title: "Settings",
      url: "settings",
      icon: Settings,
    },
  ];

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#000" size={100} />
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
                      <div className="mb-2">
                        <h1>
                          <strong>
                            {user.given_name ?? user.given_name}{" "}
                            {user.family_name ?? user.family_name}
                          </strong>
                        </h1>
                        <p className="text-sm text-ellipsis overflow-hidden max-w-40 text-gray-500">
                          {user && user.email}
                        </p>
                      </div>
                      <p className="text-sm">
                        <span className="text-gray-500">Balance: </span>
                        {"₦" + user.wallet_balance}
                      </p>
                    </div>
                    <div>
                      <Link
                        to="settings/edit"
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
                        <NavLink to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </NavLink>
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
                  <button
                    className="text-red-500 hover:bg-red-500/5 hover:text-red-500 w-full px-2 py-1 rounded text-left"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarTrigger />
        </SidebarProvider>
      </section>

      <section className="w-full">
        <Outlet />
      </section>
    </main>
  );
}
