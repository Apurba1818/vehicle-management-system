// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Vehicles() {

//   const [vehicles, setVehicles] = useState([]);

//   const [newVehicle, setNewVehicle] = useState({
//     number: "",
//     type: "",
//     status: ""
//   });

//   // Load vehicles from backend
//   useEffect(() => {
//     fetchVehicles();
//   }, []);

//   const fetchVehicles = async () => {
//     const res = await axios.get("http://localhost:5000/vehicles");
//     setVehicles(res.data);
//   };

//   const handleChange = (e) => {
//     setNewVehicle({ ...newVehicle, [e.target.name]: e.target.value });
//   };

//   const addVehicle = async () => {

//     if (!newVehicle.number || !newVehicle.type || !newVehicle.status) {
//       alert("Fill all fields");
//       return;
//     }

//     await axios.post("http://localhost:5000/vehicles", newVehicle);

//     setNewVehicle({ number: "", type: "", status: "" });

//     fetchVehicles(); // refresh list
//   };

//   return (
//     <div style={{ padding: "20px" }}>

//       <h2>Vehicles</h2>

//       <div style={formContainer}>
//         <input
//           style={inputStyle}
//           name="number"
//           placeholder="Vehicle Number"
//           value={newVehicle.number}
//           onChange={handleChange}
//         />

//         <input
//           style={inputStyle}
//           name="type"
//           placeholder="Vehicle Type"
//           value={newVehicle.type}
//           onChange={handleChange}
//         />

//         <input
//           style={inputStyle}
//           name="status"
//           placeholder="Status"
//           value={newVehicle.status}
//           onChange={handleChange}
//         />

//         <button style={btnStyle} onClick={addVehicle}>
//           Add Vehicle
//         </button>
//       </div>

//       <table style={tableStyle}>
//         <thead>
//           <tr>
//             <th style={th}>ID</th>
//             <th style={th}>Number</th>
//             <th style={th}>Type</th>
//             <th style={th}>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {vehicles.map(v => (
//             <tr key={v.id}>
//               <td style={td}>{v.id}</td>
//               <td style={td}>{v.number}</td>
//               <td style={td}>{v.type}</td>
//               <td style={td}>{v.status}</td>
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
//   marginBottom: "20px"
// };

// const inputStyle = {
//   padding: "10px",
//   borderRadius: "5px",
//   border: "1px solid gray"
// };

// const btnStyle = {
//   padding: "10px 20px",
//   background: "dodgerblue",
//   border: "none",
//   color: "white",
//   borderRadius: "5px",
//   cursor: "pointer"
// };

// const tableStyle = {
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




export default function Vehicles() {

  const [vehicles, setVehicles] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    number: "",
    type: "",
    status: ""
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const res = await api.get("http://localhost:5000/vehicles");
    setVehicles(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitVehicle = async () => {

    if(editingId){
      await api.put(`http://localhost:5000/vehicles/${editingId}`, form);
      setEditingId(null);
    }else{
      await api.post("http://localhost:5000/vehicles", form);
    }

    setForm({ number:"", type:"", status:"" });
    fetchVehicles();
  };

  const editVehicle = (v) => {
    setForm(v);
    setEditingId(v.id);
  };

  const deleteVehicle = async (id) => {
    await api.delete(`http://localhost:5000/vehicles/${id}`);
    fetchVehicles();
  };

  return (
    <div style={{ padding:"20px" }}>
      <h2>Vehicles</h2>

      <div style={{ display:"flex", gap:"10px", marginBottom:"20px" }}>
        <input name="number" placeholder="Number" value={form.number} onChange={handleChange}/>
        <input name="type" placeholder="Type" value={form.type} onChange={handleChange}/>
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange}/>
        <button onClick={submitVehicle}>
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Number</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map(v => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.number}</td>
              <td>{v.type}</td>
              <td>{v.status}</td>
              <td>
                <button onClick={()=>editVehicle(v)}>Edit</button>
                <button onClick={()=>deleteVehicle(v.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
