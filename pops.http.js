var X=exports
   ,  nm='pops.http.server'
   ,  http=require('http')
   ,  pr=require('pops/pops.router')
   ,  pc=require('pops/pops.core')
;
eval(pc.$VarStr(pc,'pc'));
//out('pr='+pr);
var $Req=X.Req=X.Request=function(req){
   //var rv=req;
   return req;
};   
var $Res=X.Res=X.Response=function(res){
   return res;
};

pr=require('pops/pops.router');
var hs=X.server=Class('popsHttpServer',{$$zz:0
   ,  options:{$$zz:0
         ,  auto: 2
         ,  name: 'popsHttpServer.'+IID()
         ,  port: 80
         ,  router: 0
      }
   ,  Private: {$$zz:0
         ,  X:X
         ,  $Res:$Res
         ,  $Req:$Req
         ,  $http:http
         ,  $nm: ''
         ,  $OnRequest: null
         ,  prpr: pr
         ,  $pc: pc
         ,  $router: null
         ,  $srv: null
      }
   ,  Shared:{
            Private:{X:X}
         ,  Create:function(ops){return new X.server(ops)}
      }
   ,  Init:function(op,onRdy){
         var t=this.SetOptions(op),o=t.op,l,cnt;
         $nm=o.name;
         $srv=$http.createServer(function(req, res) {
            //out('req.url='+req.url);
            var z
               ,  rt=t.$router, or=o.OnRequest
               ,  rq=$Req(req)
               ,  rs=$Res(res)
            ;
            if(rt) rt.Process(rq,rs);
            else if(or)or(req,res);
            else {
               rs.writeHead(200, {"Content-Type": "text/plain"});
               rs.end("Hello World\n");
            };
         });

         
         t.Refresh();
         //if(o.auto)t.Start();
         //out($nm+':  Init');
      }
   ,  Start:function(){$srv.listen(this.op.port);}
   ,  Refresh:function(){
         var t=this,o=t.op,r=o.router;
         if(r){
            //out('$pc='+$pc);
            //out('-- r --  r.$isRouter='+r.$isRouter);
            
            if(!r.$isRouter)r=prpr.router.Create(r);
         }
         t.$OnRequest=o.OnRequest;
         t.$router=r;
         //t.$router=(r)?(r.Process)?r:new $pr.router(r):0;
      }
});
