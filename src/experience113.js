/* Recompute from the calibrated baseline, so saves, respawns and rebuilds cannot stack bonuses. */
function __v113XPMultiplier(c){return c?.hostile?(__v112Ordinary(c)?4:2):1;}
__v112TuneXP=function(c){if(!c?.hostile||!__v95XP.ready)return;const base=Math.max(1,Math.round(__v95XPWeight(c)*__v95XP.scale));c.__v113XPBase=base;c.__v112XPBase=__v112Ordinary(c)?base:undefined;c.__v95XPReward=base*__v113XPMultiplier(c);};
__v87KillXP=function(c,amount){
 if(c.boss||c.questElite){if(c.__v87LevelPaid)return;c.__v87LevelPaid=true;}
 __v112TuneXP(c);
 let base=__v95XP.ready?(c.__v113XPBase??Math.max(1,Math.round(__v95XPWeight(c)*__v95XP.scale))):amount;
 if(!Number.isFinite(base)||base<=0)return;
 // Double the amount a v112 boss would actually pay, including its former level cap.
 const old=rpg.level;
 if((c.boss||c.questElite)&&old<59){const first=_5u();let next;try{rpg.level=old+1;next=_5u();}finally{rpg.level=old;}base=Math.min(base,first-rpg.xp+next-1);}
 const xp=base*__v113XPMultiplier(c);c.__v113PaidXP=xp;_dy(xp);c.__v87Leveled=rpg.level>old;
};
function __v113EliteXP(c,amount){const xp=amount*2;c.__v113PaidXP=(c.__v113PaidXP||0)+xp;return _dy(xp);}
const __v113Death=_a6;_a6=function(c,...args){const alive=!c.dead,maxed=rpg.level>=_dw,r=__v113Death(c,...args);if(alive&&c.dead&&c.hostile&&c.__v113PaidXP)_3a((c.name||c.spec.name)+' vencido · '+(maxed?'Nivel máximo':'+'+c.__v113PaidXP+' EXP'));return r;};
const __v113Progress=window.__AURELIA_PROGRESSION95__.audit;window.__AURELIA_PROGRESSION95__.audit=()=>({...__v113Progress(),ordinaryRewardMultiplier:4,otherEnemyRewardMultiplier:2,allEnemyXPRelativeTo112:2});
