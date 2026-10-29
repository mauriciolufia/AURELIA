/* Visible release identification and a solid boundary around the tower's three corridors. */
const __v142Label=document.createElement('p');__v142Label.id='ag-version142';__v142Label.textContent='Versión 142 · Torre Carmesí';__v121Status.insertAdjacentElement('afterend',__v142Label);
const __v142Badge=document.createElement('span');__v142Badge.id='ag-build142';__v142Badge.textContent='v142';__v142Badge.style.cssText='font:12px Arial,sans-serif;color:#fff0ce;align-self:center;white-space:nowrap';_4.querySelector('.top-right').prepend(__v142Badge);
const __v142Collision=_i7;_i7=function(x,z,y=_14.y,...args){
 const tower=__v139.areas;if(tower.length&&Math.abs(x-__v88Island.x)<32&&Math.abs(z-__v88Island.z)<32){
  const feet=y-1.85,index=Math.min(9,Math.max(0,Math.floor((feet-tower[0].y+.5)/10))),a=tower[index];
  if(feet>=a.y-.5&&feet<a.y+a.ceilingHeight88-.4&&!__v139Contains(a,x,z))return true;
 }return __v142Collision(x,z,y,...args);
};
// The tower must be traversed on foot; free-flight movement otherwise bypasses every collision.
const __v142Move=_3m;_3m=function(...args){if(_v&&__v75At()?.tower139&&!__v139Balcony(__v75At())){_v=false;_12=0;$('flight').textContent='Volar';}return __v142Move(...args);};
