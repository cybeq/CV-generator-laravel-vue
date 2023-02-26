const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                // pathRewrite: {
                //     '^/api': ''
                // }   <- coercion on paths /api/api/, /api/
            }
        }
    }
    // npm install http-proxy-middleware --save-dev
})
