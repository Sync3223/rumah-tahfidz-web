import { lazy, Suspense } from 'react';
import HeroSection from './HeroSection';

// Gunakan lazy loading untuk komponen di bawah fold (tidak langsung terlihat)
const StatsSection = lazy(() => import('./StatsSection'));
const ProgramSection = lazy(() => import('./ProgramSection'));
const NewsSection = lazy(() => import('./NewsSection'));
const ProfileSection = lazy(() => import('./ProfileSection'));
const ReportSection = lazy(() => import('./ReportSection'));

const LandingPage = () => {
  return (
    <div className="w-full">
      <HeroSection />
      {/* loading state komponen lazy */}
      <Suspense fallback={<div className="min-h-[50vh] w-full bg-gray-50 animate-pulse" />}>
        <ProgramSection />
        <ProfileSection />
        <StatsSection />
        <ReportSection />
        <NewsSection />
      </Suspense>
    </div>
  );
};

export default LandingPage;