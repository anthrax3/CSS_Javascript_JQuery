(function($){
	$.fn.extend({
		slider: function(options) {

			var defaults = {
				autoSlide : false,
				duree : 3000,
				nbItems : 0,
				effect : 'ease'
			};

			var slider = this;
			slider.config = {};
			slider.config = $.extend(defaults, options);

			slider.items = $('.slideshow figure');
			slider.items2 = $('.dots_commands a');
			slider.counter = 0;
			slider.nbItems = (slider.config.nbItems == 0 || slider.config.nbItems > slider.items.length) ? slider.items.length : slider.config.nbItems;

			// suppresion des elements en trop
			$.each(slider.items, function( index ) {
				if(index >= slider.nbItems)
				{
					slider.items[index].remove();
					slider.items2[index].remove();
				}
			});

			var showCurrent = function(){
				$.each(slider.items, function( index, value ) {
					slider.items[index].classList.remove('show');
					slider.items2[index].classList.remove('active');
				});

				var itemToShow = Math.abs(slider.counter%slider.nbItems);
				slider.items[itemToShow].classList.add('show');
				slider.items2[itemToShow].classList.add('active');

				switch(defaults.effect)
				{
					case 'slideUp':
						$(".show")
							.slideUp("slow")
							.slideDown("slow");
						break;

					case 'slideRight':
						// slide right
						$(".show")
							.animate({width: "toggle" }, 1000)
							.animate({width: "toggle" }, 1000);

						break;

					case 'slideUpRight':
						// slide top right
						$(".show")
							.slideUp(1000)
							.animate({width: "toggle" }, 1000);
						break;

					default: break;
				}
			};

			var next = function(){
				slider.counter++;
				showCurrent();
			};

			var prev = function(){
				if(slider.counter == 0)
					slider.counter = slider.nbItems;
				slider.counter--;
				showCurrent();
			};

			$('.next').click(next);
			$('.prev').click(prev);

			$(document).keydown(function(event) {
				switch(event.keyCode){
					case 37 : // Flèche gauche
						prev();
						break;

					case 39 : // Flèche droite
						next();
						break;
				}
			});

			$.each(slider.items2, function( index, value ) {
				value.onclick = function() {
					slider.counter = $(this).data('id') -1;
					showCurrent();
				};
			});

			if(slider.config.autoSlide)
			{
				timer = setInterval(function(){
					slider.counter++;
					showCurrent();
				},slider.config.duree);
			}
		}
	})

	$('.slideshow').slider();

	$('select').on('change', function() {
		$('.slideshow').slider({
			duree : 3000,
			effect : this.value
		});
	});

})(jQuery);