import React, { Component } from "react";
import logo from "../Components/logo.png";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };

  render() {
    const { isMenuOpen } = this.state;

    return (
      <div>
        <nav className="bg-white border-gray-200 py-2.5 dark:bg-zinc-900">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-auto object-contain invert dark:invert pr-2"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                newsMonkey
              </span>
            </a>

            {/* Hamburger Button for Small Screens */}
            <button
              className="text-gray-500 lg:hidden"
              onClick={this.toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            {/* Navigation Menu */}
            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } lg:flex lg:items-center lg:w-auto`}
              id="mobile-menu"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-400 lg:p-0"
                  >
                    Business
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-400 lg:p-0"
                  >
                    Entertainment
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-400 lg:p-0"
                  >
                    General
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-400 lg:p-0"
                  >
                    Health
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-400 lg:p-0"
                  >
                    Science
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-400 lg:p-0"
                  >
                    Sports
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-400 lg:p-0"
                  >
                    Technology
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
