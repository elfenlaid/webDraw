
var BezierLine = Backbone.View.extend({
	initialize: function(args) {
		if(args.pointStart){
			this.pointStart = args.pointStart;
		} else {
			this.pointStart = new Point();
		}
		if(args.pointEnd){
			this.pointEnd = args.pointEnd;
		} else {
			this.pointEnd = new Point();
		}
		if(args.p1){
		    this.p1 = args.p1;
	    } else {
	        this.p1 = new Point();
		}
		if(args.p2){
		    this.p2 = args.p2;
	    } else {
	        this.p2 = new Point();
		}
		
		if(args.color) {
			var tmp = $.Color(args.color).toRGB();
			this.color = $.Color([tmp.red(), tmp.green(), tmp.blue(), 1]);
		} else {
			this.color = $.Color('#000000');
		}
		this.canvas = null;
		
		this.pVectorX = $V([this.pointStart.get("x"), this.p1.get("x"), 
		                   this.p2.get("x"), this.pointEnd.get("x")]);
		this.pVectorY = $V([this.pointStart.get("y"), this.p1.get("y"), 	
	                       this.p2.get("y"), this.pointEnd.get("y")]);
		
		this.bezierMatrix = $M(
			 [[-1, 3, -3, 1],
			 [3, -6, 3, 0],
			 [-3, 3, 0, 0],
			 [1, 0, 0, 0]]);
			
	},
	
	render: function() {
		var t = 0;
		while(t < 1) {
			var tVector = $M([[Math.pow(t, 3), Math.pow(t,2), t, 1],
							[0,0,0,0],
							[0,0,0,0],
							[0,0,0,0]      
			                 ]);
			var x1 = tVector.multiply(this.bezierMatrix).multiply(this.pVectorX).e(1);
			var y1 = tVector.multiply(this.bezierMatrix).multiply(this.pVectorY).e(1);
			
			t += 0.1;
			
			tVector = $M([[Math.pow(t, 3), Math.pow(t,2), t, 1],
							[0,0,0,0],
							[0,0,0,0],
							[0,0,0,0]      
			                 ]);
			var x2 = tVector.multiply(this.bezierMatrix).multiply(this.pVectorX).e(1);
			var y2 = tVector.multiply(this.bezierMatrix).multiply(this.pVectorY).e(1);
			
			var wuLine = new BresenhamLine({
		    	pointStart: new Point({x: Math.round(x1), y: Math.round(y1)}),
		    	pointEnd:   new Point({x: Math.round(x2), y: Math.round(y2)}),
		    	color: 'red'
		        });
		
		    this.canvas.draw(wuLine);
		}
	}
});



