var elements, DOC, Document, WIN, Window
(function() {
	if(2) {//- vars
		var G=window
		,	doc=document
		,	docCreateElem=document.createElement
	
		,	son=G.$son
			,	Class=son.Class
				,	FireEvent=Class.FireEvent
			,	cout=son.cout
			,	Implement=son.Implement
			,	Property=son.Property
		,	X=elements=son.elements={}
		,	ep=Element.prototype
		
		,	Doc, Win
		;
	};

	if(2) {//- native
		Implement(Element, {
			$$isElement: 2
		,	$elem: Property({ readonly: 2, get: function() { return this } })
		,	$owner: 0

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
		
		,	Get: ep.getAttribute
		,	Set: ep.setAttribute

		,	SetStyle: function(style, val) {
				var st=style, z; 
				if(typeof st!='object') { st={}; st[style]=val; };
				
			
			
			}

		,	classes: Property({ get: function() { return this.Get('class')||''; } })
		,	AddClass: function(v) {
				//out('-val=')
				var i, k, z
				,	v=(v instanceof Array)? v : [v]
				,	l=v.length
				,	c=this.Get('class')||''
				;
				for(i=0; i<l; i++)
					if(!this.HasClass(k=v[i])) c+=' '+k;
			
				this.Set('class', c);
			}
		,	HasClass: function(v) {
				var rv=0, c, i, l, k;
				if((v) && (c=this.Get('class'))) {
					c=c.split(' ');
					rv=c.Has(v, 2);
				};
				return rv;
			}
		,	RemoveClass: function(v) {
				//out('-val=')
				var i, k, z=''
				,	v=(v instanceof Array)? v : [v]
				,	c=(this.Get('class')||'').split(' ')
				,	l=c.length
				;
			
				for(i=0; i<l; i++)
					if(!v.Has(k=c[i])) z+=' '+k;
			
				this.Set('class', z.Trim());
			}
		});
	};

	if(2) {//- Document
		Doc=DOC=Document=X.DOC=X.Document={
			$$isDOC: 2
		
		,	$On: Class.$On
		,	$Once: Class.$Once
		,	Fire: function(nam, args, ops, OnRdy) {
				if(typeof args=='function') { OnRdy=args; ; ops={}; args=[]; }
				else if(typeof ops=='function' && !ops.$$eventArgsOps) {
					OnRdy=ops; ops={};
				};
				
				return FireEvent(Doc, nam, ops, args, OnRdy);
			}.Prim()
		,	Once: Class.Once
		};
		Doc.On=Doc.addEventListener=Class.On;

		doc.addEventListener('mouseup', function(e) {
			Doc.Fire('mouseUp', 0, e);
		}, true);
	
	}

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
