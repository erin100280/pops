(function(){
   var z,X=exports
      ,  fs=require('fs')
      ,  pc=require('./pops.core')
      ,  fst=require('pops.fs.base').fsTemplate

   ;
   eval(pc.$VarStr(pc,'pc'));   

   X.fs=Class('popsFsLocalFs',{
         options:{}
      ,  PreImp:fst
      ,  Private:{
               curDir:''
         }
      ,  Init:function(ops,onRdy){
            var t=this.SetOptions(ops),o=t.op;
         }
      ,  CurDir:Property({
               Get:function(){return curDir}
            ,  Set:function(v){
                  curDir=v
               }
         })
   });
   X.Create=function(ops){};
}())
