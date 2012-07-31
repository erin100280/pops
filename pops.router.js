(function(){
   var X=exports
      ,  nm='pops.router.router'
      ,  http=require('http')
      ,  pc=require('pops/pops.core')
   ;
   eval(pc.$VarStr(pc,'pc'));
   
   var rt=X.router=Class(nm,{$$zz:0
      ,  options:{$$zz:0
            ,  auto: 2
            ,  Else: function(req,res){
                  res.writeHead(200, {"Content-Type": "text/plain"});
                  res.end("Page Not Found.\n");
               }
            ,  matchCase: 0
            ,  name: nm+'.'+IID()
         }
      ,  Private: {$$zz:0
            ,  $nm: ''
            ,  $OnReady: null
            ,  $pc: pc
            ,  $items: []
            ,  $srv: null
         }
      ,  Shared: {
            New: function(op,onRdy){return new X.router(op,onRdy)}
         }
      ,  Init:function(op,onRdy){
            var t=this.SetOptions(op),o=t.op,l,cnt;
            $OnReady=onRdy;
            $nm=o.name;
            cout($nm+':  Init');
            t.Refresh();
         }
      ,  Process:function(req,res,OnDone,from){
            var t=this,o=t.op,r=req,i=$items,ln=i.length,l=from?from:0,z,zp
               ,  mc=o.matchCase
               ,  u=mc?r.url:r.url.LCase()
               ,  od=OnDone, go=2
            ;
            
            cout($nm+':  Process');
            
            
            while(l<ln&&go){
               z=i[l]; zp=mc?z.path:z.path.LCase();
               if(z.path==u){
                  if(z.mode=='STATIC'){go=0}
                  else{
                     if(z.handler){
                        go=0;
                        z.handler(req,res,function(){
                           t.Process(req,res,od,l+1)
                        })}
                  }
               }
               l++;
            };
            if(go&&o.Else)o.Else(req,res);
            if(od)od(req,res,{});
            
         }
      ,  Refresh:function(){
            var t=this,o=t.op,i=[];
            t.Add(o.items,i);
            $items=i;
            return t;
         }
      ,  Add:function(itm,arr,TO){
            var t=this,i=itm,to=TypeOf(i),a=arr?arr:$items,l,ll,z,zz,it;
            if(to=='array')for(l=0,z=i.length;l<z;l++)t.Add(i[l],a);
            else if(to=='object'){
               if(i.path){
                  i=Object.Clone(i); z=i.mode;
                  if(!z)i.mode=TO?TO:'GET';
                  else i.mode=z.UCase();
                  a.push(i);
               }
               else{
                  for(z in i){
                     it=i[z];
                     if(IsArr(it)){
                        z=z.UCase();
                        for(l=0,ll=it.length;l<ll;L++)t.Add(it[l],a,z)
                     };                     
                  };
               }
            };
            
            return this;
         }
   });
   
}());
