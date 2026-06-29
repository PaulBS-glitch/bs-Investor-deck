/* BuySooner Roadmap Page 8 to Page 9 navigation patch */
(function(){
  function goToPage9(data, root){
    function render(){window.renderRoadmapPage9(data, root);window.scrollTo({top:0,behavior:'smooth'});}
    if(window.renderRoadmapPage9){render();return;}
    var existing=document.querySelector('script[data-roadmap-page9="true"]');
    if(existing){existing.addEventListener('load',function(){if(window.renderRoadmapPage9){render();}});return;}
    var script=document.createElement('script');
    script.src='roadmap-page9.js?v=20260518-1';
    script.dataset.roadmapPage9='true';
    script.onload=function(){if(window.renderRoadmapPage9){render();}else{alert('Page 9 could not load. Refresh the roadmap and try again.');}};
    script.onerror=function(){alert('Page 9 could not load. Refresh the roadmap and try again.');};
    document.body.appendChild(script);
  }

  var original=window.renderRoadmapPage8;
  if(typeof original!=='function') return;
  window.renderRoadmapPage8=function(data, root){
    original(data, root);
    var print=root.querySelector('#rm8Print');
    if(print){
      print.textContent='Next: Exit Timeline →';
      print.onclick=null;
      var clone=print.cloneNode(true);
      print.parentNode.replaceChild(clone, print);
      clone.addEventListener('click',function(){goToPage9(data, root);});
    }
  };
})();
