var X=exports
,  $fs=require('./node/fs')
	,	$fs_stat=$fs.stat
	,	$fs_readFile=$fs.readFile
	,	$fs_readDir=$fs.readdir
	,	$fs_createReadStream=$fs.createReadStream
,	$path=require('path')
	,	$path_join=$path.join
	,	$path_extname=$path.extname
,  nm='pops.http.server'
,  http=require('http')
,  pr=require('pops/pops.router')
,  pc=require('pops/pops.core')
	,	cout=pc.cout

,	contentTypes = {
		'.css': 'text/css'
	,	'.htm': 'text/html'
	,	'.html': 'text/html'
	,	'.jpeg': 'image/jpeg'
	,	'.jpg': 'image/jpeg'
	,	'.js': 'text/javascript'
	}
;

var $Req=X.Req=X.Request=function(req) { return req; };
var $Res=X.Res=X.Response=function(res) { return res; };

var hs=X.server=Class('popsHttpServer', {
		OPTIONS:{
				auto: 0
			,	name: 'popsHttpServer.'+IID()
			,	port: 80
			,	router: 0
      }
   ,  INIT:function(op, cb){
			var t=this.SetOptions(op), o=this.OP, l, cnt;
			//out('server.INIT  -  o: \n'+JSON.stringify(o)+'\n');
			this.$nm=o.name;
			this.Refresh();
			if(o.auto) this.Start(cb);
      	else if(cb) cb(0, this);
      }
	,	PUBLIC: {
			$$isPopsHttpServer: 2
		,	$nm: ''
		,	$OnRequest: null
		,	$router: null
		,	$srv: null

	   ,  Start: function(cb){
				var t=this, i, k, l, z, z2
				,	itms=this.$router.$items
				,	x
				;

				for(i=0, l=itms.length; i<l; i++) {
					z=itms[i];
					if(z.type=='staticServer') {
						z.mode='get';
						z.handler=new ss(z.options);
					};
				};

				this.$srv=http.createServer(function(req, res) {
	            //out('req.url='+req.url);
	            var z
	               ,  rq=$Req(req)
	               ,  rs=$Res(res)
	            ;
	            if(z=t.$router) z.Process(rq, rs);
	            else if(z=o.OnRequest) z(req, res);
	            else {
	               rs.writeHead(200, {"Content-Type": "text/plain"});
	               rs.end("-= NOT--HANDLED =-\n");
	            };
	         }).listen(this.OP.port||80);
				if(cb) cb(0, this);
   		}
	   ,  Refresh:function(){
				var o=this.OP, r=o.router;
				if(r && !r.$isRouter) r=new pr.router(r);
				this.$OnRequest=o.OnRequest;
				this.$router=r;
	      }
		}
});

var ss=X.staticServer=Class('pops.http:staticServer', {
		OPTIONS:{
				auto: false
			,	baseDir: false
			,	name: 'pops.http:staticServer#'+IID()
			,	port: 80
			,	rootAccess: true
			,	router: false
			,	useIndexFiles: true
      }
	,	INIT:function(op, onRdy){
			var op=op||{}, t=this.SetOptions(op), o=this.OP, cnt;
			this.$nm=o.name;
         
         this.$baseDir=o.baseDir;
         
			this.Refresh();
			if(o.auto) this.Start();
      }
	,	PUBLIC: {
				$isStaticServer: 2
			,	$nm: ''
			,	$OnRequest: null
			,	$router: null
			,	$srv: null
			,	$baseDir: 0
			,	$ServeFile: function(path, res, OnRdy) {
         		var rs
         		,	ct=contentTypes[$path_extname(path).LCase()];

         		if(ct) res.writeHead(200, { 'Content-Type': ct });
         		rs=$fs_createReadStream(path).pipe(res);
         		//rs.on('data', function(data) { res.write(data); });
         		//rs.on('end', function(data) { res.end(); if(OnRdy) OnRdy(data); }); 

				}
			,	$SendIndex: function(path, res, mode) {
					if(this.OP.useIndexFiles)
						this.$SendIndex_File(path, res, mode);
					else
						this.$SendIndex_List(path, res, mode);
				}
			,	$SendIndex_File: function(path, res, mode) {
					var t=this, z;
					if(this.OP.useIndexFiles) {
						$fs_stat(z=$path_join(path, '/index.html'), function(err, v) {
							if(!err && v.isFile()) t.$ServeFile(z, res);
							else
								$fs_stat(z=$path_join(path, '/index.htm'), function(err, v) {
									if(!err && v.isFile()) t.$ServeFile(z, res);
									else t.$SendIndex_List(path, res, mode);
								});
						});
					}
					else t.$SendIndex_List(path, res, mode);
				}
			,	$SendIndex_List: function(path, res, mode) {
					var t=this, i, l, z;
					if(this.OP.rootAccess) {
						$fs_readDir(path, function(err, data) {
							if(err) res.end('ERROR: '+err);
							else
								res.writeHead(200, { 'Content-Type': 'text/html' });
								res.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
								for(i=0, l=data.length; i<l; i++) {
									res.write('<a href="'+(z=data[i])+'">'+z+'</a><br />');
								};
								res.end('<br /><br />======== End Of List. ========');
						});
					}
					else {
						res.writeHead(200, { 'Content-Type': 'text/html' });
						res.end('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
						+	'<html>'
						+		'<body style="height: 100%;">'
						+			'<div style="'
						+						'display: block;'
						+						'position: absolute;'
						+						'font-size: 48px;'
						+						'text-align: center;'
						+						'height: auto;'
						+						'top: 80px;'
						+						'left: 0;'
						+						'right: 0;'
						+						'">'	
						+				'NO ROOT ACCESS'
						+			'</div>'
						+		'</body>'
						+	'</html>'
						);
					};
				}

			,	ProcessReq: function(req, res, Next) {
					var t=this, op=this.OP, rs
						//,	path=$path_join(op.baseDir, req.$path).Replace('%20', ' ')
						,	path=unescape($path_join(op.baseDir, req.$path))
					;
					
					//out('staticServer:ProcessReq  -  req.$path='+req.$path+'  -  path='+path);
					
					//out('req='+JSON.SafeStr(req, 2)+'\n');
	            $fs_stat(path, function(err, v) {
	            	if(err) {
							res.writeHead(200, {"Content-Type": "text/plain"});
							res.write('<staticServer.ProcessReq> - err='+err+'\n');
							res.write('<staticServer.ProcessReq> - path='+path+'\n');
							res.end();
	            	}
	            	else {
		            	if(v.isFile()) t.$ServeFile(path, res);
		            	else if(v.isDirectory()) t.$SendIndex(path, res);
							else {
								res.writeHead(200, {"Content-Type": "text/plain"});
								res.write('<path: "'+path+'" does not exist.\n');
								res.end();
							};
						};		            
	            });
				}
		   ,  Start: function(){
					var t=this, doneTemp=function() {}

					this.$srv=http.createServer(function(req, res) {
		            //out('req.url='+req.url);
						this.ProcessReq(req, res, doneTemp);
		         }).listen(this.OP.port||80);

	   		}
		   ,  Refresh:function(){
					var o=this.OP, r=o.router;
					if(r && !r.$isRouter) r=pr.router.NEW(r);
					this.$OnRequest=o.OnRequest;
					this.$router=r;
		      }
		}
});
