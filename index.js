import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import tseslint from 'typescript-eslint'
import StylisticPlugin from '@stylistic/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

const compat = new FlatCompat({ recommendedConfig: js.configs.recommended })

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Vue
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: {
      'vue/no-unused-vars': ['warn', { 'ignorePattern': '^_' }],
      'vue/html-indent': ['warn', 2, {
        'attribute': 1,
        'baseIndent': 1,
        'closeBracket': 0,
        'alignAttributesVertically': true,
        'ignores': [],
      }],
      'vue/max-attributes-per-line': ['warn', {
        'singleline': { 'max': 4 },
        'multiline': { 'max': 1 },
      }],
    },
  },

  // General
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    plugins: { stylistic: StylisticPlugin },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          'args': 'all',
          'argsIgnorePattern': '^_',
          'caughtErrors': 'all',
          'caughtErrorsIgnorePattern': '^_',
          'destructuredArrayIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'ignoreRestSiblings': true,
        },
      ],

      // Stylistic rules
      'stylistic/semi': ['warn', 'never'],
      'stylistic/quotes': ['warn', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
      'stylistic/comma-dangle': ['warn', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline',
        'importAttributes': 'always-multiline',
        'dynamicImports': 'always-multiline',
      }],
      'stylistic/function-call-spacing': ['warn', 'never'],
      'stylistic/type-generic-spacing': ['warn'],
      'stylistic/object-curly-spacing': ['warn', 'always'],
      'stylistic/template-curly-spacing': ['warn', 'never'],
      'stylistic/object-curly-newline': ['warn', {
        'ObjectExpression': {
          multiline: true,
          minProperties: 8,
        },
        'ObjectPattern': 'never',
        'ImportDeclaration': {
          multiline: true,
          minProperties: 8,
        },
        'ExportDeclaration': 'always',
      }],
    },
  },
]
