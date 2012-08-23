(function(){
   var pc=require('pops.core'),f='local';
   eval(pc.$VarStr(pc,'pc'));   
   
   Array.CopyTo(exports,require('fs/pops.fs.'+f+'.js'));
}())

var G=global,X=exports,
   fs=require('fs'),
   pp=require('pops/pops.core.js'),
   MkDir=X.MkDir=function(path,fn){
      var p=path,f=fn?fn:function(){},ff,f2;
      
      if(IsStr(p))p=[p];
      if(IsArr(p)){
         p=Array.Clone(p);
         ff=function(err){
            var t=this,p=t.p,fn=t.fn,ff=t.ff,z;
            if(err)fn(err);
            else if(p.length){
               z=p.shift();
               fs.mkdir(z,ff.Bind({p:p,fn:fn,ff:ff}));
            }
            else fn();
         };
         f2=ff.Bind({p:p,fn:fn,ff:ff});
         f2();
      }
      else f('must pass a string or array of strings');
   }
;