# Workspace setup

The [`README.md`](https://github.com/bl5ck/react-boilerplate-demo) gives you adequate information on how to clone boilerplate files, install dependencies and launch the example app.

Once you have done that, this document is intended to give you a ideal workspace setup for React using [`Virtual Studio Code`](https://code.visualstudio.com/). Needs may vary so you can tailor your plugins collection and workspace settings to fit you best.

## Plugins

### General

- [Document This](https://marketplace.visualstudio.com/items?itemName=joelday.docthis) (Automatically generates detailed JSDoc comments in TypeScript and JavaScript files).
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (Integrates [ESLint](https://eslint.org/) JavaScript into VS Code).
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (VS Code plugin for [prettier](https://prettier.io/)).
- [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.bookmarks) (Mark lines and jump to them).
- [Import cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) (Display import/require package size in the editor). _Issue warning: If you're using Ubuntu, this plugin may cause high rated disk reads_.
- [NPM intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense) (Autocompletes npm modules in import statements).
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) (Supercharge the Git capabilities built into Visual Studio Code — Visualize code authorship at a glance via Git blame annotations and code lens, seamlessly navigate and explore Git repositories, gain valuable insights via powerful comparison commands, and so much more).
- [Preview](https://marketplace.visualstudio.com/items?itemName=searKing.preview-vscode) (A Markdown, ReStructured Text, HTML, Jade, Pug, Image, CSS, Mermaid previewer).
- [TODO highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) (highlight TODOs, FIXMEs, and any keywords, annotations...).
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) (Spelling checker for source code
  ).

### Debugger

- [For Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
- [For Edge](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-edge)
- [For Firefox](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-firefox-debug)

### React

- [React-Native/React/Redux snippets for es6/es7](https://marketplace.visualstudio.com/items?itemName=EQuimper.react-native-react-redux) (Code snippets for React-Native/React/Redux es6/es7 and flowtype).

### Backup

- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) (Synchronize Settings, Snippets, Themes, File Icons, Launch, Keybindings, Workspaces and Extensions Across Multiple Machines Using GitHub Gist).

## Settings

```json
{
  "cSpell.allowCompoundWords": true,
  "cSpell.enabledLanguageIds": [
    "c",
    "cpp",
    "csharp",
    "go",
    "handlebars",
    "javascript",
    "javascriptreact",
    "json",
    "latex",
    "markdown",
    "php",
    "plaintext",
    "python",
    "restructuredtext",
    "text",
    "typescript",
    "typescriptreact",
    "yml",
    "md"
  ],
  "cSpell.ignorePaths": [
    "**/node_modules/**",
    "**/vscode-extension/**",
    "**/.git/**",
    "**/AppData/**",
    ".vscode",
    "typings"
  ],
  "cSpell.language": "en,en-US",
  "cSpell.userWords": [
    "CODELYZER",
    "Uncomment",
    "composable",
    "devs",
    "dropdown",
    "flexbox",
    "injectable",
    "memberof",
    "memoization",
    "polyfill",
    "repo",
    "skippable",
    "untrusted",
    "vuex"
  ],

  "diffEditor.ignoreTrimWhitespace": true,

  "editor.tabSize": 2,
  "editor.renderWhitespace": "all",
  "editor.detectIndentation": false,
  "editor.insertSpaces": true,
  "editor.renderIndentGuides": true,
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,

  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "emmet.triggerExpansionOnTab": true,

  "extensions.ignoreRecommendations": false,

  "files.associations": {
    "*.js": "javascriptreact"
  },
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 30000,
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/node_modules": true
  },

  "git.autofetch": true,

  "gitlens.advanced.messages": {
    "suppressCommitHasNoPreviousCommitWarning": false,
    "suppressCommitNotFoundWarning": false,
    "suppressFileNotUnderSourceControlWarning": false,
    "suppressGitVersionWarning": false,
    "suppressLineUncommittedWarning": false,
    "suppressNoRepositoryWarning": false,
    "suppressResultsExplorerNotice": true,
    "suppressShowKeyBindingsNotice": true,
    "suppressUpdateNotice": false,
    "suppressWelcomeNotice": true
  },
  "gitlens.historyExplorer.enabled": false,
  "gitlens.keymap": "chorded",

  "html.format.wrapAttributes": "force-aligned",

  "javascript.validate.enable": false,
  "javascript.referencesCodeLens.enabled": true,

  "prettier.eslintIntegration": true,
  "prettier.singleQuote": true,

  "window.zoomLevel": 0
}
```
