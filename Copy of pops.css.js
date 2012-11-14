var X=exports
,	$pc=require('./pops.core')
	,	cout=$pc.cout
	,	$pc_CreateOptions=$pc.CreateOptions
,	$fsLocal=require('./fs/pops.fs.local')
,	$$fs=require('fs')
	,	$$fs_readFile=$$fs.readFile
	,	$$fs_readFileSync=$$fs.readFileSync
	,	$$fs_stat=$$fs.stat
,	$path=require('path')
	,	$path_dirname=$path.dirname

,	ParseStr

,	rx_cssMain=/\/\*\!\*(.*)\*\!\*\//gm
//,	rx_cssMain=/!\*([.|!\*.*\*!])*\*!/g
//,	rx_cssMain=/!\*([.|(!\*.*\*!)])*\*!/
//,	rx_cssMain=/!\*(.*)\*!/g
//,	rx_cssMain=/!\*(.*)\*!/
//,	rx_cssMain=/\!\*(.*)\*!/g
,	rx_comment=/\/\*(.*)\*\//g
,	rx_command=/(\w*)+(.*)?/
;

var cd=X.Code=function(obj, spacer, ender, initialSpace, doCurlyBrackets) {
	var nm, k, z
	,	dcb=doCurlyBrackets	
	,	spc=(typeof (z=spacer)=='string')? z : '	'
	,	end=ender||'\n'
	,	is=initialSpace||''
	,	rv=is+(dcb? '{' : '')+end 
	;

	if(typeof obj=='object') {
		for(nm in obj) {
			z=obj[nm];
			if(typeof z=='object') {
				rv='';
				for(nm in obj) {
					z=obj[nm];
					rv+=is+nm+' {'+end;
					rv+=cd(z, spc, end, is+spc);
					rv+=is+'}'+end;
				};
				return rv;
			}
			rv+=is+spc+nm+': '+z+';'+end;
		}
	}

	return rv+(dcb? '}' : '')+end;
}

X.FromFile=function(filnam, ops, cb) {
	if(typeof ops=='function') { cb=ops; ops={}; };
	var z
	,	op=ops||{}
	,	fs=op.fs||$fsLocal 
	;

	fs.FindFile(filnam, ops, function(err, filnam) {
		if(err) { cout('err='+err); if(cb) cb(err); return; }
		else {
			$$fs_readFile(filnam, function(err, val) {
				//out('val='+val);
				if(err) { if(cb) cb(err); }
				else
					ParseStr(
						new String(val)
					,	$pc_CreateOptions(op, { options: {
							fromDir: $path_dirname(filnam) 
						} })

					,	cb
					);
			});
		};
	});
};

ParseStr=X.ParseStr=function(str, map, cb) {
	var rv='', z
	,	li=0
	,	mp=map||{}
	,	ops=mp.options||{}
	,	rxCommand=rx_command
	,	rxComment=rx_comment
	,	rxCssMain=rx_cssMain

	,	Fn=function() {
			var c, i, l, i2, l2, il, ir, k, li2, cmnt=rxCssMain.exec(str), z;
			if(cmnt) {
				if((k=cmnt.index)>li) rv+=str.substring(li, k);
				li=cmnt.index+cmnt[0].length;
				
				cout('cmnt[0]='+cmnt[0]);
				cout('cmnt[1]='+cmnt[1]);
				//z=rxCssMain.exec(cmnt[1]);
				z=cmnt[1].split('##');
				for(i=0, l=z.length; i<l; i++) {
				//if(z=rxCssMain.exec(cmnt[1])) {
					cout('z['+i+']= '+(k=z[i]));
					if(c=rxCommand.exec(k)) {
						for(var i2=0, l2=c.length; i2<l2; i2++)
							cout('c['+i2+']= '+c[i2]);
					};
					//z=rxCssMain.exec(cmnt[1]);
				};

				//cout('code='+z[1]);
				Fn();
			}
			else if(cb) cb(0, rv+str.substring(li, str.length));
		}
	;
	//z=rx.exec(str);
	//z=str.match(/\/\*!\*(.*)\*!\*\//);
	Fn(str);

};

ParseStrBak=X.ParseStrBak=function(str, map, cb) {
	var rv='', z
	,	li=0
	,	mp=map||{}
	,	ops=mp.options||{}
	,	rxCommand=rx_command
	,	rxComment=rx_comment
	,	rxCssMain=rx_cssMain

	,	Fn=function() {
			var c, il, ir, k, li2, cmnt=rxComment.exec(str), z;
			if(cmnt) {
				if((k=cmnt.index)>li) rv+=str.substring(li, k);
				li=cmnt.index+cmnt[0].length;
				
				cout('cmnt[0]='+cmnt[0]);
				cout('cmnt[1]='+cmnt[1]);
				
				if(z=cmnt[1].match(rxCssMain)) {
				//if(z=rxCssMain.exec(cmnt[1])) {
					for(var i=0, l=z.length; i<l; i++) {
						cout('z['+i+']= '+z[i]);
						if(c=rxCommand.exec(z[i])) {
							for(var i2=0, l2=c.length; i2<l2; i2++)
								cout('c['+i2+']= '+c[i2]);
						};
					};
				};

				//cout('code='+z[1]);
				Fn();
			}
			else if(cb) cb(0, rv+str.substring(li, str.length));
		}
	;
	//z=rx.exec(str);
	//z=str.match(/\/\*!\*(.*)\*!\*\//);
	Fn(str);

};

X.cssReset=(
	'html, body, div, span, applet, object, iframe,'
+	'h1, h2, h3, h4, h5, h6, p, blockquote, pre,'
+	'a, abbr, acronym, address, big, cite, code,'
+	'del, dfn, em, img, ins, kbd, q, s, samp,'
+	'small, strike, strong, sub, sup, tt, var,'
+	'b, u, i, center,'
+	'dl, dt, dd, ol, ul, li,'
+	'fieldset, form, label, legend,'
+	'table, caption, tbody, tfoot, thead, tr, th, td,'
+	'article, aside, canvas, details, embed,'
+	'figure, figcaption, footer, header, hgroup, '
+	'menu, nav, output, ruby, section, summary,'
+	'time, mark, audio, video {'
+		'margin: 0;'
+		'padding: 0;'
+		'border: 0;'
+		'font-size: 100%;'
+		'font: inherit;'
+		'vertical-align: baseline;'
+	'}'
	/* HTML5 display-role reset for older browsers */
+	'article, aside, details, figcaption, figure,' 
+	'footer, header, hgroup, menu, nav, section {'
+		'display: block;'
+	'}'
+	'body {'
+		'line-height: 1;'
+	'}'
+	'ol, ul {'
+		'list-style: none;'
+	'}'
+	'blockquote, q {'
+		'quotes: none;'
+	'}'
+	'blockquote:before, blockquote:after,'
+	'q:before, q:after {'
+		"content: '';"
+		'content: none;'
+	'}'
+	'table {'
+		'border-collapse: collapse;'
+		'border-spacing: 0;'
+	'}'
);