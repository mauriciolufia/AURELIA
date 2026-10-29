/* Fresh stats preserve the current health fraction; repeated loads never multiply it again. */
const __v140EnemyStats=__v87EnemyStats;__v87EnemyStats=function(c){const r=__v140EnemyStats(c);if(c?.boss==='azrakh'){c.maxHp*=2;c.hp=c.dead?0:Math.min(c.maxHp,c.hp*2);}return r;};
const __v140Motion={models:new Set(),built:0};
function __v140Rig(c){
 const host=c.hdGroup||c.g;let rig=c.__rig140;if(rig?.host===host)return rig;
 if(rig)for(const j of rig.joints)if(j.created&&j.node.parent){const parent=j.node.parent;for(const child of [...j.node.children])parent.attach(child);j.node.removeFromParent();}
 const candidates=[...new Set([...(c.parts||[]),...(c.legs||[]),...(c.__anatomy128?.synthetic||[])])].filter(o=>o?.parent&&Math.abs(o.position.x)>.32&&o.position.y>1.05&&o.position.y<2.8);
 // Fixed custom bodies can have arms that the old leg-only animator never registered.
 if(!candidates.length)for(const o of host.children)if(o.isMesh&&Math.abs(o.position.x)>.6&&o.position.y>1.3&&o.position.y<2.7)candidates.push(o);
 const selected=[];for(const side of[-1,1]){const arm=candidates.filter(o=>Math.sign(o.position.x)===side).sort((a,b)=>Number(b.isGroup)-Number(a.isGroup)||Math.abs(a.position.y-1.9)-Math.abs(b.position.y-1.9))[0];if(arm)selected.push(arm);}
 const joints=[];
 for(const arm of selected){let node=arm,created=false;if(!arm.isGroup){const parent=arm.parent;parent.updateWorldMatrix(true,true);node=new _0.Group();node.name='Articulación de hombro · ataque';node.position.copy(arm.position);node.position.y+=Math.min(.5,Math.abs(arm.scale.y)*.3);parent.add(node);node.attach(arm);created=true;}
  node.userData.animated=true;joints.push({node,created,rotation:node.rotation.clone(),side:Math.sign(node.position.x)||1});
 }
 rig=c.__rig140={host,joints,pulse:0,weight:0,action:null};__v140Motion.models.add(c);__v140Motion.built++;return rig;
}
function __v140AttackImpulse(c){if(c?.g&&!c.dead)__v140Rig(c).pulse=.38;}
const __v140Melee=_d1;_d1=function(c,...args){__v140AttackImpulse(c);return __v140Melee(c,...args);};
const __v140SpellRelease=_d5;_d5=function(c,...args){__v140AttackImpulse(c);return __v140SpellRelease(c,...args);};
const __v140ImperialRelease=__v94EmperorRelease;__v94EmperorRelease=function(...args){__v140AttackImpulse(__v94Emperor.boss);return __v140ImperialRelease(...args);};
function __v140EnemyPose(c,dt){
 if(c.dead||!c.g.visible||!__v92SameFloor(c)||__v119Disabled(c)||c.stun>0||c.g.position.distanceToSquared(_14)>55*55)return;
 const r=__v140Rig(c),action=c===__v94Emperor.boss?__v94Emperor.action:c.specialAction,windup=!!action||c.ai==='windup',k=1-Math.exp(-Math.max(0,dt)*22);
 if(action!==r.action){r.action=action;r.duration=Math.max(.1,action?.time||c.attackTimer||.7);}
 r.pulse=Math.max(0,r.pulse-dt);r.weight+=(Number(windup||r.pulse>0)-r.weight)*k;
 if(r.weight<.001){r.weight=0;return;}
 const progress=action?_18(1-(action.time||0)/r.duration,0,1):c.ai==='windup'?.45:1,release=r.pulse>0?Math.sin((1-r.pulse/.38)*Math.PI):0;
 const raise=windup?.65+progress*.65:0,w=r.weight;
 for(const j of r.joints){j.node.rotation.x=_19(j.node.rotation.x,j.rotation.x-raise+release*.95,w);j.node.rotation.y=_19(j.node.rotation.y,j.rotation.y+j.side*(raise*.22-release*.5),w);j.node.rotation.z=_19(j.node.rotation.z,j.rotation.z-j.side*(raise*.22+release*.08),w);}
 c.g.rotation.x=_19(c.g.rotation.x,-raise*.08+release*.18,w);c.g.rotation.z=_19(c.g.rotation.z,Math.sin(progress*Math.PI)*.10-release*.10,w);
 for(const[i,leg]of(c.legs||[]).entries())if(!r.joints.some(j=>j.node===leg||leg.parent===j.node))leg.rotation.x=_19(leg.rotation.x,(i%2?1:-1)*(.12+release*.16),w*.5);
}
const __v140EnemyFrame=_h8;_h8=function(dt){const r=__v140EnemyFrame(dt);if(_u&&!_74())for(const c of __v68Pool())if(c.hostile)__v140EnemyPose(c,dt);return r;};
const __v140MotionWorld=_bj;_bj=function(...args){__v140Motion.models.clear();__v140Motion.built=0;return __v140MotionWorld(...args);};
window.__AURELIA_COMBAT140__={audit:()=>({emperorHP:__v94Emperor.boss?.maxHp,hpMultiplier:2,animatedModels:__v140Motion.built,joints:[...__v140Motion.models].map(c=>({id:c.spec.id,joints:c.__rig140?.joints.length||0}))})};
