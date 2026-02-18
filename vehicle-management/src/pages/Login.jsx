// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {

//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const login = async () => {
//     try {
//       const res = await api.post("http://localhost:5000/login", form);

//       // store token
//       localStorage.setItem("token", res.data.token);

//       alert("Login successful");
//       navigate("/");
//     } catch (err) {
//       alert("Invalid login");
//     }
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Login</h2>

//       <input
//         name="username"
//         placeholder="Username"
//         value={form.username}
//         onChange={handleChange}
//         style={input}
//       />

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={handleChange}
//         style={input}
//       />

//       <button onClick={login} style={btn}>
//         Login
//       </button>
//     </div>
//   );
// }

// const input = {
//   display: "block",
//   margin: "10px 0",
//   padding: "10px",
//   width: "250px"
// };

// const btn = {
//   padding: "10px 20px",
//   background: "dodgerblue",
//   color: "white",
//   border: "none",
//   cursor: "pointer"
// };

// import { useState } from "react";
// import api from "../api/axios";

// export default function Login() {

//   const [form, setForm] = useState({
//     username: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const login = async () => {
//     try {
//       const res = await api.post("/login", form);

//       localStorage.setItem("token", res.data.token);

//       window.location.href = "/";
//     } catch {
//       alert("Invalid login");
//     }
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Login</h2>

//       <input
//         name="username"
//         placeholder="Username"
//         value={form.username}
//         onChange={handleChange}
//         style={input}
//       />

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={handleChange}
//         style={input}
//       />

//       <button onClick={login} style={btn}>
//         Login
//       </button>
//     </div>
//   );
// }

// const input = {
//   display: "block",
//   margin: "10px 0",
//   padding: "10px",
//   width: "250px"
// };

// const btn = {
//   padding: "10px 20px",
//   background: "dodgerblue",
//   color: "white",
//   border: "none",
//   cursor: "pointer"
// };

import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const res = await api.post("/login", form);

      localStorage.setItem("token", res.data.token);
      window.location.href = "/";

    } catch {
      alert("Invalid login");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        style={input}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        style={input}
      />

      <button onClick={login} style={btn}>
        Login
      </button>

      {/* Signup option */}
      <p style={{ marginTop: "15px" }}>
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "dodgerblue" }}>
          Register here
        </Link>
      </p>
    </div>
  );
}

const input = {
  display: "block",
  margin: "10px 0",
  padding: "10px",
  width: "250px"
};

const btn = {
  padding: "10px 20px",
  background: "dodgerblue",
  color: "white",
  border: "none",
  cursor: "pointer"
};
