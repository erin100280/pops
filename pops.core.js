exports.SandBox=function(code,vars){
   var _$g=global,exports=undefined,_$n,_$v=vars?vars:{};
   for(_$n in _$g)eval('var '+_$n+'=undefined;');
   for(_$n in _$v)eval('var '+_$n+'=v.'+_$n+';');
   delete _$v,vars,_$g,_$n;
   //v=vars=g=n=undefined;
   if(typeof code=='string')eval(code);
   else throw('pops.SandBox: code must be string.');
};
var z,z2,z3,z4,zz,x,l,p,fn=Function,G=global,o=O=pops=G.$_P_=G.$pops={};

if(2){//-Setup system nodes.
   if(!G.$$modes){
      z=G.$$modes={};
      z.os=z.$os=process.platform;
   };
};

if(2){//-misc. (var'd) [cout(),sout(),Cls(),def(),Type(),typeOf(),TypeOf(),udef]
   var z,$cr=O.$cr='\n'
      ,  _t=O._t=true , _f=O._f=false
      ,  Blank=O.Blank=function(){return function(){}}
      ,  cout=o.cout=console.log
      ,  Cls=console.Cls=o.Cls=function(){cout('\033[2J');}
      ,  def=o.def=function(v){return typeof v!='undefined'?_t:_f;} , udef=o.udef=undefined
      ,  sout=o.sout=function(s){
            s=(typeof s=='string')?s:(s.toString)?s.toString():s;
            process.stdout.write(s);
         }
      ,  typeOf=o.typeOf=function(v){return v==null?v:v&&v.$type?v.$type:typeof v}
      ,  TypeOf=o.TypeOf=function(v){
            return v==null?null:v&&v.$type?
               v.$type=='class'&&v.$name&&v.$name!=''?v.$name:v.$type:typeof v;
         }
   ;
}
if(2){//-Function modifiers [Extend(),ExtImp(),Implement()]
   z=Function;z2=z.prototype;
   zz=z2.Prim=function(){this.$prim=2;return this;};zz.$prim=2;
   z4=z.Bind=z2.Bind=function(that,meta){
      var t=this,m=meta,mm,
         args=arguments.length>2?Array.slice(arguments, 1):null,
         F=function(){},
         rv=function(){
            var context=that,length=arguments.length;
            if(this instanceof rv){
               F.prototype=t.prototype;
               context=new F;
            };
            var result=(!args&&!length)
               ? t.call(context)
               : t.apply(context, args && length ? args.concat(Array.slice(arguments)) : args || arguments);
            return context==that?result:context;
         }
      ;
      rv.$$bound=2;
      if(m)for(mm in m)rv[mm]=m[mm];
      return rv;
   };
   z4.$prim=2;
//*
   z.Extend=z2.Extend=function(key,val,prim){
      var mb,k=key,p=prim;
      if(typeof k=='string'){k={};k[key]=val;}
      else p=val;
      for(mb in k){
         zz=k[mb];
         if(mb=='$Prim')this.Extend(zz,2);
         else{
            if(p)zz.$prim=2;
            this[mb]=zz;
         };
      };
      return this;
   }.Prim();
   z.ExtImp=z2.ExtImp=function(key,val,prim){
      var t=this,mb,k=key,p=prim,m=t.$$md,m=m==0||m==2?m:1
         ,  fn=[t.Extend,t.ExtImp,t.Implement][m]
      ;
      if(typeof k=='string'){k={};k[key]=val;}
      else p=val;
      for(mb in k){
         zz=k[mb];
         if(mb=='$Prim')fn(zz,2);
         else{
            if(p)zz.$prim=2;
            if(m==0||m==1)t[mb]=zz;
            if(m==1||m==2)t.prototype[mb]=zz;
         };
      };
      return this;
   }.Prim();
   //z.Extend=z2.Extend=z.ExtImp.Bind({$$md:0}).Prim();

   z.Implement=z2.Implement=function(key,val,prim){
      var mb,k=key,p=prim;
      if(typeof k=='string'){k={};k[key]=val;}
      else p=val;
      for(mb in k){
         zz=k[mb];
         if(mb=='$Prim')this.Implement(zz,2);
         else{
            if(zz)if(p)zz.$prim=2;
            this.prototype[mb]=zz;
         };
      };
      return this;
   }.Prim();
};
if(2){//-Native.
   Function.Implement({
      $Prim:{
            $$Sys:function(){this.$$sys=2;return this}
         ,  $Run:function(){this.$run=2;return this}
         ,  aApply:function(args,This){
               var fn=this,t=This;
               process.nextTick(function(){
			         eval('fn'+((t)?'.Bind(t)':'')+'('+$ArgsStr(args,'args')+');');
               });
               return this;
            }
         ,  aCall:function(){this.aApply(arguments)}
         ,  Call:function(args){
               var a=args||{},rv;
               eval('rv=this('+O.ArgStr(a,'a')+');');
               return rv;
            }
         ,  Caller:function(){
               var t=this,f=t.$isCaller?t.fn:t;
               return function(){return f.Call(arguments)}.Extend({$isCaller:2})               
            }
         ,  Hidden:function(){this.$hidden=2;return this}
         ,  InnerStr:function(){
               return this.toString().replace(/^function.*\{/,'').replace(/\}$/,'');
            }
         ,  Private:function(){this.$private=2;return this}
         ,  Protected:function(){this.$protected=2;return this}
         ,  Shared:function(){this.$shared=2;return this}
         ,  PrivShare:function(){this.$private=this.$shared=2;return this}
         ,  Reg:function(nam){return _.Reg(nam,this)}
         ,  Str:Function.prototype.toString
      }
   });
   String.Implement({
      $Prim:{
            Fun:function(op){
               var z=this.valueOf().split('|'),rv,a='',s=z[0],o=op||{};
               if(z.length>1){a=s;s=z[1];}
               eval('rv=function('+a+'){'+s+'};');
               return rv.Extend(o);
            }
         ,  FunRun:function(op){return this.Fun(Object.CopyTo({$run:2},op||{}))}
         ,  LCase:String.prototype.toLowerCase
         ,  Pad:function(len,pad,dir){
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
            }
         ,  PadL:function(len,pad,dir) {return this.Pad(len,pad,0);}
         ,  PadR:function(len,pad){return this.Pad(len,pad,2);}
         ,  Proper:function(){
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
            }
         ,  Repeat:function(x){var l,rv='';for(l=0;l<x;l++)rv+=this.valueOf();return rv;}
         ,  Replace:function(old,val,all){
               var l,a=(old.$type=='array')?old:[[old,val]],rv=this.valueOf(),ln=a.length;
               for(l=0;l<ln;l++){
                  if(all)while(rv.search(a[l][0])>-1)rv=rv.replace(a[l][0],a[l][1]);
                  else rv=rv.replace(a[l][0],a[l][1]);
               }
               return rv;
            }
         ,  ReplaceAll:function(old,val){return this.Replace(old,val,2);}
         ,  SS:function(){return O.SS(this.valueOf())}
         ,  Trim:function(){return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');}
         ,  TrimCR:function(){
               var S=this.Val(),s=S.charCodeAt(S.length-1)==10?S.substr(0,S.length-1):S;
               return s.charCodeAt(s.length-1)==13?s.substr(0,s.length-1):s
            }
         ,  TrimFull:function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');}
         ,  TrimL:function(){return this.replace(/^\s+/,'');}
         ,  TrimR:function(){return this.replace(/\s+$/,'');}
         ,  UCase:String.prototype.toUpperCase
         ,  Val:String.prototype.valueOf

         ,  RemoveComments:function(){
               var t=this,v=t.valueOf();
               
            }
      }
   });
   Number.Implement({
      $Prim:{
            Str:Number.prototype.toString
         ,  Proper:String.prototype.Proper
         ,  Val:String.prototype.valueOf
      }
   });
   Array.Extend({
         Clone: function(v) {
            var rv=[],ln=v.length;
            for(lp=0;lp<ln;lp++)rv.push(Clone(v[lp]));
            return rv;
         }
      ,  Merge: function(dest, src, recursive) {
            var i,ii,l,ll,z,zz, a=arguments, rv=dest, sr=src||[]
               ,  notFirst=(a.length>3)?a[3]:0;
            ;

            s=sr;
            for(i=0, l=s.length; i<l; i++) {
               z=s[i];
               if(z.$type=='array'&&recursive)
                  z=Array.Merge([], z);
               rv.Push(z);
            }
            return rv;
         }
      ,  From: function(v){return(typeof v=='undefined'||v==null)?[]:(v.$type=='array')?v:[v];}
      ,  HasStr: function(arr,str,matchCase) {
            var rv=false,a=arr,z,mc=matchCase,s=mc?str:str.LCase(),ln=a.length;
            for(lp=0;lp<ln;lp++){
               if(IsStr(a[lp]))
                  if(s==mc?a[lp]:a[lp].LCase())return true;
            };
            return rv;
         }
   });
   z=Array.prototype;
   Array.Implement({
         $type:'array'
      ,  $Prim:{
               Has:function(v,CaSe){
                  var t=this,l,s=CaSe,z,ss;
                  if(typeof v=='string'){ss=2;s=0;v=CaSe?v:v.LCase();}
                  for(l=0;l<t.length;l++){
                     z=t[l];z=(typeof z=='string'&&!s)?CaSe?z:z.LCase():z;
                     if((s&&v===z)||(!s&&v==z))return true;
                  }
                  return false;
               }
            ,  PopL:z.shift , PopB:z.shift
            ,  PopR:z.pop , PopT:z.pop , Pop:z.pop
            ,  PushL:z.unshift , PushB:z.unshift
            ,  PushR:z.push , PushT:z.push , Push:z.push
         }
   });
   Object.Extend({
         Clone:function(v){
            //var rv=O.IsFun(v)?function(){}:{};
            var rv={},mb;
            for(mb in v)
               if((v[mb])&&!v[mb].$prim&&!rv[mb]){
                  rv[mb]=O.Clone(v[mb]);
               };
            return rv;
         }
      ,  CopyTo:function(dest,src,recursive){
            var mb,rv=dest||{},s=typeof rv,sr=Array.From(src),i,z,zz,k,ln=sr.length;
            for(i=0;i<ln;i++){
               z=sr[i];
               for(mb in z){
                  k=zz=z[mb];
                  if(typeof zz=='object' && recursive){
                     k=rv[mb] || {};
                     Object.CopyTo(k,zz,2)
                  }
                  rv[mb]=k;
               };
            }
               
            return rv;
         }
      ,  HasVar:function(ob,nam,matchCase){
            var s,ss,z,mc=matchCase,n=IsArr(nam)?nam:[nam],ln=n.length;
            for(lp=0;lp<ln;lp++){
               z=0;s=mc?n[lp]:n[lp].LCase();
               for(mb in ob)if(s==(ss=mc?mb:mb.LCase()))z=2;
               if(!z)return false;
            };
            return true;
         }
      ,  LCase:function(obj, recursive, upper){
            var z,z2,nm,o=obj||{},rv={}, fn=(upper)?'UCase':'LCase';
            for(nm in o){
               z=o[nm];
               rv[nm[fn]()]=(typeof z=='object'&&recursive)?Object[fn](z,2,upper):z;
            }
            return rv;
         }
      ,  UCase:function(obj, recursive){return Object.LCase(obj, recursive,2)}
      ,  Merge:function(ob,ob2){
            var rv=ob?Object.Clone(ob):{};
            if(ob2)for(mb in ob2)rv[mb]=ob2[mb];
            return rv;
         }
   });
};
if(2){//-misc 2. (var'd) [cout(),sout(),Cls(),def(),Type(),typeOf(),TypeOf(),udef]
   var z
      ,  $Str=O.$Str=function(v,recursive,spacing,times,rMax,tim){
            var r=recursive,z=spacing,sp=z?z:0
               ,  T=typeOf(v),rv='',z=times,x=def(z)?z:3
               ,  r=rMax,rm=def(r)?r:1,tm=def(tim)?tim:0,r=(recursive&&tm<rm)?2:0
            ;
            if(v){
               rv+=' '.Repeat(sp*x);
               z=v.$$type;
               if(T=='string'||T=='number'||T=='boolean')rv+=T+': '+v+'\n';
               else if(T=='function'||T=='class'||z=='type'||z=='struct'){
                  rv+=T+':\n';if(r)rv+=$Str.Fun(v,r,sp+1,x);
               }
               else{rv+=T+'::\n';if(r)rv+=$Str.Obj(v,r,sp+1,x);}
            }            
            return rv;
         }.Extend({
               Fun:function(v,recursive,spacing,times,rMax,tim){
                  var z,prm=0,k,m,zz,s,l,sp=spacing,T=typeOf(v),rv='',x=times
                     ,  rm=rMax,tm=tim,r=recursive
                  ;
                  z='';zz=v.toString().split('\n');k=' '.Repeat((sp+1)*x);
                  for(l=0,s=zz.length;l<s;l++)z+=k+zz[l]+'\n';
                  rv+=' '.Repeat(sp*x)+'code:\n'+z+'\n';
                  rv+=' '.Repeat(sp*x)+'members:\n';
                  for(m in v){
                     z=v[m];k=typeOf(z);
                     if(z&&(!z.$prim||prm)){
                        rv+=' '.Repeat((sp+1)*x)+m+':\n';
                        rv+=r?$Str(z,r,sp+2,x,rm,tm+1):' '.Repeat((sp+2)*x)+k+':\n';
                     }
                  }
               
                  return rv;                  
               }
            ,  Obj:function(v,recursive,spacing,times,rMax,tim){
                  var z,k,m,zz,s,l,sp=spacing,T=typeOf(v),rv='',x=times
                     ,  rm=rMax,tm=tim,r=recursive
                  ;
                  rv+=' '.Repeat(sp*x)+'members:\n';
                  for(m in v){
                     z=v[m];k=typeOf(z);
                     rv+=' '.Repeat((sp+1)*x)+m+':\n';
                     rv+=r?$Str(z,r,sp+2,x,rm,tm+1):' '.Repeat((sp+2)*x)+k+':\n';
                  }
               
                  return rv;                  
               }
         })
      ,  Obj=O.Obj=function(v){
            var rv={},n,z,hs=['$$ob','Obj','$type','$$type'];
            for(n in v){
               z=v[n];
               if(!z.$prim&&!hs.Has(n,2))rv[n]=z;
            }
            return rv;
         }
      ,  _=O._=O._$=function(v){
            var vs=_.$$vals,z,o,k;
            if(O.IsStr(v)){
               v=v.LCase();
               for(z in vs)if(z==v)return vs[z];
            }
            else
               for(z in vs){
                  o=vs[z];k=typeof o;
                  if(k=='boolean'||k=='number'||k=='string')if(vs[z]==v)return z;
                  else if(vs[z]===v)return z;
               }
            return udef;
         }.Extend({
               $$vals:{}
            ,  Reg:function(nam,v){
                  var n=nam,v=v?v:{},j=v.$$type,k=v.$type,l=v.$name;
                  n=(n&&n!='')?n:(j=='type')?k:(k=='class'||k=='struct')?l:'!!';
                  _.$$vals[n]=v;
                  return v
               }
               
         })
      ,  _=O._=O._$=function(v,vv){
            var vs=_.$$vals,z,zz,o,k,rv=undefined,a=arguments,al=a.length;
            
            switch(al){
               case 1:
                  k=typeof v;
                  if(k=='string'||k=='number'||k=='boolean')
                     for(z in vs)if(z==v)rv=vs[z];
                  else for(z in v)vs[z]=v[z];
               break;
               case 2:
                  vs[v]=vv;
               break;
               default:
                  
            };
            return rv;
         }.Extend({
               $$vals:{}
            ,  Reg:function(nam,v){
                  var n=nam,v=v?v:{},j=v.$$type,k=v.$type,l=v.$name;
                  n=(n&&n!='')?n:(j=='type')?k:(k=='class'||k=='struct')?l:'!!';
                  _.$$vals[n]=v;
                  return v
               }
               
         })
      ,  NEW=O.NEW=function(cls, args) {
            eval('var rv=new cls('+pc.ArgStr(arguments)+');');
            return rv;
         }
      ,  Type=O.Type=function(nam,ob,$$t){
            //var ob=obj?obj:{},rv=(retain)?ob:{},op=ob.prototype,p=rv.prototype,z=proto?op:ob;
            var o=ob?ob:{},op=o.prototype,p,z=o.$Init,i=z?z:Blank,T=$$t?$$t.LCase():'type';
            return function(){
               i.apply(this,arguments);
               return this;
            }.Extend(ob).Implement(ob.prototype).ExtImp({$type:nam.LCase(),$$type:T,$$ob:ob});
         }
      ,  Struct=O.Struct=function(nam,v){
            return Type(nam,Blank().Implement(v),'struct').Implement({
               Obj:function(){return Obj(this)}
            });
         }
   ;
}
if(2){//-Property Setters [Prim(),Private(),PrivShare(),Shared()]
   Object.CopyTo(O,{
         Hidden:function(v){v.$hidden=2;return v;}
      ,  Prim:function(v){v.$prim=2;return v;}
      ,  Private:function(v){v.$private=2;return v;}
      ,  PrivShare:function(v){v.$private=v.$shared=2;return v;}
      ,  Protected:function(v){v.$protected=2;return v;}
      ,  Shared:function(v){v.$shared=2;return v;}
   });
}
O.SS=function(v){//-SmallScript
   var rv='',l,b=false,i,s,q,d,z=O.SS.BreakDown(v),ln=z.length;
   for(l=0;l<ln;l++){
      i=z[l];q=i.qt;
      rv+=q?q+i.v+q:O.SS.Slim(i.v);
      b=!b
   };
   return rv;
}.Extend({
      BreakDown:function(v,pos,qt){
         var r,z='',c,n,rV=new Array(),p=pos?pos:0,ln=v.length;
         while(p<ln){
            c=v[p];p++;
            if((c=='"'||c=="'")&&(!qt||c==qt)){
               if(z!='')rV.push({v:z,qt:qt});n=!qt?c:O.udef;
               return rV.concat(O.SS.BreakDown(v,p,n));
            }
            z+=c;
         };
         if(z!='')rV.push({v:z,qt:qt});
         return rV
      }
   ,  Slim:function(v){
         return v.ReplaceAll([
               ['%',';var ']
            ,  ['@f',' function']
            ,  ['@r',';return ']
            ,  ['@>',';cout']
         ])
      }
})
if(2){//-Is??? functions[$$Is(),IsArr(),IsCls(),IsNum(),IsStr(),IsObj()]
   var $Is=O.$$Is=function(v,typ){
      if(!typ&&this.typ)typ=this.typ;
      return v&&v.$type?v.$type==typ?true:false:typeof v==typ?true:false;
   };
   Object.CopyTo(O,{
         IsArr:$Is.Bind({typ:'array'})
      ,  IsCls:$Is.Bind({typ:'class'})
      ,  IsFun:$Is.Bind({typ:'function'})
      ,  IsNum:$Is.Bind({typ:'number'})
      ,  IsObj:$Is.Bind({typ:'object'})
      ,  IsOl:$Is.Bind({typ:'overload'})
      ,  IsProp:$Is.Bind({typ:'property'})
      ,  IsStr:$Is.Bind({typ:'string'})
      ,  IsFUN:function(v){var z=typeof v;return z=='function'||z=='overload'?true:false;}
      ,  IsOBJ:function(v){var z=typeof v;return z=='function'||z=='object'?true:false;}
   });
};

O.Clone=function(v){
   var typ=typeof v;
   if(typ=='array')v=Array.Clone(v);
   else if(typ=='object')v=Object.Clone(v);
   return v
};
O.ArgStr=O.$ArgsStr=function(args,nam){
   var rv='',a=args,n=nam?nam:'arguments';
   if(a)for(lp=0;lp<a.length;lp++)rv+=n+'['+lp+']'+(lp!=a.length-1?',':'');
   return rv
};
O.VarStr=O.$VarStr=function(ob,nam){
   var rv='',n;
   for(n in ob){
      //if(rv=='')rv='var ';else rv+=',';
      //rv+=n+'='+nam+'.'+n;
      rv+=((rv=='')?'var ':',')+n+'='+nam+'.'+n;
   }
   return rv+';';
}
O.Global=function(ob){
   var o=Array.From(ob), l=o.length, i;
   for(i=0; i<l; i++) Object.CopyTo(global,o[i]);
}.Extend({
   Pops:function(doIt){if(!G.$$_P_||doIt){O.Global(O);G.$$_P_=2}; return O;}
});
if(!G.$$iid)G.$$iid=2;
O.IID=function(){return G.$$iid++;};

if(2){//mode system[Choose(),IsMode(),Modal(),Mode()]
   O.$$modes=global.$$modes={};
   O.Choose=function(nam,val){
      var rv,z,zz,n,ln,go=2;
      if(typeof nam=='string'&&val){
         z=nam.LCase();
         for(mb in val){
            if(mb!='Else'&&go){
               zz=mb.split('_or_');
               ln=zz.length;
               for(lp=0;lp<ln;lp++){
                  n=zz[lp].LCase();
                  if(n!='$run'&&(n==z||n=='$else')){
                     rv=val[mb];go=0;
                  };
               };
            };
         };
      };
      if((val&&go)&&val.Else)rv=val.Else;
      if((typeof rv=='function')&&(val.$run||rv.$run))rv=rv();
      return rv;
   };
   o.IsMode=function(nam){
      nam=nam?IsArr(nam)?nam:[nam]:['main'],ln=nam.length;
      if(!nam.length)return false;
      for(lp=0;lp<ln;lp++)if(!$$modes[nam[lp].LCase()])return false;
      return true
   };
   o.Mode=function(nam){
      var n=def(nam)?nam.LCase():'main',z=$$modes[n],v=$$modes[n]=z?z:null;
      return new function(n,v) {
         var name=n,val=v;
         this.Get=function(){return val;};
         this.Set=function(str){$$modes[name]=val=str;}
      }(n,v);
   };
   o.Modes=function(obj){
      if(IsOBJ(obj))for(mb in obj)$$modes[mb.LCase()]=obj[mb].LCase()
   };
   o.Modal=function(nam,val){
      if(!IsStr(nam)){val=nam;nam='main'};
      return nam&&val?o.Choose($$modes[nam.LCase()],val):udef
   };
};

O.Overload=function(val){
   var t=this,v=val?val:{},mb,rv=O.Overload.$Base();
   for(mb in v)rv.fns[mb]=v[mb];
   return rv;
}.Extend({
      $Base:function(){
         var ff={},rv=function(){
            var t=this,fn=t.fns,A=arguments,z,oS,rv,aS=o.Overload.ArgSig(A),mmb;
            for(mmb in fn){
               if(!rv){
                  oS=o.Overload.ObjSig(mmb);
                  if(o.Overload.MatchSigs(aS,oS))
                     eval('rv=fn.'+mmb+'('+o.$ArgsStr(A,'A')+');');
               };
            };
            return rv
         }.Bind({$type:'overload',fns:ff});
         rv.Extend({
               //Bind:function(v){var t=this,f=t.fns;mb;for(mb in f)f[mb]=f[mb].Bind(v);return t;}
               $$bound:0
            ,  $type:'overload'
            ,  Bind:function(v){
                  var t=this,f=t.fns,rv=O.Overload.$Base(),mb;
                  for(mb in f)rv.fns[mb]=f[mb].Bind(v);
                  rv.$$bound=2;
                  return rv
               }
            ,  fns:ff
         });
         return rv;
      }
   ,  ArgSig:function(args){
         var rv=[],a,z,ln=args.length;
         for(lp=0;lp<ln;lp++){
            a=args[lp];z=o.typeOf(a);
            rv.push((z=='class'&&((a.$name)&&a.$name.length))?[z,a.$name.LCase()]:[z]);
         };
         return rv
      }
   ,  ObjSig:function(str){
         var rv=[],k,z,zz,nez2,a=str.split('_or_'),ln=a.length,lp,lp2,ln2;
         
         for(lp=0;lp<ln;lp++){
            ne=[];
            z=a[lp].split('_');
            ln2=z.length;
            for(lp2=0;lp2<ln2;lp2++){
               z2=z[lp2];
               zz=(z2=='$')?['?']:z2.split('$');
               k=zz[0];
               if(k=='a'||k=='array')k='array';
               else if(k=='c'||k=='class')k='class';
               else if(k=='C'||k=='CLASS')k='CLASS';
               else if(k=='f'||k=='function')k='function';
               else if(k=='n'||k=='number')k='number';
               else if(k=='o'||k=='object')k='object';
               else if(k=='s'||k=='string')k='string';
               else if(k=='S'||k=='STRING')k='STRING';
               else if(k=='any'){}
               else k='$other';
               zz[0]=k;

               ne.push(zz);
            };
            rv.push(ne);
         };
         return rv
      }
   ,  MatchSigs:function(aSig,oSig){
         var as=aSig,os=oSig,ln=os.length
            ,  z,zz,z1,z2,gd,a,o,aa,oo,lp,l2,ol
            ,  a2l,o2l
         ;
         
         for(lp=0;lp<ln;lp++){
            o=os[lp];gd=2;ol=o.length;
            if(as.length!=ol)gd=0;
            if(gd)
               for(l2=0;l2<ol;l2++){
                  a2=as[l2];o2=o[l2];
                  a2l=a2.length;o2l=o2.length;
                  if((a2&&o2)&&a2l&&o2l){
                     aa=a2[0];oo=o2[0];
                     
                     //if(aa!=oo)gd=0;
                     
                     if(oo=='string'||oo=='number'){
                        if(a2.length!=o2.length)gd=0;
                        else if(a2.length>1)
                           if(a2[1]!=o2[1])gd=0;
                     }
                     else if(gd&&aa=='class'){
                        if(a2.length!=o2.length)gd=0;
                        if(a2.length>1)
                           if(a2[1]!=o2[1])gd=0;
                     };
                  }
                  else gd=0;
               };
            if(gd)return true;
         };
         return false;
      }
});
O.Prop=function(val){
   var f,z,mb,rv,ps='',v=val,p=v.Private;
   
   eval(O.Property.$Init(v,'v'));
   eval(O.Property.$GetSet(v,'v'));
   
   eval(O.Property.$Base(v,'v','rv'));
   
   //for(mb in v)rv.fns[mb]=v[mb];
   return rv;
}.Extend({
      $Init:function(v,vNam,cr){
         cr=cr?cr:'';
         return(''
            +  "var $n$="+vNam+";"+cr
            +  "if(!$n$)$n$={};"+cr
            +  "if(!$n$.Private)$n$.Private={};"+cr
            +  "if(!$n$.Private.$val)$n$.Private.$val=$n$.$val?$n$.$val:undefined;"+cr
            +  "if(!$n$.Get){"
            +     "$n$.Get=function(){return $val};"
            +     "if(!$n$.Set&&!$n$.readonly)$n$.Set=function(vl){$val=vl;return vl};"
            +  "}"
            +  "if($n$.Set=='auto')$n$.Set=function(vl){$val=vl;return $val};"
            +  "eval($_P_.$VarStr($n$.Private,'$n$.Private'));"
            
            +  vNam+"=$n$"+cr
         );

      }
   ,  $Base:function(v,vNam,nam,prnt,cr){
         cr=cr?cr:'';
         return(''
            +  nam+'=function(vl){'+cr
            +     'var a=arguments,rv;'+cr
            +     "if(a.length)rv=_Set(vl);"+cr
            +     "else rv=_Get();"+cr
            +     "return rv;"+cr
            +  "}.Extend({"+cr
            +     "   $$v:"+vNam+cr
            +     ",  $type:'property'"+cr
            +     ",  Bind:function(v){"+cr
            +           "var t=this,vv=t.$$v,_Get=t.Get.Bind(v),_Set=t.Set;"+cr
            +           "if(_Set)_Set=_Set.Bind(v);"+cr
            +           "eval(Property.$Base(vv,'vv','rv','\\n'));"+cr
            +           "rv.readonly=t.readonly;"+cr
            +           "rv.$$bound=2;"+cr
            +           "return rv;"+cr
            +        "}"+cr
            +     ",  Get:_Get"+cr
            +     ",  Set:_Set"+cr
            +     ",  readonly:v.readonly"+cr
            +  "});"+cr
         );
      }
   ,  $GetSet:function(v,vNam,nam,prnt,cr){
         var z='var _Get=',f; 
         
         f=v.Get;
         if(f.$$bound)z+=vNam+'.Get';
         else z+=f.Str();
                  
         z+=';var _Set=';
         if(v.Set&&!v.readonly){
            f=v.Set;
            if(f.$$bound)z+=vNam+'.Set';
            else z+=f.toString();
         }
         else z+='function(){}';
         return z+';';
      }
   ,  ArgSig:function(args){
         var rv=[],a,z,ln=args.length;
         for(lp=0;lp<ln;lp++){
            a=args[lp];z=o.typeOf(a);
            rv.push((z=='class'&&((a.$name)&&a.$name.length))?[z,a.$name.LCase()]:[z]);
         };
         return rv
      }
   ,  ObjSig:function(str){
         var rv=[],z,zz,nez2,a=str.split('_or_'),ln=a.length,lp,lp2,ln2;
         
         for(lp=0;lp<ln;lp++){
            ne=[];
            z=a[lp].split('_');
            ln2=z.length;
            for(lp2=0;lp2<ln2;lp2++){
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
         return rv
      }
   ,  MatchSigs:function(aSig,oSig){
         var as=aSig,os=oSig,z,zz,z1,z2,gd,a,o,aa,oo,a2,o2,lp,l2,ol,ln=os.length;
         
         for(lp=0;lp<ln;lp++){
            o=os[lp];gd=2;ol=o.length;
            if(as.length!=ol)gd=0;
            if(gd)for(l2=0;l2<ol;l2++){
               a2=as[l2];o2=o[l2];
               if((a2&&o2)&&a2.length&&o2.length){
                  aa=a2[0];oo=o2[0];
                  if(aa!=oo)gd=0;
                  if(gd&&aa=='class'){
                     if(a2.length!=o2.length)gd=0;
                     if(a2.length>1)
                        if(a2[1]!=o2[1])gd=0;
                  };
               };
            };
            if(gd)return true;
         };
         return false;
      }
});
O.Property=function(val){
   return O.Blank().Extend({$isProp:2,$$v:val});
}.Extend({
      $Init:function(v,vNam,cr){
         cr=cr?cr:'';
         return(''
            +  "var $n$="+vNam+";"+cr
            +  "if(!$n$)$n$={};"+cr
            +  "if(!$n$.Private)$n$.Private={};"+cr
            +  "if(!$n$.Private.$val)$n$.Private.$val=$n$.$val?$n$.$val:undefined;"+cr
            +  "if(!$n$.Get){"
            +     "$n$.Get=function(){return $val};"
            +  "}"
            +  "if(!$n$.Set&&$n$.Set=='auto')$n$.Set=function(vl){$val=vl;return $val};"
            +  "eval($_P_.$VarStr($n$.Private,'$n$.Private'));"
            +  vNam+"=$n$"+cr
         );
      }
   ,  $Base:function(v,vNam,nam,prntNam,cr){
         cr=cr?cr:'';
         return(''
            +  'Object.defineProperty('+prntNam+',"'+nam+'",{'+cr
            +     '   get:_Get'+cr
            +     ',  '+(v.readonly?'':'writable:true,set:_Set')+cr
            //+     ',  '+(v.readonly?'writable:false':'writable:true,set:_Set')+cr
            +  '});'
         );
      }
   ,  $GetSet:function(v,vNam,nam,prnt,cr){
         var z='var _Get=',f; 
         
         f=v.Get;
         if(f.$$bound)z+=vNam+'.Get';
         else z+=f.Str();
                  
         if(v.Set&&!v.readonly){
            z+=';var _Set=';
            f=v.Set;
            if(f.$$bound)z+=vNam+'.Set';
            else z+=f.toString();
         };
         //else z+='function(){}';
         return z+';';
      }
});

var Class=O.Class=function(nam,specs,onReady){
   if(typeof nam!='string'){onReady=specs;specs=nam;nam=0;}
   else{onReady=specs;}
   var z=2,z2,zz,mm,pp,l,l2,r,sh,rv,$ini,kk,pr,ze,zr,ln,vs
      //,  o=specs?Object.Clone(specs):{}
      ,  o=specs?specs:{}
      ,  z=o.Extends,$e=z?z:null
      ,  z=o.Implements,$i=z?Array.From(z):[]
      ,  z=o.PreImp,$pi=z?Array.From(z):[]
      ,  z=o.Private,$p=z?z:{}
      ,  z=o.Shared,$s=z?z:{}
      ,  z=o.$name,nm=nam?nam:z?z:''
      ,  z=o.options,$o=z?z:{}
   ;
   vs=Class.Pull(o);

   rv=function(op,onld){
      return ((this instanceof rv)?
            O.Class.$$InitClass(this, arguments)
         :  rv.Create.Call(arguments)
      );
   }

   if(o.$preval){
      r=[[$i],[$pi]];
      for(l=0;l<2;l++){
         kk=r[l][0];ln=kk.length;
         for(l2=0;l2<ln;l2++){
            z=kk[l2];
            z=(O.IsStr(z))?_(z):z;
            kk[l2]=z;
         };
      }
   }   
   if($e){
      $e=(O.IsStr($e))?_($e):$e;
      zz=$e.$$shared;
      if(zz)for(mm in zz){
         z=zz[mm];
      }
   }
   else{
      rv.Implement({
            $inst:true
         ,  On:function(evt,fn,bnd){return O.Event.On(this,evt,fn,0,bnd);}.$$Sys()
         ,  Once:function(evt,fn,bnd){return O.Event.On(this,evt,fn,0,bnd);}.$$Sys()
         ,  $On:function(evt,fn,bnd){return O.Event.On(this,evt,fn,2,bnd);}.$$Sys()
         ,  SetOptions:function(op,op2){return O.Class.$$SetOptions(this,op,op2);}.$$Sys()
         ,  Fire:function(e,onDone){O.Event.Fire(this,e,onDone);}.$$Sys()
         ,  Parent:function(){
               var a=arguments,cl=a.callee.caller,pi=cl.$pInst,p=cl.$fParent,nm=cl.$fName,z=p.$extends;
            }
      });
      if(O.IsStr(o.$name)){pp=o.$name.Trim();if(pp!='')rv.$name=pp;};
      rv.Extend({
         $Reg:function(nam){O.Class.Reg(this,nam)}.$$Sys()
      });
   };
   z=o.Init;rv.prototype.Init=z?z:0;
   if(2){//-Shared
      z=vs.PrivShare,zz='';
      for(mm in z){
         z2=',';
         if(zz=='')z2='var ';
         zz+=z2+mm+'=z.'+mm;
      }
      eval(zz+';');
      z=vs.Shared,zz='';
      rv.$$shared={};
      for(mm in z){
         z2=z[mm];z4='z2';
         if(O.IsFun(z2)&&!z2.$$bound)z4=z2.toString();
         //out('mm='+mm);
         eval('rv.'+mm+'='+z4+';');
         rv.$$shared[mm]=rv[mm];
      }
   }
   rv.Implement({
         $class: rv
   });
   rv.Extend({
         $specs: {}
      ,  Create: function() {
            eval('RV=new rv('+O.ArgStr(arguments, 'arguments')+')');
            return RV;
         }
   });
   rv.ExtImp({
         $extends:$e
      ,  $implements:$i
      ,  $preImp:$pi
      ,  $name:nm
      ,  $type:'class'
      ,  $op:$o
      ,  $vs:vs
      ,  Kill:function(){
         
         }.$$Sys()
      ,  $iid:O.$$iid++
   });

   return rv;}.Extend({
      $$Add:function(nm,v,cls,op){
         var c=cls,o=op?op:{},lm=nm.LCase(),mm,z,p,sh,ya=2,$p,$s;
         if(!c.$$private)c.$$private=c.prototype.$$private={};
         if(!c.$$public)c.$$public=c.prototype.$$public={};
         
         if((nm=='Init'&&!o[nm])||(nm=='Extends'&&!o[nm])
            ||(nm=='Implements'&&!o[nm])||(nm=='op'&&!o[nm])
            ||(nm=='options'&&!o[nm])||(nm=='$extends'&&!o[nm])
            ||(nm=='$implements'&&!o[nm])||(nm=='$op'&&!o[nm])
         )ya=0;
   
         $p=o.Private||v.$private;
         $s=o.Shared||v.$shared;
         
         if(v&&O.IsFun(v)){
            v.$fParent=c;v.$fName=nm;
            if(O.IsOl(v))for(mm in v.fns){z=v.fns[mm];z.$fParent=c;z.$fName=mm;};
         };
         
         if(ya){
            v.$$added=2;
            if($p){c.$$private[nm]=v;}
            else if($s)c.Extend(nm,v);
            else c.$$public[nm]=v;
         };
      }
   ,  $$AddAll:function(v,cls,op){
         var c=cls,o=op?op:{},lm,mm,p,z=v.Shared,sh=z?z:{},ya,$p,$o;
         if(O.IsOBJ(v)||O.IsFun(v)){
            for(mm in v){
               z=v[mm];
               if(z==null||!def(z)){}
               else if(!z.$prim){
                  $o=Object.Clone(o);
                  if(mm=='Private'&&O.IsObj(z)){$o.Private=true;O.Class.$$AddAll(z,c,$o)}
                  else if(mm=='Shared'){}
                  else if(z.$shared)sh[nm]=z;
                  else O.Class.$$Add(mm,z,c,$o);
               };
            };
            c.$$sh=sh;
         };
      }
   ,  $$InitClass:function(v,args){
         var rv=v,mm,mb,s='',zz,z1,z2,z3,z4,f,ff,f2,l,ll,l2,ln,$fp,$fn,$v,k,x
            ,  $e=v.$extends
            ,  $i=v.$implements, $ii=v.$iInst=[]
            ,  $pi=Array.From(v.$preImp||[]), $pii=v.$piInst=[]
            ,  $pi=Array.Merge($pi, Array.From(v.Interface||[]))
            ,  p=v.$vs.Private,p=p?p:{}
            ,  pb=v.$vs.Public,pb=pb?pb:{}
            ,  a=args, noInit=a&&a.length&&a[0]?a[0].$$noInit:0
         ;
         x=v.$iid=O.$$iid++;
         v.$inst=2;
         
         if(2){//PreImp & Interface
            ln=$pi.length;
            for(ll=0;ll<ln;ll++){
               f=$pi[ll];
               if(typeof f=='string')f=_(f);
               if(f){
                  zz=new f();
                  for(mm in zz){
                     z=zz[mm];
                     if((z)&&!z.$prim&&!z.$$sys){
                        if(O.IsFun(z)&&!z.$$bound)z=z.Bind(v);
                        v[mm]=z;
                        $pii.push(z);
                     }
                  }
               }
            }
            if(v.PreImp) delete v.PreImp;
            if(v.Interface) delete v.Interface;
         };
         if($e){
            zz=v.$$exInst=new $e({$$noInit:2});
            for(mm in zz){
               z=zz[mm];
               if((z)&&!z.$prim){
                  if(IsFun(z)&&!z.$$bound&&!z.$$sys)z=z.Bind(v);
                  v[mm]=z;
               }
            }
         };
         if($i){
            ln=$i.length;
            for(ll=0;ll<ln;ll++){
               f=$i[ll];
               if(typeof f=='string')f=_(f);
               if(f){
                  zz=new f();
                  for(mm in zz){
                     z=zz[mm];
                     if((z)&&!z.$prim&&!z.$$sys){
                        if(IsFun(z)&&!z.$$bound)z=z.Bind(v);
                        v[mm]=z;
                        $ii.push(z);
                     }
                  }
               }
            }
         };

         v.Parent=function(){
            var a=arguments
               ,  cl=a.callee.caller
               ,  pi=cl.$pInst
               ,  p=cl.$fParent
               ,  nm=cl.$fName
               ,  z=p.$extends
            ;
            //return $$RunFn(z,nm,a,pi); 
            //out('nm='+nm);              
            //out('cl.$$addType'+v.$iid.Str()+'='+cl['$$addType'+v.$iid.Str()]);
         }

         //out('** Private='+O.$Str(p,2));
         //out('** Public='+O.$Str(pb,2));
         for(mm in p){
            z=p[mm];s='var '+mm+'='
            //out('*mm='+mm+'  ')
            if(O.IsFun(z)&&!z.$$bound)s+=z.toString();
            else s+='z';
            eval(s+';');
         }
         var T=this, op=0;
         v.$$SetOp=function(ops){ op=ops; };
         
         for(mb in pb){
            f=pb[mb];f2=v[mb];
            if((f.$isProp||O.IsFUN(f))&&!f.$$sys){
               //out('------------------------');
               if(O.IsOl(f)){
                  ff=f.fns;
                  for(l2 in ff){
                     z=ff[l2];
                     if(!z.$$bound){
                        $fp=z.$fParent;$fn=z.$fName;
                        eval('z=ff.'+l2+'='+z.toString()+'.Bind(v);');
                        ff[l2].$fParent=$fp;ff[l2].$fName=$fn;
                     };
                  }
                  eval('v.'+mb+'=f;');
               }
               else if(f.$isProp){
                  $v=f.$$v?Object.Clone(f.$$v):{};
                  eval(O.Property.$Init($v,'$v'));
                  eval(O.Property.$GetSet($v,'$v',mb,v));
                  eval(O.Property.$Base($v,'$v',mb,'v'));
               }
               else{
                  if(!f.$$bound){
                     //out('eval==');
                     $fp=f.$fParent;$fn=f.$fName;
                     eval('v.'+mb+'='+f.toString()+';');
                     v[mb].$fParent=$fp;v[mb].$fName=$fn;
                  }
                  else v[mb]=f;
               };
               v[mb].$pFn=f2;
               //out('========================');
            }
            else v[mb]=f;
         };

         if(!noInit){
            
            if(v.Init){
               if(!v.Init.$$bound) v.Init=v.Init.Bind(v);
               v.Init.Call(a);
            };
            v.Fire(['load','ready']);
         }
         return v;
      }
   ,  Pull:function(v,pull,is){
         var nm,z,tk=[],l,ln,zz
            ,  rv={Private:{},Public:{},PrivShare:{},Shared:{}}
            ,  p=v.Private, ps=v.PrivShare, pb=v.Public, s=v.Shared
         ;
         if(p)delete v.Private; else p={};
         if(ps)delete v.PrivShare; else ps={};
         if(pb)delete v.Public; else pb={};
         if(s)delete v.Shared; else s={};
      
         if(s.Private){
            Object.CopyTo(ps,s.Private);
            delete s.Private;
         }
         if(pb.Shared){
            z={};
            Object.CopyTo(z,pb.Shared);
            Object.CopyTo(z,s);
            delete pb.Shared;
            s=z;
         }
         if(p.Shared){
            z={};
            Object.CopyTo(z,p.Shared);
            Object.CopyTo(z,ps);
            delete p.Shared;
            ps=z;
         }
      
         for(nm in v){
            z=v[nm];zz=2;
            if(!z.$prim){
               if(z.$shared)
                  if(z.$private)ps[nm]=z; else s[nm]=z;
               else if(z.$private)p[nm]=z;
               else{pb[nm]=z;zz=0;};
               
               if(zz)delete v[nm];
            };
         }

         return {Private:p,Public:pb,PrivShare:ps,Shared:s};
      }
   ,  $$PullShared:function(v,priv,all){
         var rv={Private:{}},nm,z,tk=[],l,ln,zz;
         if(v.Shared){
            zz={};
            Object.CopyTo(zz,O.Class.$$PullShared(v.Shared,priv,2));
            Object.CopyTo(rv.Private,zz.Private);delete zz.Private;
            Object.CopyTo(rv,zz);
            delete v.Shared;
         };
         
         for(nm in v){
            z=v[nm];
            if(nm=='Private'){}
            else if(((z)&&z.$shared)||all){
               z.$shared=2;
               if(priv||z.$private){
                  z.$private=2;
                  rv.Private[nm]=z;
               }
               else rv[nm]=z;
               tk.push(nm);
            }
         }
         ln=tk.length;
         for(l=0;l<ln;l++)delete v[tk[l]];
         
         return rv;
      }
   ,  $$RunFn:function(v,nam,args,notRecursive,noBase){
         var rv=null,v=v?v:{},a=args,pi,xt=v.$$exInst,zz=v[nam];
         if(zz&&!noBase)eval("rv=zz.Bind(pi)("+$ArgsStr(a,'a')+");");
         else if(xt&&!notRecursive)rv=O.Class.$$RunFn(xt,nam,a,0,0);
         return rv;
      }
   ,  $$SetOptions:function(v,op,op2){
         if(!op2&&(v.$op||v.options)) {op2=op;op=v.$op?v.$op:v.options;};
         v.op=v.options=Object.Merge(op,op2);
         var m, n, o=v.op, e=o.Events, E=o.$Events;
         if(v.$$SetOp) v.$$SetOp(o);
         if(e) v.On(e,0,v);
         if(E) v.$On(E,0,v);
         return v;
      }
   ,  $$classes:{}
   ,  Reg:function(t,nam){
         var n= (O.IsStr(t.$name))?t.$name:(nam)?nam:'', z;
         z= ((O.IsStr(t.$name))?t.$name:(nam)?nam:'').Trim();
         n= n.Trim();
         if(n!='') O.Class.$$classes[n]= t;
      }
});var c=Class,$$Add=c.$$Add,$$AddAll=c.$$AddAll,$$classes=c.$$classes,$$RunFn=c.$$RunFn;
O.Parent=function(){
   var a=arguments/*,cl=a.callee.caller*/,z=a.callee.caller.$pFn;
   return(z)?z.Call(a):undefined;
};

O.Interface=function(nam,specs){
   var n=nam,s=specs,l,nm,z,zz,k,a,unk='UNKNOWN'
      ,  rv=function(){}.ExtImp({$$type:'interface'}).Implement({
               Private:{}
         })
      ,  pt=rv.prototype;
   ;
   if(typeof n!='string'){s=n;n=''};
   for(nm in s){
      zz=s[nm];
      if(typeof zz=='string'){
         zz=zz.split('|');
         l=zz.length;
         z=zz[0].LCase();
         if(z=='function'){
            a=(l>1)?zz[1]:'';
            eval(
                  'k=function('+a+'){'
               +     'throw("Interface error: function-'+nm
               +        ((a!='')?(' ('+a+')'):'')
               +        ' must be overridden. Interface = '+((n!='')?n:unk)+'.'
               +     '")' 
               +  '};' 
            );
         }
         else if(z=='property'){
            a=(l>1)?zz[1]:'';
            eval(
                  'k=O.Property({'
               +        'Get:function(){throw("Interface error: property-get-'+nm
               +           ((a!='')?(' ('+a+')'):'')
               +           ' must be overridden. Interface = '+((n!='')?n:unk)+'.'
               +        '")}' 
               +     ',  Set:function(v){throw("Interface error: property-set-'+nm
               +           ' (v) must be overridden. Interface = '+((n!='')?n:unk)+'.'
               +        '")}' 
               +  '});' 
            );
         }
         else k='error: Interface spec not set "'+nm+'"';
         pt[nm]=k;
      }
   }

   return rv;
}

O.Event=function(nam,args){
   var std=[],sys=[],async=0,stop=0,running=0,done=0,a=args
      ,  args={
            
         }
   ;
   if(a)args.Extend(a);
   return function(){}.Extend({
         args:args
      ,  nam:nam
      ,  $$Fire:function($sys,$std,onDone){
            var t=this,st=t.$_std,sy=t.$_sys,z,zz
               
               ,  f=function(v,$){
                     if(v){
                        $=$?v.PopL:v.PopR;
                        while(z=$()){
                           zz=z(t);
                           if(async){running=0;return 2};
                           if(stop){return 2};
                        };
                     }
                     return 0;
                  }
            ;
            if($sys)sys=$sys;if($std)std=$std;
            if(onDone)done=onDone;
            if(running)return;
            running=2;async=0;
            if(f(sys))return;
            if(f(std,2))return;
            running=0;
            if(done)done();
         },
         Done:function(){async=0;if(!running)this.$$Fire();},
         Async:function(){async=2},
         Stop:function(){stop=2}
      });
}.Extend({
      On:function(v,evt,fn,sys,bnd){
         var z=sys?'sys':'std',zz,ev=v.$$evts,mb,z2,ar,g,d,l,ln;
         if(!ev)ev=v.$$evts={};
         
         if(O.IsStr(evt)){zz=evt;evt={};evt[zz]=fn;};
         for(mb in evt){
            z2=ev[mb];if(!z2)z2=ev[mb]={};
            ar=z2[z];if(!ar)ar=z2[z]=[];
            g=Array.From(evt[mb])
            ln=g.length;
            for(l=0;l<ln;l++){
               d=g[l];
               if(bnd&&!d.$$bound){zz=d;d=d.Bind(v);d.fn=zz};
               if(once){d=d.Caller();d.$once=2}
               ar.push(d);
            }
         };
      }
   ,  Fire:function(v,ee,onDone){
         var k,z,zz,z2,ar,ev,e,g=Array.From(ee),l,l2,ll,ln=g.length;
   
         for(l=0;l<ln;l++){
            e=g[l];
            if(O.IsStr(e))e=g[l]=O.Event(e);
            e.caller=v;
            
            if(ev=v.$$evts){
               if(z2=ev[e.$$nam]){
                  e.$st=[];
                  e.$sy=z2.sys?Array.Clone(z2.sys):[];
                  
                  ar=e.sys=[];
                  k=z2.sys;if(!k)k=[],zz=[];
                  for(ll=0,l2=k.length;ll<l2;ll++){
                     kk=k[ll];
                     ar[ll]=kk;
                     if(!kk.$once)zz.push(kk);
                  }
                  z2.sys=zz;


                  k=z2.std;if(!k)k=[];e.$st=k;
               };
            };
         }
   
         z=function(){
            if(g.length){
               var aa=g.PopL(),f=aa.$$Fire;
               if(f)f(aa.$sy,aa.$st,z);
               else z();
            }
            else if(onDone)onDone();
         };
         z();
      },
});
O.Val=function(val, ops){
   var rv={
         $$isVal: 2
      ,  value: val
      ,  options: Object.LCase(ops)
   }
}
O.CreateOptions=function(dflt,ops){return Object.CopyTo(Object.CopyTo({},dflt,2),ops,2)};

Object.CopyTo(exports,O);