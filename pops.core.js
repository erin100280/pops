var z,o=O={},G=global;
//Array.From=function(item){return item==null?[]:TypeOf(item)=='array'?item:[item];};
//Array.prototype.$type='array';
if(2){//-Setup system nodes.
   if(!G.$$modes){
      z=G.$$modes={};
      z.$os=process.platform;
   };
};

Function.Extend=function(key,val){
   if(typeof key=='string')eval("key={"+key+":val};");
   for(mb in key)this[mb]=key[mb];
};
Function.prototype.Extend=function(key,val){
   if(typeof key=='string')eval("key={"+key+":val};");
   for(mb in key)this[mb]=key[mb];
};
Function.Implement=function(key,val){
   if(typeof key=='string')eval("key={"+key+":val};");
   for(mb in key)this.prototype[mb]=key[mb];
};
Function.prototype.Implement=function(key,val){
   if(typeof key=='string')eval("key={"+key+":val};");
   for(mb in key)this.prototype[mb]=key[mb];
};
Function.ExtImp=function(key,val){
   if(typeof key=='string')eval("key={"+key+":val};");
   for(mb in key){this[mb]=key[mb];this.prototype[mb]=key[mb];};
};
Function.prototype.ExtImp=function(key,val){
   if(typeof key=='string')eval("key={"+key+":val};");
   for(mb in key){this[mb]=key[mb];this.prototype[mb]=key[mb];};
};

if(2){//-Native.
   String.Implement({
      LCase:String.prototype.toLowerCase,
      UCase:String.prototype.toUpperCase,
      Trim:function(){return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');},
      TrimL:function(){return this.replace(/^\s+/,'');},
      TrimR:function(){return this.replace(/\s+$/,'');},
      TrimFull:function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');},
      TrimCR:function(){
         var S=this.Val(),s=S.charCodeAt(S.length-1)==10?S.substr(0,S.length-1):S;
         return s.charCodeAt(s.length-1)==13?s.substr(0,s.length-1):s
      },
      Pad:function(len,pad,dir){
         var t=this,lf,rt,s=t.valueOf(),sl=s.length,
            d=(dir==0||dir==2)?dir:1,l=def(len)?len:0,p=def(pad)?pad:' '
         ;
         if(l + 1 >= sl){
            if(d==1){//Pad
               rt=Math.ceil((padlen=l-sl) / 2);
               lf=padlen-rt;
               s=Array(lf+1).join(p)+s+Array(rt+1).join(p);
            }
            else if(d==2)s=s+Array(l+1-sl).join(p);//PadR
            else s=Array(l+1-sl).join(p)+s;//PadL
         };
         return s;
      },
      PadL:function(len,pad,dir) {return this.Pad(len,pad,0);},
      PadR:function(len,pad){return this.Pad(len,pad,2);},
      Proper:function(){
         var n=this.valueOf()+'',
            x=n.split('.'),
            x1=x[0],
            x2=x.length > 1 ? '.' + x[1] : '',
            rgx=/(\d+)(\d{3})/
         ;
         while (rgx.test(x1)){
            x1=x1.replace(rgx, '$1' + ',' + '$2');
         };
         return x1+x2;
      },
      Val:String.prototype.valueOf
   });
   Function.Implement({
      $Run:function(){this.$run=2;return this;},
      Bind:function(that){
         var t=this,
            args=arguments.length>1?Array.slice(arguments, 1):null,
            F=function(){},
            bound=function(){
               var context=that,length=arguments.length;
               if(this instanceof bound){
                  F.prototype=t.prototype;
                  context=new F;
               };
               var result=(!args&&!length)
                  ? t.call(context)
                  : t.apply(context, args && length ? args.concat(Array.slice(arguments)) : args || arguments);
               return context==that?result:context;
            }
         ;
         bound.$$bound=2;
         return bound;
      },
      ACall:function(){
         var fn=this,a=arguments;
         process.nextTick(function(){
            var t=this,a=t.a;
            eval('t.fn('+$ArgsStr(a,'a')+');');
         }.Bind({a:a,fn:fn}));
      },
   });
   Number.Implement({
      Str:Number.prototype.toString,
      Proper:String.prototype.Proper,
      Val:String.prototype.valueOf
   });
   Array.Extend({
      Clone:function(v){
         var rv=[];
         for(lp=0;lp<v.length;lp++)rv.push(Clone(v[lp]));
         return rv;
      },
      From:function(item){return item==null?[]:TypeOf(item)=='array'?item:[item];},
      HasStr:function(arr,str,matchCase){
         var rv=false,a=arr,z,mc=matchCase,s=mc?str:str.LCase();
         for(lp=0;lp<a.length;lp++){
            if(IsStr(a[lp]))
               if(s==mc?a[lp]:a[lp].LCase())return true;
         };
         return rv;
      }
   });
   z=Array.prototype;
   Array.Implement({
      $type:'array',
      PopL:z.shift,
      PopR:z.pop,
      PushL:z.unshift,
      PushR:z.push,
   });
   Object.Extend({
      Clone:function(v){
         var rv={};
         for(mb in v)rv[mb]=Clone(v[mb]);
         return rv;
      },
      Merge:function(ob,ob2){
         var rv=ob?Object.Clone(ob):{};
         if(ob2)for(mb in ob2)rv[mb]=ob2[mb];
         return rv;
      },
      CopyTo:function(src,dest){
         var rv=dest,s=typeof rv;
         if((s=='object'||s=='function')&&src)
            for(mb in src)rv[mb]=src[mb];
         return rv;
      },
      HasVar:function(ob,nam,matchCase){
         var s,ss,z,mc=matchCase,n=IsArr(nam)?nam:[nam];
         for(lp=0;lp<n.length;lp++){
            z=0;s=mc?n[lp]:n[lp].LCase();
            for(mb in ob)if(s==(ss=mc?mb:mb.LCase()))z=2;
            if(!z)return false;
         };
         return true;
      }
   });
};
var z,
   $cr=o.$cr='\n',
   cout=o.cout=console.log,
   sout=o.sout=function(s){
      s=(typeof s=='string')?s:(s.toString)?s.toString():'';
      process.stdout.write(s);
   },
   Cls=console.Cls=function(){cout('\033[2J');},
   def=o.def=function(v){return typeof v!='undefined'?true:false;},
   udef=o.udef=undefined,
   typeOf=o.typeOf=function(v){
      return v==null?null:v&&v.$type?v.$type:typeof v;
   },
   TypeOf=o.TypeOf=function(v){
      return v==null?null:v&&v.$type?
         v.$type=='class'&&v.$name&&v.$name!=''?v.$name:v.$type:typeof v;
      
      
      
   }
;

if(2){//-Is??? functions[$$Is(),IsArr(),IsCls(),IsNum(),IsStr(),IsObj()]
   var $Is=o.$$Is=function(v,typ){
      if(!typ&&this.typ)typ=this.typ;
      return v&&v.$type?v.$type==typ?true:false:typeof v==typ?true:false;
   };
   o.IsArr=$Is.Bind({typ:'array'});
   o.IsCls=$Is.Bind({typ:'class'});
   o.IsFun=$Is.Bind({typ:'function'});
   o.IsNum=$Is.Bind({typ:'number'});
   o.IsObj=$Is.Bind({typ:'object'});
   o.IsStr=$Is.Bind({typ:'string'});
   o.IsOBJ=function(v){var z=typeof v;return z=='function'||z=='object'?true:false;};
};

o.Clone=function(v){
   switch (typeOf(v)){
      case 'array':
         v=Array.Clone(v);break;
      case 'class','function','object':
         v=Object.Clone(v);break;
   };
   return v;
};
o.$ArgsStr=function(args,nam){
   var rv='',a=args,n=nam?nam:'arguments';
   if(a)for(lp=0;lp<a.length;lp++)rv+=n+'['+lp+']'+(lp!=a.length-1?',':'');
   return rv;
};
o.Global=function(ob){Object.CopyTo(ob,global);};
o.Parent=function(){
   var a=arguments,ce=a.callee,cl=ce.caller,pi=cl.$pInst,p=cl.$fParent,
      nm=cl.$fName,z,zz,rv
   ;
   z=p.$extends;
   return Class.$$RunFn(z,nm,a,pi);
};

if(2){//mode system[Choose(),IsMode(),Modal(),Mode()]
   o.$$modes=global.$$modes={};
   o.Choose=function(nam,val){
      var rv,z,zz,n;
      if(IsStr(nam)&&val){
         z=nam.LCase();
         for(mb in val){
            if(rv==udef){
               zz=mb.split('_or_');
               for(lp=0;lp<zz.length;lp++){
                  n=zz[lp].LCase();
                  if(n!='$run'&&(n==z||n=='$else')){
                     rv=val[mb];
                     if(typeof rv=='function')
                        if(val.$run||rv.$run)rv=rv();
                  };
               };
            };
         };
         if(!def(rv)&&val.or)rv=val.or;
      };
      return rv;
   };
   o.IsMode=function(nam){
      nam=nam?IsArr(nam)?nam:[nam]:['main'];
      if(!nam.length)return false;
      for(lp=0;lp<nam.length;lp++)if(!$$modes[nam[lp].LCase()])return false;
      return true;
   };
   o.Mode=function(nam){
      var n=def(nam)?nam.LCase():'main',z=$$modes[n],v=$$modes[n]=z?z:null;
      return new function(n,v) {
         var name=n,val=v;
         this.Get=function(){return val;};
         this.Set=function(str){$$modes[name]=val=str;};
      }(n,v);
   };
   o.Modes=function(obj){
      if(IsOBJ(obj))for(mb in obj)$$modes[mb.LCase()]=obj[mb].LCase();
   };
   o.Modal=function(nam,val){
      if(!IsStr(nam)){val=nam;nam='main'};
      return nam&&val?o.Choose($$modes[nam.LCase()],val):udef;
   };
};

if(2){//Overloader[Overload()]
   o.Overload=function(val){
      var v=val?val:{},
         rv=function(){
            var t=this,fn=t.fns,A=arguments,z,oS,rv,aS=o.Overload.ArgSig(A);
            for(mmb in fn){
               oS=o.Overload.ObjSig(mmb);
               if(o.Overload.MatchSigs(aS,oS))
                  eval('rv=fn.'+mmb+'('+o.$ArgsStr(A,'A')+');');
            };
            return rv;
         },
         z={$type:'overload',fns:{}}
      ;

      for(mb in v){
         if(0){}
         else z.fns[mb]=v[mb];
      };
      
      return rv.Bind(z);
   };
   o.Overload.Extend({
      ArgSig:function(args){
         var rv=[],a,z;
         for(lp=0;lp<args.length;lp++){
            a=args[lp];z=o.typeOf(a);
            rv.push((z=='class'&&((a.$name)&&a.$name.length))?[z,a.$name.LCase()]:[z]);
         };
         return rv;
      },
      ObjSig:function(str){
         var rv=[],a,z,zz,nez2;
         a=str.split('_or_');
         for(lp=0;lp<a.length;lp++){
            ne=[];
            z=a[lp].split('_');
            for(lp2=0;lp2<z.length;lp2++){
               z2=z[lp2];
               zz=(z2=='$')?['?']:z2.split('$');
               zz[0]=o.Choose(zz[0].LCase(),{
                  a_or_array:'array',
                  c_or_class:'class',
                  f_or_function:'function',
                  n_or_number:'number',
                  o_or_object:'object',
                  s_or_string:'string',
                  $_or_any:'any',
                  $else:'$other'
               });
               ne.push(zz);
            };
            rv.push(ne);
         };
         return rv;
      },
      MatchSigs:function(aSig,oSig){
         var as=aSig,os=oSig,z,zz,z1,z2,gd,a,o,aa,oo,a2,o2;
         
         for(lp=0;lp<os.length;lp++){
            o=os[lp];gd=2;
            if(as.length!=o.length)gd=0;
            for(l2=0;l2<o.length;l2++){
               a2=as[l2];o2=o[l2];
               aa=a2[0];oo=o2[0];
               if(aa!=oo)fd=0;
               if(gd&&aa=='class'){
                  if(a2.length!=o2.length)gd=0;
                  if(a2.length>1)
                     if(a2[1]!=o2[1])gd=0;
               };
            };
            if(gd)return true;
         };
         return false;
      },
   });
};

var Class=o.Class=function(op,onld){
   var z=2,zz,
      rv=function(op,onld){return Class.$$InitClass(this,op,onld);},
      o=op?op:{},pp,
      z=o.Extends,extd=z?z:null,
      v=o.Implements,impl=v?Array.From(v):0,
      z=o.$name,nm=z?z:''
   ;
   
   z=extd;rv.$extends=z;rv.prototype.$extends=z;
   rv.ExtImp({
      $extends:extd,
      $name:nm,
      $type:'Class',
      Kill:function(){
         
      }
   });
   if(z){
      for(mm in z.prototype){
         if(mm=='$extends'||mm=='$op'){}
         else{rv.prototype[mm]=z.prototype[mm];};
      };
   }
   else{
      rv.Implement({
         $type:'class',
         $inst:true,
         On:function(evt,fn){return $$evtSys.On(this,evt,fn);},
         $On:function(evt,fn){return $$evtSys.On(this,evt,fn,2);},
         SetOptions:function(op,op2){return Class.$$SetOptions(this,op,op2);},
         FireEvent:function(e){$$evtSys.Fire(this,e);},
         Fire:function(e){$$evtSys.Fire(this,e);}
      });
      rv.ExtImp({
      });
      if(O.IsStr(o.$name)){pp=o.$name.Trim();if(pp!='')rv.$name=pp;};
      rv.Extend({
         $type:'class',
         $Reg:function(nam){O.Class.Reg(this,nam)}.Bind(rv)
      });
   };


   for(mm in o){
      if(mm=='Extends'||mm=='Implements'){}
      else if(mm=='options')rv.prototype.$op=o[mm];
      else{
         z=o[mm];zz=TypeOf(z);
         if(zz=='function'){z.$fParent=rv;z.$fName=mm;};
         rv.prototype[mm]=z;
      };
   };
   
   return rv;
};
o.Class.Extend({
   $$InitClass:function(v,op,onld){
      for(mb in v)if(TypeOf(v[mb])=='function')v[mb].$pInst=v; 
      var rv=v.Init?v.Init(op,onld):v;
      v.FireEvent(Event('load'));
      v.FireEvent(Event('ready'));
      return rv;
   },
   $$RunFn:function(v,nam,args,pInst,notRecursive){
      var rv=null,a=args,s='',xt=0,z=0,zz=pInst,pi=zz?zz:v;
      if(v){
         xt=v.$extends;
         zz=pInst==v?v[nam]:v.prototype[nam];
         if(zz){z=2;eval("rv=zz.Bind(pi)("+$ArgsStr(a,'a')+");");};
      };
      if(!z&&xt&&!notRecursive)rv=Class.RunFn(xt,nam,args,pi);
      return rv;
   },
   $$SetOptions:function(v,op,op2){
      if(!op2&&(v.$op||v.options)){op2=op;op=v.$op?v.$op:v.options;};
      v.op=v.options=Object.Merge(op,op2);
      return v;
   },
   $$classes:{},
   Reg:function(t,nam){
      var n=(O.IsStr(t.$name))?t.$name:(nam)?nam:'',z;
      z=((O.IsStr(t.$name))?t.$name:(nam)?nam:'').Trim();
      n=n.Trim();
      if(n!='')O.Class.$$classes[n]=t;
   }
});

var $$evtSys={
   On:function(v,evt,fn,sys){
      var z=sys?'sys':'std',zz,ev=v.$$evts?v.$$evts:v.$$evts=[];
      if(typeof evt=='string'){zz=evt;evt={};evt[zz]=fn;};
      for(mb in evt){
         z2=ev[mb]?ev[mb]:ev[mb]={};
         ar=z2[z]?z2[z]:z2[z]=[];
         ar.push(evt[mb]);
      };
   },
   Fire:function(v,e){
      var z,zz,z2,ar,ev;
      e.caller=v;
      if(ev=v.$$evts){
         if(z2=ev[e.$$nam]){
            e.$$sys=z2.sys?Array.Clone(z2.sys):[];
            e.$$std=z2.std?Array.Clone(z2.std):[];
         };
      };
      if(e.$$Fire)e.$$Fire();
   },
};
o.Event=function(nam,args){
   var rv=function(){};
   rv.Extend({
      args:args,
      $$nam:nam,
      $$std:[],
      $$sys:[],
      $$Fire:function(){
         var t=this,st=t.$$std,sy=t.$$sys,z,zz;
         if(t.$$rng)return;
         t.$$rng=2;t.$$async=0;
         
         while(z=sy.pop()){
            zz=z(t);
            if(t.$$async){t.$$rng=0;return;};
            if(t.$$stop){return;};
         };
         while(z=st.shift()){
            zz=z(t);
            if(t.$$async){t.$$rng=0;return;};
            if(t.$$stop){return;};
         };
         t.$$rng=0;
      },
      Done:function(){this.$$async=0;if(!this.$$rng)this.$$Fire();},
      Async:function(){this.$$async=2},
      Stop:function(){this.$$stop=2}
   });
   return rv;
};

if(2){//-loaders[PLoad()]
   z=o.PLoad=function(nam){
      var zz=PLoad.$$sys[nam.LCase()],fn=IsStr(zz)?zz:'';
      return fn.length?require(fn):{};
   };
   z.$$sys={};
   z.$$loaded={};
};

if(2){//-object builder[BuildOb(),oBuild]
   z=o.BuildOb=function(op){

   };
   z=o.oBuild2=function(op){
      var t=this;
      t.op=op=Object.Merge({
         inputs:1
         
      },op);
      
      
   };
   z=o.oBuild=new Class({
      options:{
         inputs:1,
         onDone:0,
      },
      Init:function(op,rdy){
         var t=this.SetOptions(op),od=t.op.onDone;
         if(IsFun(od))t.On('done',od);
      },
      Get:function(key){
         return(arguments.length)?IsStr(key)?this.dat[key.LCase()]:udef:this.dat;
      },
      Set:function(key,val){
         var t=this,d=t.dat,k=key;
         if(IsStr(k))d[k]=val;
         else if(IsOBJ(k))
            for(mb in k)d[mb]=k[mb];
         t.iCnt++;
         return t;
      },
      $Check:function(){
         var t=this,d=t.dat,i=t.op.inputs,zz=0,z=IsNum(i)?i:0;
         if(IsArr(i))zz=Object.HasVar(d,i);
         else zz=t.iCnt>=z?2:0;
         if(zz)t.Fire(Event('done',{builder:t,ob:d}));
      },
      dat:{},
      iCnt:0,
   });
};

//for(mb in o)exports[mb]=global[mb]=o[mb];
for(mb in o)exports[mb]=o[mb];