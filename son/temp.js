DOC.On('mouseUp', function(e) {console.log('CUNT - e.button='+e.button); });
var fn=function() {
	DOC.Once('mouseUp', function(e) {cout('BUNT - e.button='+e.button); fn(); });
};
//fn();
