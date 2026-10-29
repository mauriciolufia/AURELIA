module.exports=[
 ['tower maps render even when optional furniture and trap lists are absent',`(()=>{
  const canvas=document.createElement('canvas');canvas.width=760;canvas.height=650;const c=canvas.getContext('2d');let checked=0;
  for(const a of __v139.areas){const d=a.design,old=[d.furniture,d.addedTraps85];try{
   for(const value of[undefined,null]){d.furniture=value;d.addedTraps85=value;__v83DrawPlan(c,760,650,a);checked++;}
  }finally{[d.furniture,d.addedTraps85]=old;}}return{checked};
 })()`],
 ['central crossing is solid and free flight cannot bypass the interior walls',`(()=>{
  const old={p:_14.clone(),flight:_v,yaw,keys:{..._15},joy:{..._16},ride:_9d};let walls=0;
  try{for(const a of __v139.areas.slice(0,9)){for(const h of[1.85,8.5])if(!_i7(a.x,a.z,a.y+h))throw Error('Central crossing is passable '+a.key);walls++;}
   const a=__v139.areas[2],p=__v83Point(a,[0,-16]);_14.set(p.x,a.y+1.85,p.z);for(const k of Object.keys(_15))_15[k]=false;_9d=null;_16.x=0;_16.y=1;_v=true;yaw=0;
   for(let i=0;i<120;i++)_3m(.04);
   if(_v||Math.abs(__v83Local(a,_14.x,_14.z)[1])<12.8)throw Error('Free flight bypassed tower corridor');return{walls,flight:false};
  }finally{_14.copy(old.p);_v=old.flight;yaw=old.yaw;Object.assign(_15,old.keys);Object.assign(_16,old.joy);_9d=old.ride;}
 })()`]
];
