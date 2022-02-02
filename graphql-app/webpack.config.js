// eslint-disable-next-line
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

module.exports = function (options) {
  options.devtool = 'source-map';
  if (process.env.CI)
    options.plugins.push(
      new SentryWebpackPlugin({
        // sentry-cli configuration - can also be done directly through sentry-cli
        // see https://docs.sentry.io/product/cli/configuration/ for details
        authToken: process.env.SENTRY_AUTH_TOKEN,
        project: 'showcase-backend',
        release: '1.0',

        // other SentryWebpackPlugin configuration
        include: 'dist',
        ignore: ['node_modules', 'webpack.config.js'],
      }),
    );
  return options;
};
