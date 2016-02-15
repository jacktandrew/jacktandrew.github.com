/*   
Model
  Game - Class
    Has Players
    Has Robots
    Builds dominos
    Puts them in the boneyard
  Robot
    Draws dominos
    Auto Play
  Player - Class
    Draws dominos
    Play
View
*/  

var Game = Backbone.Model.extend({
  init: function() {
    this.robot = new models.Robot();
    this.player = new models.Player();
  }
});
var Robot = Backbone.Model.extend({});
var Player = Backbone.Model.extend({});

var GameView = Backbone.View.extend({  
  render: function(){
    $(this.el).html('<li>' + this.model.get('title') + '</li>');
  }
});

var game = new Game();
var gameView = new GameView({model: game});

game.set('title', 'I am gaming it, killing it');
gameView.render(); 

$(function(){
  $('#app').html(gameView.el);
});

