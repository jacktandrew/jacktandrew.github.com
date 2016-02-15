    var adjustDZdouble, adjustDouble, boneBuilder, boneyard, draw, dropAsign, fabricate, makePips, moveDZ, rotateDZ, rotateDouble, rotateSingle;
    boneyard = [];
    boneBuilder = function(a, b) {
      boneyard.push('_' + a + '_' + b);
      if (b === 0) {return boneyard};
      if (a === 0) {
        a = b;
        b--;
      }
      return boneBuilder(a - 1, b);
    };
    draw = function(n) {
      var randomDraw, value, _i, _len, _results;
      randomDraw = _.shuffle(boneyard).splice(0, n);
      _results = [];
      for (_i = 0, _len = randomDraw.length; _i < _len; _i++) {
        value = randomDraw[_i];
        _results.push(fabricate(value));
      }
      return _results;
    };
    fabricate = function(pair) {
      var bottom, domino, template, top;
      template = _.template("                                                                   <div class='tile draggable <%= pair.slice(0,2) %> <%= pair.slice(2,4) %>'>                <div class='pips <%= pair.slice(0,2) %>'>          <%= topPips %>        </div>        <div class='bar'></div>        <div class='pips <%= pair.slice(2,4) %>'>          <%= bottomPips %>        </div>      </div>");
      top = makePips(+pair.charAt(1));
      bottom = makePips(+pair.charAt(3));
      domino = template({
        pair: pair,
        topPips: top,
        bottomPips: bottom
      });
      return $('#boneyard').append(domino);
    };
    makePips = function(x) {
      var starter;
      starter = "<div></div>";
      if (x < 1) {
        return '';
      } else {
        return starter.concat(makePips(x - 1));
      }
    };
(function() {

	$(function() {

    boneBuilder(6, 6);
    draw(28);
    $('#starter').droppable({
      accept: ".tile",
      tolerance: 'fit',
      activeClass: "ui-state-hover",
      drop: function(event, ui) {
        var el;
        el = this;
        $(ui.draggable[0]).draggable("option", "disabled", true).removeClass('ui-draggable draggable');
        $(this).hide();
        dropAsign('#upper', 6);
        dropAsign('#lower', 6);
        $('.drop_zone#upper').show().animate({
          top: '-=56',
          rotate: '0deg'
        }, 500);
        $('.drop_zone#lower').show().animate({
          top: '+=56',
          rotate: '180deg'
        }, 500);
        return rotateDouble(ui, el);
      }
    });
    
		$('.tile.draggable').dblclick(function() {
      return $(this).animate({
        rotate: '+=90deg'
      }, 500, function() {
        var bottom, top;
        if ($(this).rotate() === '180deg') {
          top = $(this).children()[0];
          bottom = $(this).children()[2];
          return $(this).rotate('0deg').prepend(bottom).append(top);
        }
      });
    });
    $(".draggable").draggable({
      revert: "invalid",
      snap: ".drop_zone",
      snapMode: "inner",
      snapTolerance: 15
    });
    dropAsign = function(el, num) {
      return $(el).attr('title', num).droppable({
        accept: ".tile._" + num,
        tolerance: 'fit',
        activeClass: "ui-state-hover",
        drop: function(event, ui) {
          var angle, bottom, bottomCount, tAngle, top, topCount;
          tAngle = $(ui.draggable[0]).rotate();
          angle = $(this).rotate();
          if (!(parseInt(angle) === parseInt(tAngle) || parseInt(angle) === parseInt(tAngle) + 180)) {
            rotateSingle(ui, angle);
          }
          topCount = ui.draggable[0].children[0].childElementCount;
          bottomCount = ui.draggable[0].children[2].childElementCount;
          if (topCount === bottomCount) {
            if ($(this).attr('rel') !== 'cross') {
							rotateDouble(ui, this, angle);
							moveDZ(this, angle);
						};
          } else {
            moveDZ(this, angle);
            rotateDZ(this, angle);
          }
          if (num !== bottomCount && (angle === '0deg' || angle === '90deg') || num !== topCount && (angle === '180deg' || angle === '270deg')) {
            top = ui.draggable[0].children[0];
            bottom = ui.draggable[0].children[2];
            $(ui.draggable[0]).prepend(bottom).append(top);
            topCount = ui.draggable[0].children[0].childElementCount;
            bottomCount = ui.draggable[0].children[2].childElementCount;
          }
          $(ui.draggable[0]).draggable("option", "disabled", true).removeClass('ui-draggable draggable');
          if (angle === '0deg' || angle === '90deg') {dropAsign(this, topCount)};
          if (angle === '180deg' || angle === '270deg') {
            return dropAsign(this, bottomCount);
          }
        }
      });
    };
    rotateSingle = function(ui, angle) {
      if (angle === '0deg') {
        $(ui.draggable[0]).animate({
          rotate: '-=90deg',
          left: '-=18',
          top: '+=18'
        }, 400);
      }
      if (angle === '180deg') {
        $(ui.draggable[0]).animate({
          rotate: '+=90deg',
          left: '+=18',
          top: '+=18'
        }, 400);
      }
      if (angle === '90deg') {
        $(ui.draggable[0]).animate({
          rotate: '+=90deg',
          left: '+=18',
          top: '-=18'
        }, 400);
      }
      if (angle === '270deg') {
        return $(ui.draggable[0]).animate({
          rotate: '+=90deg',
          left: '+=18',
          top: '-=18'
        }, 400);
      }
    };
    moveDZ = function(dz, angle) {
      if (angle === '0deg') {
        $(dz).animate({
          'top': '-=74'
        }, 600);
      }
      if (angle === '180deg') {
        $(dz).animate({
          'top': '+=74'
        }, 600);
      }
      if (angle === '90deg') {
        $(dz).animate({
          'left': '+=74'
        }, 600);
      }
      if (angle === '270deg') {
        $(dz).animate({
          'left': '-=74'
        }, 600);
      }
      return $(dz).attr({
        rel: 'straight'
      });
    };
    rotateDZ = function(dz, angle) {
      if (parseInt($(dz).css('top')) < 150 && angle === '0deg') {
        $(dz).attr({
          rel: 'cross'
        }).animate({
          rotate: '+=90deg',
          left: '+=18',
          top: '+=18'
        }, 500);
      }
      if (parseInt($(dz).css('top')) > 370 && angle === '180deg') {
        $(dz).attr({
          rel: 'cross'
        }).animate({
          rotate: '+=90deg',
          left: '-=18',
          top: '-=18'
        }, 500);
      }
      if (parseInt($(dz).css('left')) > 1050 && angle === '90deg') {
        $(dz).attr({
          rel: 'cross'
        }).animate({
          rotate: '+=90deg',
          left: '-=18',
          top: '+=18'
        }, 500);
      }
      if (parseInt($(dz).css('left')) < 600 && angle === '270deg') {
        return $(dz).attr({
          rel: 'cross'
        }).animate({
          rotate: '0deg',
          left: '+=18',
          top: '-=18'
        }, 500);
      }
    };
    adjustDZdouble = function(dz, angle) {
      if (angle === '0deg') {
        $(dz).animate({
          top: '+=37'
        }, 400);
      }
      if (angle === '180deg') {
        $(dz).animate({
          top: '-=37'
        }, 400);
      }
      if (angle === '90deg') {
        $(dz).animate({
          left: '-=37'
        }, 400);
      }
      if (angle === '270deg') {
        $(dz).animate({
          left: '+=37'
        }, 400);
      }
      return $(dz).attr({
        rel: 'cross'
      });
    };
    adjustDouble = function(ui, dz, angle) {
      if (angle === '0deg') {
        $(ui.draggable[0]).animate({
          'top': '+=20'
        }, 400);
      }
      if (angle === '180deg') {
        $(ui.draggable[0]).animate({
          'top': '-=20'
        }, 400);
      }
      if (angle === '90deg') {
        $(ui.draggable[0]).animate({
          'left': '-=20'
        }, 400);
      }
      if (angle === '270deg') {
        return $(ui.draggable[0]).animate({
          'left': '+=20'
        }, 400);
      }
    };
    return rotateDouble = function(ui, dz, angle) {
      return $(ui.draggable[0]).animate({
        rotate: '+=90deg'
      }, 600, function() {
        adjustDouble(ui, dz, angle);
        return adjustDZdouble(dz, angle);
      });
    };
  });

}).call(this);
