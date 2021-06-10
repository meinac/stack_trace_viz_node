const fs = require("fs");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

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
        },
        {
          test: /\.js$/,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /<%(?:=|-)?/g, replace: '{%' },
              { search: /%>/g, replace: '%}' }
            ]
          }
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin(
        Object.assign(
          {
            inject: "body",
            template: "./src/index.html",
            filename: "./index.html",
            trace_data: isEnvProduction ? "<%= trace_data %>" : fs.readFileSync("data/test.json", "utf-8")
          },
          isEnvProduction
            ? {
                inlineSource: ".(js|css)$",
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      isEnvProduction && new HtmlWebpackInlineSourcePlugin(HtmlWebPackPlugin),
    ].filter(Boolean),
    output: (isEnvProduction ? { publicPath: "./" } : {})
  };
}
