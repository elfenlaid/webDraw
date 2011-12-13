var Canvas = Backbone.View.extend({
	el: $("#canvas"),
	_figures: [],
	events: {
		'click' : 'click'
	},
	initialize: function(){
		
		this.width = this.el.width();
		this.height = this.el.height();

		this.ctx = this.el[0].getContext('2d');
		this.context = new Context(this.ctx, this.width, this.height);
		this.pixelSize = this.model.get('pixelSize');
		this._setCanvasSize();
		_.bindAll(this, 'changePixelSize');
		this.model.bind('change:pixelSize', this.changePixelSize);
		this.clear();
		this.grid();
	},
	
	grid : function() {
	    for(var i = this.pixelSize; i < this.width * this.pixelSize; i += this.pixelSize) {
	        for(var j = 0; j < this.height * this.pixelSize; ++j) {
	            this.context.drawPixel(i, j, {r: 0, g: 0, b: 0, a: 140});
	            this.context.drawPixel(j, i, {r: 0, g: 0, b: 0, a: 140});
	        }
	    }
	},
	
	click: function(e) {
		var x = Math.floor(e.offsetX / this.pixelSize);
		var y = Math.floor(e.offsetY / this.pixelSize);
		var point = new Point({x: x, y: y});
		//this.drawPoint(point, $.Color('black'));
		//this.context.flush();
		
		drawVector[drawVector.length] = point;
		if (drawState) eval(drawState + '();');
	},

	_setCanvasSize: function() {
		this.el.attr('width', '' + (this.width * this.pixelSize) + 'px');
		this.el.attr('height', '' + (this.height * this.pixelSize) + 'px');
		this.context.setSize(this.width * this.pixelSize, this.height * this.pixelSize);
	},
	
	drawPoint: function(point, color){
		var x = Math.floor(point.get('x'));
		var y = Math.floor(point.get('y'));
		if(x >= 0 && x < this.width && y >= 0 && y < this.height) {
			this.context.drawRect(
					x * this.pixelSize, 
					y * this.pixelSize, 
					this.pixelSize, 
					this.pixelSize,
					{
						r: color.red(), 
						g: color.green(), 
						b: color.blue(), 
						a: Math.round(color.alpha() * 255)
					}
				);
		}
	},
	
	draw: function(figure){
	    //this.context.clear();
		if(_.isFunction(figure.render)){
			figure.canvas = this;
			figure.render();
			this._figures.push(figure);
		}
		this.context.flush();
	},
	
	redraw: function() {
		this.clear();
		
		for(var i = 0; i < this._figures.length; i++){
			this._figures[i].render();
		}
		this.grid();
		this.context.flush();
	},
	
	clear: function() {	
		this.context.clear();
	},
	
	wipeClear: function() {
        this._figures = [];
        this.clear();
	},
	
	changePixelSize: function(e) {
		this.pixelSize = this.model.get('pixelSize');
		this._setCanvasSize();
		this.redraw();
	},
	
	getHtmlCanvas : function() {
		return this.el[0];
	},
	
});


