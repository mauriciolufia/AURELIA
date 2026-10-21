/* Drive the same frame callback used by the shipped game. No NPC tick, clock or routine is invoked directly. */
const {chromium}=require('playwright');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const html=fs.readFileSync(path.resolve(__dirname,'../index.html'),'utf8').replace('const _ix=_7q();',`
 const __dayRender=_5.render.bind(_5),__dayRAF=requestAnimationFrame;
 _5.render=()=>{};window.requestAnimationFrame=callback=>callback===frame?0:__dayRAF(callback);
 window.__dayTest=source=>eval(source);let __dayNow=performance.now();
 const __dayFrames=count=>{active=true;for(let i=0;i<count;i++)frame(__dayNow+=40);active=false;};
 const _ix=_7q();`);
 const server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(html);});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
  const mobile=process.argv.includes('--mobile'),page=await browser.newPage(mobile?{viewport:{width:844,height:390},isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/142.0.0.0 Mobile Safari/537.36'}:{viewport:{width:960,height:540}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.goto(`http://127.0.0.1:${server.address().port}/`,{waitUntil:'domcontentloaded',timeout:180000});await page.waitForFunction(()=>window.__dayTest&&!document.getElementById('ag-start').disabled,null,{timeout:240000});
  const run=s=>page.evaluate(s=>window.__dayTest(s),s);await page.click('#ag-start');await page.evaluate(()=>document.getElementById('ag-v85-demo').click());await run(`active=false;_v=true;`);
  console.log('PASS daily catalog has 15 activities and captures real furniture',await run(`(()=>{const a=__AURELIA_DAY100__.audit();if(a.routines.length!==15||new Set(a.routines.map(r=>r.id)).size!==15||!__v100Day.furniture.some(p=>p.type==='seat'))throw Error('Missing daily activities/furniture');const blocked=_2h.filter(n=>n.__v99Area&&!__v100Free(n,n.x,n.z));if(blocked.length)throw Error('NPC starts inside furniture '+blocked.map(n=>n.id));return{mobile:__v60Mobile,npcs:a.indoorNPCs,furniture:__v100Day.furniture.length};})()`));
  for(const id of['ines','citizen-1-2','citizen-1-3','v78-noct-merchant','sidequest92-polar95','court-2-2']){
   console.log('PASS actual frames move indoor/service NPC '+id,await run(`(()=>{
    const n=_2h.find(n=>n.id===${JSON.stringify(id)}),s=n.__v100Day,old={x:n.x,z:n.z},traveled=s.traveled,fresh=s.serial===0;_14.set(n.x+2,n.homeY+1.85,n.z+2);_x=9;
    __dayFrames(55);if(!fresh&&s.traveled-traveled<.45)__dayFrames(150);n.g.updateWorldMatrix(true,true);const world=n.g.getWorldPosition(new _0.Vector3());
    if(s.traveled-traveled<.45||Math.hypot(n.x-old.x,n.z-old.z)<.3)throw Error('NPC remains a statue in real frames '+n.id+' '+JSON.stringify({traveled:s.traveled-traveled,phase:s.phase,action:s.action,near:__v88Life.active.includes(n),player:_14.toArray()}));
    if(Math.hypot(world.x-n.x,world.z-n.z)>.01||!n.g.parent||!n.g.visible)throw Error('NPC model does not follow its simulation '+n.id);
    const seen=new Set();let seated=false,ate=false;for(let i=0;i<1500;i++){__dayFrames(1);seen.add(s.action);if(!__v100Free(n,n.x,n.z))throw Error('NPC left its house, floor or crossed furniture '+n.id);if(s.phase==='perform'&&['sit','eat','read','sleep'].includes(s.action)){seated=true;if(!n.__v100Props.legs.visible||n.legs.some(l=>l.visible))throw Error('Missing seated pose '+n.id);}if(s.phase==='perform'&&s.action==='eat'){ate=true;if(!n.__v100Props.food.visible||!n.__v100Props.mealArms.visible||n.arms.some(a=>a.visible))throw Error('No visible animated meal '+n.id);}}
    if(s.traveled-traveled<3||seen.size<3)throw Error('Daily routine does not progress '+n.id+' '+[...seen]);return{meters:Number((s.traveled-traveled).toFixed(2)),activities:[...seen],seated,ate,roomFurniture:__v100Room(n).items.length};
   })()`));
  }
  console.log('PASS NPC keeps walking when the observer moves to an upper floor',await run(`(()=>{
   const n=_2h.find(n=>n.id==='ines'),s=n.__v100Day,before=s.traveled;_14.set(n.x+2,n.homeY+13.85,n.z+2);const height=_14.y;
   for(let i=0;i<250;i++){__dayFrames(1);if(!__v100Free(n,n.x,n.z))throw Error('Observer height blocked the NPC floor');}
   if(s.traveled-before<.4||Math.abs(_14.y-height)>.01)throw Error('NPC freezes on another floor or floor query moves the observer');return{meters:s.traveled-before,observerHeightAboveNPC:_14.y-n.homeY};
  })()`));
  console.log('PASS full real-frame day reaches all 15 routines and seated meals',await run(`(()=>{
   const n=_2h.find(n=>n.id==='ines'),s=n.__v100Day;_14.set(n.x+3,n.homeY+1.85,n.z+3);_x=9;const seen=new Set(),performed=new Set();let meal=false,sat=false;
   for(let i=0;i<9500;i++){__dayFrames(1);seen.add(s.action);if(s.phase==='perform'){performed.add(s.action);if(s.action==='eat')meal=n.__v100Props.food.visible;if(s.action==='sit')sat=n.__v100Props.legs.visible;}if(performed.size===15)break;}
   if(performed.size!==15||!meal||!sat||!s.mealCount)throw Error('Incomplete real daily life '+JSON.stringify({performed:[...performed],seen:[...seen],meal,sat,meals:s.mealCount,phase:s.phase,job:__v100Day.jobs.has(n)}));return{performed:[...performed],meals:s.mealCount,traveled:Number(s.traveled.toFixed(2))};
  })()`));
  console.log('PASS seats are exclusively reserved and interior services still open',await run(`(()=>{
   const occupied=new Set();for(const[id,n]of __v100Day.seats){if(occupied.has(id)||n.__v100Day.seat?.id!==id)throw Error('Duplicate/stale seat reservation');occupied.add(id);}
   for(const role of['merchant','sorcerer','innkeeper']){const n=_2h.find(n=>n.castleService===role),before={x:n.x,z:n.z};if(!__v54OpenCastleService(n)||$('rpg-panel').hidden||!$('item-list').children.length)throw Error('Service stopped working '+role);if(Math.hypot(before.x-n.x,before.z-n.z)>.01)throw Error('Service teleports NPC');$('rpg-panel').hidden=true;}
   for(const q of _bp)if(q.giver&&!_2h.some(n=>n.id===q.giver))throw Error('Missing quest giver');return{reservedSeats:occupied.size,services:3};})()`));
  fs.mkdirSync('/tmp/aurelia-day100',{recursive:true});
  await run(`(()=>{const n=_2h.find(n=>n.id==='ines'),s=n.__v100Day;_14.set(n.x+3,n.homeY+1.85,n.z+3);for(let i=0;i<3500;i++){__dayFrames(1);if(s.action==='eat'&&s.phase==='perform')break;}if(s.action!=='eat'||s.phase!=='perform')throw Error('No actual meal available for render');const camera=new _0.PerspectiveCamera(45,960/540,.1,80);let clear=false;for(let i=0;i<72;i++){const a=i%24*Math.PI/12,r=[3.8,3.2,2.6][Math.floor(i/24)],p={x:n.x+Math.cos(a)*r,z:n.z+Math.sin(a)*r};if(!__v100Segment(n,n,p))continue;camera.position.set(p.x,n.homeY+1.9,p.z);clear=true;break;}if(!clear)throw Error('No unobstructed view of seated NPC');camera.lookAt(n.x,n.homeY+1,n.z);_5.setSize(960,540,false);_5.setPixelRatio(1);__dayRender(_6,camera);})()`);
  await page.screenshot({path:`/tmp/aurelia-day100/${mobile?'mobile':'pc'}-meal.png`,timeout:120000});assert.deepEqual(errors,[]);console.log('PASS actual world renders an NPC seated and eating without browser exceptions');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e.stack);process.exitCode=1});
