/* Species roles are deterministic; level curves remain the source of base attributes. */
const __v137Roles=(()=>{
 const roles={
  assault:{name:'Asalto',hp:.78,def:.75,atk:1.12,speed:1.2,cadence:1.12},
  tank:{name:'Tanque',hp:1.65,def:1.6,atk:.72,speed:.76,cadence:.88},
  ranged:{name:'Tirador',hp:.65,def:.7,atk:.95,speed:1.05,cadence:1},
  mage:{name:'Mago elemental',hp:.72,def:.65,atk:1.05,speed:.95,cadence:1},
  afflicter:{name:'Especialista en estados',hp:.82,def:.8,atk:.88,speed:1,cadence:1},
  balanced:{name:'Equilibrado',hp:1,def:1,atk:1,speed:1,cadence:1}
 };
 const families={
  assault:'boar wolf feline iceWolf firebat orc minotaur pirate captain shark spinedBeast chimera raid',
  tank:'bear crocodile commander cyclops knight spiked lizard stone beetle obsidian iceBear iceGiant iceKnight yeti candyKnight chocolate boatswain abyssKnight',
  ranged:'skeleton gunner candyWasp',
  mage:'magma salamander ashMage igneousBoss iceEye winterKing candyKing demon winged archdevil abyssEye devourer dragon emperor',
  afflicter:'snake scorpion spider medusa basilisk magmascorpion mummy pharaoh sphinx seaSerpent jellyfish reaper mallow',
  balanced:'slime animal'
 };
 const byFamily=new Map(Object.entries(families).flatMap(([role,list])=>list.split(' ').map(f=>[f,role])));
 const statusLevels={burn:5,sleep:5,freeze:10,poison:20,confusion:30,stone:40,stun:20,slow:1,dizzy:15};
 const status=(kind,level)=>level>=(statusLevels[kind]??Infinity)?kind:null;
 return{roles,families,role:family=>byFamily.get(family)||'balanced',status,statusLevels};
})();
if(typeof module!=='undefined'&&module.exports)module.exports=__v137Roles;
