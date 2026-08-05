import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 暂不使用 Next 图片优化服务（无配图阶段保持简单）
    unoptimized: true,
  },
};

export default nextConfig;
