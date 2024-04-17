const path = require('path')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { ContextReplacementPlugin } = require('webpack')
const glob = require('glob')
const webpack = require('webpack')

function transpileViewScript(file) {
  return {
    entry: file,
    output: {
      filename: file.replace('./js/view_specific/', ''),
      path: path.resolve(__dirname, '../priv/static/js')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  }
};

const jsOptimizationParams = {
  parallel: true
}

const appJs =
  {
    entry: {
      'app': './js/app.js',
      'chart-loader': './js/chart-loader.js',
      'balance-chart-loader': './js/balance-chart-loader.js',
      'internal_transaction':'./js/lib/internal_transaction.js',
      'embed':'./js/lib/embed.js',
      'chain': './js/pages/chain.js',
      'blocks': './js/pages/blocks.js',
      'address': './js/pages/address.js',
      'address-transactions': './js/pages/address/transactions.js',
      'address-token-transfers': './js/pages/address/token_transfers.js',
      'address-coin-balances': './js/pages/address/coin_balances.js',
      'address-internal-transactions': './js/pages/address/internal_transactions.js',
      'address-logs': './js/pages/address/logs.js',
      'address-validations': './js/pages/address/validations.js',
      'validated-transactions': './js/pages/transactions.js',
      'verified-contracts': './js/pages/verified_contracts.js',
      'pending-transactions': './js/pages/pending_transactions.js',
      'transaction': './js/pages/transaction.js',
      'verification-form': './js/pages/verification_form.js',
      'token-counters': './js/pages/token_counters.js',
      'token-transfers': './js/pages/token/token_transfers.js',
      'admin-tasks': './js/pages/admin/tasks.js',
      'token-contract': './js/pages/token_contract.js',
      'smart-contract-helpers': './js/lib/smart_contract/index.js',
      'sol2uml': './js/pages/sol2uml.js',
      'token-transfers-toggle': './js/lib/token_transfers_toggle.js',
      'try-api': './js/lib/try_api.js',
      'try-eth-api': './js/lib/try_eth_api.js',
      'async-listing-load': './js/lib/async_listing_load',
      'non-critical': './css/non-critical.scss',
      'main-page': './css/main-page.scss',
      'tokens': './js/pages/token/search.js',
      'text-ad': './js/lib/text_ad.js',
      'banner': './js/lib/banner.js',
      'autocomplete': './js/lib/autocomplete.js',
      'search-results': './js/pages/search-results/search.js',
      'token-overview': './js/pages/token/overview.js',
      'export-csv': './css/export-csv.scss',
      'csv-download': './js/lib/csv_download.js',
      'dropzone': './js/lib/dropzone.js',
      'delete-item-handler': './js/pages/account/delete_item_handler.js',
      'public-tags-request-form': './js/lib/public_tags_request_form.js',
      'stats-chart':'./js/lib/stats-chart.js',
      'stats-chart1':'./js/lib/stats-chart1.js',
      'stats-chart2':'./js/lib/stats-chart2.js',
      'stats-chart3':'./js/lib/stats-chart3.js',
      'stats-chart4':'./js/lib/stats-chart4.js',
      'stats-chart5':'./js/lib/stats-chart5.js', 
      'statistics':'./js/lib/statistics.js',
      'diff-checker':'./js/lib/diff-checker.js',
      'nft-data':'./js/lib/nft-data.js',
      'add_icon':'./js/lib/add_icon.js',
      'admin_login':'./js/lib/admin_login.js',
      'user_login':'./js/lib/user_login.js',
      'admin_signup':'./js/lib/admin_signup.js',
      'admin_verify':'./js/lib/admin_verify.js',
      'set_icon':'./js/lib/set_icon.js',
      'reset_password':'./js/lib/reset_password.js',
      'userdashboard':'./js/lib/userdashboard.js',
      'advertisement_dash':'/js/lib/advertisement_dash.js',
      'userdashboard_icon':'./js/lib/userdashboard_icon.js',
      'broadcast-transaction':'./js/lib/broadcast-transaction.js',
      'contract-search':'./js/lib/contract-search.js',
      'blocks-chat':'./js/lib/blocks-chat.js',
      'transactions-tab':'./js/lib/transactions-tab.js',
      'nav':'./js/lib/nav.js',
      'tron-evm-converter':'./js/lib/tron-evm-converter.js',
      'dapp_list':'./js/lib/dapp_list.js',
      'txn_eye_btn':'/js/lib/txn_eye_btn.js',
      'fetch_advertisement':'/js/lib/fetch_advertisement.js'

    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../priv/static/js')
    },
    optimization: {
      minimizer: [new TerserJSPlugin(jsOptimizationParams), new CssMinimizerPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false,
              },
            }, {
              loader: 'css-loader'
            }, {
              loader: 'postcss-loader'
            }, {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  precision: 8,
                  includePaths: [
                    'node_modules/bootstrap/scss',
                    'node_modules/@fortawesome/fontawesome-free/scss'
                  ]
                }
              }
            }
          ]
        }, {
          test: /\.(svg|ttf|eot|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../fonts/',
              publicPath: '../fonts/'
            }
          }
        }, {
          test: /\.(png)$/,
          use: {
            loader: 'file-loader'
          }
        }
      ]
    },
    resolve: {
      fallback: {
        "os": require.resolve("os-browserify/browser"),
        "https": require.resolve("https-browserify"),
        "http": require.resolve("stream-http"),
        "crypto": require.resolve("crypto-browserify"),
        "util": require.resolve("util/"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert/"),
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '../css/[name].css'
      }),
      new CopyWebpackPlugin(
        {
          patterns: [
            { from: 'static/', to: '../' }
          ]
        }
      ),
      new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
      new webpack.DefinePlugin({
        'process.env.SOCKET_ROOT': JSON.stringify(process.env.SOCKET_ROOT),
        'process.env.NETWORK_PATH': JSON.stringify(process.env.NETWORK_PATH),
        'process.env.MIXPANEL_TOKEN': JSON.stringify(process.env.MIXPANEL_TOKEN),
        'process.env.MIXPANEL_URL': JSON.stringify(process.env.MIXPANEL_URL),
        'process.env.AMPLITUDE_API_KEY': JSON.stringify(process.env.AMPLITUDE_API_KEY),
        'process.env.AMPLITUDE_URL': JSON.stringify(process.env.AMPLITUDE_URL)
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ]
  }

const viewScripts = glob.sync('./js/view_specific/**/*.js').map(transpileViewScript)

module.exports = viewScripts.concat(appJs)
