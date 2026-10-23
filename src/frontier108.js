/* One continuous volcanic ridge encloses the combined infernal/volcanic territory. */
const __v108Frontier={segments:[],root:null,grid:new Map(),clock:0,hintAt:0};
function __v108Infernal(x,z){return['demonic','volcano'].includes(_he(x,z).id);}
function __v108FrontierBuild(){
 const state=__v108Frontier;state.segments=[];state.grid.clear();state.root=null;const step=16,limit=_1f,n=Math.ceil(limit*2/step),inside=new Uint8Array(n*n),center=(i)=>-limit+(i+.5)*step;
 for(let j=0;j<n;j++)for(let i=0;i<n;i++)inside[j*n+i]=__v108Infernal(center(i),center(j))?1:0;
 const root=new _0.Group();root.name='Frontera de picos volcánicos · vuelo o teletransportación';root.userData.animated=true;_8.add(root);state.root=root;const peaks=[],bases=[],random=rng(_f+108777),at=(x,z,axis,sign)=>{
  const y=Math.min(_2r(x,z),_2r(x+axis.x*step/2,z+axis.z*step/2),_2r(x-axis.x*step/2,z-axis.z*step/2))-2,h=Math.max(36+random()*13,Math.max(...[-8,-4,0,4,8].flatMap(d=>[-5,0,5].map(e=>_2r(x+(axis.x?e:d),z+(axis.z?e:d)))))+24-y),c={x,z,w:axis.x?5.5:step/2+1,d:axis.z?5.5:step/2+1,bottom:y-12,top:y+h,tag:'frontier108'};_q.push(c);const s={x,z,y,h,axis,sign,c};state.segments.push(s);
  const key=Math.floor(x/32)+','+Math.floor(z/32);if(!state.grid.has(key))state.grid.set(key,[]);state.grid.get(key).push(s);
  bases.push({x,y:y+9,z,sx:c.w*2,sy:18,sz:c.d*2});
  for(let k=0;k<3;k++){const d=(k-1)*step/3,xx=x+(axis.x?0:d),zz=z+(axis.z?0:d),hh=h*(k===1?1:.78+random()*.14);peaks.push({x:xx,y:y+hh/2+7,z:zz,sx:6.8+random()*2,sy:hh,sz:6.8+random()*2,ry:random()*Math.PI,rz:(random()-.5)*.18});}
 };
 for(let j=0;j<n;j++)for(let i=0;i<n;i++){const v=inside[j*n+i];if(i<n-1&&v!==inside[j*n+i+1])at(-limit+(i+1)*step,center(j),{x:1,z:0},v?1:-1);if(j<n-1&&v!==inside[(j+1)*n+i])at(center(i),-limit+(j+1)*step,{x:0,z:1},v?1:-1);}
 const geo=new _0.ConeGeometry(1,1,7,3),p=geo.attributes.position;for(let i=0;i<p.count;i++){const y=p.getY(i);if(y<.49){const f=1+Math.sin(p.getX(i)*13+p.getZ(i)*9+y*17)*.07;p.setX(i,p.getX(i)*f);p.setZ(i,p.getZ(i)*f);}}geo.computeVertexNormals();const map=__v108LandTexture('stone'),dark=new _0.MeshToonMaterial({color:'#56444a',map,bumpMap:map,bumpScale:.08,gradientMap:__v66Ramp}),base=new _0.MeshToonMaterial({color:'#67504b',map,gradientMap:__v66Ramp}),dummy=new _0.Object3D();
 // Chunks bound draw distance while retaining every peak, original resolution and silhouette.
 const chunks=new Map();for(const [kind,list]of[['peak',peaks],['base',bases]])for(const e of list){const key=Math.floor(e.x/128)+','+Math.floor(e.z/128);if(!chunks.has(key))chunks.set(key,{peak:[],base:[]});chunks.get(key)[kind].push(e);}
 for(const [key,batch]of chunks){const g=new _0.Group(),[ix,iz]=key.split(',').map(Number);g.userData.cull93={x:ix*128+64,z:iz*128+64,r:240};root.add(g);__v93.cullGroups.push(g);for(const [kind,entries]of Object.entries(batch)){if(!entries.length)continue;const m=new _0.InstancedMesh(kind==='peak'?geo:__v75Geo('box'),kind==='peak'?dark:base,entries.length);for(const [i,e]of entries.entries()){dummy.position.set(e.x,e.y,e.z);dummy.rotation.set(0,e.ry||0,e.rz||0);dummy.scale.set(e.sx,e.sy,e.sz);dummy.updateMatrix();m.setMatrixAt(i,dummy.matrix);}m.computeBoundingSphere();m.castShadow=m.receiveShadow=true;g.add(m);}}
 _22();__v91RepairAll();
}
// Ground movement checks the whole step, so sprinting or jumping cannot tunnel through the ridge.
const __v108FrontierMove=_3m;_3m=function(dt){const from=_14.clone(),r=__v108FrontierMove(dt);if(!_u||_74()||_v||__v104Ship.active||__v75At())return r;const to=_14,len=Math.hypot(to.x-from.x,to.z-from.z);if(len<.001||len>100)return r;
 const x0=Math.floor((Math.min(from.x,to.x)-18)/32),x1=Math.floor((Math.max(from.x,to.x)+18)/32),z0=Math.floor((Math.min(from.z,to.z)-18)/32),z1=Math.floor((Math.max(from.z,to.z)+18)/32);let hit=false;
 for(let x=x0;x<=x1&&!hit;x++)for(let z=z0;z<=z1&&!hit;z++)for(const s of __v108Frontier.grid.get(x+','+z)||[])if(__v101SweptHit({...s.c,bottom:-1000,top:1500},from,to,Math.min(from.y,to.y)-1.85,.45)){hit=true;break;}
 if(hit){_14.copy(from);_12=Math.min(_12,0);if(_10>__v108Frontier.hintAt){__v108Frontier.hintAt=_10+5;_3a('Los picos cierran el paso. Cruza con vuelo, aeronave o teletransportación.');}}return r;
};
const __v108FrontierWorld=_bj;_bj=function(...args){const old=__v108Frontier.root;if(old){const geos=new Set(),mats=new Set();old.traverse(o=>{if(o.isInstancedMesh){o.dispose();if(o.geometry!==__v75Geo('box'))geos.add(o.geometry);mats.add(o.material);}});for(const g of geos)g.dispose();for(const m of mats)m.dispose();old.removeFromParent();}const r=__v108FrontierWorld(...args);__v108FrontierBuild();return r;};
window.__AURELIA_FRONTIER108__={audit:()=>({segments:__v108Frontier.segments.length,minHeight:Math.min(...__v108Frontier.segments.map(s=>s.h)),maxHeight:Math.max(...__v108Frontier.segments.map(s=>s.h)),methods:['teletransportación','aeronave','vuelo'],internalBoundary:false})};
