// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import Vehicles from "./pages/Vehicles";
// import Drivers from "./pages/Drivers";
// import DailyLogs from "./pages/DailyLogs";
// import Income from "./pages/Income";
// import Reports from "./pages/Reports";
// import Settings from "./pages/Settings";

// function App() {

//   const isLoggedIn = localStorage.getItem("token");


//   const logout = () => {
//   localStorage.removeItem("token");
//   window.location.href = "/login";
// };


//   return (
//     <BrowserRouter>

//       {/* Show Navbar only when logged in */}
//       {isLoggedIn && (
//         <div>
//           <Navbar />

//           {/* logout button right side */}
//           <div style={{ textAlign: "right", padding: "10px" }}>
//             <button
//               onClick={logout}
//               style={{
//                 padding: "8px 15px",
//                 background: "crimson",
//                 border: "none",
//                 color: "white",
//                 borderRadius: "5px",
//                 cursor: "pointer"
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       )}

//       <Routes>

//         {/* Public */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected */}
//         <Route path="/" element={
//           <ProtectedRoute><Dashboard /></ProtectedRoute>
//         }/>

//         <Route path="/vehicles" element={
//           <ProtectedRoute><Vehicles /></ProtectedRoute>
//         }/>

//         <Route path="/drivers" element={
//           <ProtectedRoute><Drivers /></ProtectedRoute>
//         }/>

//         <Route path="/daily-logs" element={
//           <ProtectedRoute><DailyLogs /></ProtectedRoute>
//         }/>

//         <Route path="/income" element={
//           <ProtectedRoute><Income /></ProtectedRoute>
//         }/>

//         <Route path="/reports" element={
//           <ProtectedRoute><Reports /></ProtectedRoute>
//         }/>

//         <Route path="/settings" element={
//           <ProtectedRoute><Settings /></ProtectedRoute>
//         }/>

//       </Routes>

//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Drivers from "./pages/Drivers";
import DailyLogs from "./pages/DailyLogs";
import Income from "./pages/Income";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import VehicleProfit from "./pages/VehicleProfit";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(null);
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>

      {isLoggedIn && (
        <div>
          <Navbar />
          <div style={{ textAlign: "right", padding: "10px" }}>
            <button
              onClick={logout}
              style={{
                padding: "8px 15px",
                background: "crimson",
                border: "none",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      <Routes>

  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path="/vehicles" element={<ProtectedRoute><Vehicles /></ProtectedRoute>} />
  <Route path="/drivers" element={<ProtectedRoute><Drivers /></ProtectedRoute>} />
  <Route path="/daily-logs" element={<ProtectedRoute><DailyLogs /></ProtectedRoute>} />
  {/* <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} /> */}
  <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

  {/* NEW ROUTE */}
  <Route path="/vehicle-profit" element={<ProtectedRoute><VehicleProfit /></ProtectedRoute>} />

</Routes>


    </BrowserRouter>
  );
}

export default App;

