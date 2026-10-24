/* Personal space uses a live spatial hash, including a deterministic escape from exact overlap. */
const __v114Crowd={grid:new Map(),tick:-1,source:null,count:0,members:new Set(),moved:0,spawnRepairs:0,checks:0};
function __v114CrowdPut(n){
 const c=__v114Crowd,ix=Math.floor(n.x/3),iz=Math.floor(n.z/3);
 if(n.__v114CrowdGrid===c.grid&&n.__v114CrowdIX===ix&&n.__v114CrowdIZ===iz)return;
 const key=ix+','+iz;
 if(n.__v114CrowdGrid===c.grid)c.grid.get(n.__v114CrowdKey)?.delete(n);
 let cell=c.grid.get(key);if(!cell)c.grid.set(key,cell=new Set());cell.add(n);n.__v114CrowdGrid=c.grid;n.__v114CrowdKey=key;n.__v114CrowdIX=ix;n.__v114CrowdIZ=iz;
}
function __v114CrowdIndex(){const c=__v114Crowd;if(c.tick===_10&&c.source===_2h&&c.count===_2h.length)return;c.tick=_10;if(c.source!==_2h||c.count!==_2h.length){c.source=_2h;c.count=_2h.length;c.grid=new Map();c.members=new Set();}for(const n of _2h)if(!n.__v88Dead&&Number.isFinite(n.x+n.z+n.homeY)){c.members.add(n);__v114CrowdPut(n);}}
function __v114Neighbors(n,x=n.x,z=n.z){__v114CrowdIndex();const result=[];for(let ix=Math.floor((x-2)/3);ix<=Math.floor((x+2)/3);ix++)for(let iz=Math.floor((z-2)/3);iz<=Math.floor((z+2)/3);iz++)for(const o of __v114Crowd.grid.get(ix+','+iz)||[])if(o!==n&&!o.__v88Dead&&Math.abs(o.homeY-n.homeY)<.65)result.push(o);return result;}
function __v114Gap(n,o){return n.__v100Day?.station||o.__v100Day?.station?.furniture?.type==='seat'?.78:n.age==='child'&&o.age==='child'?1:1.2;}
function __v114NPCBlocked(n,x,z){
 __v114Crowd.checks++;for(const o of __v114Neighbors(n,x,z)){const gap=__v114Gap(n,o),after=Math.hypot(o.x-x,o.z-z),before=Math.hypot(o.x-n.x,o.z-n.z);if(after<gap&&after<before-.0001)return true;}return false;
}
function __v114GoalFree(n,p,gap=1.3){return !__v114Neighbors(n,p.x,p.z).some(o=>Math.abs(o.homeY-p.y)<.65&&(Math.hypot(o.x-p.x,o.z-p.z)<gap||o.__v100Day?.target&&Math.abs(o.__v100Day.target.y-p.y)<.65&&Math.hypot(o.__v100Day.target.x-p.x,o.__v100Day.target.z-p.z)<gap));}
function __v114MoveNPC(n,p){n.x=p.x;n.z=p.z;n.homeY=p.y;n.g.position.set(p.x,p.y,p.z);__v114CrowdPut(n);}
function __v114Separate(n,dt,initial=false){
 if(!n.__v101||n.__v88Dead||n.__v88Controlled||n.sleeping||n.__v100Day?.phase==='perform'&&n.__v100Day.station)return;
 const neighbors=__v114Neighbors(n),tooClose=neighbors.filter(o=>Math.hypot(o.x-n.x,o.z-n.z)<__v114Gap(n,o)-.02);if(!tooClose.length)return;
 const h=n.__v101.home,inside=__v101Inside(h,n,.2)&&Math.abs(n.homeY-h.y)<.65;
 let dx=0,dz=0;for(const o of tooClose){let x=n.x-o.x,z=n.z-o.z,d=Math.hypot(x,z);if(d<.001){const key=[String(n.id),String(o.id)].sort().join(':'),hash=Array.from(key).reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7),angle=hash%6283/1000,sign=String(n.id)<String(o.id)?1:-1;x=Math.cos(angle)*sign;z=Math.sin(angle)*sign;d=1;}dx+=x/d;dz+=z/d;}
 const angle=Math.atan2(dx,dz),radii=initial?[1.25,1.7,2.3,3,4,5.5,7,9]:[Math.min(.14,Math.max(.015,dt*3))];
 for(const radius of radii)for(const turn of[0,.6,-.6,1.2,-1.2,Math.PI/2,-Math.PI/2,Math.PI]){
  const p={x:n.x+Math.sin(angle+turn)*radius,z:n.z+Math.cos(angle+turn)*radius};p.y=__v101Ground(n,p.x,p.z,n.homeY,true);if(p.y===null||inside&&!__v101Inside(h,p,.55))continue;
  if(initial){if(!__v114GoalFree(n,p,1.18))continue;}else if(__v114NPCBlocked(n,p.x,p.z))continue;
  if(__v101Segment(n,{x:n.x,z:n.z,y:n.homeY},p,true)===null)continue;__v114MoveNPC(n,p);__v114Crowd.moved++;if(initial)__v114Crowd.spawnRepairs++;return;
 }
}
const __v114Destination=__v100Destination;__v100Destination=function(n,s,action){
 const p=__v114Destination(n,s,action);if(!p||s.station||__v114GoalFree(n,p))return p;
 const h=n.__v101.home;for(let i=0;i<32;i++){const angle=(i/16+(n.phase||0))*Math.PI*2,r=1.4+Math.floor(i/16)*1.2,q={x:p.x+Math.cos(angle)*r,z:p.z+Math.sin(angle)*r};q.y=__v101Ground(n,q.x,q.z,p.y);if(q.y===null||!__v114GoalFree(n,q))continue;
  if(s.zone==='home'&&(!__v101Inside(h,q,.55)||Math.abs(q.y-h.y)>.65)||s.zone==='outside'&&!__v101Outdoors(n,q)||s.zone==='court102'&&(__v102CourtPrivate(q)||n.__v102Court&&Math.hypot(q.x-n.__v102Court.anchor.x,q.z-n.__v102Court.anchor.z)>8))continue;return q;
 }return p;
};
const __v114NPCTick=__v99InteriorTick;__v99InteriorTick=function(n,b,dt){const r=__v114NPCTick(n,b,dt);__v114CrowdPut(n);__v114Separate(n,dt);return r;};
function __v114Spread(){__v114Crowd.tick=-1;__v114CrowdIndex();for(let pass=0;pass<3;pass++)for(const n of _2h)__v114Separate(n,.05,true);}
window.__AURELIA_CROWD114__={audit:()=>({personalSpace:1.2,childSpace:1,stationSpace:.78,spawnRepairs:__v114Crowd.spawnRepairs,separationMoves:__v114Crowd.moved,neighborChecks:__v114Crowd.checks})};
