/* Build first, then prepare visible GPU programs and draw once before starting simulation. */
const __v121Boot={phase:'artwork',stage:'texturas',started:performance.now(),readyAt:0,firstFrameAt:0,entryFrames:0,frames:0,images:0,total:10,error:null,programs:0,warmed:0,visibleObjects:0,attempt:0};
let __v122Ticket=0,__v122Timer=null;
const __v121Status=document.createElement('p');__v121Status.id='ag-load-status121';__v121Status.setAttribute('role','status');__v121Status.setAttribute('aria-live','polite');$('start').insertAdjacentElement('afterend',__v121Status);
const __v121Entry=document.createElement('div');__v121Entry.id='ag-enter121';__v121Entry.hidden=true;__v121Entry.setAttribute('role','status');__v121Entry.textContent='Preparando la imagen del juego…';_4.appendChild(__v121Entry);
const __v122Actions=document.createElement('div');__v122Actions.id='ag-start-actions122';__v122Actions.hidden=true;__v121Status.insertAdjacentElement('afterend',__v122Actions);
const __v122Compatible=document.createElement('button');__v122Compatible.textContent='Entrar con gráficos compatibles';__v122Compatible.onclick=()=>{const url=new URL(location.href);url.searchParams.set('gpu','compatible');location.assign(url.href);};
const __v122Copy=document.createElement('button');__v122Copy.textContent='Copiar error';__v122Copy.onclick=()=>{const report=JSON.stringify(__v122Audit(),null,2);if(navigator.clipboard?.writeText)navigator.clipboard.writeText(report).then(()=>__v121Status.textContent='Error copiado. Puedes pegarlo en el chat.').catch(()=>{$('error').textContent=report;});else $('error').textContent=report;};__v122Actions.append(__v122Compatible,__v122Copy);
const __v121CSS=document.createElement('style');__v121CSS.textContent=`#ag-load-status121{font:14px/1.5 Arial,sans-serif;min-height:1.5em;color:#f3dfb9}#ag-load-status121[data-loading="true"]::before,#ag-enter121::before{content:"";display:inline-block;width:12px;height:12px;margin-right:9px;border:2px solid #f3dfb955;border-top-color:#f3dfb9;border-radius:50%;vertical-align:-2px;animation:aurelia-load121 .8s linear infinite}#ag-enter121{position:absolute;inset:0;z-index:1600;display:flex;align-items:center;justify-content:center;background:#102a35;color:#fff0ce;font:18px Arial,sans-serif;pointer-events:none}#ag-enter121[hidden],#ag-start-actions122[hidden]{display:none}#ag-start-actions122{display:flex;gap:8px;flex-wrap:wrap}#ag-error{overflow-wrap:anywhere;white-space:pre-wrap;user-select:text}@keyframes aurelia-load121{to{transform:rotate(360deg)}}`;document.head.appendChild(__v121CSS);
function __v121Message(phase,text){__v121Boot.phase=phase;__v121Status.textContent=text;__v121Status.dataset.loading=String(!['ready','failed','failed-entry','playing'].includes(phase));}
function __v121ArtworkProgress(done,total){__v121Boot.images=done;__v121Boot.total=total;if(__v121Boot.phase==='artwork')__v121Message('artwork','Cargando texturas · '+done+' / '+total);}
function __v121Paint(){return new Promise(resolve=>requestAnimationFrame(()=>setTimeout(resolve,0)));}
function __v121FrameAllowed(){return _u&&__v121Boot.phase==='playing';}
function __v122Audit(){const gl=_5.getContext?.();return{...__v121Boot,player:[_14.x,_14.y,_14.z],simulationTime:_10,newGame:!_7o,blocked:_74(),paused:__v59IsPaused(),keyW:!!_15.KeyW,openPanels:['quick-menu','settings','atlas','dialogue','rpg-panel'].filter(id=>!$(id).hidden),loading:['artwork','world','finishing','save','entering'].includes(__v121Boot.phase),ready:__v121Boot.readyAt>0,renderStarted:__v121Boot.firstFrameAt>0,renderer:_5compat,contextLost:!!gl?.isContextLost?.(),quality:$('quality').value,buffer:[_5.domElement.width,_5.domElement.height],compatible:new URLSearchParams(location.search).get('gpu')==='compatible',browser:navigator.userAgent};}
function __v122Fail(error,stage='entrada'){
 clearTimeout(__v122Timer);__v122Ticket++;__v121Boot.error=String(error?.message||error);__v121Boot.stage=stage;__v121Entry.hidden=true;_u=false;_4.classList.remove('playing');__v121Message('failed-entry','La entrada se detuvo. Puedes reintentar o usar gráficos compatibles.');$('error').hidden=false;$('error').textContent='No se pudo entrar · '+stage+': '+__v121Boot.error;$('start').disabled=false;$('start').textContent='Volver a intentar';__v122Actions.hidden=false;
 console.error('Aurelia: '+stage,error);
}
const __v121Render=_5.render;_5.render=function(scene,camera,...args){
 const r=__v121Render.call(this,scene,camera,...args);if(_u&&scene===_6&&camera===_7){__v121Boot.frames++;if(__v121Boot.phase==='entering'){clearTimeout(__v122Timer);__v121Boot.firstFrameAt=performance.now();__v121Boot.error=null;__v121Boot.stage='partida';__v121Message('playing','');__v121Entry.hidden=true;}}
 return r;
};
async function __v122Prepare(ticket){
 const check=()=>{if(ticket!==__v122Ticket)throw new Error('Entrada cancelada');if(__v96GraphicsLost||_5.getContext?.()?.isContextLost?.())throw new Error('El navegador perdió el dispositivo gráfico. Prueba los gráficos compatibles.');};
 try{
  await __v121Paint();check();__v121Boot.stage='cámara';_bl();__v81OrientCamera();_bg(true);__v93Visibility();_fk();
  if(typeof _5.compile==='function'){
   __v121Boot.stage='preparación gráfica';__v121Entry.textContent='Preparando los gráficos del lugar…';_6.updateMatrixWorld(true);_7.updateMatrixWorld(true);
   const frustum=new _0.Frustum().setFromProjectionMatrix(new _0.Matrix4().multiplyMatrices(_7.projectionMatrix,_7.matrixWorldInverse)),objects=[];
   _6.traverseVisible(o=>{if((o.isMesh||o.isLine||o.isPoints||o.isSprite)&&o.material&&(Array.isArray(o.material)?o.material.some(m=>m.visible):o.material.visible)&&o.layers.test(_7.layers)&&(!o.frustumCulled||(o.isSprite?frustum.intersectsSprite(o):frustum.intersectsObject(o))))objects.push(o);});
   __v121Boot.visibleObjects=objects.length;const group=new _0.Group(),gl=_5.getContext(),parallel=!!gl?.getExtension?.('KHR_parallel_shader_compile');
   for(let offset=0;offset<objects.length;offset+=64){check();group.children=objects.slice(offset,offset+64);_5.compile(group,_7,_6);const programs=_5.info.programs||[];__v121Boot.programs=programs.length;
    if(parallel)while(programs.some(p=>typeof p.isReady==='function'&&!p.isReady())){check();await new Promise(resolve=>setTimeout(resolve,12));}
    __v121Boot.warmed=Math.min(objects.length,offset+64);__v121Entry.textContent='Preparando gráficos · '+Math.round(__v121Boot.warmed/Math.max(1,objects.length)*100)+'%';await __v121Paint();
   }group.children=[];
  }
  check();__v121Boot.stage='primer fotograma';__v121Entry.textContent='Dibujando el mundo…';await __v121Paint();check();
  // Show the actual scene before NPC AI, traps, the minimap or other simulation can throw.
  _5.render(_6,_7);if(__v121Boot.phase==='entering')throw new Error('El renderizador no completó el primer fotograma');previous=performance.now();active=!document.hidden;
 }catch(e){if(ticket===__v122Ticket)__v122Fail(e,__v121Boot.stage);}
}
const __v121Click=$('start').onclick;$('start').onclick=function(...args){
 if(__v121Boot.phase==='failed'){location.reload();return;}if(!['ready','failed-entry'].includes(__v121Boot.phase))return;
 __v121Boot.attempt++;__v121Boot.entryFrames=0;__v121Boot.warmed=0;__v121Boot.error=null;__v121Message('entering','Preparando la imagen del juego…');__v121Entry.textContent='Preparando la imagen del juego…';__v121Entry.hidden=false;__v122Actions.hidden=true;$('error').hidden=true;
 try{__v121Click?.apply(this,args);if(!_u)throw new Error('No se pudo activar la partida');}catch(e){__v122Fail(e,'botón de entrada');return;}
 const ticket=++__v122Ticket;__v122Timer=setTimeout(()=>{if(ticket===__v122Ticket&&__v121Boot.phase==='entering')__v122Fail(new Error('La preparación gráfica no terminó. Prueba los gráficos compatibles.'),__v121Boot.stage);},45000);__v122Prepare(ticket);
};
const __v122Frame=frame;frame=function(now){try{return __v122Frame(now);}catch(e){__v122Fail(e,'actualización del mundo');}};
if(_5compat!=='canvas')_5.domElement.addEventListener('webglcontextlost',()=>{if(_u||__v121Boot.phase==='entering')__v122Fail(new Error('El navegador perdió el dispositivo gráfico.'),'gráficos');});
async function __v121Start(saved){
 $('start').disabled=true;$('start').textContent='Preparando aventura…';__v121Message('artwork','Cargando texturas · '+__v115Decode.loaded+' / 10');
 try{
  await __v72Ready;__v121Message('world','Preparando el mundo y sus habitantes…');await __v121Paint();_bj(_f);
  __v121Message('finishing','Terminando la preparación…');await __v121Paint();
  if(saved){__v121Message('save','Recuperando tu partida…');await __v121Paint();_dn(saved);await __v121Paint();}
  __v121Boot.readyAt=performance.now();__v121Message('ready','Listo para jugar');$('start').textContent=_7o?'Continuar aventura':'Comenzar en el sur';$('start').disabled=false;previous=performance.now();requestAnimationFrame(frame);
 }catch(e){__v121Boot.error=e.message;__v121Message('failed','No se pudo completar la carga. Puedes volver a intentarlo.');$('error').hidden=false;$('error').textContent='No se pudo iniciar el juego: '+e.message;$('start').textContent='Reintentar carga';$('start').disabled=false;console.error(e);}
}
window.__AURELIA_BOOT121__={audit:__v122Audit};
