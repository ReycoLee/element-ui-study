var path = require("path");
var utils = require("./utils");
var config = require("../config");
var vueLoaderConfig = require("./vue-loader.conf");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

var mapping = {
  production: "build",
  testing: "test",
  testing_chacheng: "test_chacheng",
  development: "dev"
};

module.exports = {
  entry: {
    //app: ["./node_modules/babel-polyfill/dist/polyfill.js", "./src/main.js"]
    app: ["babel-polyfill", "./src/main.js"]
  },
  output: {
    path: config[mapping[process.env.NODE_ENV]].assetsRoot,
    // process.env.NODE_ENV === "production"
    //   ? config.build.assetsRoot
    //   : config.test.assetsRoot
    filename: "[name].js",
    publicPath: config[mapping[process.env.NODE_ENV]].assetsPublicPath
    // process.env.NODE_ENV === "production"
    //   ? config.build.assetsPublicPath
    //   : process.env.NODE_ENV === "testing"
    //     ? config.test.assetsPublicPath
    //     : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      src: resolve("src"),
      assets: resolve("src/assets"),
      common: resolve("src/common"),
      store: resolve("src/store"),
      pages: resolve("src/pages"),
      plugins: resolve("src/plugins"),
      components: resolve("src/components")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: "vue-loader",
        options: vueLoaderConfig
      },
      {
        test: /\.js$/i,
        loader: "babel-loader",
        include: [resolve("src"), resolve("test")],
        exclude: resolve("node_modules")
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
        loader: "url-loader",
        query: {
          limit: 1000,
          name: utils.assetsPath("images/[hash:8].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: "url-loader",
        query: {
          limit: 1000,
          name: utils.assetsPath("fonts/[hash:8].[ext]")
        }
      }
    ]
  }
};
