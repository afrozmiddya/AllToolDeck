import React, { useEffect, useRef, useState } from "react";
import { trackAdImpression, trackAdClick } from "@/utils/analytics";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: "true" | "false";
  style?: React.CSSProperties;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slot,
  format = "auto",
  responsive = "true",
  style = { display: "block", minHeight: "280px" }
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [consentGranted, setConsentGranted] = useState(true); // Default to true (Consent Mode v2 compliance)

  useEffect(() => {
    // Check Consent Mode (Consent Mode v2/CookieHub checks)
    const checkConsent = () => {
      if (typeof (window as any).cookiehub !== "undefined") {
        const allowed = (window as any).cookiehub.allowed("advertising");
        setConsentGranted(allowed);
      }
    };
    checkConsent();

    // Use IntersectionObserver to lazy load the ad only when it enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded && consentGranted) {
            try {
              // Inject AdSense push command
              ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
              setIsLoaded(true);
              trackAdImpression(slot);
            } catch (err) {
              console.error("AdSense push failed:", err);
            }
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" } // Load ad 200px before it scrolls into view
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [slot, isLoaded, consentGranted]);

  const handleAdClick = () => {
    trackAdClick(slot);
  };

  if (!consentGranted) {
    // Display a privacy-safe affiliate backup banner when ads are refused by consent manager
    return (
      <div className="w-full text-center p-6 border border-border/20 rounded-2xl bg-surface/10 flex flex-col items-center justify-center space-y-2 min-h-[250px]">
        <span className="text-xs uppercase font-mono font-bold text-primary">Sponsored Affiliate</span>
        <h4 className="font-heading font-bold text-sm text-text">Need Secure Enterprise Hosting?</h4>
        <p className="text-xs text-muted max-w-sm">Deploy high-performance web applications with zero configuration on Netlify.</p>
        <a 
          href="https://www.netlify.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-2 text-xs font-semibold px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg hover:bg-primary/30 transition-colors"
        >
          Learn More
        </a>
      </div>
    );
  }

  return (
    <div 
      ref={adRef} 
      className="ad-container w-full overflow-hidden flex justify-center py-4 bg-surface/5 border border-border/10 rounded-2xl" 
      onClick={handleAdClick}
    >
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-1555555705397171"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};
export default AdBanner;
