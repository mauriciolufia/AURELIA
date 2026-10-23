/* Calibrate against obtainable equipment, never against a percentage of the current player's HP. */
const __v111EnemyBalance={reference:null,pieces:[]};
function __v111HeroReference(level,lag=0){
 const hero=__v105Scale.hero(level),equipmentLevel=Math.max(1,level-lag),pieces=['head','body','feet','shield'].map(slot=>_5l.filter(i=>i.slot===slot&&__v105GearLevel(i)<=equipmentLevel).reduce((best,i)=>!best||i.def>best.def?i:best,null)).filter(Boolean);
 return{level,maxHp:hero.maxHp,baseDef:hero.def,def:hero.def+pieces.reduce((sum,i)=>sum+i.def,0),pieces:pieces.map(i=>({id:i.id,level:__v105GearLevel(i),def:i.def}))};
}
function __v111Calibrate(){
 const pieces=['head','body','feet','shield'].map(slot=>_5l.filter(i=>i.slot===slot&&__v105GearLevel(i)<=60).reduce((best,i)=>!best||i.def>best.def?i:best,null));
 if(pieces.some(i=>!i))throw Error('Falta una pieza de armadura para calibrar el combate.');
 const defense=__v105Scale.hero(60).def+pieces.reduce((sum,i)=>sum+i.def,0);
 __v111EnemyBalance.reference=__v105Scale.calibrateEnemyAttack(defense);
 __v111EnemyBalance.pieces=pieces.map(i=>({id:i.id,name:i.name,slot:i.slot,level:__v105GearLevel(i),def:i.def}));
 // Gear unlocks used to produce a mid-game damage peak. Bound damage against actual same-level
 // equipment, then limit growth between levels while preserving both user-specified endpoints.
 const heroes=Array.from({length:60},(_,i)=>__v111HeroReference(i+1)),start=35*8/(heroes[0].maxHp*heroes[0].def),growth=1.22;
 const makeCurve=end=>{const required=Array(60);required[59]=end;for(let i=58;i>=0;i--)required[i]=Math.ceil(required[i+1]/growth);const values=[];const endRatio=end*8/(heroes[59].maxHp*heroes[59].def);for(let i=0;i<60;i++){const h=heroes[i],targetRatio=start*Math.pow(endRatio/start,i/59),fair=Math.round(h.maxHp*h.def*targetRatio/8),raw=__v105Scale.curve(35,end,i+1);values.push(i===0?35:Math.max(required[i],Math.min(raw,fair,Math.floor(values[i-1]*growth))));}return values;};
 __v105Scale.setEnemyAttackCurves(makeCurve(125000),makeCurve(__v111EnemyBalance.reference.atk));
}
function __v111Refresh(){__v111Calibrate();for(const c of _m)if(c.hostile){__v87EnemyStats(c);__v109Ensure(c);}}
__v111Calibrate();
const __v111World=_bj;_bj=function(...args){const r=__v111World(...args);__v111Refresh();return r;};
const __v111Load=_dn;_dn=function(...args){const r=__v111Load(...args);__v111Refresh();return r;};
function __v111Comparison(){
 const pct=(damage,hp)=>Math.round(damage/hp*10000)/100;
 const levels=Array.from({length:60},(_,i)=>{const level=i+1,h=__v111HeroReference(level),normalATK=__v105Scale.standard(level).atk,bossATK=__v105Scale.bossStandard(level).atk,normalDamage=__v105Damage(normalATK,h.def),bossDamage=__v105Damage(bossATK,h.def),bossSpecial=__v105Damage(bossATK*1.5,h.def);return{level,hp:h.maxHp,def:h.def,pieces:h.pieces,normalATK,normalDamage,normalPct:pct(normalDamage,h.maxHp),bossATK,bossDamage,bossPct:pct(bossDamage,h.maxHp),bossSpecial,bossSpecialPct:pct(bossSpecial,h.maxHp)};});
 const enemies=_m.filter(c=>c.hostile&&!c.dead).map(c=>{const h=__v111HeroReference(c.level),older=__v111HeroReference(c.level,5),power=Math.max(1,...(c.__v68Skills||[]).filter(s=>s.power>0).map(s=>s.power)),damage=__v105Damage(c.damage,h.def),special=__v105Damage(c.damage*power,h.def);return{id:c.spawnId,name:c.name||c.spec.name,level:c.level,boss:__v109Context(c).boss,elite:!!(c.elite||c.questElite),atk:c.damage,heroHP:h.maxHp,heroDEF:h.def,damage,pct:pct(damage,h.maxHp),special,specialPct:pct(special,h.maxHp),hitsToDefeatHero:Math.ceil(h.maxHp/damage),unarmoredPct:pct(__v105Damage(c.damage,h.baseDef),h.maxHp),olderEquipmentPct:pct(__v105Damage(c.damage,older.def),h.maxHp)};});
 return{levels,enemies};
}
window.__AURELIA_ENEMY_BALANCE111__={audit:()=>({...__v111EnemyBalance.reference,pieces:__v111EnemyBalance.pieces.map(p=>({...p})),hostiles:_m.filter(c=>c.hostile).length,slimeATK:35,normalMaxATK:125000,bossMaxATK:__v105Scale.attackReference.atk}),compare:__v111Comparison};
