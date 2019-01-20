$(document).ready(function() {

  // Controls movement of the top link bar
  $('.top').addClass('hidden');
  $.waypoints.settings.scrollThrottle = 30;
  $('#wrapper').waypoint(function(event, direction) {
    $('.top').toggleClass('hidden', direction === "up");
  }, {
    offset: '-100%'
  }).find('#main-nav-holder').waypoint(function(event, direction) {
    $(this).parent().toggleClass('sticky', direction === "down");
    event.stopPropagation();
  });

  // Button that scrolls to the top
  $('.top').click(function(){
    event.preventDefault();
    $("body").animate({ scrollTop: 0 }, 1500);
  });

  // Button that scrolls down a bit
  $('.down').click(function(){
    event.preventDefault();
    var present = $("body").scrollTop()
    $("body").animate({ scrollTop: present + 550 }, 1300);
  });

  // Controls links to different parts of the page
  $('body').delegate('section', 'waypoint.reached', function(event, direction) {
   var $active = $(this);

   if (direction === "up") {
     $active = $active.prev();
   }
   if (!$active.length) $active = $active.end();

   $('.section-active').removeClass('section-active');
   $active.addClass('section-active');

   $('.active-nav').removeClass('active-nav');
   $('a[href=#'+$active.attr('id')+']').addClass('active-nav');
  });

  // Register each section as a waypoint.
  $('section').waypoint({ offset: '50%' });

  // Negates the flash of non-active nav.
  $('#main-nav a').click(function() {
   $(this).addClass('active-nav');
  });

  // Wicked credit to
  // http://www.zachstronaut.com/posts/2009/01/18/jquery-smooth-scroll-bugs.html
  var scrollElement = 'html, body';
  $('html, body').each(function () {
   var initScrollTop = $(this).attr('scrollTop');
   $(this).attr('scrollTop', initScrollTop + 1);
   if ($(this).attr('scrollTop') == initScrollTop + 1) {
     scrollElement = this.nodeName.toLowerCase();
     $(this).attr('scrollTop', initScrollTop);
     return false;
   }
  });

  // Smooth scrolling for internal links
  $("#main_nav [href^='#']").click(function(event) {
   event.preventDefault();

   var $this = $(this),
   target = this.hash,
   $target = $(target);

   $(scrollElement).stop().animate({
     'scrollTop': $target.offset().top
   }, 500, 'swing', function() {
     window.location.hash = target;
   });
  });


  Raven.config('http://16d7eb7a4acc4cda990bc4dd1c5bcb6b@jacktandrew.github.io//1').install()
  // Load Threes
  // $('#threes').load('threes.html')

  // Load Resume
  // $('#resume').load('resume.html')
});

