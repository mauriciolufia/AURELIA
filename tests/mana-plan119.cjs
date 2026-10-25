const assert=require('node:assert/strict'),plan=require('../src/mana-plan119.js'),scale=require('../src/balance-plan105.js');
const records=[{level:1,raw:14},{level:3,raw:24},{level:10,raw:34},{level:20,raw:54},{level:60,raw:174}],costs=plan(records);
assert.equal(costs[1],15);assert.equal(costs[60],500);assert.equal(scale.mana(1),100);assert.equal(scale.mana(60),5000);
for(let level=1;level<=60;level++){assert(Number.isInteger(costs[level]));assert(costs[level]>=15&&costs[level]<=500);assert(costs[level]<=scale.mana(level));if(level>1){assert(costs[level]>costs[level-1]);assert(scale.mana(level)>scale.mana(level-1));}}
for(const s of records)assert(costs[s.level]>=s.raw*3/4);
assert.deepEqual(plan(records),costs);assert.deepEqual(plan([...records].reverse()),costs);
console.log('PASS deterministic 60-level MP costs, 15/500 endpoints, triple baseline and 100/5000 hero MP');
