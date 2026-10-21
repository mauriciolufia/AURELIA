/* Daily indoor life: destinations, meals and seated poses run through the real frame loop. */
const __v100Day={furniture:[],seats:new Map(),jobs:new Map(),context:null,clock:0,nextId:0,pathMs:0};
const __v100Tasks={
 stretch:{label:'Estirándose al despertar',legacy:'play'},wash:{label:'Lavándose las manos',legacy:'work'},
 eat:{label:'Comiendo sentado',legacy:'cook'},walk:{label:'Caminando dentro de casa',legacy:'patrol'},
 work:{label:'Trabajando',legacy:'work'},serve:{label:'Atendiendo a los viajeros',legacy:'trade'},
 tidy:{label:'Ordenando sus cosas',legacy:'work'},sweep:{label:'Barriendo la casa',legacy:'sweep'},
 cook:{label:'Preparando la comida',legacy:'cook'},read:{label:'Leyendo',legacy:'read'},
 sit:{label:'Sentado descansando',legacy:'rest'},talk:{label:'Conversando',legacy:'socialise'},
 inspect:{label:'Revisando la casa',legacy:'patrol'},pray:{label:'Rezando',legacy:'pray'},
 sleep:{label:'Preparándose para dormir',legacy:'sleep'}
};
const __v100Schedule=[[0,'sleep'],[6,'stretch'],[7,'wash'],[8,'eat'],[9,'work'],[10,'serve'],[11,'sweep'],[12,'cook'],[13,'eat'],[14,'inspect'],[15,'read'],[16,'sit'],[17,'talk'],[18,'walk'],[19,'tidy'],[20,'pray'],[21,'eat'],[22,'sleep']];
function __v100Furniture(g,x,z,type,w=0,d=0,angle=0){
 g.updateWorldMatrix(true,false);const p=g.localToWorld(new _0.Vector3(x,0,z)),q=g.getWorldQuaternion(new _0.Quaternion()),direction=new _0.Vector3(Math.sin(angle),0,Math.cos(angle)).applyQuaternion(q),a=Math.atan2(direction.x,direction.z);
 __v100Day.furniture.push({id:__v100Day.nextId++,x:p.x,z:p.z,y:p.y,type,w,d,angle:a,cos:Math.cos(a),sin:Math.sin(a),context:__v100Day.context});
}
// Record semantic furniture before immutable scenery is merged; no duplicate scene searches per frame.
const __v100Chair=__v53Chair;__v53Chair=function(g,x,z,pal,angle=0){const facing=angle+Math.PI;__v100Furniture(g,x,z,'seat',.86,.82,facing);return __v100Chair(g,x,z,pal,facing);};
const __v100Bench=__v53Bench;__v53Bench=function(g,x,z,pal,angle=0,w=2.8){for(const dx of[-w*.28,w*.28])__v100Furniture(g,x+dx*Math.cos(angle),z-dx*Math.sin(angle),'seat',.8,.82,angle);return __v100Bench(...arguments);};
const __v100Dining=__v53Dining;__v53Dining=function(){const previous=__v100Day.context;__v100Day.context='dining';try{return __v100Dining(...arguments);}finally{__v100Day.context=previous;}};
const __v100Desk=__v53Desk;__v53Desk=function(){const previous=__v100Day.context;__v100Day.context='desk';try{return __v100Desk(...arguments);}finally{__v100Day.context=previous;}};
const __v100Table=__v29Table;__v29Table=function(g,x,z,w,d){__v100Furniture(g,x,z,'table',w,d);return __v100Table(...arguments);};
const __v100Kitchen=__v29Kitchen;__v29Kitchen=function(g,x,z){__v100Furniture(g,x,z,'kitchen',5.3,1.5);return __v100Kitchen(...arguments);};
const __v100Bed=__v29Bed;__v29Bed=function(g,x,z,pal,w=3.7,d=5.1){__v100Furniture(g,x,z,'bed',w,d);return __v100Bed(...arguments);};
const __v100Shelf=__v29Shelf;__v29Shelf=function(g,x,z,pal,w=2.1){__v100Furniture(g,x,z,'shelf',w,1.0);return __v100Shelf(...arguments);};
function __v100Room(n){
 const a=n.__v99Area;if(!a)return null;if(a.daily100)return a.daily100;
 const items=__v100Day.furniture.filter(p=>{const dx=p.x-a.x,dz=p.z-a.z,pad=(p.w+p.d)/2;return Math.abs(p.y-a.y)<.65&&Math.abs(dx*a.cos-dz*a.sin)<=a.w+pad&&Math.abs(dx*a.sin+dz*a.cos)<=a.d+pad;});
 return a.daily100={items,obstacles:items.filter(p=>p.type!=='seat'),claims:new Map()};
}
function __v100Free(n,x,z){
 const a=n.__v99Area;if(!__v99Inside(a,x,z))return false;
 // The legacy floor selector reads the observer's height. Scope this synchronous
 // query to the NPC's floor and always restore the observer before any movement/render.
 const observerY=_14.y;let y;try{_14.y=a.y+1.85;y=_ei(x,z);}finally{_14.y=observerY;}
 if(!Number.isFinite(y)||Math.abs(y-a.y)>=.45||_i7(x,z,a.y+1.85))return false;
 for(const p of __v100Room(n).obstacles){const dx=x-p.x,dz=z-p.z;if(Math.abs(dx*p.cos-dz*p.sin)<p.w/2+.24&&Math.abs(dx*p.sin+dz*p.cos)<p.d/2+.24)return false;}return true;
}
function __v100Segment(n,p,q){const count=Math.max(1,Math.ceil(Math.hypot(q.x-p.x,q.z-p.z)/.2));for(let i=1;i<=count;i++)if(!__v100Free(n,p.x+(q.x-p.x)*i/count,p.z+(q.z-p.z)*i/count))return false;return true;}
function __v100Brain(n){
 const b=__v98NPCBrain(n);if(!b.day100)b.day100={action:'walk',phase:'new',route:[],index:0,target:null,next:0,until:0,blocked:0,traveled:0,serial:0,completed:new Set(),lastHour:null,seat:null,mealCount:0,waitSince:0};return b.day100;
}
function __v100Release(n,s){if(s.seat&&__v100Day.seats.get(s.seat.id)===n)__v100Day.seats.delete(s.seat.id);s.seat=null;__v100Day.jobs.delete(n);}
function __v100Nearby(n,s,min=1.4,max=3.1){
 for(let radius=min;radius<=max;radius+=.55)for(let i=0;i<12;i++){
  const angle=(i/12+(n.phase||0)+s.serial*.17)*Math.PI*2,p={x:n.x+Math.cos(angle)*radius,z:n.z+Math.sin(angle)*radius};
  if(__v100Free(n,p.x,p.z)&&__v100Segment(n,n,p))return p;
 }
 // Narrow spaces still permit short steps; the old minimum stride could trap a character in a corner.
 if(min>.5)return __v100Nearby(n,s,.45,1.35);return null;
}
function __v100Destination(n,s,action){
 const room=__v100Room(n),a=n.__v99Area;
 if(action==='talk'){
  const partner=__v88Life.active.filter(o=>o!==n&&!o.__v88Dead&&Math.abs(o.homeY-n.homeY)<1&&__v99Inside(a,o.x,o.z)&&Math.hypot(o.x-n.x,o.z-n.z)<12).sort((p,q)=>Math.hypot(p.x-n.x,p.z-n.z)-Math.hypot(q.x-n.x,q.z-n.z))[0];
  if(partner){for(const side of[-1,1]){const p={x:partner.x+side*1.1,z:partner.z};if(__v100Free(n,p.x,p.z)){__v98NPCBrain(n).partner=partner;return p;}}}
 }
 if(['eat','sit','read','sleep'].includes(action)){
  const seats=room.items.filter(p=>p.type==='seat'&&(!__v100Day.seats.has(p.id)||__v100Day.seats.get(p.id)===n)&&__v100Free(n,p.x,p.z));
  seats.sort((p,q)=>(action==='eat'?(p.context==='dining'?0:30)-(q.context==='dining'?0:30):0)+Math.hypot(p.x-n.x,p.z-n.z)-Math.hypot(q.x-n.x,q.z-n.z));
  if(seats.length){s.seat=seats[0];__v100Day.seats.set(s.seat.id,n);return{x:s.seat.x,z:s.seat.z};}
 }
 const wanted=['cook','wash'].includes(action)?'kitchen':['work','serve','tidy'].includes(action)?'table':action==='inspect'?'shelf':null;
 if(wanted){const items=room.items.filter(p=>p.type===wanted).sort((p,q)=>Math.hypot(p.x-n.x,p.z-n.z)-Math.hypot(q.x-n.x,q.z-n.z));
  for(const p of items)for(const side of[1,-1]){const point={x:p.x+side*p.sin*(p.d/2+.85),z:p.z+side*p.cos*(p.d/2+.85)};if(__v100Free(n,point.x,point.z))return point;}
 }
 // Legacy destination selection; life101 replaces this with owned furniture stations.
 const nearby=__v100Nearby(n,s);if(nearby)return nearby;
 for(let i=0;i<20;i++){const angle=(i/20+s.serial*.13)*Math.PI*2,r=Math.min(a.w,a.d)*.6,p={x:a.x+Math.cos(angle)*r,z:a.z+Math.sin(angle)*r};if(__v100Free(n,p.x,p.z))return p;}
 return null;
}
function* __v100Path(n,target){
 const a=n.__v99Area,step=.65,start={x:n.x,z:n.z},sx=Math.round((start.x-a.x)/step),sz=Math.round((start.z-a.z)/step),tx=Math.round((target.x-a.x)/step),tz=Math.round((target.z-a.z)/step),key=(x,z)=>x+','+z,point=(x,z)=>({x:a.x+x*step,z:a.z+z*step}),open=[],cost=new Map(),came=new Map(),points=new Map(),closed=new Set(),free=new Map();
 const valid=(x,z)=>{const k=key(x,z);if(!free.has(k)){const p=point(x,z);free.set(k,__v100Free(n,p.x,p.z));}return free.get(k);};
 const push=(p,f)=>{let i=open.length;open.push({p,f});while(i){const j=(i-1)>>1;if(open[j].f<=f)break;[open[i],open[j]]=[open[j],open[i]];i=j;}};
 const pop=()=>{const first=open[0],last=open.pop();if(open.length){open[0]=last;let i=0;for(;;){let j=i,l=i*2+1,r=l+1;if(l<open.length&&open[l].f<open[j].f)j=l;if(r<open.length&&open[r].f<open[j].f)j=r;if(j===i)break;[open[i],open[j]]=[open[j],open[i]];i=j;}}return first.p;};
 for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){const x=sx+dx,z=sz+dz,p=point(x,z),k=key(x,z);if(valid(x,z)&&__v100Segment(n,start,p)){cost.set(k,Math.hypot(p.x-start.x,p.z-start.z));came.set(k,null);points.set(k,p);push({x,z,k},Math.hypot(x-tx,z-tz));}yield;}
 for(let count=0;open.length&&count<1800;count++){
  const current=pop();if(closed.has(current.k))continue;closed.add(current.k);const p=points.get(current.k);
  if(Math.hypot(p.x-target.x,p.z-target.z)<1.05&&__v100Segment(n,p,target)){
   const route=[{...target}];for(let k=current.k;k!==null;k=came.get(k))route.push(points.get(k));route.reverse();return route;
  }
  for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){
   const x=current.x+dx,z=current.z+dz,k=key(x,z),q=point(x,z),g=cost.get(current.k)+(dx&&dz?Math.SQRT2:1);
   if(!closed.has(k)&&g<(cost.get(k)??Infinity)&&valid(x,z)&&__v100Segment(n,p,q)){cost.set(k,g);came.set(k,current.k);points.set(k,q);push({x,z,k},g+Math.hypot(x-tx,z-tz));}yield;
  }
 }return [];
}
function __v100Start(n,s,action){
 __v100Release(n,s);__v98NPCBrain(n).partner=null;s.action=action;s.serial++;s.phase='travel';s.index=0;s.route=[];s.target=__v100Destination(n,s,action);s.blocked=0;s.waitSince=__v98AI.clock;
 if(s.target){if(__v100Segment(n,n,s.target))s.route=[s.target];else __v100Day.jobs.set(n,{generator:__v100Path(n,s.target),state:s});}
 if(!s.target){s.action='stretch';s.phase='perform';s.until=__v98AI.clock+1.5;}
}
function __v100AdvanceJobs(){
 const begin=performance.now(),budget=__v60Mobile?.7:1.3,jobs=[...__v100Day.jobs].sort((a,b)=>Math.hypot(a[0].x-_14.x,a[0].z-_14.z)-Math.hypot(b[0].x-_14.x,b[0].z-_14.z));
 for(const[n,job]of jobs){if(n.__v88Dead||n.__v88Controlled||Math.hypot(n.x-_14.x,n.z-_14.z)>155){__v100Day.jobs.delete(n);continue;}
  for(let steps=0;steps<256;steps++){const next=job.generator.next();if(next.done){job.state.route=next.value;job.state.index=0;__v100Day.jobs.delete(n);if(!next.value.length){__v100Release(n,job.state);job.state.phase='new';job.state.next=__v98AI.clock+.2;}break;}if(performance.now()-begin>=budget)break;}
  if(performance.now()-begin>=budget)break;
 }__v100Day.pathMs=performance.now()-begin;
}
function __v100Choose(n,s){
 let hourAction='sleep';for(const[hour,action]of __v100Schedule)if(_x>=hour)hourAction=action;
 const key=Math.floor(_x);let action=hourAction;
 if(s.lastHour===key){const options=['walk','sit','read','sweep','eat','inspect','talk','work','wash','tidy','cook','stretch','serve','pray','sleep'];action=options[(s.serial+Math.floor(Math.abs(n.phase||0)*3))%options.length];}
 s.lastHour=key;return action;
}
const __v100Props={box:new _2.BoxGeometry(1,1,1),ball:new _2.SphereGeometry(1,12,8),up:new _0.Vector3(0,1,0),direction:new _0.Vector3()};
function __v100Limb(mesh,a,b){const d=__v100Props.direction.set(b.x-a.x,b.y-a.y,b.z-a.z),length=d.length();mesh.position.set((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2);mesh.scale.set(.17,length,.17);mesh.quaternion.setFromUnitVectors(__v100Props.up,d.normalize());}
function __v100Part(parent,kind,color,x,y,z,w,h,d){const m=new _0.Mesh(__v100Props[kind],__v88Mat(color));m.position.set(x,y,z);m.scale.set(w,h,d);parent.add(m);return m;}
function __v100Equip(n){
 if(n.__v100Props)return n.__v100Props;const root=new _0.Group();root.userData.animated=true;n.g.add(root);
 const stool=new _0.Group(),legs=new _0.Group(),food=new _0.Group(),wash=new _0.Group(),mealArms=new _0.Group();root.add(stool,legs,food,wash,mealArms);
 for(const part of[stool,legs,food,wash,mealArms])part.visible=false;

 for(const x of[-.19,.19]){__v100Part(legs,'box','#443a32',x,1.02,-.31,.19,.2,.69);__v100Part(legs,'box','#443a32',x,.75,-.59,.19,.55,.23);__v100Part(legs,'box','#3b3028',x,.48,-.65,.22,.16,.38);}
 __v100Part(food,'ball','#eee0c7',0,1.58,-.47,.29,.12,.23);for(const x of[-.1,.02,.13])__v100Part(food,'ball','#dba65d',x,1.69,-.47,.085,.065,.085);
 const spoon=__v100Part(food,'box','#b8c5cf',.3,1.85,-.43,.045,.3,.045);__v100Part(wash,'ball','#8bdcec',-.15,1.2,-.4,.055,.055,.055);__v100Part(wash,'ball','#8bdcec',.15,1.25,-.42,.045,.045,.045);
 const originalHands=n.g.children.filter(m=>m.isMesh&&Math.abs(Math.abs(m.position.x)-.43)<.02&&Math.abs(m.position.y-.9)<.04),armRig=[];
 for(let i=0;i<2;i++){const upper=new _0.Mesh(__v100Props.box,n.arms[i].material),lower=new _0.Mesh(__v100Props.box,n.arms[i].material),hand=new _0.Mesh(__v100Props.ball,originalHands[i]?.material||__v88Mat('#d8b596'));hand.scale.setScalar(.07);mealArms.add(upper,lower,hand);armRig.push({upper,lower,hand});}
 return n.__v100Props={root,stool,legs,food,wash,spoon,mealArms,armRig,originalHands};
}
function __v100Pose(n,b,s,moving,dt){
 __v98NPCPose(n,b,moving,dt);const props=__v100Equip(n),t=__v98AI.clock+(n.phase||0),perform=s.phase==='perform',seated=perform&&!!s.seat&&['eat','sit','read'].includes(s.action);
 props.stool.visible=seated&&!s.seat;props.legs.visible=seated;props.food.visible=perform&&s.action==='eat';props.wash.visible=perform&&s.action==='wash';
 props.mealArms.visible=props.food.visible;for(const arm of n.arms||[])arm.visible=!props.food.visible;for(const hand of props.originalHands)hand.visible=!props.food.visible;
 for(const leg of n.legs||[])leg.visible=!seated;
 if(moving){n.g.position.y+=Math.abs(Math.sin(t*8))*.025;return;}
 if(seated){n.g.rotation.x=n.g.rotation.z=0;n.g.position.y=n.homeY+.66-1.05*(n.scale||1)+Math.sin(t*2)*.012;if(s.seat)n.g.rotation.y=s.seat.angle;}
 if(!perform)return;
 if(s.action==='eat'){props.spoon.position.y=1.82+Math.sin(t*3)*.27;props.spoon.rotation.x=Math.sin(t*3)*.65;
  for(const[i,rig]of props.armRig.entries()){const side=i?1:-1,shoulder={x:side*.43,y:1.76,z:0},elbow={x:side*.45,y:1.30,z:-.18},hand={x:i?.3:-.25,y:i?props.spoon.position.y-.12:1.57,z:-.43};__v100Limb(rig.upper,shoulder,elbow);__v100Limb(rig.lower,elbow,hand);rig.hand.position.set(hand.x,hand.y,hand.z);}
  if(n.mouth)n.mouth.scale.y=.65+Math.abs(Math.sin(t*6))*.6;}
 if(s.action==='wash')for(const[i,arm]of(n.arms||[]).entries())arm.rotation.x=-.85+Math.sin(t*5+i)*.18;
 if(s.action==='stretch')for(const[i,arm]of(n.arms||[]).entries()){arm.rotation.x=-2.2+Math.sin(t*2)*.3;arm.rotation.z=(i?1:-1)*.3;}
 if(s.action==='sit')for(const[i,arm]of(n.arms||[]).entries())arm.rotation.x=-.35+Math.sin(t*1.8+i)*.08;

}
function __v100Tick(n,b,dt){
 const s=__v100Brain(n),now=__v98AI.clock;n.__v100Day=s;
 // Closest characters start walking immediately, without waiting for a room-wide graph.
 if(s.phase==='new'&&now>=s.next)__v100Start(n,s,s.serial?__v100Choose(n,s):'walk');
 if(s.phase==='perform'&&now>=s.until){s.completed.add(s.action);if(s.action==='eat'){s.mealCount++;b.energy=Math.min(1,b.energy+.3);}__v100Start(n,s,__v100Choose(n,s));}
 let moving=false;const point=s.route[s.index];
 if(s.phase==='travel'&&point){const distance=Math.hypot(point.x-n.x,point.z-n.z);if(distance<.07)s.index++;else{
  const step=Math.min(distance,(n.age==='child'?1.7:1.85)*Math.min(.05,Math.max(0,dt))),x=n.x+(point.x-n.x)/distance*step,z=n.z+(point.z-n.z)/distance*step;
  const occupied=__v88Life.active.some(o=>o!==n&&!o.__v88Dead&&Math.abs(o.homeY-n.homeY)<1&&Math.hypot(o.x-x,o.z-z)<.6&&Math.hypot(o.x-x,o.z-z)<Math.hypot(o.x-n.x,o.z-n.z));
  if(!occupied&&__v100Segment(n,n,{x,z})){s.traveled+=Math.hypot(x-n.x,z-n.z);n.x=x;n.z=z;moving=true;s.blocked=0;const angle=Math.atan2(n.x-point.x,n.z-point.z);n.g.rotation.y+=Math.atan2(Math.sin(angle-n.g.rotation.y),Math.cos(angle-n.g.rotation.y))*(1-Math.exp(-14*dt));}else s.blocked+=dt;
 }}
 if(s.phase==='travel'&&s.target&&Math.hypot(n.x-s.target.x,n.z-s.target.z)<.13&&!__v100Day.jobs.has(n)){s.phase='perform';s.until=now+(s.action==='walk'||s.action==='inspect'?1:4.5);}
 if(s.blocked>.8||s.phase==='travel'&&now-s.waitSince>18){__v100Start(n,s,'walk');}
 const task=__v100Tasks[s.action];b.action=task.legacy;n.activity=s.phase==='travel'?'Caminando · '+task.label:task.label;n.sleeping=false;n.__v88Moving=moving;n.goal=s.target?{...s.target,action:task.label}:null;
 __v100Pose(n,b,s,moving,dt);
}
// Use this controller at the same dispatch point as the old indoor controller.
__v99InteriorTick=__v100Tick;
function __v100Register(){
 __v100Day.jobs.clear();__v100Day.seats.clear();for(const n of _2h){if(!n.__v99Area)continue;
  n.__v99Area.daily100=null;__v100Room(n);const s=__v100Brain(n);__v100Release(n,s);s.phase='new';s.next=0;s.route=[];s.index=0;s.serial=0;s.lastHour=null;
  // Free space must include the furniture footprint, not just the building's walls.
  if(!__v100Free(n,n.x,n.z)){let found=null;for(let r=.4;r<5&&!found;r+=.4)for(let i=0;i<20;i++){const p={x:n.x+Math.cos(i*Math.PI/10)*r,z:n.z+Math.sin(i*Math.PI/10)*r};if(__v100Free(n,p.x,p.z)){found=p;break;}}if(found){n.x=found.x;n.z=found.z;n.g.position.set(n.x,n.homeY,n.z);}}
  n.__v100Day=s;if(n.__v100Props){for(const part of[n.__v100Props.stool,n.__v100Props.legs,n.__v100Props.food,n.__v100Props.wash,n.__v100Props.mealArms])part.visible=false;for(const hand of n.__v100Props.originalHands)hand.visible=true;}
  for(const arm of n.arms||[])arm.visible=true;
  for(const leg of n.legs||[])leg.visible=true;n.g.position.set(n.x,n.homeY,n.z);n.g.rotation.x=n.g.rotation.z=0;
  n.g.traverse(o=>{o.matrixAutoUpdate=true;o.matrixWorldAutoUpdate=true;});
 }
}
const __v100Build=_bj;_bj=function(...args){__v100Day.furniture=[];__v100Day.jobs.clear();__v100Day.seats.clear();__v100Day.nextId=0;const r=__v100Build(...args);__v100Register();return r;};
const __v100Load=_dn;_dn=function(...args){const r=__v100Load(...args);__v100Register();return r;};
const __v100Frame=_hr;_hr=function(dt){const r=__v100Frame(dt);if(_u&&!_74())__v100AdvanceJobs();return r;};
window.__AURELIA_DAY100__={audit:()=>({routines:Object.entries(__v100Tasks).map(([id,t])=>({id,label:t.label})),indoorNPCs:_2h.filter(n=>n.__v100Day).length,pendingRoutes:__v100Day.jobs.size,pathMs:__v100Day.pathMs,seatsReserved:__v100Day.seats.size,nearby:__v88Life.active.filter(n=>n.__v100Day).map(n=>({id:n.id,activity:n.activity,phase:n.__v100Day.phase,traveled:n.__v100Day.traveled,meals:n.__v100Day.mealCount}))})};
