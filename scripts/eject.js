const { log } = require('jsuti');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf')

/**
 * Process commented tags in HTML or JS string
 * @param {*} tagName
 * @param {*} html
 * @param {*} args
 */
const processTags = (tagName, html, args) => {
  if (!html) {
    return;
  }
  /**
   * Support in HTML:
   *  <!-- eject:args.title -->
   *  <title>My title</title>
   *  <!-- /eject:args.title -->
   * Support in JS:
   *  // <!-- eject:args.title -->
   *  pageTitle = 'My title';
   *  // <!-- /eject:args.title -->
   */
  const testString = `(\\/\\/ |)<!-- ${tagName}:(((?!-->).)*) -->(((?!<!-- \\/${tagName}:).)*)(\\/\\/ |)<!-- \\/${tagName}:(((?!-->).)*) -->`;
  const tagTest = new RegExp(testString, 'g');
  return html
    .replace(/\r\n|\r|\n/g, '<newline />')
    .replace(tagTest, (matchString) => {
      const match = new RegExp(testString).exec(matchString);
      const openTag = match[2];
      const tagContent = match[4];
      const closeTag = match[7];
      if (
        !openTag ||
        !tagContent ||
        !closeTag ||
        (openTag !== closeTag && !openTag.startsWith(closeTag))
      ) {
        throw new Error('There are invalid eject tags in your document! Please check if you missed content, spaces between "<!--" or "-->" and tag name, missed or added wrong closing tags.');
      }
      const propMatch = new RegExp(
        `^${closeTag} ((( *)(([a-z-]+)='([^']+)'))*)`,
        'g'
      );
      let propsString = '';
      if (propMatch.test(openTag)) {
        propsString = openTag.replace(`${closeTag} `, '');
      }
      const props = {};
      if (propsString) {
        const propTest = /( *)(([a-z-]+)='([^']+)')/g;
        const matches = propsString.match(propTest);
        if (matches) {
          matches.forEach((propString) => {
            const propParse = propTest.exec(propsString);
            const propKey = propParse[3];
            const propValue = propParse[4];
            props[propKey] = propValue;
          });
        }
      }

      switch (closeTag) {
        case 'args.title': {
          return `<title>${args.name}</title>`;
        }
        case 'remove': {
          return '';
        }
        case 'replace': {
          if (!props.with) {
            throw new Error('eject:replace tag must has \'with\' property');
          }
          return props.with;
        }
      }
    })
    .replace(/<newline \/>/g, '\n');
};
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
  EJECT_COMPONENTS: 'eject components',
  EJECT_CONTAINERS: 'eject containers',
  EJECT_HOCS: 'eject HOCs',
  EJECT_INTL: 'eject intl',
  EJECT_MOCK_DATA: 'eject mockData',
};
/**
 * eject steps
 */
const ejectSteps = [
  // prepare
  {
    name: STEPS.PREPARE,
    exec: (args, step) => {
      const getArg = key =>
        possibleArgs.find(({ arg, abbr }) => key === arg || key === abbr);

      const possibleArgsKeys = [
        ...possibleArgs.map(({ arg, abbr }) => [arg, abbr]),
      ];

      // pair params and values
      process.argv.forEach((key, index, keys) => {
        const paramKeyRegex = /^-{1,2}/;
        if (!paramKeyRegex.test(key)) {
          // key is param's value
          return;
        }
        // key is param's name
        const arg = getArg(key);
        if (!arg) {
          const suggestion = possibleArgsKeys.find(arg => arg.contains(key));
          throw new Error(`Argument ${key} is invalid!`.concat(!suggestion ? '' : `Did you mean "${suggestion}"?`));
        }
        const { name, default: defaultValue } = arg;
        const valueIndex = index + 1;
        if (!keys[valueIndex] || paramKeyRegex.test(keys[valueIndex])) {
          // value is not available
          if (typeof defaultValue === 'undefined') {
            throw new Error(`Argument ${key}'s value must be specified!`);
          }
          args[name] = defaultValue;
          return;
        }
        args[name] = keys[valueIndex];
      });

      /**
       * Get current value or default value of a param
       * @param key {string} param's key
       */
      const valueOrDefault = (key, arg) => {
        if (typeof args[key] !== 'function') {
          if (typeof args[key] !== 'undefined') {
            return args[key];
          }
          if (typeof arg.default !== 'function') {
            return arg.default;
          }
          return arg.default(args);
        }
        // default value is a function
        return args[key](args);
      };

      // finalize args
      possibleArgs.forEach((arg) => {
        args[arg.name] = valueOrDefault(arg.name, arg);
      });
    },
  },
  // eject package.json
  {
    name: STEPS.EJECT_PACKAGE_JSON,
    exec: async (args, step) => {
      const npmPackages = require('../package.json');
      const outputPackages = {
        ...npmPackages,
        name: args.package,
        homepage: args.home,
        private: args.private,
      };
      // backup current package.json file
      const backupPath = path.join(__dirname, '..', 'package.bk.json');
      const packageJsonPath = path.join(__dirname, '..', 'package.json');
      fs.copyFileSync(packageJsonPath, backupPath);
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(outputPackages, null, 2)
      );
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(__dirname, '..', 'package.bk.json');
      const packageJsonPath = path.join(__dirname, '..', 'package.json');
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
      const backupPath = path.join(
        __dirname,
        '..',
        'config',
        'config.dev.bk.json'
      );
      const configPath = path.join(
        __dirname,
        '..',
        'config',
        'config.dev.json'
      );
      fs.copyFileSync(configPath, backupPath);
      fs.writeFileSync(configPath, '{}');
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(
        __dirname,
        '..',
        'config',
        'config.dev.bk.json'
      );
      const configPath = path.join(
        __dirname,
        '..',
        'config',
        'config.dev.json'
      );
      fs.unlinkSync(configPath);
      fs.copyFileSync(backupPath, configPath);
    },
  },
  // / eject config.prod.json
  {
    name: STEPS.EJECT_CONFIG_PROD_JSON,
    exec: async (args, step) => {
      const backupPath = path.join(
        __dirname,
        '..',
        'config',
        'config.prod.bk.json'
      );
      const configPath = path.join(
        __dirname,
        '..',
        'config',
        'config.prod.json'
      );
      fs.copyFileSync(configPath, backupPath);
      fs.writeFileSync(configPath, '{}');
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(
        __dirname,
        '..',
        'config',
        'config.prod.bk.json'
      );
      const configPath = path.join(
        __dirname,
        '..',
        'config',
        'config.prod.json'
      );
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
      const backupPath = path.join(__dirname, '..', 'public', 'assets-bk');
      const assetsPath = path.join(__dirname, '..', 'public', 'assets');
      fs.renameSync(assetsPath, backupPath);
      fs.mkdirSync(assetsPath);
      rimraf.sync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(__dirname, '..', 'public', 'assets-bk');
      const assetsPath = path.join(__dirname, '..', 'public', 'assets');
      rimraf.sync(assetsPath);
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
      const backupPath = path.join(__dirname, '..', 'public', 'favicon.bk.ico');
      const faviconPath = path.join(__dirname, '..', 'public', 'favicon.ico');
      fs.renameSync(faviconPath, backupPath);
      fs.copyFileSync(args.favicon, faviconPath);
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(__dirname, '..', 'public', 'favicon.bk.ico');
      const faviconPath = path.join(__dirname, '..', 'public', 'favicon.ico');
      fs.unlinkSync(faviconPath);
      fs.renameSync(backupPath, faviconPath);
    },
  },
  // / eject index.html
  {
    name: STEPS.EJECT_INDEX_HTML,
    exec: async (args, step) => {
      const backupPath = path.join(__dirname, '..', 'public', 'index.bk.html');
      const indexPath = path.join(__dirname, '..', 'public', 'index.html');
      fs.copyFileSync(indexPath, backupPath);
      const html = fs.readFileSync(indexPath);
      const ejectedHTML = processTags('eject', html.toString('utf8'), cliArgs);
      fs.writeFileSync(indexPath, ejectedHTML);
      fs.unlinkSync(backupPath);
    },
    undo: async (args, step) => {
      const backupPath = path.join(__dirname, '..', 'public', 'index.bk.html');
      const indexPath = path.join(__dirname, '..', 'public', 'index.html');
      fs.unlinkSync(indexPath);
      fs.renameSync(backupPath, indexPath);
    },
  },
  // /eject manifest.json
  {
    name: STEPS.EJECT_MANIFEST_JSON,
    exec: async (args, step) => {},
    undo: async (args, step) => {},
  },
  // eject src
  {
    name: STEPS.EJECT_SRC,
    childProcesses: [
      STEPS.EJECT_APP_JS,
      STEPS.EJECT_CONFIG_JS,
      STEPS.EJECT_COMPONENTS,
      STEPS.EJECT_CONTAINERS,
      STEPS.EJECT_HOCS,
      STEPS.EJECT_INTL,
      STEPS.EJECT_MOCK_DATA,
    ],
  },
  // /eject app.js
  {
    name: STEPS.EJECT_APP_JS,
    exec: async (args, step) => {},
    undo: async (args, step) => {},
  },
  // / eject config.js
  {
    name: STEPS.EJECT_CONFIG_JS,
    exec: async (args, step) => {},
    undo: async (args, step) => {},
  },
  // / eject components
  {
    name: STEPS.EJECT_COMPONENTS,
    exec: async (args, step) => {},
    undo: async (args, step) => {},
  },
  // /eject containers
  {
    name: STEPS.EJECT_CONTAINERS,
    exec: async (args, step) => {},
    undo: async (args, step) => {},
  },
  // /eject HOCs
  {
    name: STEPS.EJECT_HOCS,
    exec: async (args, step) => {},
    undo: async (args, step) => {},
  },
  // /eject intl
  {
    name: STEPS.EJECT_INTL,
    exec: async (args, step) => {},
    undo: async (args, step) => {},
  },
  // /eject mockData
  {
    name: STEPS.EJECT_MOCK_DATA,
    exec: async (args, step) => {},
    undo: async (args, step) => {},
  },
];
/**
 * exec all eject steps
 * @param {*} ejectStep
 */
const execStep = async (args, step, index, steps) => {
  const {
    name, exec, undo, childProcesses, parent, isExecuted,
  } = step;
  if (isExecuted) {
    return step.executed;
  }
  const errorHandle = async (error) => {
    log(`<red [Step ${name}] Failed to execute because of following error:/>\n<white ${
      error.stack
    }/>`);
    if (!undo) {
      return undefined;
    }
    log(`<green [Step ${name}]/> <yellow Undoing step /><cyan ${name}/><yellow .../>`);
    if (undo.constructor.name !== 'AsyncFunction') {
      undo(args, step);
      log(`<green [Step ${name}]/> <grey Step /><cyan ${name}/><grey  was undone. />`).write();
      return undefined;
    }
    await undo(args, step);
    log(`<green [Step ${name}]/> <grey Step /><cyan ${name}/><grey  was undone. />`).write();
    return undefined;
  };
  try {
    step.isExecuted = true;
    const exectable = Boolean(exec);
    log(`<green [Step ${name}]/> <yellow Step /><cyan ${name}/><yellow  started />`).write();
    const isAsync = exec && exec.constructor.name === 'AsyncFunction';
    if (exec && exec.constructor.name === 'AsyncFunction') {
      let checkingIndex = index;
      let previousStep = steps[checkingIndex - 1];
      // find closest previous sync step
      while (
        previousStep &&
        !previousStep.isExecuted &&
        ((previousStep.parent && parent) ||
          (!previousStep.parent && !parent)) &&
        (!previousStep.exec ||
          !previousStep.childProcesses ||
          !previousStep.childProcesses.length ||
          previousStep.exec.constructor.name === 'AsyncFunction')
      ) {
        checkingIndex--;
        previousStep = steps[checkingIndex];
      }
      // wait until closest previous sync step done
      if (steps[checkingIndex + 1] && steps[checkingIndex + 1].executed) {
        log(`<green [Step ${name}]/> <yellow Waiting for /><cyan ${
          steps[checkingIndex + 1].name
        }/><yellow until it is done... />`).write();
        await steps[checkingIndex + 1].executed;
        log(`<green [Step ${name}]/> <grey Step /><cyan ${
          steps[checkingIndex + 1].name
        }/><grey  was done. />`).write();
      }
    }
    // process childProcesses
    if (childProcesses && childProcesses.length) {
      const execChildProcess = (childName, index, steps) => {
        const childStep = ejectSteps.find(({ name }) => name === childName);
        childStep.parent = step;
        return execStep(args, childStep, index, steps);
      };
      if (!exectable) {
        log(`<green [Step ${name}]/> <yellow Waiting child processes until they are done... />`).write();
        step.executed = Promise.all(childProcesses.map(execChildProcess)).then((result) => {
          log(`<green [Step ${name}]/> <grey Child processes were done. />`).write();
          log(`<green [Step ${name}]/> <grey Step /><cyan ${name}/><grey  executed. />`).write();
          return result;
        });

        return step.executed;
      }
      log(`<green [Step ${name}]/> <yellow Waiting child processes until they are done... />`).write();

      await Promise.all(childProcesses.map(childProcesses.map(execChildProcess)));

      log(`<green [Step ${name}]/> <grey Child processes were done. />`).write();
    }
    if (exectable) {
      log(`<green [Step ${name}]/> <yellow Step /><cyan ${name}/><yellow  is executing... />`).write();

      if (!isAsync) {
        step.executed = exec(args, step);
        log(`<green [Step ${name}]/> <grey Step /><cyan ${name}/><grey  executed. />`).write();
        return step.executed;
      }
      step.executed = exec(args, step)
        .then((result) => {
          log(`<green [Step ${name}]/> <grey Step /><cyan ${name}/><grey  executed. />`).write();
          return result;
        })
        .catch(error => errorHandle(error));
      return step.executed;
    }
    log(`<green [Step ${name}]/> <grey Step /><cyan ${name}/><grey  executed. />`).write();
    return undefined;
  } catch (error) {
    return errorHandle(error);
  }
};
// exec all eject steps
const stdin = process.openStdin();
log(`
  <white You are going to eject example app from this boilerplate. />
  <yellow Please note that this action CANNOT be UNDONE!/>
  <white Are you sure to continue?(Y/N) Default is "N" />`).write();
stdin.addListener('data', (answer) => {
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
