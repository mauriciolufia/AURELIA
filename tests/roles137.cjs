const assert=require('node:assert/strict');
const roles=require('../src/enemy-roles137.js'),techniques=require('../src/technique-plan109.js');
const expected={wolf:'assault',boar:'assault',knight:'tank',stone:'tank',gunner:'ranged',skeleton:'ranged',ashMage:'mage',iceEye:'mage',medusa:'afflicter',snake:'afflicter',slime:'balanced'};
for(const [family,role]of Object.entries(expected))assert.equal(roles.role(family),role,family);
for(const family of Object.keys(techniques.profiles))assert(Object.values(roles.families).some(list=>list.split(' ').includes(family)),'Unreviewed species '+family);
const {assault,tank,ranged,mage}=roles.roles;
assert(assault.speed>1&&assault.hp<1&&assault.def<1);
assert(tank.hp>1&&tank.def>1&&tank.atk<1&&tank.speed<1);
assert(ranged.hp<assault.hp&&ranged.def<1&&ranged.atk<assault.atk);
assert(mage.hp<1&&mage.def<1);
for(const[k,min]of Object.entries(roles.statusLevels)){assert.equal(roles.status(k,min),k);assert.equal(roles.status(k,min-1),null);}
console.log('PASS all species reviewed, role tradeoffs and level-gated states');
