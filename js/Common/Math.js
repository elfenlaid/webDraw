Math.EPSILON = 0.000001;

Math.sign = function(x) {
		if(x < 0) return -1;
		if(x == 0) return 0;
		if(x > 0) return 1;
	};

Math.fpart = function(x) {
	var a = x - Math.floor(x);
	if(Math.abs(a) < Math.EPSILON) return 0;
	if(1 - Math.abs(a) < Math.EPSILON) return 1;
	return a;
<<<<<<< HEAD
}

Math.rfpart = function(x) {
    return 1 - Math.fpart(x);
}

Math.sqr = function(x) {
	return Math.pow(x, 2);
}
=======
}
>>>>>>> f159a9611447475a107e466186cb154473c3bc48
