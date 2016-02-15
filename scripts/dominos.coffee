$ ->
  boneyard = []                                  
                                               
  boneBuilder = (a, b) ->                        #  A set of dominos is contains every combination of possible with 6 - 0 
    boneyard.push('_' + a + '_' + b)             #  This recursive function push the two parameters into the boneyard array
    return boneyard if b is 0                    #  If the 'b' variable is zero the loop is broken and the array is returned
    (a = b; b--) if a is 0                       #  If 'a' is zero the value of 'b' is reduced by 1 and 'a' is set to the value of 'b'
    boneBuilder(a-1, b)                          #  Each iteration the value of 'a' is reduced by 1 and the function is called again

  draw = (n) ->                                             #  This function picks dominos from the boneyard array
    randomDraw = _.shuffle(boneyard).splice(0, n)           #  It shuffles the array and draws the appropriate number of values
    fabricate value for value in randomDraw                 #  It then calls a templating function to render the HTML

  fabricate = (pair) ->                                                              
    template = _.template("                                                             
      <div class='tile draggable <%= pair.slice(0,2) %> <%= pair.slice(2,4) %>'>        
        <div class='pips <%= pair.slice(0,2) %>'>
          <%= topPips %>
        </div>
        <div class='bar'></div>
        <div class='pips <%= pair.slice(2,4) %>'>
          <%= bottomPips %>
        </div>
      </div>")
    top = makePips( +pair.charAt(1) )                                          #  The number for the top and bottom is extracted from the string
    bottom = makePips( +pair.charAt(3) )                                       #  This number of empty div tags is returned
    domino = template({pair: pair, topPips: top, bottomPips: bottom})          #  The variables and parameters are passed into the template
    $('#boneyard').append(domino)                                              #  The rendered HTML is added to the DOM

  makePips = (x) ->                                                            
    starter = "<div></div>"                                                    #  Returns a quatity of empty div tags equal to the paramater passed in  
    if x < 1 then return '' else starter.concat(makePips(x - 1))            



  boneBuilder(6,6)                   #  The set of dominos is created
  draw(28)                           #  All are drawn
  
  $('#starter').droppable({
    accept: ".tile:has(._6 ~ ._6)",
    tolerance: 'fit',
    activeClass: "ui-state-hover",
    drop: (event, ui) ->
      el = this
      $(ui.draggable[0]).draggable( "option", "disabled", true ).removeClass('ui-draggable draggable')
      $(this).hide()
      dropAsign('#upper', 6)
      dropAsign('#lower', 6)
      $('.drop_zone#upper').show().animate({top: '-=56', rotate: '0deg'}, 500)
      $('.drop_zone#lower').show().animate({top: '+=56', rotate: '180deg'}, 500)
      rotateDouble(ui, el) 
  })
  
  $('.tile.draggable').dblclick ->
    $(this).animate({rotate: '+=90deg'}, 500, ->
      if $(this).rotate() == '180deg'
        top = $(this).children()[0]; bottom = $(this).children()[2]
        $(this).rotate('0deg').prepend(bottom).append(top)
    )

  $( ".draggable" ).draggable({ 
    revert: "invalid",
    snap: ".drop_zone", 
    snapMode: "inner",
    snapTolerance: 15
  })
  
  dropAsign = (el, num) ->
    $(el).attr('title', num).droppable({
      accept: ".tile._" + num,
      tolerance: 'fit',
      activeClass: "ui-state-hover",
      drop: (event, ui) ->
        tAngle = $(ui.draggable[0]).rotate()
        angle = $(this).rotate()
        unless angle == tAngle || parseInt(angle) == parseInt(tAngle) + 180
          rotateSingle(ui, angle)
        topCount = ui.draggable[0].children[0].childElementCount
        bottomCount = ui.draggable[0].children[2].childElementCount

        if topCount == bottomCount
          rotateDouble(ui, this, angle) unless $(this).attr('rel') == 'cross'
          moveDZ(this, angle)
        else
          moveDZ(this, angle)
          rotateDZ(this, angle)
        
        if num != bottomCount && (angle == '0deg'|| angle == '90deg') || num != topCount && (angle == '180deg' || angle == '270deg')
          top = ui.draggable[0].children[0]
          bottom = ui.draggable[0].children[2]
          $(ui.draggable[0]).prepend(bottom).append(top)
          topCount = ui.draggable[0].children[0].childElementCount
          bottomCount = ui.draggable[0].children[2].childElementCount
        
        $(ui.draggable[0]).draggable( "option", "disabled", true ).removeClass('ui-draggable draggable')
        dropAsign(this, topCount) if angle == '0deg' or angle == '90deg'
        dropAsign(this, bottomCount) if angle == '180deg' or angle == '270deg'
    })
    
  rotateSingle = (ui, angle) ->
    $(ui.draggable[0]).animate({rotate: '-=90deg', left: '-=18', top: '+=18'}, 400) if angle == '0deg'
    $(ui.draggable[0]).animate({rotate: '+=90deg', left: '+=18', top: '+=18'}, 400) if angle == '180deg'
    $(ui.draggable[0]).animate({rotate: '+=90deg', left: '+=18', top: '-=18'}, 400) if angle == '90deg'
    $(ui.draggable[0]).animate({rotate: '+=90deg', left: '+=18', top: '-=18'}, 400) if angle == '270deg'

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

  adjustDouble = (ui, dz, angle) ->
    $(ui.draggable[0]).animate({'top':'+=20'}, 400) if angle == '0deg'
    $(ui.draggable[0]).animate({'top':'-=20'}, 400) if angle == '180deg'
    $(ui.draggable[0]).animate({'left':'-=20'}, 400) if angle == '90deg'
    $(ui.draggable[0]).animate({'left':'+=20'}, 400) if angle == '270deg'

  rotateDouble = (ui, dz, angle) ->
    $(ui.draggable[0]).animate({rotate: '+=90deg'}, 600, ->
      adjustDouble(ui, dz, angle)
      adjustDZdouble(dz, angle)
    )