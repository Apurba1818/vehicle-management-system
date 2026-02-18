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

import { useEffect, useState } from "react";
import api from "../api/axios";

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

  /* Filter logic */
  const filteredReports = monthFilter
    ? reports.filter(r => r.month === monthFilter)
    : reports;

  return (
    <div style={{ padding: "20px" }}>

      <h2>Reports</h2>
      <p>Monthly Profit & Loss</p>

      {/* Month Filter */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Month: </label>
        <input
          type="month"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          style={{ padding: "8px", marginLeft: "10px" }}
        />
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>Month</th>
            <th style={th}>Total Income</th>
            <th style={th}>Total Expense</th>
            <th style={th}>Profit / Loss</th>
          </tr>
        </thead>

        <tbody>
          {filteredReports.map((r, index) => (
            <tr key={index}>
              <td style={td}>{r.month}</td>
              <td style={td}>₹ {r.totalIncome}</td>
              <td style={td}>₹ {r.totalExpense}</td>
              <td style={{
                ...td,
                color: r.profit >= 0 ? "green" : "red",
                fontWeight: "bold"
              }}>
                ₹ {r.profit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

/* Styles */

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px"
};

const th = {
  border: "1px solid #ccc",
  padding: "12px",
  background: "#eee",
  textAlign: "center"
};

const td = {
  border: "1px solid #ccc",
  padding: "12px",
  textAlign: "center"
};

