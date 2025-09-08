/* eslint @typescript-eslint/no-var-requires: "off" */
const { i18n } = require('./next-i18next.config');
const { withSentryConfig } = require('@sentry/nextjs');
const withTM = require('next-transpile-modules')(['@jitsi/react-sdk']);
const webpack = require('webpack');


/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // set aliases to false for client-side build for these modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        'graceful-fs': false,
        'readdir-glob': false,
        events: require.resolve('events/'),
        'fs/promises': false,
      };
    }

    // Remove the node: prefix for all imports
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      })
    );

    return config;
  },
   typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
   env: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    FRONTEND_INTEGRATION_URL: process.env.FRONTEND_INTEGRATION_URL,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'boxyhq.com',
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      { hostname: "avatar.vercel.sh", port: "", protocol: "https" },
      { hostname: "res.cloudinary.com", port: "", protocol: "https" },
      { hostname: "once-ui.com", port: "", protocol: "https" },
      { hostname: "images.unsplash.com", port: "", protocol: "https" },
      { hostname: "c.saavncdn.com", port: "", protocol: "https" },
      { hostname: "lh3.googleusercontent.com", port: "", protocol: "https" },
      { hostname: "avatars.githubusercontent.com", port: "", protocol: "https" },
      { hostname: "ui8-bento-elements.vercel.app", port: "", protocol: "https" },
      { hostname: "pixabay.com", port: "", protocol: "https" },
      { hostname: "uploadthing.com", port: "", protocol: "https" },
      { hostname: "api.dicebear.com", port: "", protocol: "https" },
      { hostname: "utfs.io", port: "", protocol: "https" },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'conferiotestbkt.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/serverImage/**',
      },
      {
        protocol: 'https',
        hostname: 'ssl.gstatic.com',
        port: '',
      },
       {
        protocol: 'https',
        hostname: 'lh3.googleus',
        port: '',
      },
      
    ],

  },
  i18n,
  rewrites: async () => {
    return [
      {
        source: '/.well-known/saml.cer',
        destination: '/api/well-known/saml.cer',
      },
      {
        source: '/.well-known/saml-configuration',
        destination: '/well-known/saml-configuration',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*?)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains;',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
});

// Additional config options for the Sentry webpack plugin.
// For all available options: https://github.com/getsentry/sentry-webpack-plugin#options.
const sentryWebpackPluginOptions = {
  silent: true,
  hideSourceMaps: true,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
