/* A single RAF chain, reversible background pause, and in-memory GPU recovery. */
const __v124Lifecycle={suspended:false,manualBefore:false,frameId:null,reason:null,pauses:0,returns:0,recoverGame:false,recoveries:0};
function __v124ScheduleFrame(){
 const s=__v124Lifecycle;if(s.frameId!==null||s.suspended||document.hidden||!['ready','entering','playing'].includes(__v121Boot.phase))return;
 s.frameId=requestAnimationFrame(frame);
}
function __v124Release(){Object.keys(_15).forEach(k=>_15[k]=false);_16.x=_16.y=0;_17.id=null;_3i=null;_9i=false;if(typeof __v64EndLook==='function')__v64EndLook();if(typeof __v65ReleaseJoy==='function')__v65ReleaseJoy();__v104Ship.vertical=0;}
function __v124SetPause(value){if(window.__v124MobilePause)window.__v124MobilePause(value);else __v59ManualPause=!!value;}
function __v124ResetClock(){previous=performance.now();__v62LastFrame=-Infinity;__v59LastPaint=0;__v50Candy.lastBgAt=0;}
function __v124WatchEntry(){
 clearTimeout(__v122Timer);if(__v121Boot.phase!=='entering')return;
 const ticket=__v122Ticket;__v122Timer=setTimeout(()=>{if(ticket===__v122Ticket&&__v121Boot.phase==='entering')__v122Fail(new Error('La preparación gráfica no terminó. Prueba los gráficos compatibles.'),__v121Boot.stage);},45000);
}
function __v124Suspend(reason){
 const s=__v124Lifecycle;if(!s.suspended){s.manualBefore=__v59ManualPause;s.suspended=true;s.pauses++;}s.reason=reason;
 active=false;__v124Release();if(_u)__v124SetPause(true);__v124ResetClock();
 if(s.frameId!==null){cancelAnimationFrame(s.frameId);s.frameId=null;}
 if(__v121Boot.phase==='entering'){clearTimeout(__v122Timer);__v122Timer=null;}
}
function __v124Restore(gesture=false){
 const s=__v124Lifecycle;if(document.hidden||!gesture&&!document.hasFocus())return;
 const gl=_5.getContext?.();if(__v96GraphicsLost||gl?.isContextLost?.())return;
 const wasSuspended=s.suspended;s.suspended=false;s.reason=null;active=true;__v124ResetClock();__v124Release();
 if(wasSuspended)s.returns++;
 if(s.recoverGame){
  s.recoverGame=false;s.recoveries++;_u=true;_4.classList.add('playing');__v121Boot.error=null;__v121Boot.warmed=0;__v121Boot.entryFrames=0;__v121Boot.attempt++;
  __v121Message('entering','Recuperando los gráficos…');__v121Entry.hidden=false;__v121Entry.textContent='Recuperando los gráficos…';__v122Actions.hidden=true;$('error').hidden=true;
  const ticket=++__v122Ticket;__v124WatchEntry();__v122Prepare(ticket);
 }else if(__v121Boot.phase==='entering')__v124WatchEntry();
 if(wasSuspended&&_u)__v124SetPause(s.manualBefore);
 __v124ScheduleFrame();
}
// Capture before legacy blur/visibility handlers turn an automatic pause into a manual one.
window.addEventListener('blur',e=>{if(e.target===window)__v124Suspend('blur');},true);
document.addEventListener('visibilitychange',()=>{if(document.hidden)__v124Suspend('hidden');else __v124Restore();},true);
window.addEventListener('pagehide',()=>__v124Suspend('pagehide'),true);
window.addEventListener('pageshow',()=>__v124Restore());
document.addEventListener('freeze',()=>__v124Suspend('freeze'));
document.addEventListener('resume',()=>__v124Restore());
window.addEventListener('focus',e=>{if(e.target===window)__v124Restore();});
for(const event of['pointerdown','keydown'])window.addEventListener(event,()=>{if(__v124Lifecycle.suspended)__v124Restore(true);},true);
const __v124Frame=frame;frame=function(now){
 const s=__v124Lifecycle;if(s.frameId!==null){cancelAnimationFrame(s.frameId);s.frameId=null;}
 if(s.suspended||document.hidden){if(!s.suspended)__v124Suspend('hidden-frame');return;}
 return __v124Frame(now);
};
const __v124BootMessage=__v121Message;__v121Message=function(phase,...args){const r=__v124BootMessage(phase,...args);if(phase==='playing')__v124ScheduleFrame();return r;};
if(_5compat!=='canvas'){
 _5.domElement.addEventListener('webglcontextlost',()=>{
  if(__v124Lifecycle.suspended||document.hidden){__v124Lifecycle.recoverGame=__v124Lifecycle.recoverGame||_u&&__v121Boot.phase==='playing';__v124Suspend('graphics');}
 },true);
 _5.domElement.addEventListener('webglcontextrestored',()=>__v124Restore());
}
window.__AURELIA_LIFECYCLE124__={audit:()=>({suspended:__v124Lifecycle.suspended,reason:__v124Lifecycle.reason,manualPause:__v59ManualPause,active,pendingFrame:__v124Lifecycle.frameId!==null,pauses:__v124Lifecycle.pauses,returns:__v124Lifecycle.returns,recoveries:__v124Lifecycle.recoveries,recoverGame:__v124Lifecycle.recoverGame,phase:__v121Boot.phase,simulationTime:_10})};
