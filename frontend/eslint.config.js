// Taken from: https://eslint.org/docs/latest/use/configure/configuration-files
import babelParser from '@babel/eslint-parser';
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		files: ['**/*.js'],
		plugins: {
			js,
      react: reactPlugin
		},
    languageOptions: {
      // Enables parsing of div of every component
      // Taken from: https://eslint.org/docs/latest/use/configure/parser#configure-a-custom-parser
      parser: babelParser,
			parserOptions: {
				requireConfigFile: false,
				babelOptions: {
					babelrc: false,
					configFile: false,
					presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-syntax-jsx']
				},
			},
      // Ignores errors pertaining to 'console', 'process' etc not being defined
      globals: {
        console: 'readonly',
        process: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        alert: 'readonly',
        setTimeout: 'readonly',
        document: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect' // or '19.1.0'
      }
    },
		rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      // [rule severity, style to enforce]
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
			'no-unused-vars': 'warn',
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'no-trailing-spaces': 'error',
      'space-before-function-paren': ['error', {
        anonymous: 'always',      // for () => {} or function () {}
        named: 'never',           // for function myUser() {}
        asyncArrow: 'always'      // for async () => {}
      }],
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }]
		},
	},
]);