var X=exports
,	pc=require('./pops.core')
;

var cd=X.Code=function(obj, spacer, ender, initialSpace) {
	var nm, k, z
	,	spc=(typeof (z=spacer)=='string')? z : '	'
	,	end=ender||'\n'
	,	is=initialSpace||''
	,	rv=is+'{'+end 
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

	return rv+'}'+end;
}

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