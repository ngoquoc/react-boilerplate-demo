var path = require('path');
module.exports = {
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    },
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    quotes: [2, 'single'],
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore'
      }
    ],
    strict: [2, 'never'],
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/react-in-jsx-scope': 2,
    'max-len': [0, 80],
    radix: 'off',
    'no-unused-vars': 'error',
    'linebreak-style': 'off',
    'react/jsx-filename-extension': 'off',
    'react/forbid-prop-types': 'off'
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(
          __dirname,
          'config',
          'webpack.config.' +
            (process.env.NODE_ENV !== 'production' ? 'dev' : 'prod') +
            '.js'
        )
      }
    }
  },
  plugins: ['react', 'flowtype', 'import']
};
