const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("proxied");
  app.use(
    "/upload",
    createProxyMiddleware({
      target: "http://207.148.126.213:25478",
      changeOrigin: true,
    })
  );
  app.use(
    "/assets",
    createProxyMiddleware({
      target: "http://207.148.126.213:25478",
      changeOrigin: true,
    })
  );
};
