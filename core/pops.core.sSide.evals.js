var X=exports
,	pc=require('../pops.core')
;

X.evals={
	ModDir: function(varNam) {
		return varNam+'=require("path").dirname(arguments[2].filename);';
	}
,	ModFile: function(varNam) {
		return varNam+'=require("path").filename(arguments[2].filename);';
	}
,	ModPath: function(varNam) { return varNam+'=arguments[2].filename;'; }
};

