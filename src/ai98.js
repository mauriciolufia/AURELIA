/* Contextual utility AI. Decisions are staggered; movement and damage retain native validation. */
const __v98AI={clock:0,nextSense:0,enemy:new WeakMap(),npc:new WeakMap(),near:[],grid:new Map(),reservations:new Map(),velocity:{x:0,z:0},player:null,decisions:0,lastMs:0,cursor:0};
const __v98EnemyActions=['patrol','investigate','pursue','intercept','flankLeft','flankRight','encircle','keepDistance','reposition','evade','retreat','heal','support','defend','recover'];
const __v98NPCActions=['work','trade','read','sweep','cook','patrol','socialise','play','greet','rest','pray','sleep','shelter','flee','alert'];
const __v98Detection=__v92Detect;__v92Detect=function(c){return __v85Indoor(c)?Math.max(18,__v98Detection(c)):__v98Detection(c);};
function __v98EnemyBrain(c){let b=__v98AI.enemy.get(c);if(!b){const skills=c.__v68Skills||[],role=skills.some(a=>a.type==='healAllies')?'support':skills.some(a=>a.type==='projectile')?'ranged':'melee';b={role,action:'patrol',next:0,target:null,lastSeen:null,seenAt:-Infinity,slot:Math.abs(Math.floor((c.phase||0)*137+c.x*3+c.z*7))%8,lastX:c.g.position.x,lastZ:c.g.position.z,stuck:0};__v98AI.enemy.set(c,b);}return b;}
function __v98EnemySense(dt){
 const a=__v98AI;if(a.clock<a.nextSense)return;a.nextSense=a.clock+.25;
 if(a.player&&Math.hypot(_14.x-a.player.x,_14.z-a.player.z)<12){const span=Math.max(.05,a.clock-a.player.t);a.velocity.x=_18((_14.x-a.player.x)/span,-24,24);a.velocity.z=_18((_14.z-a.player.z)/span,-24,24);}else a.velocity.x=a.velocity.z=0;
 a.player={x:_14.x,z:_14.z,t:a.clock};a.near=__v68Pool().filter(c=>c.hostile&&!c.dead&&!c.__v83Retired&&Math.hypot(c.g.position.x-_14.x,c.g.position.z-_14.z)<130).sort((c,d)=>c.g.position.distanceToSquared(_14)-d.g.position.distanceToSquared(_14)).slice(0,96);a.grid.clear();
 for(const c of a.near){const p=c.g.position,key=Math.floor(p.x/12)+','+Math.floor(p.z/12);if(!a.grid.has(key))a.grid.set(key,[]);a.grid.get(key).push(c);}
 for(const [key,r] of a.reservations)if(r.until<a.clock||r.c.dead)a.reservations.delete(key);
}
function __v98Neighbors(c){const p=c.g.position,result=[];for(let x=Math.floor(p.x/12)-1;x<=Math.floor(p.x/12)+1;x++)for(let z=Math.floor(p.z/12)-1;z<=Math.floor(p.z/12)+1;z++)for(const ally of __v98AI.grid.get(x+','+z)||[])if(ally!==c&&ally.__v83Area===c.__v83Area&&Math.abs(ally.g.position.y-p.y)<3&&(ally.g.position.x-p.x)**2+(ally.g.position.z-p.z)**2<324)result.push(ally);return result;}
const __v98Sight=__v85EnemySight;
__v85EnemySight=function(c,d){const visible=__v98Sight(c,d),b=__v98EnemyBrain(c);if(visible){b.lastSeen={x:_14.x,z:_14.z};b.seenAt=__v98AI.clock;return true;}return !!b.lastSeen&&__v92SameFloor(c)&&d<__v92Detect(c)&&__v98AI.clock-b.seenAt<3;};
function __v98Reach(c){return __v85EnemyRange(c,(c.boss?(c.defn?.range||4)*.72:c.elite?4:2.4)*1.3*1.5*.7*1.5);}
function __v98EnemyDecision(c){
 const b=__v98EnemyBrain(c),p=c.g.position,d=Math.hypot(p.x-_14.x,p.z-_14.z),seen=__v92LOS(c),health=c.hp/Math.max(1,c.maxHp),reach=__v98Reach(c),aim=seen?_14:b.lastSeen||p,knownDistance=Math.hypot(p.x-aim.x,p.z-aim.z)||1,dx=(p.x-aim.x)/knownDistance,dz=(p.z-aim.z)/knownDistance,side=b.slot%2?1:-1;
 const elapsed=_18(__v98AI.clock-(b.decisionClock??__v98AI.clock),0,.5);b.decisionClock=__v98AI.clock;
 b.stuck=Math.hypot(p.x-b.lastX,p.z-b.lastZ)<.04&&b.target&&Math.hypot(b.target.x-p.x,b.target.z-p.z)>.5?b.stuck+elapsed:0;b.lastX=p.x;b.lastZ=p.z;
 let action='pursue',target={x:_14.x,z:_14.z};
 if(c.specialAction||c.ai==='windup'||c.ai==='recover'&&c.cooldown>0){b.action=c.specialAction&&/^heal/.test(c.specialAction.art.type)?'heal':c.specialAction&&/^buff|guard/.test(c.specialAction.art.type)?'defend':'recover';b.target=null;return;}
 if(c.stun>0){b.action='recover';b.target=null;return;}
 if(!seen){if(b.lastSeen&&__v98AI.clock-b.seenAt<3){action='investigate';target={...b.lastSeen};}else{b.action='patrol';b.target=null;return;}}
 else if(_84>0&&d<Math.max(reach*1.2,Math.min(8,_g4().reach||4))&&health<.65){action='evade';target={x:p.x-dz*side*2.4+dx,z:p.z+dx*side*2.4+dz};}
 else if(health<.22&&b.role!=='melee'){action='retreat';target={x:p.x+dx*4-dz*side,z:p.z+dz*4+dx*side};}
 else if(b.role==='support'&&__v98Neighbors(c).some(a=>a.hp<a.maxHp*.55)){
  action='support';const ally=__v98Neighbors(c).filter(a=>a.hp<a.maxHp*.55).sort((a,b)=>a.hp/a.maxHp-b.hp/b.maxHp)[0];target={x:ally.g.position.x+dx*2,z:ally.g.position.z+dz*2};
 }else if(b.role==='ranged'||b.role==='support'){
  const desired=_18((c.art?.range||18)*.62,reach+1,18);
  action='keepDistance';target=d<desired*.8?{x:p.x+dx*3-dz*side,z:p.z+dz*3+dx*side}:d>desired*1.2?{x:_14.x+dx*desired,z:_14.z+dz*desired}:{x:p.x-dz*side*2,z:p.z+dx*side*2};
 }else if(Math.hypot(__v98AI.velocity.x,__v98AI.velocity.z)>3&&d>reach*1.2){action='intercept';target={x:_14.x+__v98AI.velocity.x*.35,z:_14.z+__v98AI.velocity.z*.35};}
 else if(__v98Neighbors(c).length>1&&d>reach*.85){action='encircle';const angle=b.slot*Math.PI/4;target={x:_14.x+Math.cos(angle)*reach*.75,z:_14.z+Math.sin(angle)*reach*.75};}
 else if(d>reach&&d<22){action=side>0?'flankLeft':'flankRight';target={x:_14.x+dx*reach*.65-dz*side*reach*.45,z:_14.z+dz*reach*.65+dx*side*reach*.45};}
 else if(d<=reach*.85){target={x:p.x,z:p.z};}
 if(b.stuck>.7){action='reposition';target={x:p.x-dz*side*2,z:p.z+dx*side*2};}
 const choices=[target,{x:p.x+(target.x-p.x)*.5,z:p.z+(target.z-p.z)*.5},{x:p.x-dz*side*2,z:p.z+dx*side*2},{x:p.x+dz*side*2,z:p.z-dx*side*2}];let selected=null,best=-Infinity;
 for(const candidate of choices){if(!__v97SafeTarget(c,candidate))continue;const key=(c.__v83Area||'world')+':'+Math.round(candidate.x/2)+','+Math.round(candidate.z/2),reservation=__v98AI.reservations.get(key);let score=-Math.hypot(candidate.x-target.x,candidate.z-target.z)-(reservation&&reservation.c!==c?8:0);
  for(const ally of __v98Neighbors(c))if(Math.hypot(candidate.x-ally.g.position.x,candidate.z-ally.g.position.z)<1.5)score-=6;
  if(score>best){best=score;selected={...candidate,mode:action};}
 }
 b.action=action;b.target=selected;
 if(selected)__v98AI.reservations.set((c.__v83Area||'world')+':'+Math.round(selected.x/2)+','+Math.round(selected.z/2),{c,until:__v98AI.clock+.65});
}
const __v98Tactics=__v68Tactics;
__v68Tactics=function(c,d){const b=__v98AI.enemy.get(c);if(b&&__v98AI.clock-b.updated<.65&&c.stun<=0&&!c.specialAction&&c.ai!=='windup'&&c.ai!=='recover')return b.target;return __v98Tactics(c,d);};
const __v98Choose=__v68Choose;
__v68Choose=function(c){
 const b=__v98EnemyBrain(c),now=__v68CombatTime;if(b.skillAt>now&&b.skill)return b.skill;b.skillAt=now+.22;
 const ready=now>=(c.__v68SupportReady||0),p=c.g.position,d=Math.hypot(p.x-_14.x,p.z-_14.z),skills=c.__v68Skills||[],allies=ready&&skills.some(a=>a.type==='healAllies')?__v68Allies(c,18):[];let best=null,score=-Infinity;
 for(const art of skills){
  let value=-Infinity;
  if(art.type==='heal'&&ready&&c.hp<c.maxHp*.55&&(c.__v68Heals||0)<2)value=150;
  else if(art.type==='healAllies'&&ready&&((c.hp<c.maxHp*.55&&(c.__v68Heals||0)<2)||allies.some(a=>a.hp<a.maxHp*.55&&(a.__v68Heals||0)<2)))value=160;
  else if(/^buff|guard/.test(art.type)&&ready&&c.hp<c.maxHp*.5&&!(art.type==='buffDefense'&&c.__v87DefTime>0)&&!(art.type==='buffBarrier'&&c.__v87BarrierTime>0))value=90;
  else if(!/^heal|buff|guard/.test(art.type)&&d<=Number(art.range||art.radius||0))value=art.type==='projectile'?(d>__v98Reach(c)?100:60):art.type==='ring'?d<=art.radius?110:-Infinity:art.type==='charge'&&d>__v98Reach(c)?95:75;
  if(value>score){score=value;best=art;}
 }
 b.skill=best||__v98Choose(c);return b.skill;
};
const __v98AttackChoice=__v70AttackChoice;
__v70AttackChoice=function(c){const choice=__v98AttackChoice(c);if(!choice||c.dead||c.stun>0)return choice;
 const art=c.art,d=Math.hypot(c.g.position.x-_14.x,c.g.position.z-_14.z),support=/^heal|buff|guard/.test(art?.type||'');
 const useful=art?.type==='heal'?c.hp<c.maxHp*.55&&(c.__v68Heals||0)<2:art?.type==='healAllies'?(c.hp<c.maxHp*.55&&(c.__v68Heals||0)<2)||__v98Neighbors(c).some(a=>a.hp<a.maxHp*.55&&(a.__v68Heals||0)<2):c.hp<c.maxHp*.5&&!(art?.type==='buffDefense'&&c.__v87DefTime>0)&&!(art?.type==='buffBarrier'&&c.__v87BarrierTime>0);
 if(support&&!useful&&choice==='special')return c.__v70AttackChoice='normal';
 if(c.specialCooldown<=0&&__v92LOS(c)&&art&&(support&&useful&&__v68CombatTime>=(c.__v68SupportReady||0)||!support&&d>__v98Reach(c)&&d<=(art.range||0)))return c.__v70AttackChoice='special';
 return choice;
};
function __v98CombatTick(dt){
 if(!_u||_74())return;const a=__v98AI;a.clock+=Math.min(.1,Math.max(0,dt));__v98EnemySense(dt);
 const begin=performance.now(),limit=__v60Mobile?.85:1.5;let count=0;
 while(a.near.length&&count++<a.near.length&&performance.now()-begin<limit){a.cursor%=a.near.length;const c=a.near[a.cursor++],b=__v98EnemyBrain(c);if(a.clock<b.next)continue;b.next=a.clock+.22+(b.slot%3)*.035;__v98EnemyDecision(c);b.updated=a.clock;a.decisions++;}
 a.lastMs=performance.now()-begin;
}
const __v98CombatFrame=_d7;_d7=function(dt){__v98CombatTick(dt);return __v98CombatFrame(dt);};

// Fifteen civilian activities, with work schedules, needs, weather and danger priorities.
const __v98NPCLabels={work:'Haciendo artesanías',trade:'Atendiendo el puesto',read:'Leyendo sentado',sweep:'Barriendo',cook:'Cocinando',patrol:'Paseando por el vecindario',socialise:'Conversando',play:'Jugando en la plaza',greet:'Saludando al viajero',rest:'Descansando',pray:'Rezando',sleep:'Dormiendo',shelter:'Esperando bajo techo',flee:'Buscando refugio del peligro',alert:'Avisando a los vecinos'};
function __v98NPCBrain(n){let b=__v98AI.npc.get(n);if(!b){b={action:'patrol',until:0,next:0,energy:.65,curiosity:.5,social:.6,stock:{grain:2,craft:2},lastTrade:-Infinity,lastWork:0,partner:null,target:null,route:[],index:0,threat:null,dangerUntil:0,lastGreet:-Infinity,blocked:0,px:n.x,pz:n.z};__v98AI.npc.set(n,b);}return b;}
function __v98NPCDecision(n,b){
 const now=__v98AI.clock,night=_x>=21||_x<6,danger=__v97NearestThreat(n),data=__v88TownPoints(n.homeSite??n.site),weather=_66(n.x,n.z);let action,target=null,partner=null;
 if(danger){b.threat={x:danger.g.position.x,z:danger.g.position.z};b.dangerUntil=now+5;action=b.action==='flee'||b.action==='alert'?'flee':'alert';}
 else if(now<b.dangerUntil){action='flee';}
 else if(night)action='sleep';else if(weather)action='shelter';else if(now<b.until&&b.action!=='sleep'&&b.action!=='shelter'&&b.action!=='flee'&&b.action!=='alert')return;
 else if(b.energy<.22)action='rest';
 else if(b.social<.2)action='socialise';else if(b.curiosity<.15)action='read';
 else if(Math.hypot(n.x-_14.x,n.z-_14.z)<5&&now-b.lastGreet>30){action='greet';b.lastGreet=now;}
 else{
  const seed=Math.abs(Math.floor((n.phase||0)*73+now/9+(n.homeSite??n.site)*13)),options=n.age==='child'?['play','socialise','read','patrol','pray','rest']:['work','trade','read','sweep','cook','patrol','socialise','rest','pray'];
  action=options[seed%options.length];
 }
 if(action==='sleep'||action==='shelter')target=n.home?_64(n.home):data.points.find(p=>Math.hypot(p.x-n.x,p.z-n.z)<12);
 else if(action==='flee'||action==='alert'){
  const threat=b.threat,dx=n.x-(threat?.x??n.x-1),dz=n.z-(threat?.z??n.z),length=Math.hypot(dx,dz)||1;
  const candidates=data.points.filter(p=>Math.hypot(p.x-n.x,p.z-n.z)<32&&(!threat||Math.hypot(p.x-threat.x,p.z-threat.z)>Math.hypot(dx,dz)+4));
  target=candidates.sort((a,c)=>Math.hypot(a.x-n.x,a.z-n.z)-Math.hypot(c.x-n.x,c.z-n.z))[0]||__v88SafeNear(data.site,n.x+dx/length*15,n.z+dz/length*15,20);
  if(action==='alert')for(const other of __v88Life.active)if(other!==n&&Math.hypot(other.x-n.x,other.z-n.z)<12){const friend=__v98NPCBrain(other);friend.threat={...b.threat};friend.dangerUntil=now+5;friend.until=0;}
 }else if(action==='greet')target={x:n.x,z:n.z};
 else if(action==='socialise'||action==='trade'){
  partner=__v88Life.active.filter(o=>o!==n&&o.site===n.site&&o.age===n.age&&o.__v98Active&&__v98NPCBrain(o).dangerUntil<=now&&Math.hypot(o.x-n.x,o.z-n.z)<18).sort((a,c)=>Math.hypot(a.x-n.x,a.z-n.z)-Math.hypot(c.x-n.x,c.z-n.z))[0];
  target=partner?__v88SafeNear(data.site,partner.x+1.8,partner.z,5):null;if(!target)action='patrol';
 }
 if(!target){const points=data.points.filter(p=>Math.hypot(p.x-n.x,p.z-n.z)<24);target=points[Math.abs(Math.floor((n.phase||0)*29+now/7))%Math.max(1,points.length)]||{x:n.x,z:n.z};}
 if(b.action===action&&b.target&&Math.hypot(b.target.x-target.x,b.target.z-target.z)<1.5&&b.blocked<1.2)return;
 b.action=action;b.partner=partner;b.target={x:target.x,z:target.z,action:__v98NPCLabels[action]};b.until=now+(action==='alert'?1.1:action==='greet'?2.5:6+Math.abs(n.phase||0)%5);b.route=[];b.index=0;n.goal=b.target;n.activity=__v98NPCLabels[action];n.shelterMode=night?'sleep':weather?'rain':'day';n.nav=[];n.navIndex=0;
 b.route=_6a(n,b.target);n.nav=b.route;
}
function __v98NPCPose(n,b,moving,dt){
 __v88Pose(n,__v98AI.clock,moving,b.action==='flee'?1.3:1);
 if(moving)return;const t=__v98AI.clock,action=b.action;
 if(n.book)n.book.visible=action==='read'||action==='pray';if(n.broom)n.broom.visible=action==='sweep';if(n.workTool)n.workTool.visible=action==='work';if(n.parcel)n.parcel.visible=action==='trade';
 if(action==='rest'||action==='read')for(const l of n.legs||[])l.rotation.x=-.85;
 if(action==='sleep'){n.g.rotation.z=Math.PI/2;n.g.position.y=n.homeY+.6;}
 for(const [i,arm] of (n.arms||[]).entries())arm.rotation.x=action==='greet'||action==='alert'?-.9+Math.sin(t*5)*.3:action==='cook'||action==='work'?-.7+Math.sin(t*4+i)*.3:action==='sweep'?-.7+Math.sin(t*3)*.4:action==='read'||action==='pray'?-.9:action==='trade'?-.8:action==='socialise'?-.3+Math.sin(t*2+i)*.2:0;
 if(action==='greet')n.g.rotation.y=Math.atan2(n.x-_14.x,n.z-_14.z);else if(b.partner)n.g.rotation.y=Math.atan2(n.x-b.partner.x,n.z-b.partner.z);
 if(n.mouth)n.mouth.scale.y=['socialise','trade','greet','alert'].includes(action)?.65+Math.max(0,Math.sin(t*9+(n.phase||0)))*.85:.65;
 if(action==='play')n.g.position.y+=Math.max(0,Math.sin(t*5+(n.phase||0)))*.16;
}
function __v98NPCTick(dt){
 if(!_u||_74())return;const now=__v98AI.clock;let plans=0;
 const list=__v88Life.active;__v98AI.npcCursor=((__v98AI.npcCursor||0)+3)%Math.max(1,list.length);
 for(let i=0;i<list.length;i++){const n=list[(i+__v98AI.npcCursor)%list.length];if(n.__v88Dead||n.__v88Controlled||!n.__v98Active)continue;const b=__v98NPCBrain(n);b.energy=_18(b.energy+dt*(b.action==='rest'||b.action==='sleep'?.07:-.004),0,1);
  b.social=_18(b.social+dt*(b.action==='socialise'||b.action==='trade'||b.action==='greet'?.04:-.002),0,1);b.curiosity=_18(b.curiosity+dt*(b.action==='read'?.05:-.001),0,1);
  if(n.__v99Area){__v99InteriorTick(n,b,dt);continue;}
  if(now>=b.next&&plans<3){b.next=now+.5+(Math.abs(n.phase||0)%1)*.15;__v98NPCDecision(n,b);plans++;}
  if(!b.target)continue;
  const distance=Math.hypot(n.x-b.target.x,n.z-b.target.z);let moving=false;
  if(distance>.65){const point=n.nav?.[n.navIndex]||( __v95.pending.get(n)&&!__v95.pending.get(n).done?null:b.route[b.index]);
   if(point){if(Math.hypot(n.x-point.x,n.z-point.z)<.35){n.navIndex++;b.index=n.navIndex;}else{const beforeX=n.x,beforeZ=n.z;__v88Move(n,point,b.action==='flee'||b.action==='alert'?4.6:n.age==='child'?2.7:1.9,dt,__v88Life.active);moving=Math.hypot(n.x-beforeX,n.z-beforeZ)>.001;b.blocked=moving?0:b.blocked+dt;}}
   else if(!__v95.pending.get(n)||__v95.pending.get(n).done)b.blocked+=dt;
   if(b.blocked>1.2){b.until=0;b.next=0;b.target=null;b.blocked=0;b.route=[];n.nav=[];n.goal=null;}
  }
  if(distance<=.65&&now-b.lastWork>8){if(b.action==='work')b.stock.craft=Math.min(6,b.stock.craft+1);if(b.action==='cook'&&b.stock.grain>0){b.stock.grain--;b.energy=Math.min(1,b.energy+.2);}b.lastWork=now;}
  if(distance<=.65&&b.action==='trade'&&b.partner&&Math.hypot(n.x-b.partner.x,n.z-b.partner.z)<3&&now-b.lastTrade>12){const other=__v98NPCBrain(b.partner);if(b.stock.craft>0&&other.stock.grain>0){b.stock.craft--;other.stock.craft++;other.stock.grain--;b.stock.grain++;b.lastTrade=other.lastTrade=now;}}
  __v98NPCPose(n,b,moving,dt);n.activity=__v98NPCLabels[b.action];
 }
}
const __v98NPCFrame=_hr;_hr=function(dt){const r=__v98NPCFrame(dt);__v98NPCTick(dt);return r;};
function __v98Escape(n,target,dt,neighbors){
 const b=__v98NPCBrain(n),now=__v98AI.clock;b.action='flee';
 if(!b.escapeTarget||Math.hypot(target.x-b.escapeTarget.x,target.z-b.escapeTarget.z)>2){b.escapeTarget={...target};n.goal={...target,action:'Refugio seguro'};n.nav=_6a(n,n.goal);n.navIndex=0;}
 const point=n.nav?.[n.navIndex];
 if(point){if(Math.hypot(point.x-n.x,point.z-n.z)<.35)n.navIndex++;else __v88Move(n,point,n.age==='child'?5:4.2,dt,neighbors);}
 else if((!__v95.pending.get(n)||__v95.pending.get(n).done)&&(!b.escapeAt||now>b.escapeAt+1)){b.escapeAt=now;n.goal={...target,action:'Refugio seguro'};n.nav=_6a(n,n.goal);n.navIndex=0;}
}
const __v98CivilianBrains=__v88Brains;
__v88Brains=function(dt){const r=__v98CivilianBrains(dt);if(!_u||_74())return r;
 for(const n of __v88Life.active){if(n.__v98Active||n.__v88Controlled||n.__v88Dead)continue;const b=__v98NPCBrain(n),activity=n.activity||'';
  b.action=/peligro|refugio del/.test(activity)?'flee':/Dorm|dorm/.test(activity)?'sleep':/refugio|techo/.test(activity)?'shelter':/Convers|vecino/.test(activity)?'socialise':/Vend|mercanc|puesto|comerci/.test(activity)?'trade':/Leye|Estudi/.test(activity)?'read':/Barri/.test(activity)?'sweep':/Cocin/.test(activity)?'cook':/Juga/.test(activity)?'play':/Reza|santuario/.test(activity)?'pray':/Descans|trono/.test(activity)?'rest':/Aran|Cosech|artesan/.test(activity)?'work':'patrol';
  if(b.action!=='flee')b.escapeTarget=null;
  if(b.action==='patrol'&&Math.hypot(n.x-_14.x,n.z-_14.z)<5&&__v98AI.clock-b.lastGreet>30){b.lastGreet=__v98AI.clock;b.greetUntil=__v98AI.clock+2;}
  if(b.greetUntil>__v98AI.clock){b.action='greet';if(n.arms?.[0])n.arms[0].rotation.x=-1+Math.sin(__v98AI.clock*5)*.2;if(n.mouth)n.mouth.scale.y=.6+Math.max(0,Math.sin(__v98AI.clock*8))*.5;}
 }return r;};
const __v98World=_bj;_bj=function(...args){__v98AI.enemy=new WeakMap();__v98AI.npc=new WeakMap();__v98AI.grid.clear();__v98AI.reservations.clear();__v98AI.near=[];__v98AI.clock=0;__v98AI.nextSense=0;__v98AI.player=null;const r=__v98World(...args);for(const n of _2h){n.__v98Active=!!n.__v88Added&&!n.__v88Temporary;__v98NPCBrain(n);}return r;};
// Dialogue lips animate even while the simulation is paused by the dialogue panel.
let __v98MouthFrame=0,__v98Speaker=null;
function __v98DialogueMouth(){if(__v98Speaker?.mouth)__v98Speaker.mouth.scale.y=.65;__v98Speaker=null;
 if(!$('dialogue').hidden&&_2i?.mouth&&!document.hidden){__v98Speaker=_2i;_2i.mouth.scale.y=.6+Math.max(0,Math.sin(performance.now()*.012))*.9;__v98MouthFrame=requestAnimationFrame(__v98DialogueMouth);}else __v98MouthFrame=0;}
new MutationObserver(()=>{if(!__v98MouthFrame&&!$('dialogue').hidden)__v98DialogueMouth();}).observe($('dialogue'),{attributes:true,attributeFilter:['hidden']});
window.__AURELIA_AI98__={audit:()=>({enemyBehaviors:[...__v98EnemyActions],npcBehaviors:[...__v98NPCActions],activeEnemies:__v98AI.near.length,decisions:__v98AI.decisions,lastDecisionMs:__v98AI.lastMs,decisionBudgetMs:__v60Mobile?.85:1.5,npcs:_2h.length,residents:_2h.filter(n=>n.__v98Active).length,damageMultiplier:1})};
