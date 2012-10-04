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

X.Cursor=function(schema, cur) {
	
	var rv={
			Each: function(cb) {
				var idx=0;
				if(cb) cur.each(function(err, i) { 
					if(i!=null)i=new schema(i);
					cb(err, i, idx++);
				});
			}.Sys()
	};
	
	Object.defineProperty(rv, '$schema', { get: function() { return schema; } });
	Object.defineProperty(rv, '$cur', { get: function() { return cur; } });
	
	return rv;
};

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
		else f[nm]=((typeof z=='object')?
				Object.CopyTo({}, [{ Default: '<{NULL}>' }, z])
			:	{ type: z, Default: '<{NULL}>' }
		);
	};

   rv=Class('popsDbMongoSchema', {
         options: {}
      ,  PRIVATE: {
					pc: pc, X: X
            ,  fields: f
         }
      ,  Shared: {
					Private: {
							$db: o.$db						
						,	$$db: o.$$db						
						,	$collection: 0
						,	$Cursor: X.Cursor
						,	$T: 0
						
						,	$createDefInner: function() {
		         			var ar=arguments, ONRDY=(typeof OnRdy!='undefined')? OnRdy : 0;
		         			$db.Collection(This.NAME, function(err, coll) {
		         				if(err) { $collection=0; if(ONRDY) ONRDY(err); }
		         				else {
		         					$collection=coll;
		         					if(call) call();
		         					This[nam]=Fn;
		         					eval('This[nam]('+pc.ArgStr(ar, 'ar')+');')
		         				};
		         			});
							}.InnerStr()

						,	$CreateDef: function(nam, This, Fn, call, argNames) {
								var an=argNames, rv, as='', i, l;
								if($collection) rv=Fn;
								else {
									if(an) for(i=0, l=an.length; i<l; i++)
										as+=((as=='')? '' : ',')+an[i];
									//out('rv=function('+as+') {'+$createDefInner+'};');
									eval('rv=function('+as+') {'+$createDefInner+'};');
								};
								return rv;
							}
						,	$Find: function(qry, OnRdy) {
								if(qry.$isSCHEMAinst) qry=qry.OBJ;
								var err=null, rv=$Cursor(this, $collection.find(qry));
								pc.cout('$Find - cur='+rv);
								if(OnRdy) OnRdy(err, rv);
								return rv;
							}
						,	$Insert: function(schema_inst, OnRdy) {
								var t=this;
								if(schema_inst.$isSCHEMAinst) schema_inst=schema_inst.VALUES;
								$collection.insert(schema_inst, function(err, result) {
									if(result)
										for(var i=0, l=result.length; i<l; i++)
											result[i]=new t(result[i]);
									if(OnRdy) OnRdy(err, result, $db, t);
								});
								return null;
							}							
						,	$Remove: function(qry, OnRdy) {
								var t=this;
								if(qry.$isSCHEMAinst) qry=qry.VALUES;//{ _id: qry._id };
								$collection.remove(qry, function(err, result) {
									if(result)
										for(var i=0, l=result.length; i<l; i++)
											result[i]=new t(result[i]);
									if(OnRdy) OnRdy(err, result, $db, t);
								});
								return null;
							}							
						,	$Save: function(doc, OnRdy) {
								var t=this;
								if(doc.$isSCHEMAinst) doc=doc.VALUES;//{ _id: qry._id };
								$collection.save(doc, function(err, result) {
									if(result)
										for(var i=0, l=result.length; i<l; i++)
											result[i]=new t(result[i]);
									if(OnRdy) OnRdy(err, result, $db, t);
								});
								return null;
							}							
						,	$Update: function(doc, OnRdy) {
								var t=this;
								if(doc.$isSCHEMAinst) doc=doc.VALUES;//{ _id: qry._id };
								$collection.update(doc, function(err, result) {
									if(result)
										for(var i=0, l=result.length; i<l; i++)
											result[i]=new t(result[i]);
									if(OnRdy) OnRdy(err, result, $db, t);
								});
								return null;
							}							
					} 
				,	$isSCHEMA: 2
				,	$ops: o	

         	,	Find: function(qry, OnRdy) {
         			var t=this;
         			t.Find=$CreateDef('Find', t, $Find, 0, ['qry', 'OnRdy']);
         			return t.Find(qry, OnRdy);
         		}
         	,	Insert: function(schema_inst, OnRdy) {
         			var t=this;
         			t.Insert=$CreateDef('Insert', t, $Insert, 0, ['schema_inst', 'OnRdy']);
         			return t.Insert(schema_inst, OnRdy);
         		}
         	,	Remove: function(qry, OnRdy) {
         			var t=this;
         			t.Remove=$CreateDef('Remove', t, $Remove, 0, ['qry', 'OnRdy']);
         			return t.Remove(qry, OnRdy);
         		}
         	,	Save: function(doc, OnRdy) {
         			var t=this;
         			t.Save=$CreateDef('Save', t, $Save, 0, ['doc', 'OnRdy']);
         			return t.Save(doc, OnRdy);
         		}
         	,	Update: function(doc, OnRdy) {
         			var t=this;
         			t.Update=$CreateDef('Update', t, $Update, 0, ['doc', 'OnRdy']);
         			return t.Update(doc, OnRdy);
         		}
         }
      ,  Private: {
            	$schema: rv
            ,	fieldVals: {}
            ,	ObjID: -2
				,	SetupArgs: function(args) {
						var a=args, i, l=args.length, z
							,	rv={
										data: ((l)? a[0] : undefined)
									,	OnRdy: undefined
									,	options: undefined
								}
						;
						
						if(l>1) {
							z=a[1];
							if(typeof z=='function') rv.OnRdy=z;
							else rv.options=z;
						}
						
						if(l>2) rv.OnRdy=a[2];
					
					
					}
            ,  SetupFields: function(vals) {
                  var t=this, nm, f=fields, fv=fieldVals, z;
                  for(nm in f) {
                     //pc.//out('nm='+nm+'  -  f[nm].Default='+f[nm].Default);
                     z=(vals && typeof vals[nm]!='undefined')? vals[nm] : ((nm=='_id')?
                     		vals._id||100280
               			:	f[nm].Default
               		);
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
               	if(vals._id) fv._id=vals._id;
               }
         }
      ,  Init: function(ops, OnRdy) {
            var o=(ops)? Object.CopyTo({}, ops, 2) : {}, t=this;

				//if(typeof o._id!='undefined') { pc.cout('o._id='+o._id); };				
				if(typeof o.$OBJID!='undefined') { OBJID=o.$OBJID; delete o.$OBJID; };				
            SetupFields(o);

            t.$isSchema=2;
         }
      ,  Public: {
         		$isSCHEMAinst: 2
         	,	INSERT: function(OnRdy) { return thisClass.Insert(this, OnRdy); }
         	,	REMOVE: function(OnRdy) { return thisClass.Remove(this, OnRdy); }
         	,	SAVE: function() { return thisClass.Save(this, OnRdy); }
         	,	UPDATE: function(OnRdy) { return thisClass.Update(this, OnRdy); }

         	,	OBJ: pc.Property({ readonly: 2, Get: function(){ return Object.Clone(fieldVals); } })
         	,	OBJID: pc.Property({ readonly: 2, Get: function(){ return fieldVals._id; } })
         	,	VALUES: pc.Property({ readonly: 2, Get: function(){
         			var nm, rv={}, z, zz;
         			
         			for(nm in fieldVals) {
         				z=fieldVals[nm];
         				zz=typeof z;
         				if(z!='<{NULL}>' && z!=null) rv[nm]=z;
         			};
         			
         			return rv; 
      			}})
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
				Close: function() { return ($db)? $db.close() : undefined; }
			,	Connect: function(host, name, port, callback) {
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
			,	Collection: function() {
					var rv; 
					eval('rv=$db.collection('+pc.ArgStr(arguments, 'arguments')+');');
					return rv;
				}
			,	Drop: function(collectionName, OnRdy) {
					return $db.dropCollection(collectionName, function(err, result) {
						if(OnRdy) OnRdy(err, result);
					});
				}

		   ,  connected: Property({ readonly: 2, Get: function(){return $connected} })
		   ,	schemas: Property({ readonly: 2, Get: function(){return $schemas} })
		   ,  type: Property({ readonly: 2, Get: function(){return 'popsDbMongo'} })
		   ,  host: Property({ readonly: 2, Get: function(){return $host;} })
      }   
});

