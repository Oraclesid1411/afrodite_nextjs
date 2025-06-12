/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true, // Bonnes pratiques en dev
  // swcMinify: true,       // Minification performante
  // output: 'export',      // Pour un site 100% statique (SSG)

  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint au build (utile en production CI/CD)
  },

  images: {
    unoptimized: true, // Obligatoire avec 'next export'
  },

  webpack(config) {
    return config;
  },

  // Supprimé : "experimental.turbo" car n'existe plus sous cette forme dans Next 14
};

module.exports = nextConfig;
