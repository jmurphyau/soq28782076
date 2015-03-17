import Ember from 'ember';
import QUnit from 'qunit';

function currentRunState(Test, run) {
  var ajaxRequests = Test.pendingAjaxRequests;
  var timers = run.backburner._timers;
  var debouncees = run.backburner._debouncees;
  var throttlers = run.backburner._throttlers;
  var ret = [];
  timers.forEach(function(item) { ret.push(item); });
  debouncees.forEach(function(item) { ret.push(item); });
  throttlers.forEach(ret.push);
  return ret;
}

function runStatesEqual(a, b) {
  if (a && !b || !a && b) {
    return false;
  }
  if (a && a.length && b && b.length && a.length !== b.length) {
    return false;
  }
  for (var i=0, len=a.length; i<len; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}


var helper = Ember.Test.registerAsyncHelper('clickWaitOneAsync', function (app, selector, context) {
    //promise that resolves after all asyncs - checks every 10 ms
    var clickPromise = click(selector, context);

    //promise that resolves after any asyncs  - checks every 3 ms
    //compares the run state
    var previousRunState = currentRunState(Ember.Test, Ember.run);

    return Ember.Test.promise(function(resolve) {
      var watcher = setInterval(function() {
        var _currentRunState = currentRunState(Ember.Test, Ember.run);
        if (!runStatesEqual(_currentRunState, previousRunState)) {
          clearInterval(watcher);
          resolve();
        }
      }, 3);
    });
  });


export default helper;
