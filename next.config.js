const plugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withOffline = require('next-offline')

const nextConfig = {
  webpack(config, { webpack, dev, isServer }) {

    // audio support
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    })

    return config
  },
}

// manage i18n
if (process.env.EXPORT !== 'true') {
  nextConfig.i18n = {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  }
}
// module.exports = {
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     // !! WARN !!
//     // Dangerously allow production builds to successfully complete even if
//     // your project has type errors.
//     // !! WARN !!
//     ignoreBuildErrors: true,
//   },
// }

module.exports = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index.html'
      },
      {
        source: '/deck',
        destination: '/deck.html'
      },
      {
        source: '/whitepaper',
        destination: '/whitepaper.html'
      }
    ]
  },
}
// module.exports = plugins(
//   [
//     [
//       withOffline,
//       {
//         workboxOpts: {
//           swDest: process.env.NEXT_EXPORT
//             ? 'service-worker.js'
//             : 'static/service-worker.js',
//           runtimeCaching: [
//             {
//               urlPattern: /^https?.*/,
//               handler: 'NetworkFirst',
//               options: {
//                 cacheName: 'offlineCache',
//                 expiration: {
//                   maxEntries: 200,
//                 },
//               },
//             },
//           ],
//         },
//         async rewrites() {
//           return [
//             {
//               source: '/service-worker.js',
//               destination: '/_next/static/service-worker.js',
//             },
//           ]
//         },
//         async headers() {
//           return [
//             {
//               // matching all API routes
//               source: "/api/:path*",
//               headers: [
//                 { key: "Access-Control-Allow-Credentials", value: "true" },
//                 { key: "Access-Control-Allow-Origin", value: "*" },
//                 { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
//                 { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
//               ]
//             }
//           ]
//         }
//       },
//     ],
//     withBundleAnalyzer,
//   ],
//   nextConfig
// )
