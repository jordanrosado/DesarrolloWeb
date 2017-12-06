$(document).ready(function($){
	var changeStyle=$('.navigationbar');
	var top=$('.top');
	
	function scroll(){
		if($(window).scrollTop()>700){
			changeStyle.addClass('modified');
			top.addClass('show-top');
		}else{
			changeStyle.removeClass('modified');
			top.removeClass('show-top');
		}
	}

	document.onscroll=scroll;
	$("#iconhideshow").click(function(){
		$(this).toggleClass('fa-bars fa-times-circle');
		$(".nav").toggleClass('hide show');
	});

	$('.demo-4').percentcircle({animate:true,diameter:100,guage:3,coverBg:'rgb(48, 43, 56)',bgColor:'#116297',fillColor:'#116297',percentSize:'18px',percentWeight:'normal'});
	$("#owl-demo").owlCarousel({navigation:false,slideSpeed:300,paginationSpeed:400,singleItem:true,autoPlay:true,});
	$('.portfolio-item').nivoLightbox({effect:'fade',theme:'default',keyboardNav:true,clickOverlayToClose:true,onInit:function(){},beforeShowLightbox:function(){},afterShowLightbox:function(lightbox){},beforeHideLightbox:function(){},afterHideLightbox:function(){},onPrev:function(element){},onNext:function(element){},errorMessage:'The requested content cannot be loaded. Please try again later.'});

	var $container=$('#works_container').isotope({itemSelector:'.works-single-item'});
	$('#filters').on('click','button',function(){
		var filterValue=$(this).attr('data-filter');
		$container.isotope({filter:filterValue});});
	});
	
	wow=new WOW({boxClass:'wow',animateClass:'animated',offset:0,mobile:true,live:true})
	
	wow.init();$(function(){$('a[href*=#]:not([href=#])').click(function(){if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){var target=$(this.hash);target=target.length?target:$('[name='+this.hash.slice(1)+']');if(target.length){$('html,body').animate({scrollTop:(target.offset().top-81)},1000);return false;}}});});
