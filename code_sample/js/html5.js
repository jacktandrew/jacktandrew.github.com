//////////////////////////////  Drop & Drag  //////////////////////////////
function afterLoad(){
  var pegs = document.querySelectorAll('.peg_box div');
  [].forEach.call(pegs, function(peg) {
    peg.addEventListener('dragstart', startDrag, false);
  });
  
  var holes = document.querySelectorAll('.hole_box div');
  [].forEach.call(holes, function(hole) {        
    hole.addEventListener('dragenter', isDroppable, false);
    hole.addEventListener('dragover', function(e){e.preventDefault();}, false);
    hole.addEventListener('drop', dropped, false);
  });
};

function startDrag(e) {
  var html = e.target.outerHTML;
  pegName = e.target.classList[0];
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData('text/plain', html);
}

function isDroppable(e) {
  e.preventDefault();
  if (e.target.classList[0] === pegName) {
    isMatch = true;
  } else {
    isMatch = false;
  };
}

function dropped(e) {
  e.preventDefault();
  if (isMatch === true) {
    e.target.innerHTML = e.dataTransfer.getData('text/plain');
    var dropped = document.querySelector('.' + pegName);
    document.querySelector('.peg_box').removeChild(dropped);
  }
}

window.addEventListener('load', afterLoad, false);

//////////////////////////////  GeoLocation  //////////////////////////////
var map;
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(48.2, -123),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);
}

function tryGeoLocate() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });
      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    handleNoGeolocation(false);
  }
}


function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(160, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);

//////////////////////////////  Editable Content  //////////////////////////////
function waitTilLoad(){
  var editable = document.querySelector('.editable');
  var reset = document.querySelector('.reset');
  
  function blurring() {
    localStorage.setItem('editedContent', this.innerHTML);
    document.designMode = 'off';
  }
  
  function focusing() {
    document.designMode = 'on';
  };

  function reseting() {
    localStorage.clear();
    location.reload();
  };

  if (localStorage.getItem('editedContent')) {
    editable.innerHTML = localStorage.getItem('editedContent');
  }
  
  editable.addEventListener('blur', blurring, false);
  editable.addEventListener('focus', focusing, false);
  reset.addEventListener('click', reseting, false);
};
window.addEventListener('load', waitTilLoad, false);

