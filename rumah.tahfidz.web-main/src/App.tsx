import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProgramsPage from './pages/ProgramPage';
import ProfilePage from './pages/profile/ProfilePage';
import StructureProfile from './pages/profile/StructureProfile';
import StructureDetail from './pages/profile/StructureDetail';
import ReportPage from './pages/ReportPage';
import NewsPage from './pages/news/NewsPage';
import Dashboard from './pages/admin/Dashboard';
import NewsDetailPage from './pages/news/NewsDetailPage';
import DonationPage from './pages/donation/DonationPage';
import DonationForm from './pages/donation/DonationForm';
import ThankYouPage from './pages/donation/ThankYouPage';
import BuildingPage from './pages/building/BuildingPage';
import LandingPage from './pages/landing/LandingPage';

// Admin Pages 
import HeroSettings from './pages/admin/hero/HeroSettings';
import FinanceMonitoring from './pages/admin/finance/FinanceMonitoring';
import NewsManagement from './pages/admin/news/NewsManagement';
import StructureManagement from './pages/admin/structure/StructureManagement';
import ProgramManagement from './pages/admin/program/ProgramManagement';

// placeholder Login belum dibuat
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginAdmin from './pages/admin/LoginAdmin';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* --- ROUTING USER (PUBLIK) --- */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="program" element={<ProgramsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="structure" element={<StructureProfile />} />
            <Route path="profile/:id" element={<StructureDetail />} />
            <Route path="report" element={<ReportPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:id" element={<NewsDetailPage />} />
            <Route path="donation">
              <Route path="general" element={<DonationPage />} />
              <Route path="form" element={<DonationForm />} />
              <Route path="thank-you" element={<ThankYouPage />} />
            </Route>
            <Route path="building" element={<BuildingPage />} />
          </Route>

          {/* --- ROUTING ADMIN --- */}
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="hero" element={<HeroSettings />} />
              <Route path="structure" element={<StructureManagement />} />
              <Route path="finance" element={<FinanceMonitoring />} />
              <Route path="news" element={<NewsManagement />} />
              <Route path="program" element={<ProgramManagement />} />
            </Route>
          </Route>

          {/* Halaman 404 (Jika user asal ketik URL) */}
          <Route path="*" element={<div className="p-20 text-center text-red-500 font-bold">404 - Halaman Tidak Ditemukan</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;