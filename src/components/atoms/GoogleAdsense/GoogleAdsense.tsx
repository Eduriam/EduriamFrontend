import { useEffect } from "react";

export interface IGoogleAdsense {}

const GoogleAdsense: React.FC<IGoogleAdsense> = () => {
  const adClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  useEffect(() => {
    if (!adClient) {
      return;
    }

    const scriptId = "google-adsense-script";
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;

    document.head.appendChild(script);
  }, [adClient]);

  return null;
};

export default GoogleAdsense;
