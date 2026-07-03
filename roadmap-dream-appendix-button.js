/* Add Back to appendix button to the Great Australian Dream context page */
(function(){
  function addButton(root){
    try{
      root=root||document;
      var actions=root.querySelector('.rmdream-actions');
      if(!actions||actions.querySelector('.rmdream-appendix'))return;
      var next=actions.querySelector('.rmdream-next');
      var btn=document.createElement('button');
      btn.type='button';
      btn.className='rmdream-appendix';
      btn.textContent='Back to appendix';
      btn.addEventListener('click',function(e){
        if(e){e.preventDefault();e.stopPropagation();}
        window.location.href='12-appendix.html?v=appendix-directory-from-roadmap-context';
      });
      if(next){actions.insertBefore(btn,next);}else{actions.appendChild(btn);}
    }catch(e){}
  }
  function addStyle(){
    if(document.getElementById('rmdream-appendix-button-style'))return;
    var s=document.createElement('style');
    s.id='rmdream-appendix-button-style';
    s.textContent=`
.rmdream-appendix{appearance:none;border:0;border-radius:999px;background:#fff;color:#071f3a;padding:14px 22px;font-size:14px;font-weight:900;cursor:pointer;border:1px solid #d7e5e4;box-shadow:0 10px 24px rgba(7,31,58,.10)}
.rmdream-appendix:hover{background:#eaf6f5;color:#071f3a}
@media(max-width:900px){.rmdream-appendix{width:100%}}
@media print{.rmdream-appendix{display:none!important}}
`;
    document.head.appendChild(s);
  }
  function patch(root){addStyle();addButton(root||document);}
  function install(){
    if(typeof window.renderRoadmapDreamPage==='function'&&!window.renderRoadmapDreamPage.__bsAppendixButton){
      var original=window.renderRoadmapDreamPage;
      window.renderRoadmapDreamPage=function(data,root){
        original(data,root);
        patch(root);
        setTimeout(function(){patch(root);},100);
      };
      window.renderRoadmapDreamPage.__bsAppendixButton=true;
      return true;
    }
    return false;
  }
  addStyle();
  install();
  var tries=0;
  var timer=setInterval(function(){
    tries+=1;
    if(install()||tries>30)clearInterval(timer);
  },100);
  var mo=new MutationObserver(function(){patch(document);});
  mo.observe(document.documentElement,{childList:true,subtree:true});
})();
