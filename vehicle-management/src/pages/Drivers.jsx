// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Drivers() {

//   const [drivers, setDrivers] = useState([]);

//   const [newDriver, setNewDriver] = useState({
//     name: "",
//     phone: "",
//     salary: ""
//   });

//   useEffect(() => {
//     fetchDrivers();
//   }, []);

//   const fetchDrivers = async () => {
//     const res = await axios.get("http://localhost:5000/drivers");
//     setDrivers(res.data);
//   };

//   const handleChange = (e) => {
//     setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
//   };

//   const addDriver = async () => {

//     if (!newDriver.name || !newDriver.phone || !newDriver.salary) {
//       alert("Fill all fields");
//       return;
//     }

//     await axios.post("http://localhost:5000/drivers", newDriver);

//     setNewDriver({ name: "", phone: "", salary: "" });

//     fetchDrivers();
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Drivers</h2>

//       <div style={formContainer}>
//         <input
//           name="name"
//           placeholder="Driver Name"
//           value={newDriver.name}
//           onChange={handleChange}
//           style={input}
//         />

//         <input
//           name="phone"
//           placeholder="Phone"
//           value={newDriver.phone}
//           onChange={handleChange}
//           style={input}
//         />

//         <input
//           name="salary"
//           placeholder="Salary"
//           value={newDriver.salary}
//           onChange={handleChange}
//           style={input}
//         />

//         <button onClick={addDriver} style={btn}>
//           Add Driver
//         </button>
//       </div>

//       <table style={table}>
//         <thead>
//           <tr>
//             <th style={th}>ID</th>
//             <th style={th}>Name</th>
//             <th style={th}>Phone</th>
//             <th style={th}>Salary</th>
//           </tr>
//         </thead>

//         <tbody>
//           {drivers.map(d => (
//             <tr key={d.id}>
//               <td style={td}>{d.id}</td>
//               <td style={td}>{d.name}</td>
//               <td style={td}>{d.phone}</td>
//               <td style={td}>₹ {d.salary}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const formContainer = { display: "flex", gap: "10px", marginBottom: "20px" };
// const input = { padding: "10px", border: "1px solid gray" };
// const btn = { padding: "10px 20px", background: "green", color: "white", border: "none" };
// const table = { width: "100%", borderCollapse: "collapse" };
// const th = { border: "1px solid #ccc", padding: "10px", background: "#eee" };
// const td = { border: "1px solid #ccc", padding: "10px", textAlign: "center" };

// import { useState, useEffect } from "react";
// import api from "../api/axios";

// export default function Drivers() {

//   const [drivers, setDrivers] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     salary: ""
//   });

//   /* salary payment per driver */
//   const [payAmount, setPayAmount] = useState({});

//   useEffect(() => {
//     fetchDrivers();
//   }, []);

//   const fetchDrivers = async () => {
//     const res = await api.get("/drivers");
//     setDrivers(res.data);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submitDriver = async () => {

//     if(editingId){
//       await api.put(`/drivers/${editingId}`, form);
//       setEditingId(null);
//     }else{
//       await api.post("/drivers", form);
//     }

//     setForm({ name:"", phone:"", salary:"" });
//     fetchDrivers();
//   };

//   const editDriver = (d) => {
//     setForm({
//       name: d.name,
//       phone: d.phone,
//       salary: d.salary
//     });
//     setEditingId(d.id);
//   };

//   const deleteDriver = async (id) => {
//     await api.delete(`/drivers/${id}`);
//     fetchDrivers();
//   };

//   /* pay salary */
//   const paySalary = async (id) => {

//     const amount = payAmount[id];

//     if(!amount) return alert("Enter amount");

//     await api.put(`/drivers/pay/${id}`, { amount });

//     setPayAmount({ ...payAmount, [id]: "" });

//     fetchDrivers();
//   };

//   return (
//     <div style={{ padding:"20px" }}>
//       <h2>Drivers</h2>

//       <div style={{ display:"flex", gap:"10px", marginBottom:"20px" }}>
//         <input name="name" placeholder="Name" value={form.name} onChange={handleChange}/>
//         <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange}/>
//         <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange}/>
//         <button onClick={submitDriver}>
//           {editingId ? "Update" : "Add"}
//         </button>
//       </div>

//       <table border="1" width="100%">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>Salary</th>
//             <th>Paid</th>
//             <th>Remaining</th>
//             <th>Pay Salary</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {drivers.map(d => (
//             <tr key={d.id}>
//               <td>{d.id}</td>
//               <td>{d.name}</td>
//               <td>{d.phone}</td>
//               <td>₹ {d.salary}</td>
//               <td>₹ {d.paid_salary}</td>
//               <td>₹ {d.remaining_salary}</td>

//               <td>
//                 <input
//                   placeholder="Amount"
//                   value={payAmount[d.id] || ""}
//                   onChange={(e)=>setPayAmount({
//                     ...payAmount,
//                     [d.id]: e.target.value
//                   })}
//                 />
//                 <button onClick={()=>paySalary(d.id)}>Pay</button>
//               </td>

//               <td>
//                 <button onClick={()=>editDriver(d)}>Edit</button>
//                 <button onClick={()=>deleteDriver(d.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// }


import { useState, useEffect } from "react";
import api from "../api/axios";
import "../styles/vms.css";
 
export default function Drivers() {
 
  const [drivers, setDrivers] = useState([]);
  const [editingId, setEditingId] = useState(null);
 
  const [form, setForm] = useState({
    name: "",
    phone: "",
    salary: ""
  });
 
  const [payAmount, setPayAmount] = useState({});
 
  useEffect(() => {
    fetchDrivers();
  }, []);
 
  const fetchDrivers = async () => {
    const res = await api.get("/drivers");
    setDrivers(res.data);
  };
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const submitDriver = async () => {
 
    if(editingId){
      await api.put(`/drivers/${editingId}`, form);
      setEditingId(null);
    }else{
      await api.post("/drivers", form);
    }
 
    setForm({ name:"", phone:"", salary:"" });
    fetchDrivers();
  };
 
  const editDriver = (d) => {
    setForm({
      name: d.name,
      phone: d.phone,
      salary: d.salary
    });
    setEditingId(d.id);
  };
 
  const deleteDriver = async (id) => {
    await api.delete(`/drivers/${id}`);
    fetchDrivers();
  };
 
  const paySalary = async (id) => {
 
    const amount = payAmount[id];
 
    if(!amount) return alert("Enter amount");
 
    await api.put(`/drivers/pay/${id}`, { amount });
 
    setPayAmount({ ...payAmount, [id]: "" });
 
    fetchDrivers();
  };
 
  const salaryPct = (d) => {
    if (!d.salary || d.salary == 0) return 0;
    return Math.min(100, Math.round((d.paid_salary / d.salary) * 100));
  };
 
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Drivers</h1>
        <p className="page-subtitle">Manage drivers & salary payments</p>
      </div>
 
      {/* Form */}
      <div className="form-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
        <input className="form-input" name="name" placeholder="Driver Name" value={form.name} onChange={handleChange}/>
        <input className="form-input" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange}/>
        <input className="form-input" name="salary" placeholder="Monthly Salary (₹)" value={form.salary} onChange={handleChange}/>
        <button className="btn btn-primary" onClick={submitDriver} style={{ alignSelf:"end" }}>
          {editingId ? "✓ Update" : "+ Add Driver"}
        </button>
        {editingId && (
          <button
            className="btn btn-sm btn-delete"
            onClick={() => { setEditingId(null); setForm({ name:"", phone:"", salary:"" }); }}
            style={{ alignSelf:"end" }}
          >
            Cancel
          </button>
        )}
      </div>
 
      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Salary</th>
              <th>Paid</th>
              <th>Remaining</th>
              <th>Pay Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
 
          <tbody>
            {drivers.map(d => (
              <tr key={d.id}>
                <td><span className="badge badge-blue">#{d.id}</span></td>
                <td style={{ fontWeight:600, color:"var(--text-1)" }}>{d.name}</td>
                <td style={{ color:"var(--text-2)" }}>{d.phone}</td>
                <td style={{ fontWeight:600 }}>₹ {d.salary}</td>
                <td style={{ color:"var(--green)", fontWeight:600 }}>₹ {d.paid_salary}</td>
                <td style={{ color: d.remaining_salary > 0 ? "var(--red)" : "var(--green)", fontWeight:600 }}>
                  ₹ {d.remaining_salary}
                </td>
 
                <td>
                  <div className="pay-row">
                    <input
                      className="pay-input"
                      placeholder="Amount"
                      value={payAmount[d.id] || ""}
                      onChange={(e) => setPayAmount({ ...payAmount, [d.id]: e.target.value })}
                    />
                    <button className="btn btn-sm btn-pay" onClick={() => paySalary(d.id)}>Pay</button>
                  </div>
                </td>
 
                <td>
                  <div style={{ display:"flex", gap:6 }}>
                    <button className="btn btn-sm btn-edit" onClick={() => editDriver(d)}>Edit</button>
                    <button className="btn btn-sm btn-delete" onClick={() => deleteDriver(d.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {drivers.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign:"center", color:"var(--text-3)", padding:"32px" }}>
                  No drivers added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
