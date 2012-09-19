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
      		Add: function(key, itm) {
      			var z, i, l, c, t=this;
      			
      			if(typeof key=='object') for(z in key) t.Add(z, key[z]);
					else {
   					c=(typeof itms[key]=='undefined')? 1 : 0;
						itms[key]=itm;
   					count+=c;
	      			T.Fire('itemAdded', [{ key: key, item: itm }]);
					};
      			return t;
      		}
			,	Clear: function() {
					var t=this, k=t.keys, i, l=k.length, z;
					for(i=0; i<l; i++) delete itms[k[i]];
					return t;
				}
			,	count: Property( { readonly: 2, Get: function() { return count; } } )
			,	Item: function(key) { return itms[key]; }
			,	keys: Property( { readonly: 2, Get: function() {
					var rvv=[], z;
					for(z in itms) rvv.Push(z);
					return rvv;
				}})
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

      }
});

X.Schema=function(ops, OnRdy) {
   var rv
      ,  z=ops||{}
      ,  oo=(z.$isSCHEMA)?z.$ops:z
      ,  o=CreateOptions([{ $db: 0, $fields: [] }, oo])
      ,  f=o.$fields=Array.Clone(o.$fields)
   ;

   rv=Class('popsDbMongoSchema', {
         options: {
            
         }
      ,  PRIVATE: {
               pc: pc, X: X
            ,  fields: f
         }
      ,  Private: {
               $schema: rv
            ,  SetupFields: function() {
                  var t=this, nm, f=fields;
                  for(nm in f) {
                     z=f[nm].Default;
                     t[nm]=(IsObj(z))? Object.CopyTo({}, z): z;
                  };
               }
         }
      ,  Shared: {
               Find: function() {
                  
               }
         }
      ,  Init: function(ops, OnRdy) {
            var z, zz, k, nm
               ,  o2=ops?Object.CopyTo({}, ops, 2):{}
               ,  z=o2.$from
               ,  o1=((pc.IsObj(z))?
                        (z.$isSchema)? Object.CopyTo({}, z.options, 2) : z
                     :  {}
                  )
               ,  t=this.SetOptions(Object.CopyTo(o1, o2, 2)), o=t.op
               ,  f=fields
            ;

            SetupFields();

            t.$isSchema=2;
         }
      ,  Public: {
         
         }
   });

   return rv;
}.Extend({});
var schema=X.schema=Class({
      options: {
         
      }
   ,  Private: {
            pc: pc
      }
   ,  Shared: {
            Private: {X: X, pc: pc, pow: function() { pc.cout('pow'); } }
         ,  POW: function() { pow(); }
      }
   ,  Init: function(ops, OnRdy) {
         var z, zz, k, nm
            ,  o2=ops?Object.CopyTo({}, ops, 2):{}
            ,  z=o2.$from
            ,  o1=((pc.IsObj(z))?
                     (z.$isSchema)? Object.CopyTo({}, z.options, 2) : z
                  :  {}
               )
            ,  t=this.SetOptions(Object.CopyTo(o1, o2, 2)), o=t.op
            ,  f=t.$fields=[]
         ;
         for(nm in o) {
            z=o[nm];
            if(0){}
            else {
               z=(pc.IsObj(z))?Object.CopyTo({}, z, 2) : { type: z };
               if(!z.type) z.type=String;
               if(!z.Default) z.Default=undefined;
            };
            f[nm]=z;

            k=z.Default;
            t[nm]=k;
         }
         
         t.$isSchema=2;
      }
   ,  Public: {
      
      }
   ,  FUNCTION: function() { pc.cout('POOL'); }
});
X.db=Class('popsDbMongo', {
      options: {
            autoConnect: 2
         ,  host: ''
         ,  name: ''
         ,  port: -2
      }
   ,	PRIVATE: { X: X, pc: pc, mdb: mdb }
   ,  Private: { Dict:Dict
         ,	$db: 0
         ,  $server: 0
         ,  $connected: 0
         ,  $connecting: 0
         ,  $host: ''
         ,  $name: ''
         ,  $port: -2
			,	$schemas: 0

         ,  $SetupSchemas: function() {
            
            }
      }
   ,  Shared: {
            Private: { pow: function() { pc.cout('pow'); } }
         ,  POW: function() { pow(); }
      }
   ,  Interface: dbb.dbInterface
   ,  Init: function(ops,onRdy) {
         var t=this.SetOptions(ops), o=t.op, ac=o.autoConnect;
         $schemas=new Dict();
         
         $SetupSchemas();
         if(ac)t.Connect();
      	
      }
   ,  Public: {   
         Schemas: function(nam) {
            
         }.Extend({
               Add:0
         })
      ,  Connect: function(host, name, port, callback) {
            var t=this, o=t.op, cb=callback
               ,  a=arguments, al=a.length
               ,  h=$host=(!al)?o.host:host
               ,  n=$name=(al<2)?o.name:name
               ,  p=$port=(al<3)?o.port:port
               ,  s=$server=new mdb.Server(h, p)
               ,  d=$db=new mdb.Db(n, s)
            ;

            $connecting=2;
            d.open(function(err, db){
               if(err) {
                  $server=$db=$connected=$connecting=0;
                  $host='';
                  $port=-2;
                  throw(err);
               }
               else {
                  $db=db;
                  $connected=2;
               };

               $connecting=0;
               if(cb)cb({ error: err, db: t }, t);
               
            });
            
            
            
         }
      }   
   ,  connected: Property({ readonly: 2, Get: function(){return $connected} })
   ,	schemas: Property({ readonly: 2, Get: function(){return $schemas} })
   ,  type: Property({ readonly: 2, Get: function(){return 'popsDbMongo'} })
   ,  host: Property({ readonly: 2, Get: function(){return $host;} })
});

