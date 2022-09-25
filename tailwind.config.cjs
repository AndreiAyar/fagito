
const colors = require('tailwindcss/colors')
const config = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@brainandbones/skeleton/**/*.{html,js,svelte,ts}'
	],
	plugins: [
		require('@brainandbones/skeleton/tailwind/theme.cjs'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
	]
};

module.exports = config;
