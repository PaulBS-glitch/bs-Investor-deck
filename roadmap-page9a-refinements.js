/* BuySooner Roadmap Page 9A refinements */
(function(){
  function titleCaseCaps(value){
    return String(value||'').replace(/\b([A-Z]{2,})\b/g,function(m){return m.charAt(0)+m.slice(1).toLowerCase();});
  }
  function formatAddress(value){
    var s=String(value||'').trim();
    if(!s)return '';
    s=s.replace(/\s*,\s*/g,', ');
    s=s.replace(/^(Unit\s+\d+)\s+(\d+\s+)/i,'$1, $2');
    return titleCaseCaps(s);
  }
  function applyPage9ARefinements(data,root){
    if(!root||!root.querySelector)return;
    var page=root.querySelector('.rm9a-page');
    if(!page)return;

    var d=data||{},p=d.property||{};
    var address=formatAddress(p.address||p.suburb||'');

    var hero=page.querySelector('.rm9a-hero');
    if(hero){
      var title=hero.querySelector('h1');
      var sub=hero.querySelector('h2');
      var copy=hero.querySelector('p');
      if(title)title.textContent='The Numbers Behind Your Exit';
      if(sub)sub.remove();
      if(copy)copy.textContent='See how your starting deal, home value, mortgage balance and BuySooner payout come together to estimate when a standard refinance may be workable.';
    }

    var profileTitle=page.querySelector('.rm9a-profile h3');
    if(profileTitle&&address){profileTitle.textContent='Your situation at '+address;}

    var status=page.querySelector('[data-out="green"]');
    if(status){
      var m=String(status.textContent||'').match(/Year\s+\d+/i);
      if(/Near Ready/i.test(status.textContent)&&m){
        status.textContent='Refinance Ready Soon for '+m[0];
      }
    }

    var action=page.querySelector('[data-out="action"]');
    if(action&&/broker review zone/i.test(action.textContent||'')){
      action.textContent='The Exit Action: this sits in the broker review zone. Your broker will test lender options, valuation, income and repayments to see if refinance is workable.';
    }

    var styleId='roadmap-page9a-refinements-style';
    if(!document.getElementById(styleId)){
      var s=document.createElement('style');
      s.id=styleId;
      s.textContent='.rm9a-hero h1{margin-bottom:12px!important}.rm9a-hero p{margin-top:0!important;max-width:720px!important}.rm9a-profile h3{text-transform:none!important}';
      document.head.appendChild(s);
    }
  }
  function wrap(){
    if(!window.renderRoadmapPage9A||window.renderRoadmapPage9A.__bsPage9ARefined)return;
    var original=window.renderRoadmapPage9A;
    window.renderRoadmapPage9A=function(data,root){
      original(data,root);
      window.__bsPage9ARefinementData=data||window.__bsPage9ARefinementData;
      window.__bsPage9ARefinementRoot=root||window.__bsPage9ARefinementRoot;
      applyPage9ARefinements(data,root);
      setTimeout(function(){applyPage9ARefinements(data,root);},0);
      setTimeout(function(){applyPage9ARefinements(data,root);},80);
      setTimeout(function(){applyPage9ARefinements(data,root);},220);
    };
    window.renderRoadmapPage9A.__bsPage9ARefined=true;
  }
  document.addEventListener('input',function(event){
    if(event.target&&event.target.closest&&event.target.closest('.rm9a-page')){
      setTimeout(function(){applyPage9ARefinements(window.__bsPage9ARefinementData||window.__bsLvrBandData||{},window.__bsPage9ARefinementRoot||window.__bsLvrBandRoot||document);},0);
      setTimeout(function(){applyPage9ARefinements(window.__bsPage9ARefinementData||window.__bsLvrBandData||{},window.__bsPage9ARefinementRoot||window.__bsLvrBandRoot||document);},120);
    }
  },true);
  document.addEventListener('change',function(event){
    if(event.target&&event.target.closest&&event.target.closest('.rm9a-page')){
      setTimeout(function(){applyPage9ARefinements(window.__bsPage9ARefinementData||window.__bsLvrBandData||{},window.__bsPage9ARefinementRoot||window.__bsLvrBandRoot||document);},0);
      setTimeout(function(){applyPage9ARefinements(window.__bsPage9ARefinementData||window.__bsLvrBandData||{},window.__bsPage9ARefinementRoot||window.__bsLvrBandRoot||document);},120);
    }
  },true);
  wrap();
  window.BSApplyPage9ARefinements=applyPage9ARefinements;
})();
