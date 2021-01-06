module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:3002',
                changeOrigin: true
            },
        },
        inline: true,
        hot: true,
        stats: 'minimal',
        contentBase: __dirname,
        overlay: true,
        historyApiFallback: true
    }
}