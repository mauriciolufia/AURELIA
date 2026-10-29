/* Built from the published four-room plans. Balconies never join separate rooms. */
const __v139={areas:[],stairs:[],roof:null,materials:new Map(),guards:[],centers:[[-8,-8],[8,-8],[8,8],[-8,8]]};
const __v139Species=[
 {id:'aurora139-basalt',name:'Guardián de Basalto',base:'golem',family:'stone',color:'#667d90'},
 {id:'aurora139-ember',name:'Bestia de Brasa',base:'wolf',family:'feline',color:'#a84138'},
 {id:'aurora139-watch',name:'Vigía Carmesí',base:'skeleton',family:'gunner',color:'#658da8'},
 {id:'aurora139-oracle',name:'Oráculo de Ceniza',base:'archdevil',family:'ashMage',color:'#666189'}
];
const __v139Family=__v109Techniques.family;__v109Techniques.family=function(c){return __v139Species.find(s=>s.id===c.id)?.family||__v139Family(c);};
const __v139Kit=__v109Techniques.build;__v109Techniques.build=function(c){const index=__v139Species.findIndex(s=>s.id===c.id);return __v139Kit(index<0?c:{...c,id:['maya_stone_guardian','panther','pirate102-1','volcano103-6'][index]});};
function __v139Material(role){
 if(__v139.materials.has(role))return __v139.materials.get(role);
 const floor=role==='floor',canvas=document.createElement('canvas');canvas.width=canvas.height=256;
 const c=canvas.getContext('2d'),brick=role==='wall';
 c.fillStyle=brick?'#3b4d5e':'#344959';c.fillRect(0,0,256,256);
 for(let row=0;row<8;row++)for(let col=-1;col<5;col++){
  const x=col*64+(row%2)*32,y=row*32,n=(row*17+col*7+23)%19;
  c.fillStyle=brick?'rgb('+(82+n)+','+(99+n)+','+(111+n)+')':'rgb('+(75+n)+','+(98+n)+','+(117+n)+')';c.fillRect(x+2,y+2,60,28);
  c.strokeStyle='#9baab455';c.strokeRect(x+4,y+4,56,24);
 }
 const texture=floor?new _0.TextureLoader().load(__v139FloorImage):new _0.CanvasTexture(canvas);
 texture.name=floor?'Losas medievales gris azuladas · imagen original':'Mampostería Aurora139';
 texture.wrapS=texture.wrapT=_0.RepeatWrapping;texture.colorSpace=_0.SRGBColorSpace;
 texture.anisotropy=Math.min(4,_5.capabilities.getMaxAnisotropy());
 const m=new _0.MeshStandardMaterial({map:texture,bumpMap:texture,bumpScale:floor?.045:.08,roughness:.93,color:floor?'#ffffff':role==='roof'?'#536779':role==='wall'?'#8391a0':'#6d859a'});
 // The game's toon material constructor copies colors only; bind textures explicitly.
 m.map=texture;m.bumpMap=texture;m.bumpScale=floor?.045:.08;m.needsUpdate=true;
 m.onBeforeCompile=shader=>{
  shader.vertexShader='varying vec3 masonry139;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n masonry139=(modelMatrix*vec4(transformed,1.0)).xyz;');
  const coords=role==='wall'?'vec2((masonry139.x+masonry139.z)*2.0,masonry139.y*3.0)':'vec2((masonry139.x+masonry139.z)*1.2,masonry139.y*1.5)';
  const sample=floor?'vec4 sampled139=texture2D(map,masonry139.xz/4.0); diffuseColor*=sampled139;':'#include <map_fragment>\n vec2 brick139='+coords+'; brick139.x+=mod(floor(brick139.y),2.0)*0.5; vec2 joint139=fract(brick139); float face139=smoothstep(0.035,0.065,joint139.x)*smoothstep(0.04,0.08,joint139.y); diffuseColor.rgb*=mix(vec3(0.28,0.36,0.43),vec3(1.0),face139);';
  shader.fragmentShader='varying vec3 masonry139;\n'+shader.fragmentShader.replace('#include <map_fragment>',sample);
 };m.customProgramCacheKey=()=> 'aurora139-'+role;
 m.name='V85 Aurora139:'+role;__v139.materials.set(role,m);return m;
}
function __v139Torches(a){
 const fixtures=[],top=a.floor139===9,positions=[];
 if(top)for(const side of[-1,1])for(const p of[-9,9])positions.push([p,side*15.3,0],[side*15.3,p,Math.PI/2]);
 else for(const r of a.design.rects){const x=(r[0]+r[2])/2;positions.push([x-3,r[1]+.7,0],[x+3,r[3]-.7,0]);}
 for(const[i,p]of positions.entries()){
  const w=__v83Point(a,p),g=__v75Group(w.x,a.y,w.z);a.groups.push(g);g.rotation.y=p[2];
  __v75Mesh(g,'box','#343d49',0,2.25,0,.3,.8,.18);__v75Mesh(g,'cylinder','#63482f',0,2.5,0,.12,.9,.12);__v75Mesh(g,'cone','#806d4c',0,2.95,0,.35,.3,.35);
  fixtures.push({x:w.x,z:w.z,y:a.y+3.35,phase:i*1.13,room139:top?0:Math.floor(i/2)});
 }
 const g=__v75Group(0,0,0);a.groups.push(g);
 const flames=new _0.InstancedMesh(__v75Geo('cone'),new _0.MeshBasicMaterial({color:'#ff9f32',toneMapped:false}),fixtures.length),cores=new _0.InstancedMesh(__v75Geo('cone'),new _0.MeshBasicMaterial({color:'#fff2b0',toneMapped:false}),fixtures.length);
 g.add(flames,cores);flames.instanceMatrix.setUsage(_0.DynamicDrawUsage);cores.instanceMatrix.setUsage(_0.DynamicDrawUsage);flames.frustumCulled=cores.frustumCulled=false;
 a.torches={fixtures,flames,cores,g};__v85.torchAreas.push(a);__v85Flame(a,0);
}
function __v139Balcony(a){return !!a?.tower139&&Math.abs(__v83Local(a,_14.x,_14.z)[0])>16*(__v139.scale140||1);}
const __v139Interior=__v126Interior;__v126Interior=function(a){return a?.tower139&&__v139Balcony(a)?false:__v139Interior(a);};
const __v139InteriorLight=__v106InteriorLight;
__v106InteriorLight=function(){
 const a=__v75At();if(!a?.tower139)return __v139InteriorLight();
 const s=__v106Lighting,dt=s.clock===null?.04:Math.max(0,Math.min(.1,_10-s.clock)),target=__v139Balcony(a)?0:1;s.clock=_10;s.area=a;
 s.blend+=(target-s.blend)*(1-Math.exp(-dt*7));if(Math.abs(target-s.blend)<.001)s.blend=target;
 const t=s.blend,day=_2p(-.16,.27,Math.sin((_x-6)/24*PI*2));
 s.outdoor={hemisphere:_9.intensity,sun:sun.intensity,moon:_a.intensity,exposure:_5.toneMappingExposure};
 _9.intensity=_19(_9.intensity,.30+day*.28,t);_9.color.lerp(new _0.Color('#b1c3de'),t);_9.groundColor.lerp(new _0.Color('#495264'),t);
 sun.intensity*=1-t*.92;_a.intensity*=1-t*.98;_5.toneMappingExposure*=1-t*.16;
 for(const light of _af)light.intensity*=1-t;
};
const __v139TorchLight=__v106TorchLight;
__v106TorchLight=function(dt,refresh=true){
 const a=__v75At();if(a?.tower139&&refresh){
  const p=__v83Local(a,_14.x,_14.z),room=a.design.rects.findIndex(r=>p[0]>=r[0]&&p[0]<=r[2]&&p[1]>=r[1]&&p[1]<=r[3]);
  const fixtures=__v139Balcony(a)?[]:a.torches.fixtures.filter(f=>room<0||f.room139===room).map(f=>({f,d:Math.hypot(f.x-_14.x,f.z-_14.z)})).filter(o=>o.d<22).sort((u,v)=>u.d-v.d);
  __v85.lights.forEach((l,i)=>{const f=fixtures[i]?.f;l.intensity=f?33*(1+Math.sin(__v85.clock*7+i)*.07):0;if(f)l.position.set(f.x,f.y,f.z);});
 }
 return __v139TorchLight(dt,refresh);
};
const __v139Mat=__v85Mat;__v85Mat=function(a,role){return a?.tower139?__v139Material(role):__v139Mat(a,role);};
function __v139Flight(index){return index%2?{x:-11,z0:-3,z1:-13}:{x:-11,z0:3,z1:13};}
function __v139Hole(st){const sign=Math.sign(st.z1-st.z0),lo=Math.min(st.z0-sign*.25,st.z1+sign*.25),hi=Math.max(st.z0-sign*.25,st.z1+sign*.25);return[[st.x-2,lo],[st.x+2,lo],[st.x+2,hi],[st.x-2,hi]];}
function __v139Wall(a,p,q,h=a.ceilingHeight88,base=0,exterior=false){
 const root=__v84Wall(a,p,q,h,base,.65,'aurora139-wall');if(base<.1)a.design.constructionWalls85.push([...p,...q]);
 if(exterior&&root){const w=Math.hypot(q[0]-p[0],q[1]-p[1]),m=new _0.Mesh(__v85BoxGeo(w,h,.12),__v139Material('stone'));m.position.set(0,h/2,p[0]===q[0]?Math.sign(p[0])*.4:-Math.sign(p[1])*.4);root.add(m);}
}
function __v139Span(a,axis,pos,lo,hi,doors=[],exterior=false){
 let cursor=lo;for(const mid of doors){if(mid-1.6>cursor)__v139Wall(a,axis==='x'?[cursor,pos]:[pos,cursor],axis==='x'?[mid-1.6,pos]:[pos,mid-1.6],a.ceilingHeight88,0,exterior);
  __v139Wall(a,axis==='x'?[mid-1.6,pos]:[pos,mid-1.6],axis==='x'?[mid+1.6,pos]:[pos,mid+1.6],a.ceilingHeight88-3.5,3.5,exterior);cursor=mid+1.6;
 }if(cursor<hi)__v139Wall(a,axis==='x'?[cursor,pos]:[pos,cursor],axis==='x'?[hi,pos]:[pos,hi],a.ceilingHeight88,0,exterior);
}
function __v139Floor(index){
 const s=__v88Island,top=index===9,h=top?14:10,incoming=index?__v139Flight(index-1):null,outgoing=top?null:__v139Flight(index),outer=__v95Ring([-16,-16,16,16]);
 const rects=top?[[-16,-16,16,16]]:[[-16,-16,-2,-2],[2,-16,16,-2],[2,2,16,16],[-16,2,-2,16]],centers=top?[[0,0]]:__v139.centers.map(p=>[...p]);
 // Three enclosed corridors form a U. There is no shared central hall or fourth connection.
 const corridors=top?[]:[[-2,-9.6,2,-6.4],[6.4,-2,9.6,2],[-2,6.4,2,9.6]],walk=[...rects,...corridors];
 const d={key:'aurora139-'+index,name:'Torre de la Aurora · Planta '+(index+1),bounds:[-20,-16,20,16],centers,rects,main:top?[0]:index%2?[3,2,1,0]:[0,1,2,3],rooms:top?['Salón del Dragón']:['Vestíbulo','Sala de Basalto','Sala del Oráculo','Escalinata'],room_fills:rects.map(r=>({polygon:__v95Ring(r),color:'#657d90'})),constructionWalls85:[],walls:[],furniture:[],addedTraps85:[],trap_info:[],secretRooms85:[],arrowTraps85:[],markers:{J:top?[[7,-7]]:[],A:[],B:[],F1:[],F2:[],MP:[],U:[]},props:{fountains:[],barrels:[],enemies:[]},roofPolygons85:[{outer,holes:outgoing?[__v139Hole(outgoing)]:[]}],roofOpenings85:outgoing?[{outer:__v139Hole(outgoing),holes:[]}]:[],polygons:[{outer,holes:incoming?[__v139Hole(incoming)]:[]}],accent:'#697f90',floor:'#8193a0',boss:'Dragón de la Aurora Carmesí'};
 const a={key:d.key,name:d.name,site:__v88IslandSite,x:s.x,z:s.z,y:s.y+index*10,cx:0,cz:0,w:20,d:16,rank:6,level:Math.min(45,35+Math.round(index*10/8)),biome:'volcano',tower139:true,floor139:index,ceilingHeight88:h,design:d,groups:[],members:[],doors:[],colliders:[],traps:[],pads:[],stairs:[],platforms:[],annexRooms:[],incoming139:incoming,balconies139:[]};
 d.polygons=walk.map(r=>({outer:__v95Ring(r),holes:incoming&&__v84PointInRing([incoming.x,(incoming.z0+incoming.z1)/2],__v95Ring(r))?[__v139Hole(incoming)]:[]}));
 __v139.areas.push(a);__v83.areas.push(a);__v75.areas.push(a);a.rooms=centers.map(p=>__v83Point(a,p));a.path=d.main.map(i=>a.rooms[i]);
 if(!top)d.rooms=centers.map((p,i)=>'Sala '+(d.main.indexOf(i)+1));a.entry=incoming?{...__v83Point(a,[incoming.x,incoming.z1+Math.sign(incoming.z1-incoming.z0)*.9]),y:a.y}:{...__v83Point(a,[-15,-8]),y:a.y};a.exit=a.entry;
 for(const poly of d.polygons)__v85PlanMesh(a,poly,0,'floor');__v85PlanMesh(a,d.roofPolygons85[0],h,'roof');a.roof={height:a.y+h,polygons:d.roofPolygons85,holes:d.roofOpenings85,groups:[]};
 __v139Span(a,'x',-16,-16,16,[],true);__v139Span(a,'x',16,-16,16,[],true);
 for(const side of [-1,1]){
  __v139Span(a,'z',side*16,-16,16,index?[-8,8]:side<0?[-8]:[],true);if(!index)continue;
  for(const z of [-8,8]){const r=side<0?[-20,z-3,-16,z+3]:[16,z-3,20,z+3];a.balconies139.push(r);__v85PlanMesh(a,{outer:__v95Ring(r),holes:[]},0,'floor');
   for(const l of [[r[0],r[1],r[2],r[1]],[r[0],r[3],r[2],r[3]],[side*20,r[1],side*20,r[3]]])__v139Wall(a,l.slice(0,2),l.slice(2),1.25);
  }
 }
 if(!top){
  for(const x of [-2,2])__v139Span(a,'z',x,-16,16,[-8,8]);for(const z of [-2,2])__v139Span(a,'x',z,-16,16,[8]);
  // Seal both sides of each corridor with masonry all the way to the ceiling.
  for(const z of [-9.6,-6.4,6.4,9.6])__v139Wall(a,[-2.25,z],[2.25,z]);
  for(const x of [6.4,9.6])__v139Wall(a,[x,-2.25],[x,2.25]);
 }
 a.walk139=walk;a.__v92Regions=[...a.walk139,...a.balconies139];d.polygons.push(...a.balconies139.map(r=>({outer:__v95Ring(r),holes:[]})));
 __v139Torches(a);
 const root=new _0.Group();root.name=d.name;_8.add(root);for(const g of a.groups)root.attach(g);a.root=root;a.groups=[root];__v85MergeArchitecture(a);
 _e7.push({key:a.key,x:a.x,z:a.z,y:a.y,path:a.path,cell:8,kind:'aurora139'});return a;
}
function __v139Stair(index){
 const lower=__v139.areas[index],upper=__v139.areas[index+1],def=__v139Flight(index),root=new _0.Group();root.name='Escalera Aurora '+(index+1)+'–'+(index+2);_8.add(root);
 for(let i=0;i<60;i++){const h=(i+1)/6,p=__v83Point(lower,[def.x,def.z0+(i+.5)/60*(def.z1-def.z0)]),m=new _0.Mesh(__v85BoxGeo(3.4,h,.23),__v139Material('stone'));m.position.set(p.x,lower.y+h/2,p.z);root.add(m);}
 const p=__v83Point(upper,[def.x,def.z1+Math.sign(def.z1-def.z0)*.6]),plate=new _0.Mesh(new _0.BoxGeometry(3.4,.15,1.4),__v139Material('stone'));plate.position.set(p.x,upper.y-.075,p.z);root.add(plate);
 const sign=__v75Group(p.x,upper.y+2.5,p.z,root);__v75Label(sign,'PLANTA '+(index+2),0,4);const st={...def,lower,upper,root};__v139.stairs.push(st);lower.groups.push(root);__v85MergeArchitecture({x:lower.x,y:lower.y,z:lower.z,root});return st;
}
function __v139Body(c,type){
 c.g.clear();c.legs=[];c.parts=[];c.g.scale.setScalar(1);const color=__v139Species[type].color;
 const part=(host,shape,col,x,y,z,w,h,d)=>__v75Mesh(host,shape,col,x,y,z,w,h,d);
 if(type===1){part(c.g,'box',color,0,1.1,0,1.5,1,2.4);part(c.g,'box','#d75d3b',0,1.5,-1.3,1, .8,1.1);for(const side of [-1,1])for(const z of [-.8,.8]){const leg=new _0.Group();leg.position.set(side*.65,1,z);c.g.add(leg);part(leg,'box','#573c43',0,-.4,0,.35,.9,.35);c.legs.push(leg);}for(let i=0;i<5;i++)part(c.g,'cone','#f6ab69',0,1.8,-.6+i*.35,.3,.6,.3);
 }else{
  part(c.g,type===3?'cone':'box',color,0,1.65,0,type===0?2:1.1,type===3?2.6:1.8,type===0?1.25:.7);part(c.g,'box','#a4bbc6',0,2.9,0,type===0?1.05:.7,.7,.7);
  for(const side of [-1,1]){const leg=new _0.Group();leg.position.set(side*.4,1,0);c.g.add(leg);part(leg,'box','#425769',0,-.4,0,type===0?.6:.3,.9,.45);c.legs.push(leg);part(c.g,'box',color,side*(type===0?1.2:.7),1.8,0,type===0?.6:.3,1.2,.5);}
  if(type===0)part(c.g,'sphere','#8eddeb',0,1.9,-.7,.5,.5,.16);
  if(type===2){part(c.g,'box','#a0825c',0,1.65,-.8,1.8,.16,.3);part(c.g,'box','#b0cbd8',0,1.65,-1.1,.16,.16,1.3);part(c.g,'cone','#6a91ac',0,3.5,0,.8,.9,.8);}
  if(type===3){part(c.g,'box','#876f58',.95,1.6,-.3,.12,3,.12);part(c.g,'sphere','#e07f9f',.95,3.25,-.3,.6,.6,.6);}
 }
 c.__v92FixedModel=true;
}
function __v139Guard(a,type,room,offset){
 const def=__v139Species[type],base=_4l.find(s=>s.id===def.base);let spec=_4l.find(s=>s.id===def.id);if(!spec){spec={...base,id:def.id,name:def.name,color:def.color};_4l.push(spec);}
 const center=__v139.centers[room],p=__v83Point(a,[center[0]+offset,center[1]-2]),previous=_1;_1=true;try{_hv(base,p.x,p.z);}finally{_1=previous;}
 const c=_m.at(-1);Object.assign(c,{spec,name:def.name,level:Math.min(45,a.level+(room===2?1:0)),hostile:true,dead:false,elite:false,boss:null,questElite:null,biome:'volcano',adventure:'aurora139',spawnId:a.key+'-guard-'+type,__v139Guard:true,respawn:Infinity,stun:0,cooldown:1.5,specialCooldown:2,attackTimer:0,guardTime:0,specialAction:null});
 __v139Body(c,type);__v83Relocate(c,a,{...p,y:a.y},room);a.members.push(c);__v139.guards.push(c);__v87EnemyStats(c);__v109Ensure(c);_cp(c);__v91Remember(c);
}
function __v139Build(){
 __v139.areas=[];__v139.stairs=[];__v139.guards=[];
 for(let i=0;i<10;i++)__v139Floor(i);for(let i=0;i<9;i++)__v139Stair(i);
 for(const a of __v139.areas.slice(0,9)){__v139Guard(a,0,1,-2);__v139Guard(a,1,1,2);__v139Guard(a,2,2,-2);__v139Guard(a,3,2,2);}
 const top=__v139.areas[9],dragon=__v88Island.dragon,point=__v83Point(top,[7,-7]);__v83Relocate(dragon,top,{...point,y:top.y},0);top.members.push(dragon);top.boss=dragon;
 const chest=__v88Island.chest,p=__v83Point(top,[10,-12]);Object.assign(chest,{x:p.x,z:p.z,y:top.y});chest.g.position.set(p.x,top.y,p.z);
 const roof=new _0.Group(),y=top.y+14,mat=__v139Material('roof');roof.name='Tejado de pico · Torre de la Aurora';_8.add(roof);
 const geo=new _0.BufferGeometry(),v=[-17,0,-17,17,0,-17,0,10,-17,-17,0,17,0,10,17,17,0,17,-17,0,-17,0,10,-17,0,10,17,-17,0,-17,0,10,17,-17,0,17,17,0,-17,17,0,17,0,10,17,17,0,-17,0,10,17,0,10,-17];geo.setAttribute('position',new _0.Float32BufferAttribute(v,3));geo.setAttribute('uv',new _0.Float32BufferAttribute(v.flatMap((n,i)=>i%3===0?[n/4,v[i+2]/4]:[]),2));geo.computeVertexNormals();const mesh=new _0.Mesh(geo,mat);mesh.material.side=_0.DoubleSide;roof.add(mesh);roof.position.set(top.x,y,top.z);__v139.roof=roof;
 const foundation=new _0.Mesh(__v85BoxGeo(34,8.2,34),__v139Material('stone'));foundation.position.set(0,.1-y,0);roof.add(foundation);
 for(const x of [-16.6,16.6])for(const z of [-16.6,16.6]){const pillar=new _0.Mesh(__v85BoxGeo(1.4,104,1.4),__v139Material('stone'));pillar.position.set(x,__v88Island.y+52-y,z);roof.add(pillar);}

 _1h[__v88IslandSite].description='Torre medieval de la Aurora: diez pisos, cuatro salas por planta y el dragón en el salón superior.';
 _22();__v75.grid.clear();for(const o of __v75.objects)__v75Index(o);__v129.groups=null;__v123Reset();__v127Roots();__v87RespawnIndex();
}
function __v139Contains(a,x,z,pad=0){const p=__v83Local(a,x,z);return(a.walk139||a.design.rects).some(r=>p[0]>=r[0]-pad&&p[0]<=r[2]+pad&&p[1]>=r[1]-pad&&p[1]<=r[3]+pad)||a.balconies139.some(r=>p[0]>=r[0]+pad&&p[0]<=r[2]-pad&&p[1]>=r[1]+pad&&p[1]<=r[3]-pad);}
const __v139At=__v75At;__v75At=function(x=_14.x,z=_14.z,y=_14.y-1.85){for(const a of __v139.areas)if(y>=a.y-1&&y<a.y+a.ceilingHeight88-1&&__v139Contains(a,x,z))return a;return __v139At(x,z,y);};
const __v139Ground=_ei;_ei=function(x,z){const feet=_14.y-1.85;
 for(const s of __v139.stairs){const p=__v83Local(s.lower,x,z);if(Math.abs(p[0]-s.x)<1.8*(__v139.scale140||1)&&p[1]>=Math.min(s.z0,s.z1)-.8&&p[1]<=Math.max(s.z0,s.z1)+.8){const h=s.lower.y+_18((p[1]-s.z0)/(s.z1-s.z0),0,1)*10;if(feet>=s.lower.y-1&&feet<=s.upper.y+1.1&&h<=feet+1.1)return h;}}
 for(const a of [...__v139.areas].reverse())if(feet>=a.y-1.05&&feet<a.y+a.ceilingHeight88&&__v139Contains(a,x,z)){if(a.incoming139&&__v84PointInRing(__v83Local(a,x,z),__v139Hole(a.incoming139)))return a.y-10;return a.y;}
 return __v139Ground(x,z);
};
const __v139Walk=__v83Walkable;__v83Walkable=function(a,x,z,pad=0){if(!a?.tower139)return __v139Walk(a,x,z,pad);return __v139Contains(a,x,z,pad)&&!(a.incoming139&&__v84PointInRing(__v83Local(a,x,z),__v139Hole(a.incoming139)));};
const __v139EnemyWalk=_9b;_9b=function(c,x,z){const a=__v139.areas.find(a=>a.key===c?.__v83Area);if(!a)return __v139EnemyWalk(c,x,z);if(!__v83Walkable(a,x,z,.6)||_i7(x,z,a.y+1.85)||!__v91SegmentClear(c,c.g.position,{x,z,y:a.y}))return false;c.__v91Permit={x,z,y:a.y};return a.y;};
const __v139Respawn=__v87CanRespawn;__v87CanRespawn=function(c){return c?.__v139Guard?false:__v139Respawn(c);};
const __v139Floors=__v127Floors;__v127Floors=function(a){const visible=__v139Floors(a);for(const st of __v139.stairs){if(a===st.lower||a===st.upper){const p=__v83Point(a,[st.x,a===st.lower?st.z0:st.z1]);if(Math.hypot(_14.x-p.x,_14.z-p.z)<8)visible.add(a===st.lower?st.upper:st.lower);}}return visible;};
const __v139Visibility=__v93Visibility;__v93Visibility=function(...args){const r=__v139Visibility(...args),a=__v75At(),inside=!!a?.tower139,outside=!a||inside&&Math.abs(_14.x-a.x)>16*(__v139.scale140||1),near=Math.hypot(_14.x-__v88Island.x,_14.z-__v88Island.z)<400,visible=__v127Floors(a);
 for(const f of __v139.areas){f.root.visible=outside?near:inside&&visible.has(f);}
 for(const st of __v139.stairs)st.root.visible=inside&&(st.lower===a||st.upper===a);if(__v139.roof)__v139.roof.visible=near&&outside;return r;
};
const __v139Groups=__v129Groups;__v129Groups=function(){const groups=__v139Groups();if(__v139.areas.length&&!groups.some(g=>g.id==='aurora139'))groups.push({id:'aurora139',name:'Torre de la Aurora',floors:[...__v139.areas]});return groups;};
const __v139Goal=__v86Goal;__v86Goal=function(a){if(!a?.tower139)return __v139Goal(a);const st=__v139.stairs.find(s=>s.lower===a);return st?{point:[st.x,st.z0],stage:'Sube a la planta '+(a.floor139+2)}:{point:a.design.markers.J[0],stage:'Alcanza al Dragón de la Aurora'};};
const __v139Tick=__v75Tick;__v75Tick=function(dt){const r=__v139Tick(dt),a=__v75At();if(a?.tower139)$('region').textContent='Torre de la Aurora · Planta '+(a.floor139+1)+' / 10';return r;};
const __v139World=_bj;_bj=function(...args){__v139.areas=[];__v139.stairs=[];const r=__v139World(...args);__v139Build();return r;};
const __v139Save=__v96WriteSave;__v96WriteSave=function(value){try{const s=JSON.parse(value);if(s?.seed===_f){s.tower139={dead:__v139.guards.filter(c=>c.dead).map(c=>c.spawnId)};value=JSON.stringify(s);}}catch{}return __v139Save(value);};
const __v139Load=_dn;_dn=function(...args){const r=__v139Load(...args),save=args[0];if(save?.seed===_f){const dead=new Set(save.tower139?.dead||[]);for(const c of __v139.guards)if(dead.has(c.spawnId)){c.dead=true;c.hp=0;c.g.visible=false;c.respawn=Infinity;}}__v129.groups=null;return r;};
window.__AURELIA_TOWER139__={audit:()=>({floors:__v139.areas.map(a=>({key:a.key,rooms:a.design.centers.length,height:a.ceilingHeight88,guards:a.members.filter(c=>c.__v139Guard).length,balconies:a.balconies139.length})),stairs:__v139.stairs.length,species:__v139Species.map(s=>({id:s.id,name:s.name})),levels:__v139.guards.map(c=>c.level),dragonFloor:__v88Island.dragon?.__v83Area,chestY:__v88Island.chest?.y})};
