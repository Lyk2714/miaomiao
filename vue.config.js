module.exports = {
    devServer: {
        proxy: {
            '/dianying': {
                target: 'http://m.maoyan.com',
                changeOrigin: true
            },
            '/ajax': {
                target: 'http://m.maoyan.com',
                changeOrigin: true,
            },
            '/api': {
                target: 'https://maoyan.com',
                changeOrigin: true,
                // secure: false,
                pathRewrite: { "^/api": "" }
            },

        }
    },
    lintOnSave: true
}