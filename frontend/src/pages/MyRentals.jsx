import { useEffect, useState } from "react";
import api from "../api";

export default function MyRentals() {
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setMsg("");
    const res = await api.get("/rentals/my");
    setItems(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const doReturn = async (id) => {
    setMsg("");
    try {
      await api.patch(`/rentals/${id}/return`);
      setMsg("✅ Returned!");
      await load();
    } catch (e) {
      setMsg(e?.response?.data?.message || e.message);
    }
  };

  const doCancel = async (id) => {
    setMsg("");
    try {
      await api.patch(`/rentals/${id}/cancel`);
      setMsg("✅ Cancelled!");
      await load();
    } catch (e) {
      setMsg(e?.response?.data?.message || e.message);
    }
  };

  return (
    <div>
      <h2 className="h1">My Rentals</h2>
      <p className="muted">Manage your rentals: return or cancel active rentals</p>

      {msg && (
        <p className={msg.startsWith("✅") ? "success" : "error"} style={{ marginTop: 10 }}>
          {msg}
        </p>
      )}

      {items.length === 0 ? (
        <div className="card" style={{ marginTop: 16 }}>
          <p className="muted" style={{ margin: 0 }}>
            No rentals yet. Go to <b>Rent</b> to create one.
          </p>
        </div>
      ) : (
        <div className="grid" style={{ marginTop: 16 }}>
          {items.map((r) => (
            <div key={r._id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div className="h2" style={{ marginBottom: 6 }}>
                    {r.consoleId ? `${r.consoleId.brand} — ${r.consoleId.model}` : "Rental"}
                  </div>
                  <div className="muted">
                    <b>Status:</b> {r.status}
                  </div>
                </div>
                <div className="muted" style={{ textAlign: "right" }}>
                  <div><b>Total:</b> ${r.totalPrice}</div>
                </div>
              </div>

              <hr style={{ border: 0, borderTop: "1px solid #1f2a37", margin: "12px 0" }} />

              <div className="muted">
                <div>
                  <b>Dates:</b> {String(r.startDate).slice(0, 10)} → {String(r.endDate).slice(0, 10)}
                </div>

                {r.returnLog?.returnedAt && (
                  <div style={{ marginTop: 8 }}>
                    <b>Returned:</b> {String(r.returnLog.returnedAt).slice(0, 19)}{" "}
                    | <b>Late days:</b> {r.returnLog.lateDays}{" "}
                    | <b>Fine:</b> ${r.returnLog.fine}
                  </div>
                )}
              </div>

              <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
                <button className="btn" disabled={r.status !== "active"} onClick={() => doReturn(r._id)}>
                  Return
                </button>
                <button className="btn" disabled={r.status !== "active"} onClick={() => doCancel(r._id)}>
                  Cancel
                </button>
              </div>

              <small className="muted" style={{ display: "block", marginTop: 10 }}>
                Rental ID: {r._id}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
