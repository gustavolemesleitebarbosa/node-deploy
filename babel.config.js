module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          // eslint-disable-next-line prettier/prettier
          "@modules": "./src/modules",
          // eslint-disable-next-line prettier/prettier
          "@config": "./src/config",
          // eslint-disable-next-line prettier/prettier
          "@shared": "./src/shared",
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    // eslint-disable-next-line prettier/prettier
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    // eslint-disable-next-line prettier/prettier
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ],
};
