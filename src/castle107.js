/* Six-hour shop shifts and twelve-hour royal audiences; home routines remain active. */
function __v107Duty(n,hour=_x){const role=n.__v102Court?.role;if(role==='merchant'||role==='sorcerer')return hour>=9&&hour<15;if(role==='king')return hour>=6&&hour<18;return hour>=6&&hour<23;}
const __v107CourtChoose=__v101Choose;__v101Choose=function(n,s){
 const c=n.__v102Court;if(!c||!['merchant','sorcerer','king'].includes(c.role)||c.role==='king'&&__v107Duty(n))return __v107CourtChoose(n,s);
 if(!__v107Duty(n)){const result=__v102CourtChoose(n,s);c.label=__v100Tasks[result]?.label||'Descansar';return result;}
 s.lastHour=Math.floor(_x);s.zone='court102';const index=((s.serial||0)+Math.floor(_x))%__v102CourtActions.length;c.label=__v102CourtLabels[c.role][index];
 // Meals are taken outside the six-hour shift, at the NPC's own table.
 return __v102CourtActions[index];
};
const __v107CourtGoal=__v102CourtGoal;__v102CourtGoal=function(n,s){
 const c=n.__v102Court;if(!c||!__v107Duty(n)||!['merchant','sorcerer'].includes(c.role))return __v107CourtGoal(n,s);
 for(let i=0;i<32;i++){const angle=(i/16+(s.serial||0)*.173+(n.phase||0))*PI*2,r=1+(i%4)*.45,p={x:c.anchor.x+Math.cos(angle)*r,z:c.anchor.z+Math.sin(angle)*r};p.y=__v101Ground(n,p.x,p.z,c.anchor.y);if(p.y!==null&&!__v102CourtPrivate(p))return p;}
 return __v107CourtGoal(n,s);
};
__v101HomeGoal=function(n,s){return n.__v102Court&&__v107Duty(n)?__v102CourtGoal(n,s):__v102CourtHome(n,s);};
__v101OutdoorGoal=function(n,s){return n.__v102Court&&__v107Duty(n)?__v102CourtGoal(n,s):__v102CourtOutside(n,s);};
const __v107Destination=__v100Destination;__v100Destination=function(n,s,action){
 if(!n.__v102Court||__v107Duty(n))return __v107Destination(n,s,action);
 const court=n.__v102Court;n.__v102Court=null;try{return __v107Destination(n,s,action);}finally{n.__v102Court=court;}
};
const __v107Station=__v101ValidStation;__v101ValidStation=function(n,s){return n.__v102Court&&!__v107Duty(n)?__v102CourtStation(n,s):__v107Station(n,s);};
const __v107CourtPose=__v100Pose;__v100Pose=function(n,b,s,moving,dt){return n.__v102Court&&!__v107Duty(n)?__v102CourtPose(n,b,s,moving,dt):__v107CourtPose(n,b,s,moving,dt);};
let __v107ScheduleHour=-1;const __v107CourtFrame=_hr;_hr=function(dt){
 const hour=Math.floor(_x);if(_u&&!_74()&&hour!==__v107ScheduleHour){__v107ScheduleHour=hour;
  for(const n of __v102Court.npcs){const duty=__v107Duty(n),s=n.__v100Day;if(duty===n.__v107Duty)continue;n.__v107Duty=duty;__v100Release(n,s);Object.assign(s,{phase:'new',next:0,lastHour:null,route:[],index:0});
   if(duty&&Math.hypot(n.x-_14.x,n.z-_14.z)>180){const p=__v102CourtGoal(n,s);if(p){n.x=p.x;n.z=p.z;n.homeY=p.y;n.g.position.set(p.x,p.y,p.z);n.sleeping=false;}}
  }
 }
 return __v107CourtFrame(dt);
};
window.__AURELIA_CASTLE107__={audit:()=>({shopHours:[9,15],shopShiftHours:6,royalHours:[6,18],royalHallHours:12,sleepHours:[23,6],npcs:__v102Court.npcs.map(n=>({id:n.id,role:n.__v102Court.role,onDuty:__v107Duty(n),distance:Math.hypot(n.x-n.__v102Court.anchor.x,n.z-n.__v102Court.anchor.z)}))})};
