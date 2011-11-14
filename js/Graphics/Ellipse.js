var Ellipse = Backbone.View.extend({
	initialize: function(args) {
		if(args.center){
			this.center = args.center;
		} else {
			this.center = new Point();
		}
		if(args.a){
			this.a = args.a;
		} else {
			this.a = 0;
		}
		
		if(args.b){
			this.b = args.b;
		} else {
			this.b = 0;
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
        var y = this.b;
        
        var p = new Point({
        	x: x, 
        	y: y
        });
        
        var delta = Math.sqr(this.a) + Math.sqr(this.b) - 2 * Math.sqr(this.a) * this.b;
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
 
                var error = 2 * (delta + Math.sqr(this.a) * y) - Math.sqr(this.a);
                if(delta < 0 && error <= 0) {
                        x++;
                        delta += Math.sqr(this.b) * (2 * x + 1);
                        continue;
                }
                error = 2 * (delta + Math.sqr(this.b) * x) - Math.sqr(this.b);
                if(delta > 0 && error > 0) {
                        y--;
                        delta += Math.sqr(this.a) * (1 - 2 * y);
                        continue;
                }
                ++x;
                delta += Math.sqr(this.b) * (2 * x + 1) + Math.sqr(this.a) * (1 - 2 * y);
                --y;
        }
	}
});