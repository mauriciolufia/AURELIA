/* Full crossings, falling lava, readable navigation and mountain-only loose slopes. */
function __v104Slope(x,z){
 const m=__v95North.mountain,r=Math.hypot(x-m.x,z-m.z),v=Math.hypot(x-_go.x,z-_go.z);
 if(r<m.r+12&&r>15){const road=__v102MountainRoad(x,z);if(road?.distance<=4.1)return null;return{mountain:'yeti',height:__v102Mountain.points[0].y};}
 if(v<240&&v>48){const road=__v103RoadAt(x,z),camp=__v103.camp;if(road?.d<=4.2||camp&&Math.abs(x-camp.x)<10&&Math.abs(z-camp.z)<8.5)return null;return{mountain:'volcano',height:__v103.road[0].y};}
 return null;
}
let __v104Moving=false;
const __v104Hit=_i7;_i7=function(x,z,y){
 if(__v104Moving&&!_v){const slope=__v104Slope(x,z);if(slope){const target=_2r(x,z);if(target>slope.height+3&&target>_2r(_14.x,_14.z)+.0005)return true;}}
 return __v104Hit(x,z,y);
};
function __v104Crossing(a,p,from,to){
 const c={x:a.x+p.x,z:a.z+p.z,w:p.w/2,d:p.d/2,bottom:a.y,top:a.y+8};return __v101SweptHit(c,from,to,a.y,.3);
}
function __v104BandEffect(a,p){if(p.type==='darkness')__v75Activate({type:'dark',area:a});else __v75Damage(.075,'Pinchos',null);}
const __v104Move=_3m;_3m=function(dt){
 if(!_u||_74())return __v104Move(dt);const from={x:_14.x,z:_14.z},area=__v103AreaAt();let result;
 __v104Moving=true;try{result=__v104Move(dt);}finally{__v104Moving=false;}
 if(!_v&&area===__v103AreaAt()&&area)for(const p of area.hazards)if(p.band&&(__v103.clock+p.phase)%5.5<1.25&&__v104Crossing(area,p,from,_14))__v104BandEffect(area,p);
 const a=__v75At();if(!_v&&a&&!a.plan103)for(const t of a.traps||[])if(['spikes','dark','vapor102','poison'].includes(t.type)&&t.active&&__v101SweptHit({x:t.x,z:t.z,w:t.w/2,d:t.d/2,bottom:t.y,top:t.y+8},from,_14,t.y,.3)&&t.lastHit!==t.cycle){t.lastHit=t.cycle;__v75Activate(t);}
 // Only these two mountains slide. Roads, the camp, summits and all other terrain retain normal controls.
 const slope=!_v&&__v104Slope(_14.x,_14.z);if(slope&&_14.y-1.85-_2r(_14.x,_14.z)<5&&_2r(_14.x,_14.z)>slope.height+3){
  const h=_2r(_14.x,_14.z),gx=(_2r(_14.x+.4,_14.z)-_2r(_14.x-.4,_14.z))/.8,gz=(_2r(_14.x,_14.z+.4)-_2r(_14.x,_14.z-.4))/.8,grade=Math.hypot(gx,gz);
  if(grade>.15){const distance=Math.min(.8,dt*Math.min(10,3+grade*5)),x=_14.x-gx/grade*distance,z=_14.z-gz/grade*distance,next=_2r(x,z);if(next<h&&!__v104Hit(x,z,_14.y)){_14.x=x;_14.z=z;_14.y=Math.max(next+1.85,_14.y-Math.max(.05,(h-next)));_12=Math.min(0,_12);}}
 }
 return result;
};
function __v104MapPoint(x,z){return{x:60+(x/8+12.5)*38,y:165+(z/8+12.5)*38};}
__v103Map=function(){
 const current=__v103AreaAt(),box=__v75Open('Caldera de Obsidiana · mapa'),pane=document.createElement('div'),layer=document.createElement('div'),img=document.createElement('img'),svg=document.createElementNS('http://www.w3.org/2000/svg','svg'),status=document.createElement('p');let zoom=__v60Mobile?2.5:1,selected=current?.floor103||0;
 pane.style.cssText='max-height:55vh;overflow:auto;touch-action:pan-x pan-y pinch-zoom';layer.style.cssText='position:relative;width:'+zoom*100+'%';img.style.cssText='display:block;width:100%;height:auto';svg.setAttribute('viewBox','0 0 1680 1500');svg.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none';svg.setAttribute('aria-label','Tu posición y escaleras');layer.append(img,svg);pane.append(layer);box.append(status,pane);
 const center=()=>{if(!current||selected!==current.floor103)return;const p=__v104MapPoint(_14.x-current.x,_14.z-current.z);pane.scrollTo({left:p.x/1680*layer.offsetWidth-pane.clientWidth/2,top:p.y/1500*layer.offsetHeight-pane.clientHeight/2});};
 const draw=()=>{const a=__v103.areas[selected];img.src=__v103Blueprints[selected];img.alt='Plano completo de la planta '+(selected+1);status.textContent=current?'Estás en la planta '+(current.floor103+1)+' · tú: flecha azul · descenso: flecha turquesa':'Descenso: flecha turquesa · selecciona una planta';let content='';
  for(const s of a.plan103.props.filter(p=>['up','down','exit','relic'].includes(p.type))){const p=__v104MapPoint(s.x,s.z),down=s.type==='down',text=down?'↓ BAJAR A PLANTA '+(selected+2):s.type==='up'?'↑ SUBIR':s.type==='exit'?'SALIDA':'RELIQUIA';content+=`<g data-stair="${s.type}" transform="translate(${p.x} ${p.y})"><circle r="23" fill="#063b43" stroke="#70ffe8" stroke-width="5"/><text y="9" fill="white" font-size="30" text-anchor="middle" font-weight="bold">${down?'↓':s.type==='up'?'↑':'★'}</text><text x="30" y="-25" fill="#70ffe8" stroke="#07131d" stroke-width="6" paint-order="stroke" font-size="23" font-weight="bold">${text}</text></g>`;}
  if(current===a){const p=__v104MapPoint(_14.x-a.x,_14.z-a.z);content+=`<g data-player-marker="true" data-x="${p.x}" data-y="${p.y}" transform="translate(${p.x} ${p.y})"><circle r="29" fill="#057aff" fill-opacity=".22" stroke="white" stroke-width="4"><animate attributeName="r" values="23;34;23" dur="1.6s" repeatCount="indefinite"/></circle><path d="M0 -22 L-14 16 L0 9 L14 16 Z" transform="rotate(${-yaw*180/Math.PI})" fill="#24baff" stroke="#071b34" stroke-width="5"/><text y="-40" text-anchor="middle" fill="white" stroke="#10273d" stroke-width="7" paint-order="stroke" font-size="26" font-weight="bold">ESTÁS AQUÍ</text></g>`;}svg.innerHTML=content;for(const b of box.querySelectorAll('[data-floor104]'))b.setAttribute('aria-current',Number(b.dataset.floor104)===selected?'true':'false');};
 img.onload=center;__v75Button(box,'Centrar en mi personaje',()=>{if(current){selected=current.floor103;draw();center();}});__v75Button(box,'Ampliar plano',()=>{zoom=Math.min(4,zoom+.5);layer.style.width=zoom*100+'%';center();});__v75Button(box,'Reducir plano',()=>{zoom=Math.max(1,zoom-.5);layer.style.width=zoom*100+'%';center();});for(let i=0;i<5;i++){__v75Button(box,'Planta '+(i+1),()=>{selected=i;draw();pane.scrollTo(0,0);});box.lastElementChild.dataset.floor104=i;}draw();
};

// Long-distance travel leaves a dungeon; local wall-passage spells still obey every puzzle seal.
let __v104PlaceTransit=false;
const __v104PlaceTravel=__v87PlaceTravel;__v87PlaceTravel=function(index){if(!Number.isInteger(index)||!_1h[index])return false;__v104PlaceTransit=true;try{return __v104PlaceTravel(index);}finally{__v104PlaceTransit=false;}};
