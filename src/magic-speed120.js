/* Double visual/flight clocks only: MP, cooldowns, buffs and status durations retain real seconds. */
const __v120Magic={rate:2,casting:0};
const __v120Flights=__v58UpdateMagic;__v58UpdateMagic=function(dt){return __v120Flights(dt*__v120Magic.rate);};
const __v120Cast=_gd;_gd=function(...args){__v120Magic.casting++;try{return __v120Cast(...args);}finally{__v120Magic.casting--;}};
const __v120Offensive=_5y;_5y=function(...args){__v120Magic.casting++;try{return __v120Offensive(...args);}finally{__v120Magic.casting--;}};
const __v120Impact=__v58Impact;__v58Impact=function(...args){__v120Magic.casting++;try{return __v120Impact(...args);}finally{__v120Magic.casting--;}};
const __v120Burst=__v68Burst;__v68Burst=function(...args){const f=__v120Burst(...args);if(f&&__v120Magic.casting&&!f.follow)f.player120=true;return f;};
window.__AURELIA_MAGIC_SPEED120__={audit:()=>({playerFlightRate:2,animationRate:2,cooldown:2.5,timedEffectsRate:1})};
