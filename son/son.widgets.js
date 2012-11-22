var widgets
(function() {
	if(2) {//- vars
		var G=window
		,	doc=document
		,	docCreateElem=document.createElement
	
		,	son=G.$son
			,	$=son.$
			,	Class=son.Class
			,	cout=son.cout
			,	Implement=son.Implement
			,	Property=son.Property
		,	X=widgets=son.widgets={}

		,	SetOps=Class.SetOptions
		,	TempSetOps=function() { return this.OP; }
		;
	};

	X.Widget=function(name, ops) {
		if(typeof name=='object') { ops=name; name=''; };
		var rv, nm, o={ NAME: name }, z;
		
		if(ops)
			for(nm in ops) {
				z=ops[nm];
				if(nm=='INIT') o.$INIT2=z;
				else o[nm]=z;
			};
		
		Extend(o, {
			$$isSonWidget: 2
		,	$$baseElem: 0
		
		,	INIT: function(el, op, cb) {
				var k;
				if((k=typeof el)=='function') { cb=el; op={}; el=0; };
				if((k=='object') && !el.$$isElement) { cb=op; op=el; el=0; };
				if(typeof op=='function') { cb=op; op={}; };
				var z
				,	so=this.SetOptions
				,	o=this.SetOptions(op).OP
				;

				if(!o.noElem) {
					if(el) {
						if(typeof el=='string') el=$(el);
					}
					else {
						el=document.createElement(o.baseType||'div');
					};
					el.$class=this;
				};
				this.$elem=this.$$elem=el;

				this.SetOptions=TempSetOps;
				if(this.$INIT2) this.$INIT2(el, o, cb);
				this.SetOptions=so;
				
			}

		,	$elem: Property({ get: function() { return this.$$elem; } })
		,	$class: Property({ get: function() { return this; } })

		});
		
		return Class(o);
	};

	X.CreateWidget=function() {};

	X.widgetManager=Class('son.widgets.widgetManager', {
		OPTIONS: {}
	,	INIT: function(ops) {
			this.SetOptions(ops);
			this.$$widgets={};
		}
	,	FUNCTION: function(nam, cb) { this.Get(nam, cb); }
	,	PUBLIC: {
			$$isSonWidgetManager: 2
		,	$$instance: 2
		,	$$widgets: {}
		,	$$alias: {}

		
		,	Get: function(nam, cb) {
			
			}
		,	GetSync: function(nam) {
				var rv, wg=this.$$widgets, z, zz;

				if(typeof nam=='object') {}
				else {
					if(z=wg[nam]) rv=z;
					else if((z=this.$$alias[nam]) && (zz=wg[z])) rv=zz;
				};

				return rv;
			}
		
		
		}
	});

	X.MakeGlobal=function() { Object.CopyTo(G, X); };
	if(son.$$globalMods || son.$$global_widget) X.MakeGlobal();
}());
