/* Appendix navigation support */
(function(){
  var appendixHref='12-appendix.html?v=appendix-directory-from-calculator';
  var actionRows='.rm2-actions,.rm3-actions,.rm4-actions,.rm5-actions,.rm6-actions,.rm7-actions,.rm8-actions,.rm9-actions,.rm10-actions,.rm11-actions,.rm12-actions,.rm13-actions';
  function isAppendixReturn(el){
    if(!el)return false;
    var text=(el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
    return text==='back to buysooner appendix'||text==='back to appendix'||text==='back to appendixes';
  }
  function go(e){
    if(e){e.preventDefault();}
    window.location.href=appendixHref;
    return false;
  }
  function addStyle(){
    if(document.getElementById('bsAppendixReturnStyle'))return;
    var style=document.createElement('style');
    style.id='bsAppendixReturnStyle';
    style.textContent='.rm-appendix-btn{appearance:none;border:0;border-radius:999px;background:#fff;color:#071f3a;padding:14px 22px;font-size:14px;font-weight:900;cursor:pointer;border:1px solid #d7e5e4;box-shadow:0 10px 24px rgba(7,31,58,.10);white-space:nowrap}.rm-appendix-btn:hover{background:#eaf6f5;color:#071f3a}@media(max-width:900px){.rm-appendix-btn{width:100%;white-space:normal}}@media print{.rm-appendix-btn{display:none!important}}';
    document.head.appendChild(style);
  }
  function addMiddleButtons(){
    addStyle();
    Array.prototype.slice.call(document.querySelectorAll(actionRows)).forEach(function(row){
      if(row.querySelector('.rm-appendix-btn'))return;
      var children=Array.prototype.slice.call(row.children);
      if(children.length<2)return;
      var next=children[children.length-1];
      var btn=document.createElement('button');
      btn.type='button';
      btn.className='rm-appendix-btn';
      btn.textContent='Back to appendix';
      btn.addEventListener('click',go);
      row.insertBefore(btn,next);
    });
  }
  document.addEventListener('click',function(e){
    var el=e.target;
    while(el&&el!==document){
      if(isAppendixReturn(el)){go(e);return false;}
      el=el.parentNode;
    }
  });
  function patch(){
    addMiddleButtons();
    Array.prototype.slice.call(document.querySelectorAll('button,a')).forEach(function(el){
      if(!isAppendixReturn(el)||el.dataset.bsNoPrintPatched==='true')return;
      el.dataset.bsNoPrintPatched='true';
      if(el.tagName&&el.tagName.toLowerCase()==='a')el.setAttribute('href',appendixHref);
      el.onclick=go;
    });
  }
  patch();
  var mo=new MutationObserver(patch);
  mo.observe(document.documentElement,{childList:true,subtree:true,characterData:true});
})();
