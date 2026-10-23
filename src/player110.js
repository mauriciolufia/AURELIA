/* G switches camera through the existing controller; I remains the inventory shortcut. */
const __v110Keys=window.__AURELIA76_KEY__;
window.__AURELIA76_KEY__=function(e){
 if(e.code!=='KeyG')return __v110Keys(e);
 const editing=e.target?.isContentEditable||/INPUT|SELECT|TEXTAREA/.test(e.target?.tagName);
 // Keep browser shortcuts and text entry, without falling through to the old G inventory binding.
 if(editing||e.ctrlKey||e.metaKey||e.altKey){e.stopImmediatePropagation();return;}
 if(!_u)return;
 e.preventDefault();e.stopImmediatePropagation();
 if(e.repeat||_74()||__v76Panel()||__v59IsPaused())return;
 __aurSetCameraMode(__aurCameraMode==='third'?'first':'third');
 // A physical keyboard on mobile should remember this deliberate choice, like the menu does.
 if(__v60Mobile)document.getElementById('ag-camera-mode')?.dispatchEvent(new Event('change',{bubbles:true}));
 _bl();__v81OrientCamera();
 _3a(__aurCameraMode==='third'?'Tercera persona · G para cambiar':'Primera persona · G para cambiar');
};
const __v110Reset=_5v;_5v=function(...args){const r=__v110Reset(...args);rpg.mp=_g4().maxMp;return r;};
const __v110Load=_dn;_dn=function(s,...args){
 const r=__v110Load(s,...args);if(s?.seed!==_f)return r;
 const max=_g4().maxMp,value=Number.isFinite(s.mp)?s.mp:0;
 if(s.balance110?.version===110)rpg.mp=_18(value,0,max);
 else{const oldMax=65+(__v105Scale.level(rpg.level)-1)*9;rpg.mp=_18(value/oldMax,0,1)*max;}
 _fl();return r;
};
const __v110Save=_iv;_iv=function(...args){const r=__v110Save(...args);if(_u)try{const s=JSON.parse(__v96ReadSave());s.balance110={version:110};__v96WriteSave(JSON.stringify(s));}catch(e){}return r;};
const __v110Help=$('settings').querySelector('.help');
if(__v110Help)__v110Help.innerHTML='WASD o flechas: moverse · mouse: mirar · espacio: saltar · G: primera/tercera persona · I: equipo · L: magias · E o clic derecho: usar magia · R: interactuar · B: montar · M: mapa · K: menú.';
