import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Une seule politique de confidentialité, celle de l'app, pour les deux sites.
  // L'ancre (#cookies) n'est pas envoyée au serveur : le navigateur la conserve après la redirection.
  async redirects() {
    return [
      {
        source: "/politique-confidentialite",
        destination: "https://app.monassistantkine.fr/legal/politique-confidentialite.html",
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    // 90 : photo du hero, sinon flou visible sur grand écran
    qualities: [75, 90],
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.supabase.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "d1yei2z3i6k35z.cloudfront.net" },
    ],
  },
};

export default nextConfig;
