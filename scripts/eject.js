// process args
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
const getArg = key =>
  possibleArgs.find(({ arg, abbr }) => key === arg || key === abbr);

const possibleArgsKeys = [...possibleArgs.map(({ arg, abbr }) => [arg, abbr])];

const args = {};
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

console.log(args);
// eject package.json
// eject configs
// / eject config.dev.json
// / eject config.prod.json
// eject public assets
// / eject assets
// / eject favicon
// / eject index.html
// /eject manifest.json
// eject src
// /eject app.js
// / eject config.js
// / eject components
// /eject containers
// /eject HOCs
// /eject intl
// /eject mockData
