/* Magma on four, infernal metal on five, imperial Eclipse surfaces on the final floor. */
const __v131Materials=new Map();
function __v131Imperial(role){
 const size=__v60Mobile?256:512,canvas=document.createElement('canvas'),glow=document.createElement('canvas');
 canvas.width=canvas.height=glow.width=glow.height=size;
 const c=canvas.getContext('2d'),e=glow.getContext('2d');c.scale(size/512,size/512);e.scale(size/512,size/512);
 // Keep the original violet stone, gold borders and imperial tracery beneath the eclipse.
 c.drawImage(__v88ImperialMaterial(role).map.image,0,0,512,512);e.fillStyle='#000';e.fillRect(0,0,512,512);
 const centers=role==='roof'?[[256,256,48]]:role==='wall'?[[128,150,34],[384,150,34]]:[[128,128,31],[384,384,31]];
 for(const[x,y,r]of centers){
  c.fillStyle='#191322';c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();
  for(const[ctx,color,width,extra]of[[c,'#b99561',3,6],[c,'#8b628f',2,12],[e,'#8c6440',1.5,6]]){
   ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.arc(x,y,r+extra,0,Math.PI*2);ctx.stroke();
  }
  c.fillStyle='#e8c58a';c.beginPath();c.arc(x+1,y,r*.88,-1.35,1.35);c.arc(x-r*.18,y,r*.91,1.1,-1.1,true);c.fill();
  for(let i=0;i<12;i++){const a=i*Math.PI/6;c.strokeStyle='#bb9364';c.lineWidth=1.5;c.beginPath();c.moveTo(x+Math.cos(a)*(r+16),y+Math.sin(a)*(r+16));c.lineTo(x+Math.cos(a)*(r+22),y+Math.sin(a)*(r+22));c.stroke();}
 }
 const make=(image,name)=>{const t=new _0.CanvasTexture(image);t.name=name;t.colorSpace=_0.SRGBColorSpace;t.wrapS=t.wrapT=_0.RepeatWrapping;t.anisotropy=Math.min(__v60Mobile?2:4,_5.capabilities.getMaxAnisotropy());return t;};
 return{map:make(canvas,'Eclipse imperial · Planta 6 · '+role),emissiveMap:make(glow,'Oro del eclipse · '+role)};
}
function __v131Surface(level,role){
 if(level===5)return __v131Imperial(role);
 const final=level===3,size=__v60Mobile?256:512;
 const canvas=document.createElement('canvas'),glow=document.createElement('canvas');
 canvas.width=canvas.height=glow.width=glow.height=size;
 const c=canvas.getContext('2d'),e=glow.getContext('2d');
 c.scale(size/512,size/512);e.scale(size/512,size/512);
 let seed=131+level*173+['floor','wall','roof'].indexOf(role)*197;
 const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 c.fillStyle=final?'#211b1c':'#302827';c.fillRect(0,0,512,512);
 e.fillStyle='#000';e.fillRect(0,0,512,512);
 const stroke=(ctx,points,color,width)=>{ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineJoin='round';ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();};
 const arc=(ctx,x,y,r,color,width)=>{ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.stroke();};
 // Riveted armour plates on five, fractured basalt masonry on six.
 const cellW=256,cellH=role==='wall'?256:128;
 for(let row=0;row<512/cellH;row++)for(let col=-1;col<2;col++){
  const x=col*cellW+(final&&row%2?128:0),y=row*cellH;
  const gradient=c.createLinearGradient(x,y,x+cellW,y+cellH);
  gradient.addColorStop(0,final?'#514041':'#65534b');
  gradient.addColorStop(.4,final?'#362a2d':'#493b35');
  gradient.addColorStop(1,final?'#211d24':'#272627');
  c.fillStyle=gradient;c.fillRect(x+4,y+4,cellW-8,cellH-8);
  stroke(c,[[x+8,y+cellH-9],[x+8,y+8],[x+cellW-9,y+8]],final?'#79605b':'#9a7961',3);
  stroke(c,[[x+cellW-8,y+12],[x+cellW-8,y+cellH-8],[x+13,y+cellH-8]],'#151418',5);
  if(!final){
   c.strokeStyle='#191719';c.lineWidth=5;c.strokeRect(x+18,y+18,cellW-36,cellH-36);
   c.strokeStyle='#745044';c.lineWidth=2;c.strokeRect(x+21,y+21,cellW-42,cellH-42);
   for(const dx of[14,cellW-14])for(const dy of[14,cellH-14]){
    c.fillStyle='#171619';c.beginPath();c.arc(x+dx,y+dy,6,0,Math.PI*2);c.fill();
    c.fillStyle='#ad8970';c.beginPath();c.arc(x+dx-1,y+dy-1,3.5,0,Math.PI*2);c.fill();
    stroke(c,[[x+dx-2,y+dy],[x+dx+2,y+dy]],'#322c2a',1);
   }
  }
 }
 // Deterministic mineral grain, corrosion and etched scratches remain readable up close.
 for(let i=0;i<9500;i++){
  const x=random()*512,y=random()*512,v=random();
  c.fillStyle=v<.35?(final?'#100e154d':'#16151866'):v<.7?(final?'#b68a6633':'#c2834e40'):'#eac69b19';
  c.fillRect(x,y,.7+random()*2,.6+random()*2);
 }
 for(let i=0;i<95;i++){
  const x=random()*512,y=random()*512;
  stroke(c,[[x,y],[x+random()*19,y+random()*7]],final?'#9c646333':'#d0a27a35',.8);
 }
 // Periodic wrapped fissures: no added geometry, dynamic lights, particles or frame work.
 const cracks=final?18:7;
 for(let i=0;i<cracks;i++){
  let x=random()*512,y=random()*512;const points=[[x,y]],angle=random()*Math.PI*2;
  for(let j=0;j<7;j++){x+=Math.cos(angle)*14+(random()-.5)*22;y+=Math.sin(angle)*14+(random()-.5)*22;points.push([x,y]);}
  for(const ox of[-512,0,512])for(const oy of[-512,0,512]){
   c.save();e.save();c.translate(ox,oy);e.translate(ox,oy);
   stroke(c,points,'#0d0b10',final?11:7);
   stroke(c,points,final?'#a23423':'#763528',final?6:3);
   stroke(c,points,final?'#ed7138':'#b35535',final?2.4:1);
   stroke(e,points,final?'#b6290c':'#4e1607',final?6:2.5);
   stroke(e,points,final?'#ffb452':'#bc4b1e',final?1.7:.7);
   c.restore();e.restore();
  }
 }
 // Engraved ritual seals; the final vault has larger, hotter concentric glyphs.
 function seal(x,y,r){
  const ink=final?'#b37c58':'#98724d',fire=final?'#ff792d':'#a43e1d';
  arc(c,x,y,r+5,'#100e13',7);arc(c,x,y,r,ink,2);arc(c,x,y,r*.77,ink,1.5);
  arc(e,x,y,r,fire,final?1.6:.6);
  const star=[];for(let i=0;i<=5;i++){const a=-Math.PI/2+i*4*Math.PI/5;star.push([x+Math.cos(a)*r*.69,y+Math.sin(a)*r*.69]);}
  stroke(c,star,ink,2);stroke(e,star,fire,final?1.8:.65);
  for(let i=0;i<12;i++){
   const a=i*Math.PI/6,dx=Math.cos(a),dy=Math.sin(a),px=x+dx*r*.89,py=y+dy*r*.89;
   stroke(c,[[px-dy*3,py+dx*3],[px+dy*3,py-dx*3],[px+dx*4,py+dy*4]],ink,1.5);
  }
 }
 if(role==='floor'){seal(128,192,49);seal(384,448,49);}
 else if(role==='roof'){
  seal(256,256,final?137:110);
  for(const x of[32,480])for(let y=0;y<512;y+=24){
   c.strokeStyle='#100f14';c.lineWidth=7;c.beginPath();c.ellipse(x,y,7,14,0,0,Math.PI*2);c.stroke();
   c.strokeStyle=final?'#98766a':'#a48666';c.lineWidth=2;c.stroke();
  }
 }else{
  for(const x of[128,384]){
   seal(x,80,42);
   if(final){
    // Horned skull reliefs, recessed sockets, individual teeth and hanging ribs.
    const bone=c.createLinearGradient(x-35,145,x+35,240);bone.addColorStop(0,'#bca28a');bone.addColorStop(.5,'#7a635a');bone.addColorStop(1,'#493b38');
    c.fillStyle=bone;c.beginPath();c.moveTo(x-27,164);c.bezierCurveTo(x-48,128,x+48,128,x+27,164);c.lineTo(x+25,190);c.lineTo(x+15,208);c.lineTo(x-15,208);c.lineTo(x-25,190);c.closePath();c.fill();
    for(const side of[-1,1]){
     c.fillStyle='#a88b74';c.beginPath();c.moveTo(x+side*22,151);c.quadraticCurveTo(x+side*58,135,x+side*42,108);c.quadraticCurveTo(x+side*42,139,x+side*13,142);c.fill();
     c.fillStyle='#1b1117';c.beginPath();c.ellipse(x+side*13,170,10,7,side*.3,0,Math.PI*2);c.fill();
     stroke(e,[[x+side*19,170],[x+side*8,174]],'#ef3d17',3);
     for(let i=0;i<4;i++)stroke(c,[[x+side*6,219+i*12],[x+side*(25-i*3),224+i*12],[x+side*33,219+i*12]],'#947763',4);
    }
    c.fillStyle='#24151a';c.beginPath();c.moveTo(x,178);c.lineTo(x+5,190);c.lineTo(x-5,190);c.fill();
    for(let i=0;i<7;i++){c.fillStyle=i%2?'#b6a08b':'#dac1a0';c.fillRect(x-14+i*4,196,2.7,9);}
   }else{
    // Vent grilles, copper framing and dark ritual stains on the armour panels.
    c.fillStyle='#21171a';c.fillRect(x-45,145,90,80);
    for(let i=0;i<7;i++){stroke(c,[[x-40,151+i*10],[x+40,151+i*10]],'#796053',4);stroke(c,[[x-39,155+i*10],[x+39,155+i*10]],'#130f14',3);}
    stroke(c,[[x-48,140],[x+48,140],[x+48,229],[x-48,229],[x-48,140]],'#9c7352',3);
   }
  }
 }
 const make=(image,name)=>{const t=new _0.CanvasTexture(image);t.name=name;t.colorSpace=_0.SRGBColorSpace;t.wrapS=t.wrapT=_0.RepeatWrapping;t.anisotropy=Math.min(__v60Mobile?2:4,_5.capabilities.getMaxAnisotropy());return t;};
 return{map:make(canvas,'Eclipse '+(level+1)+' · '+role),emissiveMap:make(glow,'Brasas '+(level+1)+' · '+role)};
}
const __v131Material=__v85Mat;
__v85Mat=function(a,role){
 const level=a.design?.floor88;
 if(![3,4,5].includes(level)||!['floor','wall','roof'].includes(role))return __v131Material(a,role);
 const key=level+':'+role;
 if(!__v131Materials.has(key)){
  const m=(level===5?__v97ToonMaterial(__v88ImperialMaterial(role)):__v131Material(a,role)).clone(),maps=__v131Surface(level,role);
  m.name='V85 infernal131:'+key;m.color.set(level===5?'#f4e5fa':level===3?'#fff1df':'#fff4e7');m.map=maps.map;
  m.bumpMap=maps.map;m.bumpScale=role==='floor'?.025:.045;
  m.emissive.set('#ffffff');m.emissiveMap=maps.emissiveMap;m.emissiveIntensity=level===3?.65:level===5?.18:.25;
  m.userData.eclipseTheme131=level===3?'magma':level===4?'metal':'imperial';
  m.needsUpdate=true;__v131Materials.set(key,m);
 }
 return __v131Materials.get(key);
};
window.__AURELIA_INFERNAL131__={audit:()=>({floors:{4:'magma',5:'metal',6:'imperial'},materials:__v131Materials.size,textureSize:__v60Mobile?256:512,extraLights:0,animatedTextures:0})};
