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
		if(args.color) {
			var tmp = $.Color(args.color).toRGB();
			this.color = $.Color([tmp.red(), tmp.green(), tmp.blue(), 1]);
		} else {
			this.color = $.Color('#000000');
		}
		this.canvas = null;
	},
	
	render: function() {
	}
});