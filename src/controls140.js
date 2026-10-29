/* Frame-independent mouse response and wheel orbit distance; UI keeps its own scrolling. */
const __v140Look={sensitivity:1.5,firstReady:false,last:0,mode:null,player:new _0.Vector3(),zoom:7,resumes:0,pointerPending:false};
_5.domElement.addEventListener('pointermove',e=>{
 if(e.pointerType!=='mouse'||!__v130CanLook())return;
 e.stopImmediatePropagation();yaw-=_18(Number(e.movementX)||0,-160,160)*.005025*1.5;
 _11=_18(_11-_18(Number(e.movementY)||0,-160,160)*.00465*1.5,-1.45,1.45);
},{capture:true});
_5.domElement.addEventListener('wheel',e=>{
 if(__aurCameraMode!=='third'||!__v130CanLook()||e.ctrlKey||e.metaKey)return;
 e.preventDefault();e.stopImmediatePropagation();
 const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?_4.clientHeight:1);
 __v12ThirdDistance=_18(__v12ThirdDistance*Math.exp(_18(delta,-240,240)*.0018),1.8,18);
 __v140Look.zoom=__v12ThirdDistance;
 try{localStorage.setItem('aurelia-orbit140',String(__v12ThirdDistance));}catch{}
},{passive:false,capture:true});
try{const n=Number(localStorage.getItem('aurelia-orbit140'));if(n>=1.8&&n<=18)__v12ThirdDistance=n;}catch{}
const __v140Camera=_bl;_bl=function(...args){
 if(__aurCameraMode!=='first'){__v140Look.firstReady=false;return __v140Camera(...args);}
 const s=__v140Look,c=__v81Cam,now=performance.now(),dt=_18((now-s.last)/1000,0,.05),snap=!s.firstReady||s.player.distanceToSquared(_14)>35*35;
 s.last=now;s.firstReady=true;s.player.copy(_14);
 if(snap){c.yaw=yaw;c.pitch=_11;}else{const k=1-Math.exp(-57*dt);c.yaw+=Math.atan2(Math.sin(yaw-c.yaw),Math.cos(yaw-c.yaw))*k;c.pitch+=(_11-c.pitch)*k;}
 c.ready=true;c.mode='first';c.player.copy(_14);c.last=now;
 _7.position.copy(_14);if(_9d){_7.position.y+=1.85;_7.position.x+=Math.sin(c.yaw)*.25;_7.position.z+=Math.cos(c.yaw)*.25;}
 c.pos.copy(_7.position);__v95Camera.ready=false;__v81OrientCamera();
};
function __v140ResumeLook(){
 if(__v60Mobile||__v140Look.pointerPending)return;
 __v140Look.pointerPending=true;queueMicrotask(()=>{
  __v140Look.pointerPending=false;if(!__v130CanLook())return;
  __v130LookRequested=true;__v140Look.resumes++;__v87ResumePointer();__v87Cursor();
 });
}
// Closing from a click or keyboard gesture requests pointer lock in the same event turn.
const __v140ClosePanel=__v76ClosePanel;__v76ClosePanel=function(...args){const r=__v140ClosePanel(...args);__v140ResumeLook();return r;};
const __v140Quick=_dp;_dp=function(open,...args){const r=__v140Quick(open,...args);if(!open)__v140ResumeLook();return r;};
const __v140Settings=_3f;_3f=function(open,...args){const r=__v140Settings(open,...args);if(!open)__v140ResumeLook();return r;};
const __v140Atlas=_fm;_fm=function(open,...args){const r=__v140Atlas(open,...args);if(!open)__v140ResumeLook();return r;};
const __v140Modal=__v75Close;__v75Close=function(...args){const r=__v140Modal(...args);__v140ResumeLook();return r;};
const __v140Sheet=__v134Close;__v134Close=function(...args){const r=__v140Sheet(...args);__v140ResumeLook();return r;};
let __v140WasPanel=false;
new MutationObserver(()=>{const panel=!!(__v76Panel()||__v59IsPaused());if(__v140WasPanel&&!panel)__v140ResumeLook();__v140WasPanel=panel;}).observe(_4,{subtree:true,attributes:true,attributeFilter:['hidden','aria-hidden']});
const __v140Cursor=__v87Cursor;__v87Cursor=function(){const eligible=__v140Cursor();_4.classList.toggle('look140',eligible);_5.domElement.style.cursor=eligible?'none':'';return eligible;};
const __v140CursorCSS=document.createElement('style');__v140CursorCSS.textContent='#aurelia-game.look140 canvas.world{cursor:none!important}';document.head.append(__v140CursorCSS);
if(__v110Help)__v110Help.append(document.createTextNode(' · Rueda: acercar/alejar cámara en tercera persona. Al cerrar interfaces vuelves automáticamente al control del ratón.'));
window.__AURELIA_CONTROLS140__={audit:()=>({mouseMultiplier:1.5,smoothingRate:57,zoom:__v12ThirdDistance,zoomLimits:[1.8,18],automaticPointerResume:true,resumes:__v140Look.resumes})};
