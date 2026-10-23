/* Readable fortress light, using the existing WebGL raster lights and full-detail artwork. */
const __v106Lighting={blend:0,clock:null,area:null,torchStates:new WeakMap(),profiles:new Map(),outdoor:null};
function __v106Profile(a){
 if(!a)return null;const key=a.biome||'stone';if(__v106Lighting.profiles.has(key))return __v106Lighting.profiles.get(key);
 const warm=['volcano','desert','crypt'].includes(key),cold=['snow','polar','ice'].includes(key);
 const p={sky:new _0.Color(warm?'#eee0d4':cold?'#deeaf2':'#e5e4ef'),ground:new _0.Color(warm?'#827b85':cold?'#7c879c':'#838092'),torch:new _0.Color(cold?'#ffe1b1':'#ffcf98')};
 __v106Lighting.profiles.set(key,p);return p;
}
function __v106InteriorLight(){
 const s=__v106Lighting,a=__v75At(),now=_10,dt=s.clock===null?.04:Math.max(0,Math.min(.1,now-s.clock));s.clock=now;s.area=a;
 const target=a?1:0,k=1-Math.exp(-dt*7);s.blend+=(target-s.blend)*k;if(Math.abs(target-s.blend)<.001)s.blend=target;
 const t=s.blend,out=s.outdoor||(s.outdoor={});out.hemisphere=_9.intensity;out.sun=sun.intensity;out.moon=_a.intensity;out.exposure=_5.toneMappingExposure;
 if(t===0)return;
 const p=__v106Profile(a)||s.lastProfile;if(!p)return;s.lastProfile=p;
 // Broad, slightly cool indirect fill preserves detail; the warm torch accents stay local.
 _9.intensity=_19(_9.intensity,1.42,t);_9.color.lerp(p.sky,t*.7);_9.groundColor.lerp(p.ground,t*.8);
 sun.intensity*=1-t*.62;_a.intensity*=1-t*.50;
 _5.toneMappingExposure*=1-t*.09;
 // Exterior street lamps must not wash out a nearby dungeon through its walls.
 for(const light of _af)light.intensity*=1-t;
}
const __v106Environment=_fk;_fk=function(...args){const result=__v106Environment(...args);__v106InteriorLight();return result;};
function __v106TorchLight(dt,refresh=true){
 const s=__v106Lighting,a=__v75At(),dark=__v85AreaDark(a),profile=__v106Profile(a);
 // Keep the existing fixed pool (six lights on PC, three on mobile). No new shadow maps.
 for(const light of __v85.lights){
  let state=s.torchStates.get(light);if(!state){state={power:0,position:light.position.clone(),targetPosition:light.position.clone(),target:0};s.torchStates.set(light,state);}
  if(refresh){state.target=a&&!dark?Math.min(36,Math.max(0,light.intensity)*2/3):0;state.targetPosition.copy(light.position);}
  if(!a||dark)state.target=0;const target=state.target;
  const moved=state.position.distanceToSquared(state.targetPosition)>1;
  // Fade out before relocating a pooled light to another fixture, avoiding a bright pop.
  if(moved&&state.power>.75){state.power*=Math.exp(-dt*18);light.position.copy(state.position);}
  else{state.position.copy(state.targetPosition);light.position.copy(state.position);state.power+=(target-state.power)*(1-Math.exp(-dt*10));}
  light.intensity=dark?0:state.power;light.castShadow=false;
  if(profile)light.color.copy(profile.torch);
 }
}
const __v106LightTick=__v75Tick;__v75Tick=function(dt){const stamp=__v85.nextFlame,result=__v106LightTick(dt);if(_u&&!_74())__v106TorchLight(Math.max(0,Math.min(.1,dt)),stamp!==__v85.nextFlame);return result;};
const __v106LightReset=_5v;_5v=function(...args){const r=__v106LightReset(...args);Object.assign(__v106Lighting,{blend:0,clock:null,area:null,torchStates:new WeakMap(),lastProfile:null});return r;};
window.__AURELIA_LIGHTING106__={audit:()=>({interior:__v106Lighting.area?.key||null,blend:__v106Lighting.blend,exposure:_5.toneMappingExposure,outdoor:__v106Lighting.outdoor,hemisphere:_9.intensity,torchLights:__v85.lights.length,extraLights:0,rayTracing:false,textureResolutionPreserved:true})};
