import type { NextConfig } from "next"


const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  webpack(config, options) {
    config.module.rules.push({
      test: /.*\.(glb|gltf)$/,
      use: {
        loader: "file-loader"
      }
    })
    return config
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

export default nextConfig
