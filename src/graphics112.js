/* Optional vivid full-HD preset. Color grading affects the world, independently of dungeon darkness. */
const __v112Quality=$('quality'),__v112Graphics={mode:'vivid60',targetFps:60,grading:'saturate(1.3) brightness(1.025)'};
__v112Quality.add(new Option('1080p · 60 FPS · Colores vivos','vivid60'));
const __v112ColorStyle=document.createElement('style');__v112ColorStyle.textContent='#aurelia-game.vivid112 .world{filter:saturate(1.3) brightness(1.025)}';document.head.append(__v112ColorStyle);
const __v112SetSize=_5.setSize.bind(_5);_5.setSize=function(w,h,style){if(__v112Quality.value==='vivid60'){const horizontal=_4.clientWidth>=_4.clientHeight,r=__v112SetSize(horizontal?1920:1080,horizontal?1080:1920,false);_5.domElement.style.width='100%';_5.domElement.style.height='100%';return r;}return __v112SetSize(w,h,style);};
function __v112Budget(){
 if((_5.getPixelRatio?.()??__v50Candy.lastPixelRatio)!==1)_5.setPixelRatio(1);__v50Candy.lastPixelRatio=1;
 const shadows=!__v60Mobile&&_5compat!=='canvas';if(_5.shadowMap.enabled!==shadows)_5.shadowMap.enabled=shadows;__v50Candy.lastShadowEnabled=shadows;
 if(sun.shadow&&sun.shadow.mapSize.x!==1024){sun.shadow.mapSize.set(1024,1024);sun.shadow.map?.dispose();sun.shadow.map=null;}__v50Candy.lastShadowSize=1024;
}
const __v112RenderBudget=__v50ApplyRenderBudget;__v50ApplyRenderBudget=function(...args){if(__v112Quality.value==='vivid60')return __v112Budget();return __v112RenderBudget(...args);};
const __v112FinalBudget=__finalApplyRendererBudget;__finalApplyRendererBudget=function(...args){if(__v112Quality.value==='vivid60')return __v112Budget();return __v112FinalBudget(...args);};
const __v112QualityChange=__v112Quality.onchange;
__v112Quality.onchange=function(e){const vivid=this.value==='vivid60';if(vivid)__v112Budget();else __v112QualityChange?.call(this,e);_4.classList.toggle('vivid112',vivid);_5.setSize(_4.clientWidth,_4.clientHeight,false);__v62LastFrame=-Infinity;try{localStorage.setItem('aurelia-quality112',this.value);}catch{}};
try{const saved=localStorage.getItem('aurelia-quality112');if(saved&&[...__v112Quality.options].some(o=>o.value===saved)){__v112Quality.value=saved;__v112Quality.onchange();}}catch{}
window.__AURELIA_GRAPHICS112__={audit:()=>({active:__v112Quality.value==='vivid60',targetFps:60,buffer:[_5.domElement.width,_5.domElement.height],grading:_4.classList.contains('vivid112')?__v112Graphics.grading:'none',extraLights:0,resolutionPreserved:true})};
