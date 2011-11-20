var Parabola = Backbone.View.extend({
	initialize: function(args) {
		if(args.center){
			this.center = args.center;
		} else {
			this.center = new Point();
		}
		if(args.p){
			this.p = args.p;
		} else {
			this.p = 0;
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
        var y = y0;
        
        var p = new Point({
        	x: x, 
        	y: y
        });
        
        var delta = 1 + 2 * this.p;
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
 
                error = 2 * (delta - this.p + 2 * Math.sqr(y) + 1);
                if(delta < 0 && error <= 0) {
                        x++;
                        delta += 2 * Math.sqr(y) + 1;
                        continue;
                }
                error = 2 * (delta - 2 * this.p + Math.sqr(y)) + 1;
                if(delta > 0 && error > 0) {
                        y--;
                        delta += - 2 * this.p;
                        continue;
                }
                x++;
                delta += 2 * Math.sqr(y) + 1 - 2 * this.p;
                y--;
        }
	}
});