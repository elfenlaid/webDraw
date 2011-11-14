var Context = function(canvasContext, width, height){
	this.ctx = canvasContext;
	this.width = width;
	this.height = height;
	this.imageData = canvasContext.getImageData(0, 0, width, height);
	this._white = {r: 0xFF, g: 0xFF, b: 0xFF, a: 0xFF};
	
	this.drawPixel = function(x, y, color){
		if(x >= 0 && x < this.width && y >= 0 && y < this.height)
		{
			//1-фон, 2-слой. Х=х2 а2 + х1 (1-а2)
			index = (x + y * this.imageData.width) * 4;
			var alpha = color.a / 0xFF;
	    	this.imageData.data[index + 0] = color.r * (alpha) + this.imageData.data[index + 0] * (1 - alpha);
	    	this.imageData.data[index + 1] = color.g * (alpha) + this.imageData.data[index + 1] * (1 - alpha);
	    	this.imageData.data[index + 2] = color.b * (alpha) + this.imageData.data[index + 2] * (1 - alpha);
	    	this.imageData.data[index + 3] = 0xFF;
	    }
	}
	
	this.getPixel = function(x, y){
		if(x >= 0 && x < this.width && y >= 0 && y < this.height)
		{
			index = (x + y * this.imageData.width) * 4;
	    	return {
	    		r: this.imageData.data[index + 0],
	    		g: this.imageData.data[index + 1],
	    		b: this.imageData.data[index + 2],
	    		a: this.imageData.data[index + 3]
	    	};
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
		for(var x = 0; x < this.width; x++){
			for(var y = 0; y < this.height; y++){
				index = (x + y * this.imageData.width) * 4;
		    	this.imageData.data[index + 0] = this._white.r;
		    	this.imageData.data[index + 1] = this._white.g;
		    	this.imageData.data[index + 2] = this._white.b;
		    	this.imageData.data[index + 3] = this._white.a;
			}
		}	
	}


	this.setSize = function(width, height){
		this.width = width;
		this.height = height;
		this.imageData = canvasContext.getImageData(0, 0, width, height);
	}
};