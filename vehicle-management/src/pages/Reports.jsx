// import { useState, useEffect } from "react";

// export default function Reports() {

//   const [logs, setLogs] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState("");

//   useEffect(() => {
//     const storedLogs = JSON.parse(localStorage.getItem("logs")) || [];
//     setLogs(storedLogs);

//     const today = new Date();
//     setSelectedMonth(today.toISOString().slice(0, 7));
//   }, []);

//   const getMonthlyTotals = (month) => {
//     let income = 0;
//     let expense = 0;

//     logs.forEach(log => {
//       if (log.date.startsWith(month)) {
//         income += Number(log.income || 0);
//         expense += Number(log.totalExpense || 0);
//       }
//     });

//     return { income, expense, profit: income - expense };
//   };

//   const { income, expense, profit } = getMonthlyTotals(selectedMonth);

//   // Generate monthly summary table
//   const months = [...new Set(logs.map(l => l.date.slice(0, 7)))];

//   return (
//     <div style={{ padding: "20px" }}>

//       <h2>Reports</h2>
//       <p>Monthly profit & loss summary</p>

//       <div style={{ marginTop: "20px" }}>
//         <label>Select Month: </label>
//         <input
//           type="month"
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//           style={{ padding: "8px" }}
//         />
//       </div>

//       {/* Summary Cards */}
//       <div style={cardContainer}>
//         <div style={card}>
//           <h3>Total Income</h3>
//           <h1>₹ {income}</h1>
//         </div>

//         <div style={card}>
//           <h3>Total Expense</h3>
//           <h1>₹ {expense}</h1>
//         </div>

//         <div style={card}>
//           <h3>Net Profit / Loss</h3>
//           <h1 style={{ color: profit >= 0 ? "lightgreen" : "red" }}>
//             ₹ {profit}
//           </h1>
//         </div>
//       </div>

//       {/* Monthly Statement Table */}
//       <table style={table}>
//         <thead>
//           <tr>
//             <th style={th}>Month</th>
//             <th style={th}>Total Income</th>
//             <th style={th}>Total Expense</th>
//             <th style={th}>Profit / Loss</th>
//           </tr>
//         </thead>

//         <tbody>
//           {months.map(month => {
//             const totals = getMonthlyTotals(month);
//             return (
//               <tr key={month}>
//                 <td style={td}>{month}</td>
//                 <td style={td}>₹ {totals.income}</td>
//                 <td style={td}>₹ {totals.expense}</td>
//                 <td style={{ ...td, color: totals.profit >= 0 ? "green" : "red" }}>
//                   ₹ {totals.profit}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//     </div>
//   );
// }

// const cardContainer = {
//   display: "grid",
//   gridTemplateColumns: "repeat(3,1fr)",
//   gap: "20px",
//   marginTop: "20px"
// };

// const card = {
//   padding: "20px",
//   background: "#333",
//   borderRadius: "10px",
//   color: "white",
//   textAlign: "center"
// };

// const table = {
//   width: "100%",
//   borderCollapse: "collapse",
//   marginTop: "30px"
// };

// const th = {
//   border: "1px solid #ccc",
//   padding: "10px",
//   background: "#f4f4f4"
// };

// const td = {
//   border: "1px solid #ccc",
//   padding: "10px",
//   textAlign: "center"
// };

// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function Reports() {

//   const [reports, setReports] = useState([]);
//   const [monthFilter, setMonthFilter] = useState("");

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const res = await api.get("/reports");
//       setReports(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   /* Filter logic */
//   const filteredReports = monthFilter
//     ? reports.filter(r => r.month === monthFilter)
//     : reports;

//   return (
//     <div style={{ padding: "20px" }}>

//       <h2>Reports</h2>
//       <p>Monthly Profit & Loss</p>

//       {/* Month Filter */}
//       <div style={{ marginBottom: "20px" }}>
//         <label>Select Month: </label>
//         <input
//           type="month"
//           value={monthFilter}
//           onChange={(e) => setMonthFilter(e.target.value)}
//           style={{ padding: "8px", marginLeft: "10px" }}
//         />
//       </div>

//       <table style={tableStyle}>
//         <thead>
//           <tr>
//             <th style={th}>Month</th>
//             <th style={th}>Total Income</th>
//             <th style={th}>Total Expense</th>
//             <th style={th}>Profit / Loss</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filteredReports.map((r, index) => (
//             <tr key={index}>
//               <td style={td}>{r.month}</td>
//               <td style={td}>₹ {r.totalIncome}</td>
//               <td style={td}>₹ {r.totalExpense}</td>
//               <td style={{
//                 ...td,
//                 color: r.profit >= 0 ? "green" : "red",
//                 fontWeight: "bold"
//               }}>
//                 ₹ {r.profit}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// }

// /* Styles */

// const tableStyle = {
//   width: "100%",
//   borderCollapse: "collapse",
//   marginTop: "20px"
// };

// const th = {
//   border: "1px solid #ccc",
//   padding: "12px",
//   background: "#eee",
//   textAlign: "center"
// };

// const td = {
//   border: "1px solid #ccc",
//   padding: "12px",
//   textAlign: "center"
// };

import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/vms.css";
 
export default function Reports() {
 
  const [reports, setReports] = useState([]);
  const [monthFilter, setMonthFilter] = useState("");
 
  useEffect(() => {
    fetchReports();
  }, []);
 
  const fetchReports = async () => {
    try {
      const res = await api.get("/reports");
      setReports(res.data);
    } catch (err) {
      console.log(err);
    }
  };
 
  const filteredReports = monthFilter
    ? reports.filter(r => r.month === monthFilter)
    : reports;
 
  const totals = filteredReports.reduce(
    (acc, r) => ({
      income:  acc.income  + Number(r.totalIncome  || 0),
      expense: acc.expense + Number(r.totalExpense || 0),
      profit:  acc.profit  + Number(r.profit       || 0),
    }),
    { income: 0, expense: 0, profit: 0 }
  );
 
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Reports</h1>
        <p className="page-subtitle">Monthly Profit &amp; Loss</p>
      </div>
 
      {/* Summary cards */}
      <div className="stat-grid" style={{ marginBottom:24 }}>
        <div className="stat-card">
          <span className="stat-label">Total Income</span>
          <div className="stat-value" style={{ color:"var(--green)" }}>₹ {totals.income}</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Expense</span>
          <div className="stat-value" style={{ color:"var(--amber)" }}>₹ {totals.expense}</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Net Profit / Loss</span>
          <div className="stat-value" style={{ color: totals.profit >= 0 ? "var(--green)" : "var(--red)" }}>
            ₹ {totals.profit}
          </div>
        </div>
      </div>
 
      {/* Month Filter */}
      <div className="filter-bar">
        <span className="filter-label">Filter by Month:</span>
        <input
          className="form-input"
          type="month"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          style={{ maxWidth: 180 }}
        />
        {monthFilter && (
          <button
            className="btn btn-sm btn-edit"
            onClick={() => setMonthFilter("")}
          >
            Clear
          </button>
        )}
      </div>
 
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Total Income</th>
              <th>Total Expense</th>
              <th>Profit / Loss</th>
            </tr>
          </thead>
 
          <tbody>
            {filteredReports.map((r, index) => (
              <tr key={index}>
                <td style={{ fontWeight:600, color:"var(--text-1)" }}>{r.month}</td>
                <td style={{ color:"var(--green)", fontWeight:600 }}>₹ {r.totalIncome}</td>
                <td style={{ color:"var(--amber)", fontWeight:600 }}>₹ {r.totalExpense}</td>
                <td>
                  <span className={r.profit >= 0 ? "profit" : "loss"}>
                    {r.profit >= 0 ? "▲" : "▼"} ₹ {r.profit}
                  </span>
                </td>
              </tr>
            ))}
            {filteredReports.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign:"center", color:"var(--text-3)", padding:"32px" }}>
                  No report data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
