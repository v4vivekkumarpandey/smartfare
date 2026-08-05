import Script from "next/script";
import { site } from "@/lib/site";

// EEA + UK + Switzerland — default consent denied here until the user accepts.
const EEA = [
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT",
  "LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO",
  "GB","CH",
];

export function Analytics() {
  const { gaId, adsId } = site;
  // Nothing to load if neither tag is configured.
  if (!gaId && !adsId) return null;

  const primaryId = gaId || adsId;

  return (
    <>
      {/* Consent Mode v2 defaults — must run BEFORE the gtag library loads. */}
      <Script id="consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          // Baseline: allowed (non-EEA regions, e.g. US/IN)
          gtag('consent', 'default', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            analytics_storage: 'granted'
          });
          // EEA/UK/CH: denied until the user accepts the consent banner
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            region: ${JSON.stringify(EEA)},
            wait_for_update: 500
          });
          // Re-apply any prior choice this browser made
          try {
            var c = localStorage.getItem('sf_consent');
            if (c === 'accepted') gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
            if (c === 'declined') gtag('consent','update',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
          } catch (e) {}
        `}
      </Script>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          ${gaId ? `gtag('config', '${gaId}');` : ""}
          ${adsId ? `gtag('config', '${adsId}');` : ""}
        `}
      </Script>
    </>
  );
}
