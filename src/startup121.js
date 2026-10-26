/* Finish construction and legacy deferred repairs before starting the 3D frame loop. */
const __v121Boot={phase:'artwork',started:performance.now(),readyAt:0,firstFrameAt:0,entryFrames:0,frames:0,images:0,total:10,error:null};
const __v121Status=document.createElement('p');__v121Status.id='ag-load-status121';__v121Status.setAttribute('role','status');__v121Status.setAttribute('aria-live','polite');$('start').insertAdjacentElement('afterend',__v121Status);
const __v121Entry=document.createElement('div');__v121Entry.id='ag-enter121';__v121Entry.hidden=true;__v121Entry.setAttribute('role','status');__v121Entry.textContent='Entrando al mundo…';_4.appendChild(__v121Entry);
const __v121CSS=document.createElement('style');__v121CSS.textContent=`#ag-load-status121{font:14px/1.5 Arial,sans-serif;min-height:1.5em;color:#f3dfb9}#ag-load-status121[data-loading="true"]::before,#ag-enter121::before{content:"";display:inline-block;width:12px;height:12px;margin-right:9px;border:2px solid #f3dfb955;border-top-color:#f3dfb9;border-radius:50%;vertical-align:-2px;animation:aurelia-load121 .8s linear infinite}#ag-enter121{position:absolute;inset:0;z-index:1600;display:flex;align-items:center;justify-content:center;background:#102a35;color:#fff0ce;font:18px Arial,sans-serif;pointer-events:none}#ag-enter121[hidden]{display:none}@keyframes aurelia-load121{to{transform:rotate(360deg)}}`;document.head.appendChild(__v121CSS);
function __v121Message(phase,text){__v121Boot.phase=phase;__v121Status.textContent=text;__v121Status.dataset.loading=String(!['ready','failed','playing'].includes(phase));}
function __v121ArtworkProgress(done,total){__v121Boot.images=done;__v121Boot.total=total;if(__v121Boot.phase==='artwork')__v121Message('artwork','Cargando texturas · '+done+' / '+total);}
function __v121Paint(){return new Promise(resolve=>requestAnimationFrame(()=>setTimeout(resolve,0)));}
function __v121FrameAllowed(){if(!_u)return false;if(__v121Boot.phase==='entering'&&__v121Boot.entryFrames++<2)return false;return true;}
const __v121Render=_5.render;_5.render=function(scene,camera,...args){const r=__v121Render.call(this,scene,camera,...args);if(_u&&scene===_6&&camera===_7)__v121Boot.frames++;if(_u&&scene===_6&&camera===_7&&__v121Boot.phase==='entering'){__v121Boot.firstFrameAt=performance.now();__v121Message('playing','');__v121Entry.hidden=true;}return r;};
const __v121Click=$('start').onclick;$('start').onclick=function(...args){if(__v121Boot.phase==='failed'){location.reload();return;}if(__v121Boot.phase!=='ready')return;__v121Boot.entryFrames=0;__v121Message('entering','Entrando al mundo…');__v121Entry.hidden=false;return __v121Click?.apply(this,args);};
async function __v121Start(saved){
 $('start').disabled=true;$('start').textContent='Preparando aventura…';__v121Message('artwork','Cargando texturas · '+__v115Decode.loaded+' / 10');
 try{
  await __v72Ready;__v121Message('world','Preparando el mundo y sus habitantes…');await __v121Paint();_bj(_f);
  // Old patches schedule material and actor repairs with setTimeout. Drain them before any 3D rendering.
  __v121Message('finishing','Terminando la preparación…');await __v121Paint();
  if(saved){__v121Message('save','Recuperando tu partida…');await __v121Paint();_dn(saved);await __v121Paint();}
  __v121Boot.readyAt=performance.now();__v121Message('ready','Listo para jugar');$('start').textContent=_7o?'Continuar aventura':'Comenzar en el sur';$('start').disabled=false;previous=performance.now();requestAnimationFrame(frame);
 }catch(e){__v121Boot.error=e.message;__v121Message('failed','No se pudo completar la carga. Puedes volver a intentarlo.');$('error').hidden=false;$('error').textContent='No se pudo iniciar el juego: '+e.message;$('start').textContent='Reintentar carga';$('start').disabled=false;console.error(e);}
}
window.__AURELIA_BOOT121__={audit:()=>({...__v121Boot,loading:['artwork','world','finishing','save'].includes(__v121Boot.phase),ready:__v121Boot.readyAt>0,renderStarted:__v121Boot.firstFrameAt>0})};
