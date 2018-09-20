const { log, processTags, finalizeArgs, execStep } = require('jsuti');
const path = require('path');
const fs = require('fs');
const del = require('del');

// configs
/**
 * final args object
 */
const cliArgs = {};
/**
 * possible args
 */
const possibleArgs = [
  // App's name
  {
    name: 'name',
    arg: '--name',
    abbr: '-n',
    default: undefined,
  },

  // App's short name
  // By default, it is first world of app's name
  // For example:
  //  If app's name is "My fantastic app",
  //  then short name would be "my" (without quotes)
  {
    name: 'shortName',
    arg: '--short-name',
    abbr: '-s',
    default: args => args.name.split(' ')[0],
  },

  // App's package name
  // By default, it is app's name in  kebab-case
  // For example:
  //  If app's name is "My fantastic app",
  //  then package name would be "my-fantastic-app" (without quotes)
  {
    name: 'package',
    arg: '--package',
    abbr: '-p',
    default: args =>
      args.name
        .split(' ')
        .map(chunk => chunk.toLowerCase())
        .join('-'),
  },

  // Is the package private?
  // By default, it is private
  {
    name: 'private',
    arg: '--private',
    abbr: '-r',
    default: true,
  },

  // Is the app support multilingual?
  // By default, it supports
  {
    name: 'multilingual',
    arg: '--multilingual',
    abbr: '-u',
    default: true,
  },

  // App's home page url
  // By default, it is "/"
  {
    name: 'home',
    arg: '--home',
    abbr: '-m',
    default: '/',
  },

  // App's favicon 's path
  {
    name: 'favicon',
    arg: '--favicon',
    abbr: '-f',
    default: undefined,
  },

  // App's manifest file
  {
    name: 'manifest',
    arg: '--manifest',
    abbr: '-e',
    default: undefined,
  },
  // CLI help
  {
    name: 'help',
    arg: '--help',
    abbr: '-h',
    default: undefined,
  },
];
/**
 * Steps name constants
 */
const STEPS = {
  PREPARE: 'prepare',
  EJECT_PACKAGE_JSON: 'eject package.json',
  EJECT_CONFIGS: 'eject configs',
  EJECT_CONFIG_DEV_JSON: 'eject config.dev.json',
  EJECT_CONFIG_PROD_JSON: 'eject config.prod.json',
  EJECT_PUBLIC_ASSETS: 'eject public assets',
  EJECT_ASSETS: 'eject assets',
  EJECT_FAVICON: 'eject favicon',
  EJECT_INDEX_HTML: 'eject index.html',
  EJECT_MANIFEST_JSON: 'eject manifest.json',
  EJECT_SRC: 'eject src',
  EJECT_APP_JS: 'eject app.js',
  EJECT_CONFIG_JS: 'eject config.js',
  EJECT_REDUCER_JS: 'eject reducer.js',
  EJECT_SAGA_JS: 'eject saga.js',
  EJECT_STORE_JS: 'eject store.js',
  EJECT_COMPONENTS: 'eject components',
  EJECT_FOOTER: 'eject Footer',
  EJECT_HEADER: 'eject Header',
  EJECT_LOADER: 'eject Loader',
  EJECT_CONTAINERS: 'eject containers',
  EJECT_HOCS: 'eject HOCs',
  EJECT_INTL: 'eject intl',
  EJECT_MOCK_DATA: 'eject mockData',
};
/**
 * Path contants
 */
const PATHS = (() => {
  const ROOT = path.join(__dirname, '..');
  const CONFIG = path.join(ROOT, 'config');
  const PUBLIC = path.join(ROOT, 'public');
  const SRC = path.join(ROOT, 'src');
  const COMPONENTS = path.join(SRC, 'components');
  const FOOTER = path.join(COMPONENTS, 'Footer');
  const HEADER = path.join(COMPONENTS, 'Header');
  const LOADER = path.join(COMPONENTS, 'Loader');
  const HOCS = path.join(SRC, 'HOCs');
  return {
    ROOT,
    CONFIG,
    PUBLIC,
    SRC,
    COMPONENTS,
    FOOTER,
    HEADER,
    LOADER,
    HOCS,
  };
})();

/**
 * eject steps
 */
const ejectSteps = [
  // prepare
  {
    name: STEPS.PREPARE,
    exec: (args, step) => {
      finalizeArgs(args, possibleArgs);
      args.multilingual = args.multilingual && args.multilingual !== 'false';
    },
  },
  // eject package.json
  {
    name: STEPS.EJECT_PACKAGE_JSON,
    exec: async (args, step) => {
      const npmPackages = require('../package.json');
      const dependencies = Object.keys(npmPackages.dependencies)
        .filter(
          package =>
            package !== 'antd' &&
            ((!args.multilingual &&
              package !== 'react-intl' &&
              package !== 'react-intl-redux') ||
              args.multilingual)
        )
        .reduce(
          (packages, package) => ({
            ...packages,
            [package]: npmPackages.dependencies[package],
          }),
          {}
        );
      const outputPackages = {
        ...npmPackages,
        name: args.package,
        homepage: args.home,
        private: args.private,
        dependencies,
      };
      // backup current package.json file
      const backupPath = path.join(PATHS.ROOT, 'package.bk.json');
      const packageJsonPath = path.join(PATHS.ROOT, 'package.json');
      fs.copyFileSync(packageJsonPath, backupPath);
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(outputPackages, null, 2)
      );
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.ROOT, 'package.bk.json');
      const packageJsonPath = path.join(PATHS.ROOT, 'package.json');
      const stat = fs.statSync(packageJsonPath);
      if (stat.isFile) {
        fs.unlinkSync(packageJsonPath);
      }
      fs.copyFileSync(backupPath, packageJsonPath);
      fs.unlinkSync(backupPath);
    },
  },
  // eject configs
  {
    name: STEPS.EJECT_CONFIGS,
    childProcesses: [STEPS.EJECT_CONFIG_DEV_JSON, STEPS.EJECT_CONFIG_PROD_JSON],
  },
  // / eject config.dev.json
  {
    name: STEPS.EJECT_CONFIG_DEV_JSON,
    exec: async (args, step) => {
      const backupPath = path.join(PATHS.CONFIG, 'config.dev.bk.json');
      const configPath = path.join(PATHS.CONFIG, 'config.dev.json');
      fs.copyFileSync(configPath, backupPath);
      fs.writeFileSync(configPath, '{}');
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.CONFIG, 'config.dev.bk.json');
      const configPath = path.join(PATHS.CONFIG, 'config.dev.json');
      fs.unlinkSync(configPath);
      fs.copyFileSync(backupPath, configPath);
    },
  },
  // / eject config.prod.json
  {
    name: STEPS.EJECT_CONFIG_PROD_JSON,
    exec: async (args, step) => {
      const backupPath = path.join(PATHS.CONFIG, 'config.prod.bk.json');
      const configPath = path.join(PATHS.CONFIG, 'config.prod.json');
      fs.copyFileSync(configPath, backupPath);
      fs.writeFileSync(configPath, '{}');
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.CONFIG, 'config.prod.bk.json');
      const configPath = path.join(PATHS.CONFIG, 'config.prod.json');
      fs.unlinkSync(configPath);
      fs.copyFileSync(backupPath, configPath);
    },
  },
  // eject public assets
  {
    name: STEPS.EJECT_PUBLIC_ASSETS,
    childProcesses: [
      STEPS.EJECT_ASSETS,
      STEPS.EJECT_FAVICON,
      STEPS.EJECT_INDEX_HTML,
      STEPS.EJECT_MANIFEST_JSON,
    ],
  },
  // / eject assets
  {
    name: STEPS.EJECT_ASSETS,
    exec: async (args, step) => {
      const backupPath = path.join(PATHS.PUBLIC, 'assets-bk');
      const assetsPath = path.join(PATHS.PUBLIC, 'assets');
      fs.renameSync(assetsPath, backupPath);
      fs.mkdirSync(assetsPath);
      del.sync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.PUBLIC, 'assets-bk');
      const assetsPath = path.join(PATHS.PUBLIC, 'assets');
      del.sync(assetsPath);
      fs.renameSync(backupPath, assetsPath);
    },
  },
  // / eject favicon
  {
    name: STEPS.EJECT_FAVICON,
    exec: async (args, step) => {
      if (!args.favicon) {
        return;
      }
      const backupPath = path.join(PATHS.PUBLIC, 'favicon.bk.ico');
      const faviconPath = path.join(PATHS.PUBLIC, 'favicon.ico');
      fs.renameSync(faviconPath, backupPath);
      fs.copyFileSync(args.favicon, faviconPath);
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.PUBLIC, 'favicon.bk.ico');
      const faviconPath = path.join(PATHS.PUBLIC, 'favicon.ico');
      fs.unlinkSync(faviconPath);
      fs.renameSync(backupPath, faviconPath);
    },
  },
  // / eject index.html
  {
    name: STEPS.EJECT_INDEX_HTML,
    exec: async (args, step) => {
      const backupPath = path.join(PATHS.PUBLIC, 'index.bk.html');
      const indexPath = path.join(PATHS.PUBLIC, 'index.html');
      fs.copyFileSync(indexPath, backupPath);
      const html = fs.readFileSync(indexPath);
      const ejectedHTML = processTags('eject', html.toString('utf8'), cliArgs);
      fs.writeFileSync(indexPath, ejectedHTML);
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.PUBLIC, 'index.bk.html');
      const indexPath = path.join(PATHS.PUBLIC, 'index.html');
      fs.unlinkSync(indexPath);
      fs.renameSync(backupPath, indexPath);
    },
  },
  // /eject manifest.json
  {
    name: STEPS.EJECT_MANIFEST_JSON,
    exec: async (args, step) => {
      const backupPath = path.join(PATHS.PUBLIC, 'manifest.bk.json');
      const manifestPath = path.join(PATHS.PUBLIC, 'manifest.json');
      const manifest = require('../public/manifest.json');
      const outputManifest = {
        ...manifest,
        name: args.name,
        short_name: args.shortName,
      };
      fs.copyFileSync(manifestPath, backupPath);
      fs.writeFileSync(manifestPath, JSON.stringify(outputManifest, null, 2));
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.PUBLIC, 'manifest.bk.json');
      const manifestPath = path.join(PATHS.PUBLIC, 'manifest.json');
      fs.unlinkSync(manifestPath);
      fs.renameSync(backupPath, manifestPath);
    },
  },
  // eject src
  {
    name: STEPS.EJECT_SRC,
    childProcesses: [
      STEPS.EJECT_APP_JS,
      STEPS.EJECT_CONFIG_JS,
      STEPS.EJECT_REDUCER_JS,
      STEPS.EJECT_SAGA_JS,
      STEPS.EJECT_STORE_JS,
      STEPS.EJECT_COMPONENTS,
      STEPS.EJECT_CONTAINERS,
      STEPS.EJECT_HOCS,
      STEPS.EJECT_INTL,
      STEPS.EJECT_MOCK_DATA,
    ],
  },
  // /eject App.js
  {
    name: STEPS.EJECT_APP_JS,
    exec: async (args, step) => {
      // eject App.js
      const backupPath = path.join(PATHS.SRC, 'App.bk.js');
      const appJSPath = path.join(PATHS.SRC, 'App.js');
      fs.copyFileSync(appJSPath, backupPath);
      const appJS = fs.readFileSync(appJSPath);
      const ejectedApp = processTags('eject', appJS.toString('utf8'), cliArgs);
      fs.writeFileSync(appJSPath, ejectedApp);
      // eject app.styles.js
      const backupStylePath = path.join(PATHS.SRC, 'app.styles.bk.js');
      const stylePath = path.join(PATHS.SRC, 'app.styles.js');
      fs.copyFileSync(stylePath, backupStylePath);
      const styleJS = fs.readFileSync(stylePath);
      const ejectedStyle = processTags(
        'eject',
        styleJS.toString('utf8'),
        cliArgs
      );
      fs.writeFileSync(stylePath, ejectedStyle);
      fs.unlinkSync(backupPath);
      fs.unlinkSync(backupStylePath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.SRC, 'App.bk.js');
      const appJSPath = path.join(PATHS.SRC, 'App.js');
      fs.unlinkSync(appJSPath);
      fs.renameSync(backupPath, appJSPath);
      const backupStylePath = path.join(PATHS.SRC, 'app.styles.bk.js');
      const stylePath = path.join(PATHS.SRC, 'app.styles.js');
      fs.unlinkSync(stylePath);
      fs.renameSync(backupStylePath, stylePath);
    },
  },
  // / eject config.js
  {
    name: STEPS.EJECT_CONFIG_JS,
    exec: async (args, step) => {
      const backupPath = path.join(PATHS.SRC, 'config.bk.js');
      const configPath = path.join(PATHS.SRC, 'config.js');
      fs.copyFileSync(configPath, backupPath);
      const js = fs.readFileSync(configPath);
      const ejectedJS = processTags('eject', js.toString('utf8'), cliArgs);
      fs.writeFileSync(configPath, ejectedJS);
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.SRC, 'config.bk.js');
      const configPath = path.join(PATHS.SRC, 'config.js');
      fs.unlinkSync(configPath);
      fs.renameSync(backupPath, configPath);
    },
  },
  // / eject reducer.js
  {
    name: STEPS.EJECT_REDUCER_JS,
    exec: async (args, step) => {
      const backupPath = path.join(PATHS.SRC, 'reducer.bk.js');
      const reducerPath = path.join(PATHS.SRC, 'reducer.js');
      fs.copyFileSync(reducerPath, backupPath);
      const js = fs.readFileSync(reducerPath);
      const ejectedJS = processTags('eject', js.toString('utf8'), cliArgs);
      fs.writeFileSync(reducerPath, ejectedJS);
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.SRC, 'reducer.bk.js');
      const reducerPath = path.join(PATHS.SRC, 'reducer.js');
      fs.unlinkSync(reducerPath);
      fs.renameSync(backupPath, reducerPath);
    },
  },
  // / eject saga.js
  {
    name: STEPS.EJECT_SAGA_JS,
    exec: async (args, step) => {
      const backupPath = path.join(PATHS.SRC, 'saga.bk.js');
      const sagaPath = path.join(PATHS.SRC, 'saga.js');
      fs.copyFileSync(sagaPath, backupPath);
      const js = fs.readFileSync(sagaPath);
      const ejectedJS = processTags('eject', js.toString('utf8'), cliArgs);
      fs.writeFileSync(sagaPath, ejectedJS);
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.SRC, 'saga.bk.js');
      const sagaPath = path.join(PATHS.SRC, 'saga.js');
      fs.unlinkSync(sagaPath);
      fs.renameSync(backupPath, sagaPath);
    },
  },
  // / eject store.js
  {
    name: STEPS.EJECT_STORE_JS,
    exec: async (args, step) => {
      const backupPath = path.join(PATHS.SRC, 'store.bk.js');
      const storePath = path.join(PATHS.SRC, 'store.js');
      fs.copyFileSync(storePath, backupPath);
      const js = fs.readFileSync(storePath);
      const ejectedJS = processTags('eject', js.toString('utf8'), cliArgs);
      fs.writeFileSync(storePath, ejectedJS);
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.SRC, 'store.bk.js');
      const storePath = path.join(PATHS.SRC, 'store.js');
      fs.unlinkSync(storePath);
      fs.renameSync(backupPath, storePath);
    },
  },
  // / eject components
  {
    name: STEPS.EJECT_COMPONENTS,
    exec: async (args, step) => {
      // eject Translation
      const backupPath = path.join(PATHS.COMPONENTS, 'Translation-bk');
      const translationPath = path.join(PATHS.COMPONENTS, 'Translation');
      fs.renameSync(translationPath, backupPath);
      fs.mkdirSync(translationPath);
      // eject index.js
      const indexBackupPath = path.join(PATHS.COMPONENTS, 'index.bk.js');
      const indexPath = path.join(PATHS.COMPONENTS, 'index.js');
      fs.copyFileSync(indexPath, indexBackupPath);
      const js = fs.readFileSync(indexPath);
      const ejectedJS = processTags('eject', js.toString('utf8'), cliArgs);
      fs.writeFileSync(indexPath, ejectedJS);

      del.sync(backupPath);
      fs.unlinkSync(indexBackupPath);
    },
    undo: async () => {
      // undo eject Translation
      const backupPath = path.join(PATHS.COMPONENTS, 'Translation-bk');
      const translationPath = path.join(PATHS.COMPONENTS, 'Translation');
      del.sync(translationPath);
      fs.renameSync(backupPath, translationPath);
      // undo index.js
      const indexBackupPath = path.join(PATHS.COMPONENTS, 'index.bk.js');
      const indexPath = path.join(PATHS.COMPONENTS, 'index.js');
      fs.unlinkSync(indexPath);
      fs.renameSync(indexBackupPath, indexPath);
    },
    childProcesses: [
      STEPS.EJECT_FOOTER,
      STEPS.EJECT_HEADER,
      STEPS.EJECT_LOADER,
    ],
  },
  // / eject Footer
  {
    name: STEPS.EJECT_FOOTER,
    exec: async (args, step) => {
      // eject Footer.js
      const backupPath = path.join(PATHS.FOOTER, 'Footer.bk.js');
      const footerJSPath = path.join(PATHS.FOOTER, 'Footer.js');
      fs.copyFileSync(footerJSPath, backupPath);
      const footerJS = fs.readFileSync(footerJSPath);
      const ejectedFooter = processTags(
        'eject',
        footerJS.toString('utf8'),
        cliArgs
      );
      fs.writeFileSync(footerJSPath, ejectedFooter);
      // eject footer.styles.js
      const backupStylePath = path.join(PATHS.FOOTER, 'footer.styles.bk.js');
      const stylePath = path.join(PATHS.FOOTER, 'footer.styles.js');
      fs.copyFileSync(stylePath, backupStylePath);
      const styleJS = fs.readFileSync(stylePath);
      const ejectedStyle = processTags(
        'eject',
        styleJS.toString('utf8'),
        cliArgs
      );
      fs.writeFileSync(stylePath, ejectedStyle);
      fs.unlinkSync(backupPath);
      fs.unlinkSync(backupStylePath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.FOOTER, 'Footer.bk.js');
      const footerJSPath = path.join(PATHS.FOOTER, 'Footer.js');
      fs.unlinkSync(footerJSPath);
      fs.renameSync(backupPath, footerJSPath);
      const backupStylePath = path.join(PATHS.FOOTER, 'footer.styles.bk.js');
      const stylePath = path.join(PATHS.FOOTER, 'footer.styles.js');
      fs.unlinkSync(stylePath);
      fs.renameSync(backupStylePath, stylePath);
    },
  },
  // / eject Header
  {
    name: STEPS.EJECT_HEADER,
    exec: async (args, step) => {
      // eject App.js
      const backupPath = path.join(PATHS.HEADER, 'Header.bk.js');
      const headerJSPath = path.join(PATHS.HEADER, 'Header.js');
      fs.copyFileSync(headerJSPath, backupPath);
      const headerJS = fs.readFileSync(headerJSPath);
      const ejectedApp = processTags(
        'eject',
        headerJS.toString('utf8'),
        cliArgs
      );
      fs.writeFileSync(headerJSPath, ejectedApp);
      // eject app.styles.js
      const backupStylePath = path.join(PATHS.HEADER, 'header.styles.bk.js');
      const stylePath = path.join(PATHS.HEADER, 'header.styles.js');
      fs.copyFileSync(stylePath, backupStylePath);
      const styleJS = fs.readFileSync(stylePath);
      const ejectedStyle = processTags(
        'eject',
        styleJS.toString('utf8'),
        cliArgs
      );
      fs.writeFileSync(stylePath, ejectedStyle);
      fs.unlinkSync(backupPath);
      fs.unlinkSync(backupStylePath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.HEADER, 'Header.bk.js');
      const headerJSPath = path.join(PATHS.HEADER, 'Header.js');
      fs.unlinkSync(headerJSPath);
      fs.renameSync(backupPath, headerJSPath);
      const backupStylePath = path.join(PATHS.HEADER, 'header.styles.bk.js');
      const stylePath = path.join(PATHS.HEADER, 'header.styles.js');
      fs.unlinkSync(stylePath);
      fs.renameSync(backupStylePath, stylePath);
    },
  },
  // / eject Loader
  {
    name: STEPS.EJECT_LOADER,
    exec: async (args, step) => {
      // eject Loader.js
      const backupPath = path.join(PATHS.LOADER, 'Loader.bk.js');
      const loaderJSPath = path.join(PATHS.LOADER, 'Loader.js');
      fs.copyFileSync(loaderJSPath, backupPath);
      const loaderJS = fs.readFileSync(loaderJSPath);
      const ejectedLoader = processTags(
        'eject',
        loaderJS.toString('utf8'),
        cliArgs
      );
      fs.writeFileSync(loaderJSPath, ejectedLoader);
      // eject loader.styles.js
      const backupStylePath = path.join(PATHS.LOADER, 'loader.styles.bk.js');
      const stylePath = path.join(PATHS.LOADER, 'loader.styles.js');
      fs.copyFileSync(stylePath, backupStylePath);
      const styleJS = fs.readFileSync(stylePath);
      const ejectedStyle = processTags(
        'eject',
        styleJS.toString('utf8'),
        cliArgs
      );
      fs.writeFileSync(stylePath, ejectedStyle);
      fs.unlinkSync(backupPath);
      fs.unlinkSync(backupStylePath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.LOADER, 'Loader.bk.js');
      const loaderJSPath = path.join(PATHS.LOADER, 'Loader.js');
      fs.unlinkSync(loaderJSPath);
      fs.renameSync(backupPath, loaderJSPath);
      const backupStylePath = path.join(PATHS.LOADER, 'loader.styles.bk.js');
      const stylePath = path.join(PATHS.LOADER, 'loader.styles.js');
      fs.unlinkSync(stylePath);
      fs.renameSync(backupStylePath, stylePath);
    },
  },
  // /eject containers
  {
    name: STEPS.EJECT_CONTAINERS,
    exec: async (args, step) => {
      const backupPath = path.join(PATHS.SRC, 'containers-bk');
      const containersPath = path.join(PATHS.SRC, 'containers');
      fs.renameSync(containersPath, backupPath);
      fs.mkdirSync(containersPath);
      del.sync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.SRC, 'containers-bk');
      const containersPath = path.join(PATHS.SRC, 'containers');
      del.sync(containersPath);
      fs.renameSync(backupPath, containersPath);
    },
  },
  // /eject HOCs
  {
    name: STEPS.EJECT_HOCS,
    exec: async (args, step) => {
      // eject auth
      const authBackupPath = path.join(PATHS.HOCS, 'auth-bk');
      const authPath = path.join(PATHS.HOCS, 'auth');
      fs.renameSync(authPath, authBackupPath);
      fs.mkdirSync(authPath);

      // eject intl
      if (!args.multilingual) {
        const intlBackupPath = path.join(PATHS.HOCS, 'intl-bk');
        const intlPath = path.join(PATHS.HOCS, 'intl');
        fs.renameSync(intlPath, intlBackupPath);
        fs.mkdirSync(intlPath);
        del.sync(intlBackupPath);
      }
      del.sync(authBackupPath);
    },
    undo: async (args, step) => {
      // undo eject auth
      const authBackupPath = path.join(PATHS.HOCS, 'auth-bk');
      const authPath = path.join(PATHS.HOCS, 'auth');
      del.sync(authPath);
      fs.renameSync(authBackupPath, authPath);
      // undo eject intl
      if (!args.multilingual) {
        const intlBackupPath = path.join(PATHS.HOCS, 'intl-bk');
        const intlPath = path.join(PATHS.HOCS, 'intl');
        del.sync(intlPath);
        fs.renameSync(intlBackupPath, intlPath);
      }
    },
  },
  // /eject intl
  {
    name: STEPS.EJECT_INTL,
    exec: async (args, step) => {
      if (!args.multilingual) {
        const intlBackupPath = path.join(PATHS.SRC, 'intl-bk');
        const intlPath = path.join(PATHS.SRC, 'intl');
        fs.renameSync(intlPath, intlBackupPath);
        fs.mkdirSync(intlPath);
        del.sync(intlBackupPath);
        return;
      }
      const backupPath = path.join(PATHS.SRC, 'intl', 'en-US.bk.js');
      const enUSJSPath = path.join(PATHS.SRC, 'intl', 'en-US.js');
      fs.copyFileSync(enUSJSPath, backupPath);
      const loaderJS = fs.readFileSync(enUSJSPath);
      const enUSJS = processTags('eject', loaderJS.toString('utf8'), cliArgs);
      fs.writeFileSync(enUSJSPath, enUSJS);
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      if (!args.multilingual) {
        const intlBackupPath = path.join(PATHS.SRC, 'intl-bk');
        const intlPath = path.join(PATHS.SRC, 'intl');
        del.sync(intlPath);
        fs.renameSync(intlBackupPath, intlPath);
        return;
      }
      const backupPath = path.join(PATHS.SRC, 'intl', 'en-US.bk.js');
      const enUSJSPath = path.join(PATHS.SRC, 'intl', 'en-US.js');
      fs.unlinkSync(enUSJSPath);
      fs.renameSync(backupPath, enUSJSPath);
    },
  },
  // /eject mockData
  {
    name: STEPS.EJECT_MOCK_DATA,
    exec: async (args, step) => {
      const backupPath = path.join(PATHS.SRC, 'mockData-bk');
      const mockDataPath = path.join(PATHS.SRC, 'mockData');
      fs.renameSync(mockDataPath, backupPath);
      fs.mkdirSync(mockDataPath);
      del.sync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(PATHS.SRC, 'mockData-bk');
      const mockDataPath = path.join(PATHS.SRC, 'mockData');
      del.sync(mockDataPath);
      fs.renameSync(backupPath, mockDataPath);
    },
  },
];
// exec all eject steps
const stdin = process.openStdin();
log('<white You are going to eject example app from this boilerplate./>');
log('<yellow Please note that this action CANNOT be UNDONE!/>');
log('<white Are you sure to continue?(Y/N) Default is "N" />').write();
stdin.addListener('data', answer => {
  switch (
    answer
      .toString()
      .trim()
      .toLowerCase()
  ) {
    case 'y': {
      // exec all eject steps
      Promise.all(ejectSteps.map((...args) => execStep(cliArgs, ...args)))
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
      break;
    }
    case 'n':
    default: {
      log('<grey Action cancelled./>').write();
      process.exit(0);
    }
  }
});
