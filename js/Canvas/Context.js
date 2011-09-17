var Context = function(canvasContext, width, height){
	this.ctx = canvasContext;
	this.width = width;
	this.height = height;
	this.imageData = canvasContext.getImageData(0, 0, width, height);
	this._white = {r: 0xFF, g: 0xFF, b: 0xFF, a: 0xFF};
	
	this.drawPixel = function(x, y, color){
		if(x >= 0 && x < this.width && y >= 0 && y < this.height)
		{
			index = (x + y * this.imageData.width) * 4;
	    	this.imageData.data[index + 0] = color.r;
	    	this.imageData.data[index + 1] = color.g;
	    	this.imageData.data[index + 2] = color.b;
	    	this.imageData.data[index + 3] = color.a;
	    }
	}

	this.drawRect = function(x, y, width, height, color){
		for(var i = x; i < width + x; i++){
			for(var j = y; j < height + y; j++){
				this.drawPixel(i, j, color);
			}
		}
	}

	this.flush = function(){
		this.ctx.putImageData(this.imageData, 0, 0);
	}

	this.clear = function(){
		for(var i = 0; i < this.width; i++){
			for(var j = 0; j < this.height; j++){
				this.drawPixel(i, j, this._white);
			}
		}
	}

	this.setSize = function(width, height){
		this.width = width;
		this.height = height;
		this.imageData = canvasContext.getImageData(0, 0, width, height);
	}
};