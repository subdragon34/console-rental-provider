import { useEffect, useState } from "react";
import api from "../api";

export default function Rent() {
  const [consoles, setConsoles] = useState([]);
  const [consoleId, setConsoleId] = useState("");
  const [startDate, setStartDate] = useState("2026-01-29");
  const [endDate, setEndDate] = useState("2026-02-02");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const res = await api.get("/consoles");
      setConsoles(res.data);
      if (res.data[0]) setConsoleId(res.data[0]._id);
    })();
  }, []);

  const createRental = async () => {
    setMsg("");
    try {
      const res = await api.post("/rentals", {
        consoleId,
        startDate,
        endDate
      });
      setMsg(`✅ Rental created. Total price: $${res.data.totalPrice}`);
    } catch (e) {
      setMsg(e?.response?.data?.message || e.message);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 560 }}>
      <h2 className="h1">Rent a Console</h2>
      <p className="muted">Choose dates and confirm your rental</p>

      <div style={{ marginBottom: 12 }}>
        <label className="label">Console</label>
        <select
          className="input"
          value={consoleId}
          onChange={(e) => setConsoleId(e.target.value)}
        >
          {consoles.map((c) => (
            <option key={c._id} value={c._id}>
              {c.brand} {c.model} (${c.dailyPrice}/day)
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label className="label">Start date</label>
        <input
          type="date"
          className="input"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label className="label">End date</label>
        <input
          type="date"
          className="input"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <button className="btn" onClick={createRental}>
        Create rental
      </button>

      {msg && (
        <p style={{ marginTop: 12 }} className={msg.startsWith("✅") ? "success" : "error"}>
          {msg}
        </p>
      )}
    </div>
  );
}
