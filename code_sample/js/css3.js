$(function(){
  $('.spinners li').click(function(){
    $('.spinners li').removeClass('active');
    $(this).addClass('active');
  });
});