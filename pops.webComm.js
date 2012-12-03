if(2) {//-vars
	var X=exports, G=global
	,	pc=require('./pops.core')
	,	Class=pc.Class
	,	ObjCopyTo=Object.CopyTo
	,	pwcb=require('./webComm/pops.webComm.base')
	,	pwca=require('./webComm/pops.webComm.ajax')
	,	pwcs=require('./webComm/pops.webComm.socket')
	,	pwcsio=require('./webComm/pops.webComm.socketIo')
	,	sio=require('./node_modules/socket.io/lib/socket.io')

	,	commChannel
	;
};

Object.CopyTo(X, pwca);
Object.CopyTo(X, pwca);

commChannel=X.commChannel=function(ops, cb) {
	//return new ((ops && ops.type=='ajax')? pwca : pwcs).commChannel(ops, cb);
	return new pwcsio.commChannel(ops, cb);
};

if(2) {//-commChannelManager - socket
	if(0) {//- private
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
	X.commChannelManager=pc.Class('pops.webComm.commChannelManager', {
		OPTIONS: {
			auto: 2
		,	components: 0
		,	httpServer: 0
		,	webServer: 0
		}
	,	SHARED: {}
	,	INIT: function(ops, cb) { this.Reset(ops, cb); }
	,	PUBLIC: {
			$$isPopsCommChannelManager: 2
		,	$httpServer: 0
		,	$io: 0
		,	$webServer: 0
		,	components: 0

		,	Broadcast: function(msg) { this.$io.broadcast(msg); }
		,	Listen: function(srvr, cb) {
				var io, z
				,	t=this
				,	srv=srvr//||this.$httpServer
				;
				
				if(srv && srv.$$isPopsHttpServer) {
					this.$webServer=srv;
					srv=srv.$srv;
				};
				
				if(srv) {
					this.$httpServer=srv;
					io=this.$io=sio.listen(srv);
					io.on('connection', function(client) {
						
						z=new commChannel(
							{
								client: client
							,	manager: t
							}
						,	function(err, obj) {
								t.Fire('connection', [z], 0, function() {
									if(cb) cb(0, t);
								});
							}
						);
				
					});
				}
				else {
					this.$io=this.$httpServer=this.$webServer=0;
					if(cb) cb(0, this);
				}
			}
		,	Reset: function(ops, cb) {
				if(typeof ops=='function' && !ops.isPopsCommChannel) { cb=ops; ops=0; };
				var i, l, nm, z
				,	o=this.SetOptions(ops).OP
				,	oCmpnts=o.components||{}
				,	cmpnts=this.components={}
				,	srvr=o.webServer||o.httpServer
				;
				
				if(o.auto && srvr) this.Listen(srvr, cb)
				else if(cb) cb(0, this);
			
			}
		,	ProcessIncoming: function(dat, ops, bc) {
				if(typeof dat=='function') { cb=dat; dat=ops=0; };
				if(typeof ops=='function' && !ops.$$isPopsCommChannel) { cb=ops; ops=0; };
				
			}
		,	ProcessOutgoing: function(dat, ops, bc) {
			
			}
		
		
		}
	});
};












