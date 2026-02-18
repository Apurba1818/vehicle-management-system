// import { useState } from "react";

// export default function Settings() {

//   // -------- BUSINESS SETTINGS ----------
//   const [settings, setSettings] = useState(() => {
//     return JSON.parse(localStorage.getItem("settings")) || {
//       ownerName: "",
//       businessName: "",
//       contact: "",
//       currency: "₹"
//     };
//   });

//   const handleSettings = (e) => {
//     setSettings({ ...settings, [e.target.name]: e.target.value });
//   };


//   // -------- VEHICLE MANAGEMENT --------
//   const [vehicles, setVehicles] = useState(() => {
//     return JSON.parse(localStorage.getItem("vehicles")) || [];
//   });

//   const [vehicle, setVehicle] = useState({
//     number: "",
//     type: ""
//   });

//   const addVehicle = () => {
//     if (!vehicle.number || !vehicle.type) {
//       alert("Enter vehicle number & type");
//       return;
//     }

//     setVehicles([
//       ...vehicles,
//       {
//         id: vehicles.length + 1,
//         ...vehicle
//       }
//     ]);

//     setVehicle({ number: "", type: "" });
//   };


//   // -------- DRIVER MANAGEMENT --------
//   const [drivers, setDrivers] = useState(() => {
//     return JSON.parse(localStorage.getItem("drivers")) || [];
//   });

//   const [driver, setDriver] = useState({
//     name: "",
//     phone: ""
//   });

//   const addDriver = () => {
//     if (!driver.name || !driver.phone) {
//       alert("Enter driver name & phone");
//       return;
//     }

//     setDrivers([
//       ...drivers,
//       {
//         id: drivers.length + 1,
//         ...driver
//       }
//     ]);

//     setDriver({ name: "", phone: "" });
//   };


//   // -------- SAVE ALL SETTINGS ----------
//   const saveAll = () => {
//     localStorage.setItem("settings", JSON.stringify(settings));
//     localStorage.setItem("vehicles", JSON.stringify(vehicles));
//     localStorage.setItem("drivers", JSON.stringify(drivers));

//     alert("Settings Saved Successfully");
//   };


//   return (
//     <div style={{ padding: "20px" }}>

//       <h2>Settings (Admin Control Panel)</h2>
//       <p>Configure business, vehicles & drivers</p>

//       {/* ---- BUSINESS SETTINGS ---- */}
//       <section style={box}>
//         <h3>Business Details</h3>

//         <input style={input}
//           name="ownerName"
//           placeholder="Owner Name"
//           value={settings.ownerName}
//           onChange={handleSettings}
//         />

//         <input style={input}
//           name="businessName"
//           placeholder="Business Name"
//           value={settings.businessName}
//           onChange={handleSettings}
//         />

//         <input style={input}
//           name="contact"
//           placeholder="Contact"
//           value={settings.contact}
//           onChange={handleSettings}
//         />

//         <select style={input}
//           name="currency"
//           value={settings.currency}
//           onChange={handleSettings}
//         >
//           <option value="₹">₹ Rupee</option>
//           <option value="$">$ Dollar</option>
//           <option value="€">€ Euro</option>
//         </select>
//       </section>


//       {/* ---- VEHICLE SECTION ---- */}
//       <section style={box}>
//         <h3>Manage Vehicles</h3>

//         <div style={{ display: "flex", gap: "10px" }}>
//           <input style={input}
//             placeholder="Vehicle Number"
//             value={vehicle.number}
//             onChange={(e) =>
//               setVehicle({ ...vehicle, number: e.target.value })
//             }
//           />

//           <input style={input}
//             placeholder="Type (Bus/Car)"
//             value={vehicle.type}
//             onChange={(e) =>
//               setVehicle({ ...vehicle, type: e.target.value })
//             }
//           />

//           <button style={btn} onClick={addVehicle}>
//             Add Vehicle
//           </button>
//         </div>

//         <ul>
//           {vehicles.map(v => (
//             <li key={v.id}>{v.number} — {v.type}</li>
//           ))}
//         </ul>
//       </section>


//       {/* ---- DRIVER SECTION ---- */}
//       <section style={box}>
//         <h3>Manage Drivers</h3>

//         <div style={{ display: "flex", gap: "10px" }}>
//           <input style={input}
//             placeholder="Driver Name"
//             value={driver.name}
//             onChange={(e) =>
//               setDriver({ ...driver, name: e.target.value })
//             }
//           />

//           <input style={input}
//             placeholder="Phone"
//             value={driver.phone}
//             onChange={(e) =>
//               setDriver({ ...driver, phone: e.target.value })
//             }
//           />

//           <button style={btn} onClick={addDriver}>
//             Add Driver
//           </button>
//         </div>

//         <ul>
//           {drivers.map(d => (
//             <li key={d.id}>{d.name} — {d.phone}</li>
//           ))}
//         </ul>
//       </section>


//       <button style={saveBtn} onClick={saveAll}>
//         SAVE ALL SETTINGS
//       </button>

//     </div>
//   );
// }



// const box = {
//   background: "#222",
//   color: "white",
//   padding: "20px",
//   borderRadius: "10px",
//   marginTop: "20px"
// };

// const input = {
//   padding: "10px",
//   margin: "5px",
//   borderRadius: "5px",
//   border: "1px solid gray"
// };

// const btn = {
//   padding: "10px",
//   background: "teal",
//   color: "white",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer"
// };

// const saveBtn = {
//   padding: "12px 25px",
//   marginTop: "20px",
//   background: "orange",
//   color: "black",
//   border: "none",
//   borderRadius: "8px",
//   cursor: "pointer",
//   fontWeight: "bold"
// };

import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Settings() {

  const [settings, setSettings] = useState({
    ownerName: "",
    businessName: "",
    contact: "",
    currency: "₹"
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const res = await api.get("http://localhost:5000/settings");
    if(res.data){
      setSettings(res.data);
    }
  };

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const saveSettings = async () => {
    await api.post("http://localhost:5000/settings", settings);
    alert("Settings saved");
  };

  return (
    <div style={{ padding:"20px" }}>
      <h2>Business Settings</h2>

      <input name="ownerName" placeholder="Owner Name"
        value={settings.ownerName} onChange={handleChange} style={input}/>

      <input name="businessName" placeholder="Business Name"
        value={settings.businessName} onChange={handleChange} style={input}/>

      <input name="contact" placeholder="Contact"
        value={settings.contact} onChange={handleChange} style={input}/>

      <select name="currency" value={settings.currency} onChange={handleChange} style={input}>
        <option value="₹">₹ Rupee</option>
        <option value="$">$ Dollar</option>
        <option value="€">€ Euro</option>
      </select>

      <br/><br/>
      <button onClick={saveSettings} style={btn}>
        Save Settings
      </button>
    </div>
  );
}

const input = {
  display:"block",
  margin:"10px 0",
  padding:"10px",
  width:"300px"
};

const btn = {
  padding:"10px 20px",
  background:"orange",
  border:"none",
  cursor:"pointer"
};
