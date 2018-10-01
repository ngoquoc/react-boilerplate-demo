# Introduction

The [`README.md`](https://github.com/ngoquoc/react-boilerplate-demo) gives you adequate information on how to clone boilerplate files, install dependencies and launch the example app.

Once you have done that, this document is intended to guide you how to eject example code out of the repo.

_NOTE: Please leave any unmentioned file/folder/component AS IS as modifying it will CAUSE UNEXPECTED EFFECTS to your app._

**You can either eject the example using `npm run eject` and then `npm run format` or eject them using below steps.**

## Config

Replace `config.dev.json` and `config.prod.json`'s content with `{}`. Then add your own app's configs for each environment.

## Public assets (`public`)

### Assets

Simply remove everything inside this folder.

### Favicon (`favicon.ico`)

Replace it with your app's favicon.

### `index.html`

Remove below code blocks

```html
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Open+Sans"> <!-- leave it if you think it maybe used in your app -->
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> <!-- leave it if you think it maybe used in your app -->
<script> window.indexad = {PUBLIC_URL: '%PUBLIC_URL%/'} </script>
```

Modify below code blocks

```html
<head>
  ...
  <title>Index Oglasi</title> <!-- change it to your app's name -->
  ...
</head>
<body style="background: url(assets/car-background.jpg) no-repeat fixed center;"> <!-- remove style property or change it to corresponding style in your app -->
```

### Manifest (`manifest.json`)

Modify its content to your app specific manifest.

## Main source (`src`)

### App component (`App.js`)

- Replace the whole `App.js`'s content with your `App` component.
- Replace the whole style in `app.styles.js` with corresponding one.

### App configs (`config.js`)

- Update `THEME_CONFIG` to your app's corresponding settings.
- Add any config you need.

### Reducers' settings (`reduce.js`)

Replace its content with below code blocks:

```javascript
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'; // Remove it if you won't use redux-form in your app
import { routerReducer } from 'react-router-redux';
import { intlReducer as intl } from 'react-intl-redux'; // Remove it if your app won't support multilingual

export default combineReducers({
  form, // Remove it if you won't use redux-form in your app
  router: routerReducer,
  intl // Remove it if your app won't support multilingual
});
```

## Components

### Footer

Replace it with your app's footer component.

### Header

Replace it with your app's header component.

### Loader

Replace it with your app's loading indicator component.

### Translation

Remove it if your app won't support multilingual. Or else, leave it.

### `index.js`

Update it to expose only existed and necessary components.

## Containers

Remove its content and add yours.

## HOCs

### auth

Remove it or replace it with yours

### intl

Remove it if your app won't support multilingual. Or else, leave it.

## Internationalization (`intl`)

Remove it if your app won't support multilingual. Or else, leave it and replace `en-US.js`'s content with below code blocks.

```javascript
export default {};
```

## Mock data (`mockData`)

Remove it.
