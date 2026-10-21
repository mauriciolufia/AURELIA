/* Gentler early encounters and bounded, collision-aware routines for service NPCs. */
function __v99Early(c){return c?.hostile&&Number.isFinite(c.level)&&c.level>=1&&c.level<=40;}
function __v99Limit(c){
 if(__v99Life.building||!__v99Early(c)||!c.__v68Skills)return;
 const skills=c.__v68Skills;if(c.__v99Limited===skills&&skills.length<=2&&skills.includes(c.art))return;
 const unique=skills.filter((s,i)=>skills.findIndex(a=>(a.name||a.type)===(s.name||s.type))===i);
 const first=unique.find(a=>!/^heal|buff|guard/.test(a.type))||unique[0],second=unique.find(a=>a!==first&&/^heal|buff|guard/.test(a.type))||unique.find(a=>a!==first);
 const keep=[first,second].filter(Boolean),indices=keep.map(a=>skills.indexOf(a));
 c.__v68Skills=keep;c.__v99Limited=keep;
 if(c.__v85IndoorSkills===skills)c.__v85IndoorSkills=keep;
 if(c.__v85OutdoorSkills?.length===skills.length)c.__v85OutdoorSkills=indices.map(i=>c.__v85OutdoorSkills[i]);
 if(!keep.includes(c.art))c.art=keep[0];
 const b=__v98AI.enemy.get(c);if(b){b.skill=null;b.skillAt=0;b.role=keep.some(a=>a.type==='healAllies')?'support':keep.some(a=>a.type==='projectile')?'ranged':'melee';}
}
const __v99Tune=__v68Tune;__v68Tune=function(c){const r=__v99Tune(c);__v99Limit(c);return r;};
const __v99Choose=__v68Choose;__v68Choose=function(c){__v99Limit(c);return __v99Choose(c);};
const __v99Detection=__v92Detect;__v92Detect=function(c){return __v99Detection(c)*(__v99Early(c)?.85:1);};
const __v99Schedule=__v68Schedule;__v68Schedule=function(c){__v99Schedule(c);if(__v99Early(c))c.__v68NextAction=__v68CombatTime+(c.__v68NextAction-__v68CombatTime)*1.2;};

const __v99Life={plans:0,graphMs:0};
function __v99Area(n){
 const h=n.home,angle=h?.angle||0,cos=Math.cos(angle),sin=Math.sin(angle);
 let x=n.x,z=n.z,w=3.5,d=3.5,house=false;
 if(h&&Number.isFinite(h.w+h.d)){
  const dx=n.x-h.x,dz=n.z-h.z,lx=dx*cos-dz*sin,lz=dx*sin+dz*cos;
  if(Math.abs(lx)<h.w/2-.55&&Math.abs(lz)<h.d/2-.55){x=h.x;z=h.z;w=Math.max(.5,h.w/2-.65);d=Math.max(.5,h.d/2-.65);house=true;}
 }
 return{x,z,w,d,cos:house?cos:1,sin:house?sin:0,y:n.homeY,house,nodes:null,anchor:{x:n.x,z:n.z},serial:0};
}
function __v99Inside(a,x,z){const dx=x-a.x,dz=z-a.z;return Math.abs(dx*a.cos-dz*a.sin)<=a.w&&Math.abs(dx*a.sin+dz*a.cos)<=a.d;}
function __v99Free(a,x,z){const y=_ei(x,z);return __v99Inside(a,x,z)&&Number.isFinite(y)&&Math.abs(y-a.y)<.45&&!_i7(x,z,a.y+1.85);}
function __v99Segment(a,p,q){
 const steps=Math.max(1,Math.ceil(Math.hypot(q.x-p.x,q.z-p.z)/.22));
 for(let i=1;i<=steps;i++)if(!__v99Free(a,p.x+(q.x-p.x)*i/steps,p.z+(q.z-p.z)*i/steps))return false;return true;
}
// A small graph per occupied room, built lazily. Every edge is swept against furniture.
function* __v99BuildGraph(n){
 const a=n.__v99Area,step=.8,nodes=[{x:n.x,z:n.z,edges:[]}],grid=new Map(),radius=['merchant','sorcerer','innkeeper','king'].includes(n.job)||n.castleService?3.2:4.8,rx=Math.min(a.w,radius),rz=Math.min(a.d,radius);
 for(let ix=-Math.floor(rx/step);ix<=Math.floor(rx/step);ix++)for(let iz=-Math.floor(rz/step);iz<=Math.floor(rz/step);iz++){
  const x=a.anchor.x+ix*step*a.cos+iz*step*a.sin,z=a.anchor.z-ix*step*a.sin+iz*step*a.cos,free=__v99Free(a,x,z);yield;
  if(!free)continue;grid.set(ix+','+iz,nodes.length);nodes.push({x,z,ix,iz,edges:[]});
 }
 for(let i=1;i<nodes.length;i++){
  const p=nodes[i];for(const[dx,dz]of[[1,0],[0,1],[1,1],[-1,1]]){const j=grid.get((p.ix+dx)+','+(p.iz+dz));if(j!==undefined&&__v99Segment(a,p,nodes[j])){p.edges.push(j);nodes[j].edges.push(i);}yield;}
  if(Math.hypot(p.x-a.anchor.x,p.z-a.anchor.z)<1.3&&__v99Segment(a,a.anchor,p)){nodes[0].edges.push(i);p.edges.push(0);}yield;
 }
 return nodes;
}
function __v99Graph(n){
 const a=n.__v99Area;if(a.nodes)return a.nodes;
 const budget=__v60Mobile?.6:1.2;if(__v99Life.graphMs>=budget)return null;
 if(!a.builder)a.builder=__v99BuildGraph(n);const begin=performance.now();
 for(let i=0;i<40;i++){const step=a.builder.next();if(step.done){a.nodes=step.value;a.builder=null;break;}if(performance.now()-begin+__v99Life.graphMs>=budget)break;}
 __v99Life.graphMs+=performance.now()-begin;return a.nodes;
}
function __v99Route(n,b,action){
 const a=n.__v99Area,nodes=a.nodes;let start=0,distance=Infinity;
 for(let i=0;i<nodes.length;i++){const d=Math.hypot(nodes[i].x-n.x,nodes[i].z-n.z);if(d<distance&&__v99Segment(a,n,nodes[i])){distance=d;start=i;}}
 const queue=[start],parents=new Map([[start,-1]]);for(let i=0;i<queue.length;i++)for(const j of nodes[queue[i]].edges)if(!parents.has(j)){parents.set(j,queue[i]);queue.push(j);}
 let choices=queue.filter(i=>Math.hypot(nodes[i].x-n.x,nodes[i].z-n.z)>.9);
 if(action==='greet')choices=[];
 if(action==='flee'||action==='alert')choices.sort((i,j)=>Math.hypot(nodes[j].x-(b.threat?.x??_14.x),nodes[j].z-(b.threat?.z??_14.z))-Math.hypot(nodes[i].x-(b.threat?.x??_14.x),nodes[i].z-(b.threat?.z??_14.z)));
 const goal=choices.length?choices[(action==='flee'||action==='alert')?0:(a.serial +Math.floor(Math.abs(n.phase||0)*7))%choices.length]:start,route=[];
 for(let i=goal;i!==-1;i=parents.get(i))route.push(nodes[i]);route.reverse();
 b.route=route;b.index=0;b.target={x:nodes[goal].x,z:nodes[goal].z};b.blocked=0;n.goal={...b.target,action:__v98NPCLabels[action]};n.nav=[];
}
function __v99Decision(n,b){
 const now=__v98AI.clock,danger=__v97NearestThreat(n),night=_x>=21||_x<6,weather=_66(n.x,n.z);let action;
 if(danger){b.threat={x:danger.g.position.x,z:danger.g.position.z};b.dangerUntil=now+5;action=b.action==='alert'||b.action==='flee'?'flee':'alert';}
 else if(now<b.dangerUntil)action='flee';
 else if(now<b.until&&b.target)return;
 else if(Math.hypot(n.x-_14.x,n.z-_14.z)<5&&now-b.lastGreet>25){action='greet';b.lastGreet=now;}
 else if(night&&b.action!=='sleep')action='sleep';
 else if(weather&&b.action!=='shelter')action='shelter';
 else if(b.energy<.22)action='rest';
 else if(b.curiosity<.15)action='read';
 else if(b.social<.2)action='socialise';
 else{const options=['work','trade','read','sweep','cook','patrol','socialise','play','rest','pray'];action=options[(Math.floor(Math.abs(n.phase||0)*13)+n.__v99Area.serial)%options.length];}
 n.__v99Area.serial++;b.action=action;b.partner=__v88Life.active.find(o=>o!==n&&!o.__v88Dead&&Math.abs(o.homeY-n.homeY)<1&&Math.hypot(o.x-n.x,o.z-n.z)<4&&_5w(n.x,n.z,o.x,o.z,n.homeY+1.4))||null;
 b.until=now+(action==='alert'?1.2:action==='greet'?2.5:6);n.activity=__v98NPCLabels[action];n.sleeping=action==='sleep';__v99Route(n,b,action);
 if(action==='alert')for(const other of __v88Life.active)if(other!==n&&Math.hypot(other.x-n.x,other.z-n.z)<12){const friend=__v98NPCBrain(other);friend.threat={...b.threat};friend.dangerUntil=now+5;friend.until=0;}
}
function __v99InteriorTick(n,b,dt){
 const now=__v98AI.clock,a=n.__v99Area;
 if(!a.nodes&&!__v99Graph(n)){__v98NPCPose(n,b,false,dt);n.activity=__v98NPCLabels[b.action];return;}
 if(now>=b.next&&__v99Life.plans<3){b.next=now+.5;__v99Life.plans++;__v99Decision(n,b);}
 let moving=false;const point=b.route[b.index];
 if(point){const d=Math.hypot(point.x-n.x,point.z-n.z);if(d<.12)b.index++;else{
  const step=Math.min(d,(b.action==='flee'?2.5:1.15)*Math.min(.05,dt)),x=n.x+(point.x-n.x)/d*step,z=n.z+(point.z-n.z)/d*step;
  const occupied=__v88Life.active.some(o=>o!==n&&!o.__v88Dead&&Math.abs(o.homeY-n.homeY)<1&&Math.hypot(o.x-x,o.z-z)<.55&&Math.hypot(o.x-n.x,o.z-n.z)>.55);
  if(!occupied&&__v99Segment(a,n,{x,z})){n.x=x;n.z=z;moving=true;n.g.rotation.y+=Math.atan2(Math.sin(Math.atan2(n.x-point.x,n.z-point.z)-n.g.rotation.y),Math.cos(Math.atan2(n.x-point.x,n.z-point.z)-n.g.rotation.y))*(1-Math.exp(-12*dt));b.blocked=0;}else b.blocked+=dt;
 }}
 if(b.blocked>1){b.until=0;b.next=0;b.target=null;b.route=[];b.blocked=0;}
 if(!moving&&now-b.lastWork>8){if(b.action==='work')b.stock.craft=Math.min(6,b.stock.craft+1);if(b.action==='cook'&&b.stock.grain>0){b.stock.grain--;b.energy=Math.min(1,b.energy+.2);}b.lastWork=now;}
 if(!moving&&b.action==='trade'&&b.partner&&Math.hypot(n.x-b.partner.x,n.z-b.partner.z)<3&&now-b.lastTrade>12){const other=__v98NPCBrain(b.partner);if(b.stock.craft>0&&other.stock.grain>0){b.stock.craft--;other.stock.craft++;other.stock.grain--;b.stock.grain++;b.lastTrade=other.lastTrade=now;}}
 __v98NPCPose(n,b,moving,dt);n.activity=__v98NPCLabels[b.action];n.__v88Moving=moving;
}
// Idle poses breathe and gesture; an NPC resting or serving is still visibly alive.
const __v99Pose=__v98NPCPose;__v98NPCPose=function(n,b,moving,dt){__v99Pose(n,b,moving,dt);if(moving)return;
 const t=__v98AI.clock+(n.phase||0);n.g.position.y+=Math.sin(t*2)*.012;
 for(const[i,arm]of(n.arms||[]).entries())arm.rotation.z=Math.sin(t*1.7+i)*.045;
 if(b.action!=='sleep'&&b.action!=='greet'&&!b.partner)n.g.rotation.y+=Math.sin(t*.8)*.12*dt;
};
function __v99Register(){
 const givers=new Set(_bp.map(q=>q.giver));
 for(const c of _m)__v99Limit(c);
 for(const n of _2h){if(n.__v88Dead||n.__v88Controlled)continue;n.__v98Active=true;
  if(!_1h[n.homeSite??n.site]||!n.__v88Added&&(n.home||n.castleService||givers.has(n.id)||['merchant','sorcerer','innkeeper','priest','king'].includes(n.job)||n.__v92Home||n.__v94FaroHome)){
   const a=n.__v99Area=__v99Area(n);
   // A few original kings spawn inside their throne's collision box. Repair once at load.
   if(!__v99Free(a,n.x,n.z)){let fixed=false;for(let r=.4;r<=3.2&&!fixed;r+=.4)for(let i=0;i<16;i++){const x=a.anchor.x+Math.cos(i*Math.PI/8)*r,z=a.anchor.z+Math.sin(i*Math.PI/8)*r;if(!__v99Free(a,x,z))continue;n.x=x;n.z=z;n.g.position.set(x,n.homeY,z);a.anchor={x,z};fixed=true;break;}}
  }
  __v98NPCBrain(n);
 }
}
// Species balancing can assign the final level after its initial kit is constructed.
const __v99World=_bj;_bj=function(...args){const building=__v99Life.building;__v99Life.building=true;let r;try{r=__v99World(...args);}finally{__v99Life.building=building;}__v99Register();return r;};
const __v99Restore=_dn;_dn=function(...args){const building=__v99Life.building;__v99Life.building=true;let r;try{r=__v99Restore(...args);}finally{__v99Life.building=building;}__v99Register();return r;};
const __v99Frame=_hr;_hr=function(dt){__v99Life.plans=0;__v99Life.graphMs=0;return __v99Frame(dt);};
const __v99Sense=__v88Sense;__v88Sense=function(){const r=__v99Sense();for(const n of __v88Life.active)if(!n.__v98Active){n.__v98Active=true;if(!_1h[n.homeSite??n.site])n.__v99Area=__v99Area(n);__v98NPCBrain(n);}return r;};
window.__AURELIA_AI99__={audit:()=>({earlyMaxTechniques:2,earlyAttackIntervalMultiplier:1.2,earlyDetectionMultiplier:.85,aggressiveFromLevel:41,npcs:_2h.filter(n=>!n.__v88Dead&&!n.__v88Controlled).length,managed:_2h.filter(n=>n.__v98Active&&!n.__v88Dead&&!n.__v88Controlled).length,interiors:_2h.filter(n=>n.__v99Area).length,behaviors:[...__v98NPCActions]})};
