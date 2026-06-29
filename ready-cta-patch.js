(function(){
  function clean(value){return String(value==null?'':value).trim();}
  function currentCustomerName(){
    try{
      if(typeof scenario!=='undefined'&&scenario){
        if(scenario.preApply&&clean(scenario.preApply.name)) return clean(scenario.preApply.name);
        if(clean(scenario.name)) return clean(scenario.name);
      }
    }catch(_){ }
    var preName=document.getElementById('preName');
    if(preName&&clean(preName.value)) return clean(preName.value);
    var customerName=document.getElementById('customerName');
    if(customerName&&clean(customerName.value)) return clean(customerName.value);
    return '';
  }
  function ensureReadyCtaStyle(){
    if(document.getElementById('ready-roadmap-cta-style')) return;
    var style=document.createElement('style');
    style.id='ready-roadmap-cta-style';
    style.textContent='\
#screenReady .save-card.bs-ready-roadmap-cta{\
  display:grid!important;\
  grid-template-columns:minmax(0,1fr) auto!important;\
  gap:24px!important;\
  align-items:center!important;\
  padding:24px 28px!important;\
  background:linear-gradient(135deg,#eaf6f5 0%,#ffffff 62%,#f7fbfb 100%)!important;\
  border:2px solid rgba(8,122,120,.22)!important;\
  border-radius:22px!important;\
  box-shadow:0 16px 34px rgba(12,51,88,.10)!important;\
}\
#screenReady .save-card.bs-ready-roadmap-cta h4{\
  margin:0 0 7px!important;\
  color:#071f3a!important;\
  font-size:22px!important;\
  line-height:1.1!important;\
  font-weight:950!important;\
  letter-spacing:-.035em!important;\
}\
#screenReady .save-card.bs-ready-roadmap-cta p{\
  display:block!important;\
  margin:0!important;\
  max-width:720px!important;\
  color:#334155!important;\
  font-size:15px!important;\
  line-height:1.42!important;\
  font-weight:760!important;\
}\
#screenReady .save-card.bs-ready-roadmap-cta button.bs-ready-roadmap-button{\
  appearance:none!important;\
  border:0!important;\
  border-radius:999px!important;\
  padding:18px 30px!important;\
  min-width:270px!important;\
  background:linear-gradient(180deg,#0a9a93 0%,#087a78 52%,#056261 100%)!important;\
  color:#fff!important;\
  font-size:16px!important;\
  line-height:1!important;\
  font-weight:950!important;\
  letter-spacing:-.01em!important;\
  text-align:center!important;\
  cursor:pointer!important;\
  box-shadow:0 16px 28px rgba(8,122,120,.30),0 5px 0 #045452,inset 0 1px 0 rgba(255,255,255,.34)!important;\
  text-shadow:0 1px 1px rgba(0,0,0,.22)!important;\
  transition:transform .16s ease,box-shadow .16s ease,filter .16s ease!important;\
}\
#screenReady .save-card.bs-ready-roadmap-cta button.bs-ready-roadmap-button:hover{\
  transform:translateY(-2px)!important;\
  filter:saturate(1.04)!important;\
  box-shadow:0 20px 34px rgba(8,122,120,.36),0 6px 0 #045452,inset 0 1px 0 rgba(255,255,255,.38)!important;\
}\
#screenReady .save-card.bs-ready-roadmap-cta button.bs-ready-roadmap-button:active{\
  transform:translateY(3px)!important;\
  box-shadow:0 9px 18px rgba(8,122,120,.24),0 2px 0 #045452,inset 0 1px 0 rgba(255,255,255,.18)!important;\
}\
@media(max-width:760px){\
  #screenReady .save-card.bs-ready-roadmap-cta{\
    grid-template-columns:1fr!important;\
    padding:22px 20px!important;\
    gap:16px!important;\
  }\
  #screenReady .save-card.bs-ready-roadmap-cta h4{font-size:20px!important;}\
  #screenReady .save-card.bs-ready-roadmap-cta button.bs-ready-roadmap-button{width:100%!important;min-width:0!important;}\
}';
    document.head.appendChild(style);
  }
  function selectedAddressKnown(){
    var checked=document.querySelector('input[name="addressKnown"]:checked');
    return checked?clean(checked.value).toLowerCase():'';
  }
  function sanitizeRoadmapAddressBeforeCapture(){
    var addressKnown=selectedAddressKnown();
    if(addressKnown==='yes') return;

    try{
      if(typeof scenario!=='undefined'&&scenario){
        scenario.locationType='area';
        scenario.propertyAddress='';
        if(scenario.preApply){
          scenario.preApply.propertyAddress='';
        }
      }
    }catch(_){ }

    var address=document.getElementById('address');
    var preAddress=document.getElementById('preAddress');
    if(address) address.value='';
    if(preAddress) preAddress.value='';

    try{
      var stored=JSON.parse(localStorage.getItem('BuySoonerRoadmapData')||'null');
      if(stored&&stored.property){
        stored.property.address='';
        localStorage.setItem('BuySoonerRoadmapData',JSON.stringify(stored));
      }
    }catch(_){ }
  }
  function launchRoadmap(event){
    if(event){
      event.preventDefault();
      event.stopPropagation();
      if(event.stopImmediatePropagation) event.stopImmediatePropagation();
    }
    sanitizeRoadmapAddressBeforeCapture();
    if(window.BSRoadmap&&typeof window.BSRoadmap.captureAndOpenRoadmap==='function'){
      window.BSRoadmap.captureAndOpenRoadmap();
      return false;
    }
    alert('Roadmap launcher not loaded. Refresh and try again.');
    return false;
  }
  function decorateButton(button){
    if(!button) return null;
    button.textContent='View My Personalised Roadmap →';
    button.classList.add('bs-ready-roadmap-button');
    return button;
  }
  function patchReadyCtaCopy(){
    ensureReadyCtaStyle();
    var saveCard=document.querySelector('#screenReady .save-card');
    if(!saveCard) return;
    saveCard.classList.add('bs-ready-roadmap-cta');
    var heading=saveCard.querySelector('h4');
    var copy=saveCard.querySelector('p');
    var button=document.getElementById('saveRoadmapButton')||saveCard.querySelector('button');
    var name=currentCustomerName();
    if(heading) heading.textContent='Your personalised Roadmap is ready.';
    if(copy){
      copy.textContent=name
        ? name+', view the full breakdown of your deposit bridge, BuySooner Boost and path to ownership.'
        : 'View the full breakdown of your deposit bridge, BuySooner Boost and path to ownership.';
      copy.style.display='block';
    }
    if(button){
      decorateButton(button);
      if(!button.dataset.readyCtaLaunchPatchBound){
        var clone=button.cloneNode(true);
        clone.dataset.readyCtaLaunchPatchBound='1';
        decorateButton(clone);
        clone.onclick=launchRoadmap;
        clone.addEventListener('click',launchRoadmap,true);
        button.parentNode.replaceChild(clone,button);
      }
    }
  }
  function bindOnce(){
    patchReadyCtaCopy();
    var generateButton=document.getElementById('preGenerateRoadmap');
    if(generateButton&&!generateButton.dataset.readyCtaCopyPatchBound){
      generateButton.dataset.readyCtaCopyPatchBound='1';
      generateButton.addEventListener('click',function(){
        setTimeout(patchReadyCtaCopy,5200);
        setTimeout(patchReadyCtaCopy,6200);
        setTimeout(patchReadyCtaCopy,7200);
      },false);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bindOnce); else bindOnce();
})();