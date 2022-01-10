module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    semi: ['error', 'never'],
    'max-len': 'off',
    'linebreak-style': 'off',
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }],
    'arrow-parens': ['error'],
    'vue/multiline-html-element-content-newline': 'off',
		'no-underscore-dangle': 'off',
	  'indent': 'off',
	  'no-tabs': 0,
		'no-trailing-spaces': 'off',
	  "vue/max-attributes-per-line": ["error", {
		  "singleline": 5,
		  "multiline": 5
	  }],
	  'object-curly-newline': ["error", { "multiline": true, "consistent": true }]
  },
}
