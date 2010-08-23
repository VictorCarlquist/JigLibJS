/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

/**
 * @author Muzer(muzerly@gmail.com)
 * @link http://code.google.com/p/jiglibflash
 */
 
(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var Matrix3D=jigLib.Matrix3D;
	var JMatrix3D=jigLib.JMatrix3D;
	var JNumber3D=jigLib.JNumber3D;
	var ISkin3D=jigLib.ISkin3D;
	var PhysicsState=jigLib.PhysicsState;
	var RigidBody=jigLib.RigidBody;

	var JSphere=function(skin, r){
		this.super(skin);
		this._type = "SPHERE";
		this._radius = r;
		this._boundingSphere = this._radius;
		this.set_mass(1);
		this.updateBoundingBox();
	};
	jigLib.extends(JSphere,jigLib.RigidBody);
	JSphere.prototype.name=null;
	JSphere.prototype._radius=null;

	JSphere.prototype.set_radius=function(r){
		this._radius = r;
		this._boundingSphere = this._radius;
		this.setInertia(this.getInertiaProperties(this.get_mass()));
		this.setActive();
		this.updateBoundingBox();
	};

	JSphere.prototype.get_radius=function(){
		return this._radius;
	};

	JSphere.prototype.segmentIntersect=function(out, seg, state){
		out.fracOut = 0;
		out.posOut = [0,0,0,0];
		out.normalOut = [0,0,0,0];

		var frac = 0;
		var r = seg.delta;
		var s = Vector3DUtil.subtract(seg.origin, state.position);

		var radiusSq = this._radius * this._radius;
		var rSq = Vector3DUtil.get_lengthSquared(r);
		if (rSq < radiusSq){
			out.fracOut = 0;
			out.posOut = seg.origin.slice(0);
			out.normalOut = Vector3DUtil.subtract(out.posOut, state.position);
			Vector3DUtil.normalize(out.normalOut);
			return true;
		}

		var sDotr = Vector3DUtil.dotProduct(s, r);
		var sSq = Vector3DUtil.get_lengthSquared(s);
		var sigma = sDotr * sDotr - rSq * (sSq - radiusSq);
		if (sigma < 0){
			return false;
		}
		var sigmaSqrt = Math.sqrt(sigma);
		var lambda1 = (-sDotr - sigmaSqrt) / rSq;
		var lambda2 = (-sDotr + sigmaSqrt) / rSq;
		if (lambda1 > 1 || lambda2 < 0){
			return false;
		}
		frac = Math.max(lambda1, 0);
		out.fracOut = frac;
		out.posOut = seg.getPoint(frac);
		out.normalOut = Vector3DUtil.subtract(out.posOut, state.position);
		Vector3DUtil.normalize(out.normalOut);
		return true;
	};

	JSphere.prototype.getInertiaProperties=function(m){
		var Ixx = 0.4 * m * this._radius * this._radius;
		return JMatrix3D.getScaleMatrix(Ixx, Ixx, Ixx);
	};
				
	JSphere.prototype.updateBoundingBox=function(){
		this._boundingBox.clear();
		this._boundingBox.addSphere(this);
	};
	
	jigLib.JSphere=JSphere;
	
})(jigLib);