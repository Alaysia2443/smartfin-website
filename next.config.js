/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // don't attempt to import these modules on the client
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                pg: false
            };
        }
        return config;
    },
};

module.exports = {
    images: {
        domains: [
            'img.freepik.com',
            'images-na.ssl-images-amazon.com',
            'static.vecteezy.com',
            'globalassets.starbucks.com',
            'wonderfulengineering.com',
            'www.lifewire.com'
        ],
    },
}

