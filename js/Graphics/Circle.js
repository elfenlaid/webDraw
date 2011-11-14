var Circle = Backbone.View.extend({
	initialize: function(args) {
		if(args.center){
			this.center = args.center;
		} else {
			this.center = new Point();
		}
		if(args.radius){
			this.radius = args.radius;
		} else {
			this.radius = 0;
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
		var x0 = this.center.get('x');
		var y0 = this.center.get('y');
		
		var x = 0;
        var y = this.radius;
        
        var p = new Point({
        	x: x, 
        	y: y
        });
        
        var delta = 2 - 2 * this.radius;
        var error = 0;
        while(y >= 0) {
        		p.set({x: x0 + x, y: y0 + y});
        		this.canvas.drawPoint(p, this.color);
        		
             	p.set({x: x0 + x, y: y0 - y});
                this.canvas.drawPoint(p, this.color);
                
                p.set({x: x0 - x, y: y0 + y});
                this.canvas.drawPoint(p, this.color);
                
                p.set({x: x0 - x, y: y0 - y});
                this.canvas.drawPoint(p, this.color);
 
                error = 2 * (delta + y) - 1;
                if(delta < 0 && error <= 0) {
                        x++;
                        delta += 2 * x + 1;
                        continue;
                }
                error = 2 * (delta - x) - 1;
                if(delta > 0 && error > 0) {
                        y--;
                        delta += 1 - 2 * y;
                        continue;
                }
                x++;
                delta += 2 * (x - y);
                y--;
        }
	}
});