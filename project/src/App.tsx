import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientRecords from './pages/PatientRecords';
import StaffManagement from './pages/StaffManagement';
import Billing from './pages/Billing';
import Inventory from './pages/Inventory';
import LabIntegration from './pages/LabIntegration';
import Analytics from './pages/Analytics';
import Layout from './components/Layout';
import { useAuth } from './contexts/AuthContext';
import PatientRegistration from './pages/PatientRegistration';
import MedicalRecords from './pages/MedicalRecords';
import Appointments from './pages/Appointments';
import Discharge from './pages/Discharge';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<PatientRecords />} />
        <Route path="patients/registration" element={<PatientRegistration />} />
        <Route path="patients/medical-records" element={<MedicalRecords />} />
        <Route path="patients/appointments" element={<Appointments />} />
        <Route path="patients/discharge" element={<Discharge />} />
        <Route path="staff" element={<StaffManagement />} />
        <Route path="billing" element={<Billing />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="lab" element={<LabIntegration />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;