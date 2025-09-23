import { useEffect } from 'react';
import { ClientOnly } from '../lib/client-only';

// Extend Window interface to include gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
}

function GoogleAnalyticsScript({ measurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Define gtag function
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }

    // Make gtag globally available
    window.gtag = gtag;

    // Initialize GA
    gtag('js', new Date());
    gtag('config', measurementId);

    // Load GA script asynchronously after component mount
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;

    // Add script to head
    document.head.appendChild(script);

    // Cleanup function to remove script if component unmounts
    return () => {
      const existingScript = document.querySelector(`script[src*="${measurementId}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [measurementId]);

  return null;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  return (
    <ClientOnly>
      <GoogleAnalyticsScript measurementId={measurementId} />
    </ClientOnly>
  );
}
