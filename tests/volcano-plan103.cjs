const assert=require('node:assert/strict'),{plan}=require('../src/volcano-plan103.js');
for(let floor=0;floor<5;floor++){
 const p=plan(floor),visit=(omit=null,seal=null)=>{const q=[p.source],seen=new Set(q);for(let i=0;i<q.length;i++)for(const b of p.links[q[i]])if(b!==omit&&!seen.has(b)&&!(seal&&seal.includes(q[i])&&seal.includes(b))){seen.add(b);q.push(b);}return seen;};
 assert.equal(visit().size,p.active.length,'Every sector must be connected');assert.equal(p.rooms.length,13);assert.equal(p.side.length,6);assert.equal(p.main.length,7);assert(p.loops.length>=12&&p.loops.length<=20);
 for(const room of p.rooms.slice(1,6)){const q=[p.source],seen=new Set(q);for(let i=0;i<q.length;i++)for(const b of p.links[q[i]])if(!seen.has(b)&&!room.cells.includes(b)){seen.add(b);q.push(b);}assert(!seen.has(p.target),'A main chamber can be skipped');}
 for(const r of p.props.filter(p=>p.type==='riddle'))assert(!visit(null,r.seal).has(p.target),'A puzzle seal can be bypassed');
 assert.equal(p.props.filter(p=>p.type==='barrel').length,24);for(const kind of['xp','explosive'])assert.equal(p.props.filter(p=>p.barrelKind===kind).length,6);for(const arrow of p.props.filter(p=>p.type==='arrows')){assert(!p.roomCells.includes(arrow.cell));assert.equal(Math.abs(arrow.axis[0])+Math.abs(arrow.axis[1]),1);}assert.equal(p.props.filter(p=>p.type==='chest').length,6);
 assert.equal(new Set(p.props.filter(p=>p.type==='enemy').map(p=>p.species)).size,6);assert(p.props.filter(p=>p.type==='enemy'||p.type==='boss').every(p=>p.level>=40&&p.level<=45));assert.equal(p.props.some(p=>p.type==='darkness'),[1,3].includes(floor));
 assert.equal(p.props.filter(p=>p.type==='enemy').length,24);assert(!p.props.some(p=>p.type==='gas'));assert.equal(p.props.filter(p=>p.type==='breakwall').length,1);assert.equal(p.props.filter(p=>p.type==='lavafall').length,3);for(const t of p.props.filter(p=>p.band)){assert(!p.roomCells.includes(t.cell));assert.equal(Math.max(t.w,t.d),3.6);assert(!visit(t.cell).has(p.target),'A trap crossing can be bypassed');}
 const occupied=p.props.filter(p=>p.type!=='boss').map(p=>p.cell);assert.equal(new Set(occupied).size,occupied.length,'Overlapping props');
 if(floor<4)assert.equal(p.target,plan(floor+1).source,'The staircase endpoints must align');
 console.log(`PASS floor ${floor+1}: all spacious rooms connected, ${p.loops.length} circuits, 7 mandatory main chambers, 6 side grottos, 2 unavoidable seals`);
}
