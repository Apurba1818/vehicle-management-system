import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "rgb(115, 121, 161)", color: "#fff" }}>
      <h2>Vehicle Management System</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/">Dashboard</Link>
        <Link to="/vehicles">Vehicles</Link>
        <Link to="/drivers">Drivers</Link>
        <Link to="/daily-logs">Daily Logs</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/vehicle-profit">Vehicle Profit</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </nav>
  );
}

