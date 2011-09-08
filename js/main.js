Math.sign = function(x) {
		if(x < 0) return -1;
		if(x == 0) return 0;
		if(x > 0) return 1;
};
			

var Point = Backbone.Model.extend({
	defaults: {
		x: 0,
		y: 0,
		z: 0
	}
});


var Line = Backbone.View.extend({
	initialize: function() {
		this.pointStart = new Point();
		this.pointEnd   = new Point();
		this.canvas = null;
	},

	
	render: function() {
		var x1 = this.pointStart.get("x");
		var y1 = this.pointStart.get("y");
		var x2 = this.pointEnd.get("x");
		var y2 = this.pointEnd.get("y");
		var p = new Point();

		
		var length = _.max([Math.abs(x2-x1), Math.abs(y2 - y1)]);
		var dx = (x2 - x1) / length;
		var dy = (y2 - y1) / length;

		p.set({x: x1 + 0.5 * Math.sign(dx)});
		p.set({y: y1 + 0.5 * Math.sign(dy)});
		this.canvas.drawPoint(p);

		var i = 0;
		while(i++ < length){
			p.set({x: p.get("x") + dx});
			p.set({y: p.get("y") + dy});
			this.canvas.drawPoint(p);
		}
		
		
	}
});

var Canvas = Backbone.View.extend({
	el : document.getElementById("canvas"),
	initialize: function () {
		this.ctx = this.el.getContext("2d");
	}, 

	drawPoint: function(point){
		point.set({x: Math.ceil(point.get("x"))});
		point.set({y: Math.ceil(point.get("y"))});
		point.set({z: Math.ceil(point.get("z"))});


		this.ctx.fillRect(point.get("x"), point.get("y"), 1, 1);
	},

	draw: function(element){
		if ( _.isFunction(element.render) ){
			element.canvas = this;
			element.render();
		}
	}
})


var l = new Line({pointStart: new Point({ x : 0, y : 0}), 
				  pointEnd  : new Point({ x : 100, y : 100}) 
				  });
l.pointStart = new Point({ x : 0, y : 0});
l.pointEnd   = new Point({ x : 100, y : 100});
var canvas = new Canvas();

canvas.draw(l);