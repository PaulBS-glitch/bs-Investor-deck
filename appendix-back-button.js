(function(){
  var href='12-appendix.html?v=appendix-directory-from-calculator';
  var label='Back to appendix';
  function ensureStyle(){
    if(document.getElementById('bsAppendixBackButtonStyle'))return;
    var style=document.createElement('style');
    style.id='bsAppendixBackButtonStyle';
    style.textContent='.bs-appendix-back{position:fixed!important;right:28px!important;bottom:28px!important;top:auto!important;left:auto!important;z-index:2147483647!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;border-radius:999px!important;padding:14px 22px!important;background:#eaf6f5!important;color:#071f3a!important;text-decoration:none!important;font-family:Arial,Helvetica,sans-serif!important;font-size:14px!important;font-weight:900!important;letter-spacing:.01em!important;border:1px solid #d7e5e4!important;box-shadow:0 12px 30px rgba(7,31,58,.18)!important;line-height:1!important}.bs-appendix-back:hover{background:#087a78!important;color:#fff!important}@media(max-width:720px){.bs-appendix-back{right:16px!important;bottom:16px!important;padding:12px 16px!important;font-size:12px!important}}@media print{.bs-appendix-back{display:none!important}}';
    document.head.appendChild(style);
  }
  function ensureButton(){
    ensureStyle();
    var a=document.getElementById('bsAppendixBackButton');
    if(!a){
      a=document.createElement('a');
      a.id='bsAppendixBackButton';
      a.className='bs-appendix-back';
      document.body.appendChild(a);
    }
    a.href=href;
    a.textContent=label;
    a.setAttribute('aria-label','Back to BuySooner appendix directory');
  }
  ensureButton();
  window.BSEnsureAppendixBackButton=ensureButton;
  var mo=new MutationObserver(function(){ensureButton();});
  mo.observe(document.documentElement,{childList:true,subtree:true});
})();
