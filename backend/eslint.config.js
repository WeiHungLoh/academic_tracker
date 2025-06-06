// Taken from https://eslint.org/docs/latest/use/configure/configuration-files
import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			js,
		},
		extends: ["js/recommended"],
    languageOptions: {
      // ignores errors pertaining to 'console' or 'process' not defined
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
		rules: {
      // [rule severity, style to enforce]
			"no-unused-vars": "warn",
      "quotes": ["error", "single"],
      "semi": ["error", "never"],
      "no-trailing-spaces": "error",
      "space-before-function-paren": ["error", "always"],
      "eol-last": ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }]
		},
	},
]);