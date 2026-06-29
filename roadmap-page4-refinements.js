/* BuySooner Roadmap Page 4 refinements */
(function(){
  function applyPage4Refinements(root){
    if(!root||!root.querySelector)return;

    var title=root.querySelector('.rm4-hero h1');
    if(title){title.innerHTML='What changes when you<br><span>stop chasing?</span>';}

    var waitHead=root.querySelector('.rm4-head-cell.wait h2');
    var soonerHead=root.querySelector('.rm4-head-cell.sooner h2');
    if(waitHead)waitHead.textContent='If you keep waiting';
    if(soonerHead)soonerHead.textContent='With BuySooner';
  }

  function wrap(){
    if(!window.renderRoadmapPage4||window.renderRoadmapPage4.__bsPage4Refined)return;
    var original=window.renderRoadmapPage4;
    window.renderRoadmapPage4=function(data,root){
      original(data,root);
      applyPage4Refinements(root);
    };
    window.renderRoadmapPage4.__bsPage4Refined=true;
  }

  wrap();
  window.BSApplyPage4Refinements=applyPage4Refinements;
})();
