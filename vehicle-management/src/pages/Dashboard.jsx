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

import { useEffect, useState } from "react";
import api from "../api/axios";

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

    /* listen for updates */
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <div style={grid}>

        <div style={card}>
          <h3>Total Vehicles</h3>
          <h1>{data.totalVehicles}</h1>
        </div>

        <div style={card}>
          <h3>Total Drivers</h3>
          <h1>{data.totalDrivers}</h1>
        </div>

        <div style={card}>
          <h3>Total Income</h3>
          <h1>₹ {data.totalIncome}</h1>
        </div>

        <div style={card}>
          <h3>Total Expense</h3>
          <h1>₹ {data.totalExpense}</h1>
        </div>

        <div style={card}>
          <h3>Net Profit</h3>
          <h1 style={{ color: data.netProfit >= 0 ? "lightgreen" : "red" }}>
            ₹ {data.netProfit}
          </h1>
        </div>

      </div>
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginTop: "20px"
};

const card = {
  padding: "20px",
  background: "#333",
  color: "white",
  borderRadius: "10px",
  textAlign: "center"
};

