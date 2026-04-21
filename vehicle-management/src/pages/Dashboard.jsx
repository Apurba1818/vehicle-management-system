// import { useState, useEffect } from "react";

// export default function Dashboard() {

//   const [totalVehicles, setTotalVehicles] = useState(0);
//   const [totalDrivers, setTotalDrivers] = useState(0);
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [totalExpense, setTotalExpense] = useState(0);
//   const [netProfit, setNetProfit] = useState(0);

//   useEffect(() => {

//     const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
//     const drivers = JSON.parse(localStorage.getItem("drivers")) || [];
//     const logs = JSON.parse(localStorage.getItem("logs")) || [];

//     setTotalVehicles(vehicles.length);
//     setTotalDrivers(drivers.length);

//     let income = 0;
//     let expense = 0;

//     logs.forEach(log => {
//       income += Number(log.income || 0);
//       expense += Number(log.totalExpense || 0);
//     });

//     setTotalIncome(income);
//     setTotalExpense(expense);
//     setNetProfit(income - expense);

//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>

//       <h2>Dashboard</h2>
//       <p>Overview of your business performance</p>

//       <div style={gridStyle}>
        
//         <div style={cardStyle}>
//           <h3>Total Vehicles</h3>
//           <h1>{totalVehicles}</h1>
//         </div>

//         <div style={cardStyle}>
//           <h3>Total Drivers</h3>
//           <h1>{totalDrivers}</h1>
//         </div>

//         <div style={cardStyle}>
//           <h3>Total Income</h3>
//           <h1>₹ {totalIncome}</h1>
//         </div>

//         <div style={cardStyle}>
//           <h3>Total Expense</h3>
//           <h1>₹ {totalExpense}</h1>
//         </div>

//         <div style={cardStyle}>
//           <h3>Net Profit</h3>
//           <h1 style={{ color: netProfit >= 0 ? "lightgreen" : "red" }}>
//             ₹ {netProfit}
//           </h1>
//         </div>

//       </div>

//     </div>
//   );
// }

// const gridStyle = {
//   display: "grid",
//   gridTemplateColumns: "repeat(3, 1fr)",
//   gap: "20px",
//   marginTop: "20px"
// };

// const cardStyle = {
//   padding: "20px",
//   background: "#333",
//   color: "#fff",
//   borderRadius: "10px",
//   boxShadow: "0 0 10px rgba(0,0,0,0.3)",
//   textAlign: "center"
// };

// import { useState, useEffect } from "react";
// import api from "../api/axios";

// export default function Dashboard() {

//   const [stats, setStats] = useState({
//     totalVehicles: 0,
//     totalDrivers: 0,
//     totalIncome: 0,
//     totalExpense: 0,
//     netProfit: 0
//   });

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//     const res = await api.get("http://localhost:5000/dashboard");
//     setStats(res.data);
//   };

//   return (
//     <div style={{ padding: "20px" }}>

//       <h2>Dashboard</h2>
//       <p>Overview of your business performance</p>

//       <div style={grid}>
//         <Card title="Total Vehicles" value={stats.totalVehicles} />
//         <Card title="Total Drivers" value={stats.totalDrivers} />
//         <Card title="Total Income" value={`₹ ${stats.totalIncome}`} />
//         <Card title="Total Expense" value={`₹ ${stats.totalExpense}`} />
//         <Card title="Net Profit" value={`₹ ${stats.netProfit}`} />
//       </div>

//     </div>
//   );
// }

// function Card({ title, value }) {
//   return (
//     <div style={card}>
//       <h3>{title}</h3>
//       <h1>{value}</h1>
//     </div>
//   );
// }

// const grid = {
//   display: "grid",
//   gridTemplateColumns: "repeat(3, 1fr)",
//   gap: "20px",
//   marginTop: "20px"
// };

// const card = {
//   padding: "20px",
//   background: "#333",
//   color: "white",
//   borderRadius: "10px",
//   textAlign: "center"
// };

// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function Dashboard() {

//   const [data, setData] = useState({
//     totalVehicles: 0,
//     totalDrivers: 0,
//     totalIncome: 0,
//     totalExpense: 0,
//     netProfit: 0
//   });

//   useEffect(() => {
//     fetchDashboard();

//     /* listen for updates */
//     window.addEventListener("storage", fetchDashboard);

//     return () => window.removeEventListener("storage", fetchDashboard);
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       const res = await api.get("/dashboard");
//       setData(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Dashboard</h2>

//       <div style={grid}>

//         <div style={card}>
//           <h3>Total Vehicles</h3>
//           <h1>{data.totalVehicles}</h1>
//         </div>

//         <div style={card}>
//           <h3>Total Drivers</h3>
//           <h1>{data.totalDrivers}</h1>
//         </div>

//         <div style={card}>
//           <h3>Total Income</h3>
//           <h1>₹ {data.totalIncome}</h1>
//         </div>

//         <div style={card}>
//           <h3>Total Expense</h3>
//           <h1>₹ {data.totalExpense}</h1>
//         </div>

//         <div style={card}>
//           <h3>Net Profit</h3>
//           <h1 style={{ color: data.netProfit >= 0 ? "lightgreen" : "red" }}>
//             ₹ {data.netProfit}
//           </h1>
//         </div>

//       </div>
//     </div>
//   );
// }

// const grid = {
//   display: "grid",
//   gridTemplateColumns: "repeat(3, 1fr)",
//   gap: "20px",
//   marginTop: "20px"
// };

// const card = {
//   padding: "20px",
//   background: "#333",
//   color: "white",
//   borderRadius: "10px",
//   textAlign: "center"
// };

import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/vms.css";
 
const ICONS = {
  vehicles: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 17H5a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2h-3m-6 0a2 2 0 104 0m-4 0a2 2 0 014 0"/>
    </svg>
  ),
  drivers: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  ),
  income: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
  expense: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 2.5 2 2.5-2 3.5 2z"/>
    </svg>
  ),
  profit: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
    </svg>
  ),
};
 
export default function Dashboard() {
 
  const [data, setData] = useState({
    totalVehicles: 0,
    totalDrivers: 0,
    totalIncome: 0,
    totalExpense: 0,
    netProfit: 0
  });
 
  useEffect(() => {
    fetchDashboard();
    window.addEventListener("storage", fetchDashboard);
    return () => window.removeEventListener("storage", fetchDashboard);
  }, []);
 
  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
 
  const cards = [
    { label: "Total Vehicles", value: data.totalVehicles,          icon: ICONS.vehicles, color: "blue"  },
    { label: "Total Drivers",  value: data.totalDrivers,           icon: ICONS.drivers,  color: "blue"  },
    { label: "Total Income",   value: `₹ ${data.totalIncome}`,     icon: ICONS.income,   color: "green" },
    { label: "Total Expense",  value: `₹ ${data.totalExpense}`,    icon: ICONS.expense,  color: "amber" },
    {
      label: "Net Profit",
      value: `₹ ${data.netProfit}`,
      icon: ICONS.profit,
      color: data.netProfit >= 0 ? "green" : "red",
      isProfit: true,
    },
  ];
 
  const colorMap = {
    blue:  { iconBg: "var(--accent-dim)",  iconColor: "var(--accent)", valueColor: "var(--text-1)" },
    green: { iconBg: "var(--green-dim)",   iconColor: "var(--green)",  valueColor: "var(--green)"  },
    amber: { iconBg: "var(--amber-dim)",   iconColor: "var(--amber)",  valueColor: "var(--amber)"  },
    red:   { iconBg: "var(--red-dim)",     iconColor: "var(--red)",    valueColor: "var(--red)"    },
  };
 
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of your business performance</p>
      </div>
 
      <div className="stat-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}>
        {cards.map(({ label, value, icon, color }) => {
          const c = colorMap[color];
          return (
            <div key={label} className="stat-card">
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                <span className="stat-label">{label}</span>
                <span style={{
                  display:"flex", alignItems:"center", justifyContent:"center",
                  width:36, height:36, borderRadius:10,
                  background: c.iconBg, color: c.iconColor
                }}>
                  {icon}
                </span>
              </div>
              <div className="stat-value" style={{ color: c.valueColor }}>{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
