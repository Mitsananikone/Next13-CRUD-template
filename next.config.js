/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        connectionString: "mongodb+srv://mitsananikone:Cu48z5a4%21Cu48z5a4%21@development.d9wufpp.mongodb.net/Development",
        secret: 'Medlar75!Medlar75!'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    }
}

module.exports = nextConfig
