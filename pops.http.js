(function(){
   var X=exports
      ,  nm='pops.http.server'
      ,  http=require('http')
      ,  pc=require('pops/pops.core')
   ;
   eval(pc.$VarStr(pc,'pc'));
   
   var $Req=X.Req=X.Request=function(req){
      //var rv=req;
      return req;
   };   
   var $Res=X.Res=X.Response=function(res){
      return res;
   };
   
   var hs=X.server=Class(nm,{$$zz:0
      ,  options:{$$zz:0
            ,  auto: 2
            ,  name: nm+'.'+IID()
            ,  port: 80
            ,  router: 0
         }
      ,  Private: {$$zz:0
            ,  $nm: ''
            ,  $OnRequest: null
            ,  $pc: pc
            ,  $router: null
            ,  $srv: null
         }
      ,  Init:function(op,onRdy){
            var t=this.SetOptions(op),o=t.op,l,cnt;
            $nm=o.name;
            $srv=http.createServer(function(req, res) {
               cout('req.url='+req.url);
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
            if(o.auto)t.Start();
            cout($nm+':  Init');
         }
      ,  Start:function(){$srv.listen(this.op.port);}
      ,  Refresh:function(){
            var t=this,o=t.op,r=o.router;
            t.$OnRequest=o.OnRequest;
            t.$router=(r)?(r.Process)?r:require('pops/pops.router').router.New(r):0;
         }
   });
   
}());
