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
	,	$css=require('./pops.css')
		,	$css_cssReset=$css.cssReset
		,	$css_Code=$css.Code
		,	$css_LoadFile=$css.LoadFile
		,	$css_LoadFileSync=$css.LoadFileSync
	,  $html=require('./pops.html')
		,	$html_Element=$html.Element
	,  $http=require('./pops.http')
	,  pw=require('./pops.widget')
		,  widgetManager=pw.widgetManager
	,  pfsl=require('./fs/pops.fs.local')
	
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
					var z
					,	g=$$_G
					,	IPg=g.$$_InitPage=function() {
							
						}
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
							if(k.$isCssFromFile && !k.reload){
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
							if(k.$isCssFromFile && !k.reload){
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
							if(k.$isCssFromFile && !k.reload){
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
			$$isPageBuilder: 2, $isPageBuilder: 2
		
		,	$CreateGuiHtml: function(op, cb) {
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
				,	htmlBeginCb, htmlEndCb
				,	beforeHeadCb, headBeginCb, headInitialCssCb, headEndCb
				,	initScriptCb
				,	bodyBeginCb, bodyContentCb, bodyEndCb
				;
	
				htmlBeginCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoBeforeHead(req, res, op, beforeHeadCb);
				};
				beforeHeadCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoHeadBegin(req, res, op, headBeginCb);
				};
				headBeginCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoHead_InitialCss(req, res, op, headInitialCssCb);
				};
				headInitialCssCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoHeadEnd(req, res, op, headEndCb);
				};
				headEndCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoBodyBegin(req, res, op, bodyBeginCb);
				};
				bodyBeginCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoBodyContent(req, res, op, bodyContentCb);
				};
				bodyContentCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoBodyEnd(req, res, op, bodyEndCb);
				};
				bodyEndCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoInitScript(req, res, op, initScriptCb);
				};
				initScriptCb=function(err, t) {
					if(err) { if(cb) cb(new Error(err), t); }
					else t.$DoHtmlEnd(req, res, op, htmlEndCb);
				};
				htmlEndCb=function(err, t) {
					res.end();
					if(cb) cb((err)? new Error(err) : 0, t);
				};
	
	
				this.$DoHtmlBegin(req, res, op, htmlBeginCb);
	
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
				var t=this;
				this.$CreateGuiHtml(OP, function(err, val) {
					res.write(val+'\n');
					if(cb) cb(err, t);
					else t.$DoBodyEnd(req, res, OP);
				});
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
				var iCss=(this.$css||{}).initial;
				if(iCss) {
					var t=this, i=0, l=iCss.length
					,	Fn=function() {
							if(i<l) {
								var z=iCss[i]
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
						      	else if(z.$isCssFromFile) $css_LoadFile(z.filename, z, Ff);
						      	else Ff(0, z);
								}
								else Fn();
							}
							else if(cb) cb(0, t);
							else t.$DoHeadEnd(req, res, op);
						}
					;
					Fn();
				}
				else if(cb) cb(0, this);
				else this.$DoHeadEnd(req, res, op);
			}
		,	$DoHeadEnd: function(req, res, op, cb) {
				var t=this;
	         res.write('</head>\n');
				if(cb) cb(0, this);
				else this.$DoBodyBegin(req, res, op);
			}
		,	$DoInitScript: function(req, res, op, cb) {
				var t=this, son=this.son||{}, z;
				//out('DoInitScript');
	         
	         res.write('<script name="InitScript" type="text/javascript" charset="utf-8">\n'
				+		pb_initialScript
				+	'</script>\n'
				);
	
	         if(z=son.core)
		         res.write('<script name="son.core" type="text/javascript" charset="utf-8">\n'
					+		z
					+	'</script>\n'
					);
				if(z=son.elements)
		         res.write('<script name="son.elements" type="text/javascript" charset="utf-8">\n'
					+		z
					+	'</script>\n'
					);
				if(z=son.widgets)
		         res.write('<script name="son.widgets" type="text/javascript" charset="utf-8">\n'
					+		z
					+	'</script>\n'
					);
	
	         if(z=this.$$tempJS)
		         res.write('<script name="tempJS" type="text/javascript" charset="utf-8">\n'
					+	z
					+	'</script>\n'
					);

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

if(2) {//- BuildGui
	BuildGui=X.BuildGui=function(ops, cb) {
		var i, itm, l, ln, typ, z
		,	htm='', wgts={}, aplts={}
		,	o=ops||{}
		,	outlin=o.outline
		,	wgtMan=o.widgetManager
		,	appltMan=o.appletManager

		,	baseElem=o.baseElem
		,	addBaseEl=o.addBaseElem
		;
	
		if(outlin) {
			if(!(outlin instanceof Array)) outlin=[outlin];
			for(i=0, l=outlin.length; i<l; i++) {
				if(typeof (itm=outlin[i])=='function') itm=itm();
				if(!itm || !itm.$isGuiItem) throw(new Error('gui can only contain GuiItem\'s or functions that return GuiItem\'s'));
				else {
					typ=itm.type;
					z=typ.Split('|');
					if((n=z.length)>1) {
						
					}
					else
						htm+=$html_Element(itm, 0, 0, 0, '	')+'\n';
				};
			};
		};
	
	
		return { $$isBuiltGui: 2, html: htm };
	};
	
};
