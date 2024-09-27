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
      target: 'http://116.102.163.165:31368',
      changeOrigin: true,
      pathRewrite: { '^/flask': '/' },
    })
  );
};
