function checkWidth() {
  var panelWidth = $(".text").width();
    if( panelWidth > 275 ) {
        $(".extruder-content").css("width","100%");
      } else
    if( panelWidth <= 275 ) {
        $(".extruder-content").css("width","100% !important");
      }
}

// *** SEARCH *** adapt search panel height to viewport
function searchTabHeight() {
  var height = $(window).height();
  var srchtab = (height) - 80;
  var viewheight = (height) -  211;
  // var advHeight = $(".advanced-view").show().height();
  var comboHeight = (viewheight) - 126;

  srchtab = parseInt(srchtab) + 'px';
  $("#search-flyout").find(".text").css('height',srchtab);

  viewheight = parseInt(viewheight) + 'px';
  comboHeight = parseInt(comboHeight) + 'px';
  $(".view-wrap").css('height', viewheight);
  $(".view-wrap.short-wrap").css('height', comboHeight);
}

$(document).ready(function(){
    var mywidth = 310; // Drupal.settings.shanti_sarvaka.flyoutWidth;
    $(".input-section, .view-section, .view-section .nav-tabs>li>a").css("display","block"); // show hidden containers after loading to prevent content flash
		// Remove extruder div content so as to preserve AJAX events
		var mbContent = $("#search-flyout .region.region-search-flyout").detach();
    // Initialize Search Flyout
    $("#search-flyout").buildMbExtruder({
      positionFixed: false,
      position: "right",
      closeOnExternalClick:false,
      closeOnClick:false,
      width: mywidth, // width is set in two places, here and the css
      top: 0
    });
    // Add back in extruder content
    $('#search-flyout .text').append(mbContent);
    // Make it resizeable
    $("div.extruder-content > div.text").resizable({
      handles: "w",
      resize: function (event, ui) {
        $('span.fancytree-title').trunk8({ tooltip:false });
      }
    });
          
    // Bind event listener
    $(".extruder-content").resize(checkWidth());
     
    if (!$(".extruder.right").hasClass("isOpened")) {
      $(".flap").click( function() {
        $(".extruder .text").css("width","100%");
      });
      // styles inline for now, forces
      $(".flap").prepend("<span><i class='icon shanticon-search'></i></span>");
      $(".flap").addClass("on-flap");
    }
    
    // --- set class on dropdown menu for icon
    $('.shanti-field-title a').hover( function() {
      $(this).addClass('on-hover');
    },
    function () {
      $(this).removeClass('on-hover');
    });
      
    // --- set class on dropdown menu for icon
    $(".extruder.right .flap").hover( 
      function () {
        $(this).addClass('on-hover');
      },
      function () {
        $(this).removeClass('on-hover');
    });
    // Show Flyout tab hidden on load
    $('#search-flyout').show();
    // Inizialize bootstrap elements inside flyout region
    $('#search-flyout .selectpicker').selectpicker({
      dropupAuto: false,
    }); // initiates jq-bootstrap-select
});

$(document).ready(function(){
    searchTabHeight();
    $(window).bind('load orientationchange resize', searchTabHeight() );
});