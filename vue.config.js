const path = require('path');

module.exports = {
  lintOnSave: false,

  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        "@server": path.resolve(__dirname, "../sync_server"),
      },
      extensions: ['.js', '.vue', '.json', ".ts"]
    },
    // plugins: [new BundleAnalyzerPlugin()],

  }
}
