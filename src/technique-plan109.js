/* Deterministic species repertoires. This module also runs without the renderer for audit tests. */
const __v109Techniques=(()=>{
 const color={physical:'#d8bd96',earth:'#c5a17c',nature:'#9bc969',ice:'#9ee8ff',fire:'#ff9253',shadow:'#bd8aec',storm:'#f4df7b',water:'#65d2df',wind:'#c7e8d5'};
 const art=(id,name,type,element='physical',status=null,extra={})=>({id,name,type,element,status,...extra});
 const hit=(id,name,element='physical',status=null)=>art(id,name,'charge',element,status);
 const shot=(id,name,element,status=null,extra={})=>art(id,name,'projectile',element,status,extra);
 const ring=(id,name,element='physical',status=null)=>art(id,name,'ring',element,status);
 const pool=(id,name,element,status=null)=>art(id,name,'pool',element,status);
 const guard=(id,name)=>art(id,name,'guard');
 const rage=(id,name)=>art(id,name,'buff');
 const shield=(id,name)=>art(id,name,'buffDefense');
 const heal=(id,name)=>art(id,name,'heal','nature');
 const profiles={
  slime:[pool('acid','Saliva corrosiva','nature'),guard('elastic','Cuerpo elástico'),hit('slimehop','Salto gelatinoso','nature')],
  boar:[hit('tusks','Carga de colmillos'),guard('brace','Apoyo de pezuñas'),rage('boarfury','Furia del jabalí')],
  wolf:[hit('fangs','Salto y mordida'),guard('packguard','Aullido de caza'),rage('hunt','Instinto de la manada')],
  bear:[hit('claws','Zarpazo poderoso'),rage('bearfury','Furia del oso'),ring('maul','Golpe de garras')],
  feline:[hit('pounce','Salto del depredador'),guard('stalk','Acecho evasivo'),rage('predator','Instinto depredador')],
  crocodile:[hit('jaws','Mordida de presión'),guard('scales','Escamas protectoras'),ring('tail','Barrido de cola')],
  snake:[shot('venomspit','Escupir veneno','nature','poison'),hit('venombite','Mordida venenosa','nature','poison'),guard('coil','Defensa enroscada')],
  scorpion:[hit('sting','Aguijón tóxico','nature','poison'),guard('shell','Caparazón quitinoso'),shot('venomspine','Púa venenosa','nature','poison')],
  spider:[hit('spiderbite','Mordida venenosa','nature','poison'),pool('web','Telaraña pegajosa','nature','slow'),guard('crawl','Paso evasivo')],
  orc:[hit('axe','Carga del saqueador'),rage('battlecry','Grito de batalla'),ring('cleave','Barrido de hacha')],
  commander:[hit('generalaxe','Hachazo del comandante'),art('rally','Grito del comandante','buffAllies'),guard('commandguard','Guardia del comandante')],
  minotaur:[hit('horns','Embestida del laberinto'),rage('labyrinthfury','Furia del laberinto'),ring('hornsweep','Barrido de cuernos')],
  cyclops:[ring('club','Mazazo del cíclope'),guard('cyclopsguard','Guardia del cíclope'),shot('boulder','Lanzamiento de peñasco','earth')],
  medusa:[art('petrify','Mirada petrificante','gaze','nature','slow'),shot('serpentvenom','Veneno de las serpientes','nature','poison'),guard('serpentguard','Guardia de serpientes')],
  basilisk:[pool('toxicbreath','Aliento del basilisco','nature','poison'),hit('basiliskbite','Mordida del basilisco','nature'),art('basiliskgaze','Mirada paralizante','gaze','nature','slow')],
  skeleton:[shot('bone','Lanza de hueso','physical'),guard('boneguard','Guardia de huesos'),hit('bonesword','Tajo de hueso')],
  knight:[hit('sword','Estocada del guardián'),guard('steelguard','Guardia del escudo'),ring('bladesweep','Barrido de espada')],
  spiked:[hit('spikedcharge','Embestida de púas'),guard('spikedguard','Guardia de púas'),ring('spikedsweep','Barrido de púas')],
  lizard:[hit('scaleblade','Estocada de escamas'),guard('scaleguard','Escudo de escamas'),ring('lizardtail','Barrido de cola')],
  stone:[ring('stonefist','Ruptura de piedra','earth'),shot('stonethrow','Fragmento de roca','earth'),shield('stonearmor','Armadura pétrea')],
  magma:[ring('magmafist','Golpe de magma','earth'),pool('eruption','Erupción de lava','fire','burn'),shot('magmaorb','Roca incandescente','fire','burn')],
  salamander:[shot('embers','Aliento de brasas','fire','burn'),hit('hotbite','Mordida incandescente','fire'),pool('emberscar','Rastro de brasas','fire','burn')],
  firebat:[hit('burningdive','Picado de brasa','fire'),ring('hotwings','Batir de alas ardientes','fire','burn'),guard('batescape','Vuelo evasivo')],
  beetle:[hit('basaltcharge','Embestida de basalto','earth'),shield('basaltshell','Caparazón de basalto'),ring('basaltmandible','Golpe de mandíbulas','earth')],
  obsidian:[hit('obsidianfist','Puño de obsidiana','earth'),shield('obsidianarmor','Coraza de obsidiana'),ring('obsidianquake','Fractura de obsidiana','earth','stun')],
  magmascorpion:[hit('moltensting','Aguijón de magma','fire','burn'),guard('hardshell','Caparazón volcánico'),shot('moltenspit','Veneno incandescente','nature','poison')],
  ashMage:[shot('ashfire','Orbe de ceniza','fire','burn'),art('ashbarrier','Barrera de ceniza','buffBarrier','fire'),pool('ashrain','Lluvia de brasas','fire','burn')],
  igneousBoss:[ring('calderaquake','Pisotón de la Caldera','earth','stun'),shot('calderaorb','Corazón incandescente','fire','burn'),pool('calderarift','Fisura de lava','fire','burn')],
  iceBear:[hit('iceclaw','Zarpazo polar'),ring('frostrour','Rugido de escarcha','ice','slow'),rage('icefury','Furia polar')],
  iceGiant:[ring('icestomp','Pisotón glacial','ice','slow'),shot('iceboulder','Peñasco de hielo','ice','slow'),rage('giantfury','Furia del gigante')],
  iceWolf:[hit('aurorafangs','Colmillos de aurora','ice'),ring('aurorahowl','Aullido boreal','ice','slow'),guard('auroraguard','Instinto de la manada')],
  iceKnight:[hit('iceblade','Estocada de escarcha','ice'),guard('iceguard','Escudo de cristal'),ring('icesweep','Barrido de escarcha','ice','slow')],
  iceEye:[shot('icebeam','Rayo de cristal','ice','slow'),art('icebarrier','Barrera boreal','buffBarrier','ice'),ring('crystalpulse','Pulso de cristal','ice','slow')],
  yeti:[ring('avalanche','Alud de escarcha','ice','slow'),hit('yeticharge','Embestida del yeti'),rage('yetifury','Furia de la cumbre')],
  winterKing:[shot('royalice','Lanza del invierno','ice','slow'),ring('royalblizzard','Ventisca real','ice','slow'),art('winterbarrier','Coraza del invierno','buffBarrier','ice')],
  candyKnight:[hit('licorice','Látigo de regaliz'),guard('licoriceguard','Guardia de regaliz'),ring('licoricesweep','Barrido de regaliz')],
  candyWasp:[shot('sugarsting','Aguijón de azúcar','nature','slow'),hit('sugardive','Picado de la avispa'),guard('waspevasion','Aleteo evasivo')],
  mallow:[pool('meringue','Merengue pegajoso','nature','slow'),heal('mallowheal','Recomposición de malvavisco'),hit('mallowcharge','Embestida de bombón')],
  chocolate:[ring('cocoaquake','Golpe de cacao','earth'),pool('cocoapool','Chocolate pegajoso','nature','slow'),shield('cocoaarmor','Coraza de cacao')],
  candyKing:[shot('lollipop','Piruleta encantada','nature'),pool('royalcaramel','Caramelo real pegajoso','nature','slow'),ring('confetti','Corona de confites','nature')],
  mummy:[pool('tombbreath','Aliento de la tumba','shadow','poison'),guard('wrappings','Vendajes protectores'),shot('tombcurse','Maldición de la tumba','shadow','dizzy')],
  pharaoh:[shot('solarlance','Lanza solar','fire','burn'),art('royalmend','Restauración del séquito','healAllies','shadow'),art('solarcurse','Maldición del Sol Eterno','gaze','shadow','slow')],
  sphinx:[art('sphinxgaze','Rugido hipnótico','gaze','shadow','sleep'),shot('sandblast','Ráfaga de arena','earth'),guard('sphinxguard','Guardia de la esfinge')],
  pirate:[hit('cutlass','Tajo de abordaje'),guard('pirateguard','Guardia corsaria'),ring('decksweep','Barrido de cubierta')],
  gunner:[shot('flintlock','Disparo de pedernal','physical'),guard('gunnercover','Cobertura del pistolero'),hit('pistolswing','Golpe de culata')],
  boatswain:[ring('deckblow','Golpe de cubierta'),guard('deckguard','Guardia de abordaje'),hit('boardingcharge','Carga del contramaestre')],
  captain:[hit('blackbeard','Estocada de Barbanegra'),art('captaincry','Grito del capitán','buffAllies'),shot('captainshot','Disparo del capitán','physical')],
  shark:[hit('sharkbite','Mordida de arrecife'),guard('sharkturn','Giro evasivo'),rage('sharkfrenzy','Frenesí del tiburón')],
  seaSerpent:[hit('seafangs','Colmillos del abismo'),shot('seapulse','Pulso de marea','water','slow'),ring('seatail','Barrido de la serpiente','water')],
  jellyfish:[ring('tentacles','Descarga de tentáculos','storm','stun'),shot('stormorb','Esfera de tormenta','storm','stun'),guard('jellyfloat','Deriva protectora')],
  demon:[shot('hellfire','Orbe infernal','fire','burn'),rage('demonicfury','Furia demoníaca'),ring('hellpulse','Pulso infernal','fire','burn')],
  winged:[shot('abysslance','Lanza del abismo','shadow','dizzy'),pool('hellrift','Grieta infernal','fire','burn'),guard('wingguard','Guardia alada')],
  archdevil:[shot('voidlance','Lanzas del vacío','shadow','dizzy'),pool('damnation','Grieta de condena','fire','burn'),ring('cataclysm','Corona del cataclismo','shadow','slow')],
  abyssKnight:[hit('abyssblade','Tajo del Abismo','shadow'),shield('abyssarmor','Armadura del Abismo'),ring('abysssweep','Barrido de condena','shadow','slow')],
  reaper:[hit('reaperscythe','Siega del vacío','shadow'),art('spectrallament','Lamento espectral','gaze','shadow','sleep'),pool('voidrift','Grieta del vacío','shadow','slow')],
  abyssEye:[shot('eyelaser','Láser del Ojo Espinoso','shadow','dizzy',{custom92:'eye'}),art('eyebarrier','Barrera del ojo','buffBarrier','shadow'),ring('eyepulse','Pulso de espinas','shadow','slow')],
  spinedBeast:[hit('spinecharge','Embestida de espinas','physical','stun'),rage('spinefury','Furia de espinas'),ring('spinerake','Barrido de espinas')],
  devourer:[shot('furnace','Aliento de horno','fire','burn',{custom92:'flame'}),ring('furnacepulse','Pulso del horno','fire','burn'),rage('furnacefury','Furia del horno')],
  dragon:[shot('dragonbreath','Aliento del dragón','fire','burn'),hit('dragondive','Picado del dragón'),ring('dragonwings','Vendaval de alas','wind','slow')],
  chimera:[hit('chimeradive','Picado de la quimera'),shot('chimerafire','Aliento de la quimera','fire','burn'),ring('chimerawings','Vendaval de la quimera','wind','slow')],
  animal:[hit('defensivehit','Embestida defensiva'),guard('animalguard','Evasión defensiva'),ring('defensivesweep','Barrido defensivo')]
 };
 function family(c){const id=String(c.id||'').toLowerCase(),spawn=String(c.spawnId||'');
  if(c.role)return c.role;
  if(c.spiked)return 'spiked';if(spawn.startsWith('yeti95-'))return'yeti';if(spawn.startsWith('polar95-'))return'iceKnight';if(spawn==='corsair95-key-guard')return'pirate';
  if(id.startsWith('volcano103-'))return['beetle','firebat','salamander','obsidian','igneousBoss','magmascorpion','ashMage'][Number(id.split('-')[1])];
  if(id==='slime')return'slime';if(id==='boar')return'boar';if(id==='ice94_wolf')return'iceWolf';if(id==='ice94_eye')return'iceEye';if(id==='ice94_knight')return'iceKnight';if(id==='ice94_golem')return'iceGiant';
  if(/polar|yeti/.test(id))return'iceBear';if(/wolf/.test(id))return'wolf';if(id==='bear')return'bear';if(/panther|lion/.test(id))return'feline';if(/crocodile/.test(id))return'crocodile';
  if(/scorpion/.test(id))return'scorpion';if(/snake|obsidian_serpent/.test(id))return'snake';if(/spider/.test(id))return'spider';if(/lizard/.test(id))return'lizard';
  if(/pharaoh/.test(id))return'pharaoh';if(/sphinx/.test(id))return'sphinx';if(/medusa/.test(id))return'medusa';if(/basilisk/.test(id))return'basilisk';if(/minotaur/.test(id))return'minotaur';if(/cyclops/.test(id))return'cyclops';
  if(/ice.?troll|giant/.test(id))return'iceGiant';if(/orcgeneral/.test(id))return'commander';if(/orc/.test(id))return'orc';
  if(id==='pirate102-1')return'gunner';if(id==='pirate102-2')return'boatswain';if(/captain/.test(id))return'captain';if(/pirate/.test(id))return'pirate';
  if(/candy94_knight|licorice/.test(id))return'candyKnight';if(/candy94_wasp|sugarwasp/.test(id))return'candyWasp';if(/candy94_beast|mallow/.test(id))return'mallow';if(/candy94_golem|choco/.test(id))return'chocolate';
  if(/magma/.test(id)||id==='golem'&&c.biome==='volcano')return'magma';if(/golem|stone_guardian/.test(id))return'stone';if(/salamander/.test(id))return'salamander';
  if(id==='ojo_espinoso')return'abyssEye';if(id==='bestia_morbida')return'spinedBeast';if(id==='devorador_igneo')return'devourer';if(id==='abyss_knight')return'abyssKnight';if(id==='void_reaper')return'reaper';if(/archdevil/.test(id))return'archdevil';if(/wingeddemon/.test(id))return'winged';if(/demon/.test(id))return'demon';
  if(/armoredskeleton/.test(id))return'knight';if(/skeleton/.test(id))return'skeleton';if(/mummy/.test(id))return'mummy';if(/shark/.test(id))return'shark';if(/seaserpent/.test(id))return'seaSerpent';if(/jellyfish/.test(id))return'jellyfish';if(/chimera/.test(id))return'chimera';if(/drake|dragon/.test(id))return'dragon';
  if(/deer|fox|rabbit|penguin|turtle|crab|snail/.test(id))return'animal';return'knight';
 }
 function build(c){
  const level=Math.max(1,Math.min(60,Math.round(c.level||1))),t=(level-1)/59,f=family(c),count=level<=40?2:3;
  if(f==='emperor')return{family:f,level,skills:[{id:'imperialenergy',name:'Tríada de energía imperial',type:'projectile',element:'shadow',range:46,radius:1.1,windup:.85,power:1.5,color:color.shadow},{id:'imperialdarkness',name:'Onda de oscuridad',type:'pool',element:'shadow',range:32,radius:32,windup:1.1,power:1.1,status:'slow',color:color.shadow},{id:'imperialpulse',name:'Pulso sísmico imperial',type:'ring',element:'earth',range:12,radius:12,windup:1.1,power:1.5,status:'stun',color:color.earth}]};
  if(f==='raid')return{family:f,level,skills:[{id:'raidclaw',name:'Zarpazo infernal',type:'charge',element:'physical',range:4,radius:3.8,windup:1.9,power:1,color:'#ef9f70'},{id:'raidfire',name:'Escupitajo infernal',type:'projectile',element:'fire',range:28,radius:1.4,windup:1.65,power:.85,status:'burn',color:color.fire},{id:'raidpulse',name:'Onda de garras',type:'ring',element:'earth',range:5,radius:5,windup:1.9,power:.9,status:'stun',color:'#ef9f70'}].slice(0,count)};
  const skills=(profiles[f]||profiles.knight).slice(0,count).map((s,i)=>{
   const a={...s,color:color[s.element]||color.physical,windup:Math.round((1.65-.3*t+(s.type==='pool'?.2:0))*100)/100,power:/^heal|^buff|^guard/.test(s.type)?0:Math.round((.65+.4*t)*(i===2?1.08:1)*100)/100};
   if(a.type==='projectile'){a.range=10+16*t;a.radius=.65+.55*t;}
   else if(a.type==='charge'){a.range=5+7*t;a.radius=1.05+1.15*t;}
   else if(a.type==='gaze'){a.range=7+12*t;a.radius=2+3*t;}
   else if(a.type==='ring'){a.range=a.radius=2+3.5*t;}
   else if(a.type==='pool'){a.range=7+13*t;a.radius=1.3+2.2*t;}
   else{a.range=8+10*t;a.radius=3+4*t;}
   if(a.status==='poison'&&level<8)a.status=null;
   if(a.status==='burn'&&level<10)a.status=null;
   if(a.status==='stun'&&level<20)a.status=a.element==='storm'?'slow':null;
   if(a.status==='sleep'&&level<25)a.status='slow';
   if(a.status==='dizzy'&&level<15)a.status=null;
   return a;
  });
  if(c.boss){const offensive=skills.filter(a=>a.power>0),strongest=offensive.reduce((best,a)=>!best||a.power>best.power?a:best,null);if(strongest)strongest.power=1.5;}
  return{family:f,level,skills};
 }
 return{family,build,profiles};
})();
if(typeof module!=='undefined'&&module.exports)module.exports=__v109Techniques;
