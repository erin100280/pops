var X=exports,G=global,iidd=0
   ,  pc=require('./pops.core')
;
X.Load=function(op){
   var o=typeof $pOp!='undefined'?$pOp:{};
   if(op)for(it in op)o[it]=op[it];
   //if(!op.root)op.root="";
   global.$pOp=o;
   if(typeof $$POPS=='undefined'){
      $$POPS=global.$$POPS=pc;
      $$POPS.Global($$POPS);
   };
   return $$POPS;
};


