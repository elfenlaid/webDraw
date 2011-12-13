var CohenSutherland = { 	
	INSIDE : 0, 
	LEFT : 1,   
	RIGHT : 2,  
	BOTTOM : 4, 
	TOP : 8,    
	 
	xmin : 0,
	xmax : 0,
	ymin : 0,
	ymax : 0,
	
	initClipRect : function(xmin, xmax, ymin, ymax) {
		this.xmin = xmin < xmax ? xmin : xmax;
		this.xmax = xmax > xmin ? xmax : xmin;
		this.ymin = ymin < ymax ? ymin : ymax;
		this.ymax = ymax > ymin ? ymax : ymin;
	},
	 
	
	ComputeOutCode : function(x, y) {
			var code = this.INSIDE;
			if (x < this.xmin)      	
					code |= this.LEFT;
			else if (x > this.xmax)  	
					code |= this.RIGHT;
			if (y < this.ymin)     		
					code |= this.BOTTOM;
			else if (y > this.ymax)   	
					code |= this.TOP;
	 
			return code;
	},
	 

	
	
	
	CohenSutherlandLineClipAndDraw : function(x0, y0, x1, y1) {
			
			 var line = new BresenhamLine({
						pointStart: new Point({x: x0, y: y0}),
						pointEnd:	new Point({x: x1, y: y1}),
						color: 'red'
					});
					
					canvas.draw(line);
			
			
			var outcode0 = this.ComputeOutCode(x0, y0);
			var outcode1 = this.ComputeOutCode(x1, y1);
			var accept = false;
	 
			while (true) {
					if (!(outcode0 | outcode1)) { 
							accept = true;
							break;
					} else if (outcode0 & outcode1) { 
							break;
					} else {
							
							var x, y;
	 
							
							var outcodeOut = outcode0? outcode0 : outcode1;
	 
							
							
							if (outcodeOut & this.TOP) {           
									x = (x0 + (x1 - x0) * (this.ymax - y0) / (y1 - y0));
									y = this.ymax;
							} else if (outcodeOut & this.BOTTOM) { 
									x = (x0 + (x1 - x0) * (this.ymin - y0) / (y1 - y0));
									y = this.ymin;
							} else if (outcodeOut & this.RIGHT) {  
									y = (y0 + (y1 - y0) * (this.xmax - x0) / (x1 - x0));
									x = this.xmax;
							} else if (outcodeOut & this.LEFT) {   
									y = (y0 + (y1 - y0) * (this.xmin - x0) / (x1 - x0));
									x = this.xmin;
							}
							
							if (outcodeOut == outcode0) {
									x0 = x;
									y0 = y;
									outcode0 = this.ComputeOutCode(x0, y0);
							} else {
									x1 = x;
									y1 = y;
									outcode1 = this.ComputeOutCode(x1, y1);
							}
					}
			}
			if (accept) {
				   
				    var line = new BresenhamLine({
						pointStart: new Point({x: Math.round(x0), y: Math.round(y0)}),
						pointEnd:	new Point({x: Math.round(x1), y: Math.round(y1)}),
						color: 'blue'
					});
					
					canvas.draw(line);
				   
			}
	},
};