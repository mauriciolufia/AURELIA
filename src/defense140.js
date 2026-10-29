/* Hold T (or the touch shield) to replace the weapon pose with a real equipped shield. */
const __v140Guard={held:false,touch:false,blend:0,first:null,item:null,hits:0,blocked:0,recoil:0};
function __v140Shield(){return __v134Equipped().find(i=>i.slot==='shield')||null;}
function __v140Guarding(){return !!((__v140Guard.held||__v140Guard.touch)&&__v140Shield()&&_u&&_2l>0&&!_74()&&!__v59IsPaused()&&!__v76Panel()&&!__v137HeroDisabled()&&!_9d);}
function __v140ReleaseGuard(){__v140Guard.held=__v140Guard.touch=false;__v140GuardButton?.setAttribute('aria-pressed','false');}
const __v140GuardKeys=window.__AURELIA76_KEY__;window.__AURELIA76_KEY__=function(e){
 if(e.code!=='KeyT'||e.ctrlKey||e.altKey||e.metaKey||e.target?.isContentEditable||/INPUT|SELECT|TEXTAREA/.test(e.target?.tagName))return __v140GuardKeys(e);
 if(!_u||_74()||__v76Panel())return __v140GuardKeys(e);
 e.preventDefault();e.stopImmediatePropagation();if(!e.repeat&&!__v140Shield())_3a('Equipa un escudo para defenderte · mantén T.');
 __v140Guard.held=true;
};
window.addEventListener('keyup',e=>{if(e.code==='KeyT')__v140Guard.held=false;},true);
window.addEventListener('blur',__v140ReleaseGuard);document.addEventListener('visibilitychange',()=>{if(document.hidden)__v140ReleaseGuard();});
const __v140GuardDamage=__v87EnemyDamage;__v87EnemyDamage=function(c,...args){const n=__v140GuardDamage(c,...args);return __v140Guarding()?Math.max(1,Math.round(n*.2)):n;};
const __v140GuardHit=_d0;_d0=function(c,...args){const guarding=__v140Guarding(),hp=_2l,r=__v140GuardHit(c,...args);if(r&&guarding&&_2l<hp){__v140Guard.hits++;__v140Guard.blocked+=Math.round((hp-_2l)*4);__v140Guard.recoil=.15;$('damage-text').textContent='Escudo · 80 % bloqueado · HP −'+Math.round(hp-_2l);}return r;};
const __v140Attack=_8d;_8d=function(...args){return __v140Guarding()?false:__v140Attack(...args);};
const __v140Cast=_gd;_gd=function(...args){return __v140Guarding()?false:__v140Cast(...args);};
function __v140FirstShield(item){
 const s=__v140Guard;if(s.item===item.id&&s.first?.parent===_7)return s.first;
 s.first?.removeFromParent();const root=new _0.Group();root.name='Escudo levantado · defensa 80 %';root.add(__v134Model(item,'main',true));
 const hand=new _0.Mesh(__v66Geometry([['box','#ddb695',.08,-.26,.12,.16,.28,.18],['box','#596577',.08,-.48,.16,.20,.32,.19]],false),__v134FirstSolid);hand.renderOrder=32;root.add(hand);_7.add(root);s.first=root;s.item=item.id;return root;
}
function __v140GuardPose(dt){
 const s=__v140Guard,active=__v140Guarding(),item=__v140Shield();s.blend+=(Number(active)-s.blend)*(1-Math.exp(-Math.max(0,dt)*22));s.recoil=Math.max(0,s.recoil-dt);
 if(s.blend<.001){s.blend=0;if(s.wasGuard&&__aurPlayerAvatar)__aurPlayerAvatar.leftArm.rotation.y=0;s.wasGuard=false;}else s.wasGuard=true;
 const first=__aurCameraMode==='first',a=__aurPlayerAvatar;
 if(item&&(active||s.blend>0)){const root=__v140FirstShield(item);root.visible=first;root.position.set(-.16,-.72+s.blend*.58,-.75+s.recoil*.22);root.rotation.set(-.07,.15,-.12);root.scale.setScalar(.95);
 }else if(s.first)s.first.visible=false;
 if(active||s.blend>.01){if(_4n)_4n.visible=false;if(_g5)_g5.visible=false;}
 if(a){a.weaponRoot.visible=!active&&s.blend<.01;if(s.blend>0&&!__v137HeroDisabled()){
  const b=s.blend;a.leftArm.rotation.x=_19(a.leftArm.rotation.x,-1.3,b);a.leftArm.rotation.y=_19(a.leftArm.rotation.y,-.30,b);a.leftArm.rotation.z=_19(a.leftArm.rotation.z,-.42,b);
  a.rightArm.rotation.x=_19(a.rightArm.rotation.x,.20,b);a.rightArm.rotation.z=_19(a.rightArm.rotation.z,.1,b);a.root.rotation.y=yaw;
 }}
 __v140GuardButton.hidden=!__v60Mobile||!_u||!item;__v140GuardButton.setAttribute('aria-pressed',String(active));
}
const __v140GuardAvatar=__aurUpdatePlayerAvatar;__aurUpdatePlayerAvatar=function(dt){const r=__v140GuardAvatar(dt);__v140GuardPose(dt);return r;};
const __v140GuardWeapon=_8g;_8g=function(dt){if(__v140Guarding()){_84=0;_48=0;_86=true;_g7=0;}const r=__v140GuardWeapon(dt);if(__v140Guarding()||__v140Guard.blend>.01){if(_4n)_4n.visible=false;if(_g5)_g5.visible=false;}return r;};
const __v140GuardButton=document.createElement('button');__v140GuardButton.id='ag-guard140';__v140GuardButton.textContent='Escudo';__v140GuardButton.hidden=true;__v140GuardButton.setAttribute('aria-label','Mantener para bloquear el 80 por ciento del daño con el escudo');__v140GuardButton.setAttribute('aria-pressed','false');_4.append(__v140GuardButton);
__v140GuardButton.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();__v140Guard.touch=true;try{__v140GuardButton.setPointerCapture?.(e.pointerId);}catch{}});
for(const event of['pointerup','pointercancel','lostpointercapture'])__v140GuardButton.addEventListener(event,()=>{__v140Guard.touch=false;});
$('attack').onclick=()=>_8d();$('magic').onclick=()=>_gd();
const __v140GuardStyle=document.createElement('style');__v140GuardStyle.textContent='#ag-guard140{position:absolute;right:172px;bottom:18px;z-index:25;padding:17px 12px;border:2px solid #aec7dc;border-radius:18px;background:#31485ddd;color:#fff;font-weight:bold;touch-action:none}#ag-guard140[aria-pressed="true"]{background:#8b713b}#ag-guard140[hidden]{display:none!important}';document.head.append(__v140GuardStyle);
if(__v110Help)__v110Help.append(document.createTextNode(' · Mantén T con un escudo equipado: bloquea el 80 % del daño enemigo y levanta el escudo.'));
window.__AURELIA_DEFENSE140__={audit:()=>({key:'T',active:__v140Guarding(),reduction:.8,equipped:__v140Shield()?.id||null,hits:__v140Guard.hits,firstVisible:!!__v140Guard.first?.visible})};
