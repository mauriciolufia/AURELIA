/* Town services stay findable at their own house; distant schedules reconcile before entering town. */
const __v114Services={npcs:[],next:0,source:null,reconciled:0,reattached:0,registered:0,missing:[],records:new WeakMap(),recordSource:null,recordCount:0};
function __v114AtHome(hour=_x){hour=((hour%24)+24)%24;return hour<12||hour>=16;}
function __v114Returning(hour=_x){return __v114AtHome(hour)||hour>=15.5&&hour<16;}
function __v114Town(n){const id=n.homeSite??n.site;if(_1h[id])return id;return _1h.findIndex(s=>s.type==='ciudad'&&s.name===n.__v101?.home.city);}
function __v114Service(n){
 if(!n?.__v101||n.__v101.home.castle||n.__v88Temporary||n.__v88Dead)return false;
 const site=_1h[__v114Town(n)];if(site?.type!=='ciudad'||site.name==='Nocteverde')return false;
 return n.__v101.giver||['merchant','sorcerer','innkeeper','priest','sage','custodian'].includes(n.job)||n===__v75.sage?.npc||n===__v104Ship.sage;
}
const __v114ChooseRoutine=__v101Choose;__v101Choose=function(n,s){
 if(!__v114Service(n))return __v114ChooseRoutine(n,s);
 let action=__v114ChooseRoutine(n,s);s.zone=__v114Returning()?'home':'outside';
 if(s.zone==='outside')return ['sleep','eat','sit','read','cook','wash','pray'].includes(action)?(s.serial%3===0?'talk':'walk'):action;
 if(_x>=22||_x<6)return n.__v101.bed?'sleep':'read';
 if([10,11,16,17,18,20,21].includes(Math.floor(_x))&&s.serial%3!==0)return ['serve','work','inspect','tidy','read','sweep','walk'][s.serial%7];
 return action;
};
function __v114ServicePoint(n,night=false){
 const a=n.__v101,h=a.home;if(night&&a.bed)return a.bed;
 const s=n.__v100Day||__v100Brain(n),old=s.zone;s.zone='home';let p;try{p=__v101HomeGoal(n,s);}finally{s.zone=old;}
 if(p&&__v101Inside(h,p,.4)&&__v114GoalFree(n,p,1.1))return p;
 for(let r=.6;r<Math.min(h.w,h.d)/2-.45;r+=.6)for(let i=0;i<20;i++){const q=__v101World(h,Math.sin(i*Math.PI/10)*r,Math.cos(i*Math.PI/10)*r);q.y=__v101Ground(n,q.x,q.z,h.y+.14);if(q.y!==null&&__v101Inside(h,q,.45)&&__v114GoalFree(n,q,1.1))return q;}
 return p||a.dining||a.bed;
}
function __v114ResetRoutine(n){const s=__v100Brain(n);__v100Release(n,s);Object.assign(s,{phase:'new',next:0,lastHour:null,route:[],index:0,blocked:0,station:null});n.sleeping=false;n.nav=[];n.goal=null;n.g.rotation.x=n.g.rotation.z=0;return s;}
function __v114RefreshServices(force=false){
 const s=__v114Services;if(s.source!==_2h||force){s.source=_2h;s.npcs=_2h.filter(__v114Service);for(const n of s.npcs)if(!_1h[n.homeSite??n.site])n.homeSite=__v114Town(n);s.next=0;}
 if(!force&&_10<s.next)return;s.next=_10+.5;
 const home=__v114Returning(),night=_x>=22||_x<6,period=home?(night?'night':'home'):'outside';
 for(const n of s.npcs){if(n.__v88Dead||n.__v88Controlled)continue;const state=n.__v100Day,h=n.__v101.home,changed=n.__v114Period!==period;
  if(changed){n.__v114Period=period;__v114ResetRoutine(n);}
  const inside=__v101Inside(h,n,.25)&&Math.abs(n.homeY-h.y)<.8,far=Math.hypot(n.x-_14.x,n.z-_14.z)>145;
  if((force||far)&&((home&&!inside)||(!home&&inside)||changed&&far)){
   let p;if(home)p=__v114ServicePoint(n,night);else{const day=state||__v100Brain(n),zone=day.zone;day.zone='outside';try{p=__v101OutdoorGoal(n,day);}finally{day.zone=zone;}}
   if(p&&Number.isFinite(p.x+p.y+p.z)&&__v101Ground(n,p.x,p.z,p.y)!==null){__v114ResetRoutine(n);__v114MoveNPC(n,p);s.reconciled++;}
  }
 }
}
function __v114Presence(){
 const s=__v114Services;
 if(s.recordSource!==_b0||s.recordCount!==_b0.length){s.recordSource=_b0;s.recordCount=_b0.length;s.records=new WeakMap();for(const r of _b0)if(r.owner?.__v101&&r.g===r.owner.g)s.records.set(r.owner,r);}
 for(const n of s.npcs){if(n.__v88Dead||n.__v88Controlled||n.__v89Sheltered&&__v88War.phase!=='idle')continue;
  const distance=Math.hypot(n.x-_14.x,n.z-_14.z);if(distance>155)continue;
  const r=s.records.get(n);
  if(!r){if(!_b0.some(r=>r.owner===n)){_cp(n);s.records.set(n,_b0.at(-1));s.recordCount=_b0.length;s.registered++;}continue;}
  if(r.loaded&&n.g.parent!==_8){_8.add(n.g);s.reattached++;}
  if(!r.loaded)_cq(r,true);n.g.visible=true;n.g.userData.animated=true;
 }
}
const __v114ServiceFrame=_hr;_hr=function(dt){if(_u&&!_74())__v114RefreshServices();const r=__v114ServiceFrame(dt);if(_u&&!_74())__v114Presence();return r;};
const __v114ServiceWorld=_bj;_bj=function(...args){const r=__v114ServiceWorld(...args);__v114RefreshServices(true);__v114Spread();return r;};
const __v114ServiceLoad=_dn;_dn=function(...args){const r=__v114ServiceLoad(...args);__v114RefreshServices(true);__v114Spread();return r;};
window.__AURELIA_SERVICES114__={audit:()=>({houseHours:[[10,12],[16,10]],outingHours:[12,16],returnStarts:15.5,services:__v114Services.npcs.map(n=>({id:n.id,name:n.name,job:n.job,city:_1h[n.homeSite??n.site]?.name,home:n.__v101.home.id,inside:__v101Inside(n.__v101.home,n,.2)&&Math.abs(n.homeY-n.__v101.home.y)<.8,sleeping:n.sleeping,visible:n.g.visible,registered:_b0.some(r=>r.owner===n&&r.g===n.g)})),reconciled:__v114Services.reconciled,reattached:__v114Services.reattached,registered:__v114Services.registered,missingQuestGivers:_bp.filter(q=>!_2h.some(n=>n.id===q.giver)).map(q=>q.giver)})};
