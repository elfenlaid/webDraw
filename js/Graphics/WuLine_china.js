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

		var dx = x2 - x1;
		var dy = y2 - y1;
		
        if(Math.abs(dx) < Math.abs(dy)) {
            x2 += x1; x1 = x2 - x1; x2 -= x1;
            y2 += y1; y1 = y2 - y1; y2 -= y1;
            dy += dx; dx = dy - dx; dy -= dx;
        } 
		
		if(x2 < x1) {
            x2 += x1; x1 = x2 - x1; x2 -= x1;
			y2 += y1; y1 = y2 - y1; y2 -= y1;
		} 
		
		
		var intery;
		var gradient = dy / dx;

        var xend = Math.floor(x1 + 0.5);
        var yend = y1 + gradient * (xend - x1);
        var xgap = Math.rfpart(x1 + 0.5);
        
        var xpxl1 = xend;
        var ypxl1 = Math.floor(yend);
        
        var color = this.color.modify([null, null, null, Math.rfpart(yend) * xgap]);
		this.canvas.drawPoint(new Point({x:xpxl1, y:ypxl1}), color);

        color = this.color.modify([null, null, null, Math.fpart(yend) * xgap]);
		this.canvas.drawPoint(new Point({x:xpxl1, y:ypxl1 + 1}), color);
        intery = yend + gradient;

        // handle second endpoint
        xend = Math.floor(x2 + 0.5);
        yend = y2 + gradient * (xend - x2);
        xgap = Math.fpart(x2 + 0.5);
        var xpxl2 = xend;
        var ypxl2 = Math.floor(yend);
        
        color = this.color.modify([null, null, null, Math.rfpart(yend) * xgap]);
		this.canvas.drawPoint(new Point({x:xpxl2, y:ypxl2}), color);

        color = this.color.modify([null, null, null, Math.fpart(yend) * xgap]);
		this.canvas.drawPoint(new Point({x:xpxl2, y:ypxl2 + 1}), color);
        

		for(var x = xpxl1 + 1; x < xpxl2 ; x++) {
			p.set({
				x: x,
				y: Math.floor(intery)
			});	

			color = this.color.modify([null, null, null, Math.rfpart (intery)]);
			this.canvas.drawPoint(p, color);

			p.set({
				y: Math.floor(intery) + 1
			});	

			color = this.color.modify([null, null, null, Math.fpart(intery)]);
			this.canvas.drawPoint(p, color);
			intery += gradient;
		}
	}
});