(function(){
   var pc=require('pops.core'), f='mongo', X=exports, dbi;
   //eval(pc.$VarStr(pc,'pc'));   
   Array.CopyTo(exports,require('db/pops.db.'+f+'.js'));
}())
