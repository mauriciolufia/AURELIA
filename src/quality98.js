/* Native-resolution surface detail. Seeded, cached, and never regenerated per frame. */
const __v98={atlas:null,material:null,enhancedMaps:0};
function __v98SurfaceDetail(canvas,kind,key=kind){
 const ctx=canvas.getContext('2d'),size=canvas.width;
 let seed=Array.from(key).reduce((n,c)=>(Math.imul(n,31)+c.charCodeAt(0))>>>0,9817);
 const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 ctx.save();
 // Periodic copies keep grain, scratches and fibers continuous at tile boundaries.
 function mark(x,y,draw){for(const dx of[-size,0,size])for(const dy of[-size,0,size]){if(x+dx<-24||x+dx>size+24||y+dy<-24||y+dy>size+24)continue;ctx.save();ctx.translate(x+dx,y+dy);draw();ctx.restore();}}
 for(let i=0;i<size*5;i++){
  const x=random()*size,y=random()*size,length=2+random()*8;
  mark(x,y,()=>{
   ctx.lineWidth=.5+random()*.6;ctx.strokeStyle=i%3?'rgba(55,47,42,.07)':'rgba(255,255,255,.25)';ctx.beginPath();
   if(kind==='fur'){ctx.moveTo(-1,-length);ctx.quadraticCurveTo(2,0,0,length);}
   else if(kind==='wood'){ctx.moveTo(-length*2,-1);ctx.bezierCurveTo(-length,2,length,-2,length*2,0);}
   else if(kind==='metal'||kind==='ice'){ctx.moveTo(-length,-length*.3);ctx.lineTo(length,length*.3);}
   else if(kind==='cloth'){ctx.moveTo(-2,-2);ctx.lineTo(2,2);}
   else{ctx.moveTo(-length*.3,0);ctx.lineTo(length*.3,0);}
   ctx.stroke();
  });
 }
 if(kind==='cloth'){
  const step=4;ctx.lineWidth=.65;ctx.strokeStyle='rgba(71,60,49,.09)';ctx.beginPath();for(let i=0;i<size;i+=step){ctx.moveTo(i,0);ctx.lineTo(i,size);ctx.moveTo(0,i);ctx.lineTo(size,i);}ctx.stroke();
 }else if(kind==='ice'){
  ctx.lineWidth=.8;ctx.strokeStyle='rgba(248,255,255,.32)';
  for(let i=0;i<size/12;i++){const x=random()*size,y=random()*size;mark(x,y,()=>{ctx.beginPath();ctx.moveTo(-4,0);ctx.lineTo(4,0);ctx.moveTo(0,-4);ctx.lineTo(0,4);ctx.stroke();});}
 }else if(kind==='wood'){
  for(let i=0;i<12;i++){const x=random()*size,y=random()*size;mark(x,y,()=>{ctx.strokeStyle='rgba(80,60,42,.15)';ctx.lineWidth=.8;for(let r=2;r<=7;r+=2){ctx.beginPath();ctx.ellipse(0,0,r*3,r,0,0,Math.PI*2);ctx.stroke();}});}
 }
 ctx.restore();__v98.enhancedMaps++;
}
function __v98Atlas(){
 if(__v98.atlas)return __v98.atlas;
 const tile=__v60Mobile?512:1024,c=document.createElement('canvas');c.width=c.height=tile*2;const ctx=c.getContext('2d');
 for(const [slot,kind] of ['wood','stone','metal','cloth'].entries()){
  const surface=document.createElement('canvas');surface.width=surface.height=tile;const x=surface.getContext('2d');x.fillStyle='#f6f3ed';x.fillRect(0,0,tile,tile);__v98SurfaceDetail(surface,kind,'furniture98-'+kind);
  if(kind==='wood'){
   // Readable grain at normal play distance, with finer fibers visible up close.
   for(let i=-1;i<=12;i++)for(const offset of[-tile,0,tile]){
    const stroke=shift=>{x.beginPath();for(let j=0;j<=48;j++){const y=j/48*tile,px=(i+.5)/12*tile+offset+Math.sin(j/48*Math.PI*4+i)*tile*.012+Math.sin(j/48*Math.PI*2+i*2)*tile*.018+shift;j?x.lineTo(px,y):x.moveTo(px,y);}x.stroke();};
    x.strokeStyle='rgba(89,68,44,.22)';x.lineWidth=tile*.006;stroke(0);x.strokeStyle='rgba(255,255,255,.5)';x.lineWidth=tile*.003;stroke(tile*.005);
   }
   for(const [u,v] of[[.25,.3],[.72,.74]]){x.strokeStyle='rgba(95,73,46,.25)';x.lineWidth=tile*.003;for(const radius of[.014,.025,.04]){x.beginPath();x.ellipse(u*tile,v*tile,radius*tile,radius*tile*2.5,0,0,Math.PI*2);x.stroke();}}
  }
  ctx.drawImage(surface,(slot%2)*tile,Math.floor(slot/2)*tile);
 }
 const t=new _0.CanvasTexture(c);t.name='Madera, piedra, metal y tela · atlas detallado 98';t.colorSpace=_0.SRGBColorSpace;t.minFilter=_0.LinearMipmapLinearFilter;t.magFilter=_0.LinearFilter;t.anisotropy=Math.min(__v60Mobile?4:8,_5.capabilities?.getMaxAnisotropy?.()||1);__v98.atlas=t;return t;
}
function __v98TextureModel(mesh,plan){
 const geo=mesh.geometry;
 if(!geo.attributes.uv){
  const uv=[],color=new _0.Color(),hsl={},tile=__v60Mobile?512:1024,inset=4/tile;
  for(const part of plan){
   color.set(part[1]).getHSL(hsl);
   const slot=hsl.h<.13&&hsl.s>.25?0:hsl.s<.16||hsl.h<.19&&hsl.s>.35?2:hsl.h>.85||hsl.h>.25&&hsl.h<.48?3:1;
   const source=__v66Primitives.get(part[0]+'true'),original=source.attributes.uv;
   for(let i=0;i<source.attributes.position.count;i++){
    const u=original?original.getX(i):.5,v=original?original.getY(i):.5;
    uv.push((slot%2+inset+_18(u,0,1)*(1-2*inset))/2,(1-Math.floor(slot/2)+inset+_18(v,0,1)*(1-2*inset))/2);
   }
  }
  geo.setAttribute('uv',new _0.Float32BufferAttribute(uv,2));
 }
 if(!__v98.material){const m=__v66DetailMat.clone();m.map=__v98Atlas();m.bumpMap=m.map;m.bumpScale=.018;m.name='Detalle caricaturesco 98 con textura y relieve';__v98.material=m;}
 mesh.material=__v98.material;mesh.userData.detail98=true;
}
// Preserve existing painted architectural motifs and add actual fine surface information.
const __v98ArchitectureTexture=__v85Texture;
__v85Texture=function(theme,role){const t=__v98ArchitectureTexture(theme,role);if(!t.userData.detail98){__v98SurfaceDetail(t.image,theme==='snow'?'ice':'stone',theme+role);t.userData.detail98=true;t.needsUpdate=true;}return t;};
window.__AURELIA_QUALITY98__={audit:()=>({build:98,actorTextureSize:__v60Mobile?512:1024,architectureTextureSize:__v60Mobile?512:1024,furnitureAtlasSize:__v98.atlas?.image.width||0,enhancedMaps:__v98.enhancedMaps,sharedFurnitureMaterial:!!__v98.material,textureDownscaling:false})};
