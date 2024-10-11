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
      target: 'http://116.109.105.142:30156',
      changeOrigin: true,
      pathRewrite: { '^/flask': '/' },
    })
  );
};
