/* Drive the same frame callback used by the shipped game. No NPC tick, clock or routine is invoked directly. */
const {chromium}=require('playwright');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const html=fs.readFileSync(path.resolve(__dirname,'../index.html'),'utf8').replace('const _ix=_7q();',`
 const __dayRender=_5.render.bind(_5),__dayRAF=requestAnimationFrame;
 _5.render=()=>{};window.requestAnimationFrame=callback=>callback===frame?0:__dayRAF(callback);
 window.__dayTest=source=>eval(source);let __dayNow=performance.now();
 const __dayFrames=count=>{active=true;for(let i=0;i<count;i++)frame(__dayNow+=40);const invalid=_2h.find(n=>!Number.isFinite(n.x+n.z+n.homeY+n.g.position.x+n.g.position.y+n.g.position.z));if(invalid)throw Error('Non-finite NPC position '+invalid.id+' '+invalid.__v100Day?.action);active=false;};
 const _ix=_7q();`);
 const server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(html);});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
  const mobile=process.argv.includes('--mobile'),page=await browser.newPage(mobile?{viewport:{width:844,height:390},isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/142.0.0.0 Mobile Safari/537.36'}:{viewport:{width:960,height:540}}),errors=[];
  page.on('console',m=>{if(m.text().startsWith('DAILY '))console.log(m.text());});page.on('pageerror',e=>errors.push(e.message));await page.goto(`http://127.0.0.1:${server.address().port}/`,{waitUntil:'domcontentloaded',timeout:180000});await page.waitForFunction(()=>window.__dayTest&&!document.getElementById('ag-start').disabled,null,{timeout:240000});
  const run=s=>page.evaluate(s=>window.__dayTest(s),s);await page.click('#ag-start');await page.evaluate(()=>document.getElementById('ag-v85-demo').click());await run(`active=false;_v=true;`);
  await run(`$('cycle').checked=false;$('cycle').dispatchEvent(new Event('change'));`);
  console.log('PASS all villages and castle bedrooms have fixed beds and dining furniture',await run(`(()=>{
   const audit=__AURELIA_LIFE101__.audit(),beds=new Set();if(audit.npcs!==477||audit.missingBeds.length||audit.missingDining.length)throw Error('Missing home furniture '+JSON.stringify(audit));
   for(const n of _2h){const a=n.__v101;if(!a)continue;const bed=a.bed.furniture,seat=a.dining.furniture,table=a.dining.table;
    if(beds.has(bed.id)||bed.owner!==n.id||bed.home!==a.home||seat.home!==a.home||table.home!==a.home||table.context!=='dining'||!__v101Inside(a.home,bed,.2))throw Error('Furniture belongs to another home/NPC '+n.id);beds.add(bed.id);
    if(__v101Ground(n,a.bed.x,a.bed.z,a.bed.y)===null||__v101Ground(n,a.dining.x,a.dining.z,a.dining.y)===null)throw Error('Furniture has no approach '+n.id);
   }
   for(const h of audit.homes)if(!h.beds||!h.diningSeats||h.assignedBeds!==h.residents)throw Error('Unfurnished house '+h.id);
   for(const h of __v101Life.castleHomes){const site=_1h[h.castle],library=_43.find(r=>r.castle===site.name&&r.label==='Biblioteca');if(!library||h.x>=site.x||library.x<=site.x)throw Error('Bedroom is not opposite the library');}
   const doors=__v29Doors.filter(d=>d.root.name?.startsWith('Dormitorio fijo'));if(doors.length!==72||doors.some(d=>!d.pivot.parent||!d.pivot.matrixAutoUpdate))throw Error('Bedroom doors were merged/frozen');
   return{npcs:audit.npcs,villageHomes:audit.homes.filter(h=>h.type!=='bedroom').length,castleBedrooms:doors.length,exclusiveBeds:beds.size};})()`));
  console.log('PASS all castle bedrooms connect to the courtyard without crossing furniture',await run(`(()=>{let routes=0;for(const h of __v101Life.castleHomes){const site=_1h[h.castle],n={...h.members[0],homeSite:h.castle,site:h.castle,__v101:{home:h},x:site.x+1.8,z:site.z+86,homeY:site.level+.12},p=__v101World(h,0,h.d/2+1);p.y=h.y;if(!__v101CastleRoute(n,p))throw Error('Bedroom has no public entrance route '+h.id);n.x=p.x;n.z=p.z;n.homeY=p.y;if(!__v101CastleRoute(n,{x:site.x+1.8,z:site.z+86,y:site.level+.12}))throw Error('Bedroom has no public exit route '+h.id);routes+=2;}return routes;})()`));
  // Topology audit checks every assigned station independently of the behavior simulation.
  const ids=await run('_2h.filter(n=>n.__v101).map(n=>n.id)');let routes=0;
  for(let offset=0;!process.argv.includes('--quick')&&offset<ids.length;offset+=24){routes+=await run(`(()=>{let count=0;for(const id of ${JSON.stringify(ids)}.slice(${offset},${offset+24})){
   const n=_2h.find(n=>n.id===id),h=n.__v101.home,old={x:n.x,z:n.z,y:n.homeY},entry=__v101World(h,0,h.d/2-.65);try{
    n.x=entry.x;n.z=entry.z;n.homeY=__v101Floor(n.x,n.z,h.y+.14);if(__v101Ground(n,n.x,n.z)===null)throw Error('House entry blocked '+h.id);
    for(const target of[n.__v101.bed,n.__v101.dining]){const generator=__v101Path(n,target);let step;do{step=generator.next();}while(!step.done);if(!step.value.length)throw Error('No furniture route '+n.id+' '+target.furniture.type+' '+h.id);count++;}
   }finally{n.x=old.x;n.z=old.z;n.homeY=old.y;}
  }return count;})()`);console.log('Checked furniture routes',Math.min(offset+24,ids.length),'/',ids.length);}
  if(routes)console.log('PASS physical routes from each home entry reach every assigned bed and dining chair',routes);
  if(process.argv.includes('--audit-only'))return;
  const reports=[];
  for(const id of(process.argv.includes('--inn')?['citizen-1-3']:process.argv.includes('--castle')?['court-2-2','court-2-0']:process.argv.includes('--king')?['court-2-0']:['ines','citizen-1-2','citizen-1-3','court-2-2','court-2-0'])){
   const result=await run(`(()=>{
    const n=_2h.find(n=>n.id===${JSON.stringify(id)}),s=n.__v100Day;_14.set(n.x+2,n.homeY+1.85,n.z+2);const start=s.traveled;_x=9.1;
    for(let i=0;i<300&&s.traveled-start<.5;i++)__dayFrames(1);if(s.traveled-start<.5)throw Error('NPC is a statue '+JSON.stringify({id:n.id,phase:s.phase,action:s.action,x:n.x,z:n.z,y:n.homeY,home:n.home.id,origin:n.__v101.origin,hero:_14.toArray(),active:__v88Life.active.includes(n),controlled:n.__v88Controlled,dead:n.__v88Dead,started:_u,blocked:_74(),paused:__v59IsPaused(),flight:_v,clock:__v98AI.clock,next:s.next,hour:s.lastHour,plans:__v99Life.plans,target:s.target&&[s.target.x,s.target.y,s.target.z]}));
    const observerHeight=_14.y;_14.y+=12;const above=s.traveled;for(let i=0;i<250;i++)__dayFrames(1);if(_14.y!==observerHeight+12)throw Error('NPC floor query moved the observer');const upstairsMeters=s.traveled-above;if(upstairsMeters<.3)throw Error('Observer floor freezes NPC '+n.id);_14.y=observerHeight;
    _x=8.1;let ate=false;for(let i=0;i<4000;i++){__dayFrames(1);if(s.phase==='perform'&&s.action==='eat'){ate=true;break;}}
    if(!ate||!__v101ValidStation(n,s)||!n.__v100Props.food.visible||!n.__v100Props.mealArms.visible||n.__v100Props.stool.visible||!n.__v100Props.legs.visible)throw Error('NPC does not eat at its fixed dining table '+JSON.stringify({id:n.id,phase:s.phase,action:s.action,x:n.x,z:n.z,y:n.homeY,zone:s.zone,waypoint:s.waypoint,index:s.index,route:s.route.map(p=>[p.x,p.y,p.z]),path:s.pathTarget&&[s.pathTarget.x,s.pathTarget.y,s.pathTarget.z],target:s.target&&[s.target.x,s.target.y,s.target.z],job:__v100Day.jobs.get(n)?.steps,blocked:s.blocked,neighbors:__v88Life.active.filter(o=>o!==n&&Math.hypot(o.x-n.x,o.z-n.z)<2).map(o=>({id:o.id,x:o.x,z:o.z,phase:o.__v100Day?.phase,action:o.__v100Day?.action}))}));
    if(!n.g.visible||!n.g.parent||!Number.isFinite(n.x+n.z+n.homeY)||Math.hypot(n.g.position.x-n.x,n.g.position.z-n.z)>.05)throw Error('Meal model differs from simulated NPC');
    console.log('DAILY meal reached '+n.id);__dayFrames(190);if(!s.mealCount)throw Error('Meal never completes '+n.id);
    _x=22.1;let slept=false;for(let i=0;i<4500;i++){__dayFrames(1);if(n.sleeping){slept=true;break;}}
    if(!slept||!__v101ValidStation(n,s)||s.bed.owner!==n.id||Math.abs(n.g.position.y-(s.bed.y+.72))>.02||Math.abs(n.g.rotation.x+Math.PI/2)>.02||n.__v100Props.stool.visible)throw Error('NPC does not lie in its own bed '+n.id+' '+s.phase+' '+s.action);
    console.log('DAILY bed reached '+n.id);__dayFrames(90);if(!n.sleeping)throw Error('Night sleep incorrectly cycles to outdoor tasks');
    _x=11.1;let outside=false;for(let i=0;i<4500;i++){__dayFrames(1);if(__v101Outdoors(n)){outside=true;break;}}
    if(!outside||n.sleeping)throw Error('NPC does not wake up and walk outside '+JSON.stringify({id:n.id,phase:s.phase,action:s.action,x:n.x,z:n.z,homeY:n.homeY,target:s.target&&[s.target.x,s.target.y,s.target.z],job:__v100Day.jobs.has(n),index:s.index,route:s.route.length,pathTarget:s.pathTarget&&[s.pathTarget.x,s.pathTarget.y,s.pathTarget.z],planningSteps:__v100Day.jobs.get(n)?.steps,waypoint:s.waypoint,blocked:s.blocked,near:__v88Life.active.includes(n),actors:__v88Life.active.filter(o=>o!==n&&Math.hypot(o.x-n.x,o.z-n.z)<2).map(o=>({id:o.id,x:o.x,z:o.z,sleep:o.sleeping,phase:o.__v100Day?.phase,action:o.__v100Day?.action}))}));
    if(n.rank==='king'){
     _x=9.1;let returned=false;for(let i=0;i<6000;i++){__dayFrames(1);if(s.phase==='perform'&&n.homeY>n.__v101.home.y+10&&Math.hypot(n.x-n.__v101.origin.x,n.z-n.__v101.origin.z)<7){returned=true;break;}}
     if(!returned)throw Error('King does not return upstairs to work '+JSON.stringify({phase:s.phase,x:n.x,z:n.z,y:n.homeY,job:__v100Day.jobs.get(n)?.steps,path:s.pathTarget&&[s.pathTarget.x,s.pathTarget.y,s.pathTarget.z],target:s.target&&[s.target.x,s.target.y,s.target.z]}));console.log('DAILY king returned upstairs to work');
    }
    return{id:n.id,meters:Math.round(s.traveled-start),meals:s.mealCount,bed:n.__v101.bed.furniture.id,outings:n.__v101.outings,walkedWhileObserverUpstairs:upstairsMeters>.3};
   })()`);reports.push(result);console.log('PASS real frames: walk, dine at home, sleep in owned bed, wake and go outdoors',result);
  }
  console.log('PASS children play varied outdoor games and neighbors talk to one another',await run(`(()=>{
   const n=_2h.find(n=>n.age==='child'&&n.homeSite===1),s=n.__v100Day;_14.set(n.x+2,n.homeY+1.85,n.z+2);_x=14.1;
   for(let i=0;i<6000&&n.__v101.plays.size<5;i++){__dayFrames(1);if(s.phase==='perform'&&['hopscotch','skipping','tag','ball','hideSeek'].includes(s.action)&&!__v101Outdoors(n))throw Error('Outdoor child game played in a bedroom');}
   if(n.__v101.plays.size<5)throw Error('Child has no varied outdoor games '+n.id+' '+s.phase+' '+s.action+' '+[...n.__v101.plays]);
   _x=15.1;let chats=0;for(let i=0;i<3500;i++){__dayFrames(1);chats=__v88Life.active.reduce((total,o)=>total+(o.__v101?.conversations||0),0);if(chats)break;}
   if(!chats)throw Error('Neighbors never meet and talk outside');return{child:n.id,games:[...n.__v101.plays],conversations:chats};})()`));
  console.log('PASS outdoor quest giver walks without performing meals or sleep on the street',await run(`(()=>{
   const n=_2h.find(n=>n.id==='sidequest92-polar95'),s=n.__v100Day;_14.set(n.x+2,n.homeY+1.85,n.z+2);_x=11.1;const before=s.traveled;for(let i=0;i<500;i++){__dayFrames(1);if(s.phase==='perform'&&['sleep','eat'].includes(s.action)&&!__v101ValidStation(n,s))throw Error('Invalid outdoor meal/sleep');}
   if(s.traveled-before<.5)throw Error('Outdoor mission NPC is frozen');return{meters:s.traveled-before};})()`));
  console.log('PASS all nearby activities and reservations remain valid; castle services still open',await run(`(()=>{
   if(__AURELIA_LIFE101__.audit().invalidActivities.length)throw Error('Invalid furniture activity');for(const[id,n]of __v100Day.seats){const s=n.__v100Day;if(s.seat?.id!==id&&s.bed?.id!==id)throw Error('Stale furniture reservation');}
   for(const role of['merchant','sorcerer','innkeeper']){const n=_2h.find(n=>n.castleService===role),old={x:n.x,z:n.z};if(!__v54OpenCastleService(n)||$('rpg-panel').hidden||!$('item-list').children.length)throw Error('Service stopped '+role);if(Math.hypot(n.x-old.x,n.z-old.z)>.01)throw Error('Service teleports NPC');$('rpg-panel').hidden=true;}
   _iv();if(!JSON.parse(__v96ReadSave()).campaign)throw Error('Furniture changes broke saving');return{services:3,validActivities:true};})()`));
  assert.deepEqual(errors,[]);console.log('PASS no browser exceptions during the actual daily frame loop');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e.stack);process.exitCode=1});
