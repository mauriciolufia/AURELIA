/* Contact validates real reach; only a physically connected attack can reach the HP pipeline. */
const __v117Incoming={context:null,evades:0,contacts:0,rejected:0,predictions:0};
function __v117MeleeReach(c){return Math.max(2.3,Math.min(4.5,__v91Radius(c)+1.65+(__v109Context(c).boss?.6:0)));}
function __v117Contact(c){return Math.min(__v117MeleeReach(c),Math.max(2,Math.min(3,__v91Radius(c)+1.2)));}
function __v117HeroEvades(c){
 const distance=Math.hypot(_14.x-c.g.position.x,_14.z-c.g.position.z);
 if(distance<=__v117Contact(c)){__v117Incoming.contacts++;return false;}
 const evade=Math.random()<.3;if(evade)__v117Incoming.evades++;return evade;
}
__v98Reach=__v117MeleeReach;
_d1=function(c){
 const p=c.g.position;if(Math.hypot(_14.x-p.x,_14.z-p.z)>__v117MeleeReach(c)||Math.abs(_14.y-p.y-1.85)>2.5||!__v92LOS(c,true))return;
 return _d0(c);
};
function __v117WithIncoming(context,fn){const old=__v117Incoming.context;__v117Incoming.context=context;try{return fn();}finally{__v117Incoming.context=old;}}
function __v117RangedHit(c,power=1,status=null,art=null){return __v117WithIncoming({c,ranged:true,art},()=>_d0(c,power,status));}
const __v117IncomingHit=_d0;_d0=function(c,...args){
 if(c?.hostile){
  const context=__v117Incoming.context,a=c.specialAction,p=c.g.position,range=a?.phase==='charge'?a.art.radius:__v117MeleeReach(c);
  if(!(context?.ranged&&(!context.c||context.c===c))&&(Math.hypot(_14.x-p.x,_14.z-p.z)>range||Math.abs(_14.y-p.y-1.85)>2.5)){
   __v117Incoming.rejected++;return false;
  }
 }
 return __v117IncomingHit(c,...args);
};
// Instant areas/beams validate their own markers and rays; a projectile validates its swept path.
const __v117EnemyRelease=_d5;_d5=function(c){const art=c.specialAction?.art;return __v117WithIncoming({c,ranged:!!art&&art.type!=='charge',art},()=>__v117EnemyRelease(c));};
const __v117EmperorRelease=__v94EmperorRelease;__v94EmperorRelease=function(kind){return __v117WithIncoming({c:__v94Emperor.boss,ranged:kind!=='physical'},()=>__v117EmperorRelease(kind));};
const __v117EmperorFX=__v94EmperorFX;__v94EmperorFX=function(dt){return __v117WithIncoming({c:__v94Emperor.boss,ranged:true},()=>__v117EmperorFX(dt));};
const __v117RaidPulse=__v107RaidPulse;__v107RaidPulse=function(r){return __v117WithIncoming({c:r.c,ranged:true},()=>__v117RaidPulse(r));};
const __v117RaidProjectiles=__v88ProjectileTick;__v88ProjectileTick=function(dt){return __v117WithIncoming({ranged:true},()=>__v117RaidProjectiles(dt));};
function __v117EnemyAim(c,origin,speed,range){
 const distance=Math.hypot(_14.x-origin.x,_14.z-origin.z),time=Math.min(.45,distance/Math.max(1,speed)),v=__v98AI.velocity,length=Math.hypot(v.x,v.z),scale=length>24?24/length:1;
 const current=new _0.Vector3(_14.x,_14.y-.4,_14.z),predicted=current.clone();predicted.x+=v.x*scale*time;predicted.z+=v.z*scale*time;
 if(predicted.distanceTo(origin)>range||!_77(origin.x,origin.y,origin.z,predicted.x,predicted.y,predicted.z))return current;
 __v117Incoming.predictions++;return predicted;
}
__v113Aim=function(c,art){const p=c.g.position;return __v117EnemyAim(c,new _0.Vector3(p.x,p.y+1.7,p.z),art.type==='projectile'?73.71:45,art.range);};
const __v117IncomingAudit=window.__AURELIA_COMBAT117__.audit;window.__AURELIA_COMBAT117__.audit=()=>({...__v117IncomingAudit(),incoming:{evadeChance:.3,contacts:__v117Incoming.contacts,evades:__v117Incoming.evades,outOfReachRejected:__v117Incoming.rejected,predictions:__v117Incoming.predictions,techniquesThrough40:2,techniquesFrom41:3}});
const __v117PerformanceAudit=window.__AURELIA_COMBAT68__.performance;window.__AURELIA_COMBAT68__.performance=()=>({...__v117PerformanceAudit(),evasionChance:.3,guaranteedContact:true});
