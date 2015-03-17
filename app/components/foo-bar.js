import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "button",

  status: "Ready",
  revertStatusPeriodMs: 2000,

  click: function() {
    this.set('status', 'Pending');

    // A fake ajax
    var me = this;
    this.run().then(function() {
      me.updateStatus('Finished');
    },function() {
      me.updateStatus('Error');
    });
  },

  run: function() {
    return new Ember.RSVP.Promise( function(resolve) {
      Ember.run.later(function() {
        resolve();
      }, 500);
    });
  },

  updateStatus: function(statusText) {
    this.set('status', statusText);

    var periodMs = this.get('revertStatusPeriodMs') || 1000;
    var me = this;
    
    Ember.run.later(function() {
      me.set('status', 'Ready');
    }, periodMs);
  }
});
