/* Bands follow the passage cross-section, including the full jump height. */
const __v108Hazards={bands:[],fireSites:[],ceiling:[],clock:0};
const __v108BandTypes=new Set(['spikes','poison','poisongas','vapor102','dark','burn','firejet','fire108']);
function __v108CrossSection(a,x,z,axis){
 const alongX=Math.abs(axis.x)>Math.abs(axis.z),free=(xx,zz)=>__v83Walkable(a,xx,zz,0)&&!__v115BandSolids(a,xx,zz).some(c=>__v73Hit(c,xx,zz,a.y+1.85,.05,1.7));
 if(!free(x,z)){let found=false;for(let r=.5;r<=16&&!found;r+=.5)for(let k=0;k<16;k++){const xx=x+Math.cos(k*Math.PI/8)*r,zz=z+Math.sin(k*Math.PI/8)*r;if(free(xx,zz)){x=xx;z=zz;found=true;break;}}}
 let lo=0,hi=0;for(let sign of[-1,1])for(let d=.2;d<=Math.max(250,a.w*2+a.d*2);d+=.2){if(!free(x+(alongX?0:sign*d),z+(alongX?sign*d:0)))break;if(sign<0)lo=-d;else hi=d;}
 return{x:x+(alongX?0:(hi+lo)/2),z:z+(alongX?(hi+lo)/2:0),w:alongX?1.8:hi-lo+.4,d:alongX?hi-lo+.4:1.8,axis};
}
function __v108BandModel(t,section=null){
 const a=t.area,s=section||__v108CrossSection(a,t.x,t.z,t.axis||{x:t.d>t.w?1:0,z:t.w>=t.d?1:0});Object.assign(t,s,{shape86:null,fullSpan86:true,band108:true});
 t.g.updateWorldMatrix(true,false);t.g.position.copy(t.g.parent.worldToLocal(new _0.Vector3(t.x,a.y+.09,t.z)));t.g.rotation.set(0,0,0);
 // Dispose only replaced, privately owned buffers; cached primitive/material assets remain shared.
 if(t.pad.geometry!==__v75Geo('box'))t.pad.geometry.dispose();t.pad.geometry=new _2.BoxGeometry(t.w,.1,t.d);t.pad.position.set(0,0,0);
 const old=t.h,fire=['burn','firejet','fire108'].includes(t.type),cloud=['poison','poisongas','vapor102','dark'].includes(t.type),ice=t.type==='icefreeze';
 const count=Math.max(4,Math.ceil(Math.max(t.w,t.d)/.65))*2,geo=cloud?__v102CloudGeometry:__v75Geo('cone'),material=fire?new _0.MeshBasicMaterial({color:'#ffb53f',transparent:true,opacity:.85,depthWrite:false}):cloud?new _0.MeshBasicMaterial({color:t.type==='dark'?'#9670cd':'#a8ce72',transparent:true,opacity:.3,depthWrite:false}):ice?__v75Mat('#b9e9ff'):__v75Mat('#cbd7e3'),h=new _0.InstancedMesh(geo,material,count),m=new _0.Matrix4(),q=new _0.Quaternion();
 for(let i=0;i<count;i++){const across=t.w>t.d,n=Math.floor(i/2),nmax=count/2-1,span=across?t.w:t.d,u=-span/2+.2+n*(span-.4)/nmax,v=i%2?.4:-.4;m.compose(new _0.Vector3(across?u:v,cloud?1.1:fire?1.8:1.15,across?v:u),q,new _0.Vector3(cloud?.55:fire?.42:.28,cloud?1.2:fire?3.6:2.3,cloud?.55:fire?.42:.28));h.setMatrixAt(i,m);}
 h.instanceMatrix.needsUpdate=true;h.computeBoundingSphere();old.removeFromParent();old.dispose?.();t.h=h;t.g.add(h);
 if(fire){t.type='fire108';t.elemental85=null;t.damage=.20;t.pad.material.color.set('#6c3b30');}
 if(!__v108Hazards.bands.includes(t))__v108Hazards.bands.push(t);return t;
}
function __v108CorridorSpots(a){
 return(a.plan95?.corridors||[]).filter(c=>!c.optional).map(c=>{const rect=c.segments?.[Math.floor(c.segments.length/2)]||c.rect,from=a.plan95.centers[c.from],to=a.plan95.centers[c.to],w=rect[2]-rect[0],d=rect[3]-rect[1],p=__v83Point(a,[(rect[0]+rect[2])/2,(rect[1]+rect[3])/2]);return{...p,axis:{x:w>d?Math.sign(to[0]-from[0])||1:0,z:d>=w?-Math.sign(to[1]-from[1])||1:0}};});
}
function __v108NewBand(a,p,type,i){
 const cfg=a.design.elementalTrap85;let t;try{a.design.elementalTrap85=null;t=__v75Trap(a,p.x,p.z,3,2,type,8000+i);}finally{a.design.elementalTrap85=cfg;}
 Object.assign(t,{axis:p.axis,damage:type==='dark'?0:type==='poison'?.10:.20,period:6.5,phase:i*1.17,permanent:false,__v83:true,location:'corredor'});a.root.attach(t.g);for(const o of [...t.g.children])if(o.isSprite)o.removeFromParent();__v75Label(t.g,type==='fire108'?'FUEGO · ESPERA EL CICLO':type==='blackray124'?'RAYOS NEGROS · ESPERA EL CICLO':type==='dark'?'OSCURIDAD · LUZ DIVINA':type==='poison'?'VENENO · ESPERA EL CICLO':'PICOS · ESPERA EL CICLO',3.6,5);return t;
}
function __v108BuildBands(){
 __v108Hazards.bands=[];__v108Hazards.fireSites=[];
 // These two additional fortress families had no fire jets: desert and corsair.
 const targets=[__v83.areas.find(a=>!a.plan103&&a.biome==='desert'&&a.key!=='crypt'),__v94Corsair.areas[0]].filter(Boolean),fireSites=new Set(targets.map(a=>a.site));__v108Hazards.fireSites=[...fireSites];
 for(const a of __v83.areas){if(a.plan103)continue;const spots=__v108CorridorSpots(a),used=new Map();let serial=0;
  for(const t of [...a.traps]){if(!__v108BandTypes.has(t.type))continue;
   // Room traps are moved into their own dedicated cross-section of a main passage.
   if(spots.length&&t.location==='sala'){const choices=[...spots].sort((p,q)=>Math.hypot(p.x-t.x,p.z-t.z)-Math.hypot(q.x-t.x,q.z-t.z));const p=choices.find(p=>!used.has(p))||choices[0],n=used.get(p)||0;used.set(p,n+1);Object.assign(t,{x:p.x+p.axis.x*n*2.4,z:p.z+p.axis.z*n*2.4,axis:p.axis,location:'corredor'});}
   __v108BandModel(t);serial++;
  }
  // One extra band is placed farther along the compulsory route, not at the entrance.
  const fallback=a.traps.find(t=>t.band108&&t.type==='spikes'&&t.location!=='sala')||a.traps.find(t=>t.band108),p=spots[Math.min(3,spots.length-1)]||(fireSites.has(a.site)&&fallback?{x:fallback.x,z:fallback.z,axis:fallback.axis}:null);if(p){const type=fireSites.has(a.site)?'fire108':a.traps.some(t=>t.type==='dark')?'dark':a.biome==='jungle'?'poison':'spikes',q={...p,x:p.x-p.axis.x*2.4,z:p.z-p.axis.z*2.4};__v108BandModel(__v108NewBand(a,q,type,serial));}
 }
}
// Falling lava keeps its native warning/pause, but its curtain now reaches both rock walls.
function __v108CaveBands(){for(const a of __v103.areas)for(const p of a.hazards.filter(p=>p.type==='lavafall')){
 const x=a.x+p.x,z=a.z+p.z,sx=__v108CrossSection(a,x,z,{x:1,z:0}),sz=__v108CrossSection(a,x,z,{x:0,z:1}),s=Math.max(sx.w,sx.d)<Math.max(sz.w,sz.d)?sx:sz;p.w=s.w;p.d=s.d;p.band108=true;p.x=s.x-a.x;p.z=s.z-a.z;p.g.position.set(s.x,a.y,s.z);const across=p.w>p.d;
 p.effect.scale.set(across?p.w/(p.radius*2):1,1,across?1:p.d/(p.radius*2));p.warning.scale.set(across?p.w/(p.radius*2):1,across?1:p.d/(p.radius*2),1);
}}
Object.assign(__v75TrapNames,{fire108:'Trampa de fuego'});
const __v108Activate=__v75Activate;__v75Activate=function(t){if(t.type==='fire108')return __v75Damage(t.damage||.2,'Trampa de fuego',null);return __v108Activate(t);};
const __v108TrapTick=__v75Tick;__v75Tick=function(dt){const r=__v108TrapTick(dt);if(!_u||_74())return r;for(const t of __v75At()?.traps||[])if(t.band108&&t.type==='fire108'){t.h.scale.y=t.active?.9+Math.sin(__v75.clock*14+t.phase)*.1:.02;}return r;};
// A high jump or a frame that crosses the whole band still intersects its vertical hazard.
const __v108BandMove=_3m;_3m=function(dt){const from=_14.clone(),a=__v75At(),r=__v108BandMove(dt);if(!_v&&a?.plan103&&a===__v75At())for(const p of a.hazards.filter(p=>p.type==='lavafall'&&p.band108)){const phase=((__v103.clock+p.phase)%7+7)%7;if(phase>=1.7&&phase<4.2&&__v101SweptHit({x:a.x+p.x,z:a.z+p.z,w:p.w/2,d:p.d/2,bottom:a.y,top:a.y+8},from,_14,a.y,.3))__v75Damage(.09,'Cascada de lava',null);}if(!_v&&a&&a===__v75At())for(const t of a.traps||[])if(t.band108&&t.active&&t.lastHit!==t.cycle&&__v101SweptHit({x:t.x,z:t.z,w:t.w/2,d:t.d/2,bottom:t.y,top:t.y+11.8},from,_14,t.y,.3)){t.lastHit=t.cycle;__v75Activate(t);}return r;};
/* A fixed stalactite remains attached to the roof. A separate pooled spike falls, never rises. */
function __v108CeilingModel(t,stone=false){
 t.mark?.removeFromParent();t.mark?.geometry.dispose();t.mark?.material.dispose();t.mark=null;t.period108=3;t.stone108=stone;t.cycle108=-1;t.lastTime108=null;
 const fixed=t.spikes.clone(true);fixed.name='Estalactitas fijas del techo';fixed.position.y=10.8;t.g.add(fixed);t.fixed108=fixed;t.spikes.position.y=9.8;t.spikes.visible=false;
 if(stone)for(const group of[fixed,t.spikes])group.traverse(m=>{if(m.isMesh)m.material=__v75Mat('#a8a09a');});
 __v108Hazards.ceiling.push(t);
}
function __v108BuildCeiling(){
 __v108Hazards.ceiling=[];for(const t of __v95Falling.traps)__v108CeilingModel(t);
 const a=__v83.areas.find(a=>a.biome==='desert'&&a.plan95);if(a)for(const i of[1,4]){const point=a.plan95.centers[i],p=__v83Point(a,point),g=new _0.Group(),spikes=new _0.Group();g.position.set(p.x,a.y,p.z);g.userData.animated=true;g.name='Estalactitas de piedra · techo';a.root.attach(g);g.add(spikes);for(const x of[-.8,.8])for(const z of[-.55,.55]){const m=new _0.Mesh(__v75Geo('cone'),__v75Mat('#a8a09a'));m.scale.set(.3,2,.3);m.rotation.z=Math.PI;m.position.set(x,0,z);spikes.add(m);}const t={a,x:p.x,z:p.z,point,g,spikes,phase:i*.67,hit:false,last:9.8};__v95Falling.traps.push(t);__v108CeilingModel(t,true);}
}
__v95FallingTick=function(dt){if(!_u||_74())return;__v95Falling.clock+=dt;const a=__v75At();for(const t of __v108Hazards.ceiling){t.g.visible=t.a===a;if(t.a!==a)continue;
 const elapsed=__v95Falling.clock+t.phase,cycle=Math.floor(elapsed/3),u=((elapsed%3)+3)%3,fall=u>=.6&&u<1.3,previous=t.lastTime108,y=fall?9.8-(u-.6)/.7*10:9.8;if(t.cycle108!==cycle){t.hit=false;t.cycle108=cycle;}t.fixed108.visible=true;t.fixed108.rotation.z=u<.6?Math.sin(u*45)*.012:0;t.spikes.visible=fall;t.spikes.position.y=y;
 const foot=_14.y-1.85-t.a.y,head=_14.y-t.a.y,oldY=previous!==null&&Math.floor(previous/3)===cycle&&previous%3>=.6?t.last:9.8;
 if(!t.hit&&fall&&!_v&&Math.abs(_14.x-t.x)<1.5&&Math.abs(_14.z-t.z)<1.2&&Math.min(y,oldY)-1<head&&Math.max(y,oldY)+1>foot){__v75Damage(.20,t.stone108?'Picos de piedra del techo':'Picos de hielo del techo',null);t.hit=true;}t.last=y;t.lastTime108=elapsed;
 }};
const __v108HazardWorld=_bj;_bj=function(...args){const r=__v108HazardWorld(...args);__v108BuildBands();__v108BuildCeiling();__v108CaveBands();return r;};
window.__AURELIA_HAZARDS108__={audit:()=>({bands:__v108Hazards.bands.length,extraFire:__v108Hazards.fireSites.map(i=>_1h[i].name),ceiling:__v108Hazards.ceiling.length,fallPeriod:3,floorPlates:__v108Hazards.ceiling.filter(t=>t.mark?.parent).length})};
