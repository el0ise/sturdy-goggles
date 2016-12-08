define(function(){
    var direction;

	function Kebab(x,y) {
		this.dx = dx;
		this.dy = dy;
		this.x = x;
		this.y = y;

	}

	Kebab.prototype = {
		setPos: function(x,y) {
			this.x = x;
			this.y = y;
		},

		setDirection: function(dx, dy) {
			this.dx = dx;
			this.dy = dy;
		},
		
		move: function(court) {
			this.x += this.dx;
			this.y += this.dy;		
		}
		// ,
		// draw: function(canvasContext) {
		// 	canvasContext.beginPath();
		// 	canvasContext.fill();
		// }
	}
});
