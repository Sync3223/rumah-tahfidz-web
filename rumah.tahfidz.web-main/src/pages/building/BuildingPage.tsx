import { lazy, Suspense, useState, useEffect } from 'react';
import BuildingHero from './BuildingHero';

const BuildingProgress = lazy(() => import('./BuildingProgress'));
const BuildingGallery = lazy(() => import('./BuildingGallery'));
const BuildingPlan = lazy(() => import('./BuildingPlan'));

const BuildingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-white transition-all duration-1000 ease-out transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      {/* loading state komponen lazy */}
      <Suspense fallback={<div className="min-h-[50vh] w-full bg-gray-50 animate-pulse" />}>
        <BuildingHero />
        <BuildingPlan />
        <BuildingProgress />
        <BuildingGallery />
      </Suspense>
    </div>
  );
};

export default BuildingPage;