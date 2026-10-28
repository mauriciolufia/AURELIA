/* Fixed enemy ATK endpoints; obtainable equipment shapes the progression between levels. */
const __v111EnemyBalance={reference:null,pieces:[],levels:[],incoming:[],targetFraction:.125};
function __v111BestArmor(slot,level){return _5l.filter(i=>i.slot===slot&&__v105GearLevel(i)<=level).reduce((best,i)=>!best||i.def>best.def||i.def===best.def&&(i.hp||0)>(best.hp||0)?i:best,null);}
function __v111HeroReference(level,lag=0){
 const hero=__v105Scale.hero(level),equipmentLevel=Math.max(1,level-lag),pieces=__v105Slots.filter(slot=>slot!=='weapon').map(slot=>__v111BestArmor(slot,equipmentLevel)).filter(Boolean);
 return{level,maxHp:hero.maxHp+pieces.reduce((sum,i)=>sum+(i.hp||0),0),baseDef:hero.def,def:hero.def+pieces.reduce((sum,i)=>sum+i.def,0),pieces:pieces.map(i=>({id:i.id,level:__v105GearLevel(i),def:i.def}))};
}
// Calibrate to same-level obtainable armor, not the current player's HP or equipment.
// The existing combat layer applies x1.5 after integer damage, so compensate exactly once here.
function __v111IncomingScale(c){
 if(!c?.hostile)return 1;
 const level=__v105Scale.level(c.level),base=__v111EnemyBalance.incoming[level-1]||1;
 return c.boss==='azrakh'||c.spec?.id==='supreme_emperor'?base*__v105Scale.standard(level).atk/__v105Scale.enemyAttack.emperor:base;
}
function __v111ReferenceDamage(c,def,power=1){return Math.round(__v105Damage(c.damage*power*__v111IncomingScale(c),def)*1.5);}
function __v111Calibrate(){
 const pieces=__v105Slots.filter(slot=>slot!=='weapon'&&_5l.some(i=>i.slot===slot)).map(slot=>__v111BestArmor(slot,60));
 if(pieces.some(i=>!i))throw Error('Falta una pieza de armadura para calibrar el combate.');
 const defense=__v105Scale.hero(60).def+pieces.reduce((sum,i)=>sum+i.def,0);
 __v111EnemyBalance.reference=__v105Scale.calibrateEnemyAttack(defense);
 __v111EnemyBalance.pieces=pieces.map(i=>({id:i.id,name:i.name,slot:i.slot,level:__v105GearLevel(i),def:i.def}));
 // Gear unlocks used to produce a mid-game damage peak. Bound damage against actual same-level
 // equipment, then limit growth between levels while preserving both user-specified endpoints.
 const minimum=__v105Scale.enemyAttack.min/__v105Scale.attackMultiplier,maximum=__v105Scale.enemyAttack.max/__v105Scale.attackMultiplier;
 const heroes=Array.from({length:60},(_,i)=>__v111HeroReference(i+1)),start=minimum*8/(heroes[0].maxHp*heroes[0].def),growth=1.22;
 const makeCurve=end=>{const required=Array(60);required[59]=end;for(let i=58;i>=0;i--)required[i]=Math.ceil(required[i+1]/growth);const values=[];const endRatio=end*8/(heroes[59].maxHp*heroes[59].def);for(let i=0;i<60;i++){const h=heroes[i],targetRatio=start*Math.pow(endRatio/start,i/59),fair=Math.round(h.maxHp*h.def*targetRatio/8),raw=__v105Scale.curve(minimum,end,i+1);values.push(i===0?minimum:Math.max(required[i],Math.min(raw,fair,Math.floor(values[i-1]*growth))));}return values;};
 __v105Scale.setEnemyAttackCurves(makeCurve(maximum),makeCurve(maximum));
 __v111EnemyBalance.levels=heroes;
 __v111EnemyBalance.incoming=heroes.map(h=>h.maxHp*__v111EnemyBalance.targetFraction*h.def/(__v105Scale.standard(h.level).atk*8*1.5));
}
function __v111Refresh(){__v111Calibrate();for(const c of _m)if(c.hostile){__v87EnemyStats(c);__v109Ensure(c);}}
__v111Calibrate();
const __v111World=_bj;_bj=function(...args){const r=__v111World(...args);__v111Refresh();return r;};
const __v111Load=_dn;_dn=function(...args){const r=__v111Load(...args);__v111Refresh();return r;};
function __v111Comparison(){
 const pct=(damage,hp)=>Math.round(damage/hp*10000)/100;
 const levels=Array.from({length:60},(_,i)=>{const level=i+1,h=__v111HeroReference(level),normalATK=__v105Scale.standard(level).atk,bossATK=__v105Scale.bossStandard(level).atk,normal={hostile:true,level,damage:normalATK},boss={hostile:true,level,damage:bossATK},normalDamage=__v111ReferenceDamage(normal,h.def),bossDamage=__v111ReferenceDamage(boss,h.def),bossSpecial=__v111ReferenceDamage(boss,h.def,1.5);return{level,hp:h.maxHp,def:h.def,pieces:h.pieces,normalATK,normalDamage,normalPct:pct(normalDamage,h.maxHp),bossATK,bossDamage,bossPct:pct(bossDamage,h.maxHp),bossSpecial,bossSpecialPct:pct(bossSpecial,h.maxHp)};});
 const enemies=_m.filter(c=>c.hostile&&!c.dead).map(c=>{const h=__v111HeroReference(c.level),older=__v111HeroReference(c.level,5),power=Math.max(1,...(c.__v68Skills||[]).filter(s=>s.power>0).map(s=>s.power)),damage=__v111ReferenceDamage(c,h.def),special=__v111ReferenceDamage(c,h.def,power);return{id:c.spawnId,name:c.name||c.spec.name,level:c.level,boss:__v109Context(c).boss,elite:!!(c.elite||c.questElite),atk:c.damage,heroHP:h.maxHp,heroDEF:h.def,damage,pct:pct(damage,h.maxHp),special,specialPct:pct(special,h.maxHp),hitsToDefeatHero:Math.ceil(h.maxHp/damage),unarmoredPct:pct(__v111ReferenceDamage(c,h.baseDef),h.maxHp),olderEquipmentPct:pct(__v111ReferenceDamage(c,older.def),h.maxHp)};});
 return{levels,enemies};
}
window.__AURELIA_ENEMY_BALANCE111__={audit:()=>({...__v111EnemyBalance.reference,maxHp:__v111EnemyBalance.levels[59].maxHp,atk:__v105Scale.attack(__v111EnemyBalance.reference.atk),targetDamage:__v111ReferenceDamage({hostile:true,level:60,boss:'azrakh',damage:__v105Scale.enemyAttack.emperor},__v111EnemyBalance.reference.def),targetPercent:__v111EnemyBalance.targetFraction*100,attackMultiplier:__v105Scale.attackMultiplier,pieces:__v111EnemyBalance.pieces.map(p=>({...p})),hostiles:_m.filter(c=>c.hostile).length,slimeATK:__v105Scale.standard(1).atk,normalMaxATK:__v105Scale.standard(60).atk,bossMaxATK:__v105Scale.bossStandard(60).atk}),compare:__v111Comparison};
