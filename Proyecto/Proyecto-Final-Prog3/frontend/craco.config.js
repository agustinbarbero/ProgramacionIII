module.exports = {
  devServer: {
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 300,
      ignored: /node_modules/
    },
    hot: true,
    liveReload: true
  },
  webpack: {
    configure: (webpackConfig) => {
      // Configuración adicional para hot reload
      if (process.env.NODE_ENV === 'development') {
        webpackConfig.watchOptions = {
          poll: 1000,
          aggregateTimeout: 300,
          ignored: /node_modules/
        };
      }
      return webpackConfig;
    }
  }
};
