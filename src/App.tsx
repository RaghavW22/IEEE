import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage      from './pages/Landing/LandingPage';
import QRLoginPage      from './pages/Guest/QRLoginPage';
import GuestDashboard   from './pages/Guest/GuestDashboard';
import StaffDashboard   from './pages/Staff/StaffDashboard';
import StaffLoginPage   from './pages/Staff/StaffLoginPage';
import ResponderPortal  from './pages/Responder/ResponderPortal';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#112240',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '12px',
          },
          success: { iconTheme: { primary: '#2ECC71', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#E74C3C', secondary: '#fff' } },
        }}
      />
      <Routes>
        <Route path="/"                element={<LandingPage />} />

        {/* Guest: QR-based login (token in ?token= param or manual entry) */}
        <Route path="/guest-login"     element={<QRLoginPage />} />
        <Route path="/guest-dashboard" element={<GuestDashboard />} />

        {/* Keep /checkin redirect for any old links */}
        <Route path="/checkin"         element={<Navigate to="/guest-login" replace />} />

        {/* Staff & Responder */}
        <Route path="/staff-login"     element={<StaffLoginPage />} />
        <Route path="/staff"           element={<StaffDashboard />} />
        <Route path="/staff-dashboard" element={<Navigate to="/staff" replace />} />
        <Route path="/responder"       element={<ResponderPortal />} />
        <Route path="/responder-portal" element={<Navigate to="/responder" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
