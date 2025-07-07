import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",  // ✅ renamed from username
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: form.name,      // ✅ correct key
        email: form.email,
        password: form.password,
        role: "user"          // optional, default is 'user' on backend
      });
      console.log("✅ Registered:", res.data);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("❌ Registration error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "2rem" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label><br />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label><br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label><br />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>Register</button>
      </form>
    </div>
  );
}

export default Register;
