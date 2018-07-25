# Introduction

The [`README.md`](https://github.com/ngoquoc/react-boilerplate-demo) gives you adequate information on how to clone boilerplate files, install dependencies and launch the example app.

Once you have done that, this document is intended to give you a taste of how `react-boilerplate-demo` works. It still assumes basic knowledge of React, Redux and `react-router`.

## Tech Stack

Here's a curated list of packages that you should have knowledge of, before starting your awesome project. However, the best way to have a complete list of dependencies is to see [package.json](https://github.com/ngoquoc/react-boilerplate-demo/blob/master/package.json).

### Core

- [x] [react](https://facebook.github.io/react/)
- [x] [react router](https://github.com/ReactTraining/react-router)
- [x] [redux](http://redux.js.org/)
- [x] [redux actions](https://github.com/redux-utilities/redux-actions)
- [x] [react router redux](https://github.com/reactjs/react-router-redux)
- [x] [reselect](https://github.com/reactjs/reselect)
- [x] [immutablejs](https://facebook.github.io/immutable-js/)
- [x] [jss](https://github.com/cssinjs/react-jss)

### Unit Testing

- [x] [Jest](http://facebook.github.io/jest/)
- [x] [Enzyme](http://airbnb.io/enzyme/)

### Linting

- [x] [ESLint](http://eslint.org/)
      <template id="coding-convention-guidelines"></template>
- [x] [**Coding convention guidelines**](https://github.com/airbnb/javascript)

### Internationalization

- [x] [react intl](https://github.com/yahoo/react-intl)

## Project Structure

- You will write front-end part of your app in the `src` folder. This is the folder you will spend most of your time in.
- Configurations are in the `configs` folder.
- The `scripts` folder contains task runner's scripts, which you can use to create npm scripts.

### `src/`

We use the [container/component architecture](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.4rmjqneiw). `containers/` contains React components which are connected to the redux store. `components/` contains dumb React components which depend on containers for data. **Container components care about how things work, while components care about how things look.**

We've found that for many applications treating single pages (e.g. the Loginpage, the Homepage etc.) as containers and their small parts (e.g. the Login form, the Navigation bar) as components works well.

Also `containers` can contain compositions of a dumb component - `component` and a smart component [`HOC`](https://hackernoon.com/higher-order-components-hocs-for-beginners-25cdcf1f1713)

HOCs are stored in `src/HOCs` - makes sense right?.

> NOTE: **Please keeps in mind that we are structuring things flat in `components` (check [material ui packages structure](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src) to see how easy importing would be and know the reason for that decision), and nested in `containers` (for easier further analyzing and detaching modules).**

### `intl/`

This folder contains messages setup for [i18n](https://formatjs.io/guides/basic-i18n/).

### `public/`

As the name suggests, this folder contains public assets which can be downloaded to browser in runtime.

## Basic Building Blocks

You can launch the example app by running `npm start`. To fully understand its inner workings, you'll have to understand multiple technologies and how they interact.

### How does the application boot up?

Like any other webpage your app starts with the [`public/index.html`](https://github.com/ngoquoc/react-boilerplate-demo/blob/master/public/index.html) file. React will render your application into the `div#root` .

But how do we include all of your react components into a single html file? That's where webpack comes into the picture. Webpack will literally pack your application into small javascript files. These files will be injected into the `index.html` as `<script>` tags.

When your application is deployed on a server, browsers will load this html file. The javascript files that webpack has included will be executed by the browser, thereby booting up your react application! It's magic really!! No, not really, though it can certainly seem that way. Let's dissect this phenomenon to better know what's really going on.

### `src/app.js`:

When you run `npm start`, a server will be launched in your terminal for development. You can then open [http://localhost:3000](http://localhost:3000) to access the server and see your app.

Webpack requires an entry point to your application. Think of it as a door to your source code. In this boilerplate [`src/app.js`](https://github.com/react-boilerplate/react-boilerplate/blob/master/app/app.js) is that entry point. Webpack will access the entire app from this file, transpile the application into ES5 and create small chunks of transpiled code. Only the required chunks will be loaded in the browser so that you don't have to worry about the size of your application.

`src/app.js` is one of the biggest files of the boilerplate. It contains all the global setup to make sure your app runs smoothly. Let's break its contents down:

- `babel-polyfill` is imported. This enables cool stuff like generator functions, `Promise`s, etc.
- A redux `store` is instantiated.
- A `history` object is created, which remembers all the browsing history for your app. This is used by the router to know which page your users visit. (very useful for analytics, by the way)
- A Router is connected to Redux.
- i18n internationalization support was setup.
- JSS support was setup.
- `ReactDOM.render()` not only renders the [root react component](https://github.com/ngoquoc/react-boilerplate-demo/blob/master/src/index.js) called `<App />`, of your application, but it renders it with `<Provider />`, `<IntlProvider />`, `<ThemeProvider />` and `<Router />`.

* `<Provider />` connects your app with the redux `store`.
* `<IntlProvider />` provides language translation support to your app.
* `<ThemeProvider />` provides theming support to your app.

### Redux

Redux is going to play a huge role in your application. If you're new to Redux, we'd strongly suggest you to complete this checklist and then come back:

- [x] Understand the motivation behind Redux
- [x] Understand the three principles of Redux
- [x] Implement Redux in a small React app of yours

The Redux `store` is the heart of your application. Check out [`store.js`](https://github.com/ngoquoc/react-boilerplate-demo/blob/master/src/store.js) to see how we have configured the store.

The store is created with the `createStore()` factory, which accepts three parameters.

1.  **Root reducer:** A master reducer combining all your reducers.
2.  **Initial state:** The initial state of your app as determined by your reducers.
3.  **Middleware/enhancers:** Middlewares are third party libraries which intercept each redux action dispatched to the redux store and then... do stuff. For example, if you install the [`redux-logger`](https://github.com/evgenyrodionov/redux-logger) middleware, it will listen to all the actions being dispatched to the store and print previous and next state in the browser console. It's helpful to track what happens in your app.

In our application we are using two such middleware.

1.  **Router middleware:** Keeps your routes in sync with the redux `store`.
2.  **Promise middleware:** Is used for support creating async action (actions that acquire data from APIs).

### Reselect

Reselect is a library used for slicing your redux state and providing only the relevant sub-tree to a react component. It has three key features:

1.  Computational power
2.  Memoization
3.  Composability

Imagine an application that shows a list of users. Its redux state tree stores an array of usernames with signatures:

`{ id: number, username: string, gender: string, age: number }`.

Let's see how the three features of reselect help.

- **Computation:** While performing a search operation, reselect will filter the original array and return only matching usernames. Redux state does not have to store a separate array of filtered usernames.
- **Memoization:** A selector will not compute a new result unless one of its arguments change. That means, if you are repeating the same search once again, reselect will not filter the array over and over. It will just return the previously computed, and subsequently cached, result. Reselect compares the old and the new arguments and then decides whether to compute again or return the cached result.
- **Composability:** You can combine multiple selectors. For example, one selector can filter usernames according to a search key and another selector can filter the already filtered array according to gender. One more selector can further filter according to age. You combine these selectors by using `createSelector()`.

### Eject example code

Check the [example ejecting guide](https://github.com/ngoquoc/react-boilerplate-demo/blob/master/docs/general/ejecting-guide.md).
