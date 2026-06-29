/* BuySooner Roadmap Page 3 refinements */
(function(){
  function applyPage3Refinements(data,root){
    if(!root||!root.querySelector)return;
    var d=data||{},c=d.customer||{};
    var customerName=String(c.name||c.fullName||'Customer').trim()||'Customer';

    var heroSub=root.querySelector('.rm3-hero h2');
    if(heroSub){heroSub.textContent='A bridge to ownership, not a forever arrangement.';}

    var heroCopy=root.querySelector('.rm3-hero-copy');
    if(heroCopy){heroCopy.textContent='BuySooner is designed for people who can afford the loan, but cannot save the full deposit fast enough to keep pace with the market.';}

    var driftTitle=root.querySelector('.rm3-visual-card.drift h3');
    if(driftTitle){driftTitle.textContent='The Market Move';}

    var driftAlt=root.querySelector('.rm3-visual-card.drift img');
    if(driftAlt){driftAlt.setAttribute('alt','The market move');}

    var summaryTitle=root.querySelector('.rm3-summary h2');
    if(summaryTitle){summaryTitle.textContent=customerName;}
  }

  function wrap(){
    if(!window.renderRoadmapPage3||window.renderRoadmapPage3.__bsPage3Refined)return;
    var original=window.renderRoadmapPage3;
    window.renderRoadmapPage3=function(data,root){
      original(data,root);
      applyPage3Refinements(data,root);
    };
    window.renderRoadmapPage3.__bsPage3Refined=true;
  }

  wrap();
  window.BSApplyPage3Refinements=applyPage3Refinements;
})();
