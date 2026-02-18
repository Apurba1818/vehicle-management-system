// import { useState } from "react";

// export default function Income() {

//   const [incomeList, setIncomeList] = useState([]);

//   const [income, setIncome] = useState({
//     date: "",
//     vehicle: "",
//     client: "",
//     amount: "",
//     notes: ""
//   });

//   const handleChange = (e) => {
//     setIncome({ ...income, [e.target.name]: e.target.value });
//   };

//   const addIncome = () => {

//     if(!income.date || !income.vehicle || !income.amount){
//       alert("Please fill required fields");
//       return;
//     }

//     setIncomeList([
//       ...incomeList,
//       {
//         id: incomeList.length + 1,
//         ...income
//       }
//     ]);

//     setIncome({
//       date: "",
//       vehicle: "",
//       client: "",
//       amount: "",
//       notes: ""
//     });
//   };


//   return (
//     <div style={{ padding: "20px" }}>

//       <h2>Income Records</h2>
//       <p>Track trip & rental income</p>

//       {/* ---------- FORM ---------- */}
//       <div style={formBox}>

//         <input
//           style={input}
//           type="date"
//           name="date"
//           value={income.date}
//           onChange={handleChange}
//         />

//         <input
//           style={input}
//           name="vehicle"
//           placeholder="Vehicle Number"
//           value={income.vehicle}
//           onChange={handleChange}
//         />

//         <input
//           style={input}
//           name="client"
//           placeholder="Client Name (optional)"
//           value={income.client}
//           onChange={handleChange}
//         />

//         <input
//           style={input}
//           name="amount"
//           placeholder="Amount (₹)"
//           value={income.amount}
//           onChange={handleChange}
//         />

//         <input
//           style={input}
//           name="notes"
//           placeholder="Notes (optional)"
//           value={income.notes}
//           onChange={handleChange}
//         />

//         <button style={btn} onClick={addIncome}>
//           Add Income
//         </button>

//       </div>


//       {/* ---------- TABLE ---------- */}
//       <table style={table}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Date</th>
//             <th>Vehicle</th>
//             <th>Client</th>
//             <th>Amount</th>
//             <th>Notes</th>
//           </tr>
//         </thead>

//         <tbody>
//           {incomeList.map(i => (
//             <tr key={i.id}>
//               <td>{i.id}</td>
//               <td>{i.date}</td>
//               <td>{i.vehicle}</td>
//               <td>{i.client}</td>
//               <td>₹ {i.amount}</td>
//               <td>{i.notes}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// }


// const formBox = {
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
//   background: "purple",
//   color: "white",
//   cursor: "pointer"
// };

// const table = {
//   width: "100%",
//   borderCollapse: "collapse",
//   marginTop: "20px"
// };

import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Income() {

  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    loadIncome();
  }, []);

  const loadIncome = async () => {
    const res = await api.get("http://localhost:5000/income");
    setIncomeData(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Income Summary</h2>

      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Vehicle</th>
            <th style={th}>Driver</th>
            <th style={th}>Total Income</th>
          </tr>
        </thead>

        <tbody>
          {incomeData.map((i, index) => (
            <tr key={index}>
              <td style={td}>{i.vehicle}</td>
              <td style={td}>{i.driver}</td>
              <td style={td}>₹ {i.totalIncome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const table = { width: "100%", borderCollapse: "collapse" };
const th = { border: "1px solid #ccc", padding: "10px", background: "#f4f4f4" };
const td = { border: "1px solid #ccc", padding: "10px", textAlign: "center" };
