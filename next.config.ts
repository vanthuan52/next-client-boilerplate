import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Define the base Next.js configuration
const baseConfig: NextConfig = {
  eslint: {
    dirs: ['./src'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

// Initialize the Next-Intl plugin
const configWithPlugins = createNextIntlPlugin(
  './src/packages/i18n/request.ts',
)(baseConfig);

const nextConfig = configWithPlugins;
export default nextConfig;
