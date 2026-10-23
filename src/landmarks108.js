/* Landmark artwork only: native 2048px surfaces, human-sized openings and regional joinery. */
const __v108Landmarks={textures:new Map(),materials:new Map(),windows:[],doors:[],sites:[]};
function __v108LandTexture(kind){
 const cache=__v108Landmarks.textures;if(cache.has(kind))return cache.get(kind);const c=document.createElement('canvas');c.width=c.height=2048;const x=c.getContext('2d'),random=rng(108091+kind.length*971),wood=kind==='wood',roof=kind==='roof',ice=kind==='ice',stone=!wood&&!roof&&!ice;
 x.fillStyle=wood?'#b7a28b':roof?'#bdbac2':ice?'#c3dde5':'#d0cdc4';x.fillRect(0,0,2048,2048);
 const cols=wood?8:roof?12:8,rows=wood?1:roof?12:8,w=2048/cols,h=2048/rows;
 for(let row=0;row<rows;row++)for(let col=-1;col<=cols;col++){const xx=col*w+(row%2)*w/2,yy=row*h,g=x.createLinearGradient(xx,yy,xx+w*.7,yy+h);g.addColorStop(0,wood?'#dac6a9':ice?'#edf9fc':'#e9e4da');g.addColorStop(.3,wood?'#bca78e':ice?'#bddce8':'#d8d3c9');g.addColorStop(1,wood?'#9d8a75':ice?'#7cabbf':'#aaa7a2');x.fillStyle=g;x.fillRect(xx+4,yy+4,w-8,h-8);x.strokeStyle=wood?'#766855':ice?'#6f9eae':'#898582';x.lineWidth=4;x.strokeRect(xx+3,yy+3,w-6,h-6);x.strokeStyle='#fff9ec88';x.lineWidth=3;x.beginPath();x.moveTo(xx+12,yy+h-10);x.lineTo(xx+12,yy+12);x.lineTo(xx+w-12,yy+12);x.stroke();
  if(wood){for(let j=0;j<90;j++){const u=xx+10+j*(w-20)/90;x.strokeStyle=j%3?'#806e5748':'#f6e5c965';x.lineWidth=.8+random()*1.1;x.beginPath();for(let v=0;v<=2048;v+=8){const gx=u+Math.sin(v*.011+j*.3)*2.7+Math.sin(v*.037+j)*.65;v?x.lineTo(gx,v):x.moveTo(gx,v);}x.stroke();}for(let j=0;j<3;j++){x.save();x.translate(xx+w*(.22+random()*.55),160+random()*1700);x.scale(1,2.6);for(let r=3;r<16;r+=2){x.beginPath();x.ellipse(0,0,r,r*.6,0,0,Math.PI*2);x.strokeStyle='#67533c80';x.lineWidth=.9;x.stroke();}x.restore();}}
  else {for(let j=0;j<(roof?12:35);j++){const px=xx+12+random()*(w-24),py=yy+12+random()*(h-24);x.strokeStyle=j%3?'#514b4820':'#fffefa45';x.lineWidth=.7+random()*1.5;x.beginPath();x.moveTo(px,py);x.lineTo(px+3+random()*10,py+(random()-.5)*3);x.stroke();}if(roof){x.strokeStyle='#706b6880';x.lineWidth=2;x.beginPath();x.moveTo(xx+10,yy+h-13);x.lineTo(xx+w-10,yy+h-13);x.stroke();}if(ice){x.strokeStyle='#f1ffffaa';x.lineWidth=1.5;x.beginPath();x.moveTo(xx+w*.4,yy+10);x.lineTo(xx+w*.5,yy+h*.4);x.lineTo(xx+w*.25,yy+h*.7);x.stroke();}}
 }
 // Independent fine grains are drawn at native resolution, not enlarged from an old bitmap.
 for(let i=0;i<70000;i++){x.fillStyle=i%3?'#3430360d':'#ffffff28';x.fillRect(random()*2048,random()*2048,.6+random()*1.5,.6+random()*1.5);}
 const texture=new _0.CanvasTexture(c);texture.name='Hito v108 · '+kind+' · 2048';texture.colorSpace=_0.SRGBColorSpace;texture.wrapS=texture.wrapT=_0.RepeatWrapping;texture.anisotropy=Math.min(8,_5.capabilities.getMaxAnisotropy());cache.set(kind,texture);return texture;
}
__v91LandTexture=__v108LandTexture;
__v91LandMat=function(color,kind='stone'){
 const key=color+':'+kind;if(__v108Landmarks.materials.has(key))return __v108Landmarks.materials.get(key);const m=new _0.MeshToonMaterial({color,map:__v108LandTexture(kind),gradientMap:__v66Ramp,bumpMap:__v108LandTexture(kind),bumpScale:kind==='wood'?.025:.055});m.name='Hito108 '+key;__v108Landmarks.materials.set(key,m);return m;
};
const __v108LandWindow=__v91LWindow;__v91LWindow=function(g,x,y,z,w=1.4,h=2,angle=0,palette){
 // The window is a human-sized architectural module even on monumental towers.
 w=Math.max(.9,Math.min(2.4,w));h=Math.max(1.2,Math.min(2.7,h));const before=g.children.length,r=__v108LandWindow(g,x,y,z,w,h,angle,palette),frame=g.children[before];if(!frame)return r;
 const wood=palette.trim.color?'#'+palette.trim.color.getHexString():'#795b49',pale='#e1d2b6',plan=[['bevel',pale,0,-.2,.03,w+.6,.16,.42],['bevel',wood,0,h+.16,.02,w+.6,.17,.28]];
 for(const side of[-1,1]){plan.push(['box',wood,side*(w/2+.23),h*.5,.1,.19,h+.3,.22]);for(let i=0;i<4;i++)plan.push(['bevel',pale,side*(w/2+.24),h*.1+i*h*.26,.12,.26,.09,.24]);}
 // Recessed reveals, a molded sill and smaller glass panes replace flat oversized ornaments.
 __v97Model(frame,plan);frame.userData.landmarkWindow108={w,h,sill:y};__v108Landmarks.windows.push({frame,w,h});return r;
};
const __v108LandDoor=__v91LandDoor;__v91LandDoor=function(g,x,z,w,h,palette,site,angle=0){const d=__v108LandDoor(g,x,z,w,h,palette,site,angle);if(!d)return d;
 const wood='#'+palette.wood.color.getHexString(),metal='#65717b',gold='#c6b18b',plan=[];
 for(const yy of[-h*.23,h*.2]){plan.push(['bevel',wood,0,yy,.105,w*.75,h*.35,.10],['box',gold,0,yy-h*.16,.17,w*.76,.045,.025]);for(const side of[-1,1])plan.push(['box',gold,side*w*.38,yy,.17,.045,h*.32,.025]);}
 for(const yy of[-h*.3,h*.3]){plan.push(['bevel',metal,-w*.35,yy,.19,w*.28,.08,.05]);for(const side of[-1,1])plan.push(['sphere',gold,-w*.35+side*w*.09,yy,.22,.022,.022,.018]);}plan.push(['sphere',gold,w*.31,-h*.08,.25,.075,.075,.06]);
 const ornament=new _0.Group();ornament.position.x=d.side*w*.49;d.pivot.add(ornament);__v97Model(ornament,plan);d.__v108Details=true;__v108Landmarks.doors.push(d);return d;
};
function __v108LandDetail(record){
 const s=_1h[record.site];if(!s)return;const g=record.root,p=__v91Palette(s),kind=record.kind,plan=[],trim='#'+p.trim.color.getHexString(),pale='#dacdb7',gold='#bfa477';
 if(kind==='molinos'){for(const [j,dx]of[-25,0,25].entries()){for(const side of[-1,1]){for(const zz of[-1.1,1.1])plan.push(['bevel',trim,dx+side*4.76,3.7,(j%2)*15+zz,.17,2.5,.14]);}for(let k=0;k<16;k++){const a=k*Math.PI/8;plan.push(['bevel',trim,dx+Math.sin(a)*5.7,1.2,(j%2)*15+Math.cos(a)*5.7,.25,2.3,.25]);}}}
 else if(kind==='caravasar'){for(const side of[-1,1])for(const zz of[-17,-5,7,19]){for(let k=0;k<11;k++){const a=k*Math.PI/10;plan.push(['bevel',k%2?pale:gold,side*20.24,5.6+Math.sin(a)*1.35,zz+Math.cos(a)*1.35,.22,.34,.34,0,a,0]);}plan.push(['bevel',pale,side*20.3,.3,zz,.35,.6,2.9]);}}
 else if(kind==='naufragio'){for(const side of[-1,1])for(let j=0;j<13;j++)plan.push(['bevel',trim,side*(6.1-Math.abs(j-6)*.35),2.1,-15+j*2.5,.17,1.5,.2,0,0,side*.2]);for(const x of[-.65,.65])plan.push(['box',gold,x,2.5,-12.35,.08,2.2,.05]);}
 else if(kind==='forja'){for(const side of[-1,1])for(let j=0;j<8;j++){plan.push(['bevel','#514c55',side*23.99,12+j*.6,-9.45,2.4,.20,.28]);}for(let j=0;j<7;j++)plan.push(['bevel',gold,-8.7+j*2.9,17.2,-7.3,1.1,.16,.14]);}
 else if(kind==='observatorio'){for(let i=0;i<24;i++){const a=i*Math.PI/12;plan.push(['bevel',i%3?gold:pale,Math.sin(a)*23.6,.7,Math.cos(a)*23.6,.25,.10,1.1,0,a,0]);}}
 else if(kind==='acueducto'){for(let j=-3;j<=3;j++)for(let k=0;k<13;k++){const a=k*Math.PI/12;plan.push(['bevel',k%2?pale:trim,j*11+5.5+Math.cos(a)*4.2,12+Math.sin(a)*4.2,.72,.38,.38,.22,0,0,a]);}}
 else if(kind==='faro'){for(const yy of[5.6,12.6,20.8])for(const side of[-1,1])plan.push(['bevel',pale,side*6.31,yy+.15,0,.18,.15,12.5]);}
 else if(kind==='necropolis'){for(let j=0;j<8;j++){const x=j%2?17:-17,z=-22+Math.floor(j/2)*14;for(const side of[-1,1])plan.push(['bevel',trim,x+side*3.1,1.8,z+3.14,.18,2.4,.16]);for(let k=0;k<5;k++)plan.push(['bevel',gold,x+(k-2)*.4,3.2,z+3.17,.13,.23,.07]);}}
 else if(['torre','cristal','mareas'].includes(kind)){const r=kind==='torre'?10.6:kind==='mareas'?17:20;for(let i=0;i<12;i++){const a=i*Math.PI/6;plan.push(['bevel',i%2?pale:gold,Math.sin(a)*r,kind==='torre'?1.5:.9,Math.cos(a)*r,.3,.35,.3,0,a,Math.PI/4]);}}
 else {for(let i=0;i<4;i++){const a=i*Math.PI/2+Math.PI/4,r=kind==='arbol'?19:13;for(let j=0;j<3;j++)plan.push(['bevel',j%2?trim:pale,Math.sin(a)*r,.27+j*.12,Math.cos(a)*r,1.1-j*.12,.12,.8-j*.1,0,a,0]);}}
 if(s.type==='paraje'){
  // Replace the flat awning with a roof whose pitch and joinery fit the local climate.
  for(const m of [...g.children]){if(!m.isMesh)continue;const p=m.position,b=m.geometry.parameters;if(b&&Math.abs(p.x-19)<.01&&Math.abs(p.z-10)<.01&&Math.abs(p.y-3.5)<.05&&Math.abs(b.width-7.5)<.01)m.removeFromParent();}
  const bio=_he(s.x,s.z).id,pitch=['snow','polar'].includes(bio)?.6:bio==='jungle'?.45:.32,roofWidth=4/Math.cos(pitch),ridge=3.5+Math.sin(pitch)*roofWidth/2;
  for(const side of[-1,1]){const roof=__v91LBox(g,19+side*1.98,ridge-.10,10,roofWidth,.18,6.2,p.roof);roof.rotation.z=-side*pitch;for(const z of[7.15,12.85])plan.push(['bevel',trim,19+side*1.98,ridge-.12,z,roofWidth,.14,.18,0,0,-side*pitch]);}
  plan.push(['bevel',trim,19,ridge+Math.sin(pitch)*roofWidth/2,10,.18,.18,6.4]);
  for(const side of[-1,1]){plan.push(['bevel',trim,19+side*3.05,1.8,12.45,.14,3.4,.14]);plan.push(['bevel',pale,19+side*3.05,.3,12.45,.3,.25,.3]);}
 }
 if(plan.length){const detail=new _0.Group();detail.name='Detalles arquitectónicos · '+kind;g.add(detail);__v97Model(detail,plan);}
 record.style108=kind+':'+_he(s.x,s.z).id;__v108Landmarks.sites.push({name:s.name,kind,style:record.style108,details:plan.length});
}
const __v108LandBuild=__v91LandBuild;__v91LandBuild=function(...args){__v108Landmarks.windows=[];__v108Landmarks.doors=[];__v108Landmarks.sites=[];const r=__v108LandBuild(...args);for(const record of __v91Land.sites)__v108LandDetail(record);return r;};
// Source monument shells are decorated before the existing sector merger, retaining their collision footprint.
const __v108LandHollow=__v91HollowBox;__v91HollowBox=function(...args){const m=args[6];if(m?.color)args[6]=__v91LandMat('#'+m.color.getHexString(),/wood|795b/.test(m.name||'')?'wood':'stone');const g=__v108LandHollow(...args);g.userData.landmark108=true;return g;};
window.__AURELIA_LANDMARKS108__={audit:()=>({textureSize:2048,pixelDetailMultiplier:64,sites:__v108Landmarks.sites,windows:__v108Landmarks.windows.length,doors:__v108Landmarks.doors.length,doorDimensions:__v108Landmarks.doors.map(d=>[d.w*d.scale,d.h*d.scale])})};

const __v108LandRound=__v91RoundHouse;__v91RoundHouse=function(...args){const m=args[6];if(m?.color)args[6]=__v91LandMat('#'+m.color.getHexString(),'stone');return __v108LandRound(...args);};

// Metre-based UVs survive geometry recipes and the sector merger. Monument bricks must
// keep the same scale on a long wall and on a tapered round tower.
function __v108LandTagGeometry(geo,material){
 if(!material?.name?.startsWith('Hito108'))return;const r=geo.userData.recipe,name=r?.name||geo.type,p=geo.parameters||{};if(geo.userData.landmarkUV108)return;
 if(/Cylinder|Cone/.test(name)){const radius=name==='ConeGeometry'?(r?.args[0]??p.radius):Math.max(r?.args[0]??p.radiusTop,r?.args[1]??p.radiusBottom),height=name==='ConeGeometry'?(r?.args[1]??p.height):(r?.args[2]??p.height);geo.userData.landmarkUV108={u:Math.PI*2*radius/3,v:height/3};}
}
function __v108LandApplyUV(geometry,template){const scale=template.userData.landmarkUV108,uv=geometry.attributes.uv;if(!scale||!uv||scale.authored)return;for(let i=0;i<uv.count;i++){let u=scale.u,v=scale.v;if(scale.box){const[w,h,d]=scale.box,face=Math.floor(i/6);u=(face<2?d:w)/3;v=(face===2||face===3?d:h)/3;}uv.setXY(i,uv.getX(i)*u,uv.getY(i)*v);}}
const __v108LandBox=__v91LBox;__v91LBox=function(...args){const mesh=__v108LandBox(...args);const geo=mesh.geometry,[w,h,d]=args.slice(4,7);geo.userData.landmarkUV108={box:[w,h,d],authored:!geo.userData.recipe};if(!geo.userData.recipe){const uv=geo.attributes.uv;for(let i=0;i<uv.count;i++){const face=Math.floor(i/4);if(face===2||face===3)uv.setY(i,uv.getY(i)*d/h);else if(face>=4)uv.setY(i,uv.getY(i)*h/d);}}return mesh;};
