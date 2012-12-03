if(2) {//-vars
	var X=exports, G=global
	,	pc=require('../pops.core')
	;
};

if(2) {//-commChannel - socket
	if(2) {//- private
		var
			p_AddComponents=function(me, cmpnts, op, cb) {
				var i=0, nm, z
				,	oCmpnts=op.components||{}
				,	cmpnts=me.components={}
				,	nams=Object.Names(cmpnts)
				,	l=nams.length
				,	AddNext=function() {
						if(i<i) {
							var nm=nams[i], z;
							i++;
							if(z=cmpnts[nm]) {
								
							};
						}
						else cb(0, me);
					}
				;
				
				AddNext();
				
			}
		;
	};
	X.commChannel=X.socketCommChannel=pc.Class('pops.webComm.socketCommChannel', {
		OPTIONS: {
			auto: 2
		,	components: 0
		,	manager: 0
		,	client: 0
		}
	,	SHARED: {}
	,	INIT: function(ops, cb) { this.Reset(ops, cb); }
	,	PUBLIC: {
			$$isPopsCommChannel: 2
		,	$$isPopsSocketCommChannel: 2
		,	$client: 0
		,	$manager: 0
		,	components: 0

		,	Reset: function(ops, cb) {
				if(typeof ops=='function' && !ops.$$isPopsCommChannel) { cb=ops; ops=null; };
				var i, l, nm, z
				,	t=this
				,	o=this.SetOptions(ops).OP
				,	oCmpnts=o.components||{}
				,	cmpnts=this.components={}
				,	client=this.$client=o.client
				;
				
				if(client) {
					client.on('message', function(msg) {
						t.Fire('message', [msg]);
					});
				}
				
				if(cb) cb(0, this);
			}
		,	Send: function(msg) { this.$client.send(msg); }
		,	ProcessIncoming: function(dat, ops, bc) {
				if(typeof dat=='function') { cb=dat; dat=ops=0; };
				if(typeof ops=='function' && !ops.$$isPopsCommChannel) { cb=ops; ops=0; };
				
			}
		,	ProcessOutgoing: function(dat, ops, bc) {
			
			}
		
		
		}
	});
};







