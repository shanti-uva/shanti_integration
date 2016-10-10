$(document).ready(function(){
    $('.explore > a').click( function(event){
          event.stopPropagation();
          $('.collections').slideToggle(200);
      });
      
    $('.collections .close').click( function(event){
          event.stopPropagation();
         $('.collections').slideToggle(200);
     });
});