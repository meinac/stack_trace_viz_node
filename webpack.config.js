const fs = require("fs");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = function(webpackEnv) {
  const isEnvProduction = webpackEnv.production;
  const environment = isEnvProduction ? "production" : "development"

  return {
    mode: environment,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: { loader: "babel-loader" }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin(
        {
          template: "./src/index.html",
          filename: "./index.html",
          trace_data: isEnvProduction ? "<%= trace_data %>" : fs.readFileSync("data/test.json", "utf-8")
        },
      ),
    ]
  };
}
