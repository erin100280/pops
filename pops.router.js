var X=exports,xx={}
,  nm='pops.router.router'
,  $http=require('http')
,  _pc=require('pops/pops.core')
	,	cout=_pc.cout

,	ir, rt
;
ir=X.iRouter=Interface({
      Add:'function|itm,arr,TO'
   ,  Process:'function|req,res,OnDone,cnt'
   ,  Refresh:'function'
});

rt=X.router=xx.rtr=Class(nm, {
      OPTIONS: {
				auto: 2
         ,  Else: function(req, res){
               res.writeHead(200, {"Content-Type": "text/plain"});
               res.end("Page Not Found.\n");
            }
         ,  matchCase: 0
         ,  name: nm+'.'+IID()
      }
   ,  INTERFACE: ir
   ,  INIT: function(op, OnRdy){
         var o=this.SetOptions(op).OP;

         this.$OnReady=OnRdy;
         this.$nm=o.name;
         this.Refresh();

      }
   ,  PUBLIC: {
				$nm: ''
			,  $OnReady: null
			,  $items: []
			,  $srv: null
			,	$isRouter: 2

         ,  Process: function(req, res, OnDone, from){
               var t=this, o=this.OP, hndlr, i=this.$items, ln=i.length, FN
					,	l=from? from : 0, k, kk, z, z2, zz, zp, re, mod='i', rx
					,	mc=2//o.matchCase
					,	u=(!(z=req.url) || z=='')? '/' : (mc? z : z.LCase())
					,	ul=u.length
					,	od=OnDone, go=2, ya=2
               ;
               //out(this.$nm+':  Process  | u='+u);
               
               while(l<ln&&go){
						z=i[l]; hndlr=z.handler; rx=z.regex; ya=2; 
						zp=(k=z.path)? ((mc)? k : k.LCase()) : 0;

						if((rx && ((zz=u.match(rx)) && zz.index==0)) || (zp && u==zp)) {
                     FN=function() { t.Process(req, res, od, l+1); };
                     go=0; //out('!ya');
                     if(z.mode=='STATIC'){}
                     else if(hndlr)
                        if(hndlr.ProcessRequest)
                        	hndlr.ProcessRequest(req, res, FN); 
                        else if(hndlr.$isStaticServer) {
                        	//pc.out('  ======== hndlr.$isStaticServer');
                        	kk=(rx&&zz&&!zz.index)? zz[0].length : (zp||'').length;
                        	z2=req.url.substring(kk);
                        	req.$path=(z2.length)? z2 : '/';
                        	hndlr.ProcessReq(req, res, FN); 
                        }
                        else hndlr(req, res, FN);
						};
      
						l++;
               };
               if(go && o.Else) o.Else(req, res);
               if(od) od(req, res, {});
               
            }
         ,  Refresh: function(){
               var o=this.OP, i=[];
               this.Add(o.items,i);
               this.$items=i;
               return this;
            }
         ,  Add: function(itm, arr, TO){
               var t=this,i=itm,to=TypeOf(i),a=arr?arr:this.$items, l,ll,z,zz,it;

               if(to=='array')
						for(l=0,z=i.length;l<z;l++)
               		this.Add(i[l],a);
               else if(to=='object'){
						if(i.path||i.regex){
                     //out('pow');
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
                           for(l=0,ll=it.length;l<ll;L++) this.Add(it[l], a, z);
                        };                     
                     };
						};
               };

               return this;
            }
      }
});
