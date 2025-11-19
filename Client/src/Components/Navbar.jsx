import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-indigo-600">LearnLink Kenya</h1>

      <div className="flex gap-6">
        <Link className="hover:text-indigo-600" to="/dashboard">Dashboard</Link>
        <Link className="hover:text-indigo-600" to="/assessments">Assessments</Link>
        <Link className="hover:text-indigo-600" to="/progress">Progress</Link>
        <Link className="hover:text-indigo-600" to="/resources">Resources</Link>

        <button
          onClick={logout}
          className="ml-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
