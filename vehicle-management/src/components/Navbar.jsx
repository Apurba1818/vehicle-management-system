// import { Link, useLocation } from "react-router-dom";
// import { useState } from "react";
// import "../styles/vms.css";

// export default function Navbar() {
//   const location = useLocation();
//   const [open, setOpen] = useState(false);

//   const links = [
//     { to: "/", label: "Dashboard" },
//     { to: "/vehicles", label: "Vehicles" },
//     { to: "/drivers", label: "Drivers" },
//     { to: "/daily-logs", label: "Daily Logs" },
//     { to: "/reports", label: "Reports" },
//     { to: "/vehicle-profit", label: "Vehicle Profit" },
//     { to: "/settings", label: "Settings" },
//   ];

//   return (
//     <nav className="navbar">
//       <div className="nav-brand">
//         <span className="nav-brand-dot" />
//         VMS
//       </div>

//       {/* Hamburger */}
//       <button className="menu-btn" onClick={() => setOpen(!open)}>
//         ☰
//       </button>

//       <div className={`nav-links ${open ? "open" : ""}`}>
//         {links.map(({ to, label }) => (
//           <Link
//             key={to}
//             to={to}
//             onClick={() => setOpen(false)}
//             className={location.pathname === to ? "active" : ""}
//           >
//             {label}
//           </Link>
//         ))}
//       </div>
//     </nav>
//   );
// }

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/vms.css";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/vehicles", label: "Vehicles" },
    { to: "/drivers", label: "Drivers" },
    { to: "/daily-logs", label: "Daily Logs" },
    { to: "/reports", label: "Reports" },
    { to: "/vehicle-profit", label: "Vehicle Profit" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <nav className="navbar">
      
      {/* Logo */}
      <div className="nav-brand">
        <span className="nav-brand-dot" />
        Vehicle Management
      </div>

      {/* Hamburger Button */}
      <button 
        className="menu-btn"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Links */}
      <div className={`nav-links ${open ? "open" : ""}`}>
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setOpen(false)} // close menu on click
            className={location.pathname === to ? "active" : ""}
          >
            {label}
          </Link>
        ))}
      </div>

    </nav>
  );
}
