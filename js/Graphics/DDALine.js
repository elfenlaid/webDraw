var DDALine = Line.extend({
	render: function() {
		var x1 = this.pointStart.get("x");
		var y1 = this.pointStart.get("y");
		var x2 = this.pointEnd.get("x");
		var y2 = this.pointEnd.get("y");
		
		var length = _.max([Math.abs(x2-x1), Math.abs(y2 - y1)]);
		var dx = (x2 - x1) / length;
		var dy = (y2 - y1) / length;
		
		var p = new Point({
			x: x1 + 0.5 * Math.sign(dx),
			y: y1 + 0.5 * Math.sign(dy)
		});
		this.canvas.drawPoint(p, this.color);
		var i = 0;
		while(i++ < length){
			p.set({
				x: p.get('x') + dx,
				y: p.get('y') + dy
			});
			this.canvas.drawPoint(p, this.color);
		}		
	}
});