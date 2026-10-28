/* Shared simulation states, bounded world effects, and a quiet first-person cue. */
const __v137Status={clock:0,visuals:new Map(),batches:new Map(),hero:{stone:0,freeze:0,confusion:0},overlay:null,overlayKinds:'',stoneTexture:null};
function __v137HeroDisabled(){return __v56Status.sleep>0||__v56Status.stun>0||__v137Status.hero.stone>0||__v137Status.hero.freeze>0;}
function __v137HeroAffect(kind,power=0){
 const h=__v137Status.hero;
 if(kind==='stone'||kind==='freeze'){h[kind]=10;_3a(__v119Afflictions[kind].name+' · inmóvil durante 10 segundos');}
 if(kind==='sleep')__v56Status.sleep=10;
 if(kind==='confusion')h.confusion=8;
 // Native damage code owns poison/burn HP pulses; do not create a second damage path.
 if(kind==='burn'&&_cu.burn>0)_cu.burn=Math.max(8,_cu.burn);
}
const __v137ApplyHero=__v56ApplyStatus;
__v56ApplyStatus=function(kind,power){const r=__v137ApplyHero(kind,power);__v137HeroAffect(kind,power);return r;};
const __v137Walk=_3m;_3m=function(dt){if(__v137HeroDisabled())return;const heading=yaw;if(__v137Status.hero.confusion>0)yaw+=Math.sin(__v137Status.clock*2.5)*.5;try{return __v137Walk(dt);}finally{yaw=heading;}};
const __v137Attack=_8d;_8d=function(...args){if(__v137HeroDisabled())return false;return __v137Attack(...args);};
const __v137Swing=_8e;_8e=function(...args){if(__v137HeroDisabled())return false;return __v137Swing(...args);};
const __v137Cast=_gd;_gd=function(...args){if(__v137HeroDisabled())return false;return __v137Cast(...args);};
const __v137BaseCast=_5y;_5y=function(...args){if(__v137HeroDisabled())return false;return __v137BaseCast(...args);};
const __v137Spell=_a7;_a7=function(...args){if(__v137HeroDisabled())return false;return __v137Spell(...args);};
const __v137Jump=_3c;_3c=function(...args){if(__v137HeroDisabled())return false;return __v137Jump(...args);};
const __v137TravelTick=_f4;_f4=function(dt){if(__v137HeroDisabled())return;return __v137TravelTick(dt);};
$('jump').onclick=()=>_3c();$('attack').onclick=()=>_8d();
const __v137HasStatus=__v56HasBadStatus;__v56HasBadStatus=function(){return Object.values(__v137Status.hero).some(t=>t>0)||__v137HasStatus();};
const __v137HeroTimer=_ge;_ge=function(dt){
 if(_u&&!_74()){__v137Status.clock+=dt;for(const k of Object.keys(__v137Status.hero))__v137Status.hero[k]=Math.max(0,__v137Status.hero[k]-dt);}
 return __v137HeroTimer(dt);
};
const __v137HUD=_fl;_fl=function(){const r=__v137HUD();for(const[k,t]of Object.entries(__v137Status.hero))if(t>0)$('stat-line').textContent+=' · '+__v119Afflictions[k].name.toUpperCase()+' '+Math.ceil(t)+'s';if(__v137HeroDisabled())$('magic').dataset.ready='false';return r;};
_9j.panacea.detail='Cura veneno, quemadura, petrificación, congelación, sueño, confusión, lentitud y aturdimiento';
const __v137Clean=__v56ClearStatuses;__v56ClearStatuses=function(...args){
 for(const k of Object.keys(__v137Status.hero))__v137Status.hero[k]=0;
 const r=__v137Clean(...args);__v137VisualDrop('hero');if(__v137Status.overlay)__v137Status.overlay.hidden=true;return r;
};
// Elemental impacts can afflict, but DOT pulses cannot recursively reapply their own state.
const __v137ElementHit=_fd;
let __v137ImpactSpell=null;
const __v137SpellImpact=__v92FlightImpact;
__v92FlightImpact=function(f){const previous=__v137ImpactSpell;__v137ImpactSpell=f.spell;try{return __v137SpellImpact(f);}finally{__v137ImpactSpell=previous;}};
_fd=function(c,power,element='physical'){
 const hp=c?.hp,r=__v137ElementHit(c,power,element);
 if(c?.hostile&&!c.dead&&c.hp<hp&&!__v119Effects.periodic){
  const level=__v137ImpactSpell?.level??rpg.level;
  const kind=element==='fire'&&level>=5?'burn':element==='ice'&&level>=10?'freeze':element==='nature'&&level>=20?'poison':null;
  if(kind&&!(__v119Effects.enemies.get(c)?.get(kind)?.remaining>0))__v119Affect(c,kind,{power:Math.max(1,Math.round(power*.12)),color:__v119Afflictions[kind].color});
 }
 return r;
};
function __v137Texture(kind){
 const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const x=canvas.getContext('2d');
 if(kind==='stone'){
  x.fillStyle='#9a9d98';x.fillRect(0,0,128,128);
  for(let i=0;i<650;i++){const a=(i*73)%128,b=(i*37+Math.floor(i/11)*19)%128;x.fillStyle=i%2?'#80877b':'#b3b5ad';x.globalAlpha=.2+(i%4)*.1;x.fillRect(a,b,1+i%4,1+i%3);}
  x.globalAlpha=.6;x.strokeStyle='#676c65';x.lineWidth=1.4;
  for(let i=0;i<6;i++){x.beginPath();x.moveTo(i*27,0);x.lineTo(i*27-13,39);x.lineTo(i*27+9,83);x.lineTo(i*27-4,128);x.stroke();}
 }else if(kind==='burn'){
  const g=x.createLinearGradient(0,12,0,122);g.addColorStop(0,'#ff340000');g.addColorStop(.35,'#ff5419dd');g.addColorStop(.75,'#ffb33b');g.addColorStop(1,'#fff5b0');x.fillStyle=g;
  x.beginPath();x.moveTo(64,5);x.bezierCurveTo(85,48,119,57,106,94);x.bezierCurveTo(98,131,29,130,23,97);x.bezierCurveTo(9,70,52,48,64,5);x.fill();
  x.fillStyle='#fff4b6';x.beginPath();x.moveTo(65,63);x.quadraticCurveTo(98,123,59,121);x.quadraticCurveTo(35,114,65,63);x.fill();
 }else if(kind==='sleep'){
  x.font='bold 86px sans-serif';x.textAlign='center';x.lineWidth=5;x.strokeStyle='#35224f';x.strokeText('Z',64,98);x.fillStyle='#e5d5ff';x.fillText('Z',64,98);
 }else if(kind==='poison'){
  const g=x.createRadialGradient(64,64,5,64,64,58);g.addColorStop(0,'#c4ff8cdd');g.addColorStop(.6,'#7be74888');g.addColorStop(1,'#54c62c00');x.fillStyle=g;x.fillRect(0,0,128,128);x.strokeStyle='#bdff88';x.lineWidth=3;x.beginPath();x.arc(64,64,27,0,Math.PI*2);x.stroke();
 }else{
  x.strokeStyle=kind==='freeze'?'#b9f4ff':'#efb5fb';x.lineWidth=5;x.translate(64,64);
  for(let i=0;i<6;i++){x.rotate(Math.PI/3);x.beginPath();x.moveTo(0,0);x.lineTo(0,50);x.moveTo(0,30);x.lineTo(-13,40);x.moveTo(0,30);x.lineTo(13,40);x.stroke();}
 }
 const texture=new _0.CanvasTexture(canvas);texture.needsUpdate=true;return texture;
}
function __v137RestoreMaterials(v){
 for(const[o,e]of v.materials){if(o.material===e.applied)o.material=e.original;for(const m of Array.isArray(e.applied)?e.applied:[e.applied])m.dispose();}
 v.materials.clear();v.tint=null;
}
function __v137Tint(v,root,kind){
 const tint=['stone','freeze','poison'].includes(kind)?kind:null;
 if(v.tint!==tint||v.root!==root){__v137RestoreMaterials(v);v.tint=tint;v.root=root;}
 if(!tint||!root)return;
 root.traverse(o=>{
  if(!o.isMesh||!o.material||v.materials.get(o)?.applied===o.material)return;
  const make=original=>{
   const m=original.clone();
   if(tint==='stone'){
    if(!__v137Status.stoneTexture)__v137Status.stoneTexture=__v137Texture('stone');
    m.map=__v137Status.stoneTexture;m.vertexColors=false;m.color?.set('#a2a59f');m.emissive?.set('#000000');if('roughness'in m)m.roughness=1;if('metalness'in m)m.metalness=0;
   }else{
    m.color?.lerp(new _0.Color(tint==='freeze'?'#91dfff':'#84cf57'),tint==='freeze'?.72:.48);
    m.emissive?.set(tint==='freeze'?'#163b4a':'#163409');if('emissiveIntensity'in m)m.emissiveIntensity=.18;
    if(tint==='freeze'&&'roughness'in m)m.roughness=.22;
   }
   m.needsUpdate=true;return m;
  };
  const previous=v.materials.get(o);if(previous){for(const m of Array.isArray(previous.applied)?previous.applied:[previous.applied])m.dispose();}
  const original=o.material,applied=Array.isArray(original)?original.map(make):make(original);v.materials.set(o,{original,applied});o.material=applied;
 });
}
function __v137VisualDrop(key){if(key==='hero'&&__aurPlayerAvatar)__aurPlayerAvatar.root.rotation.z=0;const v=__v137Status.visuals.get(key);if(v){__v137RestoreMaterials(v);if(v.shell){v.shell.removeFromParent();v.shell.geometry.dispose();v.shell.material.dispose();}__v137Status.visuals.delete(key);}}
function __v137Visual(key){let v=__v137Status.visuals.get(key);if(!v){v={materials:new Map(),tint:null,root:null,pose:null,shell:null};__v137Status.visuals.set(key,v);}return v;}
function __v137Snapshot(root){const list=[];root.traverse(o=>list.push({o,p:o.position.clone(),q:o.quaternion.clone(),s:o.scale.clone()}));return list;}
function __v137RestorePose(pose){for(const {o,p,q,s}of pose){o.position.copy(p);o.quaternion.copy(q);o.scale.copy(s);}}
function __v137HeroKinds(){
 const a=[];for(const[k,t]of Object.entries(__v137Status.hero))if(t>0)a.push(k);
 if(__v56Status.sleep>0)a.push('sleep');if(_cu.burn>0)a.push('burn');if(_cu.poison>0)a.push('poison');return a;
}
function __v137Batch(kind){
 let b=__v137Status.batches.get(kind);if(b)return b;
 const material=new _0.MeshBasicMaterial({map:__v137Texture(kind),transparent:true,opacity:kind==='burn'?.85:.65,depthWrite:false,side:_0.DoubleSide,toneMapped:false});
 const mesh=new _0.InstancedMesh(new _0.PlaneGeometry(1,1),material,192);mesh.name='Estados · '+kind;mesh.frustumCulled=false;mesh.count=0;_6.add(mesh);b={mesh,count:0};__v137Status.batches.set(kind,b);return b;
}
const __v137Dummy=new _0.Object3D(),__v137Point=new _0.Vector3();
function __v137Particles(kind,p,height,width,seed){
 if(kind==='stone')return;const b=__v137Batch(kind),count=kind==='burn'?8:kind==='poison'?6:3,t=__v137Status.clock;
 for(let i=0;i<count&&b.count<192;i++){
  const phase=(t*(kind==='burn'?.85:.4)+i/count+seed)%1,angle=i*2.399+seed+t*.25;
  const radius=kind==='sleep'?.25:width*(kind==='burn'?.38:.55);
  __v137Dummy.position.set(p.x+Math.cos(angle)*radius,p.y+(kind==='sleep'?height:height*.15)+phase*(kind==='sleep'?1.4:height*.8),p.z+Math.sin(angle)*radius);
  __v137Dummy.quaternion.copy(_7.quaternion);const size=kind==='burn'?width*.5*(1-phase*.5):kind==='sleep'?.55+phase*.2:width*.24;
  __v137Dummy.scale.set(size,kind==='burn'?size*1.9:size,1);__v137Dummy.updateMatrix();b.mesh.setMatrixAt(b.count++,__v137Dummy.matrix);
 }
}
function __v137Ice(v,p,height,width,on){
 if(on&&!v.shell){v.shell=new _0.Mesh(new _0.IcosahedronGeometry(1,0),new _0.MeshBasicMaterial({color:'#a5e9ff',transparent:true,opacity:.18,depthWrite:false,wireframe:true}));v.shell.name='Prisión de hielo';_6.add(v.shell);}
 if(v.shell){v.shell.visible=on;if(on){v.shell.position.set(p.x,p.y+height*.5,p.z);v.shell.scale.set(width*.8,height*.7,width*.8);}}
}
function __v137Overlay(kinds){
 const s=__v137Status;if(!s.overlay){const e=document.createElement('div');e.id='ag-status137-view';e.setAttribute('aria-hidden','true');e.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:6;opacity:.16;';_4.append(e);s.overlay=e;}
 const on=__aurCameraMode!=='third'&&kinds.length>0&&_u&&!_74();s.overlay.hidden=!on;if(!on)return;
 const colors={stone:'#aeb2a5',freeze:'#99e7ff',burn:'#ff8b31',poison:'#8fe759',sleep:'#bba0e6',confusion:'#e8a4e9'};
 s.overlay.dataset.states=kinds.join(' ');s.overlay.style.boxShadow='inset 0 0 55px 18px '+colors[kinds[0]];
 s.overlay.style.background=kinds.map((k,i)=>'radial-gradient(ellipse at '+(i%2?100:0)+'% 100%, '+colors[k]+' 0%, transparent 33%)').join(',');
 if(s.overlayKinds!==kinds.join('|')){
  s.overlayKinds=kinds.join('|');s.overlay.replaceChildren();
  for(const kind of kinds){
   const texture=__v137Texture(kind),url=texture.image.toDataURL();texture.dispose();
   for(let i=0;i<3;i++){const cue=document.createElement('span');cue.style.cssText='position:absolute;width:72px;height:96px;background:center/contain no-repeat;'+(i%2?'right:2%;':'left:2%;')+(kind==='sleep'?'top:12%;':'bottom:'+i*12+'%;');cue.style.backgroundImage='url('+url+')';s.overlay.append(cue);}
  }
 }
}
function __v137VisualTick(){
 for(const b of __v137Status.batches.values()){b.count=0;b.mesh.count=0;}
 const live=new Set(),candidates=[...__v119Effects.enemies].filter(([c])=>!c.dead&&c.g.visible&&__v92SameFloor(c)).sort(([a],[b])=>a.g.position.distanceToSquared(_14)-b.g.position.distanceToSquared(_14)).slice(0,23);
 for(const[c,effects]of candidates){
  const kinds=[...effects].filter(([,e])=>e.remaining>0).map(([kind])=>kind);if(!kinds.length)continue;
  live.add(c);const v=__v137Visual(c),locked=kinds.includes('stone')||kinds.includes('freeze'),asleep=kinds.includes('sleep');
  if(locked){if(!v.pose)v.pose=__v137Snapshot(c.g);__v137RestorePose(v.pose);}else v.pose=null;
  if(asleep&&!locked){c.g.rotation.z=.16;for(const leg of c.legs||[])leg.rotation.x=-.45;}
  const tint=kinds.find(k=>k==='stone')||kinds.find(k=>k==='freeze')||kinds.find(k=>k==='poison');__v137Tint(v,c.g,tint);
  const height=Math.max(1.4,Math.min(9,(c.spec.size||1)*Math.abs(c.g.scale.y)*3)),width=Math.max(.8,Math.min(5,height*.48));
  for(const kind of kinds)__v137Particles(kind,c.g.position,height,width,c.phase||0);
  __v137Ice(v,c.g.position,height,width,kinds.includes('freeze')&&!kinds.includes('stone'));
 }
 const hero=__v137HeroKinds(),a=__aurPlayerAvatar;__v137Overlay(hero);
 if(hero.length&&_u&&__aurCameraMode==='third'&&a?.root.visible){
  live.add('hero');const v=__v137Visual('hero'),locked=hero.includes('stone')||hero.includes('freeze');
  if(locked){if(!v.pose)v.pose=__v137Snapshot(a.root);__v137RestorePose(v.pose);}else v.pose=null;
  if(hero.includes('sleep')&&!locked){a.root.rotation.z=.16;a.leftArm.rotation.x=a.rightArm.rotation.x=.3;a.leftLeg.rotation.x=a.rightLeg.rotation.x=-.2;}
  const tint=hero.includes('stone')?'stone':hero.includes('freeze')?'freeze':hero.includes('poison')?'poison':null;__v137Tint(v,a.root,tint);
  __v137Point.set(_14.x,_14.y-1.85,_14.z);for(const kind of hero)__v137Particles(kind,__v137Point,2.5,1.15,.2);__v137Ice(v,__v137Point,2.5,1.15,hero.includes('freeze')&&!hero.includes('stone'));
 }
 for(const key of __v137Status.visuals.keys())if(!live.has(key))__v137VisualDrop(key);
 for(const b of __v137Status.batches.values()){b.mesh.count=b.count;if(b.count)b.mesh.instanceMatrix.needsUpdate=true;}
}
const __v137EnemyPose=__v124EnemyPose;__v124EnemyPose=function(c,dt){if(__v119Disabled(c))return;return __v137EnemyPose(c,dt);};
// Run after all movement/animation and before the real frame is rendered.
const __v137Visibility=__v93Visibility;__v93Visibility=function(...args){const r=__v137Visibility(...args);if(_u)__v137VisualTick();return r;};
function __v137VisualClear(){for(const key of __v137Status.visuals.keys())__v137VisualDrop(key);for(const b of __v137Status.batches.values())b.mesh.count=0;if(__v137Status.overlay)__v137Status.overlay.hidden=true;}
const __v137StatusWorld=_bj;_bj=function(...args){__v137VisualClear();for(const k of Object.keys(__v137Status.hero))__v137Status.hero[k]=0;return __v137StatusWorld(...args);};
const __v137StatusLoad=_dn;_dn=function(...args){__v137VisualClear();for(const k of Object.keys(__v137Status.hero))__v137Status.hero[k]=0;return __v137StatusLoad(...args);};
const __v137StatusDeath=_fh;_fh=function(...args){__v56ClearStatuses(false);__v137VisualClear();return __v137StatusDeath(...args);};
window.__AURELIA_STATUS137__={audit:()=>({hero:{...__v137Status.hero},heroKinds:__v137HeroKinds(),disabled:__v137HeroDisabled(),visuals:__v137Status.visuals.size,particles:[...__v137Status.batches].map(([kind,b])=>({kind,count:b.mesh.count})),firstPersonOpacity:.16,freezeSeconds:10,stoneSeconds:10,maxVisualActors:24})};
