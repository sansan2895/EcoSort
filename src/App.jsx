import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./Navbar";
import ProtectedRoute from "./ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Scan from "./pages/Scan";
import Reward from "./pages/Reward";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const location = useLocation();

  // halaman tanpa navbar
  const path = location.pathname.toLowerCase();

  const hideNavbar =
    path === "/login" ||
    path === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PRIVATE */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/scan"
          element={
            <ProtectedRoute>
              <Scan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reward"
          element={
            <ProtectedRoute>
              <Reward />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;