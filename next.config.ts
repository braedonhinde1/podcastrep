import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pg is a Node-only module (uses net/tls). Keep it as a runtime require
  // instead of bundling it through Turbopack/webpack.
  serverExternalPackages: ["pg"],
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
