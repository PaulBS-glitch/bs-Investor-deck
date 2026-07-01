(function(){
  var frame=document.getElementById('prototypeFrame');
  if(!frame)return;
  function patch(){
    try{
      var w=frame.contentWindow;
      var d=frame.contentDocument||w.document;
      if(!w.BSRoadmap&&!d.getElementById('roadmapDataPatch')){
        var s=d.createElement('script');
        s.id='roadmapDataPatch';
        s.src='roadmap-data.js?v=plan-first';
        d.body.appendChild(s);
      }
      var b=d.getElementById('routeButton');
      if(!b||b.dataset.planFirst==='1')return;
      b.dataset.planFirst='1';
      b.addEventListener('click',function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        if(typeof w.buildScenario==='function'){
          var r=w.buildScenario();
          if(r&&r.messages&&r.messages.length)return;
          w.scenario=r.data;
        }
        setTimeout(function(){
          if(w.BSRoadmap&&typeof w.BSRoadmap.save==='function')w.BSRoadmap.save();
          w.location.href='roadmap.html?v=personalised-plan-first';
        },100);
      },true);
    }catch(err){}
  }
  frame.addEventListener('load',function(){patch();setTimeout(patch,300);setTimeout(patch,900);});
  setInterval(patch,1000);
})();
