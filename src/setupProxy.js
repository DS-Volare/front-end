const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/spring', {
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: { '^/spring': '/' },
    })
  );
  app.use(
    createProxyMiddleware('/flask', {
      target: 'http://97.83.103.94:4050',
      changeOrigin: true,
      pathRewrite: { '^/flask': '/' },
    })
  );
};
