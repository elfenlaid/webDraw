var CohenSutherland = { 		INSIDE : 0, // 0000
	LEFT : 1,   // 0001
	RIGHT : 2,  // 0010
	BOTTOM : 4, // 0100
	TOP : 8,    // 1000
	 
	xmin : 0,
	xmax : 0,
	ymin : 0,
	ymax : 0,
	
	initClipRect : function(xmin, xmax, ymin, ymax) {
		this.xmin = xmin < xmax ? xmin : xmax;
		this.xmax = xmax > xmin ? xmax : xmin;
		this.ymin = ymin < ymax ? ymin : ymax;
		this.ymax = ymax > ymin ? ymax : ymin;
	},
	 
	//вычисление кода точки, используя размеры прямоугольника 
	ComputeOutCode : function(x, y) {
			var code = this.INSIDE;
			if (x < this.xmin)      	// точка левее прямоугольника
					code |= this.LEFT;
			else if (x > this.xmax)  	// точка правее прямоугольника
					code |= this.RIGHT;
			if (y < this.ymin)     		// точка ниже прямоугольника
					code |= this.BOTTOM;
			else if (y > this.ymax)   	// точка выше прямоугольника
					code |= this.TOP;
	 
			return code;
	},
	 

	// Алгоритм Коэна — Сазерленда отсекает линии от
	// P0 = (x0, y0) до P1 = (x1, y1) используя прямоугольник
	// с диагональю от (xmin, ymin) до xmax, ymax).
	CohenSutherlandLineClipAndDraw : function(x0, y0, x1, y1) {
						 var line = new BresenhamLine({						pointStart: new Point({x: x0, y: y0}),						pointEnd:	new Point({x: x1, y: y1}),						color: 'red'					});										canvas.draw(line);						// вычисляем коды точек
			var outcode0 = this.ComputeOutCode(x0, y0);
			var outcode1 = this.ComputeOutCode(x1, y1);
			var accept = false;
	 
			while (true) {
					if (!(outcode0 | outcode1)) { // Линия полность находится внутри прямоугольника
							accept = true;
							break;
					} else if (outcode0 & outcode1) { // Линия не пересекает прямоугольника
							break;
					} else {
							// линия пересекает прямоугольник и необходимо отсеч невидимые части
							var x, y;
	 
							// Выбирем любую точку, которая находится вне прямоугольника
							var outcodeOut = outcode0? outcode0 : outcode1;
	 
							// Находим точку пересечения
							// используя формулы y = y0 + slope * (x - x0), x = x0 + (1 / slope) * (y - y0)
							if (outcodeOut & this.TOP) {           // точка выше прямоугольника
									x = (x0 + (x1 - x0) * (this.ymax - y0) / (y1 - y0));
									y = this.ymax;
							} else if (outcodeOut & this.BOTTOM) { // точка ниже прямоугольника
									x = (x0 + (x1 - x0) * (this.ymin - y0) / (y1 - y0));
									y = this.ymin;
							} else if (outcodeOut & this.RIGHT) {  // точка правее прямоугольника
									y = (y0 + (y1 - y0) * (this.xmax - x0) / (x1 - x0));
									x = this.xmax;
							} else if (outcodeOut & this.LEFT) {   // точка левее прямоугольника
									y = (y0 + (y1 - y0) * (this.xmin - x0) / (x1 - x0));
									x = this.xmin;
							}
							// Передвигаем внешнюю точку до пересечения со стороной прямоугольника
							if (outcodeOut == outcode0) {
									x0 = x;
									y0 = y;
									outcode0 = this.ComputeOutCode(x0, y0);
							} else {
									x1 = x;
									y1 = y;
									outcode1 = this.ComputeOutCode(x1, y1);
							}
					}
			}
			if (accept) {
				   				    var line = new BresenhamLine({						pointStart: new Point({x: Math.round(x0), y: Math.round(y0)}),						pointEnd:	new Point({x: Math.round(x1), y: Math.round(y1)}),						color: 'blue'					});										canvas.draw(line);
				   
			}
	},
};