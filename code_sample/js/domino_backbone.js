$(document).ready(function() {
  game = new Game();
  gameView = new views.Game({el: $('body'), model: game} );
});

var Game = Class.extend({
  init: function() {
    this.robot = new Robot();
    this.player = new Player
  }
});

var Player = Class.extend({
  init: function() {
  }
});

var Robot = Class.extend({
  init: function() {
  }
});


window.views = window.views || {}
views.Game = Backbone.View.extend({
  
  initialize: function() {
    _.bindAll(this)
  },
  
  events: {},
  
  render: function() {},
  
  startGame: function() {}
});
    