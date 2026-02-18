import { useEffect, useState } from "react";
import api from "../api/axios";

export default function VehicleProfit(){

  const [data,setData] = useState([]);

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async ()=>{
    const res = await api.get("/vehicle-profit");
    setData(res.data);
  };

  return(
    <div style={{padding:"20px"}}>
      <h2>Vehicle Profit Analytics</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Total Income</th>
            <th>Total Expense</th>
            <th>Profit</th>
          </tr>
        </thead>

        <tbody>
          {data.map((v,i)=>(
            <tr key={i}>
              <td>{v.vehicle}</td>
              <td>₹ {v.totalIncome}</td>
              <td>₹ {v.totalExpense}</td>
              <td style={{color:v.profit>=0?"green":"red"}}>
                ₹ {v.profit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
