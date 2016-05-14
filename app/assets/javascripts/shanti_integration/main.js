(function ($) {
	/** Overlay Mask extension: adds ability to call .overlayMask("show"|"hide") on any jQuery element **/
  $.fn.overlayMask = function (action) {
      var mask = this.find('.overlay-mask');

      // Create the required mask
      if (!mask.length) {
          mask = $('<div class="overlay-mask"><div class="loading-container"><div class="loading"></div><div id="loading-text">Searching&#133;</div></div></div>');
          mask.css({
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0px',
              left: '0px',
              zIndex: 100,
              opacity: 9,
              backgrogroundColor: 'white'
          }).appendTo(this).fadeTo(0, 0.5).find('div').position({
              my: 'center center',
              at: 'center center',
              of: mask, //'.overlay-mask'
          });
      }

      // Act based on params

      if (!action || action === 'show') {
          mask.show();
      } else if (action === 'hide') {
          mask.hide();
      }
      return this;
  };

  // *** Common Functions for Shanti Sarvaka ***
  ShantiSarvaka = {};

  //** Function to check width of Extruder and resize content accordingly */
  ShantiSarvaka.checkWidth = function() {
  var panelWidth = $(".text").width();
    if( panelWidth > 275 ) {
        $(".extruder-content").css("width","100%");
      } else
    if( panelWidth <= 275 ) {
        $(".extruder-content").css("width","100% !important");
      }
  };


  // *** SEARCH *** adapt search panel height to viewport
  ShantiSarvaka.searchTabHeight = function() {    
    var height = $(window).height();
    var srchtab = (height) - 88;
    var viewheight = (height) - 235;
    // var advHeight = $(".advanced-view").show().height();
    // var comboHeight = (viewheight) - 370;


    srchtab = parseInt(srchtab) + 'px';
    $("#search-flyout").find(".text").css('height',srchtab);

    viewheight = parseInt(viewheight) + 'px';
    // comboHeight = parseInt(comboHeight) + 'px';
    $(".view-wrap").css('height', viewheight);
    // $(".view-wrap.short-wrap").css('height', comboHeight);
  };

  $(document).ready(function() {
	  
	  /**
	   *  Settings for the theme
	   */
      // Initialize settings.
      ShantiSarvaka.settings = $.extend({
        kmapsUrl: "http://subjects.kmaps.virginia.edu",
        mmsUrl: "http://mms.thlib.org",
        placesUrl: "http://places.kmaps.virginia.edu",
        ftListSelector: "ul.facetapi-mb-solr-facet-tree, ul.fancy-tree", // should change "mb-solr" to "fancy" for universality
        fancytrees: [],
        flyoutWidth: 310,
        topLinkOffset: 1500,
        topLinkDuration: 500,
      }, ShantiSarvaka.settings || {});

      $.fn.popover.Constructor.DEFAULTS.trigger = 'hover';
      $.fn.popover.Constructor.DEFAULTS.placement = 'auto';
      $.fn.popover.Constructor.DEFAULTS.html = true;
      $.fn.popover.Constructor.DEFAULTS.delay = { "show": 100, "hide": 60000 };
      $.fn.popover.Constructor.DEFAULTS.template = '<div class="popover related-resources-popover" role="tooltip"><div class="arrow"></div><h5 class="popover-title"></h5><div class="popover-content"></div></div>';

	  /**
	   * Back to Top Link functionality
	   */
      var offset = ShantiSarvaka.settings.topLinkOffset;
      var duration = ShantiSarvaka.settings.topLinkDuration;
      jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
          jQuery('.back-to-top').fadeIn(duration);
        } else {
          jQuery('.back-to-top').fadeOut(duration);
        }
      });
      jQuery('.back-to-top').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
      });
	  
	  /**
	   * ICheck init
	   */
      $("input[type='checkbox'], input[type='radio']").not($('.jstree input')).each(function () {
        var self = $(this),
        label = self.next('label');
        if(label.length == 1) {
          self = $(this).detach();
          label.prepend(self);
        }
        if(typeof(self.icheck) != "undefined") {
          self.icheck({
            checkboxClass: "icheckbox_minimal-red",
            radioClass: "iradio_minimal-red",
            insert: "<div class='icheck_line-icon'></div>",
            checkedClass: 'checked',
          });
          // In MB /my-content/collections/ Icheck is not show check when clicked fixing this here
          /*$('div.icheck-item').once('icheckfix').on('mousedown', function() {
          	if($(this).hasClass('checked')) {
          		$(this).addClass('rm-icheck');
          		setTimeout(function() { $('.rm-icheck').removeClass('checked rm-icheck'); }, 500);
          	} else {
          		$(this).addClass('checked');
          	}
          });*/
        }
      });
	  
	  /**
	   * Select Picker
	   */
      $(".selectpicker:not(#search-flyout .selectpicker)").selectpicker({
        dropupAuto: false,
        //liveSearch: true
      }); // initiates jq-bootstrap-select
	  
	  /**
	   * Multi Level Push Menu
	   */
      // Rearrange the button divs so that they are in the order blocks are added with a float-right css
      var buttons = $('div.navbar-buttons ul.navbar-right').detach();
      buttons.each(function() {
        $('div.navbar-buttons').prepend($(this));
      });
      // Initialize the multilevel main menu
      $( '#menu' ).multilevelpushmenu({
        menuWidth: 250,
        menuHeight: '32em', // this height is determined by tallest menu, Preferences
        mode: 'cover',
        direction: 'rtl',
        backItemIcon: 'fa fa-angle-left',
        groupIcon: 'fa fa-angle-right',
        collapsed: false,
        preventItemClick: false,
      });

      // --- align the text
      $('#menu ul>li, #menu h2').css('text-align','left');
      $('#menu ul>li.levelHolderClass.rtl').css('text-align','right');

      // --- close the menu on outside click except button
      $('.menu-toggle').click( function(event){
          event.stopPropagation();
          $('#menu').slideToggle(200);
          $('.menu-toggle').toggleClass('show-topmenu');
          $('.collections').slideUp(200);
          $('.menu-exploretoggle').removeClass('show-topmenu');
       });

      // --- close the menu on outside click except button
       $('.menu-exploretoggle').click( function(event){
           event.stopPropagation();
           $('.collections').slideToggle(200);
       });

      $(document).click( function(){
          $('.menu-toggle').removeClass('show-topmenu');
          $('#menu').hide(100);
      });




      /* Initialize Language Buttons */

			// Language menu drop down init
			$('#block-locale-language .dropdown-toggle').dropdown();

      /* Language Chooser Functionality with ICheck
      $('body').on('ifChecked', 'input.optionlang', function() {
        var newLang = $(this).val().replace('lang:','');
        var oldLang = Drupal.settings.pathPrefix;
        var currentPage = window.location.pathname;
        if(oldLang.length > 0) {
          // remove any current lang in url (format = "zh/")
          var currentPage = currentPage.replace(RegExp(oldLang + "?$"), ''); // Take care of home page (no slash at end of line)
          currentPage = currentPage.replace(oldLang, ''); // All other pages
          }
        // Create New URL with new Lang Prefix
        var newUrl = (Drupal.settings.basePath + newLang + currentPage).replace(/\/\//g, '/');
        window.location.pathname = newUrl;
      }); */
	  
	  /**
	   * Responsive Menus with MbExtruder
	   */
      $(".menu-exploretoggle").click(function () {
          if($("#menu-collections.extruder").hasClass("isOpened")){
            $(".menu-exploretoggle").removeClass("show-topmenu");
          } else {
            $(".menu-collections").css('display','block');
            $(".menu-collections").addClass("active");
            $(".menu-collections > ul").addClass("in");
            $("#search-flyout").closeMbExtruder();
            $(".menu-exploretoggle").addClass("show-topmenu");
            return false;
          }
      });
	  
	  /**
	   * Popovers Init
	   */
      $('.popover-link').each(function() {
        var content = $(this).next('div.popover').html();
        var title = $(this).next('div.popover').attr('data-title');
        $(this).popover({'title': title, 'content': content});
      });
      $('div.popover').remove(); // remove hidden popover content once they have all been initialized
      // show.bs called immediately upon click. Hide all other popovers.
      $('.popover-link').on('show.bs.popover', function(){
      	$('div.popover').hide();
      });
      // shown.bs is after popup is rendered. Move footer outside of content
      /*
      $('.popover-link').on('shown.bs.popover', function(){
      	var pophtml = $(this).next('div.popover');
      	var popfooter = pophtml.find('.popover-footer').detach();
      	pophtml.find('.popover-content').after(popfooter);
      	popfooter.show();
      });*/
      // Hide popovers if anything but a popover is clicked
      $('body').click(function(e) {
         var target = $(e.target);
         if(target.parents('div.popover').length == 0 && !target.hasClass('popover')) {
           $('div.popover').hide();
         }
      });
	  
	  /**
	   * Miscellaneous Init
	   */
    // Shanti-filters title keyword search field: use description for placeholder text
	$('.shanti-filters .views-exposed-form .form-item input.form-text').each(function() {
		var desc = $(this).parent().parent().next('.description');
		$(this).attr({'placeholder': $.trim(desc.text()), 'size':'15'});
		desc.remove();
	});

    // conditional IE message, see markup immediately after the body tag
    $(".progressive").delay( 2000 ).slideDown( 400 ).delay( 5000 ).slideUp( 400 );

    // set the sidebar heigth
    // $('div#sidebar-second').height($('div#sidebar-second').parent().height()); 




    // Turn dev menu in admin footer into select
    if($('#admin-footer #block-menu-devel ul.menu').length > 0) {
      var devmenu = $('#admin-footer #block-menu-devel ul.menu').clone();
      $('#admin-footer #block-menu-devel ul.menu').replaceWith('<select class="devmenu"></select>');
      var sel = $('#block-menu-devel select.devmenu');
      sel.append('<option>Choose an option...</option>');
      $.each(devmenu.children('li'), function() {
        var opt = $('<option>' + $(this).text() + '</option>').attr('value', $(this).find('a').attr('href'));
        sel.append(opt);
      });
      sel.change(function() { window.location.pathname = $(this).val(); });
    }
    // Adjust height of blocks in admin footer
    $('#admin-footer div.block').each(function() {
      $(this).height($(this).parent().height());
    });

    // Collapse/Expand All Buttons For Bootstrap Collapsible Divs
    // Assumes Buttons are in a child div that is a sibling of the collapsible divs.
    $('div.expcoll-btns button').click(function() {
      var divs = $(this).parent().parent().find('div.collapse');
      if($(this).hasClass('expand')) {
        $(divs).addClass('in');
      } else {
        $(divs).removeClass('in');
      }
    });

    // call Check Width
    ShantiSarvaka.checkWidth();

    // Carousel Init and controls
    // Gets speed from setting associated with block so that admins can customize speed.
    $('.carousel').each(function() {
    	var speed = $(this).data('speed') * 1000;
    	$(this).carousel({
        interval: speed,
		  	pause: false
      });
    });


    $('.carousel .control-box-2 .carousel-pause').click(function () {
        var carousel = $(this).parents('.carousel');
        if($(this).hasClass('paused')) {
          carousel.carousel('next');
          carousel.carousel('cycle');
        } else {
          carousel.carousel('pause');
        }
        $(this).toggleClass('paused');
        $(this).find('span').toggleClass('glyphicon-pause glyphicon-play');
    });
		  
    /**
     * Gallery: Initialize a gallery of images
     */
    $('.shanti-gallery').imagesLoaded(function() {
        // Prepare layout options.
        var options = {
        	align: 'left',
          itemWidth: 185, // Optional min width of a grid item
          autoResize: true, // This will auto-update the layout when the browser window is resized.
          container: $('.shanti-gallery'), // Optional, used for some extra CSS styling
          offset: 12, // Optional, the distance between grid items
          outerOffset: 0, // Optional the distance from grid to parent
          flexibleWidth: '35%', // Optional, the maximum width of a grid item
          ignoreInactiveItems: false,
        };
        // Get a reference to your grid items.
        var handler = $('.shanti-gallery li');

        var $window = $(window);
        $window.resize(function() {
          var windowWidth = $window.width(),
              newOptions = { flexibleWidth: '30%' };

          // Breakpoint
          if (windowWidth < 1024) {
            newOptions.flexibleWidth = '100%';
          }

          handler.wookmark(newOptions);
        });

        // Call the layout function.
        handler.wookmark(options);
    });
	
    /**
     * Accordion Init: only called on document load
     */
      // Open first accordion if none opened
    //  $("#av-details .field-accordion").each(function(index, element){
		//	  $(element).addClass(index == 0 ? "in" : "").once();
		//	  $(element).has(".in").find(".glyphicon").toggleClass('glyphicon-plus glyphicon-minus');
		//	});
      $('.node-type-video .panel-group .collapsible:eq(0)').each(function(index, element){
            $(element).find('.panel-collapse').once().addClass('in');
            $(element).has(".in").find('.accordion-toggle').once().removeClass('collapsed');
      });

      // Shiva site gets doubly glypicons. So need to be removed
      $(".glyphicon-plus + .glyphicon-plus, .glyphicon-minus + .glyphicon-minus").remove();
	
     /**
      * Other: 
      */
      $('.shanti-field-group-audience > div').find('a:eq(1)').addClass('icon-link');

      $('.shanti-field-title a').hover( function() {
            $(this).closest('.shanti-thumbnail').addClass('title-hover');
            },
              function () {
            $(this).closest('.shanti-thumbnail').removeClass('title-hover');
            }
       );

      // $('table.sticky-header').css('width','100%');

      // IE10 viewport hack for Surface/desktop Windows 8 bug http://getbootstrap.com/getting-started/#support-ie10-width
      (function () {
        'use strict';
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
          var msViewportStyle = document.createElement('style');
          msViewportStyle.appendChild(
            document.createTextNode(
              '@-ms-viewport{width:auto!important}'
            )
          );
          document.querySelector('head').appendChild(msViewportStyle);
        }
      })();


      var myElement = document.getElementById('.carousel.slide');
      if(myElement) {
        // create a simple instance
        // by default, it only adds horizontal recognizers
        var mc = new Hammer(myElement);

        // let the pan gesture support all directions.
        // this will block the vertical scrolling on a touch-device while on the element
        mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

        // listen to events...
        mc.on("panleft panright panup pandown tap press", function(ev) {
            myElement.textContent = ev.type +" gesture detected.";
        });
      }
	  
	  /**
	   * Format numbers with ssfmtnum class
	   */
      $('.ssfmtnum').each(function() {
      	if($(this).text().indexOf(',') == -1) {
      		var txt = $(this).text(),
      				len = txt.length,
      				i = len - 1,
      				fmtnum = '';
      		while(i >= 0) {
		        fmtnum = txt.charAt(i) + fmtnum;
		        if ((len - i) % 3 === 0 && i > 0) {
		        	fmtnum = "," + fmtnum;
		        }
		        --i;
			    }
			    $(this).text(fmtnum);
      	}
      });
	  
	/*
	  Drupal.behaviors.kmapsExplorer = {
	    attach: function (context, settings) {
	      var $selected_li = $('#carousel-feature-slides > li');
	      $selected_li.children('a').bind('click', function (e) {
	          e.preventDefault();
	          $selected_li.removeClass('active');
	          $(this).parent().addClass('active');
	      });

	      $('#carousel-feature-slides.bx-large-slides').bxSlider({
	        slideMargin:10,
	        pager:true,
	        controls:true,
	        autoReload: true,
	        moveSlides: 1,
	        infiniteLoop: false,
					hideControlOnEnd: true,
	        breaks: [{screen:0, slides:1, pager:false},{screen:380, slides:1},{screen:450, slides:2},{screen:768, slides:3},{screen:1200, slides:4}]
	      });

	      $('#carousel-feature-slides.bx-small-slides').bxSlider({
	        slideMargin:10,
	        pager:true,
	        controls:true,
	        autoReload: true,
	        moveSlides: 1,
	        infiniteLoop: false,
					hideControlOnEnd: true,
				  breaks: [{screen:0, slides:1, pager:false},{screen:400, slides:2},{screen:550, slides:3},{screen:768, slides:4},{screen:1050, slides:5}]
	      });

	    }
	  };
	*/
	  
		// The player on the node edit form cannot be made responsive thru this script.
		// Because it causes the player not to appear until resize happens (ndg, 2015-01-30)
		/* No longer necessary see shanti-main-mediabase.js Drupal.behaviors.shantiAVVideoFix ()
	  if (typeof kWidget != 'undefined' && !$('body').hasClass('page-node-edit')) {
			kWidget.addReadyCallback(function(playerId) {
				function calcPlayerSize() {
				    var elm = document.getElementById(playerId);
				    $(elm).css({width: "auto", height: (elm.clientWidth/16.0)*9+"px"});
				}
				window.addEventListener("resize", calcPlayerSize, false);
				calcPlayerSize();
			});
		}*/
	  
      $('.transcript-options button.selectpicker span:first-child').replaceWith('<span class="fa fa-comments-o"></span>');
      //$('.transcript-options .filter-option').replaceWith('<span class="fa fa-comments-o"></span>');
	  
  	// Drupal.behaviors.shantiSarvakaMbTrimDesc moved to shanti-main-mediabase.js

  	// Applies wookmark js to related videos tab div by calling Drupal behaviors
	$('a#related-tab').on('shown.bs.tab', function(e) {
		Drupal.attachBehaviors('#related');
	});
	
    // Initiate & hide sidebar when active/visible
    $('[data-toggle=offcanvas]').click(function () {
      $('.row-offcanvas').toggleClass('active');
    });
	  
    // Toggle sidebar
	$("button.view-offcanvas-sidebar").click( function() { 		// show-hide resource side-column
	  $(this).toggleClass( "show",'fast' );
	});
	
    // Hide sidebar button for Kmaps homepage
	// if($("body.front.kmaps").length ) {
	// 	$("button.view-offcanvas-sidebar").remove();
	// }
	
	// --- unhiding breadcrumbs: inline styles keeps the breadcrumbs markup from flash on load when at homepages where we do not want them
	$('.breadwrap:not(".front.page-subjects .breadwrap")').show( "fast" );

	/*
	Drupal.behaviors.advancedToggleClassHeightChange = {
		attach: function (context, settings) {
	     --- sets class for height change in flyout, see comboheight below in ShantiSarvaka.searchTabHeight     
	    $('.advanced-link').on('click', function () { 
	      $('.view-wrap').toggleClass('short-wrap');
        $('.advanced-view').toggleClass('show-options');
        $('.advanced-view').slideToggle('fast');
	    });
	  }
	};
	*/
	
    $('.btn-group-gmaps.btn-group > .btn.btn-default.active').one().prepend('<span class="icon"></span>');
    $('.btn-group-gmaps.btn-group > .btn.btn-default').click( function(){
          $(this).prepend('<span class="icon"></span>');
    });
	
    // --- sets class for height change in flyout, see comboheight below in ShantiSarvaka.searchTabHeight     
    if($(".tabs.secondary").length ) { 
      $(".titlearea").addClass('has-tabs-secondary');
    }
	
    var mbsrch = $(".search-group .form-control");  // the main search input
    $(mbsrch).data("holder", $(mbsrch).attr("placeholder"));

    // --- focusin - focusout
    $(mbsrch).focusin(function () {
        $(mbsrch).attr("placeholder", "");
        $("button.searchreset").show("fast");
    });
    $(mbsrch).focusout(function () {
        $(mbsrch).attr("placeholder", $(mbsrch).data("holder"));
        $("button.searchreset").hide();

        var str = "Enter Search...";
        var txt = $(mbsrch).val();

        if (str.indexOf(txt) > -1) {
            $("button.searchreset").hide();
            return true;
        } else {
            $("button.searchreset").show(100);
            return false;
        }
    });
	
    $('.carousel-description p').each(function() { 
      var txt = $(this).text();
      if ($(this).text().length > 460) { 
        txt = txt.substr(0, 460);
        txt = txt.substr(0, txt.lastIndexOf(' ')) + "..."; 
        $(this).text(txt);
      } 
    });
	
    $( window ).load(function() {
      if($(".front.page-subjects").length ) { 
           $(this).find(".breadwrap").remove();
      }
    });
	
	// Prevent the backspace key from navigating back.			
	$(document).bind('keydown', function (event) {
	    var doPrevent = false;
	    if (event.keyCode === 8) {
	        var d = event.srcElement || event.target;
	        if ((d.tagName.toUpperCase() === 'INPUT' && 
	             (
	                 d.type.toUpperCase() === 'TEXT' ||
	                 d.type.toUpperCase() === 'PASSWORD' || 
	                 d.type.toUpperCase() === 'FILE' || 
	                 d.type.toUpperCase() === 'SEARCH' || 
	                 d.type.toUpperCase() === 'EMAIL' || 
	                 d.type.toUpperCase() === 'NUMBER' || 
	                 d.type.toUpperCase() === 'DATE' )
	             ) || 
	             d.tagName.toUpperCase() === 'TEXTAREA') {
	            doPrevent = d.readOnly || d.disabled;
	        }
	        else {
	            doPrevent = true;
	        }
	    }
	
	    if (doPrevent) {
	        event.preventDefault();
	        //console.log("Delete Button Navigation has been disabled.");
	    }
	});
	
	//	Drupal.behaviors.kmapsOpenlayersMenuFlickrControl = {
	//	  attach: function (context, settings) {
	//			if($(".openlayermap").length ) {
	//				$(".openlayermap #sidebar_wrapper").css('display','block !important');
	//			}
	//	  }
	//	};

	//	Drupal.behaviors.kmapsPageNotFound = {
	//	  attach: function (context, settings) {
	//			if($('.page-title-text:contains("Page not found")').length ) {
	//				$('button.view-resources').css('display','none');
	//			}
	//	  }
	//	};
  });

}(jQuery));
