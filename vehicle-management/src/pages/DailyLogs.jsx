// import { useState, useEffect } from "react";

// export default function DailyLogs() {

//   const [logs, setLogs] = useState([]);
//   const [vehicles, setVehicles] = useState([]);
//   const [drivers, setDrivers] = useState([]);

//   useEffect(() => {
//     const storedLogs = JSON.parse(localStorage.getItem("logs")) || [];
//     const storedVehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
//     const storedDrivers = JSON.parse(localStorage.getItem("drivers")) || [];

//     setLogs(storedLogs);
//     setVehicles(storedVehicles);
//     setDrivers(storedDrivers);
//   }, []);

//   const [entry, setEntry] = useState({
//     date: "",
//     vehicle: "",
//     driver: "",
//     km: "",
//     fuel: "",
//     toll: "",
//     repair: "",
//     other: "",
//     income: ""
//   });

//   const handleChange = (e) => {
//     setEntry({ ...entry, [e.target.name]: e.target.value });
//   };

//   const addLog = () => {
//     if (!entry.date || !entry.vehicle || !entry.driver || !entry.km) {
//       alert("Please fill required fields");
//       return;
//     }

//     const totalExpense =
//       Number(entry.fuel || 0) +
//       Number(entry.toll || 0) +
//       Number(entry.repair || 0) +
//       Number(entry.other || 0);

//     const profit = Number(entry.income || 0) - totalExpense;

//     const updatedLogs = [
//       ...logs,
//       {
//         id: logs.length + 1,
//         ...entry,
//         totalExpense,
//         profit
//       }
//     ];

//     setLogs(updatedLogs);
//     localStorage.setItem("logs", JSON.stringify(updatedLogs));

//     setEntry({
//       date: "",
//       vehicle: "",
//       driver: "",
//       km: "",
//       fuel: "",
//       toll: "",
//       repair: "",
//       other: "",
//       income: ""
//     });
//   };


//   return (
//     <div style={{ padding: "20px" }}>

//       <h2>Daily Logs</h2>
//       <p>Record trip expenses & earnings</p>

//       {/* ---- Form ---- */}
//       <div style={formContainer}>

//         <input style={input}
//           type="date"
//           name="date"
//           value={entry.date}
//           onChange={handleChange}
//         />

//         <select style={input} name="vehicle" value={entry.vehicle} onChange={handleChange}>
//           <option value="">Select Vehicle</option>
//           {vehicles.map(v => (
//             <option key={v.id} value={v.number}>{v.number}</option>
//           ))}
//         </select>

//         <select style={input} name="driver" value={entry.driver} onChange={handleChange}>
//           <option value="">Select Driver</option>
//           {drivers.map(d => (
//             <option key={d.id} value={d.name}>{d.name}</option>
//           ))}
//         </select>

//         <input style={input}
//           name="km"
//           placeholder="KM Travelled"
//           value={entry.km}
//           onChange={handleChange}
//         />

//         <input style={input}
//           name="fuel"
//           placeholder="Fuel Expense"
//           value={entry.fuel}
//           onChange={handleChange}
//         />

//         <input style={input}
//           name="toll"
//           placeholder="Toll Tax"
//           value={entry.toll}
//           onChange={handleChange}
//         />

//         <input style={input}
//           name="repair"
//           placeholder="Repair Expense"
//           value={entry.repair}
//           onChange={handleChange}
//         />

//         <input style={input}
//           name="other"
//           placeholder="Other Expense"
//           value={entry.other}
//           onChange={handleChange}
//         />

//         <input style={input}
//           name="income"
//           placeholder="Income Earned"
//           value={entry.income}
//           onChange={handleChange}
//         />

//         <button style={btn} onClick={addLog}>
//           Add Log
//         </button>
//       </div>


//       {/* ---- Table ---- */}
//       <table style={table}>
//         <thead>
//           <tr>
//             <th style={th}>ID</th>
//             <th style={th}>Date</th>
//             <th style={th}>Vehicle</th>
//             <th style={th}>Driver</th>
//             <th style={th}>KM</th>
//             <th style={th}>Total Expense</th>
//             <th style={th}>Income</th>
//             <th style={th}>Profit / Loss</th>
//           </tr>
//         </thead>

//         <tbody>
//           {logs.map(l => (
//             <tr key={l.id}>
//               <td style={td}>{l.id}</td>
//               <td style={td}>{l.date}</td>
//               <td style={td}>{l.vehicle}</td>
//               <td style={td}>{l.driver}</td>
//               <td style={td}>{l.km}</td>
//               <td style={td}>₹ {l.totalExpense}</td>
//               <td style={td}>₹ {l.income}</td>
//               <td style={{ ...td, color: l.profit >= 0 ? "green" : "red" }}>
//                 ₹ {l.profit}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// }


// const formContainer = {
//   display: "grid",
//   gridTemplateColumns: "repeat(3, 1fr)",
//   gap: "10px",
//   marginTop: "20px",
//   marginBottom: "20px"
// };

// const input = {
//   padding: "10px",
//   borderRadius: "5px",
//   border: "1px solid gray"
// };

// const btn = {
//   padding: "10px",
//   borderRadius: "5px",
//   border: "none",
//   background: "orange",
//   color: "black",
//   cursor: "pointer"
// };

// const table = {
//   width: "100%",
//   borderCollapse: "collapse",
//   marginTop: "20px"
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
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function DailyLogs() {

//   const [logs, setLogs] = useState([]);

//   const [entry, setEntry] = useState({
//     date: "",
//     vehicle: "",
//     driver: "",
//     income: "",
//     expense: ""
//   });

//   // Load logs from backend
//   useEffect(() => {
//     fetchLogs();
//   }, []);

//   const fetchLogs = async () => {
//     const res = await axios.get("http://localhost:5000/logs");
//     setLogs(res.data);
//   };

//   const handleChange = (e) => {
//     setEntry({ ...entry, [e.target.name]: e.target.value });
//   };

//   const addLog = async () => {

//     if (!entry.date || !entry.vehicle || !entry.driver) {
//       alert("Please fill required fields");
//       return;
//     }

//     await axios.post("http://localhost:5000/logs", {
//       date: entry.date,
//       vehicle: entry.vehicle,
//       driver: entry.driver,
//       income: entry.income || 0,
//       expense: entry.expense || 0
//     });

//     setEntry({
//       date: "",
//       vehicle: "",
//       driver: "",
//       income: "",
//       expense: ""
//     });

//     fetchLogs(); // refresh table
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Daily Logs</h2>
//       <p>Record trip income and expenses</p>

//       {/* Form */}
//       <div style={formContainer}>
//         <input
//           type="date"
//           name="date"
//           value={entry.date}
//           onChange={handleChange}
//           style={input}
//         />

//         <input
//           name="vehicle"
//           placeholder="Vehicle Number"
//           value={entry.vehicle}
//           onChange={handleChange}
//           style={input}
//         />

//         <input
//           name="driver"
//           placeholder="Driver Name"
//           value={entry.driver}
//           onChange={handleChange}
//           style={input}
//         />

//         <input
//           name="income"
//           placeholder="Income"
//           value={entry.income}
//           onChange={handleChange}
//           style={input}
//         />

//         <input
//           name="expense"
//           placeholder="Expense"
//           value={entry.expense}
//           onChange={handleChange}
//           style={input}
//         />

//         <button style={btn} onClick={addLog}>
//           Add Log
//         </button>
//       </div>

//       {/* Table */}
//       <table style={table}>
//         <thead>
//           <tr>
//             <th style={th}>ID</th>
//             <th style={th}>Date</th>
//             <th style={th}>Vehicle</th>
//             <th style={th}>Driver</th>
//             <th style={th}>Income</th>
//             <th style={th}>Expense</th>
//           </tr>
//         </thead>

//         <tbody>
//           {logs.map((l) => (
//             <tr key={l.id}>
//               <td style={td}>{l.id}</td>
//               <td style={td}>{l.date}</td>
//               <td style={td}>{l.vehicle}</td>
//               <td style={td}>{l.driver}</td>
//               <td style={td}>₹ {l.income}</td>
//               <td style={td}>₹ {l.expense}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const formContainer = {
//   display: "flex",
//   gap: "10px",
//   marginBottom: "20px",
//   flexWrap: "wrap"
// };

// const input = {
//   padding: "10px",
//   border: "1px solid gray",
//   borderRadius: "5px"
// };

// const btn = {
//   padding: "10px 20px",
//   background: "orange",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer"
// };

// const table = {
//   width: "100%",
//   borderCollapse: "collapse"
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

import { useState, useEffect } from "react";
import api from "../api/axios";

export default function DailyLogs() {

  const [logs, setLogs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [entry, setEntry] = useState({
    date: "",
    vehicle: "",
    driver: "",
    income: "",
    expense: ""
  });

  useEffect(() => {
    fetchLogs();
    fetchVehicles();
    fetchDrivers();
  }, []);

  const fetchLogs = async () => {
    const res = await api.get("http://localhost:5000/logs");
    setLogs(res.data);
  };

  const fetchVehicles = async () => {
    const res = await api.get("http://localhost:5000/vehicles");
    setVehicles(res.data);
  };

  const fetchDrivers = async () => {
    const res = await api.get("http://localhost:5000/drivers");
    setDrivers(res.data);
  };

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const addLog = async () => {

    if (!entry.date || !entry.vehicle || !entry.driver) {
      alert("Fill required fields");
      return;
    }

    await api.post("http://localhost:5000/logs", {
      date: entry.date,
      vehicle: entry.vehicle,
      driver: entry.driver,
      income: entry.income || 0,
      expense: entry.expense || 0
    });

    setEntry({
      date: "",
      vehicle: "",
      driver: "",
      income: "",
      expense: ""
    });

    fetchLogs();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Daily Logs</h2>

      <div style={formContainer}>
        <input
          type="date"
          name="date"
          value={entry.date}
          onChange={handleChange}
        />

        <select name="vehicle" value={entry.vehicle} onChange={handleChange}>
          <option value="">Select Vehicle</option>
          {vehicles.map(v => (
            <option key={v.id} value={v.number}>
              {v.number}
            </option>
          ))}
        </select>

        <select name="driver" value={entry.driver} onChange={handleChange}>
          <option value="">Select Driver</option>
          {drivers.map(d => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        <input
          name="income"
          placeholder="Income"
          value={entry.income}
          onChange={handleChange}
        />

        <input
          name="expense"
          placeholder="Expense"
          value={entry.expense}
          onChange={handleChange}
        />

        <button onClick={addLog}>Add Log</button>
      </div>

      <table border="1" width="100%" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>Income</th>
            <th>Expense</th>
          </tr>
        </thead>

        <tbody>
          {logs.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.date}</td>
              <td>{l.vehicle}</td>
              <td>{l.driver}</td>
              <td>₹ {l.income}</td>
              <td>₹ {l.expense}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const formContainer = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "20px"
};

