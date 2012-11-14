var X=exports,xx={}
,  nm='pops.spa'
,  pc=require('pops/pops.core')
	,	Class=pc.Class
	,	cout=pc.cout
	,	Property=pc.Property
,	$css=require('./pops.css')
	,	$css_cssReset=$css.cssReset
	,	$css_Code=$css.Code
	,	$css_LoadFile=$css.LoadFile
,  $html=require('pops/pops.html')
	,	$html_Element=$html.Element
,  $http=require('pops/pops.http')
;

var pageBuilder=X.pageBuilder=Class('pops.spa:pageBuilder', {
	OPTIONS: {
		beforeHead: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
	,	contentType: 'text/html'
	,	noCssReset: 0
	,	resources: {
			css: {}
		,	images: {}
		,	js: {}
		}
	,	gui: {}
	}
,	INIT: function(ops, OnRdy) {
		this.$Reset(ops, OnRdy);
		//var op=this.SetOptions(ops).OP;
		//if(OnRdy) OnRdy(this);
	}
,	PUBLIC: {
		$isPageBuilder: 2
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
		
			cout('rv:\n'+rv+'\n\n');
			if(cb) cb(0, rv);
			return rv;
		}
	,	$DoStart: function(req, res, op) {
         res.writeHead(200, {"Content-Type": op.contentType});
         cout("<html>");
         res.write("<html>");
			this.$DoBeforeHead(req, res, op);
		}
	,	$DoBeforeHead: function(req, res, op) {
         cout('$DoBeforeHead');
         var t=this;
         if(z=op.beforeHead) {
         	if(typeof z=='function')
         		z(
         			{ Done: function(v) {
         				res.write(v);
         				t.$DoHead(req, res, op); 
      				} }
      			,	req
      			,	res
      			);
          	else { res.write(z); this.$DoHead(req, res, op); };
			}
			else this.$DoHead(req, res, op);
		}
	,	$DoBody: function(req, res, OP) {
			var t=this;
         res.write("<body>");
         this.$CreateGuiHtml(OP, function(err, val) {
	         res.write(val+"</body>");
				t.$DoEnd(req, res, OP);
         });
		}
	,	$DoEnd: function(req, res, op) {
         res.write("</html>");
         res.end();
		}
	,	$DoHead: function(req, res, op) {
			var t=this;
         cout('$DoHead');
         res.write('<head>');
         if(!op.noCssReset) res.write(
         	'<style style="display: none; " type="text/css">\n'
      	+	$css_cssReset
      	+	'\n</style>\n'
      	);

			this.$DoHead_InitialCss(req, res, op, function(err, t) {
	         res.write('</head>');
				t.$DoBody(req, res, op);
			});
		}
	,	$DoHead_InitialCss: function(req, res, op, cb) {
         cout('$DoHead_InitialCss');
			var t=this, iCss=(this.$css||{}).initial;
			if(iCss) {
				var i=0, l=iCss.length
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
					}
				;
				Fn();
			}
			else if(cb) cb(0, this);
		}
	,	$Reset: function(ops, cb) {
			if(typeof ops=='function') { cb=ops; ops=0; };
			var t=this, z, z2, z4, z6
			,	op=(ops)? this.SetOptions(ops).OP : this.OP||{}
			,	css=op.css

			,	GuiOutlineCb, GuiCssCb
			;

			GuiOutlineCb=function(err) {
				if(err) { if(cb) cb(err, t) }
				else t.$Reset_css(0, GuiCssCb);
			};
			GuiCssCb=function(err) { if(cb) cb(err, t); }

			GuiOutlineCb();

		}
	,	$Reset_css: function(ops, cb) {
			if(typeof ops=='function') { cb=ops; ops=0; };
			var t=this, k, z, z2, z4, z6
			,	op=(ops)? this.SetOptions(ops).OP : this.OP||{}
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
			cout//('$Reset_css_now  -  sectionName='+sectionName +'  -  i='+i);
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

	,	ProcessRequest: function(req, res, Next) { 
			cout('spa:ProcessRequest');
			this.$DoStart(req, res, this.OP);
		}
	,	Refresh: function() {}
	}
});

