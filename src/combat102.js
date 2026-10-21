/* Forty percent of the former attack rate; walking, aiming and damage per hit stay native. */
function __v102CombatRate(c){return c?.hostile ? .4 : 1;}
const __v102Combat={source:null,burnRate:1};
const __v102Schedule=__v68Schedule;__v68Schedule=function(c){__v102Schedule(c);c.__v68NextAction=__v68CombatTime+(c.__v68NextAction-__v68CombatTime)/__v102CombatRate(c);};
// Poison from a creature ticks every five seconds. Environmental poison keeps its native cycle.
const __v102Poison=__v87ApplyPoison;__v87ApplyPoison=function(){const result=__v102Poison();if(result){const rate=__v102Combat.source?__v102CombatRate(__v102Combat.source):1;__v87Poison.rate102=rate;__v87Poison.next=2/rate;}return result;};
const __v102Impact=_d0;_d0=function(c,power=1,status=null){const previous=__v102Combat.source;__v102Combat.source=c;try{const result=__v102Impact(c,power,status);if(result&&status==='burn')__v102Combat.burnRate=__v102CombatRate(c);return result;}finally{__v102Combat.source=previous;}};
const __v102TrapDamage=__v75Damage;__v75Damage=function(fraction,label,status,...rest){const result=__v102TrapDamage(fraction,label,status,...rest);if(result&&status==='burn')__v102Combat.burnRate=1;return result;};
const __v102Clean=__v56ClearStatuses;__v56ClearStatuses=function(...args){__v102Combat.burnRate=1;return __v102Clean(...args);};
const __v102CombatHUD=_d8;_d8=function(...args){const result=__v102CombatHUD(...args),e=$('enemy-threat');if(e)e.textContent=e.textContent.replace(/ · Ataque ≈1\.9 s/g,'').replace(/ · Alcance ×1\.5/g,'').replace(/ · Ritmo de ataque 40%/g,'')+' · Ritmo de ataque 40%';return result;};
window.__AURELIA_COMBAT102__={audit:()=>({attackRate:.4,attackIntervalMultiplier:2.5,damagePerHitMultiplier:1,enemyPoisonInterval:5,enemyBehaviors:[...__v98EnemyActions],earlyMaxTechniques:2})};
