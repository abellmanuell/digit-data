import { House, Inbox, Phone, Settings } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function BottomNavigationBar() {
  const items = [
    {
      title: "Home",
      url: "",
      icon: House,
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

  return (
    <div>
      <Outlet />

      {
        <div className="fixed bottom-0 bg-white h-14 min-w-full shadow-sm pt-4 pb-1 px-6 md:hidden border-t">
          <ul className="flex justify-between items-center">
            {items.map(({ url, title, icon: Icon }) => {
              return (
                <li key={title}>
                  <Link
                    to={`dashboard/${url}`}
                    className="flex justify-center items-center flex-col"
                  >
                    <Icon size={20} />
                    <span className="text-xs">{title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      }
    </div>
  );
}
