var line = new DDALine({
	pointStart: new Point({x: 20, y: 20}),
	pointEnd:	new Point({x: 30, y: 50}),
	color: 'green'
});

var line2 = new BresenhamLine({
	pointStart: new Point({x: 50, y: 90}),
	pointEnd:	new Point({x: 180, y: 80}),
	color: 'blue'
});

var line3 = new WuLine({
	pointStart: new Point({x: 10, y: 10}),
	pointEnd:	new Point({x: 150, y: 40}),
	color: 'red'
});

var ellipse = new Ellipse({
	center: new Point({x: 100, y: 100}),
	a: 25,
	b: 50,	
	color: 'yellow'
});

var circle = new Circle({
	center: new Point({x: 200, y: 200}),
	radius: 50,
	color: "pink"
});

var p1 = new Parabola({
    center: new Point({x: 90, y: 50}),
    p: 6,
    color: "black"
});

var p2 = new Parabola({
    center: new Point({x: 3, y: 50}),
    p: -10,
    color: "black"
});

var controller = new Controller();
Backbone.history.start(); 

var canvasConfig = new CanvasConfig({pixelSize: 10});
var canvas = new Canvas({model: canvasConfig});
var cube = new Cube();
canvas.redraw();


// canvas.draw(line);
// canvas.draw(line2);
// canvas.draw(line3);
//canvas.draw(ellipse);
//canvas.draw(circle);

//canvas.draw(p1);
//canvas.draw(p2);