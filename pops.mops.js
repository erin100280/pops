if(2) {//-vars
	var X=exports, G=global
	,	pc=require('./pops.core')
	,	pwc=require('./pops.webComm')

	,	Reset, Setup
	
	;
};

if(0) {//- private
	var
		p_components
	,	p_AddComponents=function(me, cmpnts, op, cb) {
			var i=0, nm, z
			,	cmpnts=p_components={}
			,	oCmpnts=op.components||{}
			,	nams=Object.Names(oCmpnts)
			,	l=nams.length
			,	AddNext=function() {
					if(i<i) {
						var nm=nams[i], z;
						i++;
						if(z=oCmpnts[nm]) {
							
						};
					}
					else cb(0, me);
				}
			;
			
			AddNext();
			
		}
	;
};

Reset=X.Reset=function(ops, cb) {
	if(typeof ops=='function' && !ops.isPopsCommChannel) { cb=ops; ops=0; };
	var i, l, nm, z
	,	o=this.SetOptions(ops).OP
	,	oCmpnts=o.components||{}
	,	cmpnts=this.components={}
	;
	
	if(cb) cb(0, this);

};

Setup=X.Setup=function(ops, cb){ Reset(ops, cb); };



X.commChannel=X.socketCommChannel=pc.Class('pops.webComm.socketCommChannel', {
	OPTIONS: {
		auto: 2
	,	components: 0
	}
,	SHARED: {}
,	INIT: function(ops, cb) { this.Reset(ops, cb); }
,	PUBLIC: {
		$$isPopsCommChannel: 2
	,	$$isPopsSocketCommChannel: 2
	,	components: 0

	,	Reset: function(ops, cb) {
			if(typeof ops=='function' && !ops.isPopsCommChannel) { cb=ops; ops=0; };
			var i, l, nm, z
			,	o=this.SetOptions(ops).OP
			,	oCmpnts=o.components||{}
			,	cmpnts=this.components={}
			;
			
			if(cb) cb(0, this);
		
		}
	,	ProcessIncoming: function(dat, ops, bc) {
			if(typeof dat=='function') { cb=dat; dat=ops=0; };
			if(typeof ops=='function' && !ops.$$isPopsCommChannel) { cb=ops; ops=0; };
			
		}
	,	ProcessOutgoing: function(dat, ops, bc) {
		
		}
	
	
	}
});







