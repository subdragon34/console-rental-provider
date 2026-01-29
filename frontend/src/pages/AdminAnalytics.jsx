import { useState } from "react";
import api from "../api";

export default function AdminAnalytics() {
  const [top, setTop] = useState([]);
  const [rev, setRev] = useState([]);
  const [msg, setMsg] = useState("");

  const loadTop = async () => {
    setMsg("");
    try {
      const res = await api.get("/analytics/top-consoles");
      setTop(res.data);
    } catch (e) {
      setMsg(e?.response?.data?.message || e.message);
    }
  };

  const loadRev = async () => {
    setMsg("");
    try {
      const res = await api.get("/analytics/revenue-monthly");
      setRev(res.data);
    } catch (e) {
      setMsg(e?.response?.data?.message || e.message);
    }
  };

  return (
    <div>
      <h2 className="h1">Admin Analytics</h2>
      <p className="muted">
        These endpoints are <b>admin-only</b>. If you see “Admin only”, login with an admin account.
      </p>

      {msg && (
        <p className={msg.startsWith("✅") ? "success" : "error"} style={{ marginTop: 10 }}>
          {msg}
        </p>
      )}

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn" onClick={loadTop}>Load Top Consoles</button>
          <button className="btn" onClick={loadRev}>Load Revenue Monthly</button>
        </div>
        <p className="muted" style={{ marginTop: 10, marginBottom: 0 }}>
          Tip: generate a couple rentals + return them to see revenue change.
        </p>
      </div>

      <div className="grid" style={{ marginTop: 16 }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Top Consoles (Demand + Revenue)</h3>
          {top.length === 0 ? (
            <p className="muted">No data loaded yet. Click “Load Top Consoles”.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    <th style={{ padding: "8px 6px", borderBottom: "1px solid #1f2a37" }}>Console</th>
                    <th style={{ padding: "8px 6px", borderBottom: "1px solid #1f2a37" }}>Rentals</th>
                    <th style={{ padding: "8px 6px", borderBottom: "1px solid #1f2a37" }}>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {top.map((x, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: "8px 6px", borderBottom: "1px solid #1f2a37" }}>
                        {x.brand} {x.model}
                      </td>
                      <td style={{ padding: "8px 6px", borderBottom: "1px solid #1f2a37" }}>
                        {x.rentalsCount}
                      </td>
                      <td style={{ padding: "8px 6px", borderBottom: "1px solid #1f2a37" }}>
                        ${x.revenue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Revenue by Month</h3>
          {rev.length === 0 ? (
            <p className="muted">No data loaded yet. Click “Load Revenue Monthly”.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    <th style={{ padding: "8px 6px", borderBottom: "1px solid #1f2a37" }}>Year</th>
                    <th style={{ padding: "8px 6px", borderBottom: "1px solid #1f2a37" }}>Month</th>
                    <th style={{ padding: "8px 6px", borderBottom: "1px solid #1f2a37" }}>Rentals</th>
                    <th style={{ padding: "8px 6px", borderBottom: "1px solid #1f2a37" }}>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {rev.map((x, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: "8px 6px", borderBottom: "1px solid #1f2a37" }}>{x.year}</td>
                      <td style={{ padding: "8px 6px", borderBottom: "1px solid #1f2a37" }}>{x.month}</td>
                      <td style={{ padding: "8px 6px", borderBottom: "1px solid #1f2a37" }}>{x.rentalsCount}</td>
                      <td style={{ padding: "8px 6px", borderBottom: "1px solid #1f2a37" }}>${x.totalRevenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
