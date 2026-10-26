/* Only the final-floor garrison gets the requested 2.5x modifiers; the Emperor is excluded. */
function __v124FinalMultiplier(c){return c?.hostile&&c.__v83Area==='eclipse-floor-2'&&c.boss!=='azrakh'?2.5:1;}
const __v124Range=__v118Range;__v118Range=function(c){return __v124Range(c)*__v124FinalMultiplier(c);};
const __v124Detect=__v92Detect;__v92Detect=function(c){return __v124Detect(c)*__v124FinalMultiplier(c);};
const __v124Movement=__v109MoveRate;__v109MoveRate=function(c){return __v124Movement(c)*__v124FinalMultiplier(c);};
const __v124Decision=__v98EnemyDecision;__v98EnemyDecision=function(c){
 const result=__v124Decision(c);if(c.dead||c.stun>0||c.specialAction||['windup','recover'].includes(c.ai)||!__v118Slot(c))return result;
 const b=__v98EnemyBrain(c),p=c.g.position,seen=__v92LOS(c),goal=seen?_14:__v98AI.clock-b.seenAt<3?b.lastSeen:null;if(!goal)return result;
 const distance=Math.hypot(p.x-goal.x,p.z-goal.z);if(distance<=__v117MeleeReach(c)||b.target&&b.stuck<.35)return result;
 const heading=Math.atan2(goal.x-p.x,goal.z-p.z),step=Math.min(3.2,Math.max(.8,distance-__v117MeleeReach(c)*.8));let best=null,score=Infinity;
 for(const turn of[0,.35,-.35,.7,-.7,1.1,-1.1,1.57,-1.57]){const q={x:p.x+Math.sin(heading+turn)*step,z:p.z+Math.cos(heading+turn)*step,mode:'pursue'};if(!__v97SafeTarget(c,q)||!__v91SegmentClear(c,p,{...q,y:__v92Ground(c,q.x,q.z)}))continue;const cost=Math.hypot(q.x-goal.x,q.z-goal.z)+__v98Neighbors(c).filter(n=>Math.hypot(n.g.position.x-q.x,n.g.position.z-q.z)<1.4).length*3;if(cost<score){score=cost;best=q;}}
 if(best){b.target=best;b.action=seen?'pursue':'investigate';b.updated=__v98AI.clock;b.next=Math.min(b.next,__v98AI.clock+.12);}return result;
};
function __v124Flier(c){return /^(ojo_espinoso|ice94_eye|volcano103-1|wingedDemon|angel|darkAngel|dragon|chimera)/i.test(c.spec?.id||'')||['abyssEye','iceEye','firebat','winged','dragon','chimera'].includes(c.__v109Family);}
function __v124EnemyPose(c,dt){
 if(c.dead||!c.g.visible||!__v92SameFloor(c))return;const p=c.g.position;
 let s=c.__motion124;if(!s)s=c.__motion124={x:p.x,z:p.z,stride:0,lean:0};const travelled=Math.hypot(p.x-s.x,p.z-s.z);s.x=p.x;s.z=p.z;s.stride+=Math.min(travelled,2)*2.8;const moving=travelled>.001&&!__v118Slots.waiting.has(c),attack=c.ai==='windup'||!!c.specialAction,k=1-Math.exp(-dt*16),flier=__v124Flier(c);
 if(flier){if(!s.pivot){s.pivot=new _0.Group();s.pivot.name='Cuerpo flotante · movimiento visual';c.g.add(s.pivot);}for(const child of [...c.g.children])if(child!==s.pivot)s.pivot.add(child);s.pivot.position.y=.65+Math.sin(_10*2.6+(c.phase||0))*.13;}
 s.lean+=((moving?.07:attack?-.055:0)-s.lean)*k;
 if(!c.__v88Raid){c.g.rotation.x=moving?.06:0;c.g.rotation.z=moving?Math.sin(s.stride)*.035:Math.sin(_10*1.7+(c.phase||0))*.012;}
 for(const [i,leg]of(c.legs||[]).entries()){const angle=flier?.12+Math.sin(_10*2+i)*.06:moving?Math.sin(s.stride+i*Math.PI)*.66:attack?-.18:0;leg.rotation.x+=(angle-leg.rotation.x)*k;}
 if(c.__v103)for(const [i,part]of(c.parts||[]).entries()){if(c.spec.id==='volcano103-1')part.rotation.z=(i%2?1:-1)*(.35+Math.sin(_10*9+(c.phase||0))*.5);else if(part.isGroup)part.rotation.x+=( (attack?-.75:moving?Math.sin(s.stride+i*Math.PI)*.35:Math.sin(_10*1.8+i)*.04)-part.rotation.x)*k;}
}
const __v124EnemyFrame=_h8;_h8=function(dt){const r=__v124EnemyFrame(dt);if(_u&&!_74())for(const c of __v68Pool())if(c.hostile)__v124EnemyPose(c,dt);return r;};
const __v124AimPoint=__v92AimPoint;__v92AimPoint=function(c){const p=__v124AimPoint(c);if(c.__motion124?.pivot)p.y+=c.__motion124.pivot.position.y*Math.abs(c.g.scale.y||1);return p;};
const __v124AirRelease=_d5;_d5=function(c){const offset=c.__motion124?.pivot?.position.y||0,foot=c.g.position.y;if(!offset)return __v124AirRelease(c);try{c.g.position.y+=offset;return __v124AirRelease(c);}finally{c.g.position.y=foot;}};
window.__AURELIA_ENEMIES124__={audit:()=>({attackMultiplier:__v105Scale.attackMultiplier,simultaneousHeroAttackers:3,finalFloorMultiplier:2.5,emperorExcluded:true,floatingTypes:['Ojo Espinoso','Ojo de Hielo','Murciélago de Brasa','Demonio Alado','Dragón','Quimera'],activeAttackers:__v118Slots.active.size})};
