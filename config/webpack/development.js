process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const environment = require('./environment')

if (process.env.WEBPACK_DEV_SERVER) {
    environment.plugins.append('ReactRefreshWebpackPlugin', new ReactRefreshWebpackPlugin({
		overlay: {
			sockPort: 3035,
		},
	}))
}

module.exports = environment.toWebpackConfig()
