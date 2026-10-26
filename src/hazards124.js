/* A traversable hazard band ends at solid architecture, never at a doorway. */
const __v124Hazards={walls:new Map(),moves:[],unresolved:[],arrowFrames:new WeakMap(),extra:[]};
function __v124Walls(a){
 if(__v124Hazards.walls.has(a))return __v124Hazards.walls.get(a);const own=new Set(a.colliders),list=_q.filter(c=>(c.__v83===a.key||own.has(c))&&Number.isFinite(c.x+c.z+(c.w??NaN)+(c.d??NaN))&&(c.bottom??a.y)<=a.y+1.6&&(c.top??a.y+12)>a.y+2.2&&!/door|gate|trap|furniture|barrel|statue|stair|secretWall|riddle/i.test(c.tag||'')&&!c.secret85&&!c.riddle103);__v124Hazards.walls.set(a,list);return list;
}
function __v124BandRect(a,x,z,axis){
 const alongX=Math.abs(axis.x)>Math.abs(axis.z),at=alongX?z:x,cut=alongX?x:z;let lo=-Infinity,hi=Infinity;
 for(const c of __v124Walls(a)){
  // Intersect the actual oriented collision rectangle, including diagonal room walls.
  const cs=c.cs??1,sn=c.sn??0,dx=(alongX?cut:0)-c.x,dz=(alongX?0:cut)-c.z,origin=[cs*dx-sn*dz,sn*dx+cs*dz],direction=alongX?[-sn,cs]:[cs,sn],half=[c.hx??c.w,c.hz??c.d];let from=-Infinity,to=Infinity,hit=true;
  for(let i=0;i<2;i++){if(Math.abs(direction[i])<1e-8){if(Math.abs(origin[i])>half[i])hit=false;}else{const u=(-half[i]-origin[i])/direction[i],v=(half[i]-origin[i])/direction[i];from=Math.max(from,Math.min(u,v));to=Math.min(to,Math.max(u,v));}}if(!hit||from>to)continue;
  if(from<at&&to>at)return null;if(to<=at&&to>lo)lo=to;if(from>=at&&from<hi)hi=from;
 }
 if(!Number.isFinite(lo+hi)||hi-lo<2.3||hi-lo>90)return null;
 const s={x:alongX?x:(lo+hi)/2,z:alongX?(lo+hi)/2:z,w:alongX?1.8:hi-lo,d:alongX?hi-lo:1.8,axis:{x:alongX?Math.sign(axis.x)||1:0,z:alongX?0:Math.sign(axis.z)||1}};
 for(const door of a.doors||[]){const dx=Math.max(0,Math.abs(door.x-s.x)-s.w/2),dz=Math.max(0,Math.abs(door.z-s.z)-s.d/2);if(Math.hypot(dx,dz)<3.5)return null;}
 if(__v75.objects.some(o=>o.area===a&&/riddle|fountain|exit|stairs|shortcut|entrada|volcano103-(up|down)/.test(o.type)&&Math.abs(o.x-s.x)<s.w/2+3&&Math.abs(o.z-s.z)<s.d/2+3))return null;
 if(a.well124&&Math.abs(a.well124.x-s.x)<s.w/2+3&&Math.abs(a.well124.z-s.z)<s.d/2+5)return null;
 for(const t of[-.42,0,.42])for(const along of[-1.3,0,1.3]){const xx=s.x+(alongX?along:t*s.w),zz=s.z+(alongX?t*s.d:along);if(!__v83Walkable(a,xx,zz,.1)||__v124Walls(a).some(c=>__v73Hit(c,xx,zz,a.y+1.85,.08,1.7)))return null;}
 return s;
}
function __v124FindBand(a,x,z,axis,used=[]){
 const spots=[{x,z,axis},...__v108CorridorSpots(a),...(a.rooms||[]).map(p=>({...p,axis}))],offsets=[0,2.5,-2.5,5,-5,8,-8,12,-12,16,-16,21,-21,27,-27],choices=[];
 for(const orientation of[axis,{x:axis.z||0,z:axis.x||0}])for(const p of spots)for(const offset of offsets){const dir=p.axis||orientation,xx=p.x+dir.x*offset,zz=p.z+dir.z*offset;choices.push({x:xx,z:zz,axis:orientation,cost:Math.hypot(xx-x,zz-z)+(orientation===axis?0:.2)});}
 choices.sort((a,b)=>a.cost-b.cost);for(const p of choices){const s=__v124BandRect(a,p.x,p.z,p.axis);if(s&&!used.some(o=>Math.abs(o.x-s.x)<(o.w+s.w)/2+.5&&Math.abs(o.z-s.z)<(o.d+s.d)/2+.5))return s;}return null;
}
function __v124CaveBand(a,p,s){
 p.x=s.x-a.x;p.z=s.z-a.z;p.cell=__v103Cell(a,s.x,s.z);p.w=s.w;p.d=s.d;p.g.position.set(s.x,a.y,s.z);p.axis124=s.axis;
 if(p.type==='lavafall'){p.band108=true;__v124Lavafall(a,p);return;}
 // Replace the complete model at the same coordinates used by the damage/swept tests.
 const old=p.effect;old.removeFromParent();p.effect=new _0.Group();p.g.add(p.effect);p.g.rotation.y=0;const across=p.w>p.d;
 for(const child of [...p.g.children])if(child!==p.effect)child.removeFromParent();
 __v97Model(p.g,[['box',p.type==='darkness'?'#77538e':'#6d6a63',0,.05,0,p.w,.10,p.d]]);
 const count=Math.max(5,Math.ceil(Math.max(p.w,p.d)/.6));for(let i=0;i<count;i++){const u=(i/(count-1)-.5)*(Math.max(p.w,p.d)-.25);if(p.type==='spikes')__v97Model(p.effect,[['cone','#e0cdb5',across?u:0,.8,across?0:u,.18,1.6,.18]]);else{const m=new _0.Mesh(new _0.SphereGeometry(.58,10,6),new _0.MeshBasicMaterial({color:'#8d61c5',transparent:true,opacity:.25,depthWrite:false}));m.position.set(across?u:0,1.2,across?0:u);m.scale.y=2.4;p.effect.add(m);}}
}
function __v124BuildBands(){
 __v124Hazards.walls.clear();__v124Hazards.moves=[];__v124Hazards.unresolved=[];
 for(const a of __v83.areas){const used=[];
  for(const t of a.traps||[]){if(!t.band108&&!t.fullSpan86)continue;const axis=t.axis||{x:t.d>t.w?1:0,z:t.w>=t.d?1:0},s=__v124FindBand(a,t.x,t.z,axis,used);if(!s){__v124Hazards.unresolved.push({area:a.key,id:t.id,type:t.type});continue;}const from={x:t.x,z:t.z};Object.assign(t,s);t.pads=[{x:s.x-s.axis.x*2.8,z:s.z-s.axis.z*2.8,y:a.y},{x:s.x+s.axis.x*2.8,z:s.z+s.axis.z*2.8,y:a.y}];__v108BandModel(t,s);used.push(s);__v124Hazards.moves.push({area:a.key,type:t.type,from,to:s});}
  for(const p of a.hazards||[]){if(!p.band&&!p.band108)continue;const axis=p.axis124||{x:p.d>p.w?1:0,z:p.w>=p.d?1:0},x=a.x+p.x,z=a.z+p.z,s=__v124FindBand(a,x,z,axis,used);if(!s){__v124Hazards.unresolved.push({area:a.key,id:p.id,type:p.type});continue;}__v124CaveBand(a,p,s);used.push(s);__v124Hazards.moves.push({area:a.key,type:p.type,from:{x,z},to:s});}
  for(const t of a.arrowTraps85||[])if(t.plate?.parent)t.plate.parent.traverse(o=>{if(o.isMesh)o.visible=false;});
 }
}
// Arrow traps launch real projectiles at 44 m/s, with rows covering a normal jump.
__v85FireArrows=function(t){
 const n=t.normal,range=Math.min(44,Math.hypot(t.target.x-t.origin.x,t.target.z-t.origin.z)+.3);
 for(const height of[.8,2.2,3.6])for(const offset of[-.45,0,.45]){if(__v85Secrets.arrows.length>=__v85Secrets.arrowCap)break;__v85Secrets.arrows.push({x:t.origin.x+n.z*offset,y:t.area.y+height,z:t.origin.z-n.x*offset,vx:n.x*44,vz:n.z*44,life:range/44,area:t.area.key,source:t.s.id});}
 t.ready=__v85Secrets.clock+4.2;t.warnAt=null;t.volley++;_6s('swing');
};
function __v124CaveArrows(){
 const a=__v103AreaAt();if(!a)return;
 for(const p of a.hazards)if(p.type==='arrows'){
  p.effect.visible=false;if(p.g.children[0])p.g.children[0].visible=false;
  const phase=Math.floor((__v103.clock+p.phase)/5.5);if(p.volley124===phase||Math.hypot(_14.x-a.x-p.x,_14.z-a.z-p.z)>32)continue;p.volley124=phase;
  const axis={x:p.axis[0],z:p.axis[1]},origin={x:a.x+p.x-axis.x*1.55,z:a.z+p.z-axis.z*1.55},target={x:a.x+p.x+axis.x*4,z:a.z+p.z+axis.z*4};__v85FireArrows({normal:axis,origin,target,area:a,s:{id:p.id},volley:0});
 }
}
const __v124TrapArrowStep=__v85ArrowStep;__v85ArrowStep=function(dt){if(_u&&!_74())__v124CaveArrows();return __v124TrapArrowStep(dt);};
const __v124TrapActivate=__v75Activate;__v75Activate=function(t,...args){if(__v43TrapImmune()&&(__v108BandTypes.has(t.type)||t.type==='blackray124'))return false;return __v124TrapActivate(t,...args);};
const __v124TrapDamage=__v75Damage;__v75Damage=function(...args){const hp=_2l,result=__v124TrapDamage(...args);if(_2l<hp){const at=new _0.Vector3(_14.x,_14.y-.7,_14.z);__v68Burst(at,'#ac354a','hit',.7,.4);__v68Burst(at,'#e6bb91','hit',.45,.28);}return result;};
const __v124HazardWorld=_bj;_bj=function(...args){const r=__v124HazardWorld(...args);__v124BuildBands();return r;};
window.__AURELIA_HAZARDS124__={audit:()=>({bands:__v124Hazards.moves.length,unresolved:__v124Hazards.unresolved,moves:__v124Hazards.moves,arrowSpeed:44,platesHidden:__v83.areas.every(a=>(a.arrowTraps85||[]).every(t=>!t.plate.visible&&t.plate.parent.children.every(o=>!o.isMesh||!o.visible))),walkThrough:true,jumpAvoidance:false})};
