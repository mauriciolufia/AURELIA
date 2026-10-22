const assert=require('node:assert/strict'),S=require('../src/balance-plan105.js');
assert.deepEqual(S.hero(1),{maxHp:75,atk:10,def:12});assert.deepEqual(S.hero(60),{maxHp:7500,atk:25000,def:380});
assert.deepEqual(S.enemy(1,'slime'),{maxHp:20,atk:6,def:10});assert.deepEqual(S.enemy(60,'supreme_emperor','boss'),{maxHp:48000,atk:38000,def:450});
for(let n=1;n<=60;n++){
 for(const rank of ['normal','elite','boss'])for(const id of ['slime','wolf','golem','supreme_emperor','pirate','guard','archdevil']){
  if(id==='supreme_emperor')continue;const e=S.enemy(n,id,rank),b=S.standard(n);if(rank==='boss'){b.maxHp*=2;b.def=Math.round(b.def*1.5);}for(const k of Object.keys(b))assert(e[k]>=b[k]/1.2&&e[k]<=b[k]*1.2,`${id}/${rank}/${n}/${k}`);
 }
 if(n>1)for(const k of ['atk','def','maxHp']){assert(S.hero(n)[k]>=S.hero(n-1)[k]);assert(S.standard(n)[k]>=S.standard(n-1)[k]);}
 for(const slot of ['weapon','head','body','feet','shield']){const g=S.gear(n,slot);if(n>1)assert(g.atk+g.def>=Object.values(S.gear(n-1,slot)).reduce((a,b)=>a+b));}
 assert(S.magic(n)>=8&&S.magic(n)<=70000);
}
assert.equal(S.gear(1,'weapon').atk,5);assert.equal(S.gear(60,'weapon').atk,60000);
for(const slot of Object.keys(S.armorEnds)){assert(S.gear(1,slot).def>=2&&S.gear(1,slot).def<=5);assert(S.gear(60,slot).def>=250&&S.gear(60,slot).def<=500);}
assert.equal(S.magic(1),8);assert.equal(S.magic(60),70000);assert.equal(S.damage(10,10),8);assert.equal(S.damage(65000,380),1368);assert.equal(S.damage(0,12),0);assert.equal(S.damage(10,0),80);
console.log('PASS exact anchors, all 60 levels, bounded archetypes, four armor types, magic and damage formula');
