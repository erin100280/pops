var X=exports, f='mongo'
   ,  pc=require('../pops.core')
   ,  dbb=require('./pops.db.base')
   ,  mdb=require('mongodb/')
;
eval(pc.$VarStr(pc,'pc'));   

X.List=Class('popsList', {
      options: {}
   ,  PRIVATE: { PC: pc }
   ,  Private: { itms: [] }
   ,  FUNCTION: function() {}
   ,  Init: function(ops, OnRdy) {
         T.SetOptions(ops);
      }
   ,  Public: {
      
      }
});

var Dict=X.Dict=Class('popsDict', {
      options: {}
   ,  PRIVATE: { PC: pc }
   ,  Private: { itms: {}, count: 0 }
   ,  FUNCTION: function(key) { return itms[key]; }
   ,  Init: function(ops, OnRdy) {
         var z;
         T.SetOptions(ops);
         if(z=OP.items) T.Add(z);
      }
   ,  Public: {
      		Add: function(key, itm) { return this.Set(key, itm, 2); }
			,	All: function() { return Object.Clone(itms); }
			,	Clear: function() {
					var t=this, k=t.keys, i, l=k.length, z;
					for(i=0; i<l; i++) delete itms[k[i]];
					return t;
				}
			,	Item: function(key) { return itms[key]; }
			,	Remove: function(key) {
					var t=this, c, i, l, z;
					if(key instanceof Array) for(i=0, l=key.length; i<l; i++) t.Remove(key[i]);
					else {
						z=itms[key];
						if(typeof z!='undefined') {
							count--;
							delete itms[key];
		      			T.Fire('itemRemoved', [{ key: key, item: z }]);
						};
					};
					return t;
				}
			,	Set: function(key, val, asAdd) {
      			var z, i, l, c, t=this;
      			
      			if(typeof key=='object') for(z in key) t.Set(z, key[z], asAdd);
					else {
   					c=(typeof itms[key]=='undefined')? 1 : 0;
						if(!asAdd && c)
							throw('item with key "'+key+'" does not exist in this Dict.');
						else {
							itms[key]=val;
	   					count+=c;
		      			T.Fire(((asAdd)? 'itemAdded' : 'itemSet'), [{ key: key, item: val }]);
						};
					};

      			return t;
				}

			,	count: Property( { readonly: 2, Get: function() { return count; } } )
			,	keys: Property( { readonly: 2, Get: function() {
					var rvv=[], z;
					for(z in itms) rvv.Push(z);
					return rvv;
				}})
			,	values: Property( { readonly: 2, Get: function() { return Object.Clone(itms); } } )
      }
});

var FixArr=function(a, clone) {
	var a=(clone)? Array.Clone(a) : a, i, l=a.length, z;
	for(i=0; i<l; i++) {
		z=a[i];
		if(z instanceof Array) a[i]=FixArr(z, clone);
		else if(z.$isSCHEMA) a[i]=z.$ops; 
	};
	
	return a;
};

X.Schema=function(ops, OnRdy) {
   var rv, f, i, k, l, nm, o, ok={}, z
      ,  oo=FixArr(Array.From(ops || []))
      ,  o=CreateOptions([{ $db: 0, $$db: 0, $fields: {} }, oo])
      ,  f=o.$fields=Object.Clone(o.$fields)
   ;

	for(nm in o) {
		z=o[nm];
		if(nm=='NAME' || nm=='$fields' || nm=='$db' || nm=='$$db') ok[nm]=z;
		else f[nm]=(typeof z=='object')? z : { type: z };
	};



   rv=Class('popsDbMongoSchema', {
         options: {}
      ,  PRIVATE: {
					pc: pc, X: X
            ,  fields: f
         }
      ,  Private: {
            	$schema: rv
            ,	fieldVals: {}
            ,	ObjID: -2
            ,  SetupFields: function(vals) {
                  var t=this, nm, f=fields, fv=fieldVals, z;
                  for(nm in f) {
                     z=(vals && typeof vals[nm]!='undefined')? vals[nm] : f[nm].Default;
                     if(z instanceof Array) z=Array.Clone(z);
                     else if(typeof z=='object') z=Object.Clone(z);
                     fv[nm]=z;

							eval(
									'Object.defineProperty(t, "'+nm+'", {'
								+	'		get: function() { return fv["'+nm+'"]; }'
								+	'	,	set: function(v) { fv["'+nm+'"]=v; }'
								+	'});'
							);
                  };
               }
         }
      ,  Shared: {
					Private: {
							$db: o.$db						
						,	$$db: o.$$db						
						,	$collection: 0
						,	$T: 0
						
						,	$Find: function(qry, OnRdy) {
								var t=this;
								$collection.find(qry, function(err, jj) {
									if(err) { if(OnRdy) OnRdy(err); return; };
									
								});
							}
						,	$Find_Def: function(qry, OnRdy) {
								var t=this;
		         			$$db.collection(this.NAME, function(err, coll) {
			         			//if(err) //out('****err: '+err);
		         				if(err) { $collection=0; OnRdy(err); }
		         				else {
		         					$collection=coll;
		         					t.Find=$Find;
		         					t.Find(qry, OnRdy);
		         				};
		         			});
							}
					} 
				,	$isSCHEMA: 2
				,	$ops: o	
				,	Find: function(qry, OnRdy) {
						var t=this;
						t.Find=($collection)? $Find : $Find_Def;
               	t.Find(qry, OnRdy);
               }
         	,	Insert: function(schema_inst, OnRdy) {
         			//pc.//out('====$db='+$db);
         			//pc.//out('this.NAME='+this.NAME);
         			$db.Collection(this.NAME, function(err, coll) {
	         			//if(err) //out('****err: '+err);
         				if(!err) coll.insert(schema_inst.OBJ);//k);//schema_inst.OBJ);
         				if(OnRdy) OnRdy(err);
         			});
         		}
         }
      ,  Init: function(ops, OnRdy) {
            var o=(ops)? Object.CopyTo({}, ops, 2) : {}, t=this;

				if(typeof o.$OBJID!='undefined') { OBJID=o.$OBJID; delete o.$OBJID; };				
            SetupFields(o);

            t.$isSchema=2;
         }
      ,  Public: {
         		INSERT: function(OnRdy) { thisClass.Insert(this, OnRdy); }
         	,	SAVE: function() { pc.cout('RAD!'); }
         	,	OBJ: pc.Property({ readonly: 2, Get: function(){ return Object.Clone(fieldVals); } })
         	,	OBJID: pc.Property({ readonly: 2, Get: function(){ return ObjID; } })
         }
   });

   return rv;
}.Extend({}).Sys();

X.db=Class('popsDbMongo', {
      options: {
            autoConnect: 2
         ,  host: ''
         ,  name: ''
         ,  port: -2
      }
   ,  Interface: dbb.dbInterface
   ,	PRIVATE: { X: X, pc: pc, mdb: mdb }
   ,  Private: { Dict:Dict, Schema: X.Schema
         ,	$db: 0
         ,  $server: 0
         ,  $connected: 0
         ,  $connecting: 0
         ,  $host: ''
         ,  $name: ''
         ,  $port: -2
			,	$schemas: 0

         ,  $SetupDict: function() {
      			var z=$schemas=new Dict(), add=z.Add, t=this;
		         z.Add=function(key, itm) {
		         	if(typeof key=='object') for(itm in key) z.Add(itm, key[itm]);
		         	else add(key, Schema([{NAME: key }, itm, { $db: t, $$db: $db }]));
		         };
            }
      }
   ,  Shared: {}
   ,  Init: function(ops,onRdy) {
         var t=this.SetOptions(ops), o=t.op, ac=o.autoConnect, add, n, nm, z, zz;

         $SetupDict();
         if(z=o.schemas) $schemas.Add(z);

			zz=$schemas.values;
			for(nm in zz) {
				z=zz[nm];
				n=z.NAME;
				if((!n || typeof n!='string') || !n.length) z.NAME=z.$vs.Public.NAME=nm;
			};

         if(ac)t.Connect();
      }
   ,  Public: {   
	      	Connect: function(host, name, port, callback) {
	            var t=this, o=t.op, cb=callback
	               ,  a=arguments, al=a.length
	               ,  h=$host=(!al)?o.host:host
	               ,  n=$name=(al<2)?o.name:name
	               ,  p=$port=(al<3)?o.port:port
	               ,  s=$server=new mdb.Server(h, p)
	               ,  d=$db=new mdb.Db(n, s)
	            ;
	
	            $connecting=2;
	            d.open(function(err, db) {
	               if(err) {
	                  $server=$db=$connected=$connecting=0;
	                  $host='';
	                  $port=-2;
	                  throw(err);
	               }
	               else {
	                  $db=db;
	                  //t.Collection=db.collection;
	                  $connected=2;
	               };
	
	               if(cb) t.On('connect', cb);
	               $connecting=0;
	               t.Fire('connect', [t]);
	            });
	            
	            
	            
	         }
			//,	Collection: function() { return $db.collection.Call(arguments); }
			,	Collection: function() {
					var rv; 
					pc.cout('rv=$db.collection('+pc.ArgStr(arguments, 'arguments')+');');
					eval('rv=$db.collection('+pc.ArgStr(arguments, 'arguments')+');');
					return rv;
				}
	
		   ,  connected: Property({ readonly: 2, Get: function(){return $connected} })
		   ,	schemas: Property({ readonly: 2, Get: function(){return $schemas} })
		   ,  type: Property({ readonly: 2, Get: function(){return 'popsDbMongo'} })
		   ,  host: Property({ readonly: 2, Get: function(){return $host;} })
      }   
});

