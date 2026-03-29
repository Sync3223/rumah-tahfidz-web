import { useEffect, useState } from 'react';

/**
 * Custom hook to dynamically load the Midtrans Snap script
 * into the React application gracefully.
 * 
 * @param clientKey 
 * @param isProduction 
 */
export const useMidtransSnap = (clientKey: string, isProduction: boolean = false) => {
  const [snapReady, setSnapReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If it's already on the window object, snap is ready
    if (window.snap) {
      setSnapReady(true);
      return;
    }

    const scriptId = 'midtrans-snap-script';
    const scriptUrl = isProduction 
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js';

    // Prevent duplicate injections
    if (document.getElementById(scriptId)) {
        return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = scriptUrl;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;

    script.onload = () => {
      setSnapReady(true);
    };

    script.onerror = () => {
      setError(new Error('Gagal memuat script Midtrans Drop-in'));
    };

    document.body.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      const addedScript = document.getElementById(scriptId);
      if (addedScript) {
        document.body.removeChild(addedScript);
      }
    };
  }, [clientKey, isProduction]);

  return { snapReady, error };
};
