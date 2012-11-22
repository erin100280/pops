if(2) {//- vars
	var X=exports
	,	$pc=require('./pops.core')
		,	cout=$pc.cout
		,	$pc_CreateOptions=$pc.CreateOptions
	,	pfsl=$fsLocal=require('./fs/pops.fs.local')
	,	$$fs=require('fs')
		,	$$fs_readFile=$$fs.readFile
		,	$$fs_readFileSync=$$fs.readFileSync
		,	$$fs_stat=$$fs.stat
	,	$path=require('path')
		,	$path_dirname=$path.dirname
		,	$path_join=$path.join
	
	,	Code
	,	FromFile
	,	LoadFile, LoadFileSync
	,	ParseStr
	
	,	rx_command=/(\w*)+(.*)?/
	,	rx_parenCont=/\((.*)\)/
	,	rx_quoteCont=/\'(.*)\'/
	,	rx_dblQuoteCont=/\"(.*)\"/
	;
};

Code=X.Code=function(obj, spacer, ender, initialSpace, doCurlyBrackets) {
	var nm, k, z
	,	dcb=doCurlyBrackets	
	,	spc=(typeof (z=spacer)=='string')? z : '	'
	,	end=ender||'\n'
	,	is=initialSpace||''
	,	rv=is+(dcb? '{' : '')+end 
	,	$Code=Code
	;

	if(typeof obj=='object') {
		for(nm in obj) {
			z=obj[nm];
			if(typeof z=='object') {
				rv='';
				for(nm in obj) {
					z=obj[nm];
					rv+=is+nm+' {'+end;
					rv+=$Code(z, spc, end, is+spc);
					rv+=is+'}'+end;
				};
				return rv;
			}
			rv+=is+spc+nm+': '+z+';'+end;
		}
	}

	return rv+(dcb? '}' : '')+end;
}

FromFile=X.FromFile=function(filnam, ops) {
	return $pc_CreateOptions(ops, { $$isCssFromFile: 2, filename: filnam });
};

LoadFile=X.LoadFile=function(filnam, map, cb) {
	if(typeof map=='function') { cb=map; map={}; };
	var z
	,	mp=map||{}
	,	ops=mp.options||{}
	,	fs=ops.fs||$fsLocal 
	;

	fs.FindFile(filnam, ops, function(err, filnam) {
		if(err) { cout('err='+err); if(cb) cb(err); return; }
		else {
			//out('++ filnam='+filnam);
			$$fs_readFile(filnam, function(err, val) {
				//out('val='+val);
				if(err) { if(cb) cb(err); }
				else
					ParseStr(
						new String(val)
					,	$pc_CreateOptions(mp, { options: {
							fromDir: $path_dirname(filnam) 
						} })
					,	cb
					);
			});
		};
	});
};
LoadFileSync=X.LoadFileSync=function(filnam, map) {
	var fil, z
	,	mp=map||{}
	,	ops=mp.options||{}
	,	fs=ops.fileSystem||pfsl
	;

	if(fil=fs.FindFileSync(filnam, ops))
		return ParseStrSync(
			fs.readFileSync(fil.path).toString()
		,	$pc_CreateOptions(mp, {
				options: { fromDir: fil.dir }
			})
		);
	else throw(new Error('Can\'t find file : '+filnam));

};

ParseStr=X.ParseStr=function(str, map, cb) {
	if(typeof map=='function') { cb=map, map={} };
	var rv='', z
	,	li=0
	,	mp=map||{}
	,	ops=mp.options||{}
	,	fromDir=ops.fromDir||process.cwd()
	,	fs=ops.fs||$fsLocal 
	
	,	rxCommand=rx_command
	,	rxComment=/\/\*(.*)\*\//g
	,	rxCssMain=/\/\*\!\*(.*)\*\!\*\//gm
	,	rxParenCont=rx_parenCont
	,	rxQuoteCont=rx_quoteCont
	,	rxDblQuoteCont=rx_dblQuoteCont

	,	Fn=function() {
			var c, i2, l2, il, ir, k, li2 
			,	cmnt=rxCssMain.exec(str)
			,	z, zi, zl, ZFn
			;
			if(cmnt) {
				if((k=cmnt.index)>li) rv+=str.substring(li, k);
				li=cmnt.index+cmnt[0].length;
				
				//out('cmnt[0]='+cmnt[0]);
				//out('cmnt[1]='+cmnt[1]);
				//z=rxCssMain.exec(cmnt[1]);
				z=cmnt[1].split('##');
				zi=0; zl=z.length;
				ZFn=function() {
					var c, ci, cl, CFn, k, k2, k4, k2RX, NFn;
					if(zi<zl) {
						k=z[zi].TrimFull();
						//out('z['+zi+']= '+(;));
						zi++;
						if(c=rxCommand.exec(k)) {
							//for(ci=0, cl=c.length; ci<cl; ci++) out('+c['+ci+']= '+c[ci]);
							if(k=c[1]) {
								if(k=='jjkkjjkk') {}
								else if(k=='load') {
									//out('-==-load-==-');
									if((k2=c[2])&&(k2RX=rxParenCont.exec(k2))&&(k4=k2RX[1])) {
										if(k4.length) {
											if((k2=k4.charAt(0))=='\'') {
												if((k2=rxQuoteCont.exec(k4)) && k2[1])
													k4={ FILENAME: 2, val: k2[1] };
												else k4='';
											}
											else if(k2=='\"') {
												if((k2=rxDblQuoteCont.exec(k4)) && k2[1])
													k4={ FILENAME: 2, val: k2[1] };
												else k4='';
											};
											
											if(!k4.FILENAME) {
												//out('NOT FILENAME');
												ZFn();
											};
											
											//out('FILENAME: ' +k4.val);
											LoadFile(k4.val, mp, function(err, val) {
												if(err) { if(cb) cb(err); }
												else {
													rv+=val;
													ZFn();
												};
												
											})
										}
										else ZFn();
									}
									else ZFn();
								}
								else ZFn();
							}
							else ZFn();
						}
						else {
							zi++;
							ZFn();
						};
					}
					else Fn();
				};
				ZFn();
			}
			else if(cb) cb(0, rv+str.substring(li, str.length));
		}
	;
	//z=rx.exec(str);
	//z=str.match(/\/\*!\*(.*)\*!\*\//);
	//out('fromDir='+fromDir);

	Fn(str);

};
ParseStrSync=X.ParseStrSync=function(str, map) {
	var rv='', cb, z
	,	li=0
	,	mp=map||{}
	,	o=mp.options||{}
	,	fromDir=o.fromDir||process.cwd()
	,	fs=o.fileSystem||pfsl 
	
	,	rxCommand=rx_command
	,	rxComment=/\/\*(.*)\*\//g
	,	rxCssMain=/\/\*\!\*(.*)\*\!\*\//gm
	,	rxParenCont=rx_parenCont
	,	rxQuoteCont=rx_quoteCont
	,	rxDblQuoteCont=rx_dblQuoteCont

	,	Fn=function() {
			var c, i2, l2, il, ir, k, li2 
			,	cmnt=rxCssMain.exec(str)
			,	z, zi, zl, ZFn
			;
			if(cmnt) {
				if((k=cmnt.index)>li) rv+=str.substring(li, k);
				li=cmnt.index+cmnt[0].length;
				
				//out('cmnt[0]='+cmnt[0]);
				//out('cmnt[1]='+cmnt[1]);
				//z=rxCssMain.exec(cmnt[1]);
				z=cmnt[1].split('##');
				zi=0; zl=z.length;
				ZFn=function() {
					var c, ci, cl, CFn, k, k2, k4, k2RX, NFn, vv;
					if(zi<zl) {
						k=z[zi].TrimFull();
						//out('z['+zi+']= '+(;));
						zi++;
						if(c=rxCommand.exec(k)) {
							//for(ci=0, cl=c.length; ci<cl; ci++) out('+c['+ci+']= '+c[ci]);
							if(k=c[1]) {
								if(k=='jjkkjjkk') {}
								else if(k=='load') {
									//out('-==-load-==-');
									if((k2=c[2])&&(k2RX=rxParenCont.exec(k2))&&(k4=k2RX[1])) {
										if(k4.length) {
											if((k2=k4.charAt(0))=='\'') {
												if((k2=rxQuoteCont.exec(k4)) && k2[1])
													k4={ FILENAME: 2, val: k2[1] };
												else k4='';
											}
											else if(k2=='\"') {
												if((k2=rxDblQuoteCont.exec(k4)) && k2[1])
													k4={ FILENAME: 2, val: k2[1] };
												else k4='';
											};
											
											if(!k4.FILENAME) {
												//out('NOT FILENAME');
												ZFn();
											};
											
											//out('FILENAME: ' +k4.val);
											vv=LoadFileSync(k4.val, mp);
											rv+=vv;
											ZFn();
										}
										else ZFn();
									}
									else ZFn();
								}
								else ZFn();
							}
							else ZFn();
						}
						else {
							zi++;
							ZFn();
						};
					}
					else Fn();
				};
				ZFn();
			}
			else return rv+str.substring(li, str.length);
		}
	;
	//z=rx.exec(str);
	//z=str.match(/\/\*!\*(.*)\*!\*\//);
	//out('fromDir='+fromDir);

	return Fn(str);
};

X.cssReset=(
	'/* reset script */'
+	'html, body, div, span, applet, object, iframe,'
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
+	'}\n'
);