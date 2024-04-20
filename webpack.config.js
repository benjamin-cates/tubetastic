const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
   devtool: "inline-source-map",
   mode: "development",
   entry: {
      foreground: path.resolve(__dirname, "src", "foreground.ts"),
      inject_buttons: path.resolve(__dirname, "src", "inject_buttons.ts"),
      contentScript: path.resolve(__dirname, "src", "contentScript.ts"),
      content: path.resolve(__dirname, "public", "content"),
      worker: path.resolve(__dirname, "src", "worker.ts"),
   },
   output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
         },
      ],
   },
   plugins: [
      new CopyPlugin({
         patterns: [{from: ".", to: ".", context: "public"}]
      }),
   ],
};
