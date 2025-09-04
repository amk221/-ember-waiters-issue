import { module, test } from 'qunit';
import {
  visit,
  click,
  waitFor,
  find,
  settled,
  waitUntil,
  fillIn,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'example/tests/helpers';
import { getPendingWaiterState } from '@ember/test-waiters';

window.p = getPendingWaiterState;

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);

  test('perform prompt', async function (assert) {
    await visit('/');
    assert.dom('.button').hasText('Click me');
    click('button');
    await waitFor('button[data-state="PENDING"]');
    assert.dom('.button').hasText('Please wait...');
    assert.dom('.dialog').includesText('Are you sure?');
    click('.yes');
    await waitUntil(() => !find('.dialog'));
    assert.dom('.dialog').doesNotExist();
    assert.dom('.button').hasText('Please wait...');
    await settled();
    assert.dom('.button').hasText('Click me');
  });
});
