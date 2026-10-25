/* Keep construction queries local too; floor lists are append-only between collision-index rebuilds. */
const __v115CollisionIndex=_22;_22=function(...args){if(__v114Perf.building)__v114Perf.floorGrids=new WeakMap();return __v115CollisionIndex(...args);};
const __v115HazardGrids=new WeakMap();
function __v115BandSolids(a,x,z){
 let index=__v115HazardGrids.get(a.colliders);if(!index||index.length!==a.colliders.length){index={length:a.colliders.length,grid:new Map(),fallback:[]};
  for(const c of a.colliders){if(c.secret85||c.riddle102||c.spikes88||c.tag==='trap')continue;const w=c.w??c.r,d=c.d??c.r;
   if(!Number.isFinite(c.x+c.z+w+d)){index.fallback.push(c);continue;}
   const radius=Math.hypot(w,d)+.2;for(let ix=Math.floor((c.x-radius)/16);ix<=Math.floor((c.x+radius)/16);ix++)for(let iz=Math.floor((c.z-radius)/16);iz<=Math.floor((c.z+radius)/16);iz++){const key=ix+','+iz;let cell=index.grid.get(key);if(!cell)index.grid.set(key,cell=[]);cell.push(c);}
  }__v115HazardGrids.set(a.colliders,index);
 }
 return [...index.fallback,...index.grid.get(Math.floor(x/16)+','+Math.floor(z/16))||[]];
}
const __v115CrossSection=__v108CrossSection;__v108CrossSection=function(...args){const previous=__v114Perf.stableGeometry;__v114Perf.stableGeometry=true;try{return __v115CrossSection(...args);}finally{__v114Perf.stableGeometry=previous;}};
/* Decode at most two architectural sheets at once and release their full-size bitmaps before world construction. */
const __v115Decode={active:0,peak:0,released:0,loaded:0};
async function __v115LoadArtwork(){
 await Promise.resolve();const entries=Object.entries(__v72AtlasData);let next=0;
 async function worker(){for(;;){const index=next++;if(index>=entries.length)return;const[set,data]=entries[index];let image,close=()=>{};__v115Decode.active++;__v115Decode.peak=Math.max(__v115Decode.peak,__v115Decode.active);
  try{
   const response=await fetch(data);if(!response.ok)throw Error('HTTP '+response.status);const url=URL.createObjectURL(await response.blob());
   close=()=>{if(image){image.onload=image.onerror=null;image.removeAttribute('src');}URL.revokeObjectURL(url);__v115Decode.released++;};
   image=await new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('No se pudo cargar el atlas '+set));img.src=url;});
   const w=image.width/5,h=image.height/2;
   for(let slot=0;slot<10;slot++){const t=__v72Tex(set,slot),c=t.image,ctx=c.getContext('2d');ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(image,(slot%5)*w+.5,Math.floor(slot/5)*h+.5,w-1,h-1,0,0,c.width,c.height);t.needsUpdate=true;}
   __v72Loaded.add(set);__v115Decode.loaded++;
  }finally{close();__v115Decode.active--;}
 }}await Promise.all([worker(),worker()]);
}
window.__AURELIA_STARTUP115__={audit:()=>({...__v115Decode,web:!!window.__AURELIA_WEB115__,resolutionPreserved:true})};
