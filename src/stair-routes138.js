/* Stair endpoints follow the room route, including the floor and ceiling openings. */
function __v138Flight(index,lowerP=30,upperP=30){
 const p=(lowerP+upperP)/2;
 return index%2?{x:0,z0:-p-9,z1:-p+9}:{x:p,z0:-9,z1:9};
}
__v94Flight=function(t,index){return __v138Flight(index,t===__v102Solar&&index===0?36:30,30);};
__v92MayaStairs=function(lower,upper){
 const def=__v138Flight(0),root=new _0.Group(),mat=__v92MayaMat('floor');root.name='Escalera al final del recorrido maya';_8.add(root);
 for(let i=0;i<36;i++){const p=__v83Point(lower,[def.x,def.z0+(i+.5)/36*(def.z1-def.z0)]),h=(i+1)/3,m=new _0.Mesh(__v92Assets.box,mat);m.scale.set(3.6,h,.52);m.position.set(p.x,lower.y+h/2,p.z);root.add(m);}
 __v92Maya.stairs={...def,y0:lower.y,y1:upper.y,w:1.8,root};lower.groups.push(root);
};
const __v138MazePlan=__v95Plan;
__v95Plan=function(a,index,count){
 const plan=__v138MazePlan(a,index,count);
 if(a.__v92Maya){const def=__v138Flight(0);plan.stairs=[{...def,lower:'maya92-0',upper:'maya92-1',incoming:index===1}];plan.holes=index?[__v94Hole(def)]:[];plan.roofHoles=index?[]:[__v94Hole(def)];}
 return plan;
};
const __v138MazeBuild=__v95Rebuild;
__v95Rebuild=function(a,index,...args){
 const result=__v138MazeBuild(a,index,...args),st=a.plan95.stairs.find(s=>s.incoming);
 if(st)a.entry={...__v83Point(a,[st.x,st.z1+2.2]),y:a.y};
 return result;
};
function __v138Hole(center){const[x,z]=center;return[[x+2.75,z-9.1],[x+7.25,z-9.1],[x+7.25,z+9.1],[x+2.75,z+9.1]];}
const __v138Staircase=__v88Staircase;
__v88Staircase=function(lower,upper,room){const st=__v138Staircase(lower,upper,room);upper.entry={...st.end,y:upper.y};return st;};
const __v138KeepClear=__v102KeepClear;
__v102KeepClear=function(a,x,z,r=4){
 if(!__v138KeepClear(a,x,z,r))return false;
 const p=__v83Point(a,[x,z]);
 return !__v88Eclipse.stairs.some(st=>{
  if(st.lower!==a&&st.upper!==a)return false;
  const points=st.segments.flatMap(f=>[[f.x0,f.z0],[f.x1,f.z1]]),xs=points.map(p=>p[0]),zs=points.map(p=>p[1]);
  return p.x>Math.min(...xs)-r-3&&p.x<Math.max(...xs)+r+3&&p.z>Math.min(...zs)-r-3&&p.z<Math.max(...zs)+r+3;
 });
};
function __v138Roof(d,outgoing){
 // Incoming stair openings belong in the floor; only the outgoing stair pierces the roof.
 d.roofPolygons85=[{outer:[[d.bounds[0],d.bounds[1]],[d.bounds[2],d.bounds[1]],[d.bounds[2],d.bounds[3]],[d.bounds[0],d.bounds[3]]],holes:[]}];
 d.roofOpenings85=[];d.stairRoof125=[];
 if(outgoing!==null)__v125RoofOpening(d,outgoing);
}
const __v138CloneBase=__v125Clone;
__v88ClonePlan=function(level){
 const d=__v138CloneBase(level);
 if(level===2){d.stairArrival138=[0,0];__v138Roof(d,5);}
 return d;
};
const __v138FloorHole=__v91FloorHole;
__v91FloorHole=function(a){return a.design.stairArrival138?__v138Hole(a.design.stairArrival138):__v138FloorHole(a);};
function __v138MirrorPlan(d){
 const sum=d.bounds[1]+d.bounds[3],point=p=>[p[0],sum-p[1]],axis=p=>[p[0],-p[1]],rect=r=>[r[0],sum-r[3],r[2],sum-r[1]];
 const polygons=items=>{for(const p of items||[]){p.outer=p.outer.map(point);p.holes=(p.holes||[]).map(h=>h.map(point));}};
 const item=o=>{
  if(o.center)o.center=point(o.center);if(o.treasure)o.treasure=point(o.treasure);if(o.point)o.point=point(o.point);
  if(o.axis)o.axis=axis(o.axis);if(o.pads)o.pads=o.pads.map(point);
  if(Number.isFinite(o.x)&&Number.isFinite(o.y))o.y=sum-o.y;
  if(o.shape86)polygons(o.shape86);if(o.polygons)polygons(o.polygons);if(o.wall)item(o.wall);
 };
 d.centers=d.centers.map(point);d.mapRoute88=d.mapRoute88.map(point);
 if(d.rects)d.rects=d.rects.map(rect);
 for(const key of ['polygons','originalPolygons85'])polygons(d[key]);
 for(const key of ['walls','constructionWalls85','originalWalls85'])if(d[key])d[key]=d[key].map(l=>[l[0],sum-l[1],l[2],sum-l[3]]);
 for(const fill of d.room_fills)fill.polygon=fill.polygon.map(point);
 for(const key of ['doorways','addedDoors85','trap_info','addedTraps85','arrowTraps85','guardPositions86','reinforcements86','secretRooms85'])for(const o of d[key]||[])item(o);
 for(const key of Object.keys(d.markers))d.markers[key]=d.markers[key].map(point);
 for(const values of Object.values(d.props))if(Array.isArray(values))for(const o of values)if(typeof o==='object')item(o);
 if(d.bossExit86)item(d.bossExit86);
 d.mirror138=true;return d;
}
const __v138Gate=__v83Gate;
__v83Gate=function(a,center,axis,width,kind,id,...args){
 if(a.design.mirror138&&id==='imperial-seal')center=[center[0],a.design.bounds[1]+a.design.bounds[3]-center[1]];
 return __v138Gate(a,center,axis,width,kind,id,...args);
};
// Keep the six-hall topology, textures and throne. Mirroring alternate upper floors
// lets the previous exit meet room zero while the boss remains in room five.
__v92SequentialBuild=function(){
 const result=__v125Sequential(),source=__v88Eclipse.areas[2];if(!source)return result;__v125.floors=[];
 for(let level=3;level<6;level++){
  const d=JSON.parse(JSON.stringify(source.design)),lower=__v88Eclipse.areas[level-1],incoming=[...lower.design.centers[5]],sum=d.bounds[1]+d.bounds[3];
  if(level%2)__v138MirrorPlan(d);
  d.key='eclipse-floor-'+level;d.floor88=level;d.stairEntryRoom125=0;d.stairArrival138=incoming;d.name='Trono del Eclipse · Planta '+(level+1);d.stairHoles88=[__v138Hole(incoming)];
  d.floor=['#615b78','#655773','#535970'][level-3];d.accent=['#987d9d','#9c748e','#7f86a0'][level-3];d.colors={...d.colors,floor:d.floor,accent:d.accent};
  for(const f of d.room_fills)f.color=new _0.Color(f.color).lerp(new _0.Color(d.floor),.28).getStyle();
  __v138Roof(d,level<5?5:null);
  for(const s of d.secretRooms85){s.id=s.id.replace(/eclipse(?:92|-floor-2)/g,d.key);delete s.legendary87;}
  for(const t of d.arrowTraps85||[])if(t.id)t.id=d.key+'-'+t.id;
  const a=__v88GrandFloor(d);a.__v92Regions=source.__v92Regions.map(r=>level%2?[r[0],sum-r[3],r[2],sum-r[1]]:[...r]);a.design.rects=a.__v92Regions;
  __v88RaiseArea(a);a.boss=source.boss;__v88Eclipse.areas.push(a);__v125.floors.push(a);
  const positions=d.guardPositions86;for(let i=0;i<24;i++){const p=__v83Point(a,positions[i%positions.length].center);p.y=a.y;__v88SpawnAbyss(a,p,i);}
  const st=__v88Staircase(lower,a,5);a.entry={...st.end,y:a.y};
 }
 const final=__v88Eclipse.areas[5],boss=source.boss;
 source.members=source.members.filter(c=>c!==boss);__v83Relocate(boss,final,{...__v83Point(final,final.design.markers.J[0]),y:final.y},5);final.members.push(boss);boss.__v88FinalFloor=5;__v91Remember(boss);
 __v86BuildExit(final);__v83IndexDoors();_22();__v75.grid.clear();for(const o of __v75.objects)__v75Index(o);__v91RepairAll();__v86NavCache.clear();__v68Local.source=null;
 return result;
};
window.__AURELIA_ROUTES138__={audit:()=>({eclipse:__v88Eclipse.areas.map(a=>({key:a.key,floor:a.floor88,mirrored:!!a.design.mirror138,entry:a.entry,rooms:a.design.main})),stairs:__v88Eclipse.stairs.map(s=>({lower:s.lower.key,upper:s.upper.key,room:s.room,start:s.start,end:s.end})),maze:__v95Maze.areas.map(a=>({key:a.key,stairs:a.plan95.stairs,entry:a.entry,bossRoom:6}))})};
