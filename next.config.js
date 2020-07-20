const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  webpack: function (config) {
    cssModules: true,
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            // limit: 100000,
            name: "[name].[ext]",
          },
        },
      });
    return config;
  },
  env: {},
};
