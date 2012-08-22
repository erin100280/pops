(function(){
   var pc=require('pops.core'),X=exports;
   eval(pc.$VarStr(pc,'pc'));   

   var fst=X.fsTemplate=Interface({
         ChDir:'function|path'
      ,  CurDir:'property'
      ,  MkDir:'function|name'
      ,  RmDir:'function|name'
   });

   X.fsBase=Class('popsFsBase_fsBase',{PreImp:fst});

}())
