/* Exact technique counts, desert quicksand and a shared candy-tree grove. */
const __v107WorldState={choosing:0,trees:[],treeRoot:null};
function __v107SkillKey(s){return[s.type,s.element||'',s.status||''].join(':');}
function __v107Limit(c){
 if(!c?.hostile||__v99Life.building||__v107WorldState.choosing)return;
 if(c.__v88Raid&&c.__v107RaidKit!==c.__v68Skills){c.__v68Skills=[{name:'Zarpazo infernal',type:'charge',element:'physical',radius:3.8,range:4,windup:1.9,power:1,color:'#ef9f70'},{...__v68Arts.fire,name:'Escupitajo infernal',power:.85},{name:'Onda de garras',type:'ring',element:'earth',radius:5,range:5,windup:1.9,power:.9,status:'stun',color:'#ef9f70'}];c.art=c.__v68Skills[0];c.__v107RaidKit=c.__v68Skills;}
 const count=c.level<=40?2:3,list=c.__v68Skills||[];
 if(list.length===count&&new Set(list.map(__v107SkillKey)).size===count&&list.includes(c.art)){c.__v99Limited=list;return;}
 const indoor=__v85Indoor(c),scale=1.575*(indoor?1/3:1),candidates=list.length?[...list]:c.art?[c.art]:[];
 if(c.boss==='azrakh')candidates.push({name:'Pulso sísmico imperial',type:'ring',element:'earth',radius:12,range:12,windup:1.1,power:1.5,status:'stun',color:'#efbb78'});
 for(const key of [...__v68Kit(c.spec?.id||''),'earth','rage','fire','ice']){
  const s=__v68Arts[key];if(s)candidates.push({...s,range:s.range*scale,radius:s.radius*scale,v68:true});
 }
 const keep=[],seen=new Set();for(const s of candidates){if(!s?.type||seen.has(__v107SkillKey(s)))continue;keep.push(s);seen.add(__v107SkillKey(s));if(keep.length===count)break;}
 if(c.boss){const attacks=keep.filter(s=>s.power>0&&!/heal|buff|guard/.test(s.type)),max=Math.max(...attacks.map(s=>s.power));for(const s of attacks)s.power=s.power===max?1.5:Math.min(1.4,s.power);}
 c.__v68Skills=keep;c.__v99Limited=keep;if(!keep.includes(c.art))c.art=keep[0];
 if(indoor){c.__v85IndoorSkills=keep;c.__v85OutdoorSkills=keep.map(s=>({...s,range:s.range*3,radius:s.radius*3}));}
 const brain=__v98AI.enemy.get(c);if(brain){brain.skill=null;brain.skillAt=0;}
}
__v99Limit=__v107Limit;
const __v107Choose=__v68Choose;__v68Choose=function(c){__v107Limit(c);__v107WorldState.choosing++;try{return __v107Choose(c);}finally{__v107WorldState.choosing--;}};
const __v107EmperorSetup=__v94EmperorSetup;__v94EmperorSetup=function(...args){const r=__v107EmperorSetup(...args);if(__v94Emperor.boss)__v107Limit(__v94Emperor.boss);return r;};
const __v107EmperorRelease=__v94EmperorRelease;__v94EmperorRelease=function(kind){
 if(kind!=='pulse')return __v107EmperorRelease(kind);const e=__v94Emperor,c=e.boss,p=c?.g.position;if(!p)return;
 e.audit.pulse=(e.audit.pulse||0)+1;__v68Burst(p,'#efbb78','impact',12,.6);
 if(Math.hypot(_14.x-p.x,_14.z-p.z)<12&&__v92LOS(c))_d0(c,1.5,'stun');
};
function __v107RaidPulse(r){
 const p=r.c.g.position,scale=__v118Range(r.c);__v88Spark(p,'#ef9f70',2*scale);for(const d of __v88War.fighters)if(!d.n.__v88Dead&&!d.wounded&&Math.hypot(d.n.x-p.x,d.n.z-p.z)<5*scale&&_5w(p.x,p.z,d.n.x,d.n.z,p.y+1.5))__v88HitNPC(d,.9,r);
 if(Math.hypot(_14.x-p.x,_14.z-p.z)<5*scale&&__v92LOS(r.c))_d0(r.c,.9,'stun');
}
function __v107ConformSand(){
 for(const f of __v95Sand.fields)for(const m of f.g.children){
  if(!m.isMesh||!m.geometry?.attributes.position)continue;const g=m.geometry.clone(),p=g.attributes.position;
  for(let i=0;i<p.count;i++){const x=f.x+p.getX(i)*m.scale.x,z=f.z-p.getY(i)*m.scale.y;p.setZ(i,_2r(x,z)-f.y);}
  p.needsUpdate=true;g.computeVertexNormals();m.geometry=g;
 }
}
const __v107SandBuild=__v95SandBuild;__v95SandBuild=function(...args){const r=__v107SandBuild(...args);__v107ConformSand();return r;};
const __v107SandTick=__v95SandTick;__v95SandTick=function(dt){const r=__v107SandTick(dt);for(const f of __v95Sand.fields)f.disk.rotation.z=0;return r;};
function __v107CandyTexture(){
 const c=document.createElement('canvas');c.width=c.height=__v60Mobile?512:1024;const x=c.getContext('2d'),s=c.width;
 x.fillStyle='#fff1de';x.fillRect(0,0,s,s);x.fillStyle='#e46e9b';for(let i=-8;i<16;i++){x.beginPath();x.moveTo(i*s/8,0);x.lineTo(i*s/8+s/16,0);x.lineTo(i*s/8+s+s/16,s);x.lineTo(i*s/8+s,s);x.fill();}
 const g=x.createLinearGradient(0,0,s,0);g.addColorStop(0,'#69456340');g.addColorStop(.42,'#ffffff55');g.addColorStop(1,'#69456340');x.fillStyle=g;x.fillRect(0,0,s,s);
 const t=new _0.CanvasTexture(c);t.colorSpace=_0.SRGBColorSpace;t.wrapS=t.wrapT=_0.RepeatWrapping;t.anisotropy=Math.min(8,_5.capabilities?.getMaxAnisotropy?.()||1);return t;
}
function __v107CandyTrees(){
 const s=__v107WorldState;s.trees=[];const random=rng(_f+107117),city=_1h[_hb];
 const road=(x,z)=>_1q.some(line=>line.some((p,i)=>{if(!i)return false;const a=line[i-1],dx=p[0]-a[0],dz=p[1]-a[1],t=_18(((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz||1),0,1);return Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t)<8;}));
 for(let i=0;i<6000&&s.trees.length<72;i++){
  const angle=random()*PI*2,r=70+random()*(_ha.r-100),x=_ha.x+Math.cos(angle)*r,z=_ha.z+Math.sin(angle)*r,y=_2r(x,z);
  if(_he(x,z).id!=='candy'||y<1||!Number.isFinite(y)||Math.hypot(x-city.x,z-city.z)<city.radius+24||_1h.some(p=>Math.max(Math.abs(x-p.x),Math.abs(z-p.z))<(p.radius||30)+14)||road(x,z)||_i7(x,z,y+1.85)||s.trees.some(p=>Math.hypot(p.x-x,p.z-z)<8)||_m.some(c=>!c.dead&&Math.hypot(c.g.position.x-x,c.g.position.z-z)<4))continue;
  s.trees.push({x,y,z,scale:.85+random()*.5,kind:s.trees.length%2,palette:s.trees.length%3});
 }
 const root=new _0.Group();root.name='Arboleda de caramelo · bastones y algodón de azúcar';root.userData.cull93={x:_ha.x,z:_ha.z,r:_ha.r+200};_8.add(root);s.treeRoot=root;__v93.cullGroups.push(root);
 const trunk=__v97ToonMaterial(new _0.MeshStandardMaterial({color:'#fff4eb',roughness:.65}));trunk.map=__v107CandyTexture();trunk.needsUpdate=true;
 const batches=new Map(),m=new _0.Matrix4(),q=new _0.Quaternion(),v=new _0.Vector3(),scale=new _0.Vector3();
 function add(key,geo,material,p,x,y,z,sx,sy,sz){if(!batches.has(key))batches.set(key,{geo,material,items:[]});v.set(p.x+x*p.scale,p.y+y*p.scale,p.z+z*p.scale);scale.set(sx*p.scale,sy*p.scale,sz*p.scale);m.compose(v,q,scale);batches.get(key).items.push(m.clone());(batches.get(key).owners??=[]).push(__v108SceneryObject('tree',p.x,p.y,p.z,.38*p.scale).id);}
 const stem=new _0.CylinderGeometry(.23,.34,4.4,12),crown=new _0.SphereGeometry(1,16,12),lollipop=new _0.TorusGeometry(1,.27,10,28),colors=['#f789c0','#c29aef','#f8d17e'],mats=colors.map(color=>__v97ToonMaterial(new _0.MeshStandardMaterial({color,roughness:.8})));
 for(const p of s.trees){add('stem',stem,trunk,p,0,2.2,0,1,1,1);if(p.kind===0){for(let i=0;i<3;i++)add('cotton'+p.palette,crown,mats[p.palette],p,(i-1)*.65,4.7+(i===1?.65:0),i%2*.25,1.15,1.05,1);}
  else{add('sweet'+p.palette,crown,mats[p.palette],p,0,5,0,1.4,1.4,.48);add('ring'+p.palette,lollipop,trunk,p,0,5,-.5,1,1,.65);}
  _q.push({x:p.x,z:p.z,r:.38*p.scale,bottom:p.y,top:p.y+4.4*p.scale,tag:'candyTree107'});
 }
 for(const b of batches.values()){const mesh=new _0.InstancedMesh(b.geo,b.material,b.items.length);b.items.forEach((m,i)=>mesh.setMatrixAt(i,m));mesh.userData.destruct108=b.owners;mesh.receiveShadow=true;mesh.castShadow=false;mesh.computeBoundingSphere?.();root.add(mesh);}
}
function __v107ClearTrees(){const root=__v107WorldState.treeRoot;if(!root)return;const geos=new Set(),mats=new Set(),maps=new Set();root.traverse(o=>{if(o.geometry)geos.add(o.geometry);if(o.material)mats.add(o.material);});for(const m of mats){if(m.map)maps.add(m.map);m.dispose();}for(const g of geos)g.dispose();for(const t of maps)t.dispose();root.removeFromParent();__v107WorldState.treeRoot=null;}
const __v107SystemsWorld=_bj;_bj=function(...args){__v107ClearTrees();const r=__v107SystemsWorld(...args);for(const c of _m)if(c.hostile)__v107Limit(c);__v107CandyTrees();return r;};
const __v107Register=_cp;_cp=function(owner,...args){const r=__v107Register(owner,...args);if(owner?.hostile)__v107Limit(owner);return r;};
const __v107SystemsLoad=_dn;_dn=function(...args){const r=__v107SystemsLoad(...args);for(const c of _m)if(c.hostile)__v107Limit(c);return r;};
window.__AURELIA_WORLD107__={audit:()=>({trees:__v107WorldState.trees.length,treeDrawCalls:__v107WorldState.treeRoot?.children.length||0,quicksand:__v95Sand.fields.length,earlyTechniques:2,advancedTechniques:3})};
