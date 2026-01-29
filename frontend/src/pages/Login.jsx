import { useState } from "react";
import api from "../api";

export default function Login() {
  const [mode, setMode] = useState("login"); // login | register
  const [name, setName] = useState("Test User");
  const [email, setEmail] = useState("user@test.com");
  const [password, setPassword] = useState("User12345");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    setMsg("");
    try {
      if (mode === "register") {
        await api.post("/auth/register", { name, email, password });
        setMsg("✅ Registered. Now login.");
        setMode("login");
        return;
      }

      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setMsg("✅ Logged in!");
      window.location.href = "/rent";
    } catch (e) {
      setMsg(e?.response?.data?.message || e.message);
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>{mode === "login" ? "Login" : "Register"}</h2>

      {mode === "register" && (
        <div style={{ marginBottom: 10 }}>
          <label>Name</label>
          <input style={{ width: "100%" }} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      )}

      <div style={{ marginBottom: 10 }}>
        <label>Email</label>
        <input style={{ width: "100%" }} value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Password</label>
        <input
          style={{ width: "100%" }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={submit}>{mode === "login" ? "Login" : "Create account"}</button>
      <button onClick={() => setMode(mode === "login" ? "register" : "login")} style={{ marginLeft: 8 }}>
        Switch to {mode === "login" ? "Register" : "Login"}
      </button>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </div>
  );
}
