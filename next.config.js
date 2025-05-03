const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react'
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });
    
    return config
  },
  experimental: {
    serverComponentsExternalPackages: ['@getbrevo/brevo']
  }
}

module.exports = withMDX(nextConfig)
