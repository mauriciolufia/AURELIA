/* A spatial solid volume follows the actual steps. Only reachable step tops are passable. */
const __v140Stairs={flights:[],grid:new Map(),blocked:0};
function __v140StairsBuild(){
 const s=__v140Stairs;s.flights=[];s.grid.clear();
 const add=(p0,p1,y0,y1,w,steps)=>{const f={x0:p0.x,z0:p0.z,x1:p1.x,z1:p1.z,y0,y1,w,steps};s.flights.push(f);for(let x=Math.floor((Math.min(f.x0,f.x1)-w-1)/16);x<=Math.floor((Math.max(f.x0,f.x1)+w+1)/16);x++)for(let z=Math.floor((Math.min(f.z0,f.z1)-w-1)/16);z<=Math.floor((Math.max(f.z0,f.z1)+w+1)/16);z++){const key=x+','+z;if(!s.grid.has(key))s.grid.set(key,[]);s.grid.get(key).push(f);}};
 for(const st of __v139.stairs)add(__v83Point(st.lower,[st.x,st.z0]),__v83Point(st.lower,[st.x,st.z1]),st.lower.y,st.upper.y,3.4,60);
 for(const st of __v88Eclipse.stairs)for(const f of st.segments)add({x:f.x0,z:f.z0},{x:f.x1,z:f.z1},f.y0,f.y1,f.w,36);
 for(const t of[...__v94.towers,__v102Solar])for(const st of t.flights||[])add(__v83Point(st.lower,[st.x,st.z0]),__v83Point(st.lower,[st.x,st.z1]),st.lower.y,st.upper.y,2,72);
 const m=__v92Maya.stairs;if(m){const a=__v92Maya.areas[0];add(__v83Point(a,[m.x,m.z0]),__v83Point(a,[m.x,m.z1]),m.y0,m.y1,1.8,36);}
}
function __v140StairSolid(x,z,y){
 for(const f of __v140Stairs.grid.get(Math.floor(x/16)+','+Math.floor(z/16))||[]){
  if(y<=f.y0+.05||y-1.85>=f.y1-.55)continue;const dx=f.x1-f.x0,dz=f.z1-f.z0,len=Math.hypot(dx,dz),t=((x-f.x0)*dx+(z-f.z0)*dz)/(len*len),cross=Math.abs((x-f.x0)*dz-(z-f.z0)*dx)/len;
  if(t<0||t>1||cross>f.w+.36)continue;const top=f.y0+Math.ceil(t*f.steps)/f.steps*(f.y1-f.y0);
  if(y-1.85<top-.55)return true;
 }return false;
}
const __v140StairHit=_i7;_i7=function(x,z,y=_14.y,...args){if(__v140StairSolid(x,z,y)){__v140Stairs.blocked++;return true;}return __v140StairHit(x,z,y,...args);};
const __v140StairWorld=_bj;_bj=function(...args){const r=__v140StairWorld(...args);__v140StairsBuild();return r;};
window.__AURELIA_STAIRS140__={audit:()=>({solidFlights:__v140Stairs.flights.length,blocked:__v140Stairs.blocked,stepClearance:.55,spatialIndex:true})};
