import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';


// Components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AssessmentCenter from './components/AssessmentCenter';
import StudentProgress from './components/StudentProgress';
import ResourceLibrary from './components/ResourceLibrary';
import Navbar from './components/Navbar';
import Teachers from './components/Teachers';
import Learners from './components/Learners';
import ResourceUpload from './components/ResourceUpload';



// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Vite uses import.meta.env instead of process.env
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      {user && <Navbar />}
      
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" /> : <Login />} 
        />

        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/assessments" 
          element={user ? <AssessmentCenter /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/progress" 
          element={user ? <StudentProgress /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/resources" 
          element={user ? <ResourceLibrary /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/" 
          element={<Navigate to={user ? "/dashboard" : "/login"} />} 
        />
        <Route
    path="/teachers"
    element={user ? <Teachers /> : <Navigate to="/login" />}
  />

  <Route
    path="/learners"
    element={user ? <Learners /> : <Navigate to="/login" />}
  />
  <Route 
  path="/upload-resource" 
  element={user ? <ResourceUpload /> : <Navigate to="/login" />} 
/>
</Routes>
</>
  );
}

export default App;
