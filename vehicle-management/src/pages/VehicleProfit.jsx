// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function VehicleProfit(){

//   const [data,setData] = useState([]);

//   useEffect(()=>{
//     fetchData();
//   },[]);

//   const fetchData = async ()=>{
//     const res = await api.get("/vehicle-profit");
//     setData(res.data);
//   };

//   return(
//     <div style={{padding:"20px"}}>
//       <h2>Vehicle Profit Analytics</h2>

//       <table border="1" width="100%">
//         <thead>
//           <tr>
//             <th>Vehicle</th>
//             <th>Total Income</th>
//             <th>Total Expense</th>
//             <th>Profit</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((v,i)=>(
//             <tr key={i}>
//               <td>{v.vehicle}</td>
//               <td>₹ {v.totalIncome}</td>
//               <td>₹ {v.totalExpense}</td>
//               <td style={{color:v.profit>=0?"green":"red"}}>
//                 ₹ {v.profit}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/vms.css";
 
export default function VehicleProfit(){
 
  const [data, setData] = useState([]);
 
  useEffect(() => {
    fetchData();
  }, []);
 
  const fetchData = async () => {
    const res = await api.get("/vehicle-profit");
    setData(res.data);
  };
 
  const topVehicle = data.length > 0
    ? data.reduce((best, v) => (Number(v.profit) > Number(best.profit) ? v : best), data[0])
    : null;
 
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Vehicle Profit Analytics</h1>
        <p className="page-subtitle">Performance breakdown per vehicle</p>
      </div>
 
      {topVehicle && (
        <div style={{ marginBottom: 24 }}>
          <div className="stat-card" style={{ maxWidth: 280 }}>
            <span className="stat-label">🏆 Top Performing Vehicle</span>
            <div style={{ marginTop: 10, display:"flex", alignItems:"baseline", gap: 8 }}>
              <span style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, color:"var(--text-1)" }}>
                {topVehicle.vehicle}
              </span>
              <span style={{ color:"var(--green)", fontWeight:600 }}>₹ {topVehicle.profit}</span>
            </div>
          </div>
        </div>
      )}
 
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Vehicle</th>
              <th>Total Income</th>
              <th>Total Expense</th>
              <th>Profit / Loss</th>
            </tr>
          </thead>
 
          <tbody>
            {data.map((v, i) => (
              <tr key={i}>
                <td><span className="badge badge-blue">{i + 1}</span></td>
                <td style={{ fontWeight:600, color:"var(--text-1)" }}>{v.vehicle}</td>
                <td style={{ color:"var(--green)", fontWeight:600 }}>₹ {v.totalIncome}</td>
                <td style={{ color:"var(--amber)", fontWeight:600 }}>₹ {v.totalExpense}</td>
                <td>
                  <span className={v.profit >= 0 ? "profit" : "loss"}>
                    {v.profit >= 0 ? "▲" : "▼"} ₹ {v.profit}
                  </span>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign:"center", color:"var(--text-3)", padding:"32px" }}>
                  No vehicle profit data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
