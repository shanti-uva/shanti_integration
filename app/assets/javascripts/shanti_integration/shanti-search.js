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
    var srchtab = (height) - 88;
    var viewheight = (height) - 260;

    srchtab = parseInt(srchtab) + 'px';

    viewheight = parseInt(viewheight) + 'px';
    $(".view-wrap").css('height', viewheight);
}

$(document).ready(function(){
    $(window).bind('load orientationchange resize', searchTabHeight() );
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
    try {
	    if($("div.extruder-content > div.text").length > 0) {
        var flyout_height = $(window).height() - 134;
        if($('.page-places #kmaps-search .advanced-link')[0]) flyout_height += 24;
		    $("div.extruder-content > div.text").resizable({
		      handles: "w,nw",
		      resize: function (event, ui) {
						$('#search-flyout .extruder-content').css('width','');
          },
          maxHeight: flyout_height,
          minHeight: flyout_height
		    });
			}
	    // Bind event listener
      //$(".extruder-content").resize(checkWidth());
	   } catch (e) {
	   	console.trace();
	   	console.warn('Resizeable not a function error caught! search.js line 49');
	   }
     
    if (!$(".extruder.right").hasClass("isOpened")) {
      $(".flap").click( function() {
        $(".extruder .text").css("width","100%");
      });
      // styles inline for now, forces
      $(".flap").prepend("<span><i class='icon shanticon-search'></i></span>");
      $(".flap").addClass("on-flap");
      // Add identifiers
      $(".flap").attr("role", "button");
      $(".flap").attr("aria-label", "Open Search Panel");
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
