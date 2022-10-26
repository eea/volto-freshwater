const defaultBabel = require('@plone/volto/babel');

function applyDefault(api) {
  const voltoBabel = defaultBabel(api);
  voltoBabel.plugins.push(
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    'transform-class-properties',
    'istanbul',
  );
  return voltoBabel;
}

module.exports = applyDefault;
