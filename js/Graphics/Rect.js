var Rect = Backbone.View.extend({
	initialize: function(args) {
		if(args.topLeft){
			this.topLeft = args.topLeft;
		} else {
			this.topLeft = new Point();
		}
		if(args.bottomRight){
			this.bottomRight = args.bottomRight;
		} else {
			this.bottomRight = new Point();
		}
		
		
		if(args.color) {
			var tmp = $.Color(args.color).toRGB();
			this.color = $.Color([tmp.red(), tmp.green(), tmp.blue(), 1]);
		} else {
			this.color = $.Color('#000000');
		}
		this.canvas = null;
	},
	
	render: function() {
		var x0 = this.topLeft.get('x');
		var y0 = this.topLeft.get('y');
		
		var x1 = this.bottomRight.get('x');
		var y1 = this.bottomRight.get('y');
		
		var line = new BresenhamLine({
			pointStart: new Point({x: x0, y: y0}),
			pointEnd:	new Point({x: x1, y: y0}),
			color: 'black'
		});
					
		this.canvas.draw(line);
		
		var line = new BresenhamLine({
			pointStart: new Point({x: x0, y: y0}),
			pointEnd:	new Point({x: x0, y: y1}),
			color: 'black'
		});
		
		this.canvas.draw(line);
		
		var line = new BresenhamLine({
			pointStart: new Point({x: x0, y: y1}),
			pointEnd:	new Point({x: x1, y: y1}),
			color: 'black'
		});
		
		this.canvas.draw(line);
		
		var line = new BresenhamLine({
			pointStart: new Point({x: x1, y: y0}),
			pointEnd:	new Point({x: x1, y:y1}),
			color: 'black'
		});
		
		this.canvas.draw(line);
	}
});