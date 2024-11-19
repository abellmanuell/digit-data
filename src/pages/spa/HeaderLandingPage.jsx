import Logo from "@/assets/logo.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

function LandingPageHeader() {
  const navigationLinks = [
    { to: "/home", name: "Home" },
    { to: "/about", name: "About" },
    { to: "/services", name: "Services" },
    { to: "/features", name: "Features" },
    { to: "/login", name: "Log In" },
    { to: "/signup", name: "Sign Up" },
  ];

  return (
    <header>
      <div>
        <img src={Logo} alt="Digit Data" />
      </div>

      <div>
        <ul>
          {navigationLinks.map(({ to, name }) => {
            return (
              <li key={name}>
                <NavLink to={to}>{name}</NavLink>
              </li>
            );
          })}
        </ul>

        <div>
          <XMarkIcon />
        </div>
      </div>

      <div>
        <Bars3Icon />
      </div>
    </header>
  );
}

export default LandingPageHeader;
