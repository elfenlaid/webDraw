var ErmitLine = Line.extend({
	render: function() {
	    
		for (var t = 0.0; t < 1.1; t += 0.1) {
		    var p = ermitForT(t);
    		this.canvas.drawPoint(p, this.color);
		}

	}, 
	
	ermitForT: function(t) {
	    [t * t * t, t * t, t, 1]
	    
	    [2, -2, 1, 1]
	    [-3, 3, -2, -1]
	    [0, 0, 1, 0]
	    [1, 0, 0, 0]
	    
	    [p1.x, p1.y]
	    [p2.x, p2.y]
	    [p3.x, p3.y]
	    [p4.x, p4.y]
	}
});