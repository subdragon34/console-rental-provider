import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Consoles from "./pages/Consoles";
import Rent from "./pages/Rent";
import MyRentals from "./pages/MyRentals";
import AdminAnalytics from "./pages/AdminAnalytics";

function getToken() {
  return localStorage.getItem("token");
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

function ProtectedRoute({ children }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const token = getToken();

  return (
  <div className="app">
    <header className="navbar">
      <div className="nav-left">
        <Link className="brand" to="/consoles">ConsoleRent</Link>
        <Link to="/consoles">Consoles</Link>
        <Link to="/rent">Rent</Link>
        <Link to="/my-rentals">My Rentals</Link>
        <Link to="/admin-analytics">Analytics</Link>
      </div>

      <div className="nav-right">
        {token ? (
          <button className="btn" onClick={logout}>Logout</button>
        ) : (
          <Link className="btn" to="/login">Login</Link>
        )}
      </div>
    </header>

    <main className="container">
      <Routes>
        <Route path="/" element={<Navigate to="/consoles" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/consoles" element={<Consoles />} />
        <Route path="/rent" element={<ProtectedRoute><Rent /></ProtectedRoute>} />
        <Route path="/my-rentals" element={<ProtectedRoute><MyRentals /></ProtectedRoute>} />
        <Route path="/admin-analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </main>
  </div>
);

}
