/* These thirteen spacious chambers are the single source for drawings and game geometry. */
const __v103Names=['Boca de Basalto','Galerías del Azufre','Laberinto de las Brasas','Fallas de Obsidiana','Corazón de la Caldera'];
function __v103Plan(floor){
 const n=25,step=8,total=n*n,links=Array.from({length:total},()=>[]),active=new Set(),roomCells=new Set(),flip=floor%2,cell=(x,z)=>(flip?24-z:z)*25+x,point=i=>({x:(i%25-12)*8,z:(Math.floor(i/25)-12)*8});let seed=103718+floor*971;
 const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;},edge=(a,b)=>{active.add(a);active.add(b);if(!links[a].includes(b)){links[a].push(b);links[b].push(a);}};
 const defs=[[3,3,2,2],[12,3,2,2],[21,3,2,2],[21,12,2,2],[12,12,2,2],[3,12,2,2],[3,21,2,2],[8,8,1,1],[16,8,1,1],[8,16,1,1],[16,16,1,1],[12,21,2,1],[21,21,1,2]],roles=['Acceso superior','Galería de vigilancia','Cámara del primer sello','Cruce de las fallas','Cámara del segundo sello','Sala de las brasas',floor===4?'Santuario de Ígneo y la reliquia':'Descenso al siguiente nivel','Gruta del tesoro','Almacén de expedición','Refugio olvidado','Pozo de azufre','Archivo de piedra','Gruta de las reliquias'];
 const rooms=defs.map(([x,z,rx,rz],i)=>{const cells=[];for(let c=x-rx;c<=x+rx;c++)for(let r=z-rz;r<=z+rz;r++){const a=cell(c,r);cells.push(a);active.add(a);roomCells.add(a);if(c<x+rx)edge(a,cell(c+1,r));if(r<z+rz)edge(a,cell(c,r+1));}return{cell:cell(x,z),cells,label:i<7?'P'+(i+1):String.fromCharCode(65+i-7),main:i<7,name:roles[i],w:(rx*2+1)*8,d:(rz*2+1)*8,...point(cell(x,z))};});
 const corridors=[];function connect(points,optional=false){const cells=[];for(let i=1;i<points.length;i++){let[x,z]=points[i-1];const[tx,tz]=points[i],dx=Math.sign(tx-x),dz=Math.sign(tz-z);if(dx&&dz)throw Error('Non-orthogonal cave corridor');let a=cell(x,z);if(!cells.length)cells.push(a);while(x!==tx||z!==tz){x+=dx;z+=dz;const b=cell(x,z);edge(a,b);cells.push(b);a=b;}}corridors.push({cells,optional});}
 const bend=floor%2?2:4;
 connect([[3,3],[8,3],[8,bend],[12,bend],[12,3]]);connect([[12,3],[17,3],[17,bend],[21,bend],[21,3]]);connect([[21,3],[21,8],[20,8],[20,12],[21,12]]);connect([[21,12],[16,12],[16,13],[12,13],[12,12]]);connect([[12,12],[8,12],[8,11],[3,11],[3,12]]);connect([[3,12],[3,17],[4,17],[4,21],[3,21]]);
 connect([[3,3],[3,8],[8,8]],true);connect([[5,5],[8,5],[8,8]],true);
 connect([[12,3],[12,8],[16,8]],true);connect([[14,5],[16,5],[16,8]],true);
 connect([[3,12],[3,16],[8,16]],true);connect([[5,14],[8,14],[8,16]],true);
 connect([[12,12],[12,16],[16,16]],true);connect([[14,14],[16,14],[16,16]],true);
 connect([[3,21],[12,21]],true);connect([[21,12],[24,12],[24,21],[21,21]],true);
 const pillars=[];for(const room of rooms.slice(0,6)){const cx=room.cell%25,cz=Math.floor(room.cell/25);for(const sign of[-1,1]){const c=(cz+sign)*25+cx+sign;pillars.push(c);active.delete(c);roomCells.delete(c);for(const j of links[c])links[j]=links[j].filter(k=>k!==c);links[c]=[];room.cells=room.cells.filter(k=>k!==c);}}
 const main=rooms.slice(0,7).map(r=>r.cell),side=rooms.slice(7).map(r=>r.cell),source=main[0],target=main[6],parents=new Map([[source,null]]),queue=[source];for(let k=0;k<queue.length;k++)for(const b of links[queue[k]])if(!parents.has(b)){parents.set(b,queue[k]);queue.push(b);}const route=[];for(let k=target;k!==null;k=parents.get(k))route.push(k);route.reverse();
 const props=[],used=new Set([source,target]),add=(type,cell,extra={})=>{props.push({id:'v103-'+floor+'-'+props.length,type,cell,...point(cell),...extra});used.add(cell);};
 add(floor?'up':'exit',source);add(floor===4?'relic':'down',floor===4?target+1:target);
 for(const roomIndex of[2,4]){const room=rooms[roomIndex],indices=route.map((c,i)=>room.cells.includes(c)?i:-1).filter(i=>i>=0),last=indices.at(-1),seal=[route[last+1],route[last+2]];if(seal.some(i=>i===undefined))throw Error('Missing seal corridor');add('riddle',room.cell,{seal,answer:(floor+roomIndex)%3,riddle:roomIndex===2?0:1});}
 for(const c of side)add('chest',c);
 const mandatory=new Set(route.filter(c=>{const seen=new Set([source]),q=[source];for(let i=0;i<q.length;i++)for(const b of links[q[i]])if(b!==c&&!seen.has(b)){seen.add(b);q.push(b);}return !seen.has(target);}));
 const pool=[...active].filter(i=>!used.has(i)&&!main.includes(i));for(let i=pool.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}const take=where=>{if(!where)return pool.pop();let i=pool.findIndex(where);if(i<0&&where.band104)i=pool.findIndex(c=>!roomCells.has(c)&&mandatory.has(c)&&links[c].length===2&&Math.abs(links[c][0]-c)===Math.abs(links[c][1]-c));if(i<0)throw Error('No safe corridor for wall trap');return pool.splice(i,1)[0];};
 // Five mandatory, straight, rock-bounded crossings: a horizontal band cannot be skirted.
 for(let i=0;i<10;i++){const type=i<5?([1,3].includes(floor)&&i>=3?'darkness':'spikes'):'arrows',c=take(type==='arrows'?c=>!roomCells.has(c)&&links[c].length<=2:Object.assign(c=>!roomCells.has(c)&&mandatory.has(c)&&links[c].length===2&&links[c].every(j=>Math.abs(j-c)===25),{band104:true})),blocked=[[-1,0,c%25?c-1:-1],[1,0,c%25<24?c+1:-1],[0,-1,c>=25?c-25:-1],[0,1,c<600?c+25:-1]].find(([x,z,j])=>!links[c].includes(j));add(type,c,{phase:random()*6,band:type!=='arrows',w:type==='arrows'?3.6:links[c].every(j=>Math.abs(j-c)===25)?3.6:1.8,d:type==='arrows'?3.2:links[c].every(j=>Math.abs(j-c)===25)?1.8:3.6,axis:type==='arrows'?[-blocked[0],-blocked[1]]:undefined});}
 const path=new Set(route);for(let i=0;i<10;i++){const c=take();const index=route.indexOf(c),a=point(c),b=point(route[index+1]??route[index-1]??c),d=point(route[index-1]??route[index+1]??c);add('lava',c,{bridge:path.has(c),bridgeAxis:b.x===a.x?'z':'x',bridgeCross:index>0&&index<route.length-1&&(b.x===a.x)!==(d.x===a.x)});}
 for(let i=0;i<24;i++)add('barrel',take(),{barrelKind:i%4===0?'explosive':i%4===1?'xp':'gold'});
 for(let i=0;i<12;i++)add('enemy',take(),{species:i%4,level:Math.min(45,40+floor+i%2)});
 if(floor===4)add('boss',target,{species:4,level:45});
 for(let i=0;i<18;i++)add(i%2?'crystal':'stalagmite',take());
 // Append additions so the v103 chest, barrel, creature and puzzle save identifiers stay stable.
 for(const p of props.filter(p=>p.type==='lava')){const room=roomCells.has(p.cell),horizontal=links[p.cell].some(c=>Math.abs(c-p.cell)===1);p.w=room?6.8:horizontal?7.6:3.6;p.d=room?6.8:horizontal?3.6:7.6;}
 for(let i=0;i<12;i++)add('enemy',take(),{id:`v104-${floor}-enemy-${i}`,species:[5,6,0,1,2,3][i%6],level:Math.min(45,40+floor+i%2)});
 for(let i=0;i<4;i++)add('lava',take(c=>roomCells.has(c)&&!route.includes(c)),{id:`v104-${floor}-lava-${i}`,w:6.8,d:6.8,bridge:false});
 for(let i=0;i<3;i++)add('lavafall',take(c=>roomCells.has(c)&&!route.includes(c)),{id:`v104-${floor}-fall-${i}`,phase:random()*7,radius:1.45});
 add('breakwall',take(c=>!roomCells.has(c)&&!mandatory.has(c)&&links[c].length===2&&links[c].every(j=>Math.abs(j-c)===25)),{id:`v104-${floor}-wall`,w:3.6,d:.7});
 return{floor,name:__v103Names[floor],n,step,size:200,links,route,main,side,rooms,props,corridors,loops:[...pillars.map(c=>point(c)),...[[5.8,6.2],[14.2,6.2],[5.8,14.5],[14.2,14.5]].map(([x,z])=>({x:(x-12)*8,z:((flip?24-z:z)-12)*8}))],pillars,active:[...active],roomCells:[...roomCells],source,target,point};
}
if(typeof module!=='undefined'&&module.exports)module.exports={plan:__v103Plan,names:__v103Names};
