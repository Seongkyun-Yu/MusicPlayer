module.exports = {
  "parserOptions": {
    "ecmaVersion": 9
  },
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true,
    "jquery": true
  },
  "extends": "airbnb-base",
  "plugins": [ "import", "html" ],
  "rules": {
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
    "no-nested-ternary": 0,
    "no-console": 0,
    "quotes": [ "error", "single" ],
    "no-underscore-dangle": "warn",
    "no-plusplus": [ "error", { "allowForLoopAfterthoughts": true }],
    "comma-dangle": [ "error", "never"],
    "no-var": 0,
    "no-param-reassign": ["error", {
      "props": false
    }],
    "no-plusplus": 0,
    "linebreak-style": 0
  }
};