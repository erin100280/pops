var G=global,X=exports,
   fs=require('fs'),
   pp=require('pops/pops.base.js'),
   MkDir=X.MkDir=function(path,fn){
      cout('-MkDir-');
      var p=path,f=fn?fn:function(){},ff,f2;
      
      if(IsStr(p))p=[p];
      if(IsArr(p)){
         p=Array.Clone(p);
         ff=function(err){
            cout('ff');
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