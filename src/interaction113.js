/* Native touch scrolling for every shared NPC panel, without replacing its callbacks. */
if(__v60Mobile){
 const style=document.createElement('style');style.id='aurelia-dialogues113';style.textContent=`
 html[data-aurelia-device="mobile"] #aurelia-game :is(.dialogue,.rpg-panel){position:absolute!important;inset:max(8px,env(safe-area-inset-top)) max(8px,env(safe-area-inset-right)) max(8px,env(safe-area-inset-bottom)) max(8px,env(safe-area-inset-left))!important;width:auto!important;height:auto!important;max-width:none!important;max-height:none!important;min-height:0!important;transform:none!important;display:block;overflow-y:auto!important;overflow-x:hidden!important;touch-action:pan-y!important;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:16px!important;z-index:1250!important;overflow-wrap:anywhere}
 html[data-aurelia-device="mobile"] #aurelia-game :is(.dialogue,.rpg-panel,#ag-v75-card) button{min-height:48px!important;max-width:100%;white-space:normal;flex-shrink:0;touch-action:manipulation!important}
 html[data-aurelia-device="mobile"] #aurelia-game .dialogue>div{display:flex;flex-wrap:wrap;gap:8px}
 html[data-aurelia-device="mobile"] #aurelia-game .rpg-panel header{position:sticky;top:-16px;z-index:2;background:#142d37;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 0}
 html[data-aurelia-device="mobile"] #aurelia-game #ag-panel-tabs{flex-wrap:wrap}
 html[data-aurelia-device="mobile"] #aurelia-game .rpg-panel .item-list{overflow:visible!important;flex:none;min-height:0;touch-action:pan-y!important}
 html[data-aurelia-device="mobile"] #aurelia-game #ag-v75-modal{inset:0!important;padding:max(8px,env(safe-area-inset-top)) max(8px,env(safe-area-inset-right)) max(8px,env(safe-area-inset-bottom)) max(8px,env(safe-area-inset-left))!important;min-height:0;grid-template-rows:minmax(0,1fr);z-index:1300;touch-action:pan-y}
 html[data-aurelia-device="mobile"] #aurelia-game #ag-v75-card{max-height:100%!important;min-height:0;overflow-y:auto!important;overflow-x:hidden;touch-action:pan-y!important;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;overflow-wrap:anywhere;padding:14px!important}
 html[data-aurelia-device="mobile"] #aurelia-game #ag-v75-close{background:#17313e;top:0;min-width:90px;float:none!important;display:block;margin-left:auto}
 @media(orientation:portrait){html[data-aurelia-device="mobile"] #aurelia-game .rpg-panel .item-list{grid-template-columns:minmax(0,1fr)}}
 `;document.head.append(style);
 const panels=[$('dialogue'),$('rpg-panel'),__v75Modal],scrollers=[$('dialogue'),$('rpg-panel'),$('v75-card')];
 const reset=()=>{__v64EndLook();__v65ReleaseJoy();__v75Release();};
 // Opening a conversation must also release a finger previously held on the camera or stick.
 const observer=new MutationObserver(records=>{for(const record of records){const i=panels.indexOf(record.target);if(i>=0&&!panels[i].hidden){reset();scrollers[i].scrollTop=0;}}});
 for(const panel of panels)observer.observe(panel,{attributes:true,attributeFilter:['hidden']});
 const open=__v75Open;__v75Open=function(...args){reset();const body=open(...args);$('v75-card').scrollTop=0;return body;};
}
