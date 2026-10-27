/* Prefer useful techniques and rotate equally useful attacks instead of repeating slot zero. */
const __v125Used=new WeakMap(),__v125Choose=__v68Choose;
__v68Choose=function(c){
 const chosen=__v125Choose(c),history=__v125Used.get(c)||[];
 if(!chosen||/^heal|buff|guard/.test(chosen.type)||chosen.id==='ira124')return chosen;
 const distance=Math.hypot(c.g.position.x-_14.x,c.g.position.z-_14.z),options=(c.__v68Skills||[]).filter(s=>!/^heal|buff|guard/.test(s.type)&&s.id!=='ira124'&&distance<=(s.type==='ring'?Math.min(s.range,s.radius):s.range));
 if(!options.length)return chosen;
 const age=s=>{const at=history.lastIndexOf(s.id||s.name);return at<0?-100:at;};options.sort((a,b)=>age(a)-age(b));return options[0];
};
const __v125Release=_d5;_d5=function(c){const art=c.specialAction?.art,result=__v125Release(c);if(art){const history=__v125Used.get(c)||[];history.push(art.id||art.name);if(history.length>8)history.shift();__v125Used.set(c,history);}return result;};
// The native special loop tests c.art.range before selection; refresh it even from outside melee range.
const __v125SpecialTick=_d6;_d6=function(dt){
 if(_u&&!_74())for(const c of __v68Pool()){
  if(!c.hostile||c.dead||c.__v87RaidControlled||!__v92SameFloor(c))continue;
  if(!c.specialAction&&c.ai!=='windup'&&__v68CombatTime>=(c.__choiceAt125||0)){
   c.__choiceAt125=__v68CombatTime+.2;__v109Ensure(c);const art=__v68Choose(c);if(art)c.art=art;
  }
  const a=c.specialAction;if(a){
   const watch=c.__action125;if(!watch||watch.action!==a||watch.phase!==a.phase)c.__action125={action:a,phase:a.phase,at:__v68CombatTime};
   else if(!Number.isFinite(a.time)||__v68CombatTime-watch.at>Math.max(5,((a.art.windup||2)+2)/Math.max(.1,__v102CombatRate(c)))){_d3(c);c.__v70AttackChoice=null;}
  }else c.__action125=null;
 }
 return __v125SpecialTick(dt);
};
// Cache one floor-local pool only during a synchronous combat frame; late spawns reappear next frame.
let __v125Pool=null;const __v125EnemyPool=__v68Pool;
__v68Pool=function(){return __v125Pool||__v125EnemyPool();};
const __v125CombatFrame=_h8;_h8=function(dt){if(__v125Pool)return __v125CombatFrame(dt);__v125Pool=__v125EnemyPool();try{return __v125CombatFrame(dt);}finally{__v125Pool=null;}};
__v54CombatPool=__v68Pool;__v114LocalEnemies=__v68Pool;
// Stair wells are open space, not a valid standing cell for a grounded monster.
const __v125Blocked=__v91Blocked;__v91Blocked=function(c,x,z,y){const a=__v107Area(c);if(a?.floor88!==undefined&&(a.design.stairHoles88||[]).some(h=>__v84PointInRing(__v83Local(a,x,z),h)))return true;return __v125Blocked(c,x,z,y);};
// Retuning a late spawn must not silently replace the selected technique with slot zero.
const __v125Cast=_d4;_d4=function(c){const id=c.art?.id;__v109Ensure(c);if(id){const art=c.__v68Skills?.find(s=>s.id===id);if(art)c.art=art;}return __v125Cast(c);};
