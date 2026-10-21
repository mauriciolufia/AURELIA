/* Shared artwork, physical enclosure and bounded AI improvements. */
const __v97={enclosed:0,textureBytesSaved:0,models:0,effects:[],pool:null,threats:new Map(),safeDecisions:new WeakMap()};

// A rounded shared primitive improves silhouettes without one geometry per prop.
const __v97Bevel=new _2.BoxGeometry(1,1,1,2,2,2);
{
 const p=__v97Bevel.attributes.position,inner=new _0.Vector3(),v=new _0.Vector3();
 for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);inner.copy(v).clampScalar(-.40,.40);v.sub(inner).normalize().multiplyScalar(.10).add(inner);p.setXYZ(i,v.x,v.y,v.z);}
 __v97Bevel.computeVertexNormals();__v66Primitives.set('bevelfalse',__v97Bevel.toNonIndexed());
 // Keep the thousands of small actor details on their inexpensive base geometry.
 __v66Primitives.set('boxfalse',new _2.BoxGeometry(1,1,1).toNonIndexed());
 __v66Primitives.set('spheretrue',new _2.SphereGeometry(1,16,12).toNonIndexed());__v66Primitives.set('beveltrue',__v97Bevel.toNonIndexed());__v66Cache.clear();
}
// Five broad light bands keep painted colors readable in shadow.
__v66Ramp.image.data=new Uint8Array([82,128,174,219,255]);__v66Ramp.image.width=5;__v66Ramp.needsUpdate=true;
const __v97ToonMaterials=new WeakMap(),__v97PaintedMaps=new Map();
function __v97ToonMaterial(m){
 if(!m||m.transparent||m.isShaderMaterial||m.blending===_0.AdditiveBlending)return m;
 if(m.isMeshToonMaterial){m.gradientMap=__v66Ramp;return m;}
 if(__v97ToonMaterials.has(m))return __v97ToonMaterials.get(m);
 const toon=new _0.MeshToonMaterial({color:m.color||0xffffff,emissive:m.emissive||0,emissiveIntensity:m.emissiveIntensity??1,side:m.side,gradientMap:__v66Ramp,vertexColors:m.vertexColors});
 for(const key of['map','alphaMap','bumpMap','bumpScale','normalMap','normalMapType','normalScale','aoMap','aoMapIntensity','lightMap','lightMapIntensity','emissiveMap','depthTest','depthWrite','alphaTest','polygonOffset','polygonOffsetFactor','polygonOffsetUnits','flatShading','fog','toneMapped'])if(m[key]!==undefined)toon[key]=m[key];
 toon.name=m.name;__v97ToonMaterials.set(m,toon);return toon;
}
function __v97PaintedIce(role){
 if(__v97PaintedMaps.has(role))return __v97PaintedMaps.get(role);
 const c=document.createElement('canvas'),size=__v60Mobile?512:1024;c.width=c.height=size;const ctx=c.getContext('2d');ctx.scale(size/256,size/256);const floor=role==='floor',roof=role==='roof',height=floor?128:64,width=128;
 ctx.fillStyle=roof?'#527997':floor?'#84b4c6':'#75a1b8';ctx.fillRect(0,0,256,256);
 for(let row=0;row<256/height;row++)for(let col=-1;col<3;col++){
  const x=col*width+(floor?0:row%2*64),y=row*height,gradient=ctx.createLinearGradient(x,y,x+width,y+height);
  gradient.addColorStop(0,roof?'#86afc5':floor?'#c3e4e8':'#b9dce5');gradient.addColorStop(.65,roof?'#719ab6':floor?'#b6d8e0':'#a5cbd9');gradient.addColorStop(1,roof?'#5b83a2':floor?'#a6ccd9':'#92b9cc');
  ctx.fillStyle=gradient;ctx.fillRect(x+3,y+3,width-6,height-6);ctx.strokeStyle=roof?'#b1d3df':'#e4f6f2';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x+8,y+height-10);ctx.lineTo(x+8,y+8);ctx.lineTo(x+width-9,y+8);ctx.stroke();
  ctx.strokeStyle='#6598b0';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+width-8,y+13);ctx.lineTo(x+width-8,y+height-8);ctx.lineTo(x+14,y+height-8);ctx.stroke();
  // Broad brushwork preserves the cartoon design underneath fine frost detail.
  ctx.strokeStyle='#e5f7f327';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(x+19,y+height*.55);ctx.lineTo(x+width*.65,y+height*.4);ctx.stroke();
 }
 ctx.setTransform(1,0,0,1,0,0);__v98SurfaceDetail(c,'ice',role);
 const tex=new _0.CanvasTexture(c);tex.colorSpace=_0.SRGBColorSpace;tex.wrapS=tex.wrapT=_0.RepeatWrapping;tex.anisotropy=Math.min(__v60Mobile?4:8,_5.capabilities?.getMaxAnisotropy?.()||1);tex.name='Hielo detallado 98 · '+role;__v97PaintedMaps.set(role,tex);return tex;
}
const __v97TowerMaterial=__v94Mat;
__v94Mat=function(t,role){const m=__v97ToonMaterial(__v97TowerMaterial(t,role));if(t.id==='ice'||t.id==='polar95')m.map=__v97PaintedIce(role);return m;};
const __v97ArchitectureMaterial=__v85Mat;__v85Mat=function(...args){const m=__v97ToonMaterial(__v97ArchitectureMaterial(...args));if(m.map&&!m.bumpMap){m.bumpMap=m.map;m.bumpScale=args[1]==='floor'?.018:.028;}return m;};
function __v97Model(g,plan){const shaped=plan.map(p=>p[0]==='box'&&Math.min(p[5],p[6],p[7])>.3&&Math.max(p[5],p[6],p[7])>1?['bevel',...p.slice(1)]:p),m=__v66Attach(g,shaped,true);if(m){__v98TextureModel(m,shaped);m.name='Modelo caricaturesco detallado 98';__v97.models++;}return m;}
function __v97ClearBody(o){for(const c of [...o.g.children])if(c.isMesh&&c!==o.crystal)c.removeFromParent();}
const __v97Barrel=__v75Barrel;
__v75Barrel=function(a,p,i){const n=__v75.objects.length,result=__v97Barrel(a,p,i),o=__v75.objects[n];if(!o||o.type!=='barrel')return result;__v97ClearBody(o);const plan=[];
 for(let k=0;k<12;k++){const t=k*Math.PI/6,x=Math.sin(t),z=Math.cos(t);plan.push(['box',k%2?'#b7824f':'#9c683e',x*.63,.82,z*.63,.32,1.48,.22,0,t,0]);for(const y of [.25,1.28])plan.push(['box','#465c69',x*.72,y,z*.72,.39,.15,.12,0,t,0],['gem','#b7c5c7',x*.79,y,z*.79,.045,.045,.045]);}
 plan.push(['sphere','#d5aa71',0,1.58,0,.67,.045,.67],['box','#70492d',0,1.64,0,1.1,.06,.08]);__v97Model(o.g,plan);return result;};
const __v97Fountain=__v75Fountain;
__v75Fountain=function(...args){const n=__v75.objects.length,result=__v97Fountain(...args),o=__v75.objects[n];if(!o||o.type!=='fountain')return result;__v97ClearBody(o);const plan=[['sphere','#587587',0,.25,0,1.65,.28,1.65],['sphere','#a4c4d2',0,.52,0,1.5,.22,1.5],['sphere','#4ab8d5',0,.69,0,1.30,.06,1.30],['cone','#8caab9',0,1.2,0,.32,1.45,.32],['sphere','#e1f2ee',0,1.92,0,.72,.12,.72],['gem','#78e4ed',0,2.2,0,.26,.42,.26]];
 for(let i=0;i<8;i++){const t=i*Math.PI/4;plan.push(['box','#d4e1db',Math.sin(t)*1.42,.66,Math.cos(t)*1.42,.60,.16,.26,0,t,0],['sphere','#79d4e2',Math.sin(t)*.48,1.25,Math.cos(t)*.48,.055,.46,.055]);}__v97Model(o.g,plan);return result;};
const __v97Statue=__v75Statue;
__v75Statue=function(...args){const o=__v97Statue(...args);if(!o)return o;__v97ClearBody(o);__v97Model(o.g,[['box','#40596d',0,.20,0,2.1,.4,2.1],['box','#96acb8',0,.52,0,1.7,.25,1.7],['cone','#718fa4',0,1.65,0,.8,2.15,.65],['box','#b4cbd3',0,2,0,.95,1.1,.52],['gem','#e1e8e2',0,3.08,0,.49,.57,.43],['box','#58758d',0,3.42,.12,1.1,.18,.8],['box','#293f51',-.17,3.12,-.37,.1,.07,.04],['box','#293f51',.17,3.12,-.37,.1,.07,.04],['box','#b8cdd1',-.62,2.1,-.28,.32,.85,.38,0,0,-.35],['box','#b8cdd1',.62,2.1,-.28,.32,.85,.38,0,0,.35],['box','#d2ba7a',0,1.15,-.36,.4,.24,.1]]);return o;};
function __v97RoomFurniture(a,i){
 const pl=a.plan95,[x,z]=pl.centers[i],point=[x+pl.half-2,z+pl.half-2],p=__v83Point(a,point),g=__v75Group(p.x,a.y,p.z);a.groups.push(g);
 const wood=a.biome==='polar'?'#557d99':'#865e42',trim=a.design.accent||'#cbb784',plan=[];
 if(i===7){
  plan.push(['box',wood,0,1.4,0,2.8,2.8,.65]);
  for(const y of [.15,.9,1.7,2.55])plan.push(['box',trim,0,y,-.12,2.9,.14,.85]);
  for(let k=0;k<18;k++)plan.push(['box',['#ba6d67','#5c98a6','#d8bf7b'][k%3],-1.15+(k%6)*.45,.49+Math.floor(k/6)*.82,-.43,.26,.54,.23,0,0,(k%3-1)*.08]);
 }else if(i===4||i===5){
  plan.push(['box',wood,0,1.25,0,2.6,.22,1.5],['box',trim,0,1.38,0,2.45,.07,1.35]);
  for(const x of [-1,1])for(const z of [-.5,.5])plan.push(['box',wood,x,.6,z,.18,1.2,.18]);
  plan.push(['box','#e7d9ab',-.3,1.46,0,.7,.08,.5],['gem','#d9af66',.62,1.58,.15,.18,.24,.18]);
 }else{
  plan.push(['box',wood,0,.68,0,2.4,.2,.9],['box',trim,0,1.15,.35,2.4,.8,.16]);
  for(const x of[-.95,.95])for(const z of[-.28,.28])plan.push(['box',wood,x,.30,z,.2,.6,.2]);
  for(const x of[-.7,0,.7])plan.push(['box','#7a9ea5',x,.83,0,.6,.15,.7]);
 }
 __v97Model(g,plan);pl.props.push({kind:i===7?'archivo':i===4||i===5?'mesa':'banco',point});
 const c={x:p.x,z:p.z,w:1.5,d:i===7?.55:.85,bottom:a.y,top:a.y+(i===7?2.8:1.7),__v83:a.key,tag:'furniture97'};_q.push(c);a.colliders.push(c);
}

function __v97Enclose(a){
 const pl=a.plan95;if(!pl)return;const b=pl.b,segments=[[-b,-b,-b,b],[b,-b,b,b],[-b,b,b,b]];
 if(pl.index===0)segments.push([-b,-b,-4,-b],[4,-b,b,-b]);else segments.push([-b,-b,b,-b]);
 const n=a.groups.length,root=new _0.Group();root.name='Muralla exterior cerrada 97';_8.add(root);
 for(const s of segments)__v84Wall(a,s.slice(0,2),s.slice(2),12,0,.85,'perimeter97');
 for(const g of a.groups.slice(n))root.attach(g);__v85MergeArchitecture({...a,root});a.root.attach(root);a.groups.splice(n);__v97.enclosed++;
}
function __v97TrapFrames(a){
 const plan=[];
 for(const t of a.traps){const x=t.x-a.x,z=t.z-a.z;
  for(const sx of[-1,1])for(const sz of[-1,1]){const px=x+sx*(t.w/2-.15),pz=z+sz*(t.d/2-.15);plan.push(['box','#415b6c',px,.145,pz,.32,.12,.32],['gem','#e9d79a',px,.23,pz,.08,.05,.08]);}
  // Warning pads and moving spikes remain native and keep their exact timing.
 }
 if(plan.length){const g=new _0.Group();g.position.set(a.x,a.y,a.z);_8.add(g);__v97Model(g,plan);a.root.attach(g);}
}
const __v97Area=__v75At;
__v75At=function(x=_14.x,z=_14.z,y=_14.y-1.85){const a=__v97Area(x,z,y);if(!a?.plan95)return a;const p=__v83Local(a,x,z);return a.plan95.walkRects.some(r=>p[0]>=r[0]-.1&&p[0]<=r[2]+.1&&p[1]>=r[1]-.1&&p[1]<=r[3]+.1)?a:null;};
function __v97RepairPosition(){
 if(_v)return false;
 for(const a of __v95Maze.areas){
  if(Math.abs(_14.y-1.85-a.y)>1.1)continue;const p=__v83Local(a,_14.x,_14.z),b=a.plan95.b;
  if(Math.abs(p[0])>=b||Math.abs(p[1])>=b||a.plan95.walkRects.some(r=>p[0]>=r[0]&&p[0]<=r[2]&&p[1]>=r[1]&&p[1]<=r[3]))continue;
  const q=__v83Point(a,a.plan95.centers[0]);if(_i7(q.x,q.z,a.y+1.85))continue;
  _14.set(q.x,a.y+1.85,q.z);_12=0;_13=true;__v93.areaCache=null;__v75.area=null;_b3.set(Infinity,Infinity);_bg(true);_bl();return true;
 }return false;
}
const __v97Restore=_dn;_dn=function(...args){const r=__v97Restore(...args);if(__v97RepairPosition())_3a('Partida recuperada en el vestíbulo de la fortaleza.');return r;};

// Fidelity is preserved. Optimization comes from shared textures and geometry.
function __v97CompressTextures(){for(const [key,tex] of __v67Textures){
 if(!tex.userData.detail98){__v98SurfaceDetail(tex.image,key.split(':')[0],key);tex.userData.detail98=true;tex.needsUpdate=true;}
 tex.anisotropy=Math.min(__v60Mobile?4:8,_5.capabilities?.getMaxAnisotropy?.()||1);
}}
const __v97TextureAudit=window.__AURELIA_TEXTURES67__.audit;
window.__AURELIA_TEXTURES67__.audit=()=>({...__v97TextureAudit(),build:98,resolution:__v60Mobile?512:1024,estimatedTextureMiB:+([...__v67Textures.values()].reduce((n,t)=>n+t.image.width*t.image.height*4*4/3,0)/1048576).toFixed(2)});

// One reusable particle batch replaces per-impact meshes, materials and allocations.
function __v97Pool(){
 if(__v97.pool?.parent)return __v97.pool;
 const count=__v60Mobile?192:384,mat=new _0.MeshBasicMaterial({color:0xffffff,vertexColors:false,transparent:true,opacity:.9,depthWrite:false,depthTest:true,blending:_0.AdditiveBlending,side:_0.DoubleSide});
 const pool=new _0.InstancedMesh(new _2.OctahedronGeometry(1,0),mat,count);pool.count=0;pool.instanceMatrix.setUsage(_0.DynamicDrawUsage);pool.frustumCulled=false;pool.name='Magia elemental agrupada 97';_6.add(pool);__v97.pool=pool;return pool;
}
const __v97FxDummy=new _0.Object3D(),__v97FxColor=new _0.Color();
__v68Burst=function(p,color,kind='impact',radius=1,life=.7,follow=null,direction=null){
 if(!p||!Number.isFinite(p.x+p.y+p.z))return null;
 const cap=__v60Mobile?10:16;if(__v97.effects.length>=cap)__v97.effects.shift();
 const f={p:p.clone(),color,kind,radius:_18(radius,.1,8),life,maxLife:Math.max(.05,life),age:0,follow,direction:direction?.clone()};__v97.effects.push(f);return f;
};
__v68UpdateFx=function(dt){
 const pool=__v97Pool(),capacity=__v60Mobile?192:384;let cursor=0;
 for(let i=__v97.effects.length-1;i>=0;i--){const f=__v97.effects[i];f.age+=Math.max(0,Math.min(dt,.1));if(f.age>=f.maxLife||(f.kind==='trail'&&!f.follow?.parent)){__v97.effects.splice(i,1);continue;}
  const p=f.follow?.parent?f.follow.position:f.p,t=f.age/f.maxLife,heal=/heal|buff/.test(f.kind),cast=f.kind==='cast',n=__v60Mobile?16:24;__v97FxColor.set(f.color||'#c6efff');
  for(let j=0;j<n&&cursor<capacity;j++){
   const k=j/n,a=k*Math.PI*2+f.age*(heal?2:cast?-4:1),r=f.radius*(cast?.6:heal?.7:.2+t*1.4),trail=f.kind==='trail';
   __v97FxDummy.position.set(p.x+Math.cos(a)*r*(trail?.16:1)-(trail?(f.direction?.x||0)*k*3:0),p.y+(heal?((k+f.age*.6)%1)*3:cast?.3+Math.sin(k*Math.PI)*1.1:.2+Math.sin(k*15)*t+t*.9)-(trail?(f.direction?.y||0)*k*3:0),p.z+Math.sin(a)*r*(trail?.16:1)-(trail?(f.direction?.z||0)*k*3:0));
   __v97FxDummy.rotation.set(a,f.age*3,k*3);const size=(heal?.14:cast?.11:.10+.12*(1-k))*(1-t),ice=f.kind==='ice',fire=f.kind==='fire',leaf=f.kind==='nature',storm=f.kind==='storm';
   if(storm)__v97FxDummy.position.y+=Math.sin(j*2+f.age*30)*.45;
   if(fire)__v97FxDummy.position.y+=t*1.8;
   __v97FxDummy.scale.set(size*(leaf?2:1),size*(heal?2.2:ice?3:fire?2.5:leaf?.35:j%3===0?2:1),size*(leaf?.45:1));__v97FxDummy.updateMatrix();pool.setMatrixAt(cursor,__v97FxDummy.matrix);pool.setColorAt(cursor,__v97FxColor);cursor++;
  }
 }
 pool.count=cursor;pool.visible=cursor>0;pool.instanceMatrix.needsUpdate=true;if(pool.instanceColor)pool.instanceColor.needsUpdate=true;
};
__v58Impact=function(spell,pos,factor=1){__v68Burst(pos,spell.color,spell.element||'impact',Math.min(5,2*factor),.7);};
_gc=function(spell,pos,range=3){__v68Burst(pos,spell.color,spell.element==='shield'?'buff':spell.element||'impact',range,.8);};
const __v97ResetEffects=_d9;_d9=function(...args){__v97.effects.length=0;if(__v97.pool){__v97.pool.removeFromParent();__v97.pool.geometry.dispose();__v97.pool.material.dispose();__v97.pool.dispose();__v97.pool=null;}return __v97ResetEffects(...args);};

// Keep tactical destinations on the same navigable floor and out of walls.
const __v97Tactics=__v68Tactics;
function __v97SafeTarget(c,target){
 if(!target)return false;const p=c.g.position,a=c.__v83Area?__v83.areas.find(a=>a.key===c.__v83Area):null,d=Math.hypot(target.x-p.x,target.z-p.z),steps=Math.min(48,Math.max(1,Math.ceil(d/.5)));
 for(let i=1;i<=steps;i++){const t=i/steps,x=p.x+(target.x-p.x)*t,z=p.z+(target.z-p.z)*t;if(a&&!__v83Walkable(a,x,z,.4))return false;const y=a?a.y:_ei(x,z);if(!Number.isFinite(y)||Math.abs(y-p.y)>1.2||_i7(x,z,y+1.85))return false;}return true;
}
__v68Tactics=function(c,d){
 const target=__v97Tactics(c,d);if(!target)return null;const cache=__v97.safeDecisions.get(c);
 if(cache&&cache.target===target&&__v68CombatTime-cache.time<.18)return cache.result;
 let result=__v97SafeTarget(c,target)?target:null;
 if(!result){const p=c.g.position,alternative={x:p.x-(target.z-p.z)*.55,z:p.z+(target.x-p.x)*.55,mode:'reposition'};if(__v97SafeTarget(c,alternative))result=alternative;}
 __v97.safeDecisions.set(c,{target,result,time:__v68CombatTime});return result;
};
const __v97Sense=__v88Sense;
__v88Sense=function(){const r=__v97Sense();__v97.threats.clear();for(const c of __v88Life.threats){const p=c.g.position,key=Math.floor(p.x/24)+','+Math.floor(p.z/24);if(!__v97.threats.has(key))__v97.threats.set(key,[]);__v97.threats.get(key).push(c);}return r;};
function __v97NearestThreat(n){
 const radius=n.age==='child'?28:21,list=[];
 for(let x=Math.floor((n.x-radius)/24);x<=Math.floor((n.x+radius)/24);x++)for(let z=Math.floor((n.z-radius)/24);z<=Math.floor((n.z+radius)/24);z++)for(const c of __v97.threats.get(x+','+z)||[]){const p=c.g.position,d=(p.x-n.x)**2+(p.z-n.z)**2;if(!c.dead&&d<radius*radius&&Math.abs(p.y-n.homeY)<5)list.push({c,d});}
 list.sort((a,b)=>a.d-b.d);for(const {c} of list.slice(0,6)){const p=c.g.position;if(_5w(n.x,n.z,p.x,p.z,n.homeY+1.4))return c;}return null;
}
const __v97Path=_6a;_6a=function(n,target){const pending=__v95.pending.get(n);if(pending&&!pending.done&&Math.hypot(pending.target.x-target.x,pending.target.z-target.z)<.75)return n.nav?.slice(n.navIndex)||[];return __v97Path(n,target);};

const __v97Build=_bj;
_bj=function(...args){__v97.enclosed=0;__v97.models=0;__v97.safeDecisions=new WeakMap();__v97.threats.clear();const result=__v97Build(...args);for(const a of __v95Maze.areas)__v97Enclose(a);for(const a of __v83.areas)__v97TrapFrames(a);__v97CompressTextures();_22();return result;};
window.__AURELIA97__={audit:()=>({build:97,enclosedFloors:__v97.enclosed,textureBytesSaved:__v97.textureBytesSaved,models:__v97.models,activeEffects:__v97.effects.length,effectLimit:__v60Mobile?10:16,particleCapacity:__v60Mobile?192:384,particleDrawCalls:__v97.pool?.visible?1:0})};
