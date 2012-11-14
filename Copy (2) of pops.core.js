if(2) {//-vars
   var CO, z, z2, z3, z4, zz, x, l, p, fn=Function
   ,	cSide=(typeof Document!='undefined' && Document.addEventListener)
   ,  G=(cSide)? window : global
   ,  o=O=pops=son=G.$_P_=G.$pops=G.$son=G.son=((cSide)? {} : exports)

	,	JSON_parse=JSON.parse
	,	JSON_stringify=JSON.stringify

   ,	ArgStr
   ,	Fire
	,	On
   ,  SetupVars
   ,	$CreateOptions
   ;

	if(!cSide) {
		var
			$fs=require('fs')
			,	$fs_readFile=$fs.readFile
			,	$fs_readFileSync=$fs.readFileSync
			,	$fs_writeFile=$fs.writeFile
			,	$fs_writeFileSync=$fs.writeFileSync
		;
	};
};
if(2){//-Native.
   var __$O_=O, z, z2, z4, zz, Extend, Implement, ExIm, ExtImp;
   if(2){//-Function modifiers [Extend(),ExtImp(),Implement()]
      z=Function; z2=z.prototype;
      zz=z2.Prim=function(){this.$$prim=2;return this;};zz.$$prim=zz.$$sys=2;
      zz=z2.Sys=function(){this.$$sys=2;return this;};zz.$$prim=zz.$$sys=2;
      zz=z2.PrimSys=function(){this.$$prim=this.$$sys=2;return this;};zz.$$prim=zz.$$sys=2;
      z.$$prim=z.$$sys=2;

      z.Bind=z2.Bind=function(that, members){
			if(this.$$bound) return this.$$FN.Bind(that, members);
         var t=this, m=members, mm
         	,	rv=function() {
						return t.apply(that, arguments);
	         	}.Extend({ $$FN: t, $$bound: 2, $$that: that });
         ;
         if(m) for(mm in m) rv[mm]=m[mm];

			Object.defineProperty(rv, '$$FN', {
					get: function() { return t; }
			});
			Object.defineProperty(rv, '$$parent', {
					get: function() { return t.$$parent; }
				,	set: function(v) { t.$$parent=v; }
			});
			Object.defineProperty(rv, '$$mom', {
					get: function() { return t.$$mom; }
				,	set: function(v) { t.$$mom=v; }
			});
			Object.defineProperty(rv, '$$MEMBERS', {
					get: function() { return m; }
			});
			rv.CloneBound=function(members) {
				return this.Bind(that, Object.CopyTo({}, [m, members||{}]));
			};

         return rv;
      }.PrimSys();
		z.CBind=z2.CBind=function(that, members) {
			var rv=this, z={ $$cBound: 2 }
				,	mbrs=(members)? Object.CopyTo({}, [members, z]) : z
			;

			if(rv.$$bound)
				if(rv.$$cBound) rv=rv.$$FN.Bind(that, mbrs);
				else if(members) rv=rv.CloneBound(members);
			else rv=rv.Bind(that, mbrs);

			return rv;
		}.PrimSys();

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
      
      Extend=O.Extend=function(obj, val) { return ExIm.Bind(obj)(val, {ext: 2}); };
      ExtImp=O.ExtImp=function(obj, val) { return ExIm.Bind(obj)(val, {extimp: 2}); };
      Implements=O.Implement=function(obj, val) { return ExIm.Bind(obj)(val, {imp: 2}); };
      
   };

   z=Array.prototype;

   Function.Implement({
         $class: Function
      ,  PrimSys: {
               $Run: function(){this.$run=2;return this}
            ,  aApply: function(args,This){
                  var fn=this,t=This;
                  process.nextTick(function(){
                     eval('fn'+((t)?'.Bind(t)':'')+'('+$ArgsStr(args,'args')+');');
                  });
                  return this;
               }
            ,  aCall: function(){this.aApply(arguments)}
            ,  Apply: function(that, args){
                  var fn=this;
                  if(this.$$bound){
							fn=this.$$FN;
							if(!this.$$cBound) that=this.$$that;
                  };
                  return fn.apply(that, args||[]);
               }
            ,  Call: function(that, args){
                  var fn=this;
                  if(this.$$bound) { fn=this.$$FN; that=this.$$that; };
                  //eval('rv=this('+O.ArgStr(a,'a')+');');
                  return fn.apply(that, args||[]);
                  return rv;
               }
            ,  Caller: function(){
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
	Function.Extend({
		PrimSys: {
			Empty: function() {}
		}
	})
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
         ,  UCase: function(obj, recursive){return Object.LCase(obj, recursive,2)}
         ,  Merge: function(ob,ob2){
               var rv=ob?Object.Clone(ob):{};
               if(ob2)for(mb in ob2)rv[mb]=ob2[mb];
               return rv;
            }
			,	Remove: function(v, names) {
					var n=names, i, l, z;
					for(i=0, l=n.length; i<l; i++) if(v[z=n[i]]) delete v[z];
				}

      }
   });
   Boolean.Sys().Implement({$class: Boolean});
   Date.Sys().Implement({$class: Date});
   
   if(2) {//- JSON
		var JsonSafeStr=JSON.SafeStr=function(val, depth, dbg) {
	   	return JSON.stringify(JsonSafeStr.MakeSafeVal(val, [], 0, depth, dbg));
	   }.Extend({
	   	MakeSafeVal: function(val, no, ns, depth, dbg) {
	   		var i, jj, k=null, k1, k2, l, nm, ns=ns || '<BASE>', rv=val
	   		,	tp=typeof rv, ya=2, z, addNo=0;
	   		
	   		if(rv) {
		   		if(typeof depth=='undefined') depth=2;
					if(rv instanceof Array) tp='array';
					if(depth<1) return('end-of-depth');
		   		
		   		//no=(no)? Array.Clone(no) : [];
		   		no=no||[];
	
   		
		   		if(dbg) cout('  tp='+tp);
		   		else if(rv.$type=='class' && 0) {}
		   		else if(tp=='array') { addNo=2; k=rv=[]; }
		   		else if(tp=='function') {
		   			addNo=2;
		   			rv={ 'TYPE': 'Function', 'CODE': val.Str() };
		   			k=rv.MEMBERS={};
		   		}
		   		else if(tp=='object') { addNo=2; k=rv={}; }
	   			else { rv='TYPE: '+tp+'  -  VALUE: '+val; ya=0; };
	   		
		   		if(addNo) {//-CheckForDupe
		   			for(i=0, l=no.length; i<l; i++)
		   				if((z=no[i]).val==val) return { '<duplicate of>': z.ns };
						no.Push({ ns: ns, val: val });	   		
	   			};
					
					if(ya) {
		   			for(nm in val) {
		   				if(!k[nm]) { 
		   					z=val[nm];
								if((!z || !(z.$$prim || z.$$sys)) && (nm!='Extend' && nm!='Implement')) {
			   					//O.out('  !!^^^^^^  nm = '+nm+'  ^^^^^^!!  ');
			   					if(dbg) cout('  nm='+nm);
			   					k[nm]=JsonSafeStr.MakeSafeVal(z, no, ns+':'+nm, depth-1, dbg);
		   					};
		   				};
		   			};
					};
	   		
	   		};
				
	   		return rv;
	   	}
	   })
		JSON.FromFile=function(filnam, cb) {
			$fs_readFile(filnam, function(err, val) {
				if(cb) { if(err) cb(err); else cb(0, JSON_parse(val)); };
			});
		}
		JSON.FromFileSync=function(filnam) {
			return JSON_parse($fs_readFileSync(filnam));
		}
		JSON.ToFile=function(filnam, val, cb) {
			var z=JSON_stringify(val);
			$fs_writeFile(filnam, z, function(err, val) {
				if(cb) { if(err) cb(err); else cb(0, z); };
			});
		}
		JSON.ToFileSync=function(filnam, val) {
			return $fs_writeFileSync(filnam, JSON_stringify(val));
		}
	};
   
   delete z; delete z2; delete z4; delete zz; delete Ex; delete Im; delete ExIm; 
};

if(2){//-Setup system nodes.
   if(!G.$$modes){
      z=G.$$modes={};
      z.os=z.$os=process.platform;
   };
};

if(2){//-misc. (var'd) [cout(),sout(),Cls(),def(),Type(),typeOf(),TypeOf(),udef]
	if(2) {//- cout
		var
	      	coutAutoClear=2, coutLog=0, coutBuffer='', coutFilename=''
	      ,  cout=o.cout=function(val) {
	      		if(coutLog) coutBuffer+=''+val+'\n';
	      		console.log(val);
   			}.Sys()
   		,	z=cout.log={
						autoClear: 2
					,	filename: ''
   				,	Clear: function() { coutBuffer=''; return z }
					,	Dump: function(ops, OnRdy) {
							if(!cSide) {
								var o=ops||{}
									,	fil=o.file||z.filename
									,	clear=(typeof o.clear!='undefined')? o.clear : z.autoClear
								;
								if(fil=='') throw('filename can not be blank');
								$fs_writeFile(fil, coutBuffer, 'utf8', OnRdy);
								if(clear) z.Clear();
								return z;
							};
						}
					,	DumpSync: function(ops) {
							if(!cSide) {
								var o=ops||{}
									,	fil=o.file||z.filename
									,	clear=(typeof o.clear!='undefined')? o.clear : z.autoClear
								;
								if(fil=='') throw('filename can not be blank');
								$fs_writeFileSync(fil, coutBuffer, 'utf8');
								if(clear) z.Clear();
								return z;
							};
						}
					,	Start: function() { coutLog=2; }
					,	Stop: function() { coutLog=0; }
   			}
   	;
		
	};

   var z,$cr=O.$cr='\n'
      ,  _t=O._t=true , _f=O._f=false
      ,  Blank=O.Blank=function(){return function(){}}
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
O.Property=function(val){ return Object.CopyTo({}, [val, { $$isProperty: 2 }]); };

if(2) {//-Class system.
	if(2) {//- locals def
		var C, cc, CAddEvent, CAddMembers, CEventArgs, CFireEvent, CGetListeners
			,	CListenersObj, COn, C$On, COnce, C$Once
			, 	COnInfo, COnInfoDouble, CParent
			,	CSetupExtender, CSetupExtenders, CSetOptions
		;
	};

	var Class=O.Class=function(nam, specs, OnRdy) {
		if(typeof nam!='string') { OnRdy=specs; specs=nam; nam=0; };
		if(typeof specs=='function') { OnRdy=specs; specs={}; nam=0; };
	
		var a=arguments, al=a.length, k, z
			,	spc=O.CreateOptions(specs)
			,	nam=spc.NAME=nam||spc.NAME||''
			,	ci=Class.PullInfo(spc)
			,	shrd=ci.SHARED
			,	rv=Class.Obj(function() {
					//if(arguments.length) out('arguments[0]='+JSON.SafeStr(arguments[0]));
					//if(arguments.length>1) out('arguments[1]='+JSON.SafeStr(arguments[1]));
					
					return Class.CreateInstance(ci, arguments);
				}, shrd, 2)
		;
		
		ci.CLASS=rv;
		rv.Extend({
				NAME: ci.NAME
			,	ClassInfo: ci
		});

		if(z=ci.SHARED) {
			CSetupExtenders(rv, z.EXTENDS, z.IMPLEMENTS, rv, 2);
			if(k=z.PUBLIC) CAddMembers(rv, k, rv);
			if(k=k.EVENTS) rv.On(k);
			if(k=z.INIT) k.Apply(rv, []);
			rv.Fire('load', function() { rv.Fire('ready'); });
		};

		rv.INST=rv();
		
		return rv;
	};
	Class.Extend({
			AddMembers: function(v, members, Class) {
				var c=Class, k, kk, m=members||{}, nm, to, ya, z, zz
					,	md=v.$$memberData=v.$$memberData||{}
					,	shrd=(v===Class);
				;
			
				//out('m=='+JSON.SafeStr(m));
				for(nm in m) {
					//out('nm='+nm);
					//if(k=md[nm]) if(k.$$isProperty) delete


					ya=2; z=m[nm]; to=typeof z;
					if(md[nm]) delete v[nm];
					md[nm]=z;
					if(z!=null && to!='undefined' && !z.$$isClass) {
						if(to=='function') {
							z.$$fName=nm;
							z.$$inClass=Class;
							if(shrd) z.$$shared=2;
						}
						else if(z.$$isProperty) {
							k={};
							kk={ $$fName: nm, $$inClass: Class, $$PROPERTY: 2 }
							if(shrd) kk.$$shared=2;
							
							if(zz=z.Get) k.get=zz.Extend(kk);
							if(zz=z.Set) k.set=zz.Extend([kk, { $$SET: 2 }]);
							
							Object.defineProperty(v, nm, k);
							ya=0;
						};
					};
					if(ya) v[nm]=z;
				};

			}
		,	CreateInstance: function(classInfo, args) {
				var ci=classInfo, z
					,	fn=ci.FUNCTION
					,	init=ci.INIT
					,	rv=Class.Obj(
								(fn)?
										function() { return fn.apply(rv, arguments); }
									:	{}
							,	ci
						)
					,	c=ci.CLASS
				;
				//out('ci='+JSON.SafeStr(ci));
				if(!c.INST) c.INST=rv;
				CSetupExtenders(rv, ci.EXTENDS, ci.IMPLEMENTS, c);
				if(z=ci.PUBLIC) CAddMembers(rv, z, c);
				if(z=ci.EVENTS) rv.On(z);
				//out('rv='+JSON.SafeStr(rv));
				if(init) init.Apply(rv, args);
				rv.Fire('load', function() { rv.Fire('ready'); });

				return rv;
			}
		,	Obj: function(v, classInfo, shared) {
				var ci;

				Extend(v, {
						$$isClass: 2
					,	$$memberData: {}
					,	CLASSINFO: classInfo

					,	Fire: function(nam, args, ops, OnRdy) {
							if(typeof args=='function') { OnRdy=args; ; ops={}; args=[]; }
							else if(typeof ops=='function' && !ops.$$eventArgsOps) {
								OnRdy=ops; ops={};
							};
							
							return CFireEvent(v, nam, 0, args, OnRdy);
					}.Prim()
					,	On: COn
					,	$On: C$On
					,	Once: COnce
					,	$Once: C$Once
					,	Parent: CParent
					,	SetOptions: CSetOptions
				});
				if(shared) {
					Extend(v, {
							NEW: function() { return v.apply(v, arguments); }
					});
				}				
				else {
					Extend(v, {
							$$isInst: 2
					});
				};				
				
				return v;
			}
		,	AddEvent: function(v, nam, fn, system, once) {
				var k, kk, n=system? 'SYS' : 'STD', z, zz
					,	ev=v.$$EVENTS=v.$$EVENTS||{}
					,	k=ev[nam]=ev[nam]||{}
					,	z=k[n]=k[n]||[]
				;
				z.Push((once)? { $$once: 2, fn: fn } : fn);
			}
		,	ListenersObj: function(nam, fn) {
				var rv=nam;
				if(fn) { rv={}; rv[nam]=fn; };
				return rv;
			}
		,	On: function(nam, fn, system) {
				var v=this, i, l, nm, z, z2, z4, zz
					,	k=COnInfo(nam, fn, system)
				;
				
				if(z=k.STD)
					for(nm in z) { zz=z[nm]; CAddEvent(v, nm, zz, 0); };
				if(z=k.onceSTD)
					for(nm in z) { zz=z[nm]; CAddEvent(v, nm, zz, 0, 2); };
				if(z=k.SYS)
					for(nm in z) { zz=z[nm]; CAddEvent(v, nm, zz, 2); };
				if(z=k.onceSYS)
					for(nm in z) { zz=z[nm]; CAddEvent(v, nm, zz, 2, 2); };

				return v;
			}.Prim()
		,	$On: function(nam, fn) { return this.On(nam, fn, 2); }.Prim()
		,  Once: function(nam, fn, system) {
				if(!nam) return;
				return this.On({ ONCE: CListenersObj(nam, fn) }, 0, system);		   	
		   }.Prim()
		,	$Once: function(nam, fn) {
				return this.On({ ONCE: CListenersObj(nam, fn) }, 0, 2);
		}.Prim()
		,	OnInfo: function(evt, fn, system) {
				var i, l, k, nm, once, onceStd, onceSys, std, sys, z;
				
				if(fn) evt=COnInfoDouble(evt, fn);

				evt=CO(evt);
				once=evt.ONCE;
				std=CO(evt.STANDARD, evt.STD);
				onceStd=CO(std.ONCE);
				sys=CO(evt.SYSTEM, evt.SYS);
				onceSys=CO(sys.ONCE);

				if(std.ONCE) delete std.ONCE;
				if(sys.ONCE) delete sys.ONCE;
				for(i=0, l=(z=['ONCE', 'STANDARD', 'STD', 'SYSTEM', 'SYS']).length; i<l; i++) {
					k=z[i];
					if(typeof evt[k]!='undefined') delete evt[k];
				};
				
				if(once) {
					k=(system)? onceSys : onceStd;
					for(nm in once) {
						if(z=k[nm]) {
							if(!(z instanceof Array)) z=k[nm]=[z];
							z.Push(once[nm]);
						}
						else k[nm]=once[nm];
					};
				};
				
				z=system? sys : std;
				for(nm in evt) z[nm]=evt[nm];

				return { STD: std, SYS: sys, onceSTD: onceStd, onceSYS: onceSys };
			}
		,	OnInfoDouble: function(evt, fn) {
				var ee=evt, ev, i, l, k, nm, std, sys, z, z2, z4, zz
						rv={}
					,	to=typeof evt
				;
				if(evt instanceof Array)
					for(i=0, l=evt.length; i<l; i++)
						Object.CopyTo(rv, COnInfoDouble(evt[i], fn));
				else if(to=='string' || to=='number') rv[z]=fn;
				else throw('arg1 in 2 argument call to <lass-inst>.on must be: str, num, or arr (full of str, num or arr (etc.))');

				return rv;
			}
		,	Parent: function() {
				var a=arguments, c, cls, cmd, i, k, l, md, nam, prop, shrd, z, zz
					,	cl=a.callee.caller
				;

				if(!cl) throw('Function does not have a parent function.');
				else {
					nam=cl.$$fName; cls=cl.$$inClass;
					c=(shrd)? cls : cls.INST;
					md=c.$$memberData[nam];
					prop=cl.$$PROPERTY; shrd=cl.$$shared;

					z=c.EXTENDS;
					for(i=0, l=z.length; i<l; i++) {
						k=(shrd)? z[i] : z[i].INST;
						cmd=k.$$memberData[nam];
						if(prop||cmd.$$isProperty) {}
						else {
							zz=k[nam];
							if(typeof zz=='function') return zz.Apply(this, a);
							else {
								throw('parent object is not a function');
								return;
							};
						};
					}
				};

				throw('parent function or property "'+nam+'" does not exist');
				return;
			}.Prim()
		,	PullInfo: function(specs) {
				var evts, fun, init, nam, nm, ops=0, prv, rv, spc=specs, z 
					,	ext, imp, pimp
					,	pub=CO(spc.PUBLIC||{})
				;


				for(nm in spc) if(nm!='SHARED' && nm!='PUBLIC') pub[nm]=spc[nm];

				evts=pub.EVENTS||0;
				ext=(z=pub.EXTENDS)? Array.From(z) : 0;
				fun=pub.FUNCTION||0;
				imp=(z=pub.IMPLEMENTS)? Array.From(z) : 0;
				init=pub.INIT||0;
				nam=pub.NAME||0;
				
				if(z=pub.OPTIONS) ops=CO(z);
				Object.Remove(pub, ['EVENTS', 'EXTENDS', 'IMPLEMENTS', 'NAME', 'OPTIONS']);

				return {
						EVENTS: evts
					,	EXTENDS: ext
					,	FUNCTION: fun
					,	IMPLEMENTS: imp
					,	INIT: init
					,	NAME: nam
					,	OPTIONS: CO(ops||{})
					,	PRIVATE: prv
					,	PUBLIC: pub
					,	SHARED: (z=specs.SHARED)? Class.PullInfo(CO(z)) : 0

				};
			}
		,	EventArgs: function(ops, v) {
				var z
					,	o=(ops)? (z=ops.$$eventArgsOps)? z : ops : {}

					,	op=Object.CopyTo({}, [
								{
										async: 0
									,	name: ''
									,	obj: v
								}
							,	o
						])
					,	rv={
								$$eventArgsOps: op
							,	async: op.async
							,	ASync: op.ASync || function() { rv.async=2; }
							,	cancel: 0
							,	Cancel: function() { rv.cancel=2; }
							,	Done: op.Done || function() {}
						}
				;
				return rv;
			}
		,	GetListeners: function(v, name) {
				var i, k, l, nm, rv={}, z, zz
					,	evt=v.$$EVENTS=v.$$EVENTS||{}
					,	ev=evt[name]=evt[name]||{}
				;
				
				for(nm in {STD:2,SYS:2}) {
					z=ev[nm]||[];
					k=ev[nm]=[];
					for(i=0, l=z.length; i<l; i++) {
						zz=z[i];
						if(!zz.$$once) k.Push(zz); 
					};
					rv[nm]=z;
				};
				
				return rv;
			}
		,	FireEvent: function(v, nam, eArgOps, args, OnRdy) {
				var op, z
					,	lstnrs=CGetListeners(v, nam)
					,	arr=lstnrs.STD||[]
					,	idx=0
					,	len=arr.length
					,	sys=0
					,	NextListener=function() {
							var e, fn, i, l, s='', z;

							if(idx<len) {
								fn=arr[((sys)? (len-1)-idx : idx)];
								if(fn.$$once) fn=fn.fn;
								idx++;
								e=CEventArgs(op);
								if(args)
									for(i=0, l=args.length; i<l; i++)
										s+=','+'args['+i+']';
									//out('fn='+fn.Str());
									//out('fn(e'+s+');');
									eval('fn(e'+s+');');
									if(e.cancel) { if(OnRdy) OnRdy(); return; };
									if(!e.async) NextListener();
							}
							else if(!sys) {
								arr=lstnrs.SYS||[];
								idx=0;
								len=arr.length;
								sys=2;
								NextListener();
							}
							else if(OnRdy) OnRdy();
						
						}
					,	dOp={
								arguments: args
							,	Done: NextListener
							,	name: nam
							,	obj: v
						}
				;
				op=Object.CopyTo(dOp, eArgOps||{});			
				NextListener();

				return v;
			}.Prim()
		,	SetOptions: function() {
				var a=arguments, al=a.length, ev, t=this, z, zz;
					if(al&&(z=a[0])&&z.$$isClass) {
						t=z;
						a=(al>1)? a.slice(1) : [];
					};
					z=t.OP=t.OPTIONS=CO([
							t.NEWOPS||{}
						,	(zz=t.CLASSINFO)? zz.OPTIONS||{} : {}
						,	a
					]);
					ev=z.ON||z.EVENTS;
				;
				if(ev) t.On(ev);
				return t;
			}.Prim()
		,	SetupExtenders: function(v, Extends, Implements, Class, shared) {
				var i, k, l, nm, z
					,	val={}
					,	ex=v.EXTENDS=Extends
					,	im=v.IMPLEMENTS=Implements
				;

				if(ex) for(i=ex.length-1; i>=0; i--)
					val=Object.CopyTo(val, CSetupExtender(v, ex[i], Class, 0, shared));
				if(im) for(i=0, l=im.length; i<l; i++)
					val=Object.CopyTo({}, [CSetupExtender(v, im[i], Class, 2, shared), val]);
				v.NEWOPS=val;

				return v;
		}.Extend({
			SetupExtender: function(v, ex, Class, isImp, shared) {
				//out('SetupExtender=-=-=-=-');
				if(ex) {
					var c=Class, nm, z
						,	k=shared? ex : ex.INST
						,	ei=(isImp)?
									v.IMPLEMENTERS=v.IMPLEMENTERS||[]
								:	v.EXTENDERS=v.EXTENDERS||[]
						,	ci=v.CLASSINFO
						,	op=ci.OPTIONS||{}
					;

					ei.Push(ex);

					for(nm in k) {
						z=k[nm];
						if(
								nm!='$$memberData'
							&&	nm!='EXTENDS'
							&&	nm!='IMPLEMENTS'
							&&	nm!='INST'
							&&	nm!='NAME'
							&&	nm!='OP'
							&&	nm!='OPTIONS'
						) if(!z || (!z.$$prim)) v[nm]=z;
					};

					return op;
				};
				return {};
			}
		})
	});

	if(2) { //- set locals
		C=Class; CAddEvent=C.AddEvent; CListenersObj=C.ListenersObj;
		COn=C.On; C$On=C.$On; COnce=C.Once; C$Once=C.$Once; 
		COnInfo=C.OnInfo, COnInfoDouble=C.OnInfoDouble;
		CParent=C.Parent; CGetListeners=C.GetListeners; CEventArgs=C.EventArgs;
		CFireEvent=C.FireEvent; CAddMembers=C.AddMembers;
		cc=CSetupExtenders=C.SetupExtenders; CSetupExtender=cc.SetupExtender;
		CSetOptions=C.SetOptions
	};
};

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
                     : (k=='class')? O.CLASS
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

O.Val=function(val, ops){
   var rv={
         $$isVal: 2
      ,  value: val
      ,  options: Object.LCase(ops)
   }
}
CO=$CreateOptions=O.CreateOptions=function(){
	var i, k, l, lst=Array.Clone(arguments).Condense(), nm, rv={}, z, zz; 

	for(i=0, l=lst.length; i<l; i++) {
		z=lst[i];
		if(z&&(z instanceof Array || z['0'])) z=CO.apply(CO, z);
		for(nm in z) {
			k=z[nm];
			//out('typeof k='+typeof k+'  -  nm='+nm);
			zz=rv[nm];
			if(!(typeof k=='object' && typeof zz=='object')) 
				rv[nm]=k;
			else rv[nm]=CO(zz, k);
		};
	};

	return rv;
};

if(2) {//-Set locals
   ArgStr=O.ArgStr;
};
