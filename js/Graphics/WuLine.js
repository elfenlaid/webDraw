var WuLine = Line.extend({
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
		
		if(dy < dx) {
			if(x2 < x1) {
				x2 += x1; x1 = x2 - x1; x2 -= x1;
				y2 += y1; y1 = y2 - y1; y2 -= y1;
			}

			var grad = dy / dx;
			var intery = y1 + grad;

			this.canvas.drawPoint(p, this.color);

			for(var x = x1 + 1; x < x2; x++) {
				p.set({
					x: x,
					y: Math.floor(intery)
				});	

				color = this.color.modify([null, null, null, 1 - Math.fpart(intery)]);
				this.canvas.drawPoint(p, color);

				p.set({
					y: Math.floor(intery) + 1
				});	

				color = this.color.modify([null, null, null, Math.fpart(intery)]);
				this.canvas.drawPoint(p, color);
				intery += grad;
			}

			p.set({
				x: x2,
				y: y2
			});
			this.canvas.drawPoint(p, this.color);
		} else {
			if(y2 < y1) {
				x2 += x1; x1 = x2 - x1; x2 -= x1;
				y2 += y1; y1 = y2 - y1; y2 -= y1;
			}

			var grad = dx / dy;
			var intery = x1 + grad;

			this.canvas.drawPoint(p, this.color);

			for(var y = y1 + 1; y < y2; y++) {
				p.set({
					x: Math.floor(intery),
					y: y
				});	

				color = this.color.modify([null, null, null, 1 - Math.fpart(intery)]);
				this.canvas.drawPoint(p, color);

				p.set({
					x: Math.floor(intery) + 1
				});	

				color = this.color.modify([null, null, null, Math.fpart(intery)]);
				this.canvas.drawPoint(p, color);
				intery += grad;
			}

			p.set({
				x: x2,
				y: y2
			});
			this.canvas.drawPoint(p, this.color);
		}
	}
});