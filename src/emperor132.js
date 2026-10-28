/* Bounded, incremental navigation only when the Emperor's local steering loses progress. */
const __v132={plans:0,completed:0,failed:0,maxExpanded:0,lastFailure:null};
function __v132Reset(e){e.nav132=null;e.route132=[];e.watch132=null;e.navRetry132=0;}
const __v132Setup=__v94EmperorSetup;
__v94EmperorSetup=function(...args){const r=__v132Setup(...args);__v132Reset(__v94Emperor);return r;};
const __v132Clear=__v94EmperorClear;
__v94EmperorClear=function(...args){const r=__v132Clear(...args);__v132Reset(__v94Emperor);return r;};
function __v132Plan(e,c){
 const start={x:c.g.position.x,z:c.g.position.z},goal={...e.goal125};
 const first={ix:0,iz:0,x:start.x,z:start.z,g:0,f:Math.hypot(start.x-goal.x,start.z-goal.z),parent:null};
 e.nav132={start,goal,open:[first],nodes:new Map([['0,0',first]]),closed:new Set(),blocked:new Map(),expanded:0};
 e.route132=[];__v132.plans++;
}
function __v132Search(e,c){
 const nav=e.nav132;if(!nav)return;
 const began=performance.now(),limit=__v60Mobile?.7:1.2,r=e.room,area=e.area,cell=3;
 let expanded=0;
 const free=(ix,iz)=>{
  const key=ix+','+iz;if(nav.blocked.has(key))return !nav.blocked.get(key);
  const x=nav.start.x+ix*cell,z=nav.start.z+iz*cell,p=__v83Local(area,x,z);
  const blocked=p[0]<r[0]+3||p[0]>r[2]-3||p[1]<r[1]+3||p[1]>r[3]-3||__v91Blocked(c,x,z,area.y);
  nav.blocked.set(key,blocked);return !blocked;
 };
 while(nav.open.length&&expanded<16&&(expanded===0||performance.now()-began<limit)){
  let best=0;for(let i=1;i<nav.open.length;i++)if(nav.open[i].f<nav.open[best].f)best=i;
  const node=nav.open.splice(best,1)[0],key=node.ix+','+node.iz;
  if(nav.closed.has(key))continue;nav.closed.add(key);expanded++;nav.expanded++;
  const distance=Math.hypot(node.x-nav.goal.x,node.z-nav.goal.z);
  if(distance<4&&__v91SegmentClear(c,{x:node.x,y:area.y,z:node.z},{...nav.goal,y:area.y})){
   const path=[nav.goal];for(let n=node;n.parent;n=n.parent)path.unshift({x:n.x,z:n.z});
   // The search may span several frames; join the route from the current safe position.
   let join=-1;for(let i=0;i<Math.min(path.length,6);i++)if(__v91SegmentClear(c,c.g.position,{...path[i],y:area.y}))join=i;
   if(join>=0){e.route132=path.slice(join);__v132.completed++;}
   else{__v132.failed++;__v132.lastFailure={reason:'join',expanded:nav.expanded,start:nav.start,goal:nav.goal,position:{x:c.g.position.x,z:c.g.position.z}};e.navRetry132=.5;}
   e.nav132=null;e.watch132=null;return;
  }
  for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){
   const ix=node.ix+dx,iz=node.iz+dz,k=ix+','+iz;
   if(nav.closed.has(k)||!free(ix,iz)||(dx&&dz&&(!free(ix,node.iz)||!free(node.ix,iz))))continue;
   const x=nav.start.x+ix*cell,z=nav.start.z+iz*cell,g=node.g+Math.hypot(dx,dz)*cell,old=nav.nodes.get(k);
   if(old&&old.g<=g)continue;
   if(!__v91SegmentClear(c,{x:node.x,y:area.y,z:node.z},{x,y:area.y,z}))continue;
   const next=old||{ix,iz,x,z};Object.assign(next,{g,f:g+Math.hypot(x-nav.goal.x,z-nav.goal.z),parent:node});
   if(!old){nav.nodes.set(k,next);nav.open.push(next);}
  }
 }
 __v132.maxExpanded=Math.max(__v132.maxExpanded,expanded);
 if(!nav.open.length||nav.expanded>=900){__v132.lastFailure={reason:nav.open.length?'budget':'unreachable',expanded:nav.expanded,start:nav.start,goal:nav.goal,goalBlocked:__v91Blocked(c,nav.goal.x,nav.goal.z,area.y)};e.nav132=null;e.navRetry132=1;e.move125=0;e.watch132=null;__v132.failed++;}
}
function __v132Goal(e,c,dt){
 e.navRetry132=Math.max(0,(e.navRetry132||0)-dt);
 const p=c.g.position;
 if(e.nav132)__v132Search(e,c);
 const route=e.route132||[];
 while(route.length&&Math.hypot(p.x-route[0].x,p.z-route[0].z)<1)route.shift();
 let goal=route[0]||e.goal125;
 const distance=Math.hypot(p.x-goal.x,p.z-goal.z);
 let watch=e.watch132;
 if(!watch||Math.hypot(watch.goal.x-goal.x,watch.goal.z-goal.z)>4){watch=e.watch132={x:p.x,z:p.z,goal:{...goal},distance,time:0};}
 watch.time+=dt;
 const progress=watch.distance-distance,travel=Math.hypot(p.x-watch.x,p.z-watch.z);
 if(watch.time>=1.2){
  if(!e.nav132&&!e.navRetry132&&(travel<1.3||progress<.7)){
   __v132Plan(e,c);e.watch132=null;
  }else if(progress>=.7)e.watch132=null;
 }
 return goal;
}
window.__AURELIA_EMPEROR132__={audit:()=>({...__v132,routeLength:__v94Emperor.route132?.length||0,searching:!!__v94Emperor.nav132,movementRequiresAttackSlot:false})};
