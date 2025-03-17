module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        url: false
      };
      return webpackConfig;
    },
  },
};

