if(2) {//- vars
	var X=exports,xx={}
	,  nm='pops.spa'
	
	,	$$fs=require('fs')
		,	$$fs_readFile=$$fs.readFile
		,	$$fs_readFileSync=$$fs.readFileSync
		,	$$fs_stat=$$fs.stat
	,	$$path=require('path')
		,	$$path_dirname=$$path.dirname
		,	$$path_join=$$path.join
	
	,  pc=require('./pops.core')
		,	Class=pc.Class
		,	cout=pc.cout
		,	Property=pc.Property
		,	ArrCopyTo=Array.CopyTo
		,	ObjClone=Object.Clone
		,	ObjCopyTo=Object.CopyTo
	,	$css=require('./pops.css')
		,	$css_cssReset=$css.cssReset
		,	$css_Code=$css.Code
		,	$css_LoadFile=$css.LoadFile
		,	$css_LoadFileSync=$css.LoadFileSync
	,  $html=require('./pops.html')
		,	GuiItem=$html.GuiItem
		,	$html_Element=$html.Element
		,	$ElementProps=$html.ElementProps
	,  $http=require('./pops.http')
		,	httpServer=$http.server
	,  pr=require('./pops.router')
		,  router=pr.router
	,  pwc=require('./pops.webComm')
		,  commChannel=pwc.commChannel
		,  commChannelManager=pwc.commChannelManager
	,  pw=require('./pops.widget')
		,  BuildWidgetGui=pw.BuildWidgetGui
		,  widgetManager=pw.widgetManager
	,  pfsl=require('./fs/pops.fs.local')
	
	,	spapp
	,	pageBuilder
		,	pbResetCss, pbResetCssSync
		,	pbResetSon, pbResetSonSync
	,	BuildGui
	;
};

if(2) {//- pageBuilder
	if(2) {//- private
		var z
		,	pb_initialScript=function(){
				var $$_G=window.$$_G=window;
				(function() {
					son.Global.Son();
					var ap, z
					,	g=$$_G
					,	ap=g.$APP={}
					,	wman=ap.widgetMan=g.widgetMan=new son.widgets.widgetManager()
					,	IPg=g.$$_InitPage=function() {}
					;
					IPg();
				
					
					
				
				
				}());
			}.InnerStr()

		,	pbResetSon=function(ops, cb) {
				cout('$Reset_son');
				var t=this, son=this.son={};
				$$fs_readFile(pc.modPath, function(err, val) {
					son.core=val||'';
					if(err) { if(cb) cb(err, t); }
					else {					
						$$fs_readFile($$path_join(pc.modDir, './son/son.elements.js'), function(err, val) {
							son.elements=val||'';
							if(cb) cb(err, t);
						});
					};
				});
			}	
		,	pbResetSonSync=function() {
				var o=this.OP, z, z2, zz
				,	dir=pc.modDir 
				,	fs=o.fileSystem||pfsl
				,	sm=o.sonMods=o.sonMods||{}
				,	son=this.son={}
				,	doCore=sm.core
				,	Read=fs.readFileSync
				,	Join=fs.Join
				;

				if(sm.elements) {
					son.elements=Read(Join(dir, './son/son.elements.js'));
					doCore=2;
				};
				if(sm.widgets) {
					son.widgets=Read(Join(dir, './son/son.widgets.js'));
					doCore=2;
				};
				
				if(sm.core=doCore) {
					son.core=Read(pc.modPath);
					//out('doCore - '+son.core);
				};
			}
		,	pbResetCss=function(ops, cb) {
				if(typeof ops=='function') { cb=ops; ops=0; };
				var t=this, k, z, z2, z4, z6
				,	op=this.OP||{}
				;
	
				if(z=op.gui) {//- gui
					if(z2=z.css) {//- css
						if(z2 instanceof Array) { z4=z2; z2={ initial: z4 }; };
						this.$css=z2;
						pbResetCssNow.apply(this, [z2, '', 0, function(err) {
							if(cb) cb(0, t);
						}]);
						
					}
					else {
						if(typeof this.$css!='undefined') delete this.$css;
						if(cb) cb(0, this);
					};
				};
	
			}
		,	pbResetCssSync=function() {
				var o=this.OP, css, z, z2, zz
				,	fs=o.fileSystem||pfsl
				,	gui=o.gui
				;
	
				if(gui && (css=gui.css)) {//- gui / css
					if(css instanceof Array) { z2=css; css={ initial: z2 }; };
					this.$css=css;
					pbResetCssNowSync.apply(this, [css, '', 0]);
				}
				else if(typeof this.$css!='undefined') delete this.$css;
			}
		,	pbResetCssNow=function(cssObj, sectionName, i, cb) {
				//out('$Reset_css_now  -  sectionName='+sectionName +'  -  i='+i);
				var t=this, z
				,	fs=this.OP.fileSystem||pfsl
				,	sNam=sectionName||'initial'
				;
				if(z=cssObj[sNam]) {
					if(i<z.length) {
						if(k=z[i]) {
							if(k.$$isCssFromFile && !k.reload){
								$css_LoadFile(k.filename, { fileSystem: fs }, function(err, val) {
									if(err) { if(cb) cb(new Error(err), t); }
									else {
										z[i]=val;
										pbResetCssNow.apply(t, [cssObj, sNam, i+1, cb]);
									};
								});
							}
							else {
								z[i]=k;
								pbResetCssNow.apply(this, [cssObj, sNam, i+1, cb]);
							};
						}
						else pbResetCssNow.apply(this, [cssObj, sNam, i+1, cb]);
					}
					else {
						if(sNam=='initial') sNam=0; 
						else sNam='initial';
						if(sNam) pbResetCssNow.apply(this, [cssObj, sNam, i+1, cb]);
						else if(cb) cb(0, this);
					};
				}
				else {
					if(sNam=='initial') sNam=0; 
					else sNam='initial';
					if(sNam) pbResetCssNow.apply(this, [cssObj, sNam, i+1, cb]);
					else if(cb) cb(0, this);
				};
			
			}
		,	pbResetCssNowSync=function(cssObj, sectionName, i) {
				var o=this.OP, z, z2, zz
				,	dir=pc.modDir 
				,	fs=o.fileSystem||pfsl
				,	sm=o.sonMods=o.sonMods||{}
				,	son=this.son={}
				,	doCore=sm.core
				,	Join=fs.Join
				,	Read=fs.readFileSync
				,	sNam=sectionName||'initial'
				,	sect=cssObj[sNam]
				;

				if(sect) {
					if(i<sect.length) {
						if(k=sect[i]) {
							if(k.$$isCssFromFile && !k.reload){
								sect[i]=$css_LoadFileSync(k.filename, {
									options: { fileSystem: fs }
								});
								pbResetCssNowSync.apply(this, [cssObj, sNam, i+1]);
							}
							else {
								sect[i]=k;
								pbResetCssNowSync.apply(this, [cssObj, sNam, i+1]);
							};
						}
						else pbResetCssNowSync.apply(this, [cssObj, sNam, i+1]);
					}
					else {
						if(sNam=='initial') sNam=0; 
						else sNam='initial';
						if(sNam) pbResetCssNowSync.apply(this, [cssObj, sNam, 0]);
					};
				}
				else {
					if(sNam=='initial') sNam=0; 
					else sNam='initial';
					if(sNam) pbResetCssNowSync.apply(this, [cssObj, sNam, 0]);
				};
			
			}
		,	pbResetWidgetsSync=function() {
				var o=this.OP, css, z, z2, zz
				,	fs=o.fileSystem||pfsl
				,	oWgts=zz=o.widgets
				,	wgts
				;

				if(oWgts) {
					if(oWgts.$$isPopsWidgetManager) wgts=oWgts;
					else {
						oWgts=Object.CopyTo({}, [
							{ fileSystem: fs }
						,	zz
						,	{ /*searchPaths*/ }
						,	{ async: o.async, auto: 2 }
						]);
						if(z=oWgts.items) { oWgts.widgets=z; delete oWgts.items; };
						wgts=new widgetManager(oWgts);
					};
				};
				
				this.widgets=wgts
			}
		;
	};
	pageBuilder=X.pageBuilder=Class('pops.spa:pageBuilder', {
		OPTIONS: {
			async: 0
		,	auto: 2
		,	beforeHead: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
		,	contentType: 'text/html'
		,	fileSystem: pfsl
		,	widgets: []
		,	gui: {}
		,	noCssReset: 0
		,	resources: {
				css: {}
			,	images: {}
			,	js: {}
			}
		,	sonMods: {
				core: 2
			,	elements: 2
			,	widgets: 2
			}
		}
	,	SHARED: {
			$isPopsPageBuilder: 2
	
		,	$$Reset_son: function(ops, cb) {
				cout('$Reset_son');
				var t=this, son=this.son={};
				$$fs_readFile(pc.modPath, function(err, val) {
					son.core=val||'';
					if(err) { if(cb) cb(err, t); }
					else {					
						$$fs_readFile($$path_join(pc.modDir, './son/son.elements.js'), function(err, val) {
							son.elements=val||'';
							if(cb) cb(err, t);
						});
					};
				});
			}	
		,	$$Reset_sonSync: function(ops, cb) {
		
			}
		,	$Reset_css: function(ops, cb) {
				if(typeof ops=='function') { cb=ops; ops=0; };
				var t=this, k, z, z2, z4, z6
				,	op=this.OP||{}
				;
	
				if(z=op.gui) {//- gui
					if(z2=z.css) {//- css
						if(z2 instanceof Array) { z4=z2; z2={ initial: z4 }; };
						this.$css=z2;
						this.$Reset_css_now(z2, '', 0, function(err) {
							if(cb) cb(0, t);
						});
						
					}
					else {
						if(typeof this.$css!='undefined') delete this.$css;
						if(cb) cb(0, this);
					};
				};
	
			}
		,	$Reset_css_now: function(cssObj, sectionName, i, cb) {
				//out('$Reset_css_now  -  sectionName='+sectionName +'  -  i='+i);
				var t=this, z
				,	sNam=sectionName||'initial'
				;
				if(z=cssObj[sNam]) {
					if(i<z.length) {
						if(k=z[i]) {
							if(k.$$isCssFromFile && !k.reload){
								$css_LoadFile(k.filename, {}, function(err, val) {
									if(err) { if(cb) cb(new Error(err), t); }
									else {
										z[i]=val;
										t.$Reset_css_now(cssObj, sNam, i+1, cb);
									};
								});
							}
							else this.$Reset_css_now(cssObj, sNam, i+1, cb);
						}
						else this.$Reset_css_now(cssObj, sNam, i+1, cb);
					}
					else {
						if(sNam=='initial') sNam=0; 
						else sNam='initial';
						if(sNam) this.$Reset_css_now(cssObj, sNam, 0, cb);
						else if(cb) cb(0, this);
					};
				}
				else {
					if(sNam=='initial') sNam=0; 
					else sNam='initial';
					if(sNam) this.$Reset_css_now(cssObj, sNam, 0, cb);
					else if(cb) cb(0, this);
				};
			
			}
		}
	,	INIT: function(ops, OnRdy) {
			this.$Reset(ops, OnRdy);
			//var op=this.SetOptions(ops).OP;
			//if(OnRdy) OnRdy(this);
		}
	,	PUBLIC: {
			$$isPageBuilder: 2, $$isPopsPageBuilder: 2
		,	$isPopsSpaPageBuilder: 2
		
		,	$CreateGuiHtml: function(op, cb) {
				if(arguments.length==1 && typeof op=='function') { cb=op; op=0; };
				var rv='', z 
				,	o=op||this.OP
				,	gui=o.gui||{}
				,	ol=gui.outline
				,	gModes=gui.modes||[]
				,	gHtml=this.guiHtml=this.guiHtml||{}
				,	base=GuiItem('div', 'PAGE', 0, {
						id: 'PAGE'
					,	style: {
							 'display':	'block'
						,	'position': 'absolute'
						,	     'top':	'0px'
						,		 'left':	'0px'
						,	  'height':	'100%'
						,		'width':	'100%'
						}
					}, ol)
				;
				
				if(ol && ((z=ol.props) && z.id=='PAGE')) base=ol;
				rv=BuildGui({
					outline: base
				,	appletManager: this.applets
				,	widgetManager: this.widgets
				})
	
				if(cb) cb(0, rv);
				return rv;
			}
	
		,	$CreateGuiHtml_BAK: function(op, cb) {
				if(arguments.length==1 && typeof op=='function') { cb=op; op=0; };
				var rv='', z 
				,	o=op||this.OP
				,	gui=o.gui||{}
				,	ol=gui.outline
				,	gModes=gui.modes||[]
				,	gHtml=this.guiHtml=this.guiHtml||{}
				,	props={
						id: 'PAGE'
					,	style: {
							 'display':	'block'
						,	'position': 'absolute'
						,	     'top':	'0px'
						,		 'left':	'0px'
						,	  'height':	'100%'
						,		'width':	'100%'
						}
					}
				,	children
				;
				
				if(ol) {
					if((z=ol.props) && z.id=='PAGE') {
						props=z;
						ol=ol.children;
					};
					children=(ol instanceof Array)? ol : [ol];
				};
	
				//out('ol='+JSON.stringify(ol));
	
				rv=$html_Element('div', props, children, 0, '	')+'\n';
			
				//out('rv:\n'+rv+'\n\n');
				if(cb) cb(0, rv);
				return rv;
			}
	
		,	$DoIt: function(req, res, op, cb) {
				var t=this
				,	z={ $bDat: {} }
				,	o=(op)? ObjCopyTo({}, [op, z]) : z 
				,	htmlBeginCb, htmlEndCb
				,	beforeHeadCb, headBeginCb, headInitialCssCb
					,	headGuiCssCb, headEndCb
				,	initScriptCb
				,	bodyBeginCb, bodyContentCb, bodyEndCb
				;
	
				htmlBeginCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoBeforeHead(req, res, o, beforeHeadCb);
				};
				beforeHeadCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoHeadBegin(req, res, o, headBeginCb);
				};
				headBeginCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoHead_GuiCss(req, res, o, headInitialCssCb);
				};
				headInitialCssCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoHeadEnd(req, res, o, headGuiCssCb);
				};
				headGuiCssCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoHead_InitialCss(req, res, o, headEndCb);
				};
				headEndCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoBodyBegin(req, res, o, bodyBeginCb);
				};
				bodyBeginCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoBodyContent(req, res, o, bodyContentCb);
				};
				bodyContentCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoBodyEnd(req, res, o, bodyEndCb);
				};
				bodyEndCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoInitScript(req, res, o, initScriptCb);
				};
				initScriptCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoHtmlEnd(req, res, o, htmlEndCb);
				};
				htmlEndCb=function(err, t) {
					res.end();
					if(cb) cb((err)? new Error(err) : 0, t);
				};
	
				this.$CreateGuiHtml(o, function(err, val) {
					var z, z2, zz;
					if(o) {
						z=o.$bDat=(o.$bDat||{});
						zz=z.applets=(z.applets||{});
						ObjCopyTo(zz, val.applets);
						zz=z.widgets=(z.widgets||{});
						ObjCopyTo(zz, val.widgets);
						zz=z.iCode||'';
						z.iCode=zz+(val.iCode||'');
						zz=z.html||'';
						z.html=zz+(val.html||'');
						z.css=val.css;
					};
					
					t.$DoHtmlBegin(req, res, o, htmlBeginCb);
				});
	
				
			}
	
		,	$DoHtmlBegin: function(req, res, op, cb) {
	         res.writeHead(200, {"Content-Type": op.contentType});
	         res.write("<html>\n");
				if(cb) cb(0, this);
				else this.$DoBeforeHead(req, res, op);
			}
		,	$DoBeforeHead: function(req, res, op, cb) {
	         var t=this;
	         if(z=op.beforeHead) {
	         	if(typeof z=='function')
	         		z(
	         			{ Done: function(v) {
			          		if(cb) cb(0, t);
			          		else t.$DoHeadBegin(req, res, op);
	      				} }
	      			,	req
	      			,	res
	      			);
	          	else {
	          		res.write(z+'\n');
	          		if(cb) cb(0, this);
	          		else this.$DoHeadBegin(req, res, op);
	       		};
				}
				else if(cb) cb(o, this);
				else this.$DoHeadBegin(req, res, op);
			}
		,	$DoBodyBegin: function(req, res, OP, cb) {
	    		res.write('<body>\n');
	    		if(cb) cb(0, this);
	    		else this.$DoBodyContent(req, res, OP);
			}
		,	$DoBodyContent: function(req, res, OP, cb) {
				var t=this, k, z;
				if(OP && (k=OP.$bDat) && (z=k.html)) res.write(z+'\n');
				if(cb) cb(0, t);
				else t.$DoBodyEnd(req, res, OP);
			}
		,	$DoBodyEnd: function(req, res, OP, cb) {
	    		res.write('</body>\n');
	    		if(cb) cb(0, this);
	    		else this.$DoInitScript(req, res, OP);
			}
		,	$DoHeadBegin: function(req, res, op, cb) {
				var t=this;
	         res.write('<head>\n');
	         if(!op.noCssReset) res.write(
	         	'<style style="display: none; " type="text/css">\n'
	      	+		$css_cssReset
	      	+	'</style>\n'
	      	);
	
				if(cb) cb(0, this);
				else this.$DoHead_InitialCss(req, res, op);
			}
		,	$DoHead_InitialCss: function(req, res, op, cb) {
				var t=this, z=this.$css;
				if(z=z.initial) {
					this.$DoHead_Css(req, res, op, z, function(err, obj) {
						if(cb) cb(0, t);
						else $DoHead_GuiCss(req, res, op, cb);
					});
				}
				else if(cb) cb(0, this);
				else $DoHead_GuiCss(req, res, op, cb);
			}
		,	$DoHead_GuiCss: function(req, res, op, cb) {
				var t=this, arr=[], z=this.$css, i, l, nm, k, kk, str='', w, z, zz
				,	wm=this.widgets
				;

				if((z=op) && (z=z.$bDat) && (z=z.css)) {
					for(nm in z) {
						if(z[nm]) {
							if(w=wm(nm)) {
								if(zz=w.css)
									ArrCopyTo(arr, zz);
							}
							else throw(new Error('widget "'+nm+'" not loaded'));//-error handler
						};
					};
				};
				if(arr.length)
					this.$DoHead_Css(req, res, op, arr, function(err, obj) {
						if(cb) cb(err, obj);
						else this.$DoHeadEnd(req, res, op, cb);
					});
				else if(cb) cb(err, this);
				else this.$DoHeadEnd(req, res, op, cb);
			}
		,	$DoHead_GuiCssBAK: function(req, res, op, cb) {
				var i, l, nm, k, kk, str='', w, z, zz
				,	wm=this.widgets
				;
				
				if((z=op) && (z=z.$bDat) && (z=z.css)) {
					for(nm in z) {
						if(z[nm]) {
							if(w=wm(nm)) {
								if(zz=w.css) {
									for(i=0, l=zz.length; i<l; i++) {
										if((k=zz[i]) && k.$$isCssFromFile)
											k=$css_LoadFileSync(k.filename);
										if(k) str+=k+'\n';										
									};
									if(str) res.write(
										'<style style="display: none; " type="text/css">\n'
									+	str
									+	'</style>'
									);

								};
							}
							else throw(new Error('widget "'+nm+'" not loaded'));//-error handler
						};
					};
				};

				if(cb) cb(0, this);
				else this.$DoHeadEnd(req, res, op);
			}
		,	$DoHead_Css: function(req, res, op, css, cb) {
				var i, l, z, zz;

				if(css) {
					var t=this, i=0, l=css.length
					,	Fn=function() {
							if(i<l) {
								var z=css[i]
								,	Ff=function(err, val) {
					      			if(err) { if(cb) cb(err, t); }
					      			else {
					      				res.write(val);
					      				res.write('\n</style>\n');
					      				Fn();
					      			};
					      		}
								;
								i++;
								if(z) {
					         	res.write('<style style="display: none; " type="text/css">\n');
						      	if(typeof z=='function') z({}, Ff);
						      	else if(typeof z=='object') $css_LoadFile(z.filename, z, Ff);
						      	else Ff(0, z);
								}
								else Fn();
							}
							else if(cb) cb(0, t);
						}
					;
					Fn();
				}
				else if(cb) cb(0, this);
			}
		,	$DoHeadEnd: function(req, res, op, cb) {
				var t=this;
	         res.write('</head>\n');
				if(cb) cb(0, this);
				else this.$DoBodyBegin(req, res, op);
			}
		,	$DoInitScript: function(req, res, op, cb) {
				var t=this, k, k2, kk, nm, z, zz
				,	son=this.son||{}
				,	o=op||{}
				,	bDat=o.$bDat
				,	wgts=this.widgets
				,	sFirst='<script name="'
				,	sAfterName='" type="text/javascript" charset="utf-8">\n'
				,	sLast='</script>\n'
				;
	         
	         res.write(sFirst+'son.core'+sAfterName+son.core+sLast);
	         res.write(sFirst+'son.elements'+sAfterName+son.elements+sLast);
	         res.write(sFirst+'son.widgets'+sAfterName+son.widgets+sLast);
	
	         res.write(sFirst+'InitScript'+sAfterName+pb_initialScript+sLast);

				if(bDat) {
					if(z=bDat.widgets) {
						zz={};
						for(nm in z) if(z[nm]) zz[nm]=wgts(nm).clientString;
	         		res.write(
	         			sFirst+'setWidgets'+sAfterName
	         		+	'(function() {\n'
	         		+		'var g=this, nm, z\n'
	         		+		', wm=$APP.widgetMan, ob='+JSON.stringify(zz)+'\n'
	         		+		';\n'
	         		+		'for(nm in ob) {\n'
	         		+			'z=wm.$$widgets[nm]=EVAL(ob[nm]);\n'
	         		+			'cout("$$widgets["+nm+"]="+z);'
	         		+		'};\n'
	         		+	'}());\n'
         			+	sLast
         			);
					};
					
					if((z=bDat.iCode)) 
	         		res.write(
	         			sFirst+'app.iCode'+sAfterName
	         		+	'(function() {\n'
	         		+		'var $wgt, $wgtMan=$APP.widgetMan, z;\n'
	         		+		z
	         		+	'}());\n'	
         			+	sLast
         			);

					//out('zz='+zz+'  -  zz.length='+zz.length);
				};
				
	         if(z=this.$$tempJS)
		         res.write(sFirst+'tempJS'+sAfterName+z+sLast);

				if(cb) cb(0, this);
				else this.$DoHtmlEnd(req, res, op);
			}
		,	$DoHtmlEnd: function(req, res, op, cb) {
	         if(!cb) cout('!cb');
	         res.write("</html>\n");
				if(cb) cb(0, this);
				else res.end();
			}
	
		,	$Reset: function(ops, cb) {
				if(typeof ops=='function') { cb=ops; ops=0; };
				var op=this.SetOptions(ops||this.OP||{}).OP; 

				this.$$tempJS=$$fs_readFileSync($$path_join(pc.modDir, './son/temp.js'));				
				
				if(op.async) {
					var t=this, z, z2, z4, z6
					,	css=op.css
					,	GuiOutlineCb, GuiCssCb, SonCb
					;
	
					GuiOutlineCb=function(err, t) {
						if(err) { if(cb) cb(err, t); }
						else pbResetCss.apply(t, [GuiCssCb]);
					};
					GuiCssCb=function(err, t) {
						if(err) { if(cb) cb(err, t); }
						else pbResetSon.apply(t, [SonCb]);
					};
					SonCb=function(err, sndr) { if(cb) cb(err, t); };
		
					GuiOutlineCb(0, this);
				}
				else {
					pbResetCssSync.apply(this);
					pbResetSonSync.apply(this);
					pbResetWidgetsSync.apply(this);
					if(cb) cb(0, this);
				};
	
			}
	
		,	ProcessRequest: function(req, res, Next) { 
				//out('spa:ProcessRequest');
				this.$DoIt(req, res, this.OP);
				//this.$DoHtmlBegin(req, res, this.OP);
			}
		,	Refresh: function() {}
		}
	});
};

if(2) {//- app
	spapp=X.app=Class('pops.spa.app', {
		OPTIONS: {
			auto: 2
		,	baseAddress: 0
		,	databases: 0
		,	gui: 0
		,	router: 0
		,	widgets: 0
		}
	,	SHARED: {}
	,	INIT: function(ops, cb) { this.Reset(ops, cb) }	
	,	PUBLIC: {
			$$isPopsSpaApp: 2
		,	$db: 0
		
		,	Run: function(port, cb) {
				if(typeof port=='function') { cb=port; port=null; };
				var itms, k, rt, z
				,	t=this
				,	o=this.OP
				,	ort=o.router
				,	prt=this.port=port||o.port||80
				
				,	page, router, server
				
				,	CreateRouter, CreateServer, CreatePage
				;
			
				CreatePage=function() {
					if(z=o.gui) {
						page=this.pageBuilder=new pageBuilder({
							gui: z
						,	widgets: o.widgets
						}, function(err, obj){
							page=obj;
							CreateRouter();
						});
					}
					else {
						page=function(req, res, next) { res.end('NOPE'); };
						CreateRouter();
					};
				};

				CreateRouter=function() {
					if(ort) {
						if(!(itms=ort.items)) itms=ort.items=[];
						if(rt=o.baseAddress) {}
						else {
							rt='^/';
							for(var i=0, l=itms.length; i<l; i++) {
								z=itms[i];
								if(z.handler=='APP') {
									z.handler=page;
									rt=0; i=80000;
								};
							};
						};

						if(rt)
							itms.PushL({ mode: 'get', path: rt, handler: page });
					}
					else
						ort={ items: [
							{
								mode: 'get'
							,	path: o.baseAddress||'/'
							,	handler: page
							}
						] };
					
					new pr.router(ort, function(err, rtr) {
						router=t.router=rtr;
						CreateServer();
					});
					
				};
			
				CreateServer=function() {
					server=new httpServer({
						auto: 2
					,	port: prt
					,	router: router
					}, function() {
						
					});
				};
			
				CreatePage();
			
			}
		,	Reset: function(ops, cb) {
				var z
				,	t=this
				,	Reset=this.Reset
				,	o=this.SetOptions(ops).OP
				,	rt=this.$router=o.router
				;
				global.APP=this;
				Reset.Gui(this, o);

				if(o.auto && o.port) this.Run(o.port, cb);
				else if(cb) cb(0, this);
			}.Extend({
				Db: function(v, ops) {
					var z, nm
					,	rv=this.$db={}
					,	odb=ops.databases
					;
					
					if(odb) for(nm in odb) {
						if(nm=='SYSTEM') this.$systemDb=odb(nm);
						else rv[nm]=odb[nm];
					};
					
					return rv;
				}
			,	Css: function(v, ops) {
					var z, nm
					,	rv=this.$db={}
					,	odb=ops.databases
					;
					
					if(odb) for(nm in odb) {
						if(nm=='SYSTEM') this.$systemDb=odb(nm);
						else rv[nm]=odb[nm];
					};
					
					return rv;
				}
			,	Widgets: function(v, ops) {
					var z, nm
					,	rv=this.$db={}
					,	odb=ops.databases
					;
					
					if(odb) for(nm in odb) {
						if(nm=='SYSTEM') this.$systemDb=odb(nm);
						else rv[nm]=odb[nm];
					};
					
					return rv;
				}
			,	Gui: function(v, ops) {
					var z
					,	rv=this.$gui={}
					,	rdb=rv.databases={}
					,	og=ops.gui||{}
					;
					rv.outline=ObjClone(og.outline||ops.outline||{});
					if(z=og.databases) {};
					
					return rv;
				}
			})
		}
	});
}

if(2) {//- BuildGui
	BuildGui=X.BuildGui=function(ops, spacer, space, ender, cb) {
		if(typeof spacer=='function') { cb=spacer; spacer=null; }
		//out('BuildGui');
		var rv, css, i, iCode='', itm, l, ln, n, pr, str1, str2, typ, z, z2, zz
		,	spcr=(typeof spacer=='string')? spacer : '	'
		,	spc=(typeof space=='string')? space : ''
		,	end=(typeof ender=='string')? ender : '\n'

		,	o=ops||{}
		,	outlin=o.outline
		,	htm='', wgts={}, aplts={}
		,	wgtMan=o.widgetManager
		,	apltMan=o.appletManager
		;

		if(outlin) {
			if(!(outlin instanceof Array)) outlin=[outlin];
			for(i=0, l=outlin.length; i<l; i++) {
				if(typeof (itm=outlin[i])=='function') itm=itm();
				if(!itm || !itm.$isGuiItem) throw(new Error('gui can only contain GuiItem\'s or functions that return a GuiItem'));
				else {
					typ=itm.type;
					z=typ.Split('|');
					//out('typ='+typ+'  -  z='+z);
					if((n=z.length)>1) {
						//out('n=z.length)>1');
						if((z2=z[0])=='widget' || z2=='w') {
							zz=BuildWidgetGui({
								name: z[1]
							,	guiItem: itm
							,	widgetManager: wgtMan
							,	appletManager: apltMan
							,	BuildGui: BuildGui
							});
							htm+=zz.html;
							iCode+=zz.iCode;
							ObjCopyTo(aplts, zz.applets);
							ObjCopyTo(wgts, zz.widgets);
							if(z=zz.css) {
								if(!css) css={};
								ObjCopyTo(css, zz.css);
							};
							//out('zz.html='+zz.html+'  -  zz.iCode='+zz.iCode);
						};
					}
					else {
						pr=''; str1=str2='';
						if(z=itm.props) {
							z=ObjClone(z);
							str1=z.string; str2=z.endString;
							if(typeof z.string!='undefined') delete z.string; 
							if(typeof z.endString!='undefined') delete z.endString; 
							if(typeof z.options!='undefined') delete z.options; 
							//if(z.options) delete z.options;
							pr=' '+$ElementProps(z);
						};
						htm+=spc+'<'+typ+pr+'>'+end;
						if(str1) htm+=spc+spcr+str1+end;

						if(z=itm.children) {
							zz=BuildGui({
								outline: z
							,	appletManager: apltMan
							,	widgetManager: wgtMan
							}, spcr, spc+spcr, end);
						
							htm+=zz.html;
							iCode+=zz.iCode;
							ObjCopyTo(aplts, zz.applets);
							ObjCopyTo(wgts, zz.widgets);
							if(z=zz.css) {
								if(!css) css={};
								ObjCopyTo(css, zz.css);
							};
						};

						if(str2) htm+=spc+spcr+str2+end;
						htm+=spc+'</'+typ+'>'+end;
					};
				};
			};
		};		
	
		//out('## iCode='+iCode);
		rv={
			$$isBuiltGui: 2
		,	html: htm
		,	widgets: wgts
		,	applet: aplts
		,	iCode: iCode
		,	css: css
		};
		
		if(cb) cb(0, rv);
		return rv;
	};
};
