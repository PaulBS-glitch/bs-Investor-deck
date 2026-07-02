(function(){
  var href='12-appendix.html?v=appendix-directory-from-calculator';
  var label='Back to appendix';
  if(document.getElementById('bsAppendixBackButton'))return;
  var style=document.createElement('style');
  style.textContent='.bs-appendix-back{position:fixed;right:28px;bottom:28px;z-index:9999;display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:14px 22px;background:#eaf6f5;color:#071f3a;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:900;letter-spacing:.01em;border:1px solid #d7e5e4;box-shadow:0 12px 30px rgba(7,31,58,.14)}.bs-appendix-back:hover{background:#087a78;color:#fff}@media(max-width:720px){.bs-appendix-back{right:16px;bottom:16px;padding:12px 16px;font-size:12px}}';
  document.head.appendChild(style);
  var a=document.createElement('a');
  a.id='bsAppendixBackButton';
  a.className='bs-appendix-back';
  a.href=href;
  a.textContent=label;
  document.body.appendChild(a);
})();
