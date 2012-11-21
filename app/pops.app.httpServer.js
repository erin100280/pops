var X=exports,U=undefined,G=global,iidd=0
   ,	fs=require('fs')
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
         ,	$_AfterCreateApp_httpServer=function(app) {
         		//$pops.//out('$_AfterCreateApp_httpServer');
      			//$pops.cout('app='+JSON.stringify(app)+'\n');

         		var rv=$_AfterCreateApp(app), o=rv.op;
         		return rv;
         	}
         ,  CreateApp=$_CreateApp_httpServer=function(ops,onRdy){
         		//$pops.out('$_CreateApp_httpServer');
         		var rv=$_pahs_.app.Create([$_ops_, ops],onRdy,$_app_);
      			//$pops.cout('rv='+JSON.stringify(rv)+'\n');
      			//$pops.cout('rv.db='+JSON.stringify(rv.db)+'\n');

         		return $_AfterCreateApp_httpServer(rv);
      		}
   	;
   }.InnerStr()
}

var ap=X.app=Class('popsAppHttpServerApp',{
      options:{
            autoRun:2
      }
   ,	Extends: ab.app
   ,  PRIVATE:{pc: pc, X: X, fs: fs }
   ,  Private: {
            $hs: hs
         ,  autoRun: 2
         ,  server: 0
         ,  router: 0
      
      	,	cout: pc.cout
      }
   ,  Shared:{}
   ,  Interface: ai
   ,  Init:function(ops, onRdy, deps){
         //out('popsAppHttpServerApp - Init');
         Parent(ops);
         //out('popsAppHttpServerApp - Init 2');
         //var t=this.SetOptions(ops),o=t.op,z,zz
         var z;
       	if(this.op) {}//out('           if(this.op)              ');
       	else {};//out('           if(!this.op)              ');
         //out('ops='+JSON.SafeStr(ops)+'\n');
         if(!this.options) this.SetOptions(ops);
		   this.SetOptions(ops);
		   z=JSON.SafeStr(this);
		   fs.writeFileSync('c:/dev/this-httpapp.json', z, 'utf8');
         pc.cout.log.DumpSync();
         var t=this, o=this.options, z, zz
            ,  sv=o.server
            ,  rt=((sv)&&sv.$type!='class'&&sv.router)?sv.router:o.router
            ,  v=o.values
         ;


//out('oooo WAM | sv='+JSON.SafeStr(sv)+' oooo');

         if(0){//-Handle options
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
               var s=server,o=this.options,$o=o.options
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
