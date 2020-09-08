module.exports = {
  hot: true,
  contentBase: 'dist',
  publicPath: 'build',
  historyApiFallback: '__app.html',
  port: 5050
  // proxy: {    '/': 'http://localhost:5000'  } legacy. Needs spassr running.
}
