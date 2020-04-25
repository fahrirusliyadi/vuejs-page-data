import Vue from 'vue';
import test from 'ava';

import Plugin from '../src/plugin';
Vue.use(Plugin);

test('plugin', (t) => {
  const vm1 = new Vue({
    pageData() {
      return {
        title: 'Hello',
      };
    },
  });
  const vm2 = new Vue();

  t.is(vm1.$pageData.title, 'Hello');
  t.is(vm2.$pageData.title, 'Hello');

  vm2.$pageData.title = 'Hello World';

  t.is(vm1.$pageData.title, 'Hello World');
});
