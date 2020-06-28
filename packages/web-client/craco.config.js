/* eslint-disable */
const CracoLessPlugin = require('craco-less')
const darkTheme = require('@ant-design/dark-theme').default
const variables = require('./src/styles/variables')

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: Object.assign(darkTheme, variables),
						javascriptEnabled: true,
					},
				},
			},
		},
	],
}
