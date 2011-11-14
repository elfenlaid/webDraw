var BresenhamLine = Line.extend({
	render: function() {
		var x1 = this.pointStart.get("x");
		var y1 = this.pointStart.get("y");
		var x2 = this.pointEnd.get("x");
		var y2 = this.pointEnd.get("y");
		
		var p = new Point({
			x: x1,
			y: y1
		});

		var dx = Math.abs(x2 - x1);
		var dy = Math.abs(y2 - y1);
		var sx = Math.sign(x2 - x1);
		var sy = Math.sign(y2 - y1);
		var error = dx - dy;

		while(true) {
			this.canvas.drawPoint(p, this.color);

			if(x1 == x2 && y1 == y2) break;

			var error2 = error * 2;

			if(error2 > -dy) {
				error -= dy;
				x1 += sx;
			}

			if(error2 < dx) {
				error += dx;
				y1 += sy;
			}

			p.set({
				x: x1,
				y: y1
			});
		}
	}
});