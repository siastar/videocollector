//console.log("reading webpack config...");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: "./prn_front_index.js"
    //print: "./src/print.js"
  },
  devtool: "inline-source-map",
  devServer: {
    //contentBase: path.join(__dirname, "./dist"), // where dev server will look for static files, not compiled
    //publicPath: "/", //relative path to output path where  devserver will look for compiled files,
    //hot: true,
    port: 9999, //if not specified the default port is 8080
    index: "",
    proxy: {
      context: () => true,
      "/": "http://localhost:5000"
    }
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist"), // base path where to send compiled assets
    publicPath: "/" // base path where referenced files will be look for
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src") // shortcut to reference src folder from anywhere
    }
  },
  module: {
    rules: [
      {
        // config for es6 jsx
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        // config for sass compilation
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          // {
          //   loader: "style-loader" // //inject CSS to page
          // },
          {
            loader: "css-loader"
          },
          // {
          //   loader: "postcss-loader", // //Run post css actions
          //   options: {
          //     plugins: function() {
          //       // post css plugins, can be exported to postcss.config.js
          //       return [require("precss"), require("autoprefixer")];
          //     }
          //   }
          // },
          {
            loader: "sass-loader"
          }
        ]
      },

      {
        // // https://stackoverflow.com/questions/53103312/config-webpack-4-with-bootstrap-3
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },

      {
        // config for images
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images"
            }
          }
        ]
      },
      {
        // config for fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "fonts"
            }
          }
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
      }
    ]
  },
  plugins: [
    //cleans dist when building
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "css/*.*",
        "js/*.*",
        "fonts/*.*",
        "images/*.*"
      ]
    }),
    new HtmlWebpackPlugin({
      // plugin for inserting scripts automatically into html
      template: "./src/index.html",
      filename: "web-p-index.html",
      title: "Learning Webpack"
    }),
    new MiniCssExtractPlugin({
      // plugin for controlling how compiled css will be outputted and named
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    })
  ]
};
