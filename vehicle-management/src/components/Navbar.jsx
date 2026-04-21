// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav style={{ padding: "10px", background: "rgb(115, 121, 161)", color: "#fff" }}>
//       <h2>Vehicle Management System</h2>

//       <div style={{ display: "flex", gap: "15px" }}>
//         <Link to="/">Dashboard</Link>
//         <Link to="/vehicles">Vehicles</Link>
//         <Link to="/drivers">Drivers</Link>
//         <Link to="/daily-logs">Daily Logs</Link>
//         <Link to="/reports">Reports</Link>
//         <Link to="/vehicle-profit">Vehicle Profit</Link>
//         <Link to="/settings">Settings</Link>
//       </div>
//     </nav>
//   );
// }

import { Link, useLocation } from "react-router-dom";
import "../styles/vms.css";
 
export default function Navbar() {
  const location = useLocation();
 
  const links = [
    { to: "/",               label: "Dashboard" },
    { to: "/vehicles",       label: "Vehicles" },
    { to: "/drivers",        label: "Drivers" },
    { to: "/daily-logs",     label: "Daily Logs" },
    { to: "/reports",        label: "Reports" },
    { to: "/vehicle-profit", label: "Vehicle Profit" },
    { to: "/settings",       label: "Settings" },
  ];
 
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="nav-brand-dot" />
        Vehicle Management System
      </div>
 
      <div className="nav-links">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={location.pathname === to ? "active" : ""}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

