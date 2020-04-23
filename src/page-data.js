import Vue from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import _castPath from 'lodash/_castPath';
import _isIndex from 'lodash/_isIndex';

export default class PageData {
  /**
   * @param {Object} initialData Initial data.
   */
  constructor(initialData = {}) {
    this._initialData = initialData;
    this._data = Vue.observable(cloneDeep(initialData));
  }

  /**
   * Get a value of data.
   *
   * Uses {@link https://lodash.com/docs/4.17.15#get Lodash' path}.
   *
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  get(path) {
    return get(this._data, path);
  }

  /**
   * Set a value of data.
   *
   * Uses {@link https://lodash.com/docs/4.17.15#set Lodash' path}.
   *
   * @param {Array|String} path The path of the property to set.
   * @param {*} value The value to set.
   */
  set(path, value) {
    let nested = this._data;
    path = _castPath(path);

    for (const [i, key] of path.entries()) {
      if (i === path.length - 1) {
        Vue.set(nested, key, value);
      } else if (!(key in nested)) {
        Vue.set(nested, key, _isIndex(path[i + 1]) ? [] : {});
      }

      nested = nested[key];
    }
  }

  /**
   * Recursively merge data.
   *
   * @param {Object} data The new data to be merged.
   */
  merge(data) {
    this._merge(this._data, data);
  }

  /**
   * Recursively merge data.
   *
   * @param {Object} data The destination object.
   * @param {Object} newData The source object.
   */
  _merge(data, newData) {
    for (const [key, value] of Object.entries(newData)) {
      if (isObject(value)) {
        if (data[key] === undefined) {
          Vue.set(data, key, value);
        } else {
          this._merge(data[key], value);
        }
      } else {
        Vue.set(data, key, value);
      }
    }
  }
}
