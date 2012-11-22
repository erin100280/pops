/* pops.widget : Used to load and process son widgets */

if(2) {//- vars.
	var X=exports, G=global
	,  modName='pops.widget'

	,	$fs=require('fs')
		,	$fs_readFile=$fs.readFile
		,	$fs_readFileSync=$fs.readFileSync
		,	$fs_stat=$fs.stat
	,	$path=require('path')
		,	$path_dirname=$path.dirname
		,	$path_join=$path.join

	,  pc=require('pops/pops.core')
		,	ArrClone=Array.Clone
		,	ArrCopyTo=Array.CopyTo
		,	Class=pc.Class
		,	cout=pc.cout
		,	ObjCopyTo=Object.CopyTo
		,	ObjClone=Object.Clone
		,	Property=pc.Property
	,	pcss=require('./pops.css')
		,	pcss_cssReset=pcss.cssReset
		,	pcss_Code=pcss.Code
		,	pcss_LoadFile=pcss.LoadFile
		,	pcss_LoadFileSync=pcss.LoadFileSync
	,  pfsl=require('./fs/pops.fs.local')
		,	pfsl_FindFile=pfsl_FindFile
		,	pfsl_FindFileSync=pfsl_FindFileSync
	,  phtml=require('pops/pops.html')
		,	phtml_Element=phtml.Element
		,	GuiItem=phtml.GuiItem
	,  phttp=require('pops/pops.http')

	,	autoId=0
	,	LoadFile, LoadFileSync
	,	widgetManager
	,	BuildWidgetGui
	;
};

LoadFile=X.LoadFile=function(flinam, ops, cb) {
	if(typeof ops=='function') { cb=ops; ops={}; };
	if(!cb) cb=Function.Empty;
	var rv={ $$isPopsWidget: 2 };

	pfsl_FindFile(flinam, function(err, fnam, dnam) {
		if(err || !fnam) cb(err, fnam);
		else {
			rv.infoFile=fnam; rv.infoDir=dnam;
			JSON.FromFile(fnam, function(err, val) {//- Get widget info
				if(err || !val || !val.client) cb(err);
				else {
					rv.name=val.name||'<not named>';
					rv.version=val.version||'0';
					pfsl_FindFile(val.client, { fromDir: dnam}, function(err, cFnam, cDnam) {
						if(err || !cFnam) cb(err||'Can\'t find client script : '+val.client);
						else {
							rv.clientFile=cFnam; rv.clientDir=cDnam;
							$fs_readFile(cFnam, function(err, str) {
								if(err) cb(err);
								rv.clientString=str;
							
								if(val.server)
									pfsl_FindFile(val.server, { fromDir: dnam}, function(err, sFnam, sDnam) {
										if(err || !sFnam) cb(err||'Can\'t find server script : '+val.server);
										else {
											rv.serverFile=sFnam; rv.serverDir=sDnam;
											rv.server=require(sFnam);
											cb(0, rv);
										};
									});
								else cb(0, rv);
							});
						};
					});
				};
			});
		};
	});
};

LoadFileSync=X.LoadFileSync=function(filnam, ops) {
	//out('pops.widget.LoadFileSync');
	var fil1, fil2, fromOps, i, jj, k, k2, kk, l, z, z2, zz
	,	o=ops||{}
	,	rv={ $$isPopsWidget: 2 }
	,	_fs=o.fileSystem||pfsl
	;

	if(fil1=_fs.FindFileSync(filnam, ops)) {
		z=_fs.ReadJsonFileSync(fil1.path);
		//out('fil1.path='+fil1.path+'  -  fil1.dir='+fil1.dir);
		fromOps=ObjCopyTo({}, [ops||{}, { fromDir: fil1.dir }]);
		rv.infoPath=zz=fil1.path; rv.infoDir=fil1.dir;
		rv.name=z.name||'<not named>';
		rv.version=z.version||'0';
		rv.elem=z.elem;
		rv.props=z.props;
		if(k=rv.class=z.class)
			rv.classStr=k.toString().ReplaceAll(',', ' ');

		if(!z.client) throw(new Error('Widget must have client script'));
		else {
			if(fil2=_fs.FindFileSync(z.client, fromOps)) {
				rv.clientPath=fil2.path; rv.clientDir=fil2.dir;
				rv.clientString=_fs.readFileSync(fil2.path).toString();
				//out('rv.clientString <\n'+rv.clientString+'\n>\n');
				if(k=z.css) {
					if(!(k instanceof Array)) k=[k];
					zz=rv.css=[]; kk=0;
					for(i=0, l=k.length; i<l; i++) {
						z2=jj=k[i];
						if(typeof z2=='string') z2={ filename: jj };
						if(z2 && z2.filename) {
							z2.$$isCssFromFile=2;
							if(kk=_fs.FindFileSync(z2.filename, fromOps)) {
								if(z2.reload) z2.filename=kk.path; 
								else z2=pcss_LoadFileSync(kk.path);
								//else z2=pcss_LoadFileSync(kk.path);
							}
							else throw(new Error('file not found "'+z2.filename+'"'));
						};
						if(z2) zz.Push(z2);
					};
					
				};
				if(k=z.server) {
					if(fil2=_fs.FindFileSync(k, fromOps)) {
						rv.serverPath=fil2.path; rv.serverDir=fil2.dir;
						rv.server=_fs.require(fil2.path);
					}
					else
						throw(new Error('Can\'t find server file : '+k));
				}
			}
			else
				throw(new Error('Can\'t find client file : '+z.client));
		};

	}
	else
		throw(new Error('Can\'t find file : '+filnam));

	return rv;
};

if(2) {//- widgetManager
	if(2) {//- private
		var
			wmReset=function(cb) {
				if(cb) cb(0, this);
			}
		,	wmResetSync=function() {
				var i, l, nam, nm, z, z2, zz
				,	o=this.OP||{}
				,	sp=this.$$searchPaths=o.searchPaths||[]
				,	wgt=this.$$widgets={}
				,	oWgt=o.widgets||[]
				,	als=this.$$alias={}
				,	oAls=o.alias||{}
				,	_fs=o.fileSystem
				;

				if(oWgt.$$isPopsWidgetManager) wgt=oWgt.$$widgets||{}
				else
					for(i=0, l=oWgt.length; i<l; i++) {
						z2=0;
						z=oWgt[i];
						
						if(z.$$isPopsWidget) z2=z;
						else z2=LoadFileSync(z, {
							searchPaths: sp
						,	fileSystem: _fs||pfsl
						});
						
						if(z2) {
							if(!(nam=z2.name)) throw(new Error('name missing in widget info : '+z));
							else if(wgt[nam]) throw(new Error('widget already loaded : '+z));
							else wgt[nam]=z2;
						};
					};

				if(oAls.$$isPopsWidgetManager) oAls=oAls.$$alias||{}
				for(nm in oAls) {
					z2=0;
					z=oAls[nm];
					//out('oAls['+nm+'].name = '+oAls[nm].name);
					if(wgt[z]) {}
					else if(z.$$isPopsWidget) {
						wgt[(nam=z.name)]=z;
						als[nm]=nam;
					}
					else {
						z2=LoadFileSync(z, {
							searchPaths: sp
						,	fileSystem: _fs||pfsl
						});
						if(!z2) throw(new Error('can\'t open file "'+z+'"'));
						else {
							if(!(nam=z2.name)) throw(new Error('name missing in widget info : '+z));
							else if(wgt[nam]) throw(new Error('widget already loaded : '+z));
							else wgt[nam]=z2;
							als[nm]=nam;
						};
					};
					
				};



			}
		;
	};
	widgetManager=X.widgetManager=Class('pops.widget:widgetManager', {
		OPTIONS: {
			async: 0
		,	auto: 2
		,	alias: {}
		,	fileSystem: pfsl
		,	searchPaths: []
		,	widgets: []
		}
	,	SHARED: {
		}
	,	INIT: function(ops, cb) {
			if(typeof ops=='function') { cb=ops; ops=0 };
			
			if(ops && ops.$$isPopsWidgetManager) {
				this.alias=ObjClone(ops.alias);
				this.searchPaths=ArrClone(ops.searchPaths);
				this.widgets=ObjClone(ops.widgets);
			}
			else if(ops && ops.auto) this.Reset(ops, cb);
			else if(cb) cb(0, this);
		}
	,	FUNCTION: function(v) {
			//out('FUNCTION  -  v='+v);
			var z;
			if(z=this.$$alias[v]) v=z;
			return this.$$widgets[v];
		}
	,	PUBLIC: {
			$$isPopsWidgetManager: 2
		,	$$alias: {}
		,	$$searchPaths: []
		,	$$widgets: []
	
		,	BuildWidgetGui: function(ops, spacer, space, ender, cb) {
				return BuildWidgetGui(
					ObjCopyTo({}, [ops, { widgetManager: this } ])
				,	spacer, space, ender, cb
				);
			}
		,	Reset: function(ops, cb) {
				if(typeof ops=='function') { cb=ops; ops=0; };
				var o=this.SetOptions(ops||this.$options||{}).OP;
				if(o.async)
					wmReset.apply(this, [cb]);
				else {
					wmResetSync.apply(this);
					if(cb) cb(0, this);
				};
			}
		,	Start: function(ops, cb) { this.Reset(ops, cb); }
		}
	});
};

if(2) {//- BuildWidgetGui
	BuildWidgetGui=X.BuildWidgetGui=function(ops, spacer, space, ender, cb) {
		var rv, css, el, iCode, id, opts, props, z, z2, zz
		,	o=(ops)? ObjClone(ops) : {}
		,	BuildGui=o.BuildGui
		,	guiItm=o.guiItem
		,	wgtMan=o.widgetManager
		,	wgtDat
		,	name=o.name
		,	wName
		;

		if(!guiItm) {//- error handler
			z=new Error('ops (for function "pops.widgets.BuildWidgetGui") must contain a "pops.html.GuiItem" instance named "guiItem"');
			if(cb) cb(z);
			else throw(z);
			return;
		};
		if(!BuildGui) {//- error handler
			z=new Error('ops (for function "pops.widgets.BuildWidgetGui") must contain "pops.spa.BuildGui" named "BuildGui"');
			if(cb) cb(z);
			else throw(z);
			return;
		};
		if(!wgtMan) {//- error handler
			z=new Error('ops (for function "pops.widgets.BuildWidgetGui") must contain a "pops.widgets.widgetManager" instance named "widgetManager"');
			if(cb) cb(z);
			else throw(z);
			return;
		};
		if(!(wgtDat=wgtMan(name))) {//- err handler & var setter
			z=new Error('widget "'+name+'" not loaded. (for function "pops.widgets.BuildWidgetGui")');
			if(cb) cb(z);
			else throw(z);
			return;
		};		

		wName=wgtDat.name;
		props=(z=guiItm.props)? ObjClone(z) : {};
		opts=props.options=(z=props.options)? ObjClone(z) : {};
		//out('props='+JSON.stringify(props));
		id=props.id||'AUTO_ID_'+autoId++;
		if((z2=wgtDat.css) && z2.length) css=ArrClone(z2);
		if(z=wgtDat.classStr) props.class=z;
		
		if(z=wgtDat.props) props=ObjCopyTo({}, [z, props]);
		el=o.outline=GuiItem(wgtDat.elem||'div', id, props);
		if((z=wgtDat.server) && z.SetupElem) z.SetupElem(el, props, opts);

		if(!(z=el.props)) z=el.props={};
		z.id=id;
		if(opts=z.options) delete z.options;
		
		rv=BuildGui(o, spacer, space, ender);
		rv.widgets[wName]=2;
		zz=rv.iCode||'';
		if(0) rv.iCode=(
			'$wgtMan.GetSync("'+wName+'").Create('
		+		'$("'+id+'")'
		+	', '+JSON.stringify(opts||{ _0929_: 'RJM!' })
		+	');\n'
		+	zz
		);
		rv.iCode=(
			'z=new ($wgtMan.GetSync("'+wName+'").widget)('
		+		'$("'+id+'")'
		+	', '+JSON.stringify(opts||{ _0929_: 'RJM!' })
		+	');\n'
		+	zz
		);
		if(wgtDat.css) {
			z=rv.css={};
			z[wName]=2;
		};

		if(cb) cb(0, rv);
		return rv;
	}
};
