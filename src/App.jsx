import { Routes, Route } from "react-router-dom";
import Login from "./Assignment/pages/Login";
import Dashboard from "./Assignment/pages/Dashboard";
import ProtectedRoute from "./Assignment/components/ProtectedRoute";

const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default App;
