(function(e){var j=e.Vector3DUtil;var a=e.JNumber3D;var k=e.JSegment;var b=e.JChassis;var d=e.JWheel;var f=e.PhysicsSystem;var c=Math,i=c.abs,h=c.sqrt;var g=function(l){this._chassis=new b(this,l);this._wheels=[];this._steerWheels=[];this._destSteering=this._destAccelerate=this._steering=this._accelerate=this._HBrake=0;this.setCar();};g.prototype._maxSteerAngle=null;g.prototype._steerRate=null;g.prototype._driveTorque=null;g.prototype._destSteering=null;g.prototype._destAccelerate=null;g.prototype._steering=null;g.prototype._accelerate=null;g.prototype._HBrake=null;g.prototype._chassis=null;g.prototype._wheels=null;g.prototype._steerWheels=null;g.prototype.setCar=function(n,m,l){if(n==null){n=45;}if(m==null){m=4;}if(l==null){l=500;}this._maxSteerAngle=n;this._steerRate=m;this._driveTorque=l;};g.prototype.setupWheel=function(z,p,u,x,n,E,D,q,t,A){if(u==null){u=2;}if(x==null){x=2;}if(n==null){n=3;}if(E==null){E=10;}if(D==null){D=0.5;}if(q==null){q=0.5;}if(t==null){t=1;}if(A==null){A=1;}var o=f.getInstance().get_gravity().slice(0);var w=this._chassis.get_mass();var r=0.25*w;var B=j.get_length(o);j.normalize(o);var l=a.getScaleVector(o,-1);var v=r*B/(D*n);var s=0.015*E*E*w;var m=q/2;var y=B*r;var C=new d(this);C.name=z;C.setup(p,l,v,n,s,E,u,x,m,t,A,y);this._wheels.push(C);};g.prototype.setAccelerate=function(l){this._destAccelerate=l;};g.prototype.setSteer=function(q,p){this._destSteering=p;this._steerWheels=[];var n=null;for(var o=0,m=q.length;o<m;o++){n=this.getWheel(q[o]);if(n){this._steerWheels.push(n);}}};g.prototype.findWheel=function(n){for(var o=0,m=this._wheels.length;o<m;o++){if(this._wheels[o].name==n){return true;}}return false;};g.prototype.getWheel=function(l){for(var m=0;m<this._wheels.length;m++){if(this._wheels[m].name==l){return this._wheels[m];}}return null;};g.prototype.setHBrake=function(l){this._HBrake=l;};g.prototype.addExternalForces=function(m){for(var l=0,n=this._wheels.length;l<n;l++){this._wheels[l].addForcesToCar(m);}};g.prototype.postPhysics=function(m){for(var p=0,u=this._wheels.length;p<u;p++){this._wheels[p].update(m);}var l=m;var r=m*this._steerRate;var n=this._destAccelerate-this._accelerate;if(n<-l){n=-l;}else{if(n>l){n=l;}}this._accelerate+=n;var s=this._destSteering-this._steering;if(s<-r){s=-r;}else{if(s>r){s=r;}}this._steering+=s;for(var p=0;p<this._wheels.length;p++){this._wheels[p].addTorque(this._driveTorque*this._accelerate);this._wheels[p].setLock(this._HBrake>0.5);}var o=i(this._maxSteerAngle*this._steering);var q=(this._steering>0)?1:-1;for(var p=0,t=this._steerWheels.length;p<t;p++){this._steerWheels[p].setSteerAngle(q*o);}};g.prototype.getNumWheelsOnFloor=function(n){var m=0;for(var l=0,o=this._wheels.length;l<o;l++){if(this._wheels[l].getOnFloor()){m++;}}return m;};e.JCar=g;})(jigLib);