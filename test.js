import test from 'ava';
import PageData from './src/page-data';
import { makeProxy } from './src/proxy';

test('simple data', (t) => {
  const pageData = new PageData();

  pageData.set('a', 1);

  t.is(pageData.get('a'), 1);
});

test('nested data', (t) => {
  const pageData = new PageData();

  pageData.set('a[0].b.c', 2);

  t.is(pageData.get('a[0].b.c'), 2);
  t.deepEqual(pageData.get('a'), [{ b: { c: 2 } }]);
});

test('merge', (t) => {
  const data = {
    a: [{ b: 2 }, { d: 4 }],
  };
  const newData = {
    a: [{ c: 3 }, { e: 5 }],
    b: { f: 6 },
    c: [7, 8],
  };
  const pageData = new PageData(data);

  pageData.merge(newData);

  t.deepEqual(pageData.get('a'), [
    { b: 2, c: 3 },
    { d: 4, e: 5 },
  ]);
  t.is(pageData.get('b'), newData.b);
  t.is(pageData.get('c'), newData.c);
});

test('proxy', (t) => {
  const pageData = new PageData();
  const proxy = makeProxy(pageData);

  proxy.a = 1;

  t.is(proxy.a, 1);
  t.is(proxy.a, pageData.get('a'));
});
