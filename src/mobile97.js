/* Mobile input is opt-in by device detection. Desktop handlers stay intact. */
if (__v60Mobile) {
 const prefs = {camera:'first', autoRun:true, sensitivity:1};
 try {
  const saved=JSON.parse(localStorage.getItem('aurelia-mobile97')||'{}');
  if (saved.camera==='first'||saved.camera==='third') prefs.camera=saved.camera;
  if (typeof saved.autoRun==='boolean') prefs.autoRun=saved.autoRun;
  if (Number.isFinite(saved.sensitivity)) prefs.sensitivity=_18(saved.sensitivity,.4,2);
 } catch (_) {}
 const remember=()=>{try{localStorage.setItem('aurelia-mobile97',JSON.stringify(prefs));}catch(_){}};
 const look={x:0,y:0,last:performance.now()};
 const oldBegin=__v64Begin, oldCamera=_bl;
 __v64Begin=function(...args){oldBegin(...args);look.last=performance.now();};
 __v64Move=function(x,y){
  if(!_u||_74()){look.x=look.y=0;__v64EndLook();return;}
  const dx=x-__v64Look.x,dy=y-__v64Look.y;
  if(Number.isFinite(dx)&&Number.isFinite(dy)){
   const r=_4.getBoundingClientRect(),scale=.00675*prefs.sensitivity*844/Math.max(320,r.width,r.height);
   look.x-=dx*scale;look.y-=dy*scale;__v64Look.moves++;
   // A small immediate response keeps aim responsive; remaining motion is smoothed per frame.
   yaw+=look.x*.4;_11=_18(_11+look.y*.4,-1.45,1.45);look.x*=.6;look.y*=.6;
   if((_11>=1.45&&look.y>0)||(_11<=-1.45&&look.y<0))look.y=0;
   _bl();__v81OrientCamera();
  }
  __v64Look.x=x;__v64Look.y=y;
 };
 _bl=function(){
  const now=performance.now(),dt=_18((now-look.last)/1000,0,.05);look.last=now;
  if(!_u||_74()){look.x=look.y=0;}
  else{const blend=1-Math.exp(-35*dt);yaw+=look.x*blend;_11=_18(_11+look.y*blend,-1.45,1.45);look.x*=1-blend;look.y*=1-blend;}
  return oldCamera();
 };
 const resetLook=()=>{look.x=look.y=0;};
 const oldEndLook=__v64EndLook;
 __v64EndLook=function(){oldEndLook();if(!_u||_74())resetLook();};
 window.addEventListener('blur',resetLook);window.addEventListener('resize',resetLook);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)resetLook();});
 // Balanced mode requests 60 FPS while aiming, retaining its lower idle budget.
 const lookingFast=()=>$('quality').value!=='low'&&(__v64Look.id!==null||Math.hypot(look.x,look.y)>.001);
 const oldFrameReady=__v62FrameReady;
 __v62FrameReady=function(now){if(!lookingFast())return oldFrameReady(now);if(now-__v62LastFrame<1000/60-.75)return false;__v62LastFrame=now;return true;};
 const oldBudget=window.__AURELIA_MOBILE_PERFORMANCE__;
 window.__AURELIA_MOBILE_PERFORMANCE__=()=>({...oldBudget(),targetFps:lookingFast()?60:oldBudget().targetFps,cameraTargetFps:$('quality').value==='low'?30:60});
 const balanced=$('quality').querySelector('option[value="balanced"]');if(balanced)balanced.textContent='Móvil equilibrado · cámara hasta 60 FPS';
 const oldMovePlayer=_3m;
 _3m=function(dt){const running=_w;if(prefs.autoRun&&Math.hypot(_16.x,_16.y)>.12)_w=true;try{return oldMovePlayer(dt);}finally{_w=running;}};
 const oldRestore=_dn;
 _dn=function(...args){const result=oldRestore(...args);__aurSetCameraMode(prefs.camera);return result;};
 __aurSetCameraMode(prefs.camera);

 const style=document.createElement('style');style.id='aurelia-mobile97';style.textContent=`
 html[data-aurelia-device="mobile"] #aurelia-game .v97-actions{position:absolute;right:max(12px,env(safe-area-inset-right));bottom:max(14px,env(safe-area-inset-bottom));display:grid;grid-template-columns:repeat(3,72px);gap:8px;z-index:15;pointer-events:none}
 html[data-aurelia-device="mobile"] #aurelia-game:not(.playing) .v97-actions{display:none}
 html[data-aurelia-device="mobile"] #aurelia-game .v97-actions button{position:static!important;inset:auto!important;transform:none!important;width:72px!important;min-width:0!important;height:58px!important;min-height:58px!important;max-width:none!important;padding:6px!important;margin:0!important;font:600 12px/1.15 system-ui!important;white-space:normal!important;border-radius:17px!important;touch-action:none;pointer-events:auto;background:#163643ed;color:#fff3ce;border:2px solid #d8c895cc;box-shadow:0 3px 0 #081e29a6}
 html[data-aurelia-device="mobile"] #aurelia-game .v97-actions #ag-attack{grid-column:3;grid-row:1/3;height:124px!important;background:#915b3bed}
 html[data-aurelia-device="mobile"] #aurelia-game .v97-actions #ag-magic{grid-column:2;grid-row:1;background:#455d90ed}
 html[data-aurelia-device="mobile"] #aurelia-game .v97-actions button:active{filter:brightness(1.3)}
 html[data-aurelia-device="mobile"] #aurelia-game #ag-sprint,html[data-aurelia-device="mobile"] #aurelia-game .consumables,html[data-aurelia-device="mobile"] #aurelia-game .v76-quickslots{display:none!important}
 html[data-aurelia-device="mobile"] #aurelia-game .controls{left:50%!important;bottom:155px!important;transform:translateX(-50%)!important}
 html[data-aurelia-device="mobile"] #aurelia-game .controls #ag-interact{min-height:48px!important;max-width:140px;font-size:12px!important}
 html[data-aurelia-device="mobile"] #aurelia-game .joystick{width:112px!important;height:112px!important;left:max(18px,env(safe-area-inset-left))!important;bottom:max(20px,env(safe-area-inset-bottom))!important;z-index:15!important;touch-action:none}
 html[data-aurelia-device="mobile"] #aurelia-game .joystick .stick{width:48px!important;height:48px!important;left:32px!important;top:32px!important}
 html[data-aurelia-device="mobile"] #aurelia-game .mana-label{bottom:156px!important;right:16px!important}
 html[data-aurelia-device="mobile"] #aurelia-game .rpg-stats{bottom:153px!important;max-width:45%!important;min-width:0!important}
 html[data-aurelia-device="mobile"] #aurelia-game .minimap.minimap{width:112px!important;height:112px!important;top:65px!important}
 html[data-aurelia-device="mobile"] #aurelia-game #ag-selected-spell81{font:600 12px/1.25 system-ui;max-width:100%;white-space:normal}
 html[data-aurelia-device="mobile"] #aurelia-game .controls #ag-interact[hidden]{display:none!important}
 html[data-aurelia-device="mobile"] #aurelia-game .v97-tray{position:absolute;z-index:30;inset:10% max(12px,env(safe-area-inset-right)) 10% max(12px,env(safe-area-inset-left));max-width:500px;margin:auto;overflow:auto;padding:18px;border:2px solid #d8c895;border-radius:18px;background:#142d37fa;color:#fff3ce;touch-action:pan-y;font:15px system-ui}
 html[data-aurelia-device="mobile"] #aurelia-game .v97-tray[hidden]{display:none!important}
 html[data-aurelia-device="mobile"] #aurelia-game .v97-tray button{min-height:48px!important;margin:5px!important;padding:10px!important;font:14px system-ui!important}
 html[data-aurelia-device="mobile"] #aurelia-game .v97-tray h2{font:600 22px system-ui}
 @media(orientation:portrait){html[data-aurelia-device="mobile"] #aurelia-game .v97-actions{grid-template-columns:repeat(3,60px);gap:6px;right:10px}html[data-aurelia-device="mobile"] #aurelia-game .v97-actions button{width:60px!important;font-size:11px!important}html[data-aurelia-device="mobile"] #aurelia-game .controls{bottom:160px!important}}
 `;document.head.append(style);
 const dock=document.createElement('div');dock.className='v97-actions';dock.setAttribute('aria-label','Acciones táctiles');_4.append(dock);
 const button=(id,text,fn)=>{const b=document.createElement('button');b.id='ag-'+id;b.textContent=text;b.onclick=fn;return b;};
 const tray=document.createElement('section');tray.id='ag-mobile-picker';tray.className='v97-tray';tray.hidden=true;tray.setAttribute('role','dialog');tray.setAttribute('aria-modal','true');_4.append(tray);
 const oldBlocked=_74;_74=function(){return !tray.hidden||oldBlocked();};
 let opener=null;
 const close=()=>{tray.hidden=true;opener?.focus({preventScroll:true});};
 function open(kind,source){
  if(!_u||oldBlocked())return;opener=source;__v64EndLook();__v65ReleaseJoy();resetLook();Object.keys(_15).forEach(k=>_15[k]=false);_9i=false;
  tray.replaceChildren();const title=document.createElement('h2');title.textContent=kind==='magic'?'Escoger magia':'Usar objeto';title.id='ag-mobile-picker-title';tray.setAttribute('aria-labelledby',title.id);tray.append(title);
  if(kind==='magic'){
   const known=_5n.filter(s=>rpg.known.includes(s.id)&&rpg.level>=s.level);
   for(const s of known){const b=button('choose-'+s.id,s.name+' · '+s.cost+' MP',()=>{rpg.spell=s.id;close();_fl();_iv();});b.setAttribute('aria-pressed',String(rpg.spell===s.id));tray.append(b);}
   if(!known.length){const p=document.createElement('p');p.textContent='Aprende una técnica en una torre de magia.';tray.append(p);}
  }else for(const [id,label] of [['hp','Poción de salud'],['mp','Poción de maná'],['panacea','Panacea']]){
   if(!_9j[id])continue;const b=button('use-'+id,label+' · '+(_9e[id]||0),()=>{close();_9r(id);_fl();_iv();});b.disabled=!(_9e[id]>0);tray.append(b);
  }
  const cancel=button('picker-close','Volver al juego',close);tray.append(cancel);tray.hidden=false;cancel.focus({preventScroll:true});
 }
 const choose=button('choose-magic','Escoger magia',()=>open('magic',choose));
 const item=button('use-item','Usar objeto',()=>open('item',item));
 $('attack').textContent='Atacar';$('attack').setAttribute('aria-label','Atacar');$('jump').textContent='Saltar';$('jump').setAttribute('aria-label','Saltar');
 $('interact').textContent='Interactuar';$('interact').hidden=true;
 dock.append($('attack'),$('magic'),choose,item,$('jump'));
 const oldProximity=_78;
 _78=function(...args){const r=oldProximity(...args);$('interact').hidden=!_u||!(_i3||_2i||_70||_71);$('interact').textContent=_i3?'Usar puerta':_2i?'Hablar':_70?'Abrir cofre':_71?'Descansar':'Interactuar';return r;};
 const oldSpellHUD=__v81SpellHUD;
 __v81SpellHUD=function(...args){const r=oldSpellHUD(...args),s=_5n.find(s=>s.id===rpg.spell);__v81Selected.textContent=s?s.name+' · '+s.cost+' MP':'Escoge una magia';return r;};
 const oldHUD=_fl;_fl=function(...args){const r=oldHUD(...args);$('magic').textContent='Usar magia';$('magic').setAttribute('aria-label','Usar magia · '+(_5n.find(s=>s.id===rpg.spell)?.name||'sin técnica'));return r;};_fl();
 // Persist only deliberate menu selections, never desktop or programmatic camera changes.
 const cameraSelect=document.getElementById('ag-camera-mode');if(cameraSelect)cameraSelect.addEventListener('change',()=>{prefs.camera=cameraSelect.value==='third'?'third':'first';remember();});
 const settings=$('settings'),group=document.createElement('div');group.id='ag-mobile-settings';
 const sensitivity=document.createElement('label');sensitivity.textContent='Sensibilidad de cámara táctil';const range=document.createElement('input');range.id='ag-touch-sensitivity';range.type='range';range.min='.4';range.max='2';range.step='.05';range.value=prefs.sensitivity;range.oninput=()=>{prefs.sensitivity=Number(range.value);remember();};sensitivity.append(range);
 const runLabel=document.createElement('label');runLabel.className='check';const run=document.createElement('input');run.id='ag-auto-run';run.type='checkbox';run.checked=prefs.autoRun;run.onchange=()=>{prefs.autoRun=run.checked;remember();};runLabel.append(run,document.createTextNode('Correr automáticamente al mover la palanca'));
 group.append(sensitivity,runLabel);settings.append(group);
 document.addEventListener('keydown',e=>{if(e.code==='Escape'&&!tray.hidden){e.preventDefault();close();}},true);
 window.__AURELIA_MOBILE97__={audit:()=>({mobile:true,autoRun:prefs.autoRun,sensitivity:prefs.sensitivity,camera:__aurCameraMode,actions:[...dock.children].map(b=>b.textContent),pendingLook:Math.hypot(look.x,look.y)})};
}
