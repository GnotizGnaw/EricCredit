import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslintParser from '@typescript-eslint/parser'
import vueEslintParser from 'vue-eslint-parser'
import globals from 'globals'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

export default [
  // 1. Ignore patterns (replacing .eslintignore)
  {
    ignores: ['dist/**', 'node_modules/**', 'public/**'],
  },

  // 2. Base Configuration & Plugins
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:storybook/recommended',
    'prettier'
  ),

  {
    files: ['**/*.vue', '**/*.ts', '**/*.js'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: typescriptEslintParser,
        sourceType: 'module',
        ecmaVersion: 2021,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-lone-template': 'off',
      'vue/v-on-event-hyphenation': ['warn', 'never', { autofix: true }],
      'vue/component-name-in-template-casing': ['warn', 'PascalCase', { registeredComponentsOnly: false }],
      'vue/script-indent': ['warn', 2],
    },
  },
]