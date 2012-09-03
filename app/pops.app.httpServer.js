var X=exports,U=undefined,G=global,iidd=0
   ,  pc=require('pops/pops.core')
   ,  hs=require('pops/pops.http')
   ,  pr=rt=require('pops/pops.router')
   ,  db=require('pops/pops.db')
   ,  ab=require('pops/app/pops.app.base')
   ,  ai=ab.appInterface
;
eval(pc.$VarStr(pc,'pc'));   

X.Outline=function(ops){
   return ab.Outline(ops)+'\n'+function(){
      var $_z_
         ,  $_pahs_=require('pops/app/pops.app.httpServer')
         ,  $_ab_=require('pops/app/pops.app.base')
         ,  CreateApp=function(ops,onRdy){return $_pahs_.app.Create(ops,onRdy,$_app_)}
      ;
   }.InnerStr()
}

var ap=X.app=Class('popsAppHttpServerApp',{
      options:{
            autoRun:2
      }
   ,  PRIVATE:{pc:pc,X:X}
   ,  Private: {
            $hs:hs
         ,  autoRun:2
         ,  server:0
         ,  router:0
      }
   ,  Shared:{}
   ,  Interface: ai
   ,  Init:function(ops,onRdy,deps){
         var t=this.SetOptions(ops),o=t.op,z,zz
            ,  sv=o.server
            ,  rt=((sv)&&sv.$type!='class'&&sv.router)?sv.router:o.router
            ,  v=o.values
         ;

         if(2){//-Handle options
            o.options=Object.CopyTo({
                  useExitKey:2
               ,  exitKey:'escape'
            },o.options||{});
         }
         
         if(v)_(v);//Set values in ValReg.
         //out('sv.$type='+sv.$type);
         if(sv&&sv.$type!='class'){
            sv.router=rt;
            sv=$hs.server.Create(sv);
         }
         router=rt;server=sv;

         if(o.autoRun)t.Run();
      }
   ,  Public: {
            Exit:function(){}
         ,  Run:function(){
               //require('tty').setRawMode(true);
               var s=server,o=this.op,$o=o.options
                  ,  stdin=process.openStdin()
                  ,  tty=require('tty')
                  ,  fn=function (chunk, key) {
                        var k=key?key.name:'-';
                        //if(k=='q'||k=='Q')process.exit();
                        if((key&&key.ctrl&&k=='c')||(k==$o.exitKey))process.exit();
                     }
               ;
      
               if(s){
                  if($o.useExitKey){
                     tty.setRawMode(true);
                     stdin.on('keypress',fn) 
                  };
                  //s.on('close',function(){stdin.removeListener(fn)});
                  s.Start()
               }
            }
      
         ,  type:Property({readonly:2,Get:function(){return 'httpServer'}})
         ,  server:Property({readonly:2,Get:function(){return server}})
         ,  router:Property({readonly:2,Get:function(){return router}})
      }
});
