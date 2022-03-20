module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: 'defaults, ie >= 11'
      }
    }]
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties'
  ]
};