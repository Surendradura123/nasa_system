module.exports = {
  webpack: {
    configure: (webpackConfig) => {

      // ❌ Remove source-map-loader completely
      webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
        if (rule.enforce === "pre" && rule.use) {
          return {
            ...rule,
            exclude: /@mediapipe\/tasks-vision/
          };
        }
        return rule;
      });

      return webpackConfig;
    }
  }
};