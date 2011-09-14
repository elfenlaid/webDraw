Math.sign = function(x) {
		if(x < 0) return -1;
		if(x == 0) return 0;
		if(x > 0) return 1;
	};
Math.EPSILON = 0.000001;
Math.fpart = function(x) {
	var a = x - Math.floor(x);
	if(Math.abs(a) < Math.EPSILON) return 0;
	if(1 - Math.abs(a) < Math.EPSILON) return 1;
	return a;
}

var CanvasConfig = Backbone.Model.extend({
	defaults: {
		pixelSize: 1
	}
});	

var Point = Backbone.Model.extend({
	defaults: {
		x: 0,
		y: 0,
		z: 0
	}
});
		
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
		var x1 = this.pointStart.get("x");
		var y1 = this.pointStart.get("y");
		var x2 = this.pointEnd.get("x");
		var y2 = this.pointEnd.get("y");
		
		var length = _.max([Math.abs(x2-x1), Math.abs(y2 - y1)]);
		var dx = (x2 - x1) / length;
		var dy = (y2 - y1) / length;
		
		var p = new Point({
			x: x1 + 0.5 * Math.sign(dx),
			y: y1 + 0.5 * Math.sign(dy)
		});
		this.canvas.drawPoint(p, this.color.toCSS());
		var i = 0;
		while(i++ < length){
			p.set({
				x: p.get('x') + dx,
				y: p.get('y') + dy
			});
			this.canvas.drawPoint(p, this.color.toCSS());
		}		
	}
});

var BresenhamLine = Line.extend({
	render: function() {
		var x1 = this.pointStart.get("x");
		var y1 = this.pointStart.get("y");
		var x2 = this.pointEnd.get("x");
		var y2 = this.pointEnd.get("y");
		
		var p = new Point({
			x: x1,
			y: y1
		});

		var dx = Math.abs(x2 - x1);
		var dy = Math.abs(y2 - y1);
		var sx = Math.sign(x2 - x1);
		var sy = Math.sign(y2 - y1);
		var error = dx - dy;

		while(true) {
			this.canvas.drawPoint(p, this.color.toCSS());

			if(x1 == x2 && y1 == y2) break;

			var error2 = error * 2;

			if(error2 > -dy) {
				error -= dy;
				x1 += sx;
			}

			if(error2 < dx) {
				error += dx;
				y1 += sy;
			}

			p.set({
				x: x1,
				y: y1
			});
		}
	}
});

var WuLine = Line.extend({
	render: function() {
		var x1 = this.pointStart.get("x");
		var y1 = this.pointStart.get("y");
		var x2 = this.pointEnd.get("x");
		var y2 = this.pointEnd.get("y");
		
		var p = new Point({
			x: x1,
			y: y1
		});

		var dx = Math.abs(x2 - x1);
		var dy = Math.abs(y2 - y1);
		
		if(dy < dx) {
			if(x2 < x1) {
				x2 += x1; x1 = x2 - x1; x2 -= x1;
				y2 += y1; y1 = y2 - y1; y2 -= y1;
			}

			var grad = dy / dx;
			var intery = y1 + grad;

			this.canvas.drawPoint(p, this.color.toCSS());

			for(var x = x1 + 1; x < x2; x++) {
				p.set({
					x: x,
					y: Math.floor(intery)
				});	

				color = this.color.modify([null, null, null, 1 - Math.fpart(intery)]).toCSS();
				this.canvas.drawPoint(p, color);

				p.set({
					y: Math.floor(intery) + 1
				});	

				color = this.color.modify([null, null, null, Math.fpart(intery)]).toCSS();
				this.canvas.drawPoint(p, color);
				intery += grad;
			}

			p.set({
				x: x2,
				y: y2
			});
			this.canvas.drawPoint(p, this.color.toCSS());
		} else {
			if(y2 < y1) {
				x2 += x1; x1 = x2 - x1; x2 -= x1;
				y2 += y1; y1 = y2 - y1; y2 -= y1;
			}

			var grad = dx / dy;
			var intery = x1 + grad;

			this.canvas.drawPoint(p, this.color.toCSS());

			for(var y = y1 + 1; y < y2; y++) {
				p.set({
					x: Math.floor(intery),
					y: y
				});	

				color = this.color.modify([null, null, null, 1 - Math.fpart(intery)]).toCSS();
				this.canvas.drawPoint(p, color);

				p.set({
					x: Math.floor(intery) + 1
				});	

				color = this.color.modify([null, null, null, Math.fpart(intery)]).toCSS();
				this.canvas.drawPoint(p, color);
				intery += grad;
			}

			p.set({
				x: x2,
				y: y2
			});
			this.canvas.drawPoint(p, this.color.toCSS());
		}
	}
});

var Canvas = Backbone.View.extend({
	el: $("#canvas"),
	_figures: [],
	events: {
		'click' : 'click'
	},
	initialize: function(){
		this.ctx = this.el[0].getContext('2d');

		this.width = this.el.width();
		this.height = this.el.height();
		this.pixelSize = this.model.get('pixelSize');
		this._setCanvasSize();
		_.bindAll(this, 'changePixelSize');
		this.model.bind('change:pixelSize', this.changePixelSize);
	},
	
	click: function(e) {
		var x = Math.floor(e.offsetX / this.pixelSize);
		var y = Math.floor(e.offsetY / this.pixelSize);
		this.drawPoint(new Point({x: x, y: y}), 'black');
	},

	_setCanvasSize: function() {
		this.el.attr('width', '' + (this.width * this.pixelSize) + 'px');
		this.el.attr('height', '' + (this.height * this.pixelSize) + 'px');
	},
	
	drawPoint: function(point, color){
		if(color) {
			this.ctx.fillStyle = color;
		}
		var x = Math.floor(point.get('x'));
		var y = Math.floor(point.get('y'));
		if(x >= 0 && x < this.width && y >= 0 && y < this.height) {
			this.ctx.fillRect(
					x * this.pixelSize, 
					y * this.pixelSize, 
					this.pixelSize, 
					this.pixelSize
				);
		}
	},
	
	draw: function(figure){
		if(_.isFunction(figure.render)){
			figure.canvas = this;
			figure.render();
			this._figures.push(figure);
		}
	},
	
	redraw: function() {
		this.clear();
		
		for(var i = 0; i < this._figures.length; i++){
			this._figures[i].render();
		}
	},
	
	clear: function() {
		this.ctx.clearRect(0, 0, this.el.width(), this.el.height());
	},
	
	changePixelSize: function(e) {
		this.pixelSize = this.model.get('pixelSize');
		this._setCanvasSize();
		this.redraw();
	},
	
});

var line = new Line({
	pointStart: new Point({x: 20, y: 20}),
	pointEnd:	new Point({x: 30, y: 400}),
	color: 'green'
});

var line2 = new BresenhamLine({
	pointStart: new Point({x: 50, y: 90}),
	pointEnd:	new Point({x: 180, y: 300}),
	color: 'blue'
});

var line3 = new WuLine({
	pointStart: new Point({x: 10, y: 10}),
	pointEnd:	new Point({x: 150, y: 400}),
	color: 'red'
});

var canvasConfig = new CanvasConfig({pixelSize: 1});
var canvas = new Canvas({model: canvasConfig});

canvas.draw(line);
canvas.draw(line2);
canvas.draw(line3);