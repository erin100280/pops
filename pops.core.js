var z,z2,z3,z4,zz,x,l,p,fn=Function,G=global,o=O=pops=G.$_P_=G.$pops={};

if(2){//-Setup system nodes.
   if(!G.$$modes){
      z=G.$$modes={};
      z.$os=process.platform;
   };
};

if(2){//-misc. (var'd) [cout(),sout(),Cls(),def(),Type(),typeOf(),TypeOf(),udef]
   var z,$cr=o.$cr='\n'
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
   z4=z.Bind=z2.Bind=function(that){
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
                  eval('fn'+(t)?'.Bind(t)':''+'('+$ArgsStr(args,'args')+');');
               });
               return this;
            }
         ,  aCall:function(){this.aAply(arguments)}
/*         ,  ACall:function(){
               var fn=this,args=arguments;
               process.nextTick(function(){eval('fn('+$ArgsStr(args,'args')+');');});
               return this;
            }
//*/
         ,  Hidden:function(){this.$hidden=2;return this}
         ,  Private:function(){this.$private=2;return this}
         ,  Protected:function(){this.$protected=2;return this}
         ,  Shared:function(){this.$shared=2;return this}
         ,  PrivShare:function(){this.$private=this.$shared=2;return this}
         ,  Reg:function(nam){_.Reg(nam,this)}
         ,  Str:Function.prototype.toString
      }
   });
   String.Implement({
      $Prim:{
            Fun:function(){
               var z=this.valueOf().split('|'),rv,a='',s=z[0];
               if(z.length>1){a=s;s=z[1];}
               eval('rv=function('+a+'){'+s+'};');
               return rv;
            }
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
      Clone:function(v){
         var rv=[],ln=v.length;
         for(lp=0;lp<ln;lp++)rv.push(Clone(v[lp]));
         return rv;
      },
      From:function(item){return item==null?[]:TypeOf(item)=='array'?item:[item];},
      HasStr:function(arr,str,matchCase){
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
         var rv=O.IsFun(v)?function(){}:{};
         for(mb in v)
            if(!v[mb].$prim&&!rv[mb]){
               rv[mb]=O.Clone(v[mb]);
            };
         return rv;
      },
      Merge:function(ob,ob2){
         var rv=ob?Object.Clone(ob):{};
         if(ob2)for(mb in ob2)rv[mb]=ob2[mb];
         return rv;
      },
      CopyTo:function(dest,src){
         var rv=dest,s=typeof rv;
         if((s=='object'||s=='function')&&src)
            for(mb in src)rv[mb]=src[mb];
         return rv;
      },
      HasVar:function(ob,nam,matchCase){
         var s,ss,z,mc=matchCase,n=IsArr(nam)?nam:[nam],ln=n.length;
         for(lp=0;lp<ln;lp++){
            z=0;s=mc?n[lp]:n[lp].LCase();
            for(mb in ob)if(s==(ss=mc?mb:mb.LCase()))z=2;
            if(!z)return false;
         };
         return true;
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
            //cout(' '.Repeat(sp*x)+'$Str | T='+T)
            rv+=' '.Repeat(sp*x);
            z=v.$$type;
            if(T=='string'||T=='number'||T=='boolean')rv+=T+': '+v+'\n';
            else if(T=='function'||T=='class'||z=='type'||z=='struct'){
               rv+=T+':\n';if(r)rv+=$Str.Fun(v,r,sp+1,x);
            }
            else{rv+=T+':\n';if(r)rv+=$Str.Obj(v,r,sp+1,x);}
            
            return rv;
         }.Extend({
               Fun:function(v,recursive,spacing,times,rMax,tim){
                  cout('FUN');
                  var z,prm=0,k,m,zz,s,l,sp=spacing,T=typeOf(v),rv='',x=times
                     ,  rm=rMax,tm=tim,r=recursive
                  ;
                  z='';zz=v.Str().split('\n');k=' '.Repeat((sp+1)*x);
                  for(l=0,s=zz.length;l<s;l++)z+=k+zz[l]+'\n';
                  rv+=' '.Repeat(sp*x)+'code:\n'+z+'\n';
                  rv+=' '.Repeat(sp*x)+'members:\n';
                  for(m in v){
                     z=v[m];k=typeOf(z);
                     if(!z.$prim||prm){
                        rv+=' '.Repeat((sp+1)*x)+m+':\n';
                        rv+=r?$Str(z,r,sp+2,x,rm,tm+1):' '.Repeat((sp+2)*x)+k+':\n';
                     }
                  }
               
                  return rv;                  
               }
            ,  Obj:function(v,recursive,spacing,times,rMax,tim){
                  cout('OBJ');
                  //var r=recursive,z,k,m,zz,s,z=spacing,sp=z?z:0,T=typeOf(v),rv='',x=times;
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
               }
               
         })
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

o.Clone=function(v){
   switch (typeOf(v)){
      case 'array':
         v=Array.Clone(v);break;
      case 'class','function','object':
         v=Object.Clone(v);break;
   };
   return v
};
o.$ArgsStr=function(args,nam){
   var rv='',a=args,n=nam?nam:'arguments';
   if(a)for(lp=0;lp<a.length;lp++)rv+=n+'['+lp+']'+(lp!=a.length-1?',':'');
   return rv
};
O.$VarStr=function(ob,nam){
   var rv='',n,i;
   for(n in ob){
      if(rv=='')rv='var ';else rv+=',';
      rv+=n+'='+nam+'.'+n;
   }
   return rv+';';
}
o.Global=function(ob){Object.CopyTo(global,ob);}.Extend({
   Pops:function(doIt){if(!G.$$_P_||doIt){O.Global(O);G.$$_P_=2}}
});

if(2){//mode system[Choose(),IsMode(),Modal(),Mode()]
   o.$$modes=global.$$modes={};
   o.Choose=function(nam,val){
      var rv,z,zz,n,ln;
      if(IsStr(nam)&&val){
         z=nam.LCase();
         for(mb in val){
            if(rv==udef){
               zz=mb.split('_or_');
               ln=zz.length;
               for(lp=0;lp<ln;lp++){
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
      return rv
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

o.Overload=function(val){
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
o.Property=function(val){
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
            +  "eval($VarStr($n$.Private,'$n$.Private'));"
            +  vNam+"=$n$"+cr
         );

      }
   ,  $Base:function(v,vNam,nam,cr){
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
   ,  $GetSet:function(v,vNam,nam,cr){
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

var Class=O.Class=function(nam,specs,onReady){
   if(typeof nam!='string'){onReady=specs;specs=nam;nam=0;}
   else{onReady=specs;}
   var z=2,z2,zz,mm,pp,l2,r,sh,rv,$ini,kk,pr
      ,  o=specs?specs:{}
      ,  z=o.Extends,$e=z?z:null
      ,  z=o.Implements,$i=z?Array.From(z):0
      ,  lni=$i.length
      ,  z=o.Private,$p=z?z:{}
      ,  z=o.Shared,$s=z?z:{}
      ,  z=o.$name,nm=nam?nam:z?z:''
      ,  z=o.options,$o=z?z:{}
   ;

   sh=O.Class.$$PullShared(o);

   rv=function(op,onld){
      return O.Class.$$InitClass(this,arguments);
   }

   O.Class.$$AddAll(o,rv);
   z2=[];
   if($i&&lni){
      for(l2=0;l2<lni;l2++){
         z=$i[l2];
         if(O.IsString(z))zz=O.Class.$$classes[z.LCase()];
         else zz=z;
         if(zz){
            z2.push(zz);
            O.Class.$$AddAll(zz,rv);
         };
      };
   };
   rv.ExtImp({
         $extends:$e
      ,  $implements:z2
      ,  $name:nm
      ,  $type:'class'
      ,  $op:$o
      ,  Kill:function(){
         
         }.$$Sys()
   });

   if($e){
      O.Class.$$AddAll($e,rv,{Shared:true});
      O.Class.$$AddAll($e,rv);
   }
   else{
      rv.Implement({
         $inst:true,
         On:function(evt,fn,bnd){return O.Event.On(this,evt,fn,0,bnd);}.$$Sys(),
         $On:function(evt,fn,bnd){return O.Event.On(this,evt,fn,2,bnd);}.$$Sys(),
         SetOptions:function(op,op2){return O.Class.$$SetOptions(this,op,op2);}.$$Sys(),
         Fire:function(e,onDone){O.Event.Fire(this,e,onDone);}.$$Sys()
      });
      if(O.IsStr(o.$name)){pp=o.$name.Trim();if(pp!='')rv.$name=pp;};
      rv.Extend({
         $Reg:function(nam){O.Class.Reg(this,nam)}.$$Sys()
      });
   };
   z=o.Init;rv.prototype.Init=z?z:0;
   if(2){//-Shared
      zz='';z3={};pr=sh.Private;
      for(mm in pr){
         z2=pr[mm];
         if(zz=='')zz='var ';
         else zz+=',';
         zz+=mm+'=pr.'+mm;
      }
      eval(zz+';');
      delete sh.Private;
      for(mm in sh){
         z2=sh[mm];z4='z2';
         if(O.IsFun(z2)&&!z2.$$bound)z4=z2.toString();
         eval('rv.'+mm+'='+z4+';');
      }
   }

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
               if((def(z))&&!z.$prim){
                  $o=Object.Clone(o);
                  if(mm=='Private'&&IsObj(z)){$o.Private=true;O.Class.$$AddAll(z,c,$o)}
                  else if(mm=='Shared'){}
                  else if(z.$shared)sh[nm]=z;
                  else O.Class.$$Add(mm,z,c,$o);
               };
            };
            c.$$sh=sh;
         };
      }
   ,  $$InitClass:function(v,args){
         var rv=v,mm,mb,s='',z,f,ff,l,l2$fp,$fn,$v,k
            ,  p=v.$$private,p=p?p:{}
            ,  pb=v.$$public,pb=pb?pb:{}
         ;

         for(mm in p){
            z=p[mm];s='var '+mm+'='
            if(O.IsFun(z)&&!z.$$bound)s+=z.toString();
            else s+='z';
            eval(s+';');
         }
         
         for(mb in pb){
            f=pb[mb];
            if(O.IsFUN(f)&&f.$$added&&!f.$$sys){
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
               else if(O.IsProp(f)){
                  $v=f.$$v?Object.Clone(f.$$v):{};
                  eval(O.Property.$Init($v,'$v'));
                  eval(O.Property.$GetSet($v,'$v'));
                  k=_Get;if((k)&&!k.$$bound){$v.Get=f.Get=_Get=k.Bind(v)};
                  k=_Set;if((k)&&!k.$$bound){$v.Set=f.Set=_Set=k.Bind(v)};
                  eval(O.Property.$Base($v,'$v','v.'+mb));
               }
               else{
                  if(!f.$$bound){
                     $fp=f.$fParent;$fn=f.$fName;
                     eval('v.'+mb+'='+f.toString()+';');
                     v[mb].$fParent=$fp;v[mb].$fName=$fn;
                  }
                  else v[mb]=f;
               };
               f.$pInst=v;
            }
            else v[mb]=f;
         };

         if(v.Init)eval('v.Init('+O.$ArgsStr(args,'args')+');');
         v.Fire(['load','ready']);

         return v;
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
            if(nm=='Private'){
               zz={};
               Object.CopyTo(zz,O.Class.$$PullShared(z,2,all));
               Object.CopyTo(rv.Private,zz.Private);delete zz.Private;
               Object.CopyTo(rv,zz);
               //tk.push(nm);
            }
            else if(z.$shared||all){
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
   ,  $$RunFn:function(v,nam,args,pInst,notRecursive){
         var rv=null,a=args,s='',xt=0,z=0,zz=pInst,pi=zz?zz:v;
         if(v){
            xt=v.$extends;
            zz=pInst==v?v[nam]:v.prototype[nam];
            if(zz){z=2;eval("rv=zz.Bind(pi)("+$ArgsStr(a,'a')+");");};
         };
         if(!z&&xt&&!notRecursive)rv=O.Class.RunFn(xt,nam,args,pi);
         return rv;
      }
   ,  $$SetOptions:function(v,op,op2){
         if(!op2&&(v.$op||v.options)){op2=op;op=v.$op?v.$op:v.options;};
         v.op=v.options=Object.Merge(op,op2);
         var m,n,o=v.op,z=o.Events,e=z?z:0,z=o.$Events,E=z?z:0;
         //if(e){for(n in e){z=e[n];if(!z.$$bound)e[n]=z.Bind(v)};v.On(e);delete o.Events}
         //if(E){for(n in E){z=E[n];if(!z.$$bound)E[n]=z.Bind(v)};v.$On(E);delete o.$Events}
         if(e){v.On(e,0,v);delete o.Events}
         if(E){v.$On(E,0,v);delete o.$Events}
         return v;
      }
   ,  $$classes:{}
   ,  Reg:function(t,nam){
         var n=(O.IsStr(t.$name))?t.$name:(nam)?nam:'',z;
         z=((O.IsStr(t.$name))?t.$name:(nam)?nam:'').Trim();
         n=n.Trim();
         if(n!='')O.Class.$$classes[n]=t;
      }
});var c=Class,$$Add=c.$$Add,$$AddAll=c.$$AddAll,$$classes=c.$$classes,$$RunFn=c.$$RunFn;
O.Parent=function(){
   var a=arguments,cl=a.callee.caller,pi=cl.$pInst,p=cl.$fParent,nm=cl.$fName,z=p.$extends;
   return $$RunFn(z,nm,a,pi)
};

O.Event=function(nam,args){
   return function(){}.Extend({
      args:args,
      $$nam:nam,
      $_std:[],
      $_sys:[],
      $$Fire:function($sys,$std,onDone){
         var t=this,st=t.$_std,sy=t.$_sys,z,zz
            ,  f=function(v,$){
                  if(v){
                     $=$?v.PopL:v.PopR;
                     while(z=$()){
                        zz=z(t);
                        if(t.$$async){t.$$rng=0;return 2};
                        if(t.$$stop){return 2};
                     };
                  }
                  return 0;
               }
         ;
         if($sys)sy=t.$_sys=$sys;if($std)st=t.$_std=$std;
         if(onDone)t.$$done=onDone;
         if(t.$$rng)return;
         t.$$rng=2;t.$$async=0;
         if(f(sy))return;
         if(f(st))return;
         t.$$rng=0;
         if(t.$$done)t.$$done();
      },
      Done:function(){this.$$async=0;if(!this.$$rng)this.$$Fire();},
      Async:function(){this.$$async=2},
      Stop:function(){this.$$stop=2}
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
               if(bnd&&!d.$$bound)d=d.Bind(v);
               ar.push(d);
            }
         };
      }
   ,  Fire:function(v,ee,onDone){
         var k,z,zz,z2,ar,ev,e,g=Array.From(ee),l,ln=g.length;//g=O.IsArr(e)?e:[e];
   
         for(l=0;l<ln;l++){
            e=g[l];
            if(O.IsStr(e))e=g[l]=O.Event(e);
            e.caller=v;
            if(ev=v.$$evts){
               if(z2=ev[e.$$nam]){
                  e.$sy=z2.sys?Array.Clone(z2.sys):[];
                  k=z2.sys;if(!k)k=[];e.$sy=k;
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

Object.CopyTo(exports,O);