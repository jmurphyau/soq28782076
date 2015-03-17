import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: FooBar', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});



test('clicking the button should set the label', function(assert) {

  visit('/').then(function() {
    assert.equal( find('button').text().trim(), 'Ready', 'Should initially be "Ready"');
    clickWaitOneAsync('button');

    andThen(function() {
      assert.equal( find('button').text().trim(), 'Finished', 'Should become "Finished" after promise fulfills');
    });

  });

});
