import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tsLint from 'typescript-eslint';

export default [
	js.configs.recommended,
	...tsLint.configs.recommended,
	{
		files: ['**/*.ts']
	},
	{
		plugins: {
			'@typescript-eslint': typescriptEslint,
			'simple-import-sort': simpleImportSort
		},

		languageOptions: {
			globals: { ...globals.node },
			parser: tsParser,
			ecmaVersion: 2022,
			sourceType: 'module'
		},

		rules: {
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error'
		}
	}
];
