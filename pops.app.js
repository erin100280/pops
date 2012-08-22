var X=exports,G=global,iidd=0
   ,  pc=require('./pops.core')
   ,  hs=require('pops/app/pops.app.httpServer')
   ,  ab=require('pops/app/pops.app.base')
;
eval(pc.$VarStr(pc,'pc'));   

var ai=X.appInterface=ab.appInterface;

var $GetMod=function(ops){
   var o=ops||{},tp=o.type?o.type.LCase():'';
   return require('pops/app/pops.app.'+Choose(tp,{
         httpserver:'httpServer'
      ,  Else:'base'
   }))
};

X.app=X.App=function(ops){
   return $GetMod(ops).app.Create.Call(arguments);
}.Extend({Create:function(o){return X.app(o);}});

X.Outline=function(ops){return $GetMod(ops).Outline.Call(arguments);}
