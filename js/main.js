var line = new DDALine({
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

