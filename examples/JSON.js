require('../pops.core').Global.Pops();

//========================================

var ob1={
	'hi': 'Hello World'
,	'bye': 'Goodbye World'
}

JSON.ToFile('d:\\dev\\22.JSON', ob1, function(err){
	if(err) cout('ERR');
	else JSON.FromFile('d:\\dev\\22.JSON', function(err, val){
		if(err) cout('ERR-FROM');
		else cout('val1.hi='+val.hi+'\n'+'val1.bye='+val.bye);
	});
});

//========================================

var ob2={
	'hi': 'Hello Girls'
,	'bye': 'Goodbye Girls'
}

JSON.ToFileSync('d:\\dev\\44.JSON', ob1);
var val2=JSON.FromFileSync('d:\\dev\\44.JSON');
cout('val2.hi='+val2.hi+'\n'+'val2.bye='+val2.bye);

