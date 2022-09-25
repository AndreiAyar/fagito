import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	optimizeDeps:{
		include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
	},
	resolve: {
		alias: {
			'$root': path.resolve('./src')
		},
		
	}
};

export default config;
