import type { NextConfig } from "next";

// Static export: plain HTML, CSS and files in out/. No server, no API routes, no cookies.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
