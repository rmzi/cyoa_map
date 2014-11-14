(function($) {

	$(function() { //on DOM ready
		// $(window).bind("resize", function(){
		//     var orientation = window.orientation;

		//     alert(orientation);

		//     var new_orientation = (orientation) ? -90 : 0;
		//     $('body').css({
		//         "-webkit-transform": "rotate(" + new_orientation + "deg)"
		//     });
		// });

		var stalker = $('.sv-stalker'),
			social = $('.social-fixed');

		$('#about').waypoint(function(){
			if($(document).width() > 767 ){
				
				if(social.hasClass('stuck')){
					social.removeClass('stuck stuck-social');
				}else{
					social.addClass('stuck stuck-social');
				}
			}
		}, {offset: -100});

		$('.panel').waypoint(function(direction){
			var newCurr;
			if(direction == 'down'){
				newCurr = $('.'+$(this).attr('id')+'-link');
				$('.anchors li a').removeClass('active');
				newCurr.addClass('active');
			}else{
				var newCurr = $('.anchors li .active').parent().prev().find('a');
				$('.anchors li a').removeClass('active');
				newCurr.addClass('active');
			}

			if(sv.device){
				$('.navbar-inner .load').html(newCurr.html()).css('text-transform', 'capitalize');
			}

			// window.location.hash = newCurr.data('target');
		}, {offset:60});


		// Top Nav Bar Events
		$('.anchors li a').on({
			click: function(event){
				if(event.currentTarget.id == "twitter" || event.currentTarget.id == "angellist")
					console.log("routing!")
				else
					event.preventDefault();

				var target = $(this).data('target');

				var offset = $('#'+target).offset();

				if(typeof offset !='undefined'){
   				$('html,body').animate({
						scrollTop: offset.top+'px' 
					}, 'slow', 'easeInOutQuad' , function(){
						window.location.hash = target;
					});
   			}
				
				if(sv.device){
					$('.collapsed').removeClass('collapsed');
					$('.collapse').removeClass('in').css('height', 0);
				}
			}
		});

		stalker.find('.toTop').on({
			click: function(event){
				event.preventDefault();

				$('html,body').animate({
					scrollTop: 0+'px' 
				}, 'slow', 'easeInOutQuad' , function(){
					console.log(window.location);
				});
			}
		})

		$('#teamMembers').scroller({
			contentArea: '#team .container'
		});

		$('#advisorsMembers').find('li').shuffle();
		$('#advisorsMembers').scroller({
			contentArea: '#advisors .container',
			margin:10
		});
		
		var svPlayground = $('.portfolio');
		svPlayground.isotope({ filter: '.fund-1' });

		$('.filters li').click(function(){
			var selector;
			if(!$(this).hasClass('active')){
				$('.filters li').removeClass('active');
				$(this).addClass('active');
				selector = $(this).attr('data-filter');

				svPlayground.isotope({ filter: selector });
			}
		});

		function lightBox ($elem) {
			$('body').addClass('stopScrolling');
			var overlay, container, close;

			container = $('#container');

			overlay = $('#overlay').css({
				height : $(document).height()
			}).fadeIn();


			container.css({
				display:'block',
				top:$(document).scrollTop()+ 50+'px',
				left:($(window).width()-container.width()-40)/2 + 'px',
				maxHeight: $(window).height() - 100 + 'px',
				overflow:'scroll'
			});

			console.log(container.width(), $(window).width(), $(document).width());

			close = container.find('.close'),
			load = container.find('.load');

			var header = $elem.find('.data-header'),
				content = $elem.find('.data-content');

				load.html(header.html() + content.html());
				close = container.find('.close');

				close.on({
					click:function(){
						overlay.css('display', 'none');
						container.css('display', 'none');
			$('body').removeClass('stopScrolling');
					}
				});

				overlay.on({
					click:function(){
						overlay.css('display', 'none');
						container.css('display', 'none');
			$('body').removeClass('stopScrolling');
					}
				});
		};

		$('#sv-contactForm').contactForm();
$('#portfolio .item').on({
	click: function(){
		lightBox($(this));
	}
});

		// GOOGLE MAPS

		google.maps.visualRefresh = true;

		function initialize() {
			var marker, map, newYork = new google.maps.LatLng(40.714353,-74.005973),
				scout = new google.maps.LatLng(40.71414,-74.00938),
				mapOptions = {
	    			scrollwheel: false,
	    			zoom: 15,
	    			minZoom: 14,
	    			maxZoom: 16,
	    			mapTypeId: google.maps.MapTypeId.ROADMAP,
	    			center: newYork
  				};

  			map = new google.maps.Map(document.getElementById('sv-map'), mapOptions);

  			marker = new google.maps.Marker({
    			map:map,
    			draggable:true,
    			animation: google.maps.Animation.DROP,
    			position: scout
  			});


			$(window).resize(function(){
				google.maps.event.trigger(map, 'resize');
				map.setCenter(newYork);
			});

  			google.maps.event.addListener(marker, 'click', function(){
			 	var infowindow = new google.maps.InfoWindow({
    				content:'<p class="info-heading"><b>Scout Ventures</b></p><p class="info-addy">47 Murray St<br>New York, NY  10007</p>'
				});

			 	infowindow.open(marker.get('map'), marker);
  			});
  		}

		google.maps.event.addDomListener(window, 'load', initialize);

	});	
})(jQuery);
