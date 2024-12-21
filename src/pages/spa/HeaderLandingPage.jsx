import { useEffect, useRef } from "react";
import Logo from "@/assets/logo.png";
import IconButton from "@/components/IconButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";
import { useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "@/components/ListItem";

function LandingPageHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef(null);

  const navigationLinks = [
    { to: "/home", name: "Home" },
    { to: "/about", name: "About" },
    { to: "/services", name: "Services" },
    { to: "/features", name: "Features" },
  ];

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const navHeader = navRef.current;

      if (scrollY > 0) {
        navHeader.classList.add("bg-white");
        navHeader.classList.add("text-black");
      } else {
        navHeader.classList.remove("text-tw-blue-200");
        navHeader.classList.remove("text-black");
        navHeader.classList.remove("bg-white");
      }
    });
  }, []);

  return (
    <header
      ref={navRef}
      className="px-4 py-2 md:px-20 fixed w-full top-0 bg-tw-blue-700 z-20 "
    >
      <nav className={cn("flex", "overflow-hidden")}>
        <div className="grow md:grow-0">
          <Link to="/">
            <img src={Logo} alt="Digit Data" className="w-10" />
          </Link>
        </div>

        {/**********************************
         *    MENU MOBILE RESPONSIVENESS
         *********************************/}
        <div
          className={cn(
            "absolute top-0 md:-right-72",
            showMenu ? "right-0" : "-right-72",
            "bg-black",
            "h-dvh w-60",
            "p-4"
          )}
        >
          <div className="relative">
            <ul>
              {navigationLinks.map(({ to, name }) => {
                return (
                  <ListItem key={name} className="text-tw-blue-200">
                    <NavLink to={to}>{name}</NavLink>
                  </ListItem>
                );
              })}

              <ListItem>
                <Link to="/signin">Log In</Link>
              </ListItem>

              <ListItem>
                <Link to="/signup">Sign Up</Link>
              </ListItem>
            </ul>

            <div className="absolute top-0 right-0 text-tw-blue-200">
              <IconButton
                onClick={() => {
                  setShowMenu(false);
                }}
                Icon={XMarkIcon}
              />
            </div>
          </div>
        </div>

        {/**********************************
         *    DESKTOP RESPONSIVENESS
         *********************************/}
        <div className="hidden md:block w-full">
          <ul className="flex justify-end">
            {navigationLinks.map(({ to, name }) => {
              return (
                <ListItem key={name} className="text-tw-blue-200">
                  <NavLink to={to}>{name}</NavLink>
                </ListItem>
              );
            })}

            <ListItem>
              <Link
                className="bg-black text-white py-2 px-6 font-medium rounded-full"
                to="/signin"
              >
                Log In
              </Link>
            </ListItem>

            <ListItem>
              <Link
                className="py-2 px-6 font-medium rounded-full bg-tw-blue-100 hover:bg-tw-blue-200"
                to="/signup"
              >
                Sign Up
              </Link>
            </ListItem>
          </ul>
        </div>

        <div>
          <IconButton
            className="md:hidden"
            onClick={() => {
              setShowMenu(true);
            }}
            Icon={Bars3Icon}
          />
        </div>
      </nav>
    </header>
  );
}

export default LandingPageHeader;
