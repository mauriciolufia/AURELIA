/* Double ordinary hostile XP after the existing economy calibration, without normalizing it away. */
function __v112Ordinary(c){return !!c?.hostile&&!c.boss&&!c.fortBoss&&!c.elite&&!c.questElite&&!c.__v88Raid&&!__v109Context(c).boss;}
function __v112TuneXP(c){
 if(!c)return;
 if(!__v112Ordinary(c)){if(Number.isFinite(c.__v112XPBase)&&c.__v95XPReward===c.__v112XPBase*2)c.__v95XPReward=c.__v112XPBase;delete c.__v112XPBase;return;}
 if(!__v95XP.ready)return;
 if(Number.isFinite(c.__v112XPBase)&&c.__v95XPReward===c.__v112XPBase*2)return;
 const base=Number.isFinite(c.__v95XPReward)?c.__v95XPReward:Math.max(1,Math.round(__v95XPWeight(c)*__v95XP.scale));
 c.__v112XPBase=base;c.__v95XPReward=base*2;
}
function __v112AllXP(){for(const c of _m)__v112TuneXP(c);__v95XP.combatReference=Math.round(_m.filter(c=>c.hostile&&!c.__v83Retired&&!c.__v88Raid&&!String(c.spawnId||'').startsWith('raid')).reduce((sum,c)=>sum+(c.__v95XPReward||0),0)*.8);}
const __v112XPBuild=__v95XPBuild;__v95XPBuild=function(...args){for(const c of _m)delete c.__v112XPBase;const r=__v112XPBuild(...args);__v112AllXP();return r;};
const __v112KillXP=__v87KillXP;__v87KillXP=function(c,amount){__v112TuneXP(c);return __v112KillXP(c,amount*(__v112Ordinary(c)?2:1));};
const __v112Death=_8c;_8c=function(c,...args){__v112TuneXP(c);const alive=!c.dead,ordinary=__v112Ordinary(c),maxed=rpg.level>=_dw,result=__v112Death(c,...args);if(alive&&c.dead&&ordinary)_3a((c.name||c.spec.name)+' vencido · '+(maxed?'Nivel máximo':'+'+c.__v95XPReward+' EXP'));return result;};
const __v112XPRegister=_cp;_cp=function(c,...args){const r=__v112XPRegister(c,...args);__v112TuneXP(c);return r;};
const __v112XPWorld=_bj;_bj=function(...args){const r=__v112XPWorld(...args);__v112AllXP();return r;};
const __v112XPLoad=_dn;_dn=function(...args){const r=__v112XPLoad(...args);__v112AllXP();return r;};
const __v112Progress=window.__AURELIA_PROGRESSION95__.audit;window.__AURELIA_PROGRESSION95__.audit=()=>({...__v112Progress(),ordinaryRewardMultiplier:2});
