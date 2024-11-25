import Heading from "@/components/Heading";
import Paragraphing from "@/components/Paragraphing";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-10 md:px-32 py-10 bg-black text-white">
      <div className="grid grid-cols-2 gap-x-5 md:grid-cols-4">
        <section className="py-4">
          <Heading className="py-4">Digit Data</Heading>
          <ul className="text-sm leading-6 ">
            <li>
              <Link className="text-gray-500 hover:text-gray-200" to="#about">
                About Us
              </Link>
            </li>

            <li>
              <Link className="text-gray-500 hover:text-gray-200" to="#feature">
                Our Features
              </Link>
            </li>

            <li>
              <Link
                className="text-gray-500 hover:text-gray-200"
                to="#services"
              >
                Our Services
              </Link>
            </li>

            <li>
              <Link className="text-gray-500 hover:text-gray-200" to="/login">
                Login
              </Link>
            </li>

            <li>
              <Link className="text-gray-500 hover:text-gray-200" to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </section>

        <section className="py-4">
          <Heading className="py-4">Our Services</Heading>
          <ul className="text-sm leading-6 ">
            <li>
              <Link className="text-gray-500 hover:text-gray-200" to="#about">
                Buy Data
              </Link>
            </li>

            <li>
              <Link className="text-gray-500 hover:text-gray-200" to="#feature">
                Airtime Top Up
              </Link>
            </li>

            <li>
              <Link
                className="text-gray-500 hover:text-gray-200"
                to="#services"
              >
                Cable Subscription
              </Link>
            </li>

            <li>
              <Link className="text-gray-500 hover:text-gray-200" to="/login">
                Airtime To Cash
              </Link>
            </li>

            <li>
              <Link className="text-gray-500 hover:text-gray-200" to="/signup">
                Utility Payment
              </Link>
            </li>
          </ul>
        </section>

        <section className="py-4">
          <Heading className="py-4">Contact Us</Heading>
          <ul className="text-sm leading-6">
            <li className="text-gray-500 flex items-center space-x-2">
              <MapPinIcon className="w-4" />
              <span>Abuja FCT</span>
            </li>

            <li className="text-gray-500 flex items-center space-x-2">
              <PhoneIcon className="w-4" />
              <span>+2349025534431</span>
            </li>

            <li className="text-gray-500 flex items-center space-x-2">
              <EnvelopeIcon className="w-4" />
              <span>mannydev02@gmail.com</span>
            </li>
          </ul>
        </section>

        <section className="py-4 self-end md:self-center">
          <ul className="text-sm leading-6">
            <li>
              <Link to="#">X/Twitter</Link>
            </li>

            <li>
              <Link to="#">Facebook</Link>
            </li>

            <li>
              <Link to="#">YouTube</Link>
            </li>

            <li>
              <Link to="#">LinkedIn</Link>
            </li>
          </ul>
        </section>
      </div>
      <Paragraphing className="text-center text-gray-500">
        Loved & Built by{" "}
        <Link
          to="https://abellmanuell.com.ng"
          target="_blank"
          className="text-gray-500 font-medium"
        >
          Abel Emmannuel
        </Link>
      </Paragraphing>
    </footer>
  );
}
