/* Mobile atlas uses the full viewport with a dedicated right sidebar; PC DOM and handlers stay native. */
if(__v60Mobile){
 const atlas=$('atlas'),body=atlas.querySelector('.atlas-body'),map=atlas.querySelector('.atlas-map'),legend=atlas.querySelector('.atlas-legend'),head=atlas.querySelector('.atlas-head'),foot=atlas.querySelector('.atlas-foot'),places=$('atlas-list');
 const side=document.createElement('aside');side.className='atlas-sidebar112';side.setAttribute('aria-label','Información y controles del mapa');
 const notes=document.createElement('p');notes.className='atlas-notes112';notes.setAttribute('aria-live','polite');side.append(head,foot,legend,notes,places);atlas.append(side);atlas.classList.add('mobile-atlas112');
 const css=document.createElement('style');css.textContent=`
 html[data-aurelia-device="mobile"] #aurelia-game.hud101 .atlas.mobile-atlas112{position:fixed!important;inset:0!important;width:100vw!important;height:100dvh!important;max-width:none!important;max-height:none!important;display:grid!important;grid-template-columns:minmax(0,1fr) clamp(144px,28vw,236px)!important;padding:0!important;margin:0!important;gap:0!important;zoom:1!important;z-index:80!important;background:#102530!important;overflow:hidden!important;border:0!important;border-radius:0!important}
 html[data-aurelia-device="mobile"] #aurelia-game .atlas.mobile-atlas112[hidden]{display:none!important}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 .atlas-body{position:relative!important;display:block!important;grid-column:1!important;grid-row:1!important;inset:auto!important;width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;padding:0!important;margin:0!important;overflow:hidden!important}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 .atlas-map{position:absolute!important;inset:0!important;display:block!important;width:100%!important;height:100%!important;padding:0!important}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 #ag-world-canvas{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;aspect-ratio:auto!important;display:block!important;touch-action:none!important}
 html[data-aurelia-device="mobile"] #aurelia-game .atlas-sidebar112{grid-column:2;grid-row:1;min-width:0;min-height:0;height:100%;overflow:auto;overscroll-behavior:contain;touch-action:pan-y;padding:max(8px,env(safe-area-inset-top)) max(8px,env(safe-area-inset-right)) max(8px,env(safe-area-inset-bottom)) 8px;background:#102530;border-left:1px solid #a8bdad55;color:#fff4d4;font:12px/1.4 system-ui}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 .atlas-head{position:sticky;top:-8px;background:#102530;z-index:2;display:grid!important;grid-template-columns:1fr auto!important;gap:6px!important;align-items:start!important;padding:0 0 8px!important}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 .atlas-head>div:first-child{grid-column:1;min-width:0}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 .atlas-head h2{font:700 17px/1.2 system-ui!important;overflow-wrap:anywhere;margin:4px 0!important}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 .atlas-head .eyebrow{font-size:9px!important;letter-spacing:0!important}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 .atlas-head span{font-size:10px!important;white-space:normal!important}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 #ag-atlas-close{grid-column:2;grid-row:1;font-size:11px!important;min-height:44px!important;padding:6px!important}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 .atlas-tools{grid-column:1/-1;grid-row:2;display:flex!important;flex-wrap:wrap!important;gap:5px!important;margin:0!important;width:100%!important}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 .atlas-tools button{flex:1 1 44px;min-width:0!important;min-height:44px!important;font-size:11px!important;padding:6px!important;white-space:normal!important;overflow-wrap:anywhere!important}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 #ag-atlas-zoom{align-self:center;min-width:35px;text-align:center}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 .atlas-legend{position:static!important;inset:auto!important;transform:none!important;width:100%!important;max-width:none!important;text-align:left!important;font:11px/1.4 system-ui!important;padding:8px 0!important;margin:0!important;background:none!important;pointer-events:auto}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 .atlas-places{position:static!important;inset:auto!important;width:100%!important;max-width:none!important;max-height:none!important;overflow:visible!important;padding:0!important;margin:0!important;background:none!important;box-shadow:none!important}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 #ag-place-list{width:100%!important}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 .place-button{width:100%!important;min-height:44px!important;white-space:normal!important;font-size:12px!important}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 .atlas-foot{position:static!important;inset:auto!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:8px!important;padding:8px 0!important;margin:0!important;background:none!important;width:100%!important}
 html[data-aurelia-device="mobile"] #aurelia-game .mobile-atlas112 #ag-map-destination{position:static!important;inset:auto!important;display:block!important;max-width:100%!important;width:100%!important;white-space:normal!important;overflow-wrap:anywhere;font-size:12px!important}
 html[data-aurelia-device="mobile"] #aurelia-game.hud101 #ag-mini-zoom87{display:none!important}
 html[data-aurelia-device="mobile"] #aurelia-game .atlas-notes112{font:11px/1.4 system-ui;overflow-wrap:anywhere;margin:6px 0}
 `;document.head.append(css);
 const draw=_fo;_fo=function(...args){
  if(atlas.hidden)return draw(...args);
  const context=$('world-canvas').getContext('2d'),fill=context.fillText,stroke=context.strokeText,annotations=new Set(),indoor=!!__v75At()||!!__v76MapTown();
  const printed=(fn,values)=>{const text=String(values[0]).trim();if(/^(?:[PS]?\d+|[↑↓←→↗↘↙↖]+)$/.test(text))return fn.apply(context,values);if(indoor&&text)annotations.add(text);};
  context.fillText=(...values)=>printed(fill,values);context.strokeText=(...values)=>printed(stroke,values);
  try{return draw(...args);}finally{
   context.fillText=fill;context.strokeText=stroke;const area=__v75At(),p=__v87Coord(_14.x,_14.z);let location=p.letter+'–'+p.number;
   if(area?.plan103){const point=[_14.x-area.x,_14.z-area.z],room=area.plan103.rooms.find(r=>Math.abs(point[0]-r.x)<=r.w/2&&Math.abs(point[1]-r.z)<=r.d/2);location='Planta '+(area.plan103.floor+1)+' · '+(room?'sala '+room.label:'pasillo');}else if(area)location='interior';
   notes.textContent='Norte ↑ · Tu posición: '+location+(annotations.size?' · '+[...annotations].join(' · '):'');
  }
 };
 let portrait=null;
 function fitOrientation(){
  if(atlas.hidden)return;const tall=map.clientHeight>map.clientWidth*1.3;
  if(tall!==portrait){portrait=tall;if(tall&&_ak===1&&!__v75At()&&!__v76MapTown()){_ak=_18((map.clientHeight-32)/Math.max(1,map.clientWidth-32),1,7);const m=_aq(),size=_1d*m.scale,maxX=Math.max(0,(size-m.w)/2),maxY=Math.max(0,(size-m.h)/2);_al={x:_18(-_14.x*m.scale,-maxX,maxX),y:_18(-_14.z*m.scale,-maxY,maxY)};}}
  _fo();
 }
 const openMap=_fm;_fm=function(open){const r=openMap(open);if(open){places.hidden=false;side.scrollTop=0;portrait=null;fitOrientation();}return r;};
 const observer=new ResizeObserver(fitOrientation);observer.observe(map);
}
