/* Mission order is authoritative. Fixed optional routes never scale to the hero. */
const __v117Progress={ready:false,levels:new WeakMap(),changes:[],routes:[]};
function __v117Level(c,level,source){
 if(!c?.hostile)return;level=__v105Scale.level(level);
 if(c.level!==level)__v117Progress.changes.push({id:c.spawnId,name:c.name||c.spec.name,from:c.level,to:level,source});
 __v117Progress.levels.set(c,level);c.level=level;if(c.defn)c.defn.level=level;
 __v109Ensure(c);__v87EnemyStats(c);__v112TuneXP(c);
}
function __v117Route(areas,boss,bases,bossLevel,label){
 if(!areas.length)return;__v117Progress.routes.push({name:label,boss:boss?.spawnId,bossLevel,floors:[]});
 const route=__v117Progress.routes.at(-1);
 for(const[i,a]of areas.entries()){
  const base=bases[i];a.level=a.design.level=base;
  for(const c of a.members)if(c!==boss)__v117Level(c,_18(c.level,base,Math.min(base+1,bossLevel-1)),label);
  route.floors.push({key:a.key,min:base,max:Math.min(base+1,bossLevel-1)});
 }
 __v117Level(boss,bossLevel,label);
}
function __v117Progression(){
 const p=__v117Progress;p.levels=new WeakMap();p.changes=[];p.routes=[];
 for(const q of _bp){
  const c=_bu(q);if(!c)continue;c.__v95StoryChallenge=false;q.enemyLevel87=q.level;
  __v117Level(c,q.level,q.id);
  for(const guard of _m)if(guard.__v52KeyArea==='aurelia:fort-'+q.site)__v117Level(guard,Math.max(1,q.level-2),q.id+' · llave');
  if(c.__v83Area){const areas=__v83.areas.filter(a=>a.site===q.site);
   for(const[i,a]of areas.entries()){
    const base=Math.max(1,q.level-5+Math.min(i,2));a.level=a.design.level=base;
    for(const ally of a.members)if(ally!==c&&!ally.boss&&!ally.questElite)__v117Level(ally,_18(ally.level,base,q.level-2),q.id+' · guarnición');
   }
  }
 }
 __v117Route(__v94Corsair.areas,__v94Corsair.boss,[8,9,10],12,'Isla del Corsario');
 __v117Level(_m.find(c=>c.__v95CorsairKey),8,'Llave corsaria');
 __v117Route(__v102Solar.areas,__v102Solar.boss,[30,32,34],36,'Pirámide del Sol Eterno');
 __v117Route(__v92Maya.areas,__v92Maya.boss,[30,33],35,'Pirámide de Jade');
 __v117Route(__v95Polar.areas,__v95Polar.boss,[34,36],40,'Palacio de Cristal Polar');
 __v117Route(__v94Ice.areas,__v94Ice.boss,[38,40,42],45,'Corona Boreal');
 __v117Route(__v94Candy.areas,__v94Candy.boss,[25,29,33,37,41],45,'Castillo Candy Candy');
 __v117Route(__v103.areas,__v103.boss,[40,41,42,43,44],45,'Caldera de Obsidiana · opcional');
 // Early cave floors used to advertise their first ordinary monster as the boss.
 for(const a of __v103.areas)a.boss=__v103.boss;
 for(const a of __v83.areas)if(a.plan95)for(const entry of a.plan95.enemies||[]){
  const c=a.members.find(c=>(c.name||c.spec.name)===entry.name);if(c)entry.level=c.level;
 }
 for(const room of __v95Fort.rooms){const c=__v95Fort.guards.find(c=>c.__v95Secret===room.id);if(c)room.level=c.level;}
 // Rebuild once after final levels, retaining the existing experience multipliers.
 __v95XPBuild();__v68Local.source=null;
}
const __v117Stats=__v87EnemyStats;__v87EnemyStats=function(c){const level=__v117Progress.levels.get(c);if(level!==undefined){c.level=level;if(c.defn)c.defn.level=level;}return __v117Stats(c);};
const __v117Campaign=__v95CampaignBuild;__v95CampaignBuild=function(...args){const r=__v117Campaign(...args);if(__v117Progress.ready)__v117Progression();return r;};
const __v117ProgressWorld=_bj;_bj=function(...args){__v117Progress.ready=false;__v117Progress.levels=new WeakMap();const r=__v117ProgressWorld(...args);__v117Progress.ready=true;__v117Progression();return r;};
const __v117ProgressLoad=_dn;_dn=function(...args){const r=__v117ProgressLoad(...args);__v117Progression();return r;};
window.__AURELIA_PROGRESSION117__={audit:()=>({changes:__v117Progress.changes,routes:__v117Progress.routes,missions:_bp.map(q=>({id:q.id,level:q.level,targetLevel:_bu(q)?.level})),bosses:_m.filter(c=>c.hostile&&__v109Context(c).boss).map(c=>({id:c.spawnId,name:c.name||c.spec.name,level:c.level,hp:c.maxHp,atk:c.damage,def:c.__v87BaseDef}))})};
