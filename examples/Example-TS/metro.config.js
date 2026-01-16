const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const libraryRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch the lib folder for the library source
config.watchFolders = [path.resolve(libraryRoot, 'lib')];

// Ensure we only resolve from example's node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
];

// Block the root node_modules entirely
config.resolver.blockList = [
  new RegExp(path.resolve(libraryRoot, 'node_modules').replace(/[/\\]/g, '[/\\\\]') + '.*'),
];

// Map the library to the lib folder, and React packages to example's node_modules
config.resolver.extraNodeModules = {
  'react-native-timeline-flatlist': path.resolve(libraryRoot, 'lib'),
  'react': path.resolve(projectRoot, 'node_modules/react'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
};

module.exports = config;
