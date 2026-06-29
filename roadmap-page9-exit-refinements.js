/* BuySooner Roadmap Page 9 and 9A exit-path refinements */
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

  function applyPage9ExitRefinements(root){
    if(!root||!root.querySelector)return;

    var hero=root.querySelector('.rm9-hero');
    if(hero){
      var h1=hero.querySelector('h1');
      var h2=hero.querySelector('h2');
      if(h1)h1.textContent='Your Exit Path';
      if(h2)h2.textContent='BuySooner is your stepping stone to homeownership, not a forever loan.';
    }

    var refi=root.querySelector('.rm9-refi-card');
    if(refi){
      var firstText=refi.querySelector('.rm9-refi-text');
      if(firstText){
        firstText.textContent='Once a standard bank is ready to take over the full position, BuySooner is repaid, steps out, and you move to a traditional mortgage.';
      }
    }

    var tracks=root.querySelectorAll('.rm9-track');
    if(tracks&&tracks[0]){
      var p0=tracks[0].querySelector('p');
      if(p0)p0.textContent='We track your position against the refinance pathway and show whether you are moving closer to a standard bank loan.';
    }
    if(tracks&&tracks[1]){
      var p1=tracks[1].querySelector('p');
      if(p1)p1.textContent='At Year 3, we check if the numbers are ready. If the market is moving slower, your bridge safely continues within your exit window.';
    }

    var estimateCopy=root.querySelector('.rm9-estimate p');
    if(estimateCopy){
      estimateCopy.textContent=String(estimateCopy.textContent||'').replace(
        'A broker would review lender options, valuation, income, repayments and policy settings before confirming whether refinance is workable.',
        'Your broker would review lender options, valuation, income and repayments to confirm whether refinance is workable.'
      );
    }
  }

  function applyPage9ACalculatorRefinements(data,root){
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
      if(/Near Ready/i.test(status.textContent)&&m){status.textContent='Refinance Ready Soon for '+m[0];}
    }

    var action=page.querySelector('[data-out="action"]');
    if(action&&/broker review zone/i.test(action.textContent||'')){
      action.textContent='The Exit Action: this sits in the broker review zone. Your broker will test lender options, valuation, income and repayments to see if refinance is workable.';
    }

    var styleId='roadmap-page9a-exit-refinements-style';
    if(!document.getElementById(styleId)){
      var s=document.createElement('style');
      s.id=styleId;
      s.textContent='.rm9a-hero h1{margin-bottom:12px!important}.rm9a-hero p{margin-top:0!important;max-width:720px!important}.rm9a-profile h3{text-transform:none!important}';
      document.head.appendChild(s);
    }
  }

  function wrapPage9(){
    if(!window.renderRoadmapPage9||window.renderRoadmapPage9.__bsExitRefined)return;
    var original=window.renderRoadmapPage9;
    window.renderRoadmapPage9=function(data,root){
      original(data,root);
      applyPage9ExitRefinements(root);
      setTimeout(function(){applyPage9ExitRefinements(root);},0);
      setTimeout(function(){applyPage9ExitRefinements(root);},100);
      setTimeout(function(){applyPage9ExitRefinements(root);},250);
    };
    window.renderRoadmapPage9.__bsExitRefined=true;
  }

  function wrapPage9A(){
    if(!window.renderRoadmapPage9A||window.renderRoadmapPage9A.__bsExitRefined)return;
    var original=window.renderRoadmapPage9A;
    window.renderRoadmapPage9A=function(data,root){
      original(data,root);
      window.__bsPage9ARefinementData=data||window.__bsPage9ARefinementData;
      window.__bsPage9ARefinementRoot=root||window.__bsPage9ARefinementRoot;
      applyPage9ACalculatorRefinements(data,root);
      setTimeout(function(){applyPage9ACalculatorRefinements(data,root);},0);
      setTimeout(function(){applyPage9ACalculatorRefinements(data,root);},100);
      setTimeout(function(){applyPage9ACalculatorRefinements(data,root);},250);
    };
    window.renderRoadmapPage9A.__bsExitRefined=true;
  }

  document.addEventListener('input',function(event){
    if(event.target&&event.target.closest&&event.target.closest('.rm9a-page')){
      setTimeout(function(){applyPage9ACalculatorRefinements(window.__bsPage9ARefinementData||window.__bsLvrBandData||{},window.__bsPage9ARefinementRoot||window.__bsLvrBandRoot||document);},0);
      setTimeout(function(){applyPage9ACalculatorRefinements(window.__bsPage9ARefinementData||window.__bsLvrBandData||{},window.__bsPage9ARefinementRoot||window.__bsLvrBandRoot||document);},120);
    }
  },true);

  document.addEventListener('change',function(event){
    if(event.target&&event.target.closest&&event.target.closest('.rm9a-page')){
      setTimeout(function(){applyPage9ACalculatorRefinements(window.__bsPage9ARefinementData||window.__bsLvrBandData||{},window.__bsPage9ARefinementRoot||window.__bsLvrBandRoot||document);},0);
      setTimeout(function(){applyPage9ACalculatorRefinements(window.__bsPage9ARefinementData||window.__bsLvrBandData||{},window.__bsPage9ARefinementRoot||window.__bsLvrBandRoot||document);},120);
    }
  },true);

  wrapPage9();
  wrapPage9A();
  window.BSApplyPage9ExitRefinements=applyPage9ExitRefinements;
  window.BSApplyPage9ACalculatorRefinements=applyPage9ACalculatorRefinements;
})();
