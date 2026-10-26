const assert=require('node:assert/strict'),S=require('../src/balance-plan105.js');
assert.deepEqual(S.hero(1),{maxHp:90,atk:20,def:14});assert.deepEqual(S.hero(60),{maxHp:9000,atk:100000,def:456});
assert.deepEqual(S.enemy(1,'slime'),{maxHp:20,atk:14,def:10});assert.deepEqual(S.enemy(60,'supreme_emperor','boss'),{maxHp:48000,atk:93262,def:450});
for(let n=1;n<=60;n++){
 for(const [key,a,b]of [['maxHp',75,7500],['atk',10,25000],['def',12,380]])assert.equal(S.hero(n)[key],key==='atk'?S.curve(20,100000,n):Math.round(S.curve(a,b,n)*1.2));
 for(const rank of ['normal','elite','boss'])for(const id of ['slime','wolf','golem','supreme_emperor','pirate','guard','archdevil']){
  if(id==='supreme_emperor')continue;const e=S.enemy(n,id,rank),b=rank==='boss'?S.bossStandard(n):S.standard(n);if(rank==='boss'){b.maxHp*=2;b.def=Math.round(b.def*1.5);}for(const k of Object.keys(b))assert(e[k]>=Math.floor(b[k]/1.2)&&e[k]<=Math.ceil(b[k]*1.2),`${id}/${rank}/${n}/${k}`);
 }
 if(n>1)for(const k of ['atk','def','maxHp']){assert(S.hero(n)[k]>=S.hero(n-1)[k]);assert(S.standard(n)[k]>=S.standard(n-1)[k]);}
 for(const slot of ['weapon','head','body','feet','shield']){const g=S.gear(n,slot);if(n>1)assert(g.atk+g.def>=Object.values(S.gear(n-1,slot)).reduce((a,b)=>a+b));}
 assert(S.magic(n)>=100&&S.magic(n)<=140000);
}
assert.equal(S.mana(1),100);assert.equal(S.mana(60),5000);
for(let n=1;n<=60;n++)assert.equal(S.gear(n,'weapon').atk,S.curve(5,60000,n)*2);
for(let n=2;n<=60;n++){assert(S.mana(n)>S.mana(n-1));assert(S.magic(n)>S.magic(n-1));}
assert.equal(S.gear(1,'weapon').atk,10);assert.equal(S.gear(60,'weapon').atk,120000);
for(const slot of Object.keys(S.armorEnds)){assert(S.gear(1,slot).def>=2&&S.gear(1,slot).def<=5);assert(S.gear(60,slot).def>=250&&S.gear(60,slot).def<=500);}
assert.equal(S.magic(55),80000);assert.equal(S.magic(1),100);assert.equal(S.magic(60),140000);assert.equal(S.damage(10,10),8);assert.equal(S.damage(65000,380),1368);assert.equal(S.damage(0,12),0);assert.equal(S.damage(10,0),80);
console.log('PASS exact anchors, all 60 levels, bounded archetypes, four armor types, magic and damage formula');

assert.equal(S.damage(S.enemy(60,'supreme_emperor','boss').atk,1658),450);
assert.equal(S.standard(1).atk,14);assert.equal(S.standard(60).atk,50000);
for(let n=1;n<=60;n++)for(let i=0;i<6;i++){const id='forjabrasa-defender-'+i,old=S.curve(6,65000,n),atk=S.defender(n,id).atk;assert.equal(atk,Math.max(Math.ceil(old/1.2),Math.min(Math.floor(old*1.2),Math.round(old*S.profile(id,'elite')[1]))));}

assert.equal(S.bossStandard(60).atk,93262);
for(let n=1;n<=60;n++)for(const rank of ['normal','elite','boss'])for(const id of ['wolf','orc','golem','archdevil']){const e=S.enemy(n,id,rank);assert(e.atk<=(rank==='boss'?S.attackReference.atk:125000));}

for(let n=1;n<=60;n++)for(const rank of ['normal','elite','boss'])for(const id of ['slime','wolf','archdevil','supreme_emperor']){const raw=S.enemyBaseline(n,id,rank),scaled=S.enemy(n,id,rank);assert.equal(scaled.atk,Math.round(raw.atk*.4));assert.equal(scaled.maxHp,raw.maxHp);assert.equal(scaled.def,raw.def);}
