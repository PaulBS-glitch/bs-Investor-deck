/* Prevent legacy print handlers on appendix return buttons */
(function(){
  var appendixHref='12-appendix.html?v=appendix-directory-from-calculator';
  function isAppendixReturn(el){
    if(!el)return false;
    var text=(el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
    return text==='back to buysooner appendix'||text==='back to appendix'||text==='back to appendixes';
  }
  function go(e){
    if(e){
      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation)e.stopImmediatePropagation();
    }
    window.location.href=appendixHref;
    return false;
  }
  document.addEventListener('click',function(e){
    var el=e.target;
    while(el&&el!==document){
      if(isAppendixReturn(el)){go(e);return false;}
      el=el.parentNode;
    }
  },true);
  function patch(){
    var nodes=document.querySelectorAll('button,a');
    Array.prototype.slice.call(nodes).forEach(function(el){
      if(!isAppendixReturn(el)||el.dataset.bsNoPrintPatched==='true')return;
      var clean=el.cloneNode(true);
      clean.dataset.bsNoPrintPatched='true';
      if(clean.tagName&&clean.tagName.toLowerCase()==='a')clean.setAttribute('href',appendixHref);
      clean.setAttribute('type','button');
      clean.onclick=null;
      clean.addEventListener('click',go,true);
      el.parentNode.replaceChild(clean,el);
    });
  }
  patch();
  var mo=new MutationObserver(patch);
  mo.observe(document.documentElement,{childList:true,subtree:true,characterData:true});
})();
