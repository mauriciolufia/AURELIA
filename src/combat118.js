/* One multiplier per dimension; fortress reach remains exactly the v117 value. */
function __v118Range(c){return c?.hostile&&!__v85Indoor(c)?2:1;}
function __v118Speed(c){return c?.hostile?2:1;}
function __v118ProjectileSpeed(c){return 73.71*__v118Speed(c);}
function __v118RaidRange(r,d){return __v113RaidChoice(r)==='normal'?(d.__v113Hero?__v117MeleeReach(r.c):3*__v118Range(r.c)):(r.fire?10:3)*__v118Range(r.c);}
function __v118RaidOffset(r,d){return __v113RaidChoice(r)==='normal'?(d.__v113Hero?__v117MeleeReach(r.c)*.72:2.6*__v118Range(r.c)):(r.fire?7:2.6)*__v118Range(r.c);}
const __v118PreviousReach=__v117MeleeReach;__v117MeleeReach=function(c){return __v118PreviousReach(c)*__v118Range(c);};
__v98Reach=__v117MeleeReach;
const __v118PreviousDetect=__v92Detect;__v92Detect=function(c){return __v118PreviousDetect(c)*__v118Speed(c);};
const __v118PreviousRate=__v102CombatRate;__v102CombatRate=function(c){return __v118PreviousRate(c)*__v118Speed(c);};
__v113Aim=function(c,art){const p=c.g.position;return __v117EnemyAim(c,new _0.Vector3(p.x,p.y+1.7,p.z),art.type==='projectile'?__v118ProjectileSpeed(c):45*__v118Speed(c),art.range);};
// Attack cadence does not multiply damage per hit or the old poison/burn tick rate.
const __v118Poison=__v87ApplyPoison;__v87ApplyPoison=function(...args){const r=__v118Poison(...args);if(r){const c=__v102Combat.source,rate=c?__v118PreviousRate(c):1;__v87Poison.rate102=rate;__v87Poison.next=2/rate;}return r;};
const __v118Incoming=_d0;_d0=function(c,power=1,status=null){const r=__v118Incoming(c,power,status);if(r&&status==='burn')__v102Combat.burnRate=__v118PreviousRate(c);return r;};

/* A pooled world-space wind crescent. It is visual feedback, not a second damage pass. */
const __v118Wind={geometry:null,pool:[],cursor:0,spawned:0};
function __v118WindPool(){
 const s=__v118Wind;if(s.geometry)return;
 const vertices=[],steps=48;
 function point(t,outer){const a=(t-.5)*2.1,r=1.8+(outer?Math.sin(t*Math.PI)*.24:0);return[Math.sin(a)*r,0,1.8-Math.cos(a)*r];}
 for(let i=0;i<steps;i++){const t=i/steps,u=(i+1)/steps,a=point(t,false),b=point(t,true),c=point(u,false),d=point(u,true);vertices.push(...a,...b,...c,...b,...d,...c);}
 s.geometry=new _0.BufferGeometry();s.geometry.setAttribute('position',new _0.Float32BufferAttribute(vertices,3));s.geometry.computeBoundingSphere();
 for(let i=0;i<3;i++){
  const material=new _0.MeshBasicMaterial({color:'#c9fbff',transparent:true,opacity:0,depthWrite:false,depthTest:true,side:_0.DoubleSide,blending:_0.AdditiveBlending,toneMapped:false});
  const mesh=new _0.Mesh(s.geometry,material);mesh.name='Corte de viento · espada';mesh.userData.animated=true;mesh.visible=false;_6.add(mesh);s.pool.push({mesh,age:1,life:.28});
 }
}
function __v118WindSpawn(){
 if(!_u||_74())return;const weapon=_5l.find(i=>i.id===rpg.equipped.weapon);if(weapon?.type==='spear')return;
 __v118WindPool();const s=__v118Wind,f=s.pool[s.cursor++%s.pool.length];
 f.age=0;f.life=.28;f.ox=_14.x;f.oz=_14.z;f.y=_14.y-.48;f.dx=-Math.sin(yaw);f.dz=-Math.cos(yaw);f.reach=Math.max(.8,_g4().reach);f.distance=.8;
 f.mesh.position.set(f.ox+f.dx*.8,f.y,f.oz+f.dz*.8);f.mesh.rotation.set(-.06,yaw,0);f.mesh.scale.setScalar(.9);f.mesh.material.opacity=.88;
 f.mesh.visible=_77(f.ox,f.y,f.oz,f.mesh.position.x,f.y,f.mesh.position.z);if(!f.mesh.parent)_6.add(f.mesh);s.spawned++;
}
function __v118WindTick(dt){
 for(const f of __v118Wind.pool){if(!f.mesh.visible)continue;
  f.age+=dt;const t=Math.min(1,f.age/f.life),distance=.8+(f.reach-.8)*t,x=f.ox+f.dx*distance,z=f.oz+f.dz*distance,p=f.mesh.position;
  if(t>=1||!_77(p.x,f.y,p.z,x,f.y,z)){f.mesh.visible=false;continue;}
  f.distance=distance;p.set(x,f.y,z);f.mesh.scale.setScalar(.9+t*.55);f.mesh.material.opacity=.88*(1-t)*(1-t);
 }
}
function __v118WindClear(){for(const f of __v118Wind.pool){f.age=f.life;f.mesh.visible=false;}}
const __v118Strike=_8e;_8e=function(){const r=__v118Strike();if(_u&&!_74()){if(_5q){_5q.life=0;_5q.g.visible=false;}__v118WindSpawn();}return r;};
const __v118SwordTick=_8g;_8g=function(dt){const r=__v118SwordTick(dt);if(_u&&!_74())__v118WindTick(dt);return r;};
const __v118World=_bj;_bj=function(...args){__v118WindClear();return __v118World(...args);};
const __v118Load=_dn;_dn=function(...args){__v118WindClear();return __v118Load(...args);};
window.__AURELIA_COMBAT118__={audit:()=>({outdoorRangeMultiplier:2,fortressRangeMultiplier:1,attackSpeedMultiplier:2,projectileSpeed:147.42,detectionMultiplier:2,damagePerHitMultiplier:1,outwardSword:true,wind:{spawned:__v118Wind.spawned,pool:__v118Wind.pool.length,active:__v118Wind.pool.filter(f=>f.mesh.visible).length,extraDamage:false}})};
