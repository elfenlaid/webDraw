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
		
		if(this.p < 0) {
			var limit = this.canvas.width;
		} else {
			var limit = 0;
		}
		
		var p = Math.abs(this.p);
		
		var x = 0;
        var y = 0;
        
		if(p != 0) {
			var lim = - Math.abs(limit - x0);
		} else {
			var lim = 0;
		}

		if(p == 1) {
			var delta = 0;
		} else {
			var delta = -1;
		}
		
        var point = new Point({
        	x: x, 
        	y: y
        });
        
        while(x >= lim) {

				point.set({x: x0 + Math.sign(this.p) * x, y: y0 + y});
				this.canvas.drawPoint(point, this.color);
				point.set({x: x0 + Math.sign(this.p) * x, y: y0 - y});
				this.canvas.drawPoint(point, this.color);
				
                var error = 2 * (delta - p + 2 * y + 1);
                if(delta < 0 && error <= 0) {
                        y++;
                        delta += 2 * y + 1;
                        continue;
                }
				
                var error = 2 * (delta - 2 * p + y) + 1;
                if(delta > 0 && error > 0) {
                        x--;
                        delta += - 2 * p;
                        continue;
                }
                x--;
                y++;
				delta += 2 * y - 2 * p + 1;
        }
	}
});