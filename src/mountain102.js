/* A continuous mountain road: terrain, visible ribbon and walking share one height. */
const __v102Mountain={points:[],grid:new Map(),root:null,width:7,length:0,maxGrade:0,turns:3.5,roadTexture:null};
const __v102PeakTerrain=_2r;
function __v102MountainPlan(){
 const m=__v95North.mountain,p=__v102Mountain;p.points=[];p.grid.clear();p.length=0;p.maxGrade=0;
 const radius=m.r+12,start=__v102PeakTerrain(m.x,m.z+radius),count=560;
 for(let i=0;i<=count;i++){const t=i/count,r=radius+(13-radius)*t,angle=Math.PI/2+t*Math.PI*2*p.turns;const point={x:m.x+Math.cos(angle)*r,z:m.z+Math.sin(angle)*r,y:start+(m.top-start)*t*t*(3-2*t),t,d:p.length};
  if(i){const a=p.points[i-1],length=Math.hypot(point.x-a.x,point.z-a.z);p.length+=length;point.d=p.length;p.maxGrade=Math.max(p.maxGrade,(point.y-a.y)/length);const pad=p.width/2+7;for(let x=Math.floor((Math.min(a.x,point.x)-pad)/16);x<=Math.floor((Math.max(a.x,point.x)+pad)/16);x++)for(let z=Math.floor((Math.min(a.z,point.z)-pad)/16);z<=Math.floor((Math.max(a.z,point.z)+pad)/16);z++){const key=x+','+z;if(!p.grid.has(key))p.grid.set(key,[]);p.grid.get(key).push(i-1);}}
  p.points.push(point);
 }
}
__v102MountainPlan();
const __v102NorthBuild=__v95NorthBuild;__v95NorthBuild=function(){__v102MountainPlan();return __v102NorthBuild();};
function __v102MountainRoad(x,z){
 const p=__v102Mountain,segments=p.grid.get(Math.floor(x/16)+','+Math.floor(z/16));if(!segments)return null;let best=null;
 for(const i of segments){const a=p.points[i],b=p.points[i+1],dx=b.x-a.x,dz=b.z-a.z,t=_18(((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz),0,1),distance=Math.hypot(x-a.x-t*dx,z-a.z-t*dz);if(!best||distance<best.distance)best={distance,y:a.y+(b.y-a.y)*t,i,t};}return best;
}
_2r=function(x,z){const h=__v102PeakTerrain(x,z),m=__v95North.mountain;if(Math.abs(x-m.x)>m.r+24||Math.abs(z-m.z)>m.r+24)return h;const p=__v102MountainRoad(x,z);if(!p||p.distance>=10.5)return h;const t=p.distance<=5?1:(10.5-p.distance)/5.5;return h+(p.y-h)*t*t*(3-2*t);};
function __v102MountainBuild(){
 const p=__v102Mountain,m=__v95North.mountain;p.root?.removeFromParent();const root=new _0.Group();root.name='Camino serpenteante de la Cumbre Blanca';root.userData.cull93={x:m.x,z:m.z,r:680};_8.add(root);__v93.cullGroups.push(root);p.root=root;
 const vertices=[],uv=[],roadIndices=[],shoulderIndices=[],points=p.points;
 for(let i=0;i<points.length;i++){
  const a=points[Math.max(0,i-1)],b=points[Math.min(points.length-1,i+1)],n=Math.hypot(b.x-a.x,b.z-a.z),nx=-(b.z-a.z)/n,nz=(b.x-a.x)/n;
  // A full-width level bench with shoulders joins the surrounding mountain mesh.
  for(const width of[-10.5,-3.5,3.5,10.5]){const x=points[i].x+nx*width,z=points[i].z+nz*width;vertices.push(x,_2r(x,z)+.035,z);uv.push((width+3.5)/7,points[i].d/7);}
  if(i)for(let j=0;j<3;j++){const k=i*4+j;(j===1?roadIndices:shoulderIndices).push(k-4,k,k+1,k-4,k+1,k-3);}
 }
 const geo=new _0.BufferGeometry();geo.setAttribute('position',new _0.Float32BufferAttribute(vertices,3));geo.setAttribute('uv',new _0.Float32BufferAttribute(uv,2));geo.setIndex([...roadIndices,...shoulderIndices]);geo.addGroup(0,roadIndices.length,0);geo.addGroup(roadIndices.length,shoulderIndices.length,1);geo.computeVertexNormals();
 const mountain=_8.getObjectByName('Cumbre Blanca · montaña escalable');if(mountain)mountain.material=__v94Mat(__v95Polar,'roof');
 if(!p.roadTexture){const canvas=document.createElement('canvas');canvas.width=canvas.height=1024;const ctx=canvas.getContext('2d'),random=rng(102027);ctx.fillStyle='#667481';ctx.fillRect(0,0,1024,1024);for(let row=0;row<16;row++)for(let col=-1;col<9;col++){const x=col*128+(row%2)*64,y=row*64;ctx.fillStyle=['#9da8b1','#aeb6be','#8999a6','#b6bfc6'][Math.floor(random()*4)];ctx.fillRect(x+3,y+3,121,57);ctx.fillStyle='#dce6eb';ctx.fillRect(x+5,y+4,117,3);}for(let i=0;i<28000;i++){ctx.fillStyle=i%2?'#ffffff15':'#22334420';ctx.fillRect(random()*1024,random()*1024,1+random()*2,1+random()*2);}ctx.fillStyle='#edf7ff';ctx.fillRect(0,0,36,1024);ctx.fillRect(988,0,36,1024);p.roadTexture=new _0.CanvasTexture(canvas);p.roadTexture.colorSpace=_0.SRGBColorSpace;p.roadTexture.wrapS=p.roadTexture.wrapT=_0.RepeatWrapping;p.roadTexture.anisotropy=Math.min(8,_5.capabilities.getMaxAnisotropy());}
 const material=new _0.MeshToonMaterial({color:'#ffffff',map:p.roadTexture,bumpMap:p.roadTexture,bumpScale:.025,gradientMap:__v66Ramp,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),shoulder=__v94Mat(__v95Polar,'roof').clone();shoulder.polygonOffset=true;shoulder.polygonOffsetFactor=-1;shoulder.polygonOffsetUnits=-1;
 const mesh=new _0.Mesh(geo,[material,shoulder]);mesh.name='Calzada curva y taludes unidos a la montaña';mesh.receiveShadow=true;root.add(mesh);
 // Existing trail markers are moved to the roadside rather than discarded.
 const oldMarkers=_8.children.filter(o=>o.isMesh&&o.geometry?.type==='ConeGeometry'&&Math.abs(o.geometry.parameters.radius-.45)<.001&&Math.hypot(o.position.x-m.x,o.position.z-m.z)<m.r+1);
 for(const[i,g]of oldMarkers.entries()){const a=points[Math.round((i+.5)/oldMarkers.length*(points.length-1))],next=points[Math.min(points.length-1,points.indexOf(a)+1)],len=Math.hypot(next.x-a.x,next.z-a.z)||1,x=a.x-(next.z-a.z)/len*4.3,z=a.z+(next.x-a.x)/len*4.3;g.position.set(x,_2r(x,z)+1.2,z);root.attach(g);}
 const sign=new _0.Group(),first=points[0];sign.position.set(first.x+5,_2r(first.x+5,first.z),first.z);root.add(sign);__v97Model(sign,[['box','#6c665b',0,1.3,0,.2,2.6,.2],['box','#77899a',0,2.4,0,3.6,1.1,.18],['box','#e2eced',0,2.4,-.12,2.5,.12,.05]]);__v75Label(sign,'CUMBRE DEL YETI · CAMINO DE MONTAÑA',3.4,5);
}
window.__AURELIA_MOUNTAIN102__={audit:()=>({width:__v102Mountain.width,turns:__v102Mountain.turns,length:__v102Mountain.length,maxGrade:__v102Mountain.maxGrade,start:{...__v102Mountain.points[0]},summit:{...__v102Mountain.points.at(-1)},samples:__v102Mountain.points.length})};
