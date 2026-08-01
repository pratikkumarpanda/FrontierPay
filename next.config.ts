import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Dev: no basePath, no static export → localhost:3000 works
// Prod: basePath + static export → GitHub Pages at /FrontierPay
const nextConfig: NextConfig = isProd
  ? {
      output: "export",
      basePath: "/FrontierPay",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      images: { unoptimized: true },
    };

export default nextConfig;
