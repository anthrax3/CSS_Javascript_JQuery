$(document).ready(function() {
	$("#cube").on({
		mousedown: function() {
		    $(this).addClass('movable');
		    $('.movable').on('mousemove', function(event) {
			     var thisX = event.pageX - $(this).width() / 2,
			         thisY = event.pageY - $(this).height() / 2;

			     $('.movable').offset({
			         left: thisX,
			         top: thisY
			     });
			 });
		},
		mouseup: function() {
			$(this).removeClass('movable');
	        $(this).removeClass('movable');
	    }
	});
});

$(document).ready(function () {

	var x_angle = 0, y_angle = 0;

	$(document).keydown(function(event) {
		switch(event.keyCode){
			// gauche
			case 37:
				y_angle -= 45;
				break;

			// haut
			case 38:
				x_angle += 45;
				break;

			// droite
			case 39:
				y_angle += 45;
				break;

			// bas
			case 40:
				x_angle -= 45;
				break;
		}

		$('#cube').css('-webkit-transform', "rotateX(" + x_angle + "deg) rotateY(" + y_angle + "deg)");
	});
});