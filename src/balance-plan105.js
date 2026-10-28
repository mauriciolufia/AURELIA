/* Authoritative level curves. Endpoints and same-level limits are shared by combat and guides. */
const __v105Scale=(()=>{
 const level=n=>Math.max(1,Math.min(60,Math.round(Number(n)||1)));
 const curve=(a,b,n)=>Math.round(a*Math.pow(b/a,(level(n)-1)/59));
 // v109 HP/DEF bonus retained; v110 final hero ATK endpoints are 20 and 100000.
 const hero=n=>({maxHp:Math.round(curve(75,7500,n)*1.2),atk:curve(20,100000,n),def:Math.round(curve(12,380,n)*1.2)});
 // These are final combat ATK values; the legacy .4 scaling is applied exactly once.
 const attackMultiplier=.4,enemyAttack=Object.freeze({min:14,max:350000,emperor:700000});
 const rawEnemyAttack=Object.fromEntries(Object.entries(enemyAttack).map(([key,value])=>[key,value/attackMultiplier]));
 const attackReference={};let attackCurves=null;
 const calibrateEnemyAttack=def=>{
  const maxHp=hero(60).maxHp,atk=rawEnemyAttack.emperor,targetDamage=Math.round(atk*8/Math.max(1,def));
  Object.assign(attackReference,{level:60,maxHp,def,targetDamage,atk});attackCurves=null;
  return{...attackReference};
 };
 // Current best obtainable head/boots/shield are level 55; the definitive body is level 60.
 // The runtime verifies this reference against the actual catalogue after world creation.
 calibrateEnemyAttack(hero(60).def+curve(3,350,55)+500+curve(2,250,55)+curve(4,450,55));
 const attack=atk=>Math.max(1,Math.round(atk*attackMultiplier));
 const standardBaseline=n=>({maxHp:curve(20,12000,n),atk:attackCurves?.normal[level(n)-1]??curve(rawEnemyAttack.min,rawEnemyAttack.max,n),def:curve(10,650,n)});
 const bossStandardBaseline=n=>({...standardBaseline(n),atk:attackCurves?.boss[level(n)-1]??curve(rawEnemyAttack.min,rawEnemyAttack.max,n)});
 const setEnemyAttackCurves=(normal,boss)=>{
  for(const values of [normal,boss])if(values.length!==60||values[0]!==rawEnemyAttack.min||values[59]!==rawEnemyAttack.max||values.some((v,i)=>!Number.isFinite(v)||v<=0||i>0&&(v<values[i-1]||v>Math.floor(values[i-1]*1.22))))throw Error('Progresión de ataque inválida.');
  attackCurves={normal:[...normal],boss:[...boss]};
 };
 const hash=s=>{let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;};
 const profile=(id,rank='normal')=>{
  const h=hash(id),fav=h%3,out=[1,1,1];out[fav]=rank==='normal'?1.12:1.2;
  out[(fav+1)%3]=1/1.12;out[(fav+2)%3]=rank==='boss'?1.1:rank==='elite'?1.04:1;
  return out;
 };
 const enemyBaseline=(n,id,rank='normal',bossAttack=rank==='boss')=>{
  if(id==='supreme_emperor')return{maxHp:48000,atk:attackReference.atk,def:450};
  const b={...(bossAttack?bossStandardBaseline(n):standardBaseline(n))};if(rank==='boss'){b.maxHp*=2;b.def=Math.round(b.def*1.5);}
  const p=id==='slime'&&level(n)===1?[1,1,1]:profile(id,rank),keys=['maxHp','atk','def'],o={};
  keys.forEach((k,i)=>{const cap=k==='atk'?rawEnemyAttack.max:Infinity;o[k]=Math.max(Math.ceil(b[k]/1.2),Math.min(cap,Math.floor(b[k]*1.2),Math.round(b[k]*p[i])));});return o;
 };
 // Friendly Forjabrasa defenders retain their former attack progression.
 const defender=(n,id)=>{const o=enemyBaseline(n,id,'elite'),base=curve(6,65000,n);o.atk=Math.max(Math.ceil(base/1.2),Math.min(Math.floor(base*1.2),Math.round(base*profile(id,'elite')[1])));return o;};
 // Scale the final archetype ATK once, after its variation and cap. Recalibration never stacks it.
 const reduced=stats=>({...stats,atk:attack(stats.atk)});
 const standard=n=>reduced(standardBaseline(n)),bossStandard=n=>reduced(bossStandardBaseline(n));
 const enemy=(...args)=>reduced(enemyBaseline(...args));
 const armorEnds={head:[3,350],body:[5,500],hands:[1,90],legs:[1,100],feet:[2,250],shield:[4,450]};
 const gear=(n,slot)=>slot==='weapon'?{atk:2*curve(5,60000,n),def:0}:{atk:0,def:curve(...(armorEnds[slot]||armorEnds.body),n)};
 const magic=n=>{n=level(n);return n<=55?Math.round(100*Math.pow(800,(n-1)/54)):Math.round(80000*Math.pow(1.75,(n-55)/5));};
 const mana=n=>curve(100,5000,n);
 // Whole HP: round once at the point of damage; a positive attack always causes at least 1 HP.
 const damage=(atk,def)=>{atk=Number(atk);def=Number(def);if(!Number.isFinite(atk)||atk<=0)return 0;if(!Number.isFinite(def)||def<=0)def=1;return Math.max(1,Math.round(atk/def*8));};
 return{level,curve,hero,standard,bossStandard,standardBaseline,bossStandardBaseline,enemyBaseline,attack,attackMultiplier,enemyAttack,profile,enemy,defender,gear,magic,mana,damage,armorEnds,attackReference,calibrateEnemyAttack,setEnemyAttackCurves,variation:{min:1/1.2,max:1.2}};
})();
if(typeof module!=='undefined'&&module.exports)module.exports=__v105Scale;
