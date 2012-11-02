var X=exports,xx={}
,  nm='pops.spa'
,  pc=require('pops/pops.core')
	,	Class=pc.Class
	,	cout=pc.cout
	,	Property=pc.Property
,	$css=require('./pops.css')
	,	$css_cssReset=$css.cssReset
	,	$css_Code=$css.Code
,  $html=require('pops/pops.html')
	,	$html_Element=$html.Element
,  $http=require('pops/pops.http')
;

var pageBuilder=X.pageBuilder=Class('pops.spa:pageBuilder', {
	OPTIONS: {
		beforeHead: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
	,	contentType: 'text/html'
	,	resources: {
			css: {}
		,	images: {}
		,	js: {}
		}
	,	gui: {}
	}
,	INIT: function(ops, OnRdy) {
		var t=this, op=this.SetOptions(ops).OP;
		this.$CreateGuiHtml(op, OnRdy);
	}
,	PUBLIC: {
		$isPageBuilder: 2
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
	,	$DoBody: function(req, res, op) {
         res.write("<body>");
         res.write("HI");
         res.write("</body>");
			this.$DoEnd(req, res, op);
		}
	,	$DoEnd: function(req, res, op) {
         res.write("</html>");
         res.end();
		}
	,	$DoHead: function(req, res, op) {
         cout('$DoHead');
         res.write('<head>');
         if(!op.noCssReset) res.write(
         	'<style style="display: none; " type="text/css">\n'
      	+	$css_cssReset
      	+	'\n</style>\n'
      	);
         res.write('</head>');
			this.$DoBody(req, res, op);
		}

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

			cout('ol='+JSON.stringify(ol));

			rv=$html_Element('div', props, children);
		
			cout('rv:\n'+rv+'\n\n');
			if(cb) cb(this, rv);
			return rv;
		}

	,	ProcessRequest: function(req, res, Next) { 
			cout('spa:ProcessRequest');
			this.$DoStart(req, res, this.OP);
		}
	,	Refresh: function() {}
	}
});

