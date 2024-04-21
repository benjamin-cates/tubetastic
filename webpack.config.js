const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
   devtool: "inline-source-map",
   mode: "development",
   entry: {
      foreground: path.resolve(__dirname, "src", "foreground.ts"),
      inject_buttons: path.resolve(__dirname, "src", "inject_buttons.tsx"),
      contentScript: path.resolve(__dirname, "src", "contentScript.ts"),
      content: path.resolve(__dirname, "public", "content"),
      worker: path.resolve(__dirname, "src", "worker.ts"),
      extension_popup: path.resolve(__dirname, "src", "extension_popup.ts"),
   },
   output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
   },
   resolve: {
      extensions: [".ts", ".js", ".tsx"],
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
