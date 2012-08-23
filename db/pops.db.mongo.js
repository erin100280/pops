(function(){
   var X=exports, f='mongo'
      ,  pc=require('../pops.core')
      ,  dbb=require('./pops.db.base')
      ,  mongoose=require('mongoose/')
      ,  mdb=require('mongodb/')
   ;
   eval(pc.$VarStr(pc,'pc'));   

   var schema=X.schema=Class({
         options: {
            
         }
      ,  Private: {
               pc: pc
         }
      ,  Shared: {
               Private: {
                  X: X
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
               ,  f=this.$fields=[]
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
   });
   X.db=Class('popsDbMongo', {
         options: {
               autoConnect: 2
            ,  host: ''
            ,  name: ''
            ,  port: -2
         }
      ,  Private: {
               X: X, pc: pc, mdb: mdb, mgs: mongoose
            ,  $db: 0
            ,  $server: 0
            ,  $connected: 0
            ,  $connecting: 0
            ,  $host: ''
            ,  $name: ''
            ,  $port: -2
         }
      ,  Shared: {
               Private: {X: X, pc: pc}
            ,  Create: function(ops, onRdy) {return pc.NEW(X.db, arguments);}
         }
      ,  Interface: dbb.dbInterface
      ,  Init: function(ops,onRdy) {
            var t=this.SetOptions(ops), o=t.op, ac=o.autoConnect;
            
            if(2){//-do options
               $host=o.host||'';
               $port=o.port||'';
            };
         
            if(ac)t.Connect();
         }
   
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
   
      ,  connected: Property({ readonly: 2, Get: function(){return $connected} })
      ,  type: Property({ readonly: 2, Get: function(){return 'popsDbMongo'} })
      ,  host: Property({ readonly: 2, Get: function(){return $host;} })
   });


}())
