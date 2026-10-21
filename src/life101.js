/* Location-aware daily life. All destinations refer to permanent world furniture. */
const __v101Life={homes:[],castleHomes:[],doors:[],doorActors:[],doorSenseAt:-1,grid:new Map(),floorGrid:new Map(),buildingHome:null,ready:false,reports:[],repairs:0};
const __v101Recorded=__v100Furniture;
__v100Furniture=function(...args){if(!Number.isFinite(args[4]+args[5]))return;__v101Recorded(...args);const p=__v100Day.furniture.at(-1);if(__v101Life.buildingHome)p.home=__v101Life.buildingHome;};
// Include solid furnishings that the earlier table/bed-only audit missed.
for(const[name,w,d]of[['__v29Dresser',2.3,.9],['__v29Nightstand',1,.86],['__v29Armor',2.4,.6],['__v29Weapons',2.8,.4],['__v29Cauldron',2.2,2.2],['__v53Chest',1.55,.9],['__v53Barrel',1.04,1.04],['__v53Fireplace',3.5,.95],['__v53Display',3.5,1.12],['__v53CoatRack',.9,.9],['__v53Plant',1.1,1.1]]){
 const original=eval(name),wrapped=function(g,x,z,...rest){__v100Furniture(g,x,z,'solid',w,d,['__v53Chest','__v53Fireplace'].includes(name)&&typeof rest[1]==='number'?rest[1]:0);return original(g,x,z,...rest);};
 // These bindings live inside the standalone game, rather than on window.
 if(name==='__v29Dresser')__v29Dresser=wrapped;else if(name==='__v29Nightstand')__v29Nightstand=wrapped;else if(name==='__v29Armor')__v29Armor=wrapped;else if(name==='__v29Weapons')__v29Weapons=wrapped;else if(name==='__v29Cauldron')__v29Cauldron=wrapped;else if(name==='__v53Chest')__v53Chest=wrapped;else if(name==='__v53Barrel')__v53Barrel=wrapped;else if(name==='__v53Fireplace')__v53Fireplace=wrapped;else if(name==='__v53Display')__v53Display=wrapped;else if(name==='__v53CoatRack')__v53CoatRack=wrapped;else __v53Plant=wrapped;
}
function __v101Inside(h,p,pad=0){const c=Math.cos(h.angle||0),s=Math.sin(h.angle||0),dx=p.x-h.x,dz=p.z-h.z;return Math.abs(dx*c-dz*s)<=h.w/2-pad&&Math.abs(dx*s+dz*c)<=h.d/2-pad;}
function __v101World(h,x,z){return __v24World(h.x,h.z,h.angle||0,x,z);}
function __v101Collider(p,height=1.1){_q.push({x:p.x,z:p.z,w:Math.abs(p.cos)*p.w/2+Math.abs(p.sin)*p.d/2,d:Math.abs(p.sin)*p.w/2+Math.abs(p.cos)*p.d/2,hx:p.w/2,hz:p.d/2,cs:p.cos,sn:p.sin,bottom:p.y,top:p.y+height,tag:'fixed-furniture101'});}
function __v101CastleWing(s,index,g){
 const pal=__v29Palette(_1h[__v20NearestTown(s)]||s),wallMat=__v88Mat('#b9ad9b');
 function wall(x,z,w,d){box(w,3.5,d,wallMat,x,1.75,z,g);_q.push({x:s.x+x,z:s.z+z,w:w/2,d:d/2,bottom:s.level,top:s.level+3.5,tag:'bedroom-divider101'});}
 for(const z of[-4,7,21,32])for(const x of[-69,-62,-55,-41,-34,-27]){
  const h={id:'castle-'+index+'-'+x+'-'+z,x:s.x+x,z:s.z+z,y:s.level+.12,w:6,d:8,angle:0,city:s.name,type:'bedroom',castle:index,items:[],members:[],door:{x:s.x+x,z:s.z+z+4,y:s.level+.12}};
  __v101Life.castleHomes.push(h);wall(x-3,z,.16,8);wall(x+3,z,.16,8);wall(x,z-4,6,.16);wall(x-2.05,z+4,1.9,.16);wall(x+2.05,z+4,1.9,.16);
  const room=__v53Group(g,x,z);room.position.y=.12;room.name='Dormitorio fijo · '+h.id;const pivot=__v29Door(room,0,4,2.2,3.2,pal,1),door=__v29Doors.find(d=>d.pivot===pivot);if(door){door.__v101Slide=true;door.slide=0;door.baseY=pivot.position.y;door.open=Math.PI/2;__v101Life.doors.push(door);}
  __v101Life.buildingHome=h;const start=__v100Day.furniture.length;
  for(const dx of[-1.7,1.7])__v29Bed(room,dx,-1.8,pal,1.45,3.4);
  __v53Dining(room,0,2,pal,4,1.3,1.5);
  __v101Life.buildingHome=null;h.items=__v100Day.furniture.slice(start);
  for(const p of h.items)if(p.type!=='seat')__v101Collider(p,p.type==='bed'?.6:1.1);
 }
}
function __v101Index(){
 __v101Life.floorGrid.clear();
 const add=(x,z,r,item)=>{for(let ix=Math.floor((x-r)/8);ix<=Math.floor((x+r)/8);ix++)for(let iz=Math.floor((z-r)/8);iz<=Math.floor((z+r)/8);iz++){const k=ix+','+iz;if(!__v101Life.floorGrid.has(k))__v101Life.floorGrid.set(k,[]);__v101Life.floorGrid.get(k).push(item);}};
 for(const h of __v101Life.homes)add(h.x,h.z,Math.hypot(h.w,h.d)/2,{home:h,y:h.castle?h.y:h.y+.14});
 for(const r of _43)if(r.label!=='Salón de banquetes')add(r.x,r.z,Math.hypot(r.w,r.d)/2,{home:{...r,angle:0},y:r.y+.12});
 for(const st of _45)add(st.x,(st.z0+st.z1)/2,Math.abs(st.z0-st.z1)/2+st.w,{royalStair:st});
 for(const st of __v24Stairs)add((st.x0+st.x1)/2,(st.z0+st.z1)/2,Math.hypot(st.x1-st.x0,st.z1-st.z0)/2+st.w,{stair:st});
 __v101Life.grid.clear();for(const p of __v100Day.furniture){if(!Number.isFinite(p.x+p.z+p.y+p.w+p.d))continue;const r=Math.hypot(p.w,p.d)/2+.6;for(let x=Math.floor((p.x-r)/8);x<=Math.floor((p.x+r)/8);x++)for(let z=Math.floor((p.z-r)/8);z<=Math.floor((p.z+r)/8);z++){const k=x+','+z;if(!__v101Life.grid.has(k))__v101Life.grid.set(k,[]);__v101Life.grid.get(k).push(p);}}
}
function __v101Floor(x,z,feet){
 const nearby=__v101Life.floorGrid.get(Math.floor(x/8)+','+Math.floor(z/8))||[];
 for(const f of nearby){const st=f.royalStair;if(!st||Math.abs(x-st.x)>st.w/2||z>st.z0||z<st.z1)continue;
  const sy=st.y0+Math.ceil((st.z0-z)/(st.z0-st.z1)*st.steps)*(st.y1-st.y0)/st.steps;let y=Math.max(st.y0+.12,sy);for(const p of nearby)if(p.home&&__v101Inside(p.home,{x,z})&&Math.abs(p.y-sy)<.85)y=Math.max(y,p.y);if(Math.abs(y-feet)<.85)return y;
 }
 const stair=nearby.some(({stair:s})=>{if(!s)return false;const dx=s.x1-s.x0,dz=s.z1-s.z0,t=((x-s.x0)*dx+(z-s.z0)*dz)/(dx*dx+dz*dz);return t>=0&&t<=1&&Math.hypot(x-s.x0-dx*t,z-s.z0-dz*t)<s.w+.4;});
 if(!stair)for(const f of nearby)if(f.home&&Math.abs(feet-f.y)<.8&&__v101Inside(f.home,{x,z},.05))return f.y;
 const oldY=_14.y;try{_14.y=feet+1.85;return _ei(x,z);}finally{_14.y=oldY;}}
function __v101Ground(n,x,z,feet=n.homeY,doors=false,ignoreOpenDoors=false){
 if(!Number.isFinite(x+z+feet))return null;const y=__v101Floor(x,z,feet);if(!Number.isFinite(y)||Math.abs(y-feet)>.85)return null;
 if(_23(x,z,y+1.85)||(__v73DoorGrid.get(Math.floor(x/32)+','+Math.floor(z/32))||[]).some(d=>(doors||!ignoreOpenDoors&&Math.abs(d.angle)>.75)&&__v73Hit(d.shape,x,z,y+1.85))||(_i4.get(Math.floor(x/32)+','+Math.floor(z/32))||[]).some(d=>_i6(d,x,z,y+1.85)))return null;
 for(const p of __v101Life.grid.get(Math.floor(x/8)+','+Math.floor(z/8))||[]){if(p.type==='seat'||Math.abs(p.y-y)>.8)continue;const dx=x-p.x,dz=z-p.z;if(Math.abs(dx*p.cos-dz*p.sin)<p.w/2+.24&&Math.abs(dx*p.sin+dz*p.cos)<p.d/2+.24)return null;}return y;
}
const __v101OldFree=__v100Free;
__v100Free=function(n,x,z){if(!n.__v101)return __v101OldFree(n,x,z);return __v99Inside(n.__v99Area,x,z)&&__v101Ground(n,x,z)!==null;};
// Continuous clearance prevents sparse path samples from missing rounded furniture corners.
function __v101SweptHit(c,p,q,feet,r=.38){
 if(feet+1.85<=(c.bottom??_2r(c.x,c.z))-.05||feet+.1>=(c.top??_2r(c.x,c.z)+8))return false;
 const cs=c.cs??1,sn=c.sn??0,ax=cs*(p.x-c.x)-sn*(p.z-c.z),az=sn*(p.x-c.x)+cs*(p.z-c.z),bx=cs*(q.x-c.x)-sn*(q.z-c.z),bz=sn*(q.x-c.x)+cs*(q.z-c.z),dx=bx-ax,dz=bz-az,length=dx*dx+dz*dz;
 const distance=(x,z)=>{const t=length?Math.max(0,Math.min(1,((x-ax)*dx+(z-az)*dz)/length)):0;return (ax+dx*t-x)**2+(az+dz*t-z)**2;};
 if(c.w===undefined)return distance(0,0)<((c.r||0)+r)**2;
 const hx=c.hx??c.w,hz=c.hz??c.d;let lo=0,hi=1;
 for(const[a,d,h]of[[ax,dx,hx],[az,dz,hz]]){if(Math.abs(d)<1e-10){if(Math.abs(a)>h){lo=2;break;}}else{let t0=(-h-a)/d,t1=(h-a)/d;if(t0>t1)[t0,t1]=[t1,t0];lo=Math.max(lo,t0);hi=Math.min(hi,t1);}}
 if(lo<=hi)return true;
 const endpoint=(x,z)=>Math.max(0,Math.abs(x)-hx)**2+Math.max(0,Math.abs(z)-hz)**2;
 let closest=Math.min(endpoint(ax,az),endpoint(bx,bz));for(const x of[-hx,hx])for(const z of[-hz,hz])closest=Math.min(closest,distance(x,z));return closest<r*r-1e-9;
}
function __v101Segment(n,p,q,doors=false,ignoreOpenDoors=false){if(!Number.isFinite(p.x+p.z+q.x+q.z+(p.y??n.homeY)))return null;let y=p.y??n.homeY;const startY=y,count=Math.max(1,Math.ceil(Math.hypot(q.x-p.x,q.z-p.z)/.18));for(let i=1;i<=count;i++){const x=p.x+(q.x-p.x)*i/count,z=p.z+(q.z-p.z)*i/count,next=__v101Ground(n,x,z,y,doors,ignoreOpenDoors);if(next===null)return null;y=next;}if(q.y!==undefined&&Math.abs(y-q.y)>.85)return null;
 if(Math.abs(y-startY)<.4){const seen=new Set();for(let ix=Math.floor((Math.min(p.x,q.x)-.4)/32);ix<=Math.floor((Math.max(p.x,q.x)+.4)/32);ix++)for(let iz=Math.floor((Math.min(p.z,q.z)-.4)/32);iz<=Math.floor((Math.max(p.z,q.z)+.4)/32);iz++)for(const c of _1j.get(ix+','+iz)||[]){if(seen.has(c))continue;seen.add(c);if(__v101SweptHit(c,p,q,Math.min(startY,y)))return null;}}
 return y;
}
function __v101Depart(n,p){for(let i=0;i<16;i++){const angle=i*Math.PI/8;if(__v101Segment(n,p,{x:p.x+Math.cos(angle)*.65,z:p.z+Math.sin(angle)*.65,y:p.y})!==null)return true;}return false;}
const __v101OldSegment=__v100Segment;
__v100Segment=function(n,p,q){if(!n.__v101)return __v101OldSegment(n,p,q);return __v101Segment(n,p===n?{x:n.x,z:n.z,y:n.homeY}:p,q)!==null;};
const __v102OldNearby=__v100Nearby;
__v100Nearby=function(n,s,...args){const target=__v102OldNearby(n,s,...args);if(target||!n.__v101)return target;const p={x:n.x,z:n.z,y:n.homeY};for(let i=0;i<16;i++){const angle=i*Math.PI/8,q={x:p.x+Math.cos(angle)*.65,z:p.z+Math.sin(angle)*.65,y:p.y};if(__v100Free(n,q.x,q.z)&&__v101Segment(n,p,q)!==null)return q;}return null;};
// Placement is permanent, validates every footprint, keeps entries and stairs clear.
function __v101AddFurniture(h,type,count){
 const g=new _0.Group();g.position.set(h.x,h.y,h.z);g.rotation.y=h.angle||0;g.name='Mobiliario fijo de '+h.city+' · '+h.type;_8.add(g);const pal=__v29Palette(_1h.find(s=>s.name===h.city)||_1h[1]);let placed=0;
 const w=type==='bed'?1.65:3.8,d=type==='bed'?3.7:3.6;
 for(let z=-h.d/2+d/2+1;z<h.d/2-d/2-1&&placed<count;z+=.65)for(let x=-h.w/2+w/2+1;x<h.w/2-w/2-1&&placed<count;x+=.65){
  if(Math.abs(x)<3&&z>h.d/2-8)continue;const p=__v101World(h,x,z),r={x:p.x,z:p.z,y:h.y,w,d,cos:Math.cos(h.angle||0),sin:Math.sin(h.angle||0)};
  if(h.items.some(o=>Math.abs(o.y-h.y)<.8&&Math.abs((o.x-p.x)*r.cos-(o.z-p.z)*r.sin)<(w+Math.abs(o.cos*r.cos+o.sin*r.sin)*o.w+Math.abs(o.sin*r.cos-o.cos*r.sin)*o.d)/2+1.1&&Math.abs((o.x-p.x)*r.sin+(o.z-p.z)*r.cos)<(d+Math.abs(o.sin*r.cos-o.cos*r.sin)*o.w+Math.abs(o.cos*r.cos+o.sin*r.sin)*o.d)/2+1.1))continue;
  if(__v24Stairs.some(st=>{if(Math.abs(st.y0-h.y)>1)return false;const dx=st.x1-st.x0,dz=st.z1-st.z0,t=Math.max(0,Math.min(1,((p.x-st.x0)*dx+(p.z-st.z0)*dz)/(dx*dx+dz*dz)));return Math.hypot(p.x-st.x0-dx*t,p.z-st.z0-dz*t)<st.w+Math.hypot(w,d)/2+.8;}))continue;
  if(_23(p.x,p.z,h.y+1.85))continue;
  const begin=__v100Day.furniture.length;__v101Life.buildingHome=h;
  if(type==='bed')__v29Bed(g,x,z,pal,1.65,3.7);else __v53Dining(g,x,z,pal,4,2.4,1.5);
  __v101Life.buildingHome=null;for(const item of __v100Day.furniture.slice(begin)){h.items.push(item);if(item.type!=='seat')__v101Collider(item,item.type==='bed'?.6:1.1);}placed++;
 }
 if(g.children.length)__v93Batch(g);else g.removeFromParent();return placed;
}
function __v101Station(n,p){
 const h=n.__v101.home;if(!p||p.home!==h)return null;
 if(p.type==='seat'){const table=h.items.find(t=>t.type==='table'&&t.context==='dining'&&Math.abs(t.y-p.y)<.3&&Math.hypot(t.x-p.x,t.z-p.z)<Math.hypot(t.w,t.d)/2+1);if(!table)return null;const y=__v101Ground(n,p.x,p.z,p.y+.14);if(y===null)return null;return{x:p.x,z:p.z,y,furniture:p,table};}
 if(p.type==='bed')for(const side of[-1,1])for(const dz of[0,-p.d*.2,p.d*.2]){const dx=side*(p.w/2+.64),x=p.x+dx*p.cos+dz*p.sin,z=p.z-dx*p.sin+dz*p.cos,y=__v101Ground(n,x,z,p.y+.14);if(y!==null)return{x,z,y,furniture:p};}
 if(p.type==='bed')for(const side of[1,-1]){const dz=side*(p.d/2+.64),x=p.x+dz*p.sin,z=p.z+dz*p.cos,y=__v101Ground(n,x,z,p.y+.14);if(y!==null)return{x,z,y,furniture:p};}return null;
}
function __v101Assign(){
 __v101Life.homes=_1i.filter(h=>h.type!=='church').map((h,i)=>Object.assign(h,{id:'home-'+i,items:[],members:[],door:{...__v101World(h,0,h.d/2),y:h.y+.14}})).concat(__v101Life.castleHomes);
 for(const p of __v100Day.furniture){if(!p.home){const h=__v101Life.homes.filter(h=>__v101Inside(h,p)&&p.y>=h.y-.3&&p.y<h.y+20).sort((a,b)=>a.w*a.d-b.w*b.d)[0];if(h){p.home=h;h.items.push(p);}}}
 // The old plan reserved the entire dining set as a solid block, including chairs.
 // Replace only those furniture colliders with the actual immutable footprints.
 for(let i=_q.length-1;i>=0;i--)if(_q[i].kind==='furniture')_q.splice(i,1);
 for(const p of __v100Day.furniture)if(p.type!=='seat'&&!p.home?.castle)__v101Collider(p,p.type==='bed'?.65:p.type==='table'?1.05:2.7);
 _22();
 const available=__v101Life.homes.filter(h=>!h.castle),givers=new Set(_bp.map(q=>q.giver));
 for(const n of _2h){if(n.__v88Dead||n.__v88Controlled)continue;const site=_1h[n.homeSite??n.site];let h=available.includes(n.home)?n.home:null;
  const castle=__v101Life.castleHomes.filter(h=>h.castle===(n.homeSite??n.site));
  if(castle.length)h=castle.find(h=>h.members.length<2)||castle[0];
  if(!h){const candidates=available.filter(h=>!site||h.city===site.name);h=(candidates.length?candidates:available).slice().sort((a,b)=>Math.hypot(a.x-n.x,a.z-n.z)+a.members.length*10-(Math.hypot(b.x-n.x,b.z-n.z)+b.members.length*10))[0];}
  const origin={x:n.x,z:n.z,y:n.homeY},nav={x:(origin.x+h.x)/2,z:(origin.z+h.z)/2,w:Math.abs(origin.x-h.x)/2+125,d:Math.abs(origin.z-h.z)/2+125,cos:1,sin:0,y:n.homeY,house:false,anchor:origin};
  n.home=h;n.__v101={home:h,origin,nav,outdoor:false,bed:null,dining:null,giver:givers.has(n.id),outings:0,conversations:0,plays:new Set(),transitions:0};n.__v99Area=nav;n.__v98Active=true;n.nav=[];n.goal=null;h.members.push(n);
 }
 // Add missing dining rooms before bedrooms. Existing upper-floor beds remain intact.
 for(const h of __v101Life.homes){if(h.castle)continue;const dining=h.items.filter(p=>p.type==='seat'&&p.context==='dining'&&Math.abs(p.y-h.y)<.8);if(!dining.length)__v101AddFurniture(h,'dining',1);
  const beds=h.items.filter(p=>p.type==='bed'&&Math.abs(p.y-h.y)<.8);__v101AddFurniture(h,'bed',Math.max(1,h.members.length)-beds.length);
 }
 __v101Index();_22();const claimedBeds=new Set(),claimedSeats=new Set();__v101Life.reports=[];
 for(const h of __v101Life.homes){
  const beds=h.items.filter(p=>p.type==='bed'&&Math.abs(p.y-h.y)<.8),seats=h.items.filter(p=>p.type==='seat'&&p.context==='dining'&&Math.abs(p.y-h.y)<.8);
  for(const n of h.members){const a=n.__v101;for(const bed of beds){if(claimedBeds.has(bed.id))continue;const station=__v101Station(n,bed);if(station){a.bed=station;claimedBeds.add(bed.id);bed.owner=n.id;break;}}
   for(const seat of seats){if(claimedSeats.has(seat.id))continue;const station=__v101Station(n,seat);if(station){a.dining=station;claimedSeats.add(seat.id);break;}}
   // A table may be used in shifts; occupation is still exclusive at runtime.
   if(!a.dining)for(const seat of seats){const station=__v101Station(n,seat);if(station){a.dining=station;break;}}
  }
  __v101Life.reports.push({id:h.id,city:h.city,type:h.type,residents:h.members.length,beds:beds.length,diningSeats:seats.length,assignedBeds:h.members.filter(n=>n.__v101.bed).length});
 }
 __v101Life.ready=true;
 for(const n of _2h.filter(n=>n.__v101)){
  if(__v101Ground(n,n.x,n.z)===null||!__v101Depart(n,{x:n.x,z:n.z,y:n.homeY})){let found=null;for(let r=.4;r<=6&&!found;r+=.3)for(let i=0;i<24;i++){const x=n.x+Math.cos(i*Math.PI/12)*r,z=n.z+Math.sin(i*Math.PI/12)*r,y=__v101Ground(n,x,z);if(y!==null&&__v101Depart(n,{x,z,y})){found={x,z,y};break;}}if(!found)for(const p of [n.__v101.bed,n.__v101.dining])if(p&&__v101Ground(n,p.x,p.z,p.y)!==null&&__v101Depart(n,p)){found={x:p.x,z:p.z,y:p.y};break;}if(found){n.x=found.x;n.z=found.z;n.homeY=found.y;__v101Life.repairs++;}}
  const s=__v100Brain(n);__v100Release(n,s);Object.assign(s,{phase:'new',next:0,serial:0,route:[],index:0,action:'walk',lastHour:null,traveled:0,bed:null,seat:null,station:null,visit:0,blocked:0});n.__v100Day=s;n.g.position.set(n.x,n.homeY,n.z);
 }
}
function* __v101Path(n,target){
 const home=n.__v101.home,local=__v101Inside(home,n,.1)&&__v101Inside(home,target,.1),permitted=new Set([home,...__v101Life.homes.filter(h=>__v101Inside(h,n)&&Math.abs(n.homeY-h.y)<1)]);
 const privateRoom=(p,y)=>(__v101Life.floorGrid.get(Math.floor(p.x/8)+','+Math.floor(p.z/8))||[]).some(f=>f.home?.id&&!permitted.has(f.home)&&Math.abs(y-f.y)<.8&&__v101Inside(f.home,p,.1));
 const a=n.__v99Area,step=local?.4:1,start={x:n.x,z:n.z,y:n.homeY},sx=Math.round((start.x-a.x)/step),sz=Math.round((start.z-a.z)/step),open=[],cost=new Map(),came=new Map(),points=new Map(),closed=new Set();
 const point=(x,z)=>({x:a.x+x*step,z:a.z+z*step}),key=(x,z,y)=>x+','+z+','+Math.round(y*2),heuristic=p=>(Math.hypot(p.x-target.x,p.z-target.z)+Math.abs(p.y-target.y)*.7)*1.8;
 const push=(p,f)=>{let i=open.length;open.push({p,f});while(i){const j=(i-1)>>1;if(open[j].f<=f)break;[open[i],open[j]]=[open[j],open[i]];i=j;}};
 const pop=()=>{const first=open[0],last=open.pop();if(open.length){open[0]=last;let i=0;for(;;){let j=i,l=i*2+1,r=l+1;if(l<open.length&&open[l].f<open[j].f)j=l;if(r<open.length&&open[r].f<open[j].f)j=r;if(j===i)break;[open[i],open[j]]=[open[j],open[i]];i=j;}}return first.p;};
 for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){const x=sx+dx,z=sz+dz,p=point(x,z),y=__v101Segment(n,start,p);if(y!==null){p.y=y;const k=key(x,z,y);cost.set(k,Math.hypot(p.x-start.x,p.z-start.z));came.set(k,null);points.set(k,p);push({x,z,k},heuristic(p));}yield;}
 for(let count=0;open.length&&count<12000;count++){
  const current=pop();if(closed.has(current.k))continue;closed.add(current.k);const p=points.get(current.k);
  if(Math.hypot(p.x-target.x,p.z-target.z)<1.1&&Math.abs(p.y-target.y)<.85&&__v101Segment(n,p,target)!==null){const route=[{...target}];for(let k=current.k;k!==null;k=came.get(k))route.push(points.get(k));route.reverse();return route;}
  for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){
   const x=current.x+dx,z=current.z+dz,q=point(x,z);if(!__v99Inside(a,q.x,q.z)){yield;continue;}const y=__v101Segment(n,p,q);if(y!==null&&!privateRoom(q,y)){q.y=y;const k=key(x,z,y),g=cost.get(current.k)+Math.hypot(q.x-p.x,q.z-p.z)+Math.abs(y-p.y)*.2;
    if(!closed.has(k)&&g<(cost.get(k)??Infinity)){cost.set(k,g);came.set(k,current.k);points.set(k,q);push({x,z,k},g+heuristic(q));}
   }yield;
  }
 }return [];
}
__v100Path=__v101Path;
Object.assign(__v100Tasks,{sleep:{label:'Durmiendo en su cama',legacy:'sleep'},eat:{label:'Comiendo en la mesa de casa',legacy:'cook'},walk:{label:'Recorriendo el vecindario',legacy:'patrol'},greet:{label:'Saludando a los vecinos',legacy:'greet'},hopscotch:{label:'Jugando a la rayuela',legacy:'play'},skipping:{label:'Saltando y dando vueltas',legacy:'play'},tag:{label:'Jugando a las atrapadas',legacy:'play'},ball:{label:'Jugando con la pelota',legacy:'play'},hideSeek:{label:'Jugando al escondite',legacy:'play'}});
function __v101Outdoors(n,p={x:n.x,z:n.z,y:n.homeY}){return !__v101Life.homes.some(h=>__v101Inside(h,p,.1)&&Math.abs(p.y-h.y)<1)&&!_43.some(r=>Math.abs(p.y-r.y)<1&&Math.abs(p.x-r.x)<r.w/2&&Math.abs(p.z-r.z)<r.d/2);}
function __v101Choose(n,s){
 const h=Math.floor(_x),child=n.age==='child';if(s.previousHour!==undefined&&s.previousHour>h)s.day=(s.day||0)+1;s.previousHour=h;s.lastHour=h;
 if(h<6||h>=(n.__v101.home.castle?23:child?21:22))return n.__v101.bed?'sleep':'read';
 if([8,13,19].includes(h)&&s.mealSlot!==(s.day||0)+':'+h&&n.__v101.dining)return 'eat';
 const primary={6:'stretch',7:'wash',9:'work',10:'serve',11:'walk',12:'cook',14:'inspect',15:'talk',16:'walk',17:'talk',18:'sweep',20:'read',21:'tidy'}[h]||'tidy';
 const outdoors=h>=11&&h<=17&&h!==12&&h!==13,business=h>=9&&h<11&&(n.castleService||n.rank==='king'||n.rank==='noble');s.zone=business?'home':outdoors||!n.__v101.home.castle&&Math.hypot(n.x-n.__v101.home.x,n.z-n.__v101.home.z)>80&&h>=9&&h<18?'outside':'home';
 if(child&&outdoors){const games=['hopscotch','tag','ball','hideSeek','skipping'];return s.serial%3===0?'talk':games[(s.serial+h)%games.length];}
 if(h===20)return ['read','sit','pray','tidy'][s.serial%4];
 if(child&&[9,10].includes(h))return s.serial%2?'read':'tidy';
 if(s.serial%3===0)return outdoors?'talk':['walk','tidy','read','inspect'][Math.floor(s.serial/3)%4];return primary;
}
function __v101OutdoorGoal(n,s){
 const a=n.__v101,h=a.home,site=_1h[n.homeSite??n.site],far=!h.castle&&Math.hypot(n.x-h.x,n.z-h.z)>100&&__v101Outdoors(n,a.origin),base=far?a.origin:h.castle&&site?{x:site.x,z:site.z+100}:__v101World(h,0,h.d/2+6);
 const reference=far?a.origin.y:h.y+.14;
 for(let i=0;i<30;i++){const angle=(i/30+s.serial*.173+(n.phase||0))*Math.PI*2,r=4+(i%4)*2,p={x:base.x+Math.sin(angle)*r,z:base.z+Math.cos(angle)*r};p.y=__v101Ground(n,p.x,p.z,reference);if(p.y!==null&&__v101Outdoors(n,p))return p;}return null;
}
function __v101HomeGoal(n,s){
 const h=n.__v101.home;
 // Workers stay at their workplace during business hours, with free walking space.
 const center=(n.castleService||n.rank==='king'||n.rank==='noble')&&_x>=9&&_x<11?n.__v101.origin:h;
 for(let i=0;i<32;i++){const angle=(i/32+s.serial*.173+(n.phase||0))*Math.PI*2,r=1+(i%6)*.65,p={x:center.x+Math.cos(angle)*r,z:center.z+Math.sin(angle)*r};
  p.y=__v101Ground(n,p.x,p.z,center.y+.14);if(p.y!==null&&(center!==h||__v101Inside(h,p,.65)))return p;}
 return null;
}
__v100Destination=function(n,s,action){
 const a=n.__v101;if(!a)return null;
 if(action==='sleep'){const p=a.bed;if(!p||__v100Day.seats.has(p.furniture.id)&&__v100Day.seats.get(p.furniture.id)!==n)return null;s.bed=p.furniture;s.station=p;__v100Day.seats.set(s.bed.id,n);return{...p};}
 if(['eat','sit'].includes(action)||action==='read'&&s.zone==='home'){
  const options=[a.dining,...a.home.items.filter(p=>p.type==='seat'&&p.context==='dining').map(p=>__v101Station(n,p))].filter(Boolean);
  for(const p of options)if(!__v100Day.seats.has(p.furniture.id)||__v100Day.seats.get(p.furniture.id)===n){s.seat=p.furniture;s.station=p;__v100Day.seats.set(s.seat.id,n);return{...p};}return null;
 }
 if(action==='talk'&&s.zone==='outside'){
  const friend=__v88Life.active.filter(o=>o!==n&&o.__v101&&!o.__v88Controlled&&!o.__v88Dead&&__v101Outdoors(o)&&!['sleep','eat'].includes(o.__v100Day?.action)&&Math.abs(o.homeY-n.homeY)<.6&&Math.hypot(o.x-n.x,o.z-n.z)<14&&__v101Outdoors(n)).sort((p,q)=>Math.hypot(p.x-n.x,p.z-n.z)-Math.hypot(q.x-n.x,q.z-n.z))[0];
  if(friend)for(let i=0;i<8;i++){const angle=i*Math.PI/4,p={x:friend.x+Math.cos(angle)*1.35,z:friend.z+Math.sin(angle)*1.35};p.y=__v101Ground(n,p.x,p.z,friend.homeY);if(p.y!==null&&__v101Outdoors(n,p)){__v98NPCBrain(n).partner=friend;return p;}}
 }
 return s.zone==='outside'?__v101OutdoorGoal(n,s):__v101HomeGoal(n,s);
};
const __v101Release=__v100Release;
__v100Release=function(n,s){if(s.bed&&__v100Day.seats.get(s.bed.id)===n)__v100Day.seats.delete(s.bed.id);s.bed=null;s.station=null;return __v101Release(n,s);};
function __v101CastleRoute(n,target){
 const site=_1h[n.homeSite??n.site],h=n.__v101.home;if(!h.castle||!site||__v101Inside(h,n,.1)&&__v101Inside(h,target,.1))return null;
 const floor=site.level+.12,P=(x,z,y=floor)=>({x:site.x+x,z:site.z+z,y}),west=p=>p.x>site.x-74&&p.x<site.x-22&&p.z>site.z-10&&p.z<site.z+38;
 if(target.y>site.level+6&&n.homeY<site.level+6){
  const st=_45.find(st=>st.castle===site.name);if(st){const lane=-48+(site.z+11.9>n.z?-.95:.95),route=west(n)?[P(lane,n.z-site.z),P(lane,11.9),P(-25,11.9),P(-25,14),P(.6,14)]:[P(.6,14)];route.push({x:st.x,z:st.z0+.8,y:floor},{x:st.x,z:st.z1-.8,y:st.y1+.12},target);
   let p={x:n.x,z:n.z,y:n.homeY},valid=true;for(const q of route){if(__v101Segment(n,p,q,false,true)===null){valid=false;break;}p=q;}if(valid)return route;
  }
 }
 let prefix=[],source=n;if(n.homeY>site.level+6){const st=_45.find(st=>st.castle===site.name);if(!st)return null;prefix=[{x:st.x,z:st.z1-.8,y:st.y1+.12},{x:st.x,z:st.z0+.8,y:floor}];source=prefix.at(-1);}
 const routes=[],lane=z=>-48+(z>source.z?-.95:.95);
 if(west(source)&&west(target))routes.push([P(lane(target.z),source.z-site.z),P(lane(target.z),target.z-site.z),target]);
 if(west(target)){const x=lane(target.z);routes.push([P(.6,14),P(-25,14),P(-25,12.8),P(x,12.8),P(x,target.z-site.z),target]);}
 if(west(source)){const x=lane(site.z+11.9);routes.push([P(x,source.z-site.z),P(x,11.9),P(-25,11.9),P(-25,14),P(1.8,14),P(1.8,86),target]);}
 for(const tail of routes){const route=[...prefix,...tail];let p={x:n.x,z:n.z,y:n.homeY},valid=true;for(const q of route){if(__v101Segment(n,p,q,false,true)===null){valid=false;break;}p=q;}if(valid)return route;}
 return null;
}
function __v101Plan(n,s,target){
 s.pathTarget=target;s.index=0;s.route=[];s.waitSince=__v98AI.clock;
 if(__v101Segment(n,{x:n.x,z:n.z,y:n.homeY},target)!==null)s.route=[target];else{const route=__v101CastleRoute(n,target);if(route)s.route=route;else __v100Day.jobs.set(n,{generator:__v101Path(n,target),state:s});}
}
__v100Start=function(n,s,action){
 __v100Release(n,s);__v98NPCBrain(n).partner=null;s.action=action;s.serial++;s.phase='travel';s.index=0;s.route=[];s.blocked=0;s.waitSince=__v98AI.clock;s.target=__v100Destination(n,s,action);s.waypoints=[];s.waypoint=0;
 if(!s.target){__v100Release(n,s);s.action='walk';s.target=s.zone==='outside'?__v101OutdoorGoal(n,s):__v101HomeGoal(n,s);}
 if(!s.target){s.phase='new';s.next=__v98AI.clock+.6;return;}
 const h=n.__v101.home,inside=__v101Inside(h,n,.25)&&Math.abs(n.homeY-h.y)<1,targetInside=__v101Inside(h,s.target,.25)&&Math.abs(s.target.y-h.y)<1;
 if(inside!==targetInside){
  const portal=offset=>{const p=__v101World(h,0,h.d/2+offset);p.y=__v101Ground(n,p.x,p.z,h.castle?h.y:h.y+.14);return p.y===null?null:p;},inner=portal(h.castle?-.65:-2),outer=portal(h.castle?1:4.2);
  // Cross the doorway on its center line before turning. This keeps a short
  // diagonal route from grazing a jamb or the leaf of an open door.
  if(inner&&outer)s.waypoints=inside?[inner,outer]:[outer,inner];
 }
 s.waypoints.push(s.target);__v101Plan(n,s,s.waypoints[0]);
};
function __v101ValidStation(n,s){
 const p=s.station;if(!p||p.furniture.home!==n.__v101.home||Math.hypot(n.x-p.x,n.z-p.z)>.2||Math.abs(n.homeY-p.y)>.4)return false;
 if(s.action==='sleep')return p.furniture.type==='bed'&&p.furniture.owner===n.id&&__v101Inside(n.__v101.home,p.furniture,.2);
 if(s.action==='eat')return p.furniture.type==='seat'&&p.table?.home===n.__v101.home&&p.table.type==='table'&&p.table.context==='dining';return true;
}
const __v101Pose=__v100Pose;
__v100Pose=function(n,b,s,moving,dt){
 const perform=s.phase==='perform';b.action=perform?(__v100Tasks[s.action]?.legacy||'patrol'):'patrol';
 // Never let a planning/travel state trigger the legacy lying-down pose.
 if(b.action==='sleep')b.action='rest';__v101Pose(n,b,s,moving,dt);
 if(n.__v100Props)n.__v100Props.stool.visible=false;
 if(!moving&&!(perform&&s.seat))for(const leg of n.legs||[])leg.rotation.x=0;
 if(perform&&s.action==='sleep'&&__v101ValidStation(n,s)){
  const p=s.bed,scale=n.scale||1;n.g.rotation.set(-Math.PI/2,p.angle,0,'YXZ');n.g.position.set(p.x+p.sin*1.05*scale,p.y+.72,p.z+p.cos*1.05*scale);for(const leg of n.legs||[]){leg.visible=true;leg.rotation.x=0;}n.__v100Props.legs.visible=false;n.__v100Props.food.visible=false;if(n.book)n.book.visible=false;
 }
 if(perform&&['hopscotch','skipping','tag','ball','hideSeek'].includes(s.action)){
  const t=__v98AI.clock+(n.phase||0);n.__v101.plays.add(s.action);
  if(s.action==='hopscotch'){n.g.position.y+=Math.max(0,Math.sin(t*5))*.24;n.legs[0].rotation.x=-.55;}
  if(s.action==='skipping'){n.g.position.y+=Math.abs(Math.sin(t*4))*.2;n.g.rotation.y+=dt*1.7;for(const[i,arm]of n.arms.entries())arm.rotation.z=Math.sin(t*4+i*Math.PI)*.65;}
  if(s.action==='hideSeek'){n.g.position.y-=.28+Math.sin(t*2)*.05;n.g.rotation.y+=Math.sin(t*2)*dt;}
  if(s.action==='ball'){if(!n.__v101.ball){const toy=new _0.Mesh(__v100Props.ball,__v88Mat('#eec067'));toy.scale.setScalar(.24);n.g.add(toy);n.__v101.ball=toy;}n.__v101.ball.position.set(.4,.3+Math.abs(Math.sin(t*4))*.75,-.7);}
 }if(n.__v101.ball)n.__v101.ball.visible=perform&&s.action==='ball';
};
function __v101Tick(n,b,dt){
 const a=n.__v101;if(!a)return;const s=__v100Brain(n),now=__v98AI.clock,hour=Math.floor(_x);n.__v100Day=s;
 if(s.lastHour!==null&&s.lastHour!==hour){__v100Release(n,s);s.phase='new';s.next=0;s.route=[];}
 if(s.phase==='perform'&&['eat','sleep'].includes(s.action)&&!__v101ValidStation(n,s)){__v100Release(n,s);s.phase='new';s.next=0;}
 if(s.phase==='new'&&now>=s.next&&__v99Life.plans<(__v60Mobile?2:3)){__v99Life.plans++;__v100Start(n,s,__v101Choose(n,s));}
 if(s.phase==='perform'&&now>=s.until&&s.action!=='sleep'){
  s.completed.add(s.action);if(s.action==='eat'){s.mealCount++;s.mealSlot=(s.day||0)+':'+hour;b.energy=Math.min(1,b.energy+.3);}__v100Start(n,s,__v101Choose(n,s));
 }
 if(s.phase==='travel'&&s.target&&!s.route.length&&!__v100Day.jobs.has(n))__v100Day.jobs.set(n,{generator:__v101Path(n,s.pathTarget||s.target),state:s});
 let moving=false;const point=s.route[s.index],portalClear=s.phase!=='travel'||s.waypoint===s.waypoints.length-1||(__v101Inside(a.home,s.pathTarget||n,.1)?__v101Inside(a.home,n,.6):!__v101Inside(a.home,n,-.6));
 if(s.phase==='travel'&&point){const distance=Math.hypot(point.x-n.x,point.z-n.z),last=s.index===s.route.length-1,final=s.waypoint===s.waypoints.length-1,context=s.zone!=='outside'||__v101Outdoors(n),radius=last?(final?(s.station?.07:context?.65:.07):portalClear?.75:.12):.65;if(distance<radius&&(last||distance<.02||__v101Segment(n,{x:n.x,z:n.z,y:n.homeY},s.route[s.index+1],true)!==null))s.index++;else{
  const speed=n.age==='child'?(s.action==='tag'?3:2.1):1.95,step=Math.min(distance,speed*Math.min(.05,Math.max(0,dt))),dx=(point.x-n.x)/distance,dz=(point.z-n.z)/distance;
  const occupied=(x,z)=>__v88Life.active.some(o=>o!==n&&!o.__v88Dead&&!o.sleeping&&Math.abs(o.homeY-n.homeY)<.6&&Math.hypot(o.x-x,o.z-z)<.5&&Math.hypot(o.x-x,o.z-z)<Math.hypot(o.x-n.x,o.z-n.z)-.001);
  let x=n.x+dx*step,z=n.z+dz*step,y=__v101Segment(n,{x:n.x,z:n.z,y:n.homeY},{x,z},true),sidestepped=false;
  if(occupied(x,z)){
   y=null;const side=Math.floor(Math.abs(n.phase||0)*100)%2?1:-1;
   for(const turn of[side*Math.PI/3,-side*Math.PI/3,side*Math.PI/2,-side*Math.PI/2,side*Math.PI*.75,-side*Math.PI*.75]){
    const cs=Math.cos(turn),sn=Math.sin(turn),qx=n.x+(dx*cs-dz*sn)*step,qz=n.z+(dx*sn+dz*cs)*step;if(occupied(qx,qz))continue;
    const floor=__v101Segment(n,{x:n.x,z:n.z,y:n.homeY},{x:qx,z:qz},true);if(floor!==null){x=qx;z=qz;y=floor;sidestepped=true;break;}
   }
  }
  if(y!==null){s.traveled+=Math.hypot(x-n.x,z-n.z);n.x=x;n.z=z;n.homeY=y;moving=true;s.blocked=sidestepped?s.blocked+dt:0;const angle=Math.atan2(n.x-point.x,n.z-point.z);n.g.rotation.y+=Math.atan2(Math.sin(angle-n.g.rotation.y),Math.cos(angle-n.g.rotation.y))*(1-Math.exp(-14*dt));}else s.blocked+=dt;
 }}
 if(s.phase==='travel'&&s.pathTarget&&!__v100Day.jobs.has(n)&&s.index>=s.route.length&&portalClear&&Math.hypot(n.x-s.pathTarget.x,n.z-s.pathTarget.z)<.76&&s.waypoint<s.waypoints.length-1){s.waypoint++;__v101Plan(n,s,s.waypoints[s.waypoint]);}
 if(s.phase==='travel'&&s.target&&Math.hypot(n.x-s.target.x,n.z-s.target.z)<(s.station?.13:.66)&&(s.zone!=='outside'||s.station||__v101Outdoors(n))&&Math.abs(n.homeY-s.target.y)<.4&&!__v100Day.jobs.has(n)){
  if(['sleep','eat'].includes(s.action)&&!__v101ValidStation(n,s)){__v100Start(n,s,'walk');}else{
   s.phase='perform';s.until=now+(s.action==='walk'||s.action==='inspect'?1:s.action==='eat'?7:4.5);
   if(s.action==='talk'){const friend=b.partner,fs=friend?.__v100Day;if(friend&&fs&&__v102CanTalk(n,friend)&&Math.hypot(friend.x-n.x,friend.z-n.z)<2.5&&__v101Segment(n,{x:n.x,z:n.z,y:n.homeY},{x:friend.x,z:friend.z,y:friend.homeY})!==null){__v100Release(friend,fs);fs.action='talk';fs.phase='perform';fs.route=[];fs.lastHour=hour;fs.previousHour=hour;fs.zone=__v101Outdoors(friend)?'outside':'court102';fs.until=now+4.5;__v98NPCBrain(friend).partner=n;a.conversations++;friend.__v101.conversations++;}else{b.partner=null;s.action='greet';}}
  }
 }
 if(s.blocked>1.5&&s.target){s.blocked=0;__v101Plan(n,s,s.pathTarget||s.target);}
 if(s.phase==='travel'&&!__v100Day.jobs.has(n)&&now-s.waitSince>100)__v100Start(n,s,__v101Choose(n,s));
 const outside=__v101Outdoors(n);if(outside!==a.outdoor){a.transitions++;if(outside)a.outings++;a.outdoor=outside;}
 const task=__v100Tasks[s.action]||__v100Tasks.walk;n.activity=s.phase==='travel'?'Caminando · '+task.label:task.label;n.sleeping=s.phase==='perform'&&s.action==='sleep'&&__v101ValidStation(n,s);n.__v88Moving=moving;n.goal=s.target?{x:s.target.x,z:s.target.z,action:task.label}:null;
 __v100Pose(n,b,s,moving,dt);
}
__v99InteriorTick=__v101Tick;
// Rotate unfinished searches so one unreachable route cannot freeze the queue.
__v100AdvanceJobs=function(){
 const begin=performance.now(),budget=__v60Mobile?.7:1.3;
 for(const[n,job]of [...__v100Day.jobs]){
  if(n.__v88Dead||n.__v88Controlled||Math.hypot(n.x-_14.x,n.z-_14.z)>155){__v100Day.jobs.delete(n);continue;}
  for(let i=0;i<64;i++){
   const result=job.generator.next();job.steps=(job.steps||0)+1;
   if(result.done){job.state.route=result.value;job.state.index=0;__v100Day.jobs.delete(n);if(!result.value.length){__v100Release(n,job.state);job.state.phase='new';job.state.next=__v98AI.clock+.3;}break;}
   if(performance.now()-begin>=budget)break;
  }
  if(__v100Day.jobs.get(n)===job){__v100Day.jobs.delete(n);__v100Day.jobs.set(n,job);}
  if(performance.now()-begin>=budget)break;
 }
 __v100Day.pathMs=performance.now()-begin;
};
function __v101DoorActors(){
 if(__v101Life.doorSenseAt!==_10){__v101Life.doorSenseAt=_10;__v101Life.doorActors=__v88Life.active.filter(n=>!n.__v88Dead).concat(_2h.filter(n=>n.__v88Controlled&&!n.__v88Dead&&Math.hypot(n.x-_14.x,n.z-_14.z)<165));}
 return __v101Life.doorActors;
}
// Vertical bedroom shutters leave the dining furniture and corridor completely clear.
const __v101DoorTick=__v73TickDoors;__v73TickDoors=function(dt){
 const result=__v101DoorTick(dt);if(!_u||_74())return result;
 for(const d of __v101Life.doors){const distance=Math.hypot(d.p.x-_14.x,d.p.z-_14.z);d.pivot.visible=distance<180;
  if(distance>180&&d.slide<.001)continue;
  const trigger=Math.max(3.2,d.w*d.scale*.6+2),near=distance<Math.max(4,trigger)&&Math.abs(_14.y-(d.p.y+.65))<2.6||__v102DoorActors(d.p.x,d.p.z,trigger).some(n=>!n.__v88Dead&&Math.abs(n.homeY+1.85-(d.p.y+.65))<2.6&&Math.hypot(n.x-d.p.x,n.z-d.p.z)<trigger);
  d.hold=near?.8:Math.max(0,d.hold-dt);const target=d.hold>0?1:0;d.slide+=(target-d.slide)*(1-Math.exp(-8*Math.min(dt,.1)));if(Math.abs(d.slide-target)<.001)d.slide=target;
  d.angle=d.slide*d.open;d.pivot.rotation.y=0;d.pivot.position.y=d.baseY+d.slide*(d.h+.3);__v73DoorShape(d);
 }
 return result;
};
const __v101Build=_bj;_bj=function(...args){__v101Life.castleHomes=[];__v101Life.doors=[];__v101Life.doorSenseAt=-1;__v101Life.grid.clear();__v101Life.floorGrid.clear();__v101Life.ready=false;__v101Life.repairs=0;const r=__v101Build(...args);__v101Assign();return r;};
const __v101Load=_dn;_dn=function(...args){const r=__v101Load(...args);if(__v101Life.ready){for(const n of _2h.filter(n=>n.__v101)){const s=__v100Brain(n);__v100Release(n,s);s.phase='new';s.next=0;s.lastHour=null;n.__v99Area=n.__v101.nav;n.__v99Area.y=n.homeY;}}return r;};
window.__AURELIA_LIFE101__={audit:()=>({homes:__v101Life.reports,routines:Object.keys(__v100Tasks),childrenGames:['hopscotch','skipping','tag','ball','hideSeek'],npcs:_2h.filter(n=>n.__v101).length,missingBeds:_2h.filter(n=>n.__v101&&!n.__v101.bed).map(n=>n.id),missingDining:_2h.filter(n=>n.__v101&&!n.__v101.dining).map(n=>n.id),invalidActivities:_2h.filter(n=>n.__v100Day?.phase==='perform'&&['eat','sleep'].includes(n.__v100Day.action)&&!__v101ValidStation(n,n.__v100Day)).map(n=>n.id)})};
