if(2){//-Native.
   var __$O_=exports, z, z2, z4, zz, Ex, Im, ExIm;
   if(2){//-Function modifiers [Extend(),ExtImp(),Implement()]
      z=Function; z2=z.prototype;
      zz=z2.Prim=function(){this.$$prim=2;return this;};zz.$$prim=zz.$$sys=2;
      zz=z2.Sys=function(){this.$$sys=2;return this;};zz.$$prim=zz.$$sys=2;
      zz=z2.PrimSys=function(){this.$$prim=this.$$sys=2;return this;};zz.$$prim=zz.$$sys=2;
      z4=z.Bind=z2.Bind=function(that, members){
         var t=this, m=members, mm
         	,	args=arguments.length>2?Array.slice(arguments, 1):null
         	,	F=function(){}
         	,	rv=function(){
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

			Object.defineProperty(rv, '$$parent', {
					get: function() { return t.$$parent; }
				,	set: function(v) { t.$$parent=v; }
			});

         return rv;
      };
      z4.$$prim=z4.$$sys=2;
      z.$$prim=z.$$sys=2;
   
      ExIm=z.ExtImp=z2.ExtImp=function(val, ops) {
         var t=this, mb, k=val, o=ops, op, ex, im, l, i, z, zz;
         
         o=o||{};
         if(o.extimp || (!o.ext && !o.imp)) o.ext=o.imp=2;
         ex=o.ext; im=o.imp;
         k=(k instanceof Array)? k : [k];
   
         for(l=k.length, i=0; i<l; i++) {
            z=k[i];
            for(mb in z){
               zz=z[mb];
               op={ ext: ex, imp: im };
               if(mb=='Prim') { op.prim=2; t.ExtImp(zz, op); }
               else if(mb=='Sys') { op.sys=2; t.ExtImp(zz, op); }
               else if(mb=='PrimSys') { op.prim=op.sys=2; t.ExtImp(zz, op); }
               else{
                  if(o.prim) zz.$$prim=2;
                  if(o.sys) zz.$$sys=2;
                  if(ex) t[mb]=zz;
                  if(im) t.prototype[mb]=zz;
               };
            };
         };
   
         return t;
      }.PrimSys();
      z.Extend=z2.Extend=function(val) { return this.ExtImp(val, {ext: 2}); };
      z.Implement=z2.Implement=function(val) { return this.ExtImp(val, {imp: 2}); };
      
      __$O_.Extend=function(obj, val) { return ExIm.Bind(obj)(val, {ext: 2}); };
      __$O_.ExtImp=function(obj, val) { return ExIm.Bind(obj)(val, {extimp: 2}); };
      __$O_.Implement=function(obj, val) { return ExIm.Bind(obj)(val, {imp: 2}); };
      
   };

   z=Array.prototype;

   Function.Implement({
         $class: Function
      ,  PrimSys: {
               $Run:function(){this.$run=2;return this}
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
   String.Sys().Implement({
         $class: String
      ,  PrimSys:{
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
            ,  Split: String.prototype.split
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
   Number.Sys().Implement({
         $class: Number
      ,  PrimSys:{
               Str:Number.prototype.toString
            ,  Proper:String.prototype.Proper
            ,  Val:String.prototype.valueOf
         }
   });
   Array.Sys().Extend({
      PrimSys: {
            Clone: function(v, recursive) {
               var rv=[],ln=v.length;
               for(lp=0;lp<ln;lp++)rv.push((recursive)?Clone(v[lp]):v[lp]);
               return rv;
            }.Extend({
                  Recursive:function(){
                     
                  }
            })
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
         ,  From: function(v, NullOnUndef){
               return (typeof v=='undefined')?
                     NullOnUndef? NULL : []
                  :  (v instanceof Array)? v : [v]
               ;
            }
         ,  HasStr: function(arr,str,matchCase) {
               var rv=false,a=arr,z,mc=matchCase,s=mc?str:str.LCase(),ln=a.length;
               for(lp=0;lp<ln;lp++){
                  if(IsStr(a[lp]))
                     if(s==mc?a[lp]:a[lp].LCase())return true;
               };
               return rv;
            }
      }
   });
   Array.Implement({
         $class: Array
      ,  $type:'array'
      ,  PrimSys:{
               Condense: function() {
                  var t=this, z, i, l=t.length, rv=[];

                  for(i=0; i<l; i++) {
                     z=t[i];
                     if(z instanceof Array) Array.Merge(rv, z.Condense());
                     else rv.Push(z);
                  };

                  return rv;
               }
            ,  FullOf: function(type, recursize) {
                  var t=this, v=t.valueOf(), i, l=v.length, z;
                  for(i=0; i<l; i++) {
                     z=v[i];
                     if(z instanceof type) {}
                     else if(z instanceof Array && recursive)
                        if(!z.FullOf(type, 2)) return false;
                     else return false;
                  };
                  return true;
               }
            ,  Has:function(v,CaSe){
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
   Object.Sys().Extend({
      PrimSys: {
            Clone:function(v, recursive){
               if(!recursive) return Object.CopyTo({}, v);
               //var rv=O.IsFun(v)?function(){}:{};
               var rv={}, mb, r=recursive;
               
               for(mb in v)
                  if((v[mb])&&!v[mb].$$prim&&!rv[mb]){
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
         ,  From: function(v, nam) {
               var rv=v;
               if(typeof v!='object') { rv={}; rv[n]=v; };
               return rv; 
            }
         ,  HasVar: function(ob,nam,matchCase){
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
      }
   });
   Boolean.Sys().Implement({$class: Boolean});
   Date.Sys().Implement({$class: Date});
   delete z; delete z2; delete z4; delete zz; delete Ex; delete Im; delete ExIm; 
};

if(2) {//-SandBox
   var __$SB_, __$O_=exports
      ,  __$VarString_=function(__$v_, __$name_) {
            //onsole.log('{ __$VarString_');
            var __$rv_='', __$z_, __$z2_, __$k_, __$k2_
               ,  __$v_=__$v_||{}
               ,  __$ev_=__$v_.$eval
            ;
            if(__$v_ instanceof Array || __$v_.$type=='array') {
               for(__$z_=0, __$k_=__$v_.length; __$z_<__$k_; __$z_++)
                  __$rv_+=__$VarString_(__$v_[__$z_], __$name_+'['+__$z_+']');
            }
            else {
               __$v_=Object.CopyTo({}, __$v_);
               for(__$z_ in __$v_) {
                  if(__$z_!='$eval') {
                     __$k_=__$v_[__$z_];
                     __$rv_+=((__$rv_=='')? 'var ' : ',')+__$z_+'='
                        +  ((__$ev_ && typeof __$k_=='function')?
                                 __$k_.Str()
                              :  __$name_+'.'+__$z_
                           )
                        +  '\n'
                     ;
                  };
               };         
               __$rv_+=';';
            };

            //onsole.log('} __$VarString_');
            return __$rv_;
         }
      ,  __$functions_=function() {
            var __$rvs_, __$V_;
            __$rv_.Eval=function(__$code_, __$noMod_) { eval(__$code_); if(!__$noMod_) eval(__$functions_); };
            __$rv_.EvalLib=function(__$code_) {
               var exports={};
               eval(__$code_);
               return exports;
            };
            __$rv_.EvalFunction=function(__$fun_) {
               return __$rv_.EvalLib('exports='+__$fun_.Str()+';');
            };
            __$rv_.Add=function(__$v_) {
               eval(__$VarString_(__$v_, '__$v_')+__$functions_);
               return __$rv_;
            };
            __$V_=__$rv_.Value=function(__$v_, __$v2_) {
               var __$z_, __$r_=__$rv_, __$to_=typeof __$v_
                  ,  __$a_=arguments
                  ,  __$l_=__$a_.length
               ;
               return (((__$v_ instanceof Array && __$v_.FullOf(String, 2))
                                 || typeof __$v_=='string')?
                     __$V_.Get(__$v_)
                  :  __$V_.Set(__$v_, __$v2_)
               );
            };
            __$V_.Get=function(__$nam_) {
               var __$v_;
               if(__$nam_ instanceof Array) {
                  __$nam_=__$nam_.Condense();
                  var __$l_=__$nam_.length, __$z_;
                  __$v_={};
                  for(__$i_=0; __$i_<__$l_; __$i_++) {
                     __$z_=__$nam_[__$i_];
                     eval('__$v_.'+__$z_+'='+__$z_+';');
                  };
               }
               else eval('__$v_='+__$nam_+';');
               return __$v_;
            };
            __$rvs_=__$V_.Set=function(__$nam_, __$val_) {
               var __$v_=__$nam_;
               
               if(typeof __$v_=='string') { __$v_={};__$v_[__$nam_]=__$val_; };
               eval(__$VarString_(__$v_, '__$v_'));
               eval(__$functions_);
               
               return __$rv_;
            };
            __$rv_.Fork=function(__$v_) {
               var __$rvs_, __$V_
                  ,  __$rv_=function(__$code_, __$noMod_) { __$rv_.Eval(__$code_, __$noMod_); }
               ;
               eval(__$VarString_(__$v_)+__$functions_);
               
               return __$rv_;
            };
         }.InnerStr();

   ;
   __$SB_=__$O_.SB=function(code,vars) {
      var __$X_=exports; 
   };

   __$SB_.State=function(__$vars_, __$noGlobal_) {
      var __$rv_, __$z_, __$z2_, __$k_, __$k2_ 
         ,  __$vars_=__$vars_||{}
         ,  __$v_=Array.From(__$vars_)//(__$vars_ instanceof Array || __$vars_.$type=='array')?__$vars_ : [__$vars_]
         ,  __$G_=global
         ,  __$X_=exports
      
         ,  exports=undefined, __$vars_=undefined
      ;

      if(__$noGlobal_) {
         for(__$k_ in global) eval('var '+__$k_+'=undefined;');
         var global=undefined;
      };
      //onsole.log('__$VarString_='+__$VarString_(__$v_, '__$v_'));
      eval(__$VarString_(__$v_, '__$v_'));

      __$rv_=function(__$code_, __$noMod_) { __$rv_.Eval(__$code_, __$noMod_); };
      eval(__$functions_);
   
      return __$rv_;
   };



};

if(2) {//-vars
   var z, z2, z3, z4, zz, x, l, p, fn=Function
      ,  G=global
      ,  o=O=pops=G.$_P_=G.$pops=exports
      ,	ArgStr
      ,	Fire
		,	On
      ,  SetupVars
      ,	$CreateOptions
   ;
};
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
      ,  cout=o.cout=console.log.Sys()
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
                     if(z&&(!z.$$prim||prm)){
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
               if(!z.$$prim&&!hs.Has(n,2))rv[n]=z;
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
      ,  Prim:function(v){v.$$prim=2;return v;}
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
O.ArgStr=O.$ArgsStr=function(args, nam, startComma){
   var a=args, rv=((a)&&a.length&&startComma)? ',' : '', n=nam?nam:'arguments';
   if(a) for(lp=0;lp<a.length;lp++) rv+=n+'['+lp+']'+(lp!=a.length-1?',':'');
   return rv;
};
O.VarStr=O.$VarStr=function(ob, nam){
   var rv='', n;
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
               $$bound: 0
            ,  $type: 'overload'
            ,  $isOverLoad: 2
            ,  Bind: function(v){
                  var t=this,f=t.fns,rv=O.Overload.$Base(),mb;
                  for(mb in f)rv.fns[mb]=f[mb].Bind(v);
                  rv.$$bound=2;
                  return rv
               }
            ,  fns: ff
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
O.Property=function(val){
   return O.Blank().Extend({ $isProp: 2, $$v: val });
}.Extend({
      $Init:function(v,vNam,cr){
         cr=cr||'';
         return(''
            +  "var $n$="+vNam+"||{}"
            +     ",    $p$=$n$.Private=$n$.Private||{}"
            +     ",    $v$=$p$.$val=(typeof $p$.$val!='undefined')?" 
            +              "     $p$.$val"
            +              ":    (typeof $n$.$val!='undefined')? $n$.$val : $n$.val"
            +     ",    $g$=$n$.Get=$n$.Get || function() { return $val; }"
            +     ",    $s$=$n$.Set=($n$.Set && $n$.Set!='auto')?"
            +              "     $n$.Set"
            +              ":    function(vl) { $val=vl; return $val; }"
            +  ";"
            +  "eval($_P_.$VarStr($p$, '$p$'));"
            +  vNam+"=$n$"
         );
      }
   ,  $Base:function(v,vNam,nam,prntNam){
         return(''
            +  'Object.defineProperty('+prntNam+',"'+nam+'",{'
            +     '   get:_Get'
            +     ',  '+(v.readonly?'':'writable:true, set:_Set')
            +  '});'
         );
      }
   ,  $GetSet:function(v, vNam){
         var z='var _Get=',f; 
         
         f=v.Get;
         z+=((f.$$bound)? (vNam+'.Get') : f.Str());
                  
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
   if(typeof nam!='string') { onReady=specs; specs=nam; nam=0; }
   else onReady=specs;
   if(2) {//-vars
	   var z=2, z1, z2, z4, zz,mm, nm,pp,i, l,l2,r,sh,rv,$ini, k, stt, kk,pr,ze,zr,ln,vs, spc={}
	      ,	ExtFn, rvs, $mmb
	      ,  is={}, dd
	      ,  o=specs||{}
	      ,  $if=Array.From(o.Interface)
	      ,  $e=Array.From(o.Extends)
	      ,  $i=Array.From(o.Implements)
	      ,  $pi=Array.From(o.PreImp)
	      ,  $p=o.Private
	      ,  $s=o.Shared
	      ,  nm=nam||(o.$name||'')
	      ,  $o=o.options
	   	,	jj={}
	   ;
	};   

   vs=Class.Pull(o);
   rv=Class.Obj(jj, function(op,onld){
      return ((this instanceof rv)?
            O.Class.InitClass(is, arguments)
         :  rv.Create.Call(arguments)
      );
   }.Sys().Extend({
   		$$members: {}
   }), 2);
   $mmb=rv.$$members;

	if(2) {//-Extends
		z4=Class.MakeExtends(rv, $e, rv, rv, 0, 2);
		rv.$$exInst=z4.arr;
		ExtFn=z4.Fn;
	};

   dd=SetupVars({}, vs.PRIVATE, {}, rv);
   rv.$$state=SetupVars(rv, vs.PrivShare, vs.Shared, rv, dd, { Extended: ExtFn }, rv); //-Shared

   is={
         $$PRIVstate: dd
      ,  $extends:$e
      ,  $implements:$i
      ,  $interface: $if
      ,  $preImp:$pi
      ,  $name:nm
      ,  $type:'class'
      ,  $op:$o
      ,  $vs:vs
      ,  $iid:O.$$iid++
      ,  $class: rv
   }
   rv.Extend( [
         is
      ,  {
					$specs: o
            ,  $Reg:function(nam) { O.Class.Reg(this, nam); return this; }.Sys()
            ,  Create: function() {
                  var RV;
                  eval('RV=new rv('+O.ArgStr(arguments, 'arguments')+')');
                  return RV;
               }
         }
   ]);
   is.$class=rv;

   return rv;
}.Extend({
      InitClass:function(v, args){
         if(v.$InitState) return v.FUNCTION? v.FUNCTION.Call(args): undefined;

         if(2) {//-vars
	         var nm,mb,s='',z,zz,z1,z2,z3,z4,f,ff,f2,l,ll,l2,ln,$fp,$fn,$v,k,x, FUN
	            ,	imps
	            ,	ExtFn, ImpFn
	            ,  a=args
	            ,	i=(a&&a.length&&a[0])? a[0] : {}
	            ,	noInit=i.$$noInit

	            ,  vs=v.$vs
	            ,  p=vs.Private||{}
	            ,  pb=Object.CopyTo({}, [
	                     vs.Public||{}
	                  , { $$SetOp: function(ops){ op=OP=ops; } }
	               ])
	            ,	jj={ Fire: i.$$Fire, On: i.$$On, Once: i.$$Once, $On: i.$$$On, $Once: i.$$$Once }
	            ,  rv=Class.Obj(jj, (pb.FUNCTION)?
	                     function() { return FUN.Call(arguments); }.Sys()
	                  :  {}
	               )
	            ,  $e=v.$extends, $ei=rv.$eInst=[]
	            ,  $i=v.$implements, $ii=rv.$iInst=[]
	            ,  $pi=v.$preImp, $pii=rv.$piInst=[]
	            ,  $if=v.$interface
	         	,	thisClass=i.$$thisClass||v.$class
	         	,	bindTo=i.$$bindTo||rv
	         ;
			};
         
         x=rv.$iid=O.$$iid++;
			rv.$$sys=2;
         rv.$inst=2;
         rv.$InitState='start';

			imps=Class.MakeExtends(rv, $pi, bindTo, thisClass);//-PreImp
			if(2) {//-Extends
				z4=Class.MakeExtends(rv, $e, bindTo, thisClass);
				rv.$$exInst=z4.arr;
				ExtFn=z4.Fn;
			};
			if(2) {//-Implements
				z4=Class.MakeExtends(rv, $i, bindTo, thisClass, imps);
				rv.$$imInst=z4.arr;
				ImpFn=z4.Fn;
			};

         rv.$$state=SetupVars(rv, vs.Private, vs.Public, thisClass, v.$$PRIVstate, {
         		Extended: ExtFn
         	,	Implemented: ImpFn

   		}, bindTo);
         if(typeof rv.FUNCTION=='function') FUN=rv.FUNCTION;

         if(z=rv.Init)
            if(!z.$$bound) z=z.Bind(rv);
         if(!noInit) {
               if(z) z.Call(a);
               rv.Fire(['load','ready']);
         };

         return rv;
      }
   ,  Obj: function(op, v, shared) {
			var Fire=O.Event.Fire;

         if(!v) { v=op; op={} };
         v.On=op.On||function(evt, fn, bnd){ return On(v, evt, fn, 0, 0, bnd); }.Sys();
         v.Once=op.Once||function(evt, fn, bnd){ return On(v, evt, fn, 0, 2, bnd); }.Sys();
         v.$On=op.$On||function(evt, fn, bnd) { return On(v, evt, fn, 2, 0, bnd); }.Sys();
         v.$Once=op.$Once||function(evt, fn, bnd){ return On(v, evt, fn, 2, 2, bnd); }.Sys();
         v.Fire=op.Fire||function(e, args, onDone) { Fire(v, e, args, onDone); }.Sys();

			if(!shared) {
	         v.$inst=true;
	         v.SetOptions=op.SetOptions||function(op,op2){return O.Class.SetOptions(v,op,op2);}.Sys();
	         if(typeof v!='function') {
	            var f=Function;
	            v.Extend=f.Extend;
	            v.ExtImp=f.ExtImp;
	            v.Implement=f.Implement;
	         };
			};

         return v;
      }
   ,  Pull:function(v,pull,is){
         var nm,z,tk=[],l,ln,zz
            ,  p=v.Private, ps=v.PrivShare, pb=v.Public, s=v.Shared
            ,  p2=v.PRIVATE
            ,  $p=Array.Clone(Array.From(p?p.EXPAND:[]))
            ,  $ps=Array.Clone(Array.From(ps?ps.EXPAND:[]))
            ,  $pb=Array.Clone(Array.From(pb?pb.EXPAND:[]))
            ,  $s=Array.Clone(Array.From(s?s.EXPAND:[]))
            ,  $p2=p2? Array.Clone(Array.From(p2.EXPAND)) : []
         ;
         if(p)delete v.Private; else p={};
         if(p2)delete v.PRIVATE;
         if(ps)delete v.PrivShare; else ps={};
         if(pb)delete v.Public; else pb={};
         if(s)delete v.Shared; else s={};
      
         if(z=s.Private) {
            if(z.EXPAND) {
               Array.Merge($ps, Array.From(z.EXPAND));
               delete z.EXPAND;
            };
            Object.CopyTo(ps, z);
            delete s.Private;
         };
         if(z=pb.Shared){
            if(z.EXPAND) {
               Array.Merge($s, Array.From(z.EXPAND));
               delete z.EXPAND;
            };
            s=Object.CopyTo({}, [z, s]);
            delete pb.Shared;
         };
         if(z=p.Shared){
            if(z.EXPAND) {
               Array.Merge($ps, Array.From(z.EXPAND));
               delete z.EXPAND;
            };
            ps=Object.CopyTo({}, [z, ps]);
            delete p.Shared;
         };

         for(nm in v){
            z=v[nm];zz=2;
            if(!z.$$prim){
               if(z.$shared)
                  if(z.$private)ps[nm]=z; else s[nm]=z;
               else if(z.$private)p[nm]=z;
               else{pb[nm]=z;zz=0;};
               
               if(zz)delete v[nm];
            };
         };

         return {
               Private: p, Public: pb, PrivShare: ps, Shared: s, PRIVATE: p2
            ,  EXPAND: {
                     Private: $p,  PrivShare: $ps
                  ,  Public: $pb,  Shared: $ps, PRIVATE: $p2
               }
         };

      }
   ,  $$RunFn:function(v,nam,args,notRecursive,noBase){
         var rv=null,v=v?v:{},a=args,pi,xt=v.$$exInst,zz=v[nam];
         if(zz&&!noBase)eval("rv=zz.Bind(pi)("+$ArgsStr(a,'a')+");");
         else if(xt&&!notRecursive)rv=O.Class.$$RunFn(xt,nam,a,0,0);
         return rv;
      }
	,	MakeExtends: function(v, $e, bindTo, thisClass, existingRv, shared) {
			var z, z2, zz, k, ff, i, i2, l, ll, ln, ln2, nm
				,	rv=existingRv||{ arr: [], }
				,	arr=rv.arr
				,	arr2
				,	fn=rv.Fn=(rv.Fn || function(i) { return arr[(i&&i==0)? i : 0] })
			;

         if(ll=$e.length){
            for(l=0; l<ll; l++) {
               k=$e[l];
               zz=arr[l]=(shared)? k : new k({
               		$$noInit: 2
               	,	$$bindTo: bindTo
               	,	$$thisClass: thisClass
               	,	$$Fire: v.Fire
               	,	$$On: v.On
               	,	$$Once: v.Once
               	,	$$$On: v.$On
               	,	$$$Once: v.$Once
            	});
               for(nm in zz){
                  z=zz[nm];
                  
                  if((z) && !z.$$prim) {
                  	if(typeof z=='function' && (!z.$$bound || z.$$cBound))
                  		z=z.Bind(bindTo||z, { cBound: 2 });
                  	v[nm]=z;
               	};
               };
            };
         };

			

			return rv;
		}
	,	MakeExtends2: function(v, $e, bindTo, thisClass, existingRv, shared) {
			var z, z2, zz, k, ff, i, i2, l, ll, ln, ln2, nm
				,	rv=existingRv||{ arr: [], }
				,	arr=rv.arr
				,	arr2
				,	fn=rv.Fn=(rv.Fn || function(i) { return arr[(i&&i==0)? i : 0] })
			;

         if(ll=$e.length){
            for(l=0; l<ll; l++) {
               k=$e[l];
               zz=arr[l]=new k({
               		$$noInit: 2
               	,	$$bindTo: bindTo
               	,	$$thisClass: thisClass
               	,	$$Fire: v.Fire
               	,	$$On: v.On
               	,	$$Once: v.Once
               	,	$$$On: v.$On
               	,	$$$Once: v.$Once
            	});
               for(nm in zz){
                  z=zz[nm];
                  if((z) && !z.$$prim) v[nm]=z;
               };
            };
         };

			

			return rv;
		}
   ,  SetOptions:function(v,op,op2){
         if(!op2&&(v.$op||v.options)) {op2=op;op=v.$op?v.$op:v.options;};

         //v.op=v.options=Object.Merge(op,op2);
         v.op=v.options=$CreateOptions(op,op2);
         var m, n, o=v.op, e=o.On, E=o.$On;
         if(v.$$SetOp) v.$$SetOp(o);
         if(e) v.On(e,0,v);
         if(E) v.$On(E,0,v);
         return v;
      }
   ,  SetupVars: function(obj, priv, pub, thisClass, forkState, vars, bindTo) {
         var z, z2, z4, zz, k, k2, k4, kk, op, stt, s2, ya
            ,  vd, nm, jj, $fp, $fn, mb, gt, st, os={}
            ,  tc=thisClass
            ,  xt=(tc!==obj)?
                     {
                           T: obj
                        ,  op: 0, OP: 0
                     }
                  :  {}
         	,	st={
         			Parent: O.Parent
         		}
         ;
			op=obj.$$props=obj.$$props||{};
         if(tc) obj.$class=tc;

         zz=Object.CopyTo({}, priv); z1={ $eval: 2 };
         for(nm in zz){
            z=zz[nm];
            if(typeof z=='function' && !z.$$sys && !z.$$bound) { z1[nm]=z; zz[nm]=null; }
            else if(typeof z=='function' && !z.$$sys && z.$$cBound) { zz[nm]=z.Bind(bindTo||obj, { cBound: 2 }); };
         };
         //stt=O.SB.State([zz, { thisClass: tc }, xt, z1]);
         stt=(forkState)? forkState.Fork() : O.SB.State();
         stt.Add({ oobbjj: bindTo||obj });
         stt.Add([zz, { thisClass: tc }, vars||{}, xt, z1]);
			for(nm in z1) {
				z=z1[nm];
				//out('if(typeof '+nm+'!="undefined")'+nm+'='+nm+'.Bind(oobbjj, { $$cBound: 2 });');
				stt.Eval('if(typeof '+nm+'!="undefined")'+nm+'='+nm+'.Bind(oobbjj, { $$cBound: 2 });');
			};

         zz=Object.CopyTo({}, pub); z1={};
         k=obj.$$varDat=(obj.$$varDat||{});
         kk=obj.$$members=(obj.$$members||{});
         for(nm in zz) {
            ya=2;
            vd=k[nm]={};
            z=z2=zz[nm];

            if(typeof z=='function' && !z.$$sys && (!z.$$bound||z.$$cBound)) {
               if(z.$isOverload) {
                  vd.type='overload';
                  k4=z.fns;
                  for(mb in k4){
                     jj=k4[mb];
                     if(!jj.$$bound||jj.$$cBound){
                        $fp=jj.$fParent; $fn=jj.$fName;
                        if(!jj.$$sys&&!jj.$$bound) jj=stt.EvalFunction(jj);
                        k4[mb]=jj=jj.Bind(bindTo||obj, {$$cBound: 2});
                        jj.$fParent=$fp; jj.$fName=$fn;
                     };
                  };
               }
               else if(z.$isProp) {
                  vd.type='property';
                  k4=Object.Clone(z.$$v||{});
                  s2=stt.Fork(k4.Private||{});
                  gt=k4.Get; st=k4.Set;
                  ya=0;

                  if(gt && !gt.$$sys && (!gt.$$bound||gt.$$cBound)) {
                  	if(!gt.$$bound) gt=s2.EvalFunction(gt);
                  	gt=gt.Bind(bindTo||obj, {$$cBound: 2});
               	};
                  if(st && !st.$$sys && (!st.$$bound||st.$$cBound)) {
                  	if(!st.$$bound) st=s2.EvalFunction(st);
                  	st=st.Bind(bindTo||obj, {$$cBound: 2});
               	};
                  //if(st && !st.$$sys && !st.$$bound) st=s2.EvalFunction(st);
                  
                  os.get=gt;
                  if(!k4.readonly && st) {
                     os.set=st;
                     os.writable=true;
                  };
                  
                  op[nm]=os;
                  Object.defineProperty(obj, nm, os);
               }
               else {
            		vd.type='function';
            		if(!z.$$bound) z2=stt.EvalFunction(z);
            		z2=z2.Bind(bindTo||obj, {$$cBound: 2});
         		};
            };
            if(ya) {
            	ya=obj[nm];
            	if(ya) z2.$$parent=ya;
            	obj[nm]=kk[nm]=k[nm]=z2;
         	};
         };
      
         return stt;
      }
   ,  Reg:function(t,nam){
         var n= (O.IsStr(t.$name))?t.$name:(nam)?nam:'', z;
         z= ((O.IsStr(t.$name))?t.$name:(nam)?nam:'').Trim();
         n= n.Trim();
         if(n!='') O.Class.$$classes[n]= t;
      }
});
O.Parent=function(){
   var a=arguments, z=a.callee.caller.$$parent;
   return(z)?z.Call(a):undefined;
}.Sys();

O.Interface=function(nam,specs) {
   var n=nam, s=specs, l, nm, z, zz, k, a, it={}, unk='UNKNOWN'
      ,  I=O.Interface
      ,  rv={
               $$type: 'interface'
            ,  members: {}
            ,  Chech: function(v) {}
            ,  Refresh: function() { rv.members=Object.CopyTo({}, it); return rv; }
         }
      ,  pt=rv.prototype;
   ;
   if(typeof n!='string') s=n;n='';
   for(nm in s){
      zz=s[nm];
      it[nm]=I.MakeItem(s[nm]);

   };
   
   return rv.Refresh();
   
   
   for(nm in s){
      if(typeof zz=='string'){
         zz=zz.split('|');
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
}.Extend( {
      MakeItem: function(v, isIObj) {
         var a=arguments, l=a.lenght, rv, i, l ,nm, z, k, to=typeof v, I=O.Interface;
         
         if(to=='string') {
            v=v.split('||');
            l=v.length;
            if(l>1) {
               rv=[];
               for(i=0; i<l; i++)
                  rv.Push(I.MakeItem(v[l]));
            }
            else {
               v=v[0].split('|');
               k=I.NamToTyp(v[0]);
               rv={ type: k };
            };
         }
         else if(v instanceof Array) {
            rv=[];
            for(i=0, l=v.length; i<l; i++) {
               k=I.MakeItem(v[i]);
               if(k instanceof Array) Array.Merge(rv, k);
               else rv.Push(k);
            };
         }
         else if(I.IsIObj(v)) { rv=v; v.type=I.NamToTyp(v.type); }
         else { rv={ type: v }; };
         
         return rv;
      }
   ,  StrToObj: function(v) {
         
      }
   ,  NamToTyp: function(v) {
         var st=typeof v=='string', k=(st)? v.LCase() : v;
         return( (st)?
               (k=='array')? Array
                  : (k=='date')? Date
                     : (k=='class')? O.Class
                        : (k=='function')? Function
                           : (k=='interface')? O.Interface
                              : (k=='number')? Number
                                 : (k=='object')? Object
                                    : (k=='overload')? O.OverLoad
                                       : (k=='property')? O.Property
                                          : (k=='string')? String
                                             : O._(v)
            :  v
         );
      }
   ,  IsIObj: function(v) {
         var nm, z;
         for(nm in v) if(nm!='type' && nm!='args') return 0;
         return 2;
      }
});

O.Event=function(nam, op) {}.Extend( {
      On:function(v, evt, fn, sys, once, bnd){
         var z=sys?'sys':'std',zz,ev=v.$$evts,mb,z2,ar,g,d,l,ln;
         if(!ev)ev=v.$$evts={};
         
         if(typeof evt=='string') { zz=evt; evt={}; evt[zz]=fn; };
         for(mb in evt) {
            z2=ev[mb]; if(!z2) z2=ev[mb]={};
            ar=z2[z]; if(!ar) ar=z2[z]=[];
            g=Array.From(evt[mb]);
            ln=g.length;
            for(l=0;l<ln;l++) {
               d=g[l];
               if(bnd && !d.$$bound) { zz=d; d=d.Bind(v); d.fn=zz };
					if(once) { d=d.Caller(); d.$once=2 };
               ar.push(d);
            };
         };
      }
   ,  Fire: function(v, ee, args, onDone) {
         var k, z, zz, z2, ar, ev, e, l, l2, ll, i, ii, fn, nam, std, sys
         	,	evnts=[]
         	,	$evts=v.$$evts||{}
         	,	g=Array.From(ee)
         	,	ln=g.length
      	
      	;
   		v.$$evts=$evts
   		args=args||[];
         
         if(arguments.length<4 && typeof args=='function') {
      		onDone=args;
      		args=[];
      	};
         
			for(i=0; i<ln; i++) {
				nam=z=g[i];
				if(typeof z=='string') z={ name: z };
				else { z=Object.Clone(z); nam=z.name; };
			
				if(typeof nam!='string' || nam=='')
					throw('event names must be strings, and cannot be blank.');
			
				evnts.Push(z);
				z.args=args;
			
				if(zz=$evts[nam]) {
					if(ar=zz.std) { k=z.std=Array.Clone(ar); k.index=0; };
					if(ar=zz.sys) { k=z.sys=Array.Clone(ar); k.index=0; };
				};
			
			
			
			};

			ll=evnts.length;
			ii=0;
			
			fn=function() {
				var z, z2, zz, k, std, sys, FN;
				
				if(ii<ll) {
					z=evnts[ii];
					sys=z.sys; std=z.std;

					if(std && std.index<std.length) { FN=std[std.index]; std.index++; }
					else if(sys && sys.index<=sys.length) {
						FN=sys[sys.length-sys.index];
						sys.index++;
					}
					else(ii++);
					
					if(FN) {
						k={
								$async: 0
							,	$pass: 2
							,	$passMsg: ''
							,	sender: v
							,	Async: function() { this.$async=2; }
							,	Done: function() { if(this.$async) fn.Call(arguments); }
							,	Fail: function(msg) { this.$passMsg=msg||''; this.$pass=0; }
						};
						eval('FN(k'+ArgStr(args, 'args', 2)+');');
						if(!k.$async) fn();
					}
					else fn();
				}
				else if(onDone) onDone();
			};
			fn();

      },
});
O.Val=function(val, ops){
   var rv={
         $$isVal: 2
      ,  value: val
      ,  options: Object.LCase(ops)
   }
}
$CreateOptions=O.CreateOptions=function(ops, settings){
   var z, i, nm, z2, k, o=Array.From(ops||[]), l=o.length, s=settings||{}, rv=s.rv||{};
   
   for(i=0; i<l; i++) {
      z=o[i]||{};
      if(z.$class==Array) z=CC(z);
      else if(z.$type=='class') z=z.options||{};

      Object.CopyTo(rv, z)
   };
   
   
   return rv;
};
$CreateOptions=O.CreateOptions=function(ops, settings){
	var a=arguments, i, k, l, lst=[], nm, rv={}, z, zz; 

	for(i=0, l=a.length; i<l; i++) {
		z=a[i];
		if(z instanceof Array) Array.Merge(lst, z);
		else lst.Push(z);
	};

	for(i=0, l=lst.length; i<l; i++) {
		z=lst[i];
		for(nm in z) {
			k=z[nm];
			zz=rv[nm];
			if((typeof zz=='undefined') || !(typeof k=='object' && typeof zz=='object')) 
				rv[nm]=k;
			else rv[nm]=$CreateOptions(zz, k);
		};
	};




	return rv;
};

if(2) {//-Set locals
   ArgStr=O.ArgStr;
	Fire=O.Event.Fire;
	On=O.Event.On;
   SetupVars=Class.SetupVars;
};
