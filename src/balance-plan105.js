/* Authoritative level curves. Endpoints and same-level limits are shared by combat and guides. */
const __v105Scale=(()=>{
 const level=n=>Math.max(1,Math.min(60,Math.round(Number(n)||1)));
 const curve=(a,b,n)=>Math.round(a*Math.pow(b/a,(level(n)-1)/59));
 const hero=n=>({maxHp:curve(75,7500,n),atk:curve(10,25000,n),def:curve(12,380,n)});
 const standard=n=>({maxHp:curve(20,12000,n),atk:curve(6,65000,n),def:curve(10,650,n)});
 const hash=s=>{let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;};
 const profile=(id,rank='normal')=>{
  const h=hash(id),fav=h%3,out=[1,1,1];out[fav]=rank==='normal'?1.12:1.2;
  out[(fav+1)%3]=1/1.12;out[(fav+2)%3]=rank==='boss'?1.1:rank==='elite'?1.04:1;
  return out;
 };
 const enemy=(n,id,rank='normal')=>{
  if(id==='supreme_emperor')return{maxHp:48000,atk:38000,def:450};
  const b={...standard(n)};if(rank==='boss'){b.maxHp*=2;b.def=Math.round(b.def*1.5);}
  const p=id==='slime'&&level(n)===1?[1,1,1]:profile(id,rank),keys=['maxHp','atk','def'],o={};
  keys.forEach((k,i)=>{o[k]=Math.max(Math.ceil(b[k]/1.2),Math.min(Math.floor(b[k]*1.2),Math.round(b[k]*p[i])));});return o;
 };
 const armorEnds={head:[3,350],body:[5,500],feet:[2,250],shield:[4,450]};
 const gear=(n,slot)=>slot==='weapon'?{atk:curve(5,60000,n),def:0}:{atk:0,def:curve(...(armorEnds[slot]||armorEnds.body),n)};
 const magic=n=>curve(8,70000,n);
 // Whole HP: round once at the point of damage; a positive attack always causes at least 1 HP.
 const damage=(atk,def)=>{atk=Number(atk);def=Number(def);if(!Number.isFinite(atk)||atk<=0)return 0;if(!Number.isFinite(def)||def<=0)def=1;return Math.max(1,Math.round(atk/def*8));};
 return{level,curve,hero,standard,profile,enemy,gear,magic,damage,armorEnds,variation:{min:1/1.2,max:1.2}};
})();
if(typeof module!=='undefined'&&module.exports)module.exports=__v105Scale;
