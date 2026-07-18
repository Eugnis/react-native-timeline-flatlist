const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch the monorepo root for changes
config.watchFolders = [monorepoRoot];

// Resolve modules from the app only — the library root's node_modules
// (devDependencies) must never leak into the bundle, or two copies of
// React get bundled ("A React Element from an older version of React
// was rendered" crash).
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const rootNodeModules = path.join(monorepoRoot, 'node_modules');
config.resolver.blockList = [
  new RegExp(`${escapeRegExp(rootNodeModules + path.sep)}.*`),
];

// Make sure we resolve the timeline library from the monorepo root,
// and singleton packages from the app's own node_modules.
config.resolver.extraNodeModules = {
  'react-native-timeline-flatlist': monorepoRoot,
  react: path.resolve(projectRoot, 'node_modules/react'),
  'react-dom': path.resolve(projectRoot, 'node_modules/react-dom'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
  'react-native-web': path.resolve(projectRoot, 'node_modules/react-native-web'),
};

module.exports = config;
