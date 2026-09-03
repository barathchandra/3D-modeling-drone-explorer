import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  /** Allow LAN devices (phone/tablet) on local network to load /_next/* without dev cross-origin warnings */
  allowedDevOrigins: [
    "192.168.203.164",
    "192.168.203.*",
    "192.168.*.*",
    "192.168.1.*",
    "10.*.*.*",
    "172.16.*.*",
    "localhost",
    "127.0.0.1",
  ],
};

export default nextConfig;
