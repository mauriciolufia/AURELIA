/* Per-object ownership survives the sector merger; scenery keeps its original meshes and textures. */
const __v108Scenery={objects:new Map(),grid:new Map(),broken:new Set(),ignore:null,scope:null,building:false};
function __v108SceneryObject(kind,x,y,z,r=.6){
 const id=kind+':'+x.toFixed(3)+':'+z.toFixed(3),s=__v108Scenery;let o=s.objects.get(id);
 if(!o){o={id,kind,x,y,z,r,h:kind==='rock'?Math.max(2,r*2):8,hp:kind==='rock'?20:15,maxHp:kind==='rock'?20:15,records:[],instances:[],meshes:[],colliders:[]};s.objects.set(id,o);const key=Math.floor(x/16)+','+Math.floor(z/16);if(!s.grid.has(key))s.grid.set(key,[]);s.grid.get(key).push(o);}return o;
}
function __v108SceneryPart(mesh,items,geo){
 mesh.userData.destruct108=items.map(p=>{const kind=p.rock108?'rock':'tree';const o=p.__v108Owner??=__v108SceneryObject(kind,p.x,p.y,p.z,kind==='rock'?p.s:.54*p.s);return o.id;});
}
function __v108SceneryMeshId(mesh){for(let g=mesh;g&&g!==_8;g=g.parent)if(g.userData.tree108){const p=g.getWorldPosition(new _0.Vector3());return __v108SceneryObject('tree',p.x,p.y,p.z,.3).id;}return null;}
const __v108Capture=_bb;_bb=function(geo,material,matrix,castShadow,id){
 __v108LandTagGeometry(geo,material);const p=new _0.Vector3().setFromMatrixPosition(matrix),bucket=_b7(_b6(p.x,p.z)),before=bucket.records.length,r=__v108Capture(geo,material,matrix,castShadow);
 if(id&&bucket.records.length>before){const rec=bucket.records.at(-1);rec.destruct108=id;__v108Scenery.objects.get(id)?.records.push({key:bucket.key,rec});}return r;
};
function __v108OwnInstance(o,mesh,index){const matrix=new _0.Matrix4();mesh.getMatrixAt(index,matrix);o.instances.push({mesh,index,matrix});}
// Older candy groves use separate instanced stems and crowns at the same coordinates.
const __v108CandyDecor=__aurCandyDecor;__aurCandyDecor=function(...args){const old=__v108Scenery.scope;__v108Scenery.scope='candy';try{return __v108CandyDecor(...args);}finally{__v108Scenery.scope=old;}};
const __v108Instanced=__aurInstanced;__aurInstanced=function(geo,material,entries,parent,...args){const m=__v108Instanced(geo,material,entries,parent,...args);if(m&&__v108Scenery.scope==='candy')entries.forEach((p,i)=>{const o=__v108SceneryObject('tree',p.x,_2r(p.x,p.z),p.z,.3);__v108OwnInstance(o,m,i);});return m;};
function __v108DirectGroves(){
 // The detailed candy grove and corsair palms expose their exact instance owners.
 const candy=__v107WorldState.treeRoot;if(candy)for(const mesh of candy.children)for(const [i,id]of(mesh.userData.destruct108||[]).entries())__v108OwnInstance(__v108Scenery.objects.get(id),mesh,i);
 const palms=__v102Corsair.root?.children.find(m=>m.isInstancedMesh&&m.userData.destruct108);if(palms)for(const[i,id]of palms.userData.destruct108.entries())__v108OwnInstance(__v108Scenery.objects.get(id),palms,i);
 // Red island palms are four complete trees, with seven leaves belonging to each trunk.
 const red=__v88Island.root,parts=red?.children.filter(m=>m.isInstancedMesh)||[];
 if(parts.length>=2){const matrix=new _0.Matrix4(),p=new _0.Vector3();for(let i=0;i<parts[0].count;i++){parts[0].getMatrixAt(i,matrix);p.setFromMatrixPosition(matrix);const o=__v108SceneryObject('tree',p.x,_2r(p.x,p.z),p.z,.78);__v108OwnInstance(o,parts[0],i);for(let j=0;j<7;j++)__v108OwnInstance(o,parts[1],i*7+j);}}
 // Explicitly tagged, unbatched candy trees retain their whole original model.
 for(const g of _8.children)if(g.userData.tree108){const p=g.position,o=__v108SceneryObject('tree',p.x,p.y,p.z,.3);o.meshes.push(g);}
 for(const c of _q){if(!['tree','candyTree','cactus'].includes(c.kind)&&!['candyTree107','palm102','redPalm88'].includes(c.tag))continue;
  const o=__v108Scenery.objects.get('tree:'+c.x.toFixed(3)+':'+c.z.toFixed(3));if(o){c.destruct108=o.id;o.colliders.push(c);o.r=Math.max(o.r,c.r||c.w||.3);o.h=Math.max(o.h,(c.top??o.y+8)-o.y);}
 }
}
function __v108ApplyScenery(o,rebuild=true){
 for(const {mesh,index,matrix}of o.instances){mesh.setMatrixAt(index,__v108Scenery.broken.has(o.id)?new _0.Matrix4().makeScale(0,0,0):matrix);mesh.instanceMatrix.needsUpdate=true;}
 for(const mesh of o.meshes)mesh.visible=!__v108Scenery.broken.has(o.id);
 if(rebuild){const keys=new Set(o.records.map(r=>r.key));for(const key of keys)if(_az.has(key)){_be(key);_bd(_b7(key));}}
}
function __v108SceneryHit(o,attack){
 if(!o||__v108Scenery.broken.has(o.id))return false;o.hp=Math.max(0,o.hp-attack);
 if(o.hp){__v68Burst(new _0.Vector3(o.x,o.y+1,o.z),o.kind==='tree'?'#ceac76':'#b8b2ac','hit',.6,.2);return true;}
 __v108Scenery.broken.add(o.id);__v108ApplyScenery(o);__v68Burst(new _0.Vector3(o.x,o.y+1,o.z),o.kind==='tree'?'#b39a65':'#9f989d','hit',1.5,.5);_6s('hit');_3a(o.kind==='tree'?'Árbol destruido.':'Roca destruida.');_iv();return true;
}
const __v108SceneryCollider=__v73Hit;__v73Hit=function(c,...args){if(c.destruct108&&(c.destruct108===__v108Scenery.ignore||__v108Scenery.broken.has(c.destruct108)))return false;return __v108SceneryCollider(c,...args);};
const __v108Sword=_8e;_8e=function(){const result=__v108Sword();if(!_u||_74()||__v75At()||__v104Ship.active)return result;
 const st=_g4(),reach=Math.min(st.reach,7),ix=Math.floor(_14.x/16),iz=Math.floor(_14.z/16),candidates=[];
 for(let x=ix-1;x<=ix+1;x++)for(let z=iz-1;z<=iz+1;z++)for(const o of __v108Scenery.grid.get(x+','+z)||[]){if(__v108Scenery.broken.has(o.id))continue;const dx=o.x-_14.x,dz=o.z-_14.z,d=Math.hypot(dx,dz),r=Math.min(o.r,3);if(d>reach+r||(-Math.sin(yaw)*dx-Math.cos(yaw)*dz)/Math.max(d,.01)<.45||_14.y<o.y-.3||_14.y>o.y+o.h+1.85)continue;candidates.push({o,d,r});}
 candidates.sort((a,b)=>a.d-a.r-(b.d-b.r));for(const {o,d,r}of candidates){__v108Scenery.ignore=o.id;let clear;try{const f=Math.max(0,d-r-.2)/Math.max(.01,d);clear=__v83Ray(_14.x,_14.z,_14.x+(o.x-_14.x)*f,_14.z+(o.z-_14.z)*f,_14.y);}finally{__v108Scenery.ignore=null;}if(clear){__v108SceneryHit(o,st.atk);break;}}return result;
};
const __v108SceneryWorld=_bj;_bj=function(...args){const s=__v108Scenery;s.objects.clear();s.grid.clear();s.broken.clear();const r=__v108SceneryWorld(...args);__v108DirectGroves();return r;};
const __v108SceneryWrite=__v96WriteSave;__v96WriteSave=function(value){const raw=JSON.parse(value);raw.scenery108=[...__v108Scenery.broken];return __v108SceneryWrite(JSON.stringify(raw));};
const __v108SceneryLoad=_dn;_dn=function(raw){const r=__v108SceneryLoad(raw),s=__v108Scenery,was=s.broken;s.broken=new Set((Array.isArray(raw?.scenery108)?raw.scenery108:[]).filter(id=>typeof id==='string'&&s.objects.has(id)));
 const sectors=new Set();for(const id of new Set([...was,...s.broken])){const o=s.objects.get(id);if(!o)continue;o.hp=o.maxHp;__v108ApplyScenery(o,false);for(const rec of o.records)sectors.add(rec.key);}for(const key of sectors)if(_az.has(key)){_be(key);_bd(_b7(key));}return r;};
window.__AURELIA_DESTRUCTION108__={audit:()=>({trees:[...__v108Scenery.objects.values()].filter(o=>o.kind==='tree').length,rocks:[...__v108Scenery.objects.values()].filter(o=>o.kind==='rock').length,destroyed:__v108Scenery.broken.size})};
