var X=exports,G=global,iidd=0
   ,  pc=require('pops/pops.core')
   ,  pdb=require('pops/pops.db')
//   ,  pdb=require('pops/db/pops.db.mongo')
;
eval(pc.$VarStr(pc,'pc'));

var ai=X.appInterface=Interface({z:0
   ,  Exit:'function|ops'
   ,  type:'property'
});

X.Outline=G.$_Outline_=function(ops){
   //out('ops='+JSON.stringify(ops)+'\n');
   var i1=iidd++,op=Object.Clone(ops||{})
      ,  o=G.$$gfdjgh=CreateOptions([
               {
                     appVar: 'app'
                  ,  core: {
                           global: 2
                        ,  globalVar: 2
                        ,  varName: 'core'
                     }
                  ,  databases: {
                     
                     }
                  ,  modules: {
                           options: {
                                 appRootVar:2
                              ,  global:0
                              ,  globalVar:0
                              ,  rootVar:2
                           }
                     }
                  ,  libs:{}
                  ,  logging: {
                           options: {}
                        ,  logs: {
                                 main:{
                                       console:2
                                    ,  file:0
                                    ,  db:0
                                 }
                           }
                        ,  main: 'main'
                        ,  messages: {
                                 first: 'First app log.'
                              ,  outline: {
                                       done: ''
                                    ,  init: ''
                                 }
                              ,  app: {
                                       done: ''
                                    ,  exit: ''
                                    ,  exiting: ''
                                    ,  exitRequest: ''
                                    ,  init: ''
                                 } 
                           }
                     }
                  ,  globals:{} 
                  ,  vars:{}
                  ,  values:{}
               }
            ,  ops||{}]
         )
      ,  oc=o.core
      ,  s=function(){
            var $_l_,$_i_,$_z_,$_zz_,$_k_, $_kk_, $_pk_, $_z1_,$_z2_,$_z3_,$_z4_, $_m_
            	,	$_nm_, $_to_, $_op_
               ,  $_ops_=$$gfdjgh
               ,  $_pc_=$_P_
               ,  $_reg_=$_pc_._.Reg
               ,  $_app_={
                        modules:{}
                     ,  vars:{}
                     ,  logging:{
                           logs:{
                                 main:{
                                       console:2
                                    ,  file:0
                                    ,  db:0
                                 }
                           }
                        }
                  }
               ,  $_pa_=require('pops/app/pops.app.base')
               ,  $_D_=$_pa_.Outline
            ;
            //out('$_ops_='+JSON.stringify($_ops_)+'\n');

            delete global.$$gfdjgh;
            
            eval('var '+$_ops_.appVar+'=global.'+$_ops_.appVar+'=$_app_;');
            
            if($_z_=$_ops_.core){//-core
               if($_z_.global)$_pc_.Global.Pops();
               if($_z_.globalVar)global[$_z_.varName]=$_pc_;
               $_app_[$_z_.varName]=$_pc_;
            }
   
            if($_z_=$_ops_.globals){//-globals
               $_pc_.Global($_z_);
               delete $_ops_.globals;
            };

            if($_z_=$_ops_.modules){//-modules
               $_m_=$_D_.modules;
               //$_op_=$_z_.options||$_m_.options;
               $_op_=Object.CopyTo({}, [$_m_.options, $_z_.options]);
               $_z4_=$_app_.modules;

               for($_nm_ in $_z_){
                  $_z1_=$_z_[$_nm_];//.LCase().replace('.','_');
                  $_to_=typeof $_z1_;
                  if($_to_=='string'||$_to_=='number'||$_to_=='boolean')
                     $_z1_={name:$_z1_};
                  $_z1_=Object.CopyTo({}, $_op_, $_z1_);
                  
                  
                  //out('-'.Repeat(60)+'\n$_D_='+$_pc_.$Str($_D_,2)+'\n'+'-'.Repeat(60));
                  
                  if(($_z2_=$_m_.keys[$_z1_.name])){
                     $_zz_=$_m_.root+'/'+$_z2_;
                     //out('$_zz_='+$_zz_)
                     $_z3_=require($_zz_);
                     if($_z1_.global)$_pc_.Global($_z3_);
                     if($_z1_.globalVar)global[$_nm_]=$_z3_;
                     if($_z1_.rootVar)eval('var '+$_nm_+'=$_z3_;');
                     if($_z1_.appRootVar)$_app_[$_nm_]=$_z3_;
                     $_z4_[$_nm_]=$_z3_;
                  }
               };
            }
         
            if($_z_=$_ops_.vars){//-vars
               $_m_=$_D_.vars;
               $_op_=$_z_.options||$_m_.options;
               $_z4_=$_app_.vars;
               
               for($_nm_ in $_z_){
                  $_z1_=$_z_[$_nm_];//.LCase().replace('.','_');
                  $_to_=typeof $_z1_;
                  if($_to_=='string'||$_to_=='number'||$_to_=='boolean')
                     $_z1_={val:$_z1_};
                  $_z2_=Object.CopyTo({},$_op_);
                  $_z1_=Object.CopyTo($_z2_,$_z1_);
                  
                  eval('var '+$_nm_+'=$_z1_.val');
                  $_z4_[$_nm_]=$_z1_.val;
                  if($_z1_.appRootVar)$_app_[$_nm_]=$_z1_.val;
               };
            }
         
            if($_z_=$_ops_.logging){//-logging
               
            }

            if($_z_=$_ops_.values){//-values
               $_z_=Array.From($_z_);
               for($_i_=0, $_l_=$_z_.length; $_i_<$_l_; $_i_++)
                  //if($_k_=$_z_[$_i_])
                     //for($_nm_ in $_k_||{}){}
                  for($_nm_ in $_k_=$_z_[$_i_]||{})
                     $_reg_($_nm_, $_k_[$_nm_]);
            }

            if($_z_=$_ops_.databases) {//-databases
               //out('-databases');
	            //out('$_z_='+JSON.stringify($_z_)+'\n');
               $_z_=CreateOptions(Array.From($_z_));
	            //out('$_z_='+JSON.stringify($_z_)+'\n');

               var $_o_, $_op_=$_z_.OPTIONS || {};
	            //out('$_op_='+JSON.stringify($_op_)+'\n');

               for($_nm_ in $_z_) {
                  if($_nm_!='OPTIONS') {
	                  //out('$_nm_='+$_nm_);
	                  $_k_=$_z_[$_nm_]=Object.CopyTo({}, [$_Outline_.db, $_z_[$_nm_]]);
							$_o_=Object.CopyTo({}, [$_op_, $_k_]);
			            //out('$_o_='+JSON.stringify($_o_)+'\n');
							if($_o_.createVar) {//- Create local var to reference the db after construction.
								//out('var '+($_o_.varPrefix||'')+($_o_.varName||$_nm_)+';');
								eval('var '+($_o_.varPrefix||'')+($_o_.varName||$_nm_)+';');
							};
						};
					};
            };

            var CreateApp=function(ops, onRdy) {
            	$pops.cout('CreateApp');
            	var rv=$_pa_.app.Create([$_ops_, ops], onRdy);
         	};
         
         }.InnerStr()
   ;
   //G[$$gfdjgh+i1]=G.$$gfdjgh=ops||{};
   //out('o='+JSON.stringify(o)+'\n');
   if(oc.global)Global.Pops();
   if(oc.globalVar)global[oc.varName]=pc;

   return s;
}.Extend({//- Defaults.
      modules:{
            options:{
                  appRootVar:2
               ,  global:0
               ,  globalVar:0
               ,  rootVar:2
            }
         ,  root:'pops'
         ,  keys:{
                  core:'pops.core'
               ,  app:'pops.app'
               ,  app_httpserver:'app/pops.app.httpserver'
               ,  router:'pops.router'
            }
      }
   ,  vars:{
            options:{
                  appRootVar:2
               ,  val:null
            }
      }
	,	db: {
				name: '<not named>'
			,	host: 'localhost'
			,	port: 00
			,	autoConnect: 2
		}
});
var ap=X.app=Class('popsAppBaseApp',{
      options:{
         
      }
   ,  Interface: ai
   ,  PRIVATE: { pc:pc, X:X }
   ,  Shared:{
            Private:{pc:pc,X:X}
         ,  Create:function(){
               eval('var ap=X.app,rv=new ap('+pc.ArgStr(arguments)+');')
               return rv;
            }
      }
   ,  Private: {
            type:'httpServer'
			,	$db: {}
			,	cout: pc.cout
			,	pdb: pdb

			,	CreateDatabases: function() {
					cout('CreateDatabases');
					var t=T, o=t.op, nm, k, z, zz
						,	db=o.databases||{}
						,	dbo=db.OPTIONS||{}
					;
					cout('o='+JSON.stringify(o)+'\n');
					cout('o.databases='+JSON.stringify(o.databases)+'\n');
					cout('db='+JSON.stringify(db)+'\n');

					for(nm in db) {
						if(nm!='OPTIONS') {
							cout('CreateDatabases - nm='+nm);
							k=db[nm];
							z=Object.CopyTo({}, [dbo, k])
							db[nm]=pdb.db([k, { autoConnect: 0 }]);
						};
					};
				
				
				}
      }
   ,  Init:function(ops, onRdy){
         cout('popsAppBaseApp - Init 1');
         $pops.cout('ops='+JSON.stringify(ops)+'\n');
         var t=this.SetOptions(ops),o=t.op,tp=o.type;
         $pops.cout('o='+JSON.stringify(o)+'\n');
			CreateDatabases();
			

         cout('popsAppBaseApp - Init 2');

      }
   
   ,  Exit:function(){}

   ,  type:Property({readonly:2,Get:function(){return type}})
});
