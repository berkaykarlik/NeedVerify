// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // require or disallow semicolons instead of ASI
    'semi': 0,
    // enforce the consistent use of either backticks, double, or single quotes
    'quotes': 'off',
    // no literal in callback
    'standard/no-callback-literal': 0,
    // require or disallow padding within blocks
    'padded-blocks': 0,
    // require or disallow trailing commas
    'comma-dangle': 0,
    // disallow ternary operators when simpler alternatives exist
    'no-unneeded-ternary': 0,
    // require the use of `===` and `!==`
    'eqeqeq': 0,
  }
}
