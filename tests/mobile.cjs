const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
(async()=>{
 const html=fs.readFileSync(path.resolve(__dirname,'../index.html'),'utf8'),errors=[];
 const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html');res.end(html)});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
 const page=await browser.newPage({viewport:{width:844,height:390},isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36'});
 page.on('pageerror',e=>errors.push(e.message));const url=`http://127.0.0.1:${server.address().port}/`;
 await page.route(url,r=>r.fulfill({contentType:'text/html',body:html.replace('const _ix=_7q();',"_5.render=()=>{};window.__testEval=source=>eval(source);const _ix=_7q();")}));
 await page.goto(url,{waitUntil:'domcontentloaded',timeout:180000});
 await page.waitForFunction(()=>window.__testEval&&!document.getElementById('ag-start').disabled,null,{timeout:240000});
 const run=s=>page.evaluate(s=>window.__testEval(s),s);
 assert.equal(await page.evaluate(()=>document.documentElement.dataset.aureliaDevice),'mobile');
 await run('active=false');await page.click('#ag-start');await run('active=false');
 const budget=await run('__AURELIA_MOBILE_PERFORMANCE__()');assert.equal(budget.mobile,true);assert.equal(budget.dynamicShadows,false);
 const yaw=await run('yaw');
 const result=await page.evaluate(()=>{const zone=document.getElementById('ag-touch-camera'),box=document.getElementById('aurelia-game').getBoundingClientRect(),x=box.left+box.width*.8,y=box.top+box.height*.45;for(const [type,dx]of[['pointerdown',0],['pointermove',35],['pointerup',35]])zone.dispatchEvent(new PointerEvent(type,{bubbles:true,cancelable:true,pointerId:42,pointerType:'touch',isPrimary:true,clientX:x+dx,clientY:y}));return window.__AURELIA_CONTROLS_STATUS__();});
 assert(Math.abs(result.yaw-yaw)>.05,'Touch look must rotate camera');
 const joystick=await page.evaluate(()=>{const joy=document.querySelector('.joystick'),r=joy.getBoundingClientRect();joy.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,cancelable:true,pointerId:43,pointerType:'touch',isPrimary:true,clientX:r.left+r.width/2+25,clientY:r.top+r.height/2}));const on=__AURELIA_CONTROLS_STATUS__();joy.dispatchEvent(new PointerEvent('pointercancel',{bubbles:true,cancelable:true,pointerId:43,pointerType:'touch',isPrimary:true}));return{on,off:__AURELIA_CONTROLS_STATUS__()};});
 assert(Math.abs(joystick.on.joystick.x)>.1,'Joystick must move');assert.equal(joystick.off.joystick.x,0);assert.equal(joystick.off.joystick.active,false);
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(80);
 assert.deepEqual(errors,[]);assert(await run('Number.isFinite(_7.aspect)&&_7.aspect>0'));
 console.log('PASS Mobile startup, render budget, touch camera, joystick cancellation and orientation change',JSON.stringify(budget));
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e.stack);process.exitCode=1});
