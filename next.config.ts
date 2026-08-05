import type { NextConfig } from "next";

// 静态导出：产物为纯静态站点，可部署到任意静态托管
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // 静态导出模式下不使用 Next 图片优化服务
    unoptimized: true,
  },
};

export default nextConfig;
