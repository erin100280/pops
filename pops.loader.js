exports.Load=function(op){
   var o=typeof $pOp!='undefined'?$pOp:{};
   if(op)for(it in op)o[it]=op[it];
   //if(!op.root)op.root="";
   global.$pOp=o;
   if(typeof $$POPS=='undefined'){
      $$POPS=global.$$POPS=require('pops/pops.core.js');
      $$POPS.Global($$POPS);
   };
   return $$POPS;
};
