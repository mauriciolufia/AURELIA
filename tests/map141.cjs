/* Exercise the full map renderer and its live-frame callers, including every tower floor. */
const {chromium}=require('playwright'),fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const root=path.resolve(__dirname,'..'),mobile=process.argv.includes('--mobile'),live=process.argv.includes('--live'),errors=[];
 const hook=live?'':`const __raf141=requestAnimationFrame;_5.render=()=>{};window.requestAnimationFrame=cb=>cb===frame?0:__raf141(cb);__v122Prepare=async()=>{clearTimeout(__v122Timer);__v121Boot.phase='playing';__v121Entry.hidden=true;};`;
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8').replace('const _ix=_7q();',hook+`window.__test141=s=>eval(s);const _ix=_7q();`);
 const server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html; charset=utf-8');r.end(html);});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{
  browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--js-flags=--max-old-space-size=4096']});
  const page=await browser.newPage(mobile?{viewport:{width:844,height:390},isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/142.0.0.0 Mobile Safari/537.36'}:{viewport:{width:1280,height:720}});
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')console.error(m.text().slice(0,1200));});
  await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded',timeout:180000});
  await page.waitForFunction(()=>window.__AURELIA_BOOT121__&&['ready','failed'].includes(window.__AURELIA_BOOT121__.audit().phase),null,{timeout:240000});
  assert.equal(await page.locator('#ag-error').isVisible(),false,await page.locator('#ag-error').textContent());
  const run=s=>page.evaluate(s=>window.__test141(s),s);
  if(live){
   // Continue an existing tower save through the normal save loader and real GPU entry.
   await run(`(()=>{const a=__v139.areas[6];_14.set(a.entry.x,a.y+1.85,a.entry.z);__v88MapTimers().cartografia=900;__v88MapTimers().tesoro_guia=900;_u=true;_iv();_u=false;const raw=localStorage.getItem('aurelia-rpg-v15');if(!raw)throw Error('Save not written');window.__save141=raw;})()`);
   await page.reload({waitUntil:'domcontentloaded',timeout:180000});
   await page.waitForFunction(()=>window.__AURELIA_BOOT121__&&['ready','failed'].includes(window.__AURELIA_BOOT121__.audit().phase),null,{timeout:240000});
   assert.equal(await page.locator('#ag-start').textContent(),'Continuar aventura');
   assert.equal(await run(`__v75At()?.key`),'aurora139-6');
  }
  await page.locator('#ag-start').click();
  if(live){
   await page.waitForFunction(()=>{const b=window.__AURELIA_BOOT121__.audit();return b.frames>=3||b.phase==='failed-entry';},null,{timeout:120000});
   const boot=await page.evaluate(()=>window.__AURELIA_BOOT121__.audit());assert.equal(boot.phase,'playing',JSON.stringify(boot));assert.equal(boot.error,null);
   console.log('PASS real GPU entry after restoring a tower save',JSON.stringify({frames:boot.frames,player:boot.player}));
  }
  await run(`active=false;_v=false;__v59ManualPause=false;for(const id of['quick-menu','settings','atlas','dialogue','rpg-panel'])$(id).hidden=true;`);
  if(process.argv.includes('--circuit'))for(const[name,code]of require('./circuit141-cases.cjs'))console.log('PASS '+name,JSON.stringify(await run(code)));
  const floors=await run(`(()=>{const canvas=document.createElement('canvas');canvas.width=760;canvas.height=650;const c=canvas.getContext('2d'),results=[];for(const a of __v139.areas){_14.set(a.entry.x,a.y+1.85,a.entry.z);__v76WorldOverride=false;__v88MapTimers().cartografia=__v88MapTimers().tesoro_guia=900;__v83DrawPlan(c,760,650,a,false);__v83DrawPlan(c,760,650,a,true);_fm(true);_fo();__v87MiniDraw();if(!a.mapTransform||!Number.isFinite(a.mapTransform.scale))throw Error('Missing map transform '+a.key);const pixels=c.getImageData(0,0,760,650).data;let ink=0;for(let i=0;i<pixels.length;i+=4)if(pixels[i]>80)ink++;if(ink<100)throw Error('Empty floor map '+a.key);__v76WorldOverride=true;_fo();_fm(false);results.push(a.key);}return results;})()`);
  assert.equal(floors.length,10);console.log('PASS local/world maps and minimaps on all ten tower floors',JSON.stringify(floors));
  const areas=await run(`(()=>{const c=document.createElement('canvas').getContext('2d');c.canvas.width=760;c.canvas.height=650;for(const a of __v83.areas){_14.set(a.entry.x,a.y+1.85,a.entry.z);for(const markers of[false,true])__v83DrawPlan(c,760,650,a,markers);}return __v83.areas.length;})()`);
  console.log('PASS all fortress and cave plans render with and without markers',areas);
  await run(`(()=>{const a=__v139.areas[6];_14.set(a.entry.x,a.y+1.85,a.entry.z);__v76WorldOverride=false;_y=false;__v114PerfReset();_fm(true);active=true;${live?'':`for(let i=0;i<8;i++)frame(performance.now()+i*40);active=false;`}if(__v121Boot.error)throw Error(__v121Boot.error);})()`);
  if(live){const before=await run(`__v121Boot.frames`);await page.waitForFunction(n=>{const b=window.__AURELIA_BOOT121__.audit();return b.frames>=n+5||b.phase==='failed-entry';},before,{timeout:60000});}
  assert.equal(await run(`__v121Boot.phase`),'playing');assert.equal(await run(`__v121Boot.error`),null);
  await page.screenshot({path:'/tmp/aurelia-map141-'+(mobile?'mobile':'pc')+(live?'-live':'')+'.png'});
  await run(`_fm(false);`);
  assert.equal(await page.locator('#ag-atlas').isVisible(),false);assert.deepEqual(errors,[]);
  console.log('PASS opening and closing tower map preserves the running game',mobile?'mobile':'PC',live?'real GPU and restored save':'simulation');
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
