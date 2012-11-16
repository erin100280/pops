son.Global.Son();

Element.prototype.hi='wow!';
Object.defineProperty(Element.prototype, 'bye', {
	get: function() { return 'pow!'; }
});

var div=document.createElement('div');

cout('div.hi='+div.hi);
cout('div.bye='+div.bye);
div.bye='cow!';
cout('div.bye='+div.bye);
