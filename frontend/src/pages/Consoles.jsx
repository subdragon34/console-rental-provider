import { useEffect, useState } from "react";
import api from "../api";

export default function Consoles() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/consoles");
        setItems(res.data);
      } catch (e) {
        setErr(e?.response?.data?.message || e.message);
      }
    })();
  }, []);

  return (
    <div>
      <h2 className="h1">Consoles</h2>
      <p className="muted">Available consoles for rent</p>

      {err && <p className="error">{err}</p>}

      <div className="grid">
        {items.map((c) => (
          <div key={c._id} className="card">
            <h3 style={{ marginTop: 0 }}>
              {c.brand} — {c.model}
            </h3>

            <p><b>Condition:</b> {c.condition}</p>
            <p><b>Daily price:</b> ${c.dailyPrice}</p>
            <p>
              <b>Specs:</b>{" "}
              {c.specs?.storage || "—"} {c.specs?.edition || ""}
            </p>
            <p>
              <b>Tags:</b>{" "}
              {(c.tags && c.tags.length > 0) ? c.tags.join(", ") : "—"}
            </p>
            <p><b>Total rentals:</b> {c.totalRentals}</p>

            <small className="muted">ID: {c._id}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
