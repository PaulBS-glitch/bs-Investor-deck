(function(){
  function patchFinalButton(root){
    try{
      root=root||document;
      var btn=root.querySelector('#rm13Print');
      if(!btn)return;
      btn.textContent='Back to BuySooner appendix';
      btn.setAttribute('type','button');
      btn.onclick=function(e){
        if(e)e.preventDefault();
        window.location.href='12-appendix.html?v=appendix-directory-from-roadmap';
        return false;
      };
    }catch(e){}
  }
  function install(){
    if(typeof window.renderRoadmapPage13Final!=='function')return false;
    if(window.__BSRiskButtonPatchInstalled)return true;
    window.__BSRiskButtonPatchInstalled=true;
    var original=window.renderRoadmapPage13Final;
    window.renderRoadmapPage13Final=function(data,root){
      original(data,root);
      patchFinalButton(root);
      setTimeout(function(){patchFinalButton(root);},250);
    };
    return true;
  }
  if(!install()){
    var tries=0;
    var timer=setInterval(function(){
      tries+=1;
      if(install()||tries>20)clearInterval(timer);
    },200);
  }
})();