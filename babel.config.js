module.exports = (api) => {
	api.cache(true)
	const babelrcRoots = [
		// Keep the root as a root
		'.',
		// Also consider monorepo packages "root" and load their .babelrc.json.
		'./packages/*',
	]

	return {
		babelrcRoots,
		presets: [
			'@babel/env',
			[
				'@babel/preset-react',
				{
					development: process.env.BABEL_ENV !== 'build',
				},
			],
			'@babel/preset-typescript',
		],
		plugins: [
			['@babel/plugin-proposal-decorators', { legacy: true }],
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-transform-spread',
			'@babel/plugin-proposal-optional-chaining',
			[
				'@babel/plugin-transform-runtime',
				{
					regenerator: true,
				},
			],
		],
		env: {
			build: {
				ignore: ['**/*.test.tsx', '**/*.test.ts', '**/*.story.tsx', '__snapshots__', '__tests__', '__stories__'],
			},
		},
		ignore: ['node_modules'],
	}
}
