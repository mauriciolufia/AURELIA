/* Bind service residents to the building advertised by the town, before beds are allocated. */
function __v115ServiceHome(n,available){
 const town=n.homeSite??n.site,service=__v20TownServices.get(town),kind={merchant:'shop',sorcerer:'mage',innkeeper:'inn'}[n.job],home=service?.[kind];
 return home&&available.includes(home)?home:null;
}
const __v115Schedule={timer:0,updates:0,moved:0,missing:[]};
function __v115ClockLabel(){const h=(_x%24+24)%24,value=String(Math.floor(h)).padStart(2,'0')+':'+String(Math.floor(h%1*60+.00001)).padStart(2,'0');$('time-value').textContent=value;$('clock').textContent=value;}
function __v115ApplyTime(){
 clearTimeout(__v115Schedule.timer);if(!__v101Life.ready)return;__v115Schedule.missing=[];
 // An explicit time jump reconciles nearby residents too, while normal time still uses walking routes.
 for(const n of _2h){if(!n.__v101||n.__v88Dead||n.__v88Controlled||n.__v89Sheltered&&__v88War.phase!=='idle')continue;
  const s=__v114ResetRoutine(n);s.zone='home';s.serial++;let action=__v101Choose(n,s),point=__v100Destination(n,s,action);
  if(!point){__v100Release(n,s);action='walk';point=s.zone==='outside'?__v101OutdoorGoal(n,s):__v101HomeGoal(n,s);}
  if(!point||!Number.isFinite(point.x+point.y+point.z)){__v115Schedule.missing.push(n.id);continue;}
  __v114MoveNPC(n,point);Object.assign(s,{action,phase:'perform',target:{...point},route:[],index:0,lastHour:Math.floor(_x),until:__v98AI.clock+(action==='sleep'?30:2),next:0,blocked:0});
  n.sleeping=action==='sleep'&&__v101ValidStation(n,s);n.__v88Moving=false;n.__v102SchedulePending=false;n.__v107Duty=__v107Duty(n);
  if(__v114Service(n))n.__v114Period=__v114Returning()?(_x>=22||_x<6?'night':'home'):'outside';
  if(Math.hypot(n.x-_14.x,n.z-_14.z)<180)__v100Pose(n,__v98NPCBrain(n),s,false,0);
  n.activity=__v100Tasks[action]?.label||'Recorriendo su hogar';__v115Schedule.moved++;
 }
 __v102Court.period=__v102CourtDay();__v107ScheduleHour=Math.floor(_x);__v114Services.next=0;
 __v114PerfReset();__v114Spread();_b3.set(Infinity,Infinity);_bg(true);__v114Presence();__v93Visibility();__v115ClockLabel();__v115Schedule.updates++;_iv();
}
const __v115TimeInput=$('time').oninput;$('time').oninput=function(e){__v115TimeInput?.call(this,e);__v115ClockLabel();clearTimeout(__v115Schedule.timer);__v115Schedule.timer=setTimeout(__v115ApplyTime,80);};
$('time').addEventListener('change',__v115ApplyTime);
window.__AURELIA_SCHEDULE115__={audit:()=>({hour:_x,updates:__v115Schedule.updates,moved:__v115Schedule.moved,missing:[...__v115Schedule.missing]})};
