import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
}
const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig)
