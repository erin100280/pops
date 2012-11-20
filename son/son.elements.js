var elements
(function() {
	if(2) {//- vars
		var G=window
		,	doc=document
		,	docCreateElem=document.createElement
	
		,	son=G.$son
			,	Class=son.Class
			,	cout=son.cout
			,	Implement=son.Implement
			,	Property=son.Property
		,	X=elements=son.elements={}
		;
	};

	if(2) {//- native
		var elProto=Element.prototype;
		Implement(Element, {
			$$isElement: 2

		,	size: Property({
				Get: function() {
					return { x: this.Get('width'), y: this.Get('height') };
				}
			,	Set: function(val) {
					var x=80, y=80, z;

					if(val instanceof Array) {
						if((z=val[0]) || z==0) x=z;
						if((z=val[1]) || z==0) y=z;
					}
					else if(typeof val=='object') {
						if((z=val.x) || z==0) x=0;
						if((z=val.y) || z==0) y=0;
					};
					
					this.Set('width', x);
					this.Set('height', y);
				}
			})

		
		,	Get: elProto.getAttribute
		,	Set: elProto.setAttribute
		,	SetStyle: function(style, val) {
				var st=style, z; 
				if(typeof st!='object') { st={}; st[style]=val; };
				
			
			
			}
		});
	};

	X.Elem=function(typ, props) {
		if(typeof typ=='object') { props=typ; typ=props.type; };
		var eStr, inner='', k, kids, nm, on, str, z
		, rv=this.$$elem=doc.createElement(typ||'div');
		;

		if(z=props) {
			for(nm in z) {
				k=z[nm];
				if(nm=='children') kids=k;
				if(nm=='endString') eStr=k;
				if(nm=='on') on=k;
				if(nm=='string') str=k;
				else rv.setAttribute(nm, k);
			};
		};

		if(str) rv.innerHTML+=str;

		if(eStr) rv.innerHTML+=eStr;
		
		if(on)
			for(nm in on) {
				
			};

		return rv;
	};

	X.MakeGlobal=function() { Object.CopyTo(G, X); };

	if(son.$$globalMods || son.$$global_elements) X.MakeGlobal();
}());
