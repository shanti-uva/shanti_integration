$(document).ready(function(){
//Flyout settings
    var flyout_status = Cookies.get('flyout_status');

    if (Cookies.get('flyout_status') && Cookies.get('flyout_status') == 'open') {
      $('#search-flyout').openMbExtruder();
    }

      $('#search-flyout div.flap').click(function(e) {
        if ($('#search-flyout').attr('isopened')) {
          var flyout_status = 'open';
          $("#search-flyout").openMbExtruder();
        }
        else {
          var flyout_status = 'close';
        }
        Cookies.set('flyout_status', flyout_status);
        e.preventDefault();
      });
});