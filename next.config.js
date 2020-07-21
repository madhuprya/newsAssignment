const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  distDir: "build",
  webpack: function (config) {
    cssModules: true,
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      });
    return config;
  },
  env: {},
};
