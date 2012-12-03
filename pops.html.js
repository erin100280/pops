var X=exports, $Element, $Elements, $ElementProps
,	$css=require('./pops.css')
	,	$css_Code=$css.Code
;
X.CreateGui=function(gui) {
	var z;
	if(gui instanceof array) {
		
	}
	else if(gui.$isGuiItem) {
		
	}
	else throw(new Error('not supported'));
}

X.GuiItem=function(type, ID, CLASS, ops, children) {
	var rv={ $isGuiItem: 2 }, to, k, z
		,	tp=type//(typeof type=='string')? type.LCase() : type
		,	id=ID
		,	cl=CLASS
		,	op=ops
		,	it=children	
	;
	
	if(2) {//- fix args 
		if(id instanceof Array) { it=id; id=cl=op=0; }
		else if(typeof id=='object') { it=cl; op=id; id=cl=0; }
		else if(cl instanceof Array) { it=cl; cl=op=0; }
		else if(typeof cl=='object') { it=op; op=cl; cl=0; }
		else if(op instanceof Array) { it=op; op=0; };
		if(id=='') id=0;
		if(cl=='') cl=0;
	};
	
	op=op||{};
	if(id) op.id=id;
	if(cl) op['class']=cl;

	rv.type=tp;
	if(op) rv.props=op;
	if(it) rv.children=it;

	return rv;
};

$Element=X.Element=function(typ, props, children, spacer, space, ender) {
	var rv, z, tp
	,	spcr=(typeof spacer=='string')? spacer : '	'
	,	spc=(typeof space=='string')? space : ''
	,	end=(typeof ender=='string')? ender : '\n'
	, 	v=((typeof typ=='string')?
				{ type: typ, props: props, children: children }
			: 	typ
		)
	;
	
	rv=spc+'<'+(tp=v.type);
	if(z=v.props) rv+=$ElementProps(z);
	rv+='>';
	
	if(z=v.children)
		rv+='\n'+$Elements(z, spcr, spc+spcr, end)+spc;

	rv+='</'+tp+'>';
	
	return rv;
}

$Elements=X.Elements=function(arr, spacer, space, ender) {
	var rv='', z;
	
	if(arr instanceof Array)
		for(var i=0, l=arr.length; i<l; i++)
			rv+=(typeof (z=arr[i])!='string')?
					$Element(z, 0, 0, spacer, space, ender)+'\n'
				:	z
			;
	return rv;
}

if(0) $ElementProps=X.ElementProps=function(obj) {
	var rv=' ', nm, z;
	
	if(obj) {
		for(nm in obj) {
			rv+=(nm
			+	'="'
			+	(((z=obj[nm]) && nm=='style' && typeof z=='object')?
					$css_Code(z, '', ' ')
				:	z
				)
			+	'" '
			);
		};
	};
	
	return rv;
}
$ElementProps=X.ElementProps=function(obj) {
	var rv=' ', nm, z;
	
	if(obj) {
		for(nm in obj) {
			if(obj[nm]) {
				rv+=(nm
				+	'="'
				+	(((z=obj[nm]) && nm=='style' && typeof z=='object')?
						$css_Code(z, '', ' ')
					:	z
					)
				+	'" '
				);
			};
		};
	};
	
	return rv.Trim();
}
