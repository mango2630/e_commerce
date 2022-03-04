module.exports = {
    lintOnSave: false,

    // 代理跨域
    // http://39.98.123.211
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
                // pathRewrite: { '^/api': '' },
            },
        },
    },
}