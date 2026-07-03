/* Add Back to appendix buttons to roadmap action rows */
(function(){
  var href='12-appendix.html?v=appendix-directory-from-roadmap-page';
  var actionSelectors='.rm2-actions,.rm3-actions,.rm4-actions,.rm5-actions,.rm6-actions,.rm7-actions,.rm8-actions,.rm9-actions,.rm10-actions,.rm11-actions,.rm12-actions,.rm13-actions';
  function addStyle(){
    if(document.getElementById('roadmap-all-appendix-buttons-style'))return;
    var s=document.createElement('style');
    s.id='roadmap-all-appendix-buttons-style';
    s.textContent='.rm-appendix-btn{appearance:none;border:0;border-radius:999px;background:#fff;color:#071f3a;padding:14px 22px;font-size:14px;font-weight:900;cursor:pointer;border:1px solid #d7e5e4;box-shadow:0 10px 24px rgba(7,31,58,.10);white-space:nowrap}.rm-appendix-btn:hover{background:#eaf6f5;color:#071f3a}@media(max-width:900px){.rm-appendix-btn{width:100%;white-space:normal}}@media print{.rm-appendix-btn{display:none!important}}';
    document.head.appendChild(s);
  }
  function patchRow(row){
    if(!row||row.querySelector('.rm-appendix-btn'))return;
    var children=Array.prototype.slice.call(row.children);
    if(children.length<2)return;
    var next=children[children.length-1];
    var btn=document.createElement('button');
    btn.type='button';
    btn.className='rm-appendix-btn';
    btn.textContent='Back to appendix';
    btn.addEventListener('click',function(e){
      if(e){e.preventDefault();e.stopPropagation();}
      window.location.href=href;
      return false;
    });
    row.insertBefore(btn,next);
  }
  function patch(root){
    addStyle();
    root=root||document;
    Array.prototype.slice.call(root.querySelectorAll(actionSelectors)).forEach(patchRow);
  }
  function wrap(name){
    var fn=window[name];
    if(typeof fn!=='function'||fn.__bsAppendixButtons)return;
    window[name]=function(data,root){
      fn(data,root);
      patch(root||document);
      setTimeout(function(){patch(root||document);},100);
    };
    window[name].__bsAppendixButtons=true;
  }
  function install(){
    ['renderRoadmapPage2','renderRoadmapPage3','renderRoadmapPage4','renderRoadmapPage5','renderRoadmapPage6','renderRoadmapPage7','renderRoadmapPage8','renderRoadmapPage9','renderRoadmapPage10','renderRoadmapPage11','renderRoadmapPage12','renderRoadmapPage13Final'].forEach(wrap);
    patch(document);
  }
  install();
  var tries=0;
  var timer=setInterval(function(){tries+=1;install();if(tries>30)clearInterval(timer);},100);
  var mo=new MutationObserver(function(){patch(document);});
  mo.observe(document.documentElement,{childList:true,subtree:true});
})();
