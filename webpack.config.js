const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const  OptimizeCssAssetsPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const path = require("path");
const glob = require("glob");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: ["core-js/stable", "./src/js/app.js"],
    sample: glob.sync("./src/js/page/sample/**/*.js"),
    'card-catalog': glob.sync("./src/js/page/card-catalog/**/*.js"),
    'reviews': glob.sync("./src/js/page/reviews/**/*.js"),
  },
  mode: "production",
  //mode: "development",
  output: {
    path: `${__dirname}/dist`,
    //path: "/home/jigius/work/vhosts/fedot/repo/public/build",
    filename: "[name]-bundle.js",
    clean: true,
    //chunkFormat: "array-push"
  },
  target: ["es5", "web"],
  devServer: {
    //static: "./dist",
    static: "/home/jigius/work/vhosts/fedot/repo/tpls",
    hot: true,
    watchFiles: ["./src"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/template.html"), // main page
      filename: "index.html",
      chunks: ["main"],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/sample.html"), // sample template
      filename: "sample.html", // result page into ./dist folder
      chunks: ["main", "sample"],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/card-catalog.html"), // шаблон
      filename: "card-catalog.html", // название выходного файла
      chunks: ["main", "card-catalog"],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/catalog.html"), // шаблон
      filename: "catalog.html", // название выходного файла
      chunks: ["main"],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/catalog-list.html"), // шаблон
      filename: "catalog-list.html", // название выходного файла
      chunks: ["main"],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/reviews.html"), // шаблон
      filename: "reviews.html", // название выходного файла
      chunks: ["main", "reviews"],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/info.html"), // шаблон
      filename: "info.html", // название выходного файла
      chunks: ["main"],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/contact.html"), // шаблон
      filename: "contact.html", // название выходного файла
      chunks: ["main"],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/about.html"), // шаблон
      filename: "about.html", // название выходного файла
      chunks: ["main"],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      // шаблон страницы заказа
      template: path.resolve(__dirname, "./src/order.html"),
      filename: "order.html", // название выходного файла
      chunks: ["main"],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/moods/modal-popup.html"),
      filename: "moods/modal-popup-[hash].html",
      chunks: ["main"],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/moods/alert.html"),
      filename: "moods/alert-[hash].html",
      chunks: ["main"],
    }),
    new MiniCssExtractPlugin(),
    /* new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/mood-formcontrols.html"),
      filename: "mood-formcontrols.html",
      chunks: ["main"],
    }),
    new MiniCssExtractPlugin()
    */
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
              ]
            ]
          }
        }
      },
      {
        test: /\.html$/i,
        include: path.join(__dirname, "src"),
        use: [
          {
            loader: "html-loader",
            options: {
              interpolate: true,
              attrs: ["img:src", "source:srcset"],
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          //"style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
        {
            test: /\.(scssw)$/,
            use: [
                "sass-loader"
            ],
        },
      {
        test: /\.(jpe?g|svg|png|gif|ico)(\?v=\d+\.\d+\.\d+)?$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
      {
        test: /\.(eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
    ],
  },
  /*optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
            new OptimizeCssAssetsPlugin(),
        ],
    },*/
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
};
