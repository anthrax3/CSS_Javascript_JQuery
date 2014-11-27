$.event.props.push('dataTransfer');
$('li').on({
	dragstart: function(event) {
		event.originalEvent.dataTransfer.setData("text/plain",  event.target.getAttribute('id'));
		$(this).css('opacity', '0.5');
		$(this).animate({
			width: '90px'
		}, 'slow');
	},
	drop: function(event) {
		return false;
	},
	dragend: function() {
		$(this).css('opacity', '1');
		$(this).animate({
				width: '98%'
		}, 'slow');
	},
});

$('ul').on({
	dragover: function(event) {
		 event.preventDefault();
	},
	dragenter: function(event) {
		$(this).addClass("over");
	},
	dragleave: function(event) {
		$(this).removeClass("over");
	},
	dragenter: function(event) {
		$(this).addClass("over");
	},
	drop: function(event) {
		event.preventDefault();

		var listitem = event.originalEvent.dataTransfer.getData("text/plain");
		event.target.appendChild($("#"+listitem)[0]);
	}
});