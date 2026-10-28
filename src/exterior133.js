/* Halve the last biome's outdoor roster, retaining stable save identities and quest actors. */
let __v133Roster=null;
function __v133Outdoor(c){return !!c.hostile&&c.biome==='demonic'&&!c.__v83Area&&!c.__v75Area&&!c.__v103&&!c.__v83Retired&&!c.__v88Raid&&!c.__v87RaidControlled;}
function __v133Protected(c){return !!(c.boss||c.elite||c.questElite||c.__v52KeyArea||c.__v76KeyDrops?.length||c.__v87SecretGuard||c.adventure||c.dialogue||c.bossEscort);}
function __v133ID(c){return String(c.spawnId||[c.spec?.id,c.x,c.z].join(':'));}
function __v133Hash(c){let h=2166136261;for(const ch of __v133ID(c))h=Math.imul(h^ch.charCodeAt(0),16777619);return h>>>0;}
function __v133Reduce(){
 if(!__v133Roster){
  const all=_m.filter(__v133Outdoor),protectedActors=all.filter(__v133Protected),regular=all.filter(c=>!__v133Protected(c));
  const target=Math.max(protectedActors.length,Math.ceil(all.length/2)),keep=new Set(protectedActors.map(__v133ID));
  regular.sort((a,b)=>__v133Hash(a)-__v133Hash(b)||__v133ID(a).localeCompare(__v133ID(b)));
  for(const c of regular.slice(0,target-protectedActors.length))keep.add(__v133ID(c));
  __v133Roster={before:all.length,after:keep.size,protected:protectedActors.length,kept:keep,removed:new Set(all.filter(c=>!keep.has(__v133ID(c))).map(__v133ID))};
 }
 const roster=__v133Roster,removed=c=>!!c.spec&&roster.removed.has(__v133ID(c));
 const actors=_m.filter(removed),records=_b0.filter(r=>removed(r.owner));
 if(!actors.length&&!records.length)return;
 for(const c of actors){
  if(c.specialAction)_d3(c);c.__v83Retired=true;c.dead=true;c.hp=0;c.respawn=Infinity;c.g.visible=false;c.g.removeFromParent();
  if(c.warning){c.warning.visible=false;c.warning.removeFromParent();}
  __v118Slots.active.delete(c);__v118Slots.waiting.delete(c);__v123.sleepingDead.delete(c);__v128.models.delete(c);
 }
 for(const record of records){_cq(record,false);record.g.removeFromParent();}
 _m=_m.filter(c=>!removed(c));_b0=_b0.filter(r=>!removed(r.owner));
 __v88Eclipse.exterior=__v88Eclipse.exterior.filter(c=>!removed(c));
 __v93.records=__v93.records.filter(r=>!removed(r.owner));
 __v123.actors=[];__v123.creatures=[];__v123.records=null;
 __v68Local.source=null;__v114PerfReset();__v87RespawnIndex();
 if(__v123.ready){__v123Refresh(true);_b3.set(Infinity,Infinity);_bg(true);}
}
const __v133World=_bj;_bj=function(...args){__v133Roster=null;const r=__v133World(...args);__v133Reduce();return r;};
const __v133Load=_dn;_dn=function(...args){const r=__v133Load(...args);__v133Reduce();return r;};
window.__AURELIA_EXTERIOR133__={audit:()=>({before:__v133Roster?.before||0,after:__v133Roster?.after||0,protected:__v133Roster?.protected||0,removed:__v133Roster?.removed.size||0,outdoorsOnly:true})};
