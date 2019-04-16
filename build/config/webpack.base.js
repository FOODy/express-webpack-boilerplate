const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = function(options) {
  const IS_SERVER = options.platform === 'server';
  const IS_BROWSER = !IS_SERVER;
  const APP_ROOT_DIR = path.join(__dirname, '../..');
  const APP_SRC_DIR = path.join(APP_ROOT_DIR, 'src', IS_SERVER ? 'server' : 'browser');
  const TSCONFIG_FILE = path.join(APP_SRC_DIR, 'tsconfig.json');

  return function(env, args) {
    const IS_RELEASE = args.mode === 'production';
    const IS_DEBUG = !IS_RELEASE;
    const NODE_ENV = IS_RELEASE ? 'production' : 'development';
    const BUILD_DIR =
      IS_SERVER
        ? path.join(APP_ROOT_DIR, 'dist', NODE_ENV, 'app')
        : path.join(APP_ROOT_DIR, 'dist', NODE_ENV, 'public');

    return {
      output: {
        filename: IS_SERVER ? 'index.js' : '[name].[hash].js',
        path: BUILD_DIR,
        publicPath: '/static/',
      },

      entry: [
        path.join(APP_ROOT_DIR, options.entry),
        IS_DEBUG && IS_BROWSER && 'webpack-hot-middleware/client',
      ].filter((val) => !!val),

      mode: NODE_ENV,
      target: IS_SERVER ? 'node' : undefined,

      devtool:
        IS_SERVER || IS_DEBUG
          ? 'cheap-module-eval-source-map'
          : false,

      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },

      node: {
        __dirname: false,
      },

      performance: {
        hints: false,
      },

      devServer: IS_BROWSER && IS_DEBUG ? {
        hot: true,
      } : undefined,

      stats: {
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: IS_RELEASE,
        maxModules: 0,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: false,
        errorDetails: false,
        warnings: false,
        publicPath: false,
      },

      module: {
        rules: [
          {
            test: /\.tsx?$/,
            include: [
              path.join(APP_ROOT_DIR, 'src'),
            ],
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,

                  presets: [
                    [
                      '@babel/env',
                      {
                        modules: false,
                        forceAllTransforms: IS_RELEASE,
                        useBuiltIns: false,
                        targets: {
                          browsers: '> 1%',
                        },
                      },
                    ],
                  ],

                  plugins: [
                    '@babel/plugin-transform-runtime',
                    '@babel/plugin-transform-react-jsx',
                    '@babel/plugin-proposal-object-rest-spread',
                    '@babel/plugin-syntax-dynamic-import',
                    'babel-plugin-graphql-tag',
                    ['babel-plugin-emotion',
                      IS_RELEASE
                        ? { hoist: true }
                        : { sourceMap: true, autoLabel: true },
                    ],
                  ],
                },
              },

              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  configFile: TSCONFIG_FILE,
                },
              },
            ],
          },

          {
            test: /\.graphqls?$/,
            use: ['graphql-tag/loader'],
          },
        ],
      },

      optimization: {
        splitChunks: IS_SERVER ? false : {
          chunks: 'all',
          maxInitialRequests: 20,
          maxAsyncRequests: 20,
        },

        minimizer: IS_SERVER || IS_DEBUG ? [] : [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: false,
          }),

          new CompressionPlugin({
            test: /\.js$/,
          }),
        ].filter((val) => !!val),
      },

      externals: IS_SERVER ? [nodeExternals()] : undefined,

      plugins: [
        new CleanWebpackPlugin([BUILD_DIR], {
          root: path.dirname(BUILD_DIR),
        }),

        new ForkTsCheckerWebpackPlugin({
          tsconfig: TSCONFIG_FILE,
          tslint: true,
        }),

        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
          'process.env.APP_PLATFORM': JSON.stringify(IS_SERVER ? 'server' : 'browser'),
        }),

        IS_BROWSER && IS_DEBUG && new webpack.HotModuleReplacementPlugin(),

        IS_BROWSER && new HtmlWebpackPlugin({
          template: path.join(APP_SRC_DIR, 'index.html'),
        }),

        IS_BROWSER && IS_DEBUG && new WriteFilePlugin({
          test: /index\.html$/,
        }),
      ].filter((val) => !!val),
    };
  };
};