var webpack = require('webpack');
var path    = require('path');
var CompressionPlugin = require('compression-webpack-plugin');
var root = __dirname + '/';
var nodeScripts = root + 'node_modules/';
var appScripts = root + 'static/js/app/';
var vendorScripts = root + 'static/js/vendor/';

var config = {
  entry: {
    app: path.resolve(__dirname, 'static/build/main.js')
  },
  output: {
    path: path.resolve(__dirname, 'static/release/'),
    filename: '[name].min.js',
    sourceMapFilename: '[name].min.js.map'
  },
  module: {
      loaders: [
          {
              test: /\.ract$/,
              loader: 'ractive-component'
          },
          {
              test : /\.ts$/, exclude: [/node_modules/, /vendor/],
              loader: 'typescript-loader?typescriptCompiler=typescript'
          },
          {
              test : /\.(es6|js)$/,
              exclude: [/node_modules/, /vendor/],
              loader: 'babel-loader?optional=runtime&sourceMaps=both&nonStandard&compact=auto'
          },
          {
              test : /\.(html|tpl)$/, loader: 'html'
          },
          {
              test : /\.less$/, loader: 'style-loader!css-loader!less-loader'
          },
          {
              test : /\.css$/, loader: 'style-loader!css-loader'
          },
          {
              test : /\.(png|jpe?g|eot|ttf|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loaders: [
                  'url-loader?limit=8192&hash=sha512&digest=hex&name=[hash].[ext]',
                  'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
              ]
          },
          {
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: 'url-loader?mimetype=application/font-woff'
          }
        ]
    },
    jshint: {
        emitErrors: false,
        failOnHint: false,
        reporter: function(errors) {
            errors.map(function(error) {
                    console.log('line: [' + error.line + ']' +
                                ', reason: [' + error.reason + ']' +
                                ', evidence: [' + error.evidence.trim() + ']');
                });
        }
    },
    resolve: {
      extensions: ['', '.js', '.es6', '.es6.js', '.jsx', '.json', '.ts', '.css', '.html', '.ract'],
      alias: {
        'bootstrap.css' : nodeScripts + 'bootstrap/dist/css/bootstrap',
        'bootstrap.js'  : nodeScripts + 'bootstrap/dist/js/bootstrap'
      }
    },
    plugins: [
        new CompressionPlugin({
            asset     : '{file}.gz',
            algorithm : 'gzip',
            regExp    : /\.js$|\.html$/,
            threshold : 10240,
            minRatio  : 0.8
        }),
        //new webpack.HotModuleReplacementPlugin()
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ]);
} else {
    config.devtool = '#source-map';
    config.debug   = true;
}

config.useMemoryFs = false;
config.progress = true;

module.exports = config;