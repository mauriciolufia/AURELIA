/* Keep the user's distance preference, but use a 20% closer orbit inside hostile interiors. */
const __v130Camera=_bl;_bl=function(...args){const distance=__v12ThirdDistance,inside=__aurCameraMode==='third'&&!_9d&&__v126Interior(__v75At());try{if(inside)__v12ThirdDistance=Math.max(1.5,distance*.8);return __v130Camera(...args);}finally{__v12ThirdDistance=distance;}};
// Pointer lock works in a normal browser window. Fullscreen is not a prerequisite.
let __v130LookRequested=false;
function __v130CanLook(){return !!(_u&&!__v60Mobile&&!__v76Panel()&&!_74()&&!__v59IsPaused()&&!__v75.modal);}
const __v130OldCursor=__v87Cursor;for(const event of['fullscreenchange','webkitfullscreenchange','pointerlockchange'])document.removeEventListener(event,__v130OldCursor);
__v87Cursor=function(){const full=!!(document.fullscreenElement||document.webkitFullscreenElement),eligible=__v130CanLook(),locked=document.pointerLockElement===_5.domElement,playing=eligible&&(full||locked);document.documentElement.classList.toggle('ag-v87-gameplay',playing);document.documentElement.classList.toggle('ag-v87-interface',full&&!playing);if(!eligible&&document.pointerLockElement)document.exitPointerLock?.();return eligible;};
__v87ResumePointer=function(){if(!__v130LookRequested||!__v130CanLook()||document.pointerLockElement)return;try{const promise=_5.domElement.requestPointerLock?.();promise?.catch?.(()=>{__v130LookRequested=false;});}catch{__v130LookRequested=false;}};
_4.addEventListener('pointerdown',e=>{if(e.target?.closest?.('button,input,select,textarea,a,[contenteditable="true"],.joystick,.minimap'))return;if(e.pointerType!=='mouse'||e.button!==0||!e.isTrusted||!__v130CanLook())return;__v130LookRequested=true;__v87ResumePointer();},{capture:true});
for(const event of['fullscreenchange','webkitfullscreenchange'])document.addEventListener(event,__v87Cursor);
document.addEventListener('pointerlockchange',()=>{if(!document.pointerLockElement)__v130LookRequested=false;__v87Cursor();});
// Keep the pointer free over menus; the next click on the game resumes unrestricted looking.
window.__AURELIA_CAMERA130__={status:()=>({interiorFactor:.8,windowedPointerLock:true,locked:document.pointerLockElement===_5.domElement,thirdPerson:__aurCameraMode==='third',distance:__v95Camera.distance,preference:__v12ThirdDistance})};
if(!__v60Mobile&&__v110Help)__v110Help.append(document.createTextNode(' En ventana: haz clic en la escena para girar sin límite; Esc libera el cursor.'));
