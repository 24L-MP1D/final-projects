//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const { hostname } = require('os');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: 'media.wired.com',
      },
      {
        hostname: 'assets.aceternity.com',
      },
      {
        hostname: 'example.com',
      },
      {
        hostname: 'cdn.pixabay.com',
      },
      {
        hostname: 'images.pexels.com',
      },
      {
        hostname: 'media.istockphoto.com',
      },
    ],
  },

  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
