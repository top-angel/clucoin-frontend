const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = (phase) => {
  const isDev = phase == PHASE_DEVELOPMENT_SERVER;

  const isProd = phase == PHASE_PRODUCTION_BUILD && process.env.STAGING !== 'true';
  const isStaging = phase == PHASE_PRODUCTION_BUILD && process.env.STAGING === 'true';

  const env = {
    API_URI: (() => {
      if (isDev) return process.env.API_URI ?? "https://staging-api.clucoin.com";
      if (isProd) {
        return "https://api.clucoin.com";
      }
      if (isStaging) {
        return "https://staging-api.clucoin.com";
      }
      return "API_URL:not (isDev,isProd,isStaging)";
    })(),
    AUTH_URI: (() => {
      if (isDev) return process.env.AUTH_URI ?? "https://staging-auth.clucoin.com";
      if (isProd) {
        return "https://auth.clucoin.com";
      }
      if (isStaging) {
        return "https://staging-auth.clucoin.com";
      }
      return "AUTH_URL:not (isDev,isProd,isStaging)";
    })(),
    CLUPANEL_API_URL: (() => {
      if (isDev) return process.env.CLUPANEL_API_URL ?? "https://staging-cms.clucoin.com";
      if (isProd) {
        return "https://cms.clucoin.com";
      }
      if (isStaging) {
        return "https://staging-cms.clucoin.com";
      }
      return "CLUPANEL_API_URL:not (isDev,isProd,isStaging)";
    })(),
    origin: (() => {
      if (isDev) return process.env.origin ?? "http://localhost:3000";
      if (isProd) {
        return "https://www.clucoin.com";
      }
      if (isStaging) {
        return "https://staging.clucoin.com";
      }
      return "origin:not (isDev,isProd,isStaging)";
    })()
  }

  return {
    reactStrictMode: true,
    images: {
      domains: [
        "gateway.pinata.cloud",
        "avatars.clucoin.com",
        "ipfs.clucoin.com",
        "cloudflare-ipfs.com",
        "cms.clucoin.com",
        "ipfs.io",
      ]
    },
    env,
  }
}
