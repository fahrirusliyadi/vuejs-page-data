Share data across Vue components.

# Installation

1. Install module:

   ```bash
   # with yarn
   yarn add @fahrirusliyadi/vuejs-page-data

   # or with npm
   npm install @fahrirusliyadi/vuejs-page-data
   ```

1. _[Optional]_ install `proxy-polyfill` to support old browsers:

   ```bash
   # with yarn
   yarn add proxy-polyfill

   # or with npm
   npm install proxy-polyfill
   ```

1. Tell Vue to use the plugin:

   ```js
   import Vue from 'vue';
   import PageDataPlugin from '@fahrirusliyadi/vuejs-page-data';

   const options = {
     // Plugin options.
   };

   Vue.use(PageDataPlugin, options);
   ```

# Usage

Define page data globally. The data will be available on all pages.

```js
Vue.use(PageDataPlugin, {
  initialData: {
    // Your data.
  },
});
```

Define page data on any component. The data will be merged into the global data
and will only available on the current page.

```js
export default {
  pageData() {
    return {
      // Your data.
    };
  },
};
```

Use the data from any component using `$pageData` property.

```js
this.$pageData.title;

// Nested data.
// Uses Lodash' path (https://lodash.com/docs/4.17.15#get).
this.$pageData['a[0].b.c'];
```

Updating data.

```js
this.$pageData.title = 'New title';

// Nested data.
// Uses Lodash' path (https://lodash.com/docs/4.17.15#set).
this.$pageData['a[0].b.c'] = 1;
```

# Example

```html
<template>
  <h1>
    {{ $pageData.title }}
  </h1>
</template>

<script>
  export default {
    pageData() {
      return {
        title: 'Hello World!',
      };
    },
  };
</script>
```

# Options

- _{Object}_ `initialData`: Initial page data. The data will be available in all
  pages.
