
$('#wu_line_btn').click(function(){
    drawState = "WuLineDraw";
});

$('#dda_line_btn').click(function(){
    drawState = "DDALineDraw";
});

$('#bresenham_line_btn').click(function(){
    drawState = "BresenhamLineDraw";
});

$('#circle_btn').click(function(){
    drawState = "CircleDraw";
});

$('#ellipse_btn').click(function(){
    drawState = "EllipseDraw";
});

$('#clear_btn').click(function() {
    canvas.wipeClear();
    canvas.redraw();
});

$('#parabola_btn').click(function() {
	drawState = "ParabolaDraw";
});

$('#tranformations_btn').click(function() {
	drawState = "CubeDraw";
});


var isVoronoiInit = false;

$('#voronoi_btn').click(function() {
	Voronoi.canvas = canvas.getHtmlCanvas();
	Voronoi.setCanvasSize(canvas.width * canvas.pixelSize, canvas.height * canvas.pixelSize);
	if(!isVoronoiInit) {
		Voronoi.init();
		isVoronoiInit = true;
	}
	Voronoi.clearSites();
	Voronoi.generateSites(100);
});

$('#cohen_sutherland_btn').click(function() {
	drawState = "CohenSutherlandDraw";
});

$('#bezier_btn').click(function() {
	drawState = "BezierDraw";
});

function WuLineDraw () {
    if (drawVector.length < 2) return;
    
    var wuLine = new WuLine({
    	pointStart: drawVector[0],
    	pointEnd:	drawVector[1],
    	color: 'red'
    });
    
    canvas.draw(wuLine);
    drawVector = [];
};

function DDALineDraw () {
    if (drawVector.length < 2) return;
    
    var wuLine = new DDALine({
    	pointStart: drawVector[0],
    	pointEnd:	drawVector[1],
    	color: 'red'
    });
    
    canvas.draw(wuLine);
    drawVector = [];
};

function BresenhamLineDraw () {
    if (drawVector.length < 2) return;
    
    var wuLine = new BresenhamLine({
    	pointStart: drawVector[0],
    	pointEnd:	drawVector[1],
    	color: 'red'
    });
    
    canvas.draw(wuLine);
    drawVector = [];
};

function BezierDraw () {
    if (drawVector.length < 4) return;
    
    var bezier = new BezierLine({
    	pointStart: drawVector[0],
    	pointEnd:	drawVector[1],
		p1:         drawVector[2],
		p2:         drawVector[3],
    	color: 'red'
    });
    
    canvas.draw(bezier);
    drawVector = [];
};

function CircleDraw () {
    if (drawVector.length < 2) return;
    
    var circle = new Circle({
        center:drawVector[0],
        radius:Math.sqrt(Math.sqr(drawVector[0].get("x") - drawVector[1].get("x")) + Math.sqr(drawVector[0].get("y") - drawVector[1].get("y")))
    });
    
    canvas.draw(circle);
    drawVector = [];
}

function EllipseDraw () {
    if (drawVector.length < 2) return;
    
    var ellipse = new Ellipse({
    	center: drawVector[0],
    	a: Math.abs(drawVector[1].get("x") - drawVector[0].get("x")),
    	b: Math.abs(drawVector[1].get("y") - drawVector[0].get("y")),
    	color: 'yellow'
    });
    
    canvas.draw(ellipse);
    drawVector = [];
}

function ParabolaDraw() {
	if(drawVector.length != 1) return;
	var c = drawVector[0];
		
		$('#pDialog').dialog({
			modal: true,
			autoOpen: true,
			show: "blind",
			buttons: {
				"Ok" : function() {
					var p = $('#pValue').val();
					
					var parabola = new Parabola({
						center: c,
						p: p
					});
					canvas.draw(parabola);
					
					$('#pDialog').dialog('close');
				}
			}
		});
	drawVector = [];
}

function CohenSutherlandDraw() {
	if(drawVector.length < 2) return;
	if(drawVector.length == 2) {
			var rect = new Rect({
			topLeft: drawVector[0],
			bottomRight: drawVector[1],
			color: 'black'
		});
		canvas.draw(rect);
		
		CohenSutherland.initClipRect(
			drawVector[0].get('x'), 
			drawVector[1].get('x'), 
			drawVector[0].get('y'), 
			drawVector[1].get('y')
		);
	}
	if(drawVector.length == 3) return;
	if(drawVector.length == 4) {
		CohenSutherland.CohenSutherlandLineClipAndDraw(
			drawVector[2].get('x'),
			drawVector[2].get('y'),
			drawVector[3].get('x'),
			drawVector[3].get('y')
		);
		drawVector = [];
	}
	
}

function CubeDraw() {
	if (drawVector.lenght < 1) return;
	
	cube.sampleVertecies(drawVector[0]);
    canvas.draw(cube);
    drawVector = [];
}