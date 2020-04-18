try {
  require('proxy-polyfill'); // eslint-disable-line import/no-unassigned-import
} catch {}

export function makeProxy(pageData) {
  const handler = {
    get(object, prop) {
      return prop in object ? Reflect.get(...arguments) : object.get(prop);
    },
    set(object, prop, value) {
      if (prop in object) {
        Reflect.set(...arguments);
      } else {
        object.set(prop, value);
      }

      return true;
    },
  };
  const proxy = new Proxy(pageData, handler);

  return proxy;
}
