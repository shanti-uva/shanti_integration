$(document).ready(function(){
  $('.explore>a, .collections .close').click(function(e) {
    $(".collections").slideToggle(200);
	e.preventDefault();
  });
});