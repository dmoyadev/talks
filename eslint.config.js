import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

export default defineConfigWithVueTs([
	{
		ignores: [
			'**.d.ts',
			'**/dist/**/*',
			'**/node_modules/**/*',
		],
	},

	...pluginVue.configs['flat/recommended'],
	vueTsConfigs.recommended,
	vueTsConfigs.stylistic,

	{
		rules: {
			'no-console': 'off',

			// Part of the `recommended` rules
			'no-debugger': 'error',

			// Vue specific rules
			'vue/html-indent': ['warn', 'tab'],
			'vue/script-indent': ['warn', 'tab', { 'switchCase': 1 }],

			// Stylistic rules
			'semi': ['warn', 'always'],
			'quotes': ['warn', 'single'],
			'array-bracket-spacing': ['warn', 'never'],
			'indent': ['warn', 'tab', { 'SwitchCase': 1 }],
			'comma-dangle': ['warn', 'always-multiline'],
			'arrow-spacing': 'warn',
			'object-property-newline': 'warn',
			'object-curly-spacing': ['warn', 'always'],
			'object-curly-newline': [
				'warn', {
					'ObjectExpression': {
						'multiline': true,
						'minProperties': 2,
					},
				},
			],

			// Not part of `stylistic` rules, but belongs to stylistic rules
			'curly': ['warn', 'multi-line'],
		},
	},
]);