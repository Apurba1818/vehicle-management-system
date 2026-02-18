// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {

//   const navigate = useNavigate();

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const registerUser = () => {

//     if(!user.name || !user.email || !user.password){
//       alert("Please fill all fields");
//       return;
//     }

//     // TEMP — saving user to localStorage
//     localStorage.setItem("user", JSON.stringify(user));

//     alert("Account created! Now login");
//     navigate("/login");
//   };

//   return (
//     <div style={box}>
//       <h2>Signup</h2>

//       <input
//         style={input}
//         name="name"
//         placeholder="Full Name"
//         value={user.name}
//         onChange={handleChange}
//       />

//       <input
//         style={input}
//         name="email"
//         placeholder="Email"
//         value={user.email}
//         onChange={handleChange}
//       />

//       <input
//         style={input}
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={user.password}
//         onChange={handleChange}
//       />

//       <button style={btn} onClick={registerUser}>
//         Create Account
//       </button>

//       <p onClick={() => navigate("/login")} style={{cursor:"pointer"}}>
//         Already have account? Login
//       </p>
//     </div>
//   );
// }

// const box = {
//   width: "400px",
//   margin: "80px auto",
//   padding: "20px",
//   background: "#222",
//   color: "white",
//   borderRadius: "10px",
//   textAlign: "center"
// };

// const input = {
//   padding: "10px",
//   width: "90%",
//   margin: "10px",
//   borderRadius: "5px",
//   border: "1px solid gray"
// };

// const btn = {
//   padding: "10px 25px",
//   borderRadius: "5px",
//   border: "none",
//   background: "green",
//   color: "white",
//   cursor: "pointer"
// };
import { useState } from "react";
import api from "../api/axios";

export default function Signup() {

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    try {
      await api.post("/register", form);

      alert("Registration successful");
      window.location.href = "/login";

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Signup</h2>

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

      <button onClick={signup} style={btn}>
        Signup
      </button>
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
  background: "green",
  color: "white",
  border: "none",
  cursor: "pointer"
};
