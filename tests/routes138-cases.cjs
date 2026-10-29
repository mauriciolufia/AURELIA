module.exports=[
['all maze floors require the complete chain between arrival and ascent or boss',`(()=>{
 const reports=[];
 for(const a of __v95Maze.areas){
  const p=a.plan95,entry=__v83Local(a,a.entry.x,a.entry.z),out=p.stairs.find(s=>!s.incoming),goal=out?[out.x,out.z0-1]:__v83Local(a,a.boss.g.position.x,a.boss.g.position.z);
  const blocked=(x,z,omit)=>!p.walkRects.some(r=>x>=r[0]&&x<=r[2]&&z>=r[1]&&z<=r[3])||p.walls.some(l=>Math.abs(x-(l[0]+l[2])/2)<Math.abs(l[2]-l[0])/2+.65&&Math.abs(z-(l[1]+l[3])/2)<Math.abs(l[3]-l[1])/2+.65)||(omit>=0&&x>p.rects[omit][0]&&x<p.rects[omit][2]&&z>p.rects[omit][1]&&z<p.rects[omit][3]);
  const reach=omit=>{const q=[[Math.round(entry[0]),Math.round(entry[1])]],seen=new Set([q[0].join(',')]),target=goal.map(Math.round).join(',');for(let i=0;i<q.length;i++){const[x,z]=q[i];if(x+','+z===target)return true;for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,zz=z+dz,key=xx+','+zz;if(Math.abs(xx)>p.b||Math.abs(zz)>p.b||seen.has(key)||blocked(xx,zz,omit))continue;seen.add(key);q.push([xx,zz]);}}return false;};
  if(!reach(-1))throw Error('Disconnected endpoints '+a.key+' '+JSON.stringify({entry,goal}));
  for(let i=1;i<6;i++)if(reach(i))throw Error('Room '+i+' bypassable '+a.key);
  if(Math.hypot(goal[0]-entry[0],goal[1]-entry[1])<30)throw Error('Endpoints too close '+a.key);
  reports.push({key:a.key,mainRooms:7});
 }return reports;
})()`],
['Eclipse alternates its complete six-hall route and lands far from the final throne',`(()=>{
 const reports=[];
 for(const a of __v88Eclipse.areas){
  const incoming=__v88Eclipse.stairs.find(s=>s.upper===a),outgoing=__v88Eclipse.stairs.find(s=>s.lower===a),entry=incoming?__v83Local(a,incoming.end.x,incoming.end.z):__v83Local(a,a.entry.x,a.entry.z),goal=outgoing?__v83Local(a,outgoing.start.x,outgoing.start.z):__v83Local(a,a.boss.g.position.x,a.boss.g.position.z),rects=a.__v92Regions||[a.design.bounds],roomRects=a.floor88<2?a.design.centers.map((c,i)=>{const size=(a.design.sizes||__v83Sizes)[i];return[c[0]-size[0]/2,c[1]-size[1]/2,c[0]+size[0]/2,c[1]+size[1]/2];}):rects;
  const b=a.design.bounds,x0=Math.ceil(b[0]),z0=Math.ceil(b[1]),w=Math.floor(b[2])-x0+1,h=Math.floor(b[3])-z0+1,mask=new Uint8Array(w*h),wallHit=(x,z)=>a.design.constructionWalls85.some(l=>{const dx=l[2]-l[0],dz=l[3]-l[1],length=dx*dx+dz*dz,t=length?Math.max(0,Math.min(1,((x-l[0])*dx+(z-l[1])*dz)/length)):0;return (x-l[0]-t*dx)**2+(z-l[1]-t*dz)**2<.6**2;});
  for(let z=0;z<h;z++)for(let x=0;x<w;x++){const xx=x+x0,zz=z+z0;if(rects.some(r=>xx>=r[0]&&xx<=r[2]&&zz>=r[1]&&zz<=r[3])&&!wallHit(xx,zz))mask[z*w+x]=1;}
  const snap=p=>{for(let r=0;r<6;r++)for(let z=-r;z<=r;z++)for(let x=-r;x<=r;x++){const xx=Math.round(p[0])+x-x0,zz=Math.round(p[1])+z-z0;if(xx>=0&&xx<w&&zz>=0&&zz<h&&mask[zz*w+xx])return zz*w+xx;}throw Error('No walkable endpoint '+a.key);},start=snap(entry),target=snap(goal);
  const reach=omit=>{const q=[start],seen=new Uint8Array(mask.length);seen[start]=1;for(let i=0;i<q.length;i++){const n=q[i];if(n===target)return true;const x=n%w,z=Math.floor(n/w);for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,zz=z+dz,j=zz*w+xx;if(xx<0||xx>=w||zz<0||zz>=h||!mask[j]||seen[j])continue;const r=roomRects[omit];if(r&&xx+x0>r[0]&&xx+x0<r[2]&&zz+z0>r[1]&&zz+z0<r[3])continue;seen[j]=1;q.push(j);}}return false;};
  if(!reach(-1))throw Error('Eclipse route disconnected '+a.key+' '+JSON.stringify({entry,goal}));
  for(let room=1;room<(a.floor88<2?8:5);room++)if(reach(room))throw Error('Eclipse room bypassable '+a.key+'/'+room);
  if(outgoing&&a.floor88>=2&&outgoing.room!==5)throw Error('Ascent skips last hall');
  const distance=Math.hypot(entry[0]-goal[0],entry[1]-goal[1]);if(distance<140)throw Error('Arrival too close to exit/boss '+a.key);
  reports.push({key:a.key,distance:Math.round(distance),requiredHalls:a.floor88<2?9:6,mirrored:!!a.design.mirror138});
 }
 const final=__v88Eclipse.areas.at(-1),boss=__v94Emperor.boss,r=final.__v92Regions[5],p=__v83Local(final,boss.g.position.x,boss.g.position.z);
 if(__v94Emperor.area!==final||p[0]<r[0]||p[0]>r[2]||p[1]<r[1]||p[1]>r[3])throw Error('Boss left throne');return reports;
})()`],
['every physical staircase has continuous ground, clear headroom and matching slab openings',`(()=>{
 const pos=_14.clone(),doors=__v83.doors.map(d=>({d,lift:d.lift,open:d.open}));let maze=0,eclipse=0;
 try{for(const {d}of doors){d.lift=30;d.open=true;}
 for(const a of __v95Maze.areas)for(const st of a.plan95.stairs.filter(s=>!s.incoming))for(let i=0;i<=36;i++){
  const t=i/36,p=__v83Point(a,[st.x,st.z0+(st.z1-st.z0)*t]),y=a.y+12*t;_14.set(p.x,y+1.85,p.z);
  if(Math.abs(_ei(p.x,p.z)-y)>.15||_i7(p.x,p.z,y+1.85))throw Error('Maze stair blocked '+a.key+'/'+i);maze++;
 }
 for(const st of __v88Eclipse.stairs){
  for(const f of st.segments)for(let i=0;i<=36;i++){const t=i/36,x=_19(f.x0,f.x1,t),z=_19(f.z0,f.z1,t),y=_19(f.y0,f.y1,t);_14.set(x,y+1.85,z);if(Math.abs(_ei(x,z)-y)>1.1||_i7(x,z,y+1.85))throw Error('Eclipse stair blocked '+st.upper.key+'/'+i+' '+JSON.stringify({x,z,y,ground:_ei(x,z),colliders:(_1j.get(Math.floor(x/32)+','+Math.floor(z/32))||[]).filter(c=>__v73Hit(c,x,z,y+1.85)).map(c=>({tag:c.tag,area:c.__v83,x:c.x,z:c.z,bottom:c.bottom,top:c.top})),objects:__v75Nearby(x,z).filter(o=>__v75Hit(o,x,z,y+1.85)).map(o=>({type:o.type,id:o.id}))}));eclipse++;}
  const p=__v83Local(st.upper,st.end.x,st.end.z-2);if(!st.upper.design.stairHoles88.some(h=>__v84PointInRing(p,h)))throw Error('Missing slab opening '+st.upper.key);
 }
 return{mazeSamples:maze,eclipseSamples:eclipse};
 }finally{_14.copy(pos);for(const {d,lift,open}of doors){d.lift=lift;d.open=open;}}
})()`],
['volcanic floors keep entrance and descent or final boss at opposite route endpoints',`(()=>{
 for(const a of __v103.areas){const p=a.plan103;if(p.source===p.target||p.route.length<50)throw Error('Cave shortcut');const goal=p.props.find(o=>o.type===(a.floor103===4?'boss':'down'));if(!goal||Math.hypot(a.entry.x-a.x-goal.x,a.entry.z-a.z-goal.z)<100)throw Error('Cave endpoints too close');}
 return{floors:5};
})()`],
['real walking climbs and descends all five Eclipse staircases without teleportation',`(()=>{
 const old={p:_14.clone(),yaw,keys:{..._15},joy:{x:_16.x,y:_16.y},flight:_v,ride:_9d,sprint:_w,camera:__aurCameraMode,cameraYaw:__v95Camera.yaw},doors=__v83.doors.map(d=>({d,lift:d.lift,open:d.open}));let steps=0;
 try{for(const {d}of doors){d.lift=30;d.open=true;}for(const k of Object.keys(_15))_15[k]=false;_16.x=0;_16.y=1;_v=false;_9d=null;_w=true;__aurSetCameraMode('first');
  for(const st of __v88Eclipse.stairs){const a=st.segments[0],b=st.segments[1],path=[st.start,{x:a.x0,z:a.z0},{x:a.x1,z:a.z1},{x:b.x0,z:b.z0},{x:b.x1,z:b.z1},st.end];
   for(const down of [false,true]){const points=down?[...path].reverse():path;_14.set(points[0].x,(down?st.upper.y:st.lower.y)+1.85,points[0].z);_12=0;_13=true;
    for(const p of points.slice(1)){let count=0;while(Math.hypot(_14.x-p.x,_14.z-p.z)>.22&&count++<2200){yaw=Math.atan2(-(p.x-_14.x),-(p.z-_14.z));__v95Camera.yaw=yaw;_3m(.008);steps++;}
     if(count>=2200)throw Error('Walking stuck '+st.upper.key+' '+(down?'down':'up')+' '+JSON.stringify({target:p,position:_14.toArray()}));
    }
    const expected=(down?st.lower.y:st.upper.y)+1.85;_16.y=0;for(let settle=0;settle<120&&Math.abs(_14.y-expected)>.05;settle++)_3m(.008);_16.y=1;if(Math.abs(_14.y-expected)>.5)throw Error('Walking loses floor '+st.upper.key+' '+JSON.stringify({down,expected,position:_14.toArray(),ground:_ei(_14.x,_14.z),velocity:_12,grounded:_13}));
   }
  }return{staircases:5,directions:2,walkingSteps:steps};
 }finally{_14.copy(old.p);yaw=old.yaw;Object.assign(_15,old.keys);_16.x=old.joy.x;_16.y=old.joy.y;_v=old.flight;_9d=old.ride;_w=old.sprint;__v95Camera.yaw=old.cameraYaw;__aurSetCameraMode(old.camera);for(const {d,lift,open}of doors){d.lift=lift;d.open=open;}}
})()`],
['save restoration preserves six Eclipse floors, routes and the boss controller',`(()=>{
 _iv();_dn(JSON.parse(__v96ReadSave()));const areas=__v88Eclipse.areas;
 if(areas.length!==6||__v88Eclipse.stairs.length!==5||!areas[3].design.mirror138||areas[4].design.mirror138||!areas[5].design.mirror138||__v94Emperor.area!==areas[5])throw Error('Routes lost on reload');
 return{floors:6,stairs:5};
})()`]
];
