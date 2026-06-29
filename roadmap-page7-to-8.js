/* BuySooner Roadmap Page 7 to Page 8 navigation patch */
(function(){
  function goToPage8(data, root){
    function render(){window.renderRoadmapPage8(data, root);window.scrollTo({top:0,behavior:'smooth'});}
    if(window.renderRoadmapPage8){render();return;}
    var existing=document.querySelector('script[data-roadmap-page8="true"]');
    if(existing){existing.addEventListener('load',function(){if(window.renderRoadmapPage8){render();}});return;}
    var script=document.createElement('script');
    script.src='roadmap-page8.js?v=20260518-1';
    script.dataset.roadmapPage8='true';
    script.onload=function(){if(window.renderRoadmapPage8){render();}else{alert('Page 8 could not load. Refresh the roadmap and try again.');}};
    script.onerror=function(){alert('Page 8 could not load. Refresh the roadmap and try again.');};
    document.body.appendChild(script);
  }

  var original=window.renderRoadmapPage7;
  if(typeof original!=='function') return;
  window.renderRoadmapPage7=function(data, root){
    original(data, root);
    var print=root.querySelector('#rm7Print');
    if(print){
      print.textContent='Next: Worked Example →';
      print.onclick=null;
      var clone=print.cloneNode(true);
      print.parentNode.replaceChild(clone, print);
      clone.addEventListener('click',function(){goToPage8(data, root);});
    }
  };
})();
