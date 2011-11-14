
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