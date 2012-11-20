var z,X=exports
,  $$path=require('path')
   ,  $$path_dirname=$$path.dirname
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

X.fileSystem=Class('pops.fs.localFs', {
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
//	,	newPath=$$path_join(cwd, filnam)
	;
	
	fs.stat(filnam, function(err, stats) {
		//out('stats='+JSON.stringify(stats));
		if(stats && stats.isFile())
			cb(0, filnam, $$path_dirname(filnam));
		else {
			var z=$$path_join(cwd, filnam)
			cb(0, z, $$path_dirname(z));
		};
	})
	
};

X.FindFileSync=function(filnam, ops) {
	var z, fs=$$fs
	,	rv
	,	cb=cb||EmptyFn
	,	op=ops||{}
	,	cwd=ops.fromDir||$$process_cwd()
//	,	newPath=$$path_join(cwd, filnam)
	,	stats=fs.statSync(filnam);
	;
	
	if(stats && stats.isFile())
		rv={ path: filnam, dir: $$path_dirname(filnam) };
	else
		rv={ path: (z=z=$$path_join(cwd, filnam)), dir: $$path_dirname(z) };
	return rv;
};

Extend(X, {
	$$isPopsFileSystem: 2
,	$$fsType: 'local'

,	require: require

,	DirName: $$path.dirname
,	FileName: $$path.filename
,	Join: $$path.join

,	readFile: $$fs.readFile
,	readFileSync: $$fs.readFileSync
,	writeFile: $$fs.writeFile
,	writeFileSync: $$fs.writeFileSync

,	ReadJsonFile: JSON.FromFile
,	ReadJsonFileSync: JSON.FromFileSync
,	WriteJsonFile: JSON.ToFile
,	WriteJsonFileSync: JSON.ToFileSync
});
