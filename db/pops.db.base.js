var pc=require('../pops.core'), f='mongo', X=exports, dbi;
eval(pc.$VarStr(pc,'pc'));   

dbi=X.dbInterface=Interface({
      Init: 'function|ops'
   ,  Connect: 'function|host,db,port' 
   ,  host: 'property'
   ,  name: 'property'
   ,  port: 'property'
   ,  type: 'property'
});

//Array.CopyTo(exports,require('db/pops.db.'+f+'.js'));
