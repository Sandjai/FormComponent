module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: '> 3%'
        // browsers: 'defaults, ie >= 11'
      }
    }]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ]
};