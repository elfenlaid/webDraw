var Cube = Backbone.View.extend({
	initialize: function(args) {
		if(args.topLeft){
			this.topLeft = args.topLeft;
		} else {
			this.topLeft = new Point({x:10, y:10});
		}
		
		if(args.color) {
			var tmp = $.Color(args.color).toRGB();
			this.color = $.Color([tmp.red(), tmp.green(), tmp.blue(), 1]);
		} else {
			this.color = $.Color('#000000');
		}
		this.canvas = null;
		
		var cubeSize = 40;
		this.vertices = [
			$V([this.topLeft.get('x'), this.topLeft.get('y'), 0]),
			$V([this.topLeft.get('x'), this.topLeft.get('y') + cubeSize, 0]), 
			$V([this.topLeft.get('x') + cubeSize, this.topLeft.get('y') + cubeSize, 0]),
			$V([this.topLeft.get('x') + cubeSize, this.topLeft.get('y'), 0]), 
			
			$V([this.topLeft.get('x'), this.topLeft.get('y'), cubeSize]),
			$V([this.topLeft.get('x'), this.topLeft.get('y') + cubeSize, cubeSize]), 
			$V([this.topLeft.get('x') + cubeSize, this.topLeft.get('y') + cubeSize, cubeSize]),
			$V([this.topLeft.get('x') + cubeSize, this.topLeft.get('y'), cubeSize])
			];
			
		var scale = 1;
		this.scaleMatrix = $M ([
			[scale, 0, 0],
			[0, 0, scale]]);
			
		this.offset = $V([0, 0]);
			
		var angle = (40 * 3.14 / 180);
		var zRotate = $M([
			[Math.cos(angle), -Math.sin(angle), 0], 
			[Math.sin(angle), Math.cos(angle), 0], 
			[0, 0, 1]]);			
		var xRotate = $M([
			[1, 0, 0],
			[0, Math.cos(angle), -Math.sin(angle)], 
			[0, Math.sin(angle), Math.cos(angle)]]);
		var yRotate = $M([
			[Math.cos(angle), 0, Math.sin(angle)], 
			[0, 1, 0], 
			[-Math.sin(angle), 0, Math.cos(angle)]]);
			
		this.rotationMatrix = xRotate.multiply(yRotate.multiply(zRotate));
	},
	
	render: function() {
		var start;
		var end;
		for (i = 0; i < this.vertices.length; i++) {
			start = this.offset.add(this.scaleMatrix.multiply(this.rotationMatrix.multiply(this.vertices[i])));
			
			if (i == 3 || i == 7) {
				end = this.offset.add(this.scaleMatrix.multiply(this.rotationMatrix.multiply(this.vertices[i-3])));
			} else {
				end = this.offset.add(this.scaleMatrix.multiply(this.rotationMatrix.multiply(this.vertices[i+1])));
			}
			
			var wuLine = new BresenhamLine({
		    	pointStart: new Point({x: Math.round(start.e(1)), y: Math.round(start.e(2))}),
		    	pointEnd:   new Point({x: Math.round(end.e(1)), y: Math.round(end.e(2))}),
		    	color: 'red'
		        });
		
		    this.canvas.draw(wuLine);
		}
		
		for (i = 0; i < 4; i++) {
			start = this.offset.add(this.scaleMatrix.multiply(this.rotationMatrix.multiply(this.vertices[i])));
			end = this.offset.add(this.scaleMatrix.multiply(this.rotationMatrix.multiply(this.vertices[i+4])));
			
			var wuLine = new BresenhamLine({
		    	pointStart: new Point({x: Math.round(start.e(1)), y: Math.round(start.e(2))}),
		    	pointEnd:   new Point({x: Math.round(end.e(1)), y: Math.round(end.e(2))}),
		    	color: 'red'
		        });
		
		    this.canvas.draw(wuLine);
		}
	}
});