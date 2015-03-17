import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('indexx');
  this.route('testabc');
  this.route('testabc2');
  this.route('testabc3');
  this.route('testabc34');
  this.route('testabc3432');
});

export default Router;
