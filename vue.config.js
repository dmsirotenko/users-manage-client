module.exports = {
  devServer: {
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/api' : ''},
        changeOrigin: true
      }
    }
  },
  assetsDir: 'static'
};
