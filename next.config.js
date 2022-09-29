/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_SUPBASE_URL: this.env.NEXT_PUBLIC_SUPBASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: this.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_API_BASE_URL: this.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_ACCESS_TOKEN: this.env.NEXT_PUBLIC_ACCESS_TOKEN,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: this.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    NEXT_PUBLIC_REVALIDATE_SECRET: this.env.NEXT_PUBLIC_REVALIDATE_SECRET
  }
}

module.exports = nextConfig
