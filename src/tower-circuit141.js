/* The map follows the same three enclosed corridors as the floor meshes and collision walls. */
const __v141Plan=__v83DrawPlan;__v83DrawPlan=function(c,w,h,a,markers=true){
 const result=__v141Plan(c,w,h,a,markers);if(!a?.tower139)return result;
 const t=a.mapTransform,P=p=>[t.ox+p[0]*t.scale,t.oz-p[1]*t.scale];c.save();
 if(a.floor139<9){
  c.strokeStyle='#ead39a';c.fillStyle='#ead39a';c.lineWidth=1.6;c.setLineDash([5,5]);
  const points=a.design.main.map(i=>P(a.design.centers[i]));c.beginPath();points.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.stroke();c.setLineDash([]);
  for(let i=0;i<points.length-1;i++){
   const p=points[i],q=points[i+1],x=(p[0]+q[0])/2,y=(p[1]+q[1])/2,angle=Math.atan2(q[1]-p[1],q[0]-p[0]);
   c.save();c.translate(x,y);c.rotate(angle);c.beginPath();c.moveTo(6,0);c.lineTo(-4,-4);c.lineTo(-4,4);c.closePath();c.fill();c.restore();
  }
 }
 c.font='bold 11px sans-serif';c.textAlign='center';c.fillStyle='#fff0bd';c.strokeStyle='#182c35';c.lineWidth=3;
 for(const st of __v139.stairs){if(st.lower!==a&&st.upper!==a)continue;const p=P([st.x,st.lower===a?st.z0:st.z1]),text=st.lower===a?'↑ SUBIR':'↓ BAJAR';c.strokeText(text,p[0],p[1]);c.fillText(text,p[0],p[1]);}
 c.restore();return result;
};
const __v141Map={floor:null},__v141MapButton=document.createElement('button'),__v141MapFloor=document.createElement('select');
__v141MapButton.id='ag-tower-plan141';__v141MapButton.textContent='Plano de la torre';__v141MapButton.hidden=true;
__v141MapFloor.id='ag-tower-floor141';__v141MapFloor.setAttribute('aria-label','Planta de la torre Carmesí');__v141MapFloor.hidden=true;
__v141MapFloor.style.cssText='padding:8px;min-height:38px;background:#19323d;color:#fff0ce;border:1px solid #627875;border-radius:4px;font:inherit';
for(let i=0;i<10;i++){const option=document.createElement('option');option.value=String(i);option.textContent=i===9?'Planta 10 · Dragón':'Planta '+(i+1);__v141MapFloor.append(option);}
_4.querySelector('.atlas-tools').append(__v141MapButton,__v141MapFloor);
__v141MapButton.onclick=()=>{__v141Map.floor=__v75At()?.tower139?__v75At().floor139:__v141Map.floor??0;__v76WorldOverride=false;_fo();};
__v141MapFloor.onchange=()=>{__v141Map.floor=Number(__v141MapFloor.value);__v76WorldOverride=false;_fo();};
const __v141Atlas=_fo;_fo=function(...args){
 const actual=__v75At(),near=__v139.areas.length>0&&(actual?.tower139||Math.hypot(_14.x-__v88Island.x,_14.z-__v88Island.z)<150),open=!$('atlas').hidden;
 __v141MapButton.hidden=__v141MapFloor.hidden=!near||!open;
 if(!near)__v141Map.floor=null;
 if(!open||!near||__v76WorldOverride||!actual?.tower139&&__v141Map.floor===null)return __v141Atlas(...args);
 const a=__v139.areas[__v141Map.floor??actual.floor139],canvas=$('world-canvas'),m=_aq();canvas.width=m.w;canvas.height=m.h;
 __v83DrawPlan(canvas.getContext('2d'),m.w,m.h,a,actual===a);__v141MapFloor.value=String(a.floor139);
 $('atlas-zoom').textContent='PLANTA '+(a.floor139+1);__v76LocalToggle.hidden=false;__v76LocalToggle.textContent='Mapamundo';
 const title=_4.querySelector('.atlas-head h2');if(title)title.textContent='Plano de '+a.name;
 const legend=_4.querySelector('.atlas-legend');if(legend)legend.textContent=a.floor139===9?'Salón del Dragón · ↓ Escalera de regreso':'Sala 1 → pasillo → sala 2 → pasillo → sala 3 → pasillo → sala 4 · ↑ Subir · ↓ Bajar';
};
const __v141OpenMap=_fm;_fm=function(open,...args){if(open){__v141Map.floor=null;__v141MapFloor.value=String(__v75At()?.floor139??0);}return __v141OpenMap(open,...args);};
// Old saves may leave the hero in the former central crossing. Recover only those invalid positions.
const __v141Load=_dn;_dn=function(...args){const r=__v141Load(...args),s=__v88Island;
 if(Math.abs(_14.x-s.x)<32&&Math.abs(_14.z-s.z)<32){const feet=_14.y-1.85,a=__v139.areas.find(a=>feet>=a.y-.5&&feet<a.y+a.ceilingHeight88-.5);
  if(a&&(!__v139Contains(a,_14.x,_14.z)||_i7(_14.x,_14.z,_14.y))){const p=a.rooms.reduce((best,p)=>Math.hypot(p.x-_14.x,p.z-_14.z)<Math.hypot(best.x-_14.x,best.z-_14.z)?p:best);_14.set(p.x,a.y+1.85,p.z);_12=0;}
 }return r;
};
