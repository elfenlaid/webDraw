

var Line = Backbone.View.extend({
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
	},
	
	render: function() {
	    for ()
	},
	
	Bezier4: function(p1, p2, p3, p4, mu) {
        var mum1, mum13, mu3;
        var p = new Point();

        mum1 = 1 - mu;
        mum13 = mum1 * mum1 * mum1;
        mu3 = mu * mu * mu;

        p.set({x: mum13*p1.get('x') + 3*mu*mum1*mum1*p2.get('x') + 3*mu*mu*mum1*p3.get('x') + mu3*p4.get('x') });
        p.set({y: mum13*p1.get('y') + 3*mu*mum1*mum1*p2.get('y') + 3*mu*mu*mum1*p3.get('y') + mu3*p4.get('y') });

        return p;
    }
});