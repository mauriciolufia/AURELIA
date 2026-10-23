/* Authoritative level curves. Endpoints and same-level limits are shared by combat and guides. */
const __v105Scale=(()=>{
 const level=n=>Math.max(1,Math.min(60,Math.round(Number(n)||1)));
 const curve=(a,b,n)=>Math.round(a*Math.pow(b/a,(level(n)-1)/59));
 // v109 HP/DEF bonus retained; v110 final hero ATK endpoints are 20 and 100000.
 const hero=n=>({maxHp:Math.round(curve(75,7500,n)*1.2),atk:curve(20,100000,n),def:Math.round(curve(12,380,n)*1.2)});
 const attackReference={};let attackCurves=null;
 const calibrateEnemyAttack=def=>{
  const maxHp=hero(60).maxHp,targetDamage=Math.round(maxHp/8);
  Object.assign(attackReference,{level:60,maxHp,def,targetDamage,atk:Math.round(targetDamage*def/8)});attackCurves=null;
  return{...attackReference};
 };
 // Current best obtainable head/boots/shield are level 55; the definitive body is level 60.
 // The runtime verifies this reference against the actual catalogue after world creation.
 calibrateEnemyAttack(hero(60).def+curve(3,350,55)+500+curve(2,250,55)+curve(4,450,55));
 const standard=n=>({maxHp:curve(20,12000,n),atk:attackCurves?.normal[level(n)-1]??curve(35,125000,n),def:curve(10,650,n)});
 const bossStandard=n=>({...standard(n),atk:attackCurves?.boss[level(n)-1]??curve(35,attackReference.atk,n)});
 const setEnemyAttackCurves=(normal,boss)=>{
  for(const [values,max]of [[normal,125000],[boss,attackReference.atk]])if(values.length!==60||values[0]!==35||values[59]!==max||values.some((v,i)=>!Number.isFinite(v)||v<=0||i>0&&(v<values[i-1]||v>Math.floor(values[i-1]*1.22))))throw Error('Progresión de ataque inválida.');
  attackCurves={normal:[...normal],boss:[...boss]};
 };
 const hash=s=>{let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;};
 const profile=(id,rank='normal')=>{
  const h=hash(id),fav=h%3,out=[1,1,1];out[fav]=rank==='normal'?1.12:1.2;
  out[(fav+1)%3]=1/1.12;out[(fav+2)%3]=rank==='boss'?1.1:rank==='elite'?1.04:1;
  return out;
 };
 const enemy=(n,id,rank='normal',bossAttack=rank==='boss')=>{
  if(id==='supreme_emperor')return{maxHp:48000,atk:attackReference.atk,def:450};
  const b={...(bossAttack?bossStandard(n):standard(n))};if(rank==='boss'){b.maxHp*=2;b.def=Math.round(b.def*1.5);}
  const p=id==='slime'&&level(n)===1?[1,1,1]:profile(id,rank),keys=['maxHp','atk','def'],o={};
  keys.forEach((k,i)=>{const cap=k==='atk'?(bossAttack?attackReference.atk:125000):Infinity;o[k]=Math.max(Math.ceil(b[k]/1.2),Math.min(cap,Math.floor(b[k]*1.2),Math.round(b[k]*p[i])));});return o;
 };
 // Friendly Forjabrasa defenders retain their former attack progression.
 const defender=(n,id)=>{const o=enemy(n,id,'elite'),base=curve(6,65000,n);o.atk=Math.max(Math.ceil(base/1.2),Math.min(Math.floor(base*1.2),Math.round(base*profile(id,'elite')[1])));return o;};
 const armorEnds={head:[3,350],body:[5,500],feet:[2,250],shield:[4,450]};
 const gear=(n,slot)=>slot==='weapon'?{atk:2*curve(5,60000,n),def:0}:{atk:0,def:curve(...(armorEnds[slot]||armorEnds.body),n)};
 const magic=n=>curve(100,140000,n);
 const mana=n=>curve(100,5000,n);
 // Whole HP: round once at the point of damage; a positive attack always causes at least 1 HP.
 const damage=(atk,def)=>{atk=Number(atk);def=Number(def);if(!Number.isFinite(atk)||atk<=0)return 0;if(!Number.isFinite(def)||def<=0)def=1;return Math.max(1,Math.round(atk/def*8));};
 return{level,curve,hero,standard,bossStandard,profile,enemy,defender,gear,magic,mana,damage,armorEnds,attackReference,calibrateEnemyAttack,setEnemyAttackCurves,variation:{min:1/1.2,max:1.2}};
})();
if(typeof module!=='undefined'&&module.exports)module.exports=__v105Scale;
