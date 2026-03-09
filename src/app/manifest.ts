import type { MetadataRoute } from "next";

import pwaMessages from "../../public/locales/cs/pwa.json";

interface PwaMessages {
  description: string;
  name: string;
  shortName: string;
}

const { description, name, shortName } = pwaMessages as PwaMessages;

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    lang: "cs",
    name,
    short_name: shortName,
    description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/images/pwa/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/images/pwa/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/images/pwa/icon-maskable.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
