const defaultBabel = require('@plone/volto/babel');

function applyDefault(api) {
  const voltoBabel = defaultBabel(api);
  voltoBabel.plugins.push(
    '@babel/plugin-transform-modules-commonjs',
    'transform-class-properties',
    'istanbul',
  );
  voltoBabel.plugins.push(
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
  );
  return voltoBabel;
}

module.exports = applyDefault;
