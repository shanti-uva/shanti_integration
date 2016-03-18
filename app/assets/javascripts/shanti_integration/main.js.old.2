$(document).ready(function(){
	/**
	 * Back to Top Link functionality
	 */
	var offset = 420; //topLinkOffset
	var duration = 500; //topLinkDuration;
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
	
	
	// ICheck init
	$("input[type='checkbox'], input[type='radio']").each(function () {
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
				insert: "<div class='icheck_line-icon'></div>"
			});
		}
	});
	$(".selectpicker").selectpicker({
	dropupAuto: false
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
	    $('#menu').toggle(50);
	    $('.menu-toggle').toggleClass('show-topmenu');
	    $('.collections').slideUp(200);
	    $('.menu-exploretoggle').removeClass('show-topmenu');
	 });

	// --- close the menu on outside click except button
	$('.menu-exploretoggle').click( function(event){
	    event.stopPropagation();
	    $('.collections').slideUp(200);
	});
  
	$(document).click( function(){
	    $('.menu-toggle').removeClass('show-topmenu');
	    $('#menu').hide(100);
	});
		
	/**
	 * Responsive Menus with MbExtruder
	 */
	$("#menu-main").buildMbExtruder({
		positionFixed: false,
		position: "right",
		width: 280,      
		hidePanelsOnClose:false,
		accordionPanels:false,
		onExtOpen:function(){ $(".menu-main").metisMenu({ toggle: false });  },
		onExtClose:function(){},
		top: 0
	}); 
	$("#menu-collections").buildMbExtruder({
		positionFixed: false,
		position: "right",
		width:280, // width is set in two places, here and the css
		hidePanelsOnClose:false,
		accordionPanels:false,
		onExtOpen:function(){ $(".menu-main").metisMenu({ toggle: false }); },
		onExtContentLoad:function(){  },
		onExtClose:function(){},
		top: 0
	});	
	// this is for the responsive button
	$(".shanti-searchtoggle").click(function () {   
		if($("#gen-search.extruder").hasClass("isOpened")){   
			$("#gen-search").closeMbExtruder();
			$(".shanti-searchtoggle").removeClass("show-topmenu");        
		} else {      
			$("#menu-main").closeMbExtruder();
			$("#menu-collections").closeMbExtruder();
			$("#gen-search").openMbExtruder();
			$(".shanti-searchtoggle").addClass("show-topmenu");
			$(".menu-maintoggle,.menu-exploretoggle").removeClass("show-topmenu");
			// $("#menu-main").load("./menus-ajax.html");        
			// $(".menu-collections-wrap .accordion-toggle").addClass("collapsed");
			// $(".menu-collections-wrap .panel-collapse").removeClass("in").css('height','0');
			return false;
		}
	});   
	$('.menu-maintoggle').click(function (e) {
		e.stopPropagation();
		if($("#menu-main.extruder").hasClass("isOpened")){    
			$("#menu-main").closeMbExtruder();
			$(".menu-maintoggle").removeClass("show-topmenu");     
		} else {
			$("#menu-main").openMbExtruder();
			$("#gen-search").closeMbExtruder();
			$("#menu-collections").closeMbExtruder();
			$(".menu-commons, .menu-preferences, .menu-collections").css('display','block');
        
			$(".menu-commons").addClass("active");
        
			$(".menu-collections").removeClass("active");
			$(".menu-collections > ul").removeClass("in");
        
			// $("#menu-main").load("/menus-ajax.html #menu-accordion");
			$(".menu-maintoggle").addClass("show-topmenu");
			$(".menu-exploretoggle, .shanti-searchtoggle").removeClass("show-topmenu");
		}
	    //e.stopPropagation();
		//e.preventDefault();
		//return false;
	});
	$(".menu-exploretoggle").click(function () {   
		if($("#menu-collections.extruder").hasClass("isOpened")){   
        
			$("#menu-collections").closeMbExtruder();
			$(".menu-exploretoggle").removeClass("show-topmenu");
			// $(".bottom-trim").remove();                
		} else {        
			$(".menu-commons, .menu-preferences").css('display','none');
			$(".menu-collections").css('display','block');
        
			$(".menu-collections").addClass("active");
			$(".menu-collections > ul").addClass("in");
        
			$("#menu-collections").openMbExtruder();
			$("#menu-main").closeMbExtruder();        
			$("#gen-search").closeMbExtruder();
        
			$(".menu-exploretoggle").addClass("show-topmenu");  
			$(".menu-maintoggle,.shanti-searchtoggle").removeClass("show-topmenu");    
        
			// $(".menu-collections").find("ul").append("<li class='bottom-trim'></li>");  
			return false;
		}
	});
});