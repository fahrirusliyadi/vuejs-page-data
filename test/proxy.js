import test from 'ava';
import PageData from '../src/page-data';
import { makeProxy } from '../src/proxy';

test('proxy', (t) => {
  const pageData = new PageData();
  const proxy = makeProxy(pageData);

  proxy.a = 1;

  t.is(proxy.a, 1);
  t.is(proxy.a, pageData.get('a'));
});
