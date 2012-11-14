//var pops=require('pops/pops.core');//.Global.Pops();
var a=arguments, z, zz 
,	path=require('path')
,	pops=require('pops/pops.core')
	,	cout=pops.cout
,	css=require('pops/pops.css')
	,	cssFromFile=css.FromFile

,	filename=arguments[2].filename
,	filedir=path.dirname(filename)
;

css.LoadFile(path.join(filedir, 'style/gui.css'), function(err, val) {
	if(err) cout('-=ERR!=-\n'+err+'\n\n');
	else cout('-=VAL!=-\n'+val+'\n\n');
});
