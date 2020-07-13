const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const Dotenv = require('dotenv-webpack');

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'RML.io Dashboard',
  template: './src/index.html',
  filename: './index.html',
});

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  if (!isDev) {
    htmlPlugin.minify = {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
    };
  }

  return {
    entry: './src/index.tsx',
    mode: argv.mode,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
    },
    devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                esModule: false,
                hash: 'sha512',
                limit: 8192,
                outputPath: isDev ? '' : 'img/',
                name: isDev ? '[path][name].[ext]' : '[name]-[hash].[ext]',
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                disable: true,
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75,
                },
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                hash: 'sha512',
                outputPath: isDev ? '' : 'img/',
                name: isDev ? '[path][name].[ext]' : '[name]-[hash].[ext]',
                limit: 8192,
              },
            },
          ],
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            hash: 'sha512',
            outputPath: isDev ? '' : 'fonts/',
            name: isDev ? '[path][name].[ext]' : '[name]-[hash].[ext]',
          },
        },
      ],
    },
    devServer: {
      port: process.env.PORT || 8080,
      contentBase: path.resolve('dist'),
      historyApiFallback: true,
      publicPath: '/',
    },
    plugins: [htmlPlugin, new Dotenv()],
  };
};
