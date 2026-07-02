(function(){
  var href='12-appendix.html?v=appendix-directory-from-calculator';
  var label='Back to appendix';
  if(document.getElementById('bsAppendixBackButton'))return;
  var style=document.createElement('style');
  style.textContent='.bs-appendix-back{position:fixed;top:18px;right:18px;z-index:9999;display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:12px 18px;background:#eaf6f5;color:#071f3a;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:900;letter-spacing:.01em;border:1px solid #d7e5e4;box-shadow:0 10px 28px rgba(7,31,58,.12)}.bs-appendix-back:hover{background:#087a78;color:#fff}@media(max-width:720px){.bs-appendix-back{top:10px;right:10px;padding:10px 14px;font-size:12px}}';
  document.head.appendChild(style);
  var a=document.createElement('a');
  a.id='bsAppendixBackButton';
  a.className='bs-appendix-back';
  a.href=href;
  a.textContent=label;
  document.body.appendChild(a);
})();
