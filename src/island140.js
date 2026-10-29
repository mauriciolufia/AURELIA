/* Horizontal expansion only: floor elevations, enemy sizes and the ten-floor route stay stable. */
const __v140Island={old:{x:-565,z:1825,rx:43,rz:28},x:-640,z:2280,floorScale:2,islandScale:2.5,south:2740,building:false};
// Rebuilding the scenery index must retain unloaded buildings as well as nearby ones.
const __v140StreamReset=__v123Reset;__v123Reset=function(...args){if(__v123.ready)for(const r of __v123.roots)if(!r.retired&&!r.loaded)__v123RootSet(r,true);return __v140StreamReset(...args);};
Object.assign(__v88Island,{x:__v140Island.x,z:__v140Island.z,rx:43*2.5,rz:28*2.5});
Object.assign(_1h[__v88IslandSite],{x:__v88Island.x,z:__v88Island.z,radius:110});
const __v140Bounds=_ef;_ef=function(x,z){return !_eb&&Math.abs(x)<=_1f&&z>=_1f&&z<=__v140Island.south||__v140Bounds(x,z);};
const __v140SeaGround=_2r;_2r=function(x,z){return z>_1f&&__v88IslandRadius(x,z)>=1.12?-8:__v140SeaGround(x,z);};
const __v140SeaTerrain=_2t;_2t=function(x,z){return z>_1f?_2r(x,z):__v140SeaTerrain(x,z);};
const __v140Map=_aq;_aq=function(){const m=__v140Map();if(_eb||__v76MapTown())return m;const height=__v140Island.south+_1e,pad=32;m.scale=Math.min((m.w-pad)/_1d,(m.h-pad)/height)*_ak;m.cy=m.h/2+_al.y-(__v140Island.south-_1e)/2*m.scale;return m;};
const __v140Flight=__v139Flight;__v139Flight=function(i){const d=__v140Flight(i),k=__v140Island.building?1:2;return{x:d.x*k,z0:d.z0*k,z1:d.z1*k};};
const __v140Hole=__v139Hole;__v139Hole=function(st){const k=__v140Island.building?1:2,small={x:st.x/k,z0:st.z0/k,z1:st.z1/k};return __v140Hole(small).map(p=>p.map(v=>v*k));};
const __v140TowerBuild=__v139Build;__v139Build=function(){
 __v140Island.building=true;__v139.scale140=1;__v139.centers=[[-8,-8],[8,-8],[8,8],[-8,8]];
 try{__v140TowerBuild();}finally{__v140Island.building=false;}
 const s=__v88Island,k=2,roots=new Set(),seen=new WeakSet();
 const coord=p=>{if(!p||seen.has(p))return;seen.add(p);for(let i=0;i<p.length;i++)if(typeof p[i]==='number')p[i]*=k;};
 const world=p=>{if(!p||seen.has(p))return;seen.add(p);p.x=s.x+(p.x-s.x)*k;p.z=s.z+(p.z-s.z)*k;};
 const poly=p=>{if(!p)return;for(const ring of[p.outer,...(p.holes||[])])for(const p of ring)coord(p);};
 const scaleRoot=root=>{if(!root||roots.has(root))return;roots.add(root);root.position.x=s.x+(root.position.x-s.x)*k;root.position.z=s.z+(root.position.z-s.z)*k;root.scale.x*=k;root.scale.z*=k;root.updateMatrix();root.updateWorldMatrix(true,true);};
 for(const a of __v139.areas){const d=a.design;
  for(const r of[...d.rects,...a.walk139,...a.__v92Regions,...a.balconies139,...d.constructionWalls85])coord(r);
  for(const p of d.centers)coord(p);for(const f of d.room_fills)for(const p of f.polygon)coord(p);
  for(const p of[...d.polygons,...d.roofPolygons85,...d.roofOpenings85])poly(p);
  for(const points of Object.values(d.markers))for(const p of points)coord(p);coord(d.bounds);
  for(const p of[a.entry,a.exit,...a.rooms,...a.path])world(p);a.w*=k;a.d*=k;if(a.incoming139)for(const key of['x','z0','z1'])a.incoming139[key]*=k;
  for(const c of a.colliders){world(c);for(const key of['w','d','hx','hz','r'])if(Number.isFinite(c[key]))c[key]*=k;}
  for(const c of a.members){world(c);world(c.g.position);world(c.spawn);__v91Remember(c);}
  for(const f of a.torches.fixtures)world(f);
  // Flame matrices use world coordinates. Keep their shared group outside the scaled architecture.
  const flames=a.torches.g;_8.attach(flames);flames.position.set(0,0,0);flames.scale.set(1,1,1);a.groups.push(flames);
  for(const root of a.groups)if(root!==flames)scaleRoot(root);__v85Flame(a,__v85.clock);
 }
 for(const st of __v139.stairs){st.x*=k;st.z0*=k;st.z1*=k;scaleRoot(st.root);}
 __v139.centers=__v139.centers.map(p=>p.map(v=>v*k));__v139.scale140=k;scaleRoot(__v139.roof);
 const chest=s.chest;world(chest);chest.g.position.set(chest.x,chest.y,chest.z);
 // Red palms move out with the enlarged island; the tower and hero keep their own sizes.
 const palms=s.root;if(palms){palms.position.set(s.x*(1-2.5),0,s.z*(1-2.5));palms.scale.set(2.5,1,2.5);}
 for(const c of _q)if(c.tag==='redPalm88'){c.x=s.x+(c.x-s.x)*2.5;c.z=s.z+(c.z-s.z)*2.5;c.r*=2.5;}
 const ground=__v139.areas[0],entry=__v83Point(ground,[-32,-16]),doorRoot=new _0.Group();doorRoot.name='Entrada de madera · Torre Carmesí';doorRoot.position.set(entry.x,ground.y,entry.z);doorRoot.rotation.y=Math.PI/2;_8.add(doorRoot);
 const pivot=__v73Door(doorRoot,0,0,6.15,3.4,{wood:__v75Mat('#70492f'),trim:__v75Mat('#382b22')},1,true);
 for(const y of[-1.05,1.05])__v75Mesh(pivot,'box','#30353c',3.02,y,-.12,5.9,.15,.12);
 for(let i=0;i<7;i++)__v75Mesh(pivot,'box','#49301e',.45+i*.84,0,-.095,.025,3.25,.02);
 __v75Mesh(pivot,'ring','#b58b52',5.4,-.05,-.2,.16,.16,.07);ground.root.attach(doorRoot);__v140Island.door=__v29Doors.find(d=>d.pivot===pivot);
 _22();__v75.grid.clear();for(const o of __v75.objects)__v75Index(o);__v123Reset();__v127Roots();__v87RespawnIndex();
};
const __v140TowerVisibility=__v93Visibility;__v93Visibility=function(...args){const r=__v140TowerVisibility(...args);for(const a of __v139.areas)if(a.torches?.g)a.torches.g.visible=a.root.visible;return r;};
function __v140Divine(a){return !!(a?.tower139&&__v75Save.lit.includes(a.key)&&(__v86LightState()[a.key]??900)>0);}
const __v140TowerLight=__v106InteriorLight;__v106InteriorLight=function(){const r=__v140TowerLight(),a=__v75At();if(a?.tower139&&!__v139Balcony(a)){
 _9.intensity*=__v140Divine(a)?3:2;if(__v140Divine(a)){_9.color.lerp(new _0.Color('#fff0cb'),.4);_5.toneMappingExposure*=1.1;}
 }return r;};
const __v140TowerTorch=__v106TorchLight;__v106TorchLight=function(...args){const r=__v140TowerTorch(...args),a=__v75At();if(a?.tower139&&!__v139Balcony(a))for(const l of __v85.lights)l.intensity*=__v140Divine(a)?3:2;return r;};
const __v140DivineCast=__v75Cast;__v75Cast=function(id){const a=__v75At();if(id!=='luz_divina'||!a?.tower139)return __v140DivineCast(id);
 const spell=_5n.find(s=>s.id===id);if(!_u||_74()||_5o>0||!rpg.known.includes(id)||__v137HeroDisabled()||__v56Status.stun>0||rpg.mp<spell.cost)return false;
 rpg.mp-=spell.cost;_5o=spell.cooldown;if(!__v75Save.lit.includes(a.key))__v75Save.lit.push(a.key);__v86LightState()[a.key]=900;__v102Performance.dark=null;__v75DarkView();__v68Burst(_14.clone(),spell.color,'buff',2.4,.7);_3a('Luz Divina · la torre brilla durante 15 minutos.');_fl();_iv();return true;
};
const __v140IslandSave=__v96WriteSave;__v96WriteSave=function(value){try{const s=JSON.parse(value);s.island140={version:140};value=JSON.stringify(s);}catch{}return __v140IslandSave(value);};
const __v140IslandLoad=_dn;_dn=function(raw,...args){let s=raw;if(raw?.seed===_f&&!raw.island140&&Array.isArray(raw.player)){
 const old=__v140Island.old,[x,y,z]=raw.player;if(Math.abs(x-old.x)<65&&Math.abs(z-old.z)<60){s={...raw,player:[__v88Island.x+(x-old.x)*2,y,__v88Island.z+(z-old.z)*2]};}
 }const r=__v140IslandLoad(s,...args);
 const boat=s?.adventures?.boat;if(s?.seed===_f&&boat&&Number.isFinite(boat.x)&&Number.isFinite(boat.z)&&Math.abs(boat.x)<=_1f&&boat.z>_1f&&boat.z<=__v140Island.south){_e9.x=boat.x;_e9.z=boat.z;_e9.g.position.set(boat.x,-2.15,boat.z);}
 if(s?.seed===_f&&s.player?.[2]>_1f&&s.player[2]<=__v140Island.south&&Math.abs(s.player[0])<=_1f){_14.set(...s.player);_14.y=Math.max(_14.y,_ei(_14.x,_14.z)+1.85);_12=0;__v123Refresh(true);_bg(true);__v93Visibility();_bl();}
 return r;};
window.__AURELIA_ISLAND140__={audit:()=>({x:__v88Island.x,z:__v88Island.z,radii:[__v88Island.rx,__v88Island.rz],islandScale:2.5,floorScale:2,footprint:[64,64],south:__v140Island.south,stairsRun:20,stairsRise:10,lightMultiplier:2,divineMultiplier:3})};
