/* Enemy bodies respect their own floor, solid walls and doors throughout their movement. */
const __v107Collision={areas:new Map(),epoch:-1,size:-1,repaired:0,rejected:0,restored:0,checked:0};
function __v107Area(c){
 const s=__v107Collision;if(s.epoch!==__v83.epoch||s.size!==__v83.areas.length){s.areas=new Map(__v83.areas.map(a=>[a.key,a]));s.epoch=__v83.epoch;s.size=__v83.areas.length;}
 return c?.__v83Area?s.areas.get(c.__v83Area):null;
}
const __v107OldBlocked=__v91Blocked;
__v91Blocked=function(c,x,z,foot){
 if(!Number.isFinite(x)||!Number.isFinite(z)||!Number.isFinite(foot))return true;
 const a=__v107Area(c),r=__v91Radius(c),head=foot+1.85;
 if(a&&(foot<a.y-.75||foot>a.y+6||!__v83Walkable(a,x,z,r)))return true;
 if(__v107OldBlocked(c,x,z,foot))return true;
 // Gate and hinged-door clearance uses this enemy's radius, including at spatial-cell edges.
 for(let ix=Math.floor((x-r)/32);ix<=Math.floor((x+r)/32);ix++)for(let iz=Math.floor((z-r)/32);iz<=Math.floor((z+r)/32);iz++){
  const key=ix+','+iz;
  for(const d of __v73DoorGrid.get(key)||[])if(__v73Hit(d.shape,x,z,head,r,1.75))return true;
  for(const d of _i4.get(key)||[]){
   const bottom=d.y+d.lift*9;if(head<=bottom-.05||head-1.75>=bottom+8)continue;
   const dx=Math.max(0,Math.abs(x-d.x)-d.w),dz=Math.max(0,Math.abs(z-d.z)-d.d);if(dx*dx+dz*dz<r*r)return true;
  }
 }
 return false;
};
const __v107OutdoorSpawn=__v91SpawnFree;
__v91SpawnFree=function(c,x,z){
 const a=__v107Area(c);if(!a)return __v107OutdoorSpawn(c,x,z);
 // Instanced pyramid/cavern floors legitimately lie beyond the exterior world bounds.
 if(!__v83Walkable(a,x,z,__v91Radius(c))||__v91Blocked(c,x,z,a.y))return null;
 return{x,y:a.y,z};
};
// Interior movement resolves against its own floor, including instances outside the exterior map.
const __v107OutdoorStep=_9b;_9b=function(c,x,z){
 const a=__v107Area(c);if(!a)return __v107OutdoorStep(c,x,z);
 if(c.dead||!__v91SegmentClear(c,c.g.position,{x,y:a.y,z})){c.__v91Permit=null;return false;}
 c.__v91Permit={x,y:a.y,z};return a.y;
};
// Every actor, including scripted bosses, is checked again after the final movement controller.
const __v107OldGuard=__v91Guard;
__v91Guard=function(c){
 if(!c?.hostile||c.dead||!c.g)return __v107OldGuard(c);
 const p=c.g.position,last=c.__v91Last,changed=!last||p.x!==last.x||p.y!==last.y||p.z!==last.z;
 if(!changed&&_10<(c.__v107CheckAt||0))return;c.__v107CheckAt=_10+.25;__v107Collision.checked++;
 const permit=c.__v91Permit,validated=permit&&p.x===permit.x&&p.z===permit.z&&Math.abs(p.y-permit.y)<.01;
 if(last&&changed&&!validated&&!__v91SegmentClear(c,last,p)&&!__v91Blocked(c,last.x,last.z,last.y)){
  p.set(last.x,last.y,last.z);__v107Collision.restored++;__v91Remember(c);return;
 }
 if(__v91Blocked(c,p.x,p.z,p.y)){const before=p.clone();__v91Repair(c,true);if(!p.equals(before))__v107Collision.repaired++;}
 __v91Remember(c);
};
function __v107RepairAll(){
 __v107Collision.epoch=-1;_22();const before=__v91.repaired;__v91RepairAll();__v107Collision.repaired+=__v91.repaired-before;
}
const __v107World=_bj;_bj=function(...args){const result=__v107World(...args);__v107RepairAll();return result;};
const __v107Load=_dn;_dn=function(...args){const result=__v107Load(...args);__v107RepairAll();return result;};
const __v107Tick=__v75Tick;__v75Tick=function(dt){const result=__v107Tick(dt);if(_u&&!_74())for(const c of __v68Pool())if(c.hostile&&!c.dead)__v91Guard(c);return result;};
window.__AURELIA_ENEMY_COLLISION107__={audit:()=>({repaired:__v107Collision.repaired,rejected:__v91.rejected,restored:__v107Collision.restored,checked:__v107Collision.checked,unresolved:[...__v91.unresolved],floorCount:__v83.areas.length})};
