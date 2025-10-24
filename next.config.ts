// next.config.ts
import type { NextConfig } from "next";

/*
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});
*/

const nextConfig: NextConfig = {
    poweredByHeader: false,
};

export default nextConfig;
// module.exports = withBundleAnalyzer(nextConfig);
