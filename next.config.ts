import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  /** Allow LAN devices (phone/tablet) to load /_next/* in dev — e.g. http://192.168.1.x:3000 */
  allowedDevOrigins: ["192.168.1.3", "192.168.1.*"],
};

export default nextConfig;
