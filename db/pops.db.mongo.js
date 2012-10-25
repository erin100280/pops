var X=exports, f='mongo'
   ,  pc=require('../pops.core')
   ,  dbb=require('./pops.db.base')
   ,  mongo=require('mongodb/')
	,	mongoDb=mongo.Db
	,	mongoServer=mongo.Server
;
eval(pc.$VarStr(pc,'pc'));   

var Dict=X.Dict=Class('popsDict', {
      OPTIONS: {}
   ,  FUNCTION: function(key) { return this.$$itms[key]; }
   ,  INIT: function(ops, OnRdy) {
         var z, o=this.SetOptions(ops).OP;
         if(z=o.items) this.Add(z);
      }
   ,  PUBLIC: {
				$$count: 0
			,	$$itms: {}

      	,	Add: function(key, itm) { return this.Set(key, itm, 2); }
			,	All: function() { return Object.Clone(this.$$itms); }
			,	Clear: function() {
					var i, itms=this.$$itms, k=this.keys, l=k.length, z;
					for(i=0; i<l; i++) delete itms[k[i]];
					return this;
				}
			,	Item: function(key) { return this.$$itms[key]; }
			,	Remove: function(key) {
					var t=this, c, i, l, z, zz;
					if(key instanceof Array)
						for(i=0, l=key.length; i<l; i++) this.Remove(key[i]);
					else {
						z=(zz=this.$$itms)[key];
						if(typeof z!='undefined') {
							this.$$count--;
							delete zz[key];
		      			this.Fire('itemRemoved', [{ key: key, item: z }]);
						};
					};
					return this;
				}
			,	Set: function(key, val, asAdd) {
      			var z, i, l, c, t=this;
      			
      			if(typeof key=='object')
      				for(z in key) this.Set(z, key[z], asAdd);
					else {
   					c=(typeof (z=this.$$itms)[key]=='undefined')? 1 : 0;
						if(!asAdd && c)
							throw new Error(
								'item with key "'+key+'" does not exist in this Dict.'
							);
						
						else {
							z[key]=val;
	   					this.$$count+=c;
		      			this.Fire(((asAdd)? 'itemAdded' : 'itemSet'), [{ key: key, item: val }]);
						};
					};

      			return this;
				}

			,	count: Property( { readonly: 2, Get: function() { return this.$$count; } } )
			,	keys: Property( { readonly: 2, Get: function() {
					var rvv=[], z;
					for(z in this.$$itms) rvv.Push(z);
					return rvv;
				}})
			,	values: Property({ readonly: 2, Get: function() {
					return Object.Clone(this.$$itms);
				} })
      }
});

var Cursor=X.Cursor=function(schema, cur) {
	
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

var CreateFields=function(val) {
	var rv={};
	
	return rv;
}


var Schema=X.Schema=function(ops, OnRdy) {
   var RVC, f, i, k, l, nm, o, ok={}, z
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

   RVC=Class(o.NAME||'popsDbMongoSchema', {
         OPTIONS: {}
      ,  SHARED: {
				PUBLIC: {
						$db: o.$db						
					,	$$db: o.$$db						
					,	$collection: 0
					,	$Cursor: X.Cursor
					,	$T: 0
					,	$isSCHEMA: 2
					,	$ops: o	
					,	$fields: f//{}

					,	$ConnectAndRun: function(Fn, args) {
							var t=this;
							this.$db.Collection(this.NAME, function(err, coll) {
	         				if(err) { throw new Error(err); t.$collection=0; if(ONRDY) ONRDY(err); }
	         				else {
	         					t.$collection=coll;
	         					//if(call) call();
									Fn.apply(t, args);
	         				};
	         			});
						}
	
	         	,	Find: function(qry, OnRdy) {
							if(!this.$collection)
								return this.$ConnectAndRun(this.Find, arguments);
							if(qry.$isSCHEMAinst) qry=qry.OBJ;
							var err=null, rv=Cursor(this, this.$collection.find(qry));
							if(OnRdy) OnRdy(err, rv);
							return rv;
	         		}
	         	,	Insert: function(schema_inst, OnRdy) {
							if(!this.$collection)
								return this.$ConnectAndRun(this.Insert, arguments);
							var t=this;
							if(schema_inst.$isSCHEMAinst)
								schema_inst=schema_inst.VALUES;
							this.$collection.insert(schema_inst, function(err, result) {
								if(result)
									for(var i=0, l=result.length; i<l; i++)
										result[i]=new t(result[i]);
								if(OnRdy) OnRdy(err, result, t.$db, t);
							});
							return null;
		      		}
	         	,	Remove: function(qry, OnRdy) {
							if(!this.$collection)
								return this.$ConnectAndRun(this.Remove, arguments);
							if(qry.$isSCHEMAinst) qry=qry.VALUES;//{ _id: qry._id };
							this.$collection.remove(qry, function(err, result) {
								if(result)
									for(var i=0, l=result.length; i<l; i++)
										result[i]=new this(result[i]);
								if(OnRdy) OnRdy(err, result, this.$db, this);
							});
							return null;
	         		}
	         	,	Save: function(doc, OnRdy) {
							if(!this.$collection)
								return this.$ConnectAndRun(this.Save, arguments);
							if(doc.$isSCHEMAinst) doc=doc.VALUES;//{ _id: qry._id };
							this.$collection.save(doc, function(err, result) {
								if(result)
									for(var i=0, l=result.length; i<l; i++)
										result[i]=new this(result[i]);
								if(OnRdy) OnRdy(err, result, this.$db, this);
							});
							return null;
	         		}
	         	,	Update: function(doc, OnRdy) {
							if(!this.$collection)
								return this.$ConnectAndRun(this.Update, arguments);
							if(doc.$isSCHEMAinst) doc=doc.VALUES;//{ _id: qry._id };
							this.$collection.update(doc, function(err, result) {
								if(result)
									for(var i=0, l=result.length; i<l; i++)
										result[i]=new this(result[i]);
								if(OnRdy) OnRdy(err, result, this.$db, this);
							});
							return null;
	         		}
				}
         }
      ,  INIT: function(ops, OnRdy) {
            var o=(ops)? Object.CopyTo({}, ops, 2) : {};

				if(typeof o.$OBJID!='undefined') {
					this.$OBJID=o.$OBJID;
					delete o.$OBJID;
				};				
            //this.$fields=RVC.$fields;
            this.$SetupFields(o);
            this.$isSchema=2;

         }
      ,  PUBLIC: {
            	$schema: RVC
            ,	$fieldVals: {}
            ,	$ObjID: -2
            ,	$OBJID: -2
         	,	$isSCHEMAinst: 2
				,	$fields: f
				,	$SetupArgs: function(args) {
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
					
						return rv;
					}
            ,  $SetupFields: function(vals) {
                  var nm, f=this.$fields, fv=this.$fieldVals, z;
                  for(nm in f) {
                     //pc.//out('nm='+nm+'  -  f[nm].Default='+f[nm].Default);
                     z=(vals && typeof vals[nm]!='undefined')?
                     		vals[nm]
                  		:	((nm=='_id')?
                     				vals._id||100280
               					:	f[nm].Default
               		);
                     if(z instanceof Array) z=Array.Clone(z);
                     else if(typeof z=='object') z=Object.Clone(z);
                     fv[nm]=z;

							eval(
									'Object.defineProperty(this, "'+nm+'", {'
								+	'		get: function() { return fv["'+nm+'"]; }'
								+	'	,	set: function(v) { fv["'+nm+'"]=v; }'
								+	'});'
							);
                  };
               	if((z=vals._id)) fv._id=z;
               }

         	,	INSERT: function(OnRdy) { return RVC.Insert(this, OnRdy); }
         	,	REMOVE: function(OnRdy) { return RVC.Remove(this, OnRdy); }
         	,	SAVE: function() { return RVC.Save(this, OnRdy); }
         	,	UPDATE: function(OnRdy) { return RVC.Update(this, OnRdy); }

         	,	OBJ: pc.Property({ readonly: 2, Get: function(){
         			return Object.Clone(this.$fieldVals);
      			} })
         	,	OBJID: pc.Property({ readonly: 2, Get: function(){
         			return this.$fieldVals._id;
      			} })
         	,	VALUES: pc.Property({ readonly: 2, Get: function() {
         			var fv=this.$fieldVals, nm, rv={}, z, zz;
         			
         			for(nm in fv) {
         				z=fv[nm];
         				zz=typeof z;
         				if(z!='<{NULL}>' && z!=null) rv[nm]=z;
         			};
         			
         			return rv; 
      			}})
         }
   });

   return RVC;
}.Extend({}).Sys();

X.db=Class('popsDbMongo', {
		SHARED: {}
   ,	OPTIONS: {
				host: ''
			,	name: ''
			,	port: -2
      }
   ,  INTERFACE: dbb.dbInterface
   ,  INIT: function(ops, onRdy) {
         var o=this.SetOptions(ops).OP, ac=o.autoConnect, add, n, nm, z, zz
         	,	sch
         ;

         this.$SetupDict();
			sch=this.$schemas;
         if(z=o.schemas) sch.Add(z);

			zz=sch.values;
			for(nm in zz) {
				z=zz[nm];
				n=z.NAME;
				if((!n || typeof n!='string') || !n.length)
					z.NAME=z.CLASSINFO.Public.NAME=nm;
			};

         if(ac)this.Connect();
      }
   ,  PUBLIC: {   
         	$db: 0
         ,  $server: 0
         ,  $connected: 0
         ,  $connecting: 0
         ,  $host: ''
         ,  $name: ''
         ,  $port: -2
			,	$schemas: 0

         ,  $SetupDict: function() {
      			var t=this, z=this.$schemas=new Dict(), add=z.Add;
		         z.Add=function(key, itm) {
		         	if(typeof key=='object') for(itm in key) z.Add(itm, key[itm]);
		         	else add.apply(z, [key, Schema([{NAME: key }, itm, {
		         			$db: t
	         			,	$$db: t.$db
         			}])]);
		         };
            }

			,	Close: function() { return (this.$db)? this.$db.close() : undefined; }
			,	Connect: function(host, name, port, callback) {
	            var t=this, o=this.OP, cb=callback
	               ,  a=arguments, al=a.length
	               ,  h=this.$host=(!al)? o.host : host
	               ,  n=this.$name=(al<2)? o.name : name
	               ,  p=this.$port=(al<3)? o.port : port
	               ,  s//=this.$server=new mongoServer(h, p)
	               ,  d//=this.$db=new mongoDb(n, s)
	            ;
	
					//pc.out('h='+h+'  -  n='+n+'  -  p='+p);
					
					s=this.$server=new mongoServer(h, p)
					d=this.$db=new mongoDb(n, s)

	
	            this.$connecting=2;
	            d.open(function(err, db) {
	               if(err) {
	                  this.$server=this.$db=this.$connected=this.$connecting=0;
	                  this.$host='';
	                  this.$port=-2;
	                  throw new Error(err);
	               }
	               else {
	                  this.$db=db;
	                  this.$connected=2;
	               };
	
	               if(cb) t.On('connect', cb);
	               $connecting=0;
	               t.Fire('connect', [t]);
	            });
	            
	            
	            
	         }
			,	Collection: Property({ readonly: 2, Get: function() {
					var z=this.$db;
					return z.collection.CBind(z);
				}})
			,	Collection: function() {
					var z=this.$db;
					return z.collection.apply(z, arguments);
				}
			,	Drop: function(collectionName, OnRdy) {
					return this.$db.dropCollection(collectionName, function(err, rslt) {
						if(OnRdy) OnRdy(err, rslt);
					});
				}

		   ,  connected: Property({ readonly: 2, Get: function(){
		   		return this.$connected
	   		} })
		   ,	schemas: Property({ readonly: 2, Get: function(){
		   		return this.$schemas;
	   		} })
		   ,  type: Property({ readonly: 2, Get: function() {
		   		return 'popsDbMongo';
	   		} })
		   ,  host: Property({ readonly: 2, Get: function() { return this.$host; } })
      }   
});










