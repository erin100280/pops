var z,X=exports
,  $$path=require('path')
   ,  $$path_join=$$path.join
   ,  $$path_normalize=$$path.join
,  $$process=process
   ,  $$process_cwd=$$process.cwd
,  $$fs=require('fs')

,  $pc=require('../pops.core')
	,	cout=$pc.cout
	,	EmptyFn=Function.Empty
,  $fsBase=require('./pops.fs.base')
;

X.fs=Class('pops.fs.localFs', {
	OPTIONS: {}
,	INTERFACE: null
,	INIT: function(ops, cb) {
		this.SetOptions(ops);
	}
,	PUBLIC: {
		FindFile: function(filNam, ops, cb) {

		}
	}


});

X.FindFile=function(filnam, ops, cb) {
	if(typeof ops=='function') { cb=ops; ops={}; };
	var z, fs=$$fs
	,	cb=cb||EmptyFn
	,	op=ops||{}
	,	cwd=ops.fromDir||$$process_cwd()
	,	norm=$$path_normalize(filnam)
	,	newPath=$$path_join(cwd, filnam)
	;
	
	fs.stat(filnam, function(err, stats) {
		//out('stats='+JSON.stringify(stats));
		if(stats && stats.isFile()) cb(0, filnam);
		else cb(0, $$path_join(cwd, filnam));
	})
	
};
