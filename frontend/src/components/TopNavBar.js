import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { SidebarData } from "./Navbardata";

import "../css/Navbar.css"; // Ensure you have the necessary CSS

const TopNavBarComponent = ({ onLogout }) => {
  return (
    <>
      <nav class="flex justify-between items-center p-6 border border-black bg-black/70 text-white ">
        {/* logo */}
        <div>
          <NavLink
            to="/"
            className="text-red-500 text-4xl font-bold font-cursive no-underline"
          >
            RENTIFY
          </NavLink>
        </div>

        {/* links */}
        <div className="navbar-links flex items-center gap-5">
          {SidebarData.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="navbar-item"
              activeClassName="active"
            >
              {item.icon}
              <span class="no-underline text-xl text-white font-semibold  ">
                {item.title}
              </span>
            </NavLink>
          ))}
        </div>

        {/* logout */}
        <div className="btn px-3 py-2 btn-danger" onClick={onLogout}>
          Logout
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default TopNavBarComponent;
