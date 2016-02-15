$ ->
  boneyard = []

  boneBuilder = (a, b) ->               #  A set of dominos is contains every combination of possible with 6 - 0 
    boneyard.push('_' + a + '_' + b)    #  This recursive function push the two parameters into the boneyard array
    return boneyard if b is 0           #  If the 'b' variable is zero the loop is broken and the array is returned
    (a = b; b--) if a is 0              #  If 'a' is zero the value of 'b' is reduced by 1 and 'a' is set to the value of 'b'
    boneBuilder(a-1, b)                 #  Each iteration the value of 'a' is reduced by 1 and the function is called again

  draw = (n) ->                                       #  This function picks dominos from the boneyard array
    randomDraw = _.shuffle(boneyard).splice(0, n)     #  It shuffles the array and draws the appropriate number of values
    fabricate value for value in randomDraw           #  It then calls a templating function to render the HTML


  makePips = (x) ->                                                   #  Pass in a number  
    starter = "<div></div>"                                           #  and this number of empty divs
    if x < 1 then return '' else starter.concat(makePips(x - 1))      #  is returned using recursion

  fabricate = (string) ->                            #  A string is passed in from the boneyard array
    top = makePips( +string.charAt(1) )              #  The numerical values are extracted
    bottom = makePips( +string.charAt(3) )           #  and pips (black dots) are created and returned 
    template = _.template("
      <div class='tile draggable <%= string.slice(0,2) %> <%= string.slice(2,4) %>'>
        <div class='pips <%= string.slice(0,2) %>'>
          <%= topPips %>
        </div>
        <div class='bar'></div>
        <div class='pips <%= string.slice(2,4) %>'>
          <%= bottomPips %>
        </div>
      </div>")
    domino = template({string: string, topPips: top, bottomPips: bottom})    #  The pips and string are 
    $('#boneyard').append(domino)                                            #  inserted into the template


  boneBuilder(6,6)
  draw(28)
  
  $('#starter').droppable({                          #  The starter drop-zone is made droppable
    accept: ".tile:has(._6 ~ ._6)",                            #  It can only accept the double six
    tolerance: 'fit',                                          #  The domino overlaps the drop-zone entirely
    activeClass: "ui-state-hover",                             #  The drop-zone has a gray background when active
    drop: (event, ui) ->
      el = this
      $(ui.draggable[0]).draggable( "option", "disabled", true ).removeClass('ui-draggable draggable')
      $(this).hide()                                           #  This drop-zone is disabled and hidden                     
      dropAsign('#upper', 6)                                   #  Two other drop-zones are activated                       
      dropAsign('#lower', 6)
      $('.drop_zone#upper').show().animate({top: '-=56', rotate: '0deg'}, 500)    #  And each of the two are revealed
      $('.drop_zone#lower').show().animate({top: '+=56', rotate: '180deg'}, 500)
      rotateDouble(ui.draggable[0], el)                                           #  The original double is turned sideways
  })
  
  $('.tile').rotate('0deg')

  $('.tile.draggable').dblclick ->                                        #  When a tile in the boneyard is double clicked
    $(this).animate({rotate: '+=90deg'}, 500, ->                          #  this tiles rotated 90 degrees 
      if $(this).rotate() == '180deg'                                     #  If the become upside down 
        top = $(this).children()[0]; bottom = $(this).children()[2]       #  The top pips and bottom pips are switched
        $(this).rotate('0deg').prepend(bottom).append(top)                #  and the domino is rotated back to being upright
    )                                                                     #  This prevents very high angles of rotation
                                                                          #  such as 1080 or other unwieldy numbers

  $( ".draggable" ).draggable({             #  All the tiles are made draggable
    revert: "invalid",                      #  Tile will revert unless place on a droppable
    snap: ".drop_zone",                     #  Tile can only snap to a drop-zone
    snapMode: "inner",                      #  Tile will snap to the inside of the drop-zone 
    snapTolerance: 15                       #  With snap if tile is placed within 15 pixels of drop-zone
  })
  
  dropAsign = (el, num) ->
    $(el).attr('title', num).droppable({       #  Target element is given a title of the number it accepts
      accept: ".tile._" + num,                 #  and assigned to accept a tile with this number
      tolerance: 'fit',                        #  The domino overlaps the drop-zone entirely
      activeClass: "ui-state-hover",           #  The drop-zone has a gray background when active
      drop: (event, ui) ->
        tileAngle = $(ui.draggable[0]).rotate()                       
        dzAngle = $(this).rotate()                                    
        topCount = ui.draggable[0].children[0].childElementCount         
        bottomCount = ui.draggable[0].children[2].childElementCount

        unless dzAngle == tileAngle || parseInt(dzAngle) == parseInt(tileAngle) + 180
          rotateSingle(ui.draggable[0], dzAngle)                 #  If not a match, tile is rotated to angle of drop-zone

        unless num == bottomCount && (dzAngle == '0deg'|| dzAngle == '90deg') || num == topCount && (dzAngle == '180deg' || dzAngle == '270deg')     
          flip(ui)                                                        #  If tile is places backwards
          topCount = ui.draggable[0].children[0].childElementCount          
          bottomCount = ui.draggable[0].children[2].childElementCount

        if topCount == bottomCount                               #  Checks if tile is a double
          rotateDouble(ui.draggable[0], this, dzAngle) unless $(this).attr('rel') == 'cross'    
          moveDZ(this, dzAngle)                                            
        else
          moveDZ(this, dzAngle)
          rotateDZ(this, dzAngle)

        $(ui.draggable[0]).draggable( "option", "disabled", true ).removeClass('ui-draggable draggable') #  Tile is disabled
        dropAsign(this, topCount) if dzAngle == '0deg' or dzAngle == '90deg'                            #  Drop zone is
        dropAsign(this, bottomCount) if dzAngle == '180deg' or dzAngle == '270deg'                     #  reassigned a number
    })
    
  flip = (ui) ->
    top = ui.draggable[0].children[0]
    bottom = ui.draggable[0].children[2]
    $(ui.draggable[0]).prepend(bottom).append(top)
    
  rotateSingle = (tile, angle) ->
    $(tile).animate({rotate: '-=90deg', left: '-=18', top: '+=18'}, 400) if angle == '0deg' || angle == '180deg'
    $(tile).animate({rotate: '+=90deg', left: '+=18', top: '-=18'}, 400) if angle == '90deg' || angle == '270deg'

  moveDZ = (dz, angle) ->
    $(dz).animate({'top':'-=74'}, 600) if angle == '0deg'
    $(dz).animate({'top':'+=74'}, 600) if angle == '180deg'
    $(dz).animate({'left':'+=74'}, 600) if angle == '90deg'
    $(dz).animate({'left':'-=74'}, 600) if angle == '270deg'
    $(dz).attr(rel: 'straight')

  rotateDZ = (dz, angle) ->
    if parseInt( $(dz).css('top') ) < 150 and angle == '0deg'
      $(dz).attr(rel: 'cross').animate({rotate: '+=90deg', left: '+=18', top: '+=18'}, 500)       
    if parseInt( $(dz).css('top') ) > 370 and angle == '180deg'
      $(dz).attr(rel: 'cross').animate({rotate: '+=90deg', left: '-=18', top: '-=18'}, 500) 
    if parseInt( $(dz).css('left') ) > 1050 and angle == '90deg'
      $(dz).attr(rel: 'cross').animate({rotate: '+=90deg', left: '-=18', top: '+=18'}, 500) 
    if parseInt( $(dz).css('left') ) < 600 and angle == '270deg'
      $(dz).attr(rel: 'cross').animate({rotate: '0deg', left: '+=18', top: '-=18'}, 500) 
    
  adjustDZdouble = (dz, angle) ->
    $(dz).animate({top:'+=37'}, 400) if angle == '0deg'
    $(dz).animate({top:'-=37'}, 400) if angle == '180deg'
    $(dz).animate({left:'-=37'}, 400) if angle == '90deg'
    $(dz).animate({left:'+=37'}, 400) if angle == '270deg'
    $(dz).attr(rel: 'cross')

  adjustDouble = (tile, dz, angle) ->
    $(tile).animate({'top':'+=20'}, 400) if angle == '0deg'
    $(tile).animate({'top':'-=20'}, 400) if angle == '180deg'
    $(tile).animate({'left':'-=20'}, 400) if angle == '90deg'
    $(tile).animate({'left':'+=20'}, 400) if angle == '270deg'

  rotateDouble = (tile, dz, angle) ->
    $(tile).animate({rotate: '+=90deg'}, 600, ->
      adjustDouble(tile, dz, angle)
      adjustDZdouble(dz, angle)
    )