/* Page 10 refinement layer: FAQ hero, accordion readability and bottom callout copy. Also loads Page 11 support-pathway refinements. */
(function(){
  function injectPage10RefinementStyles(){
    var old=document.getElementById('roadmap-page10-refinement-style');
    if(old) old.remove();
    var style=document.createElement('style');
    style.id='roadmap-page10-refinement-style';
    style.textContent=`
      .rm10-hero{
        min-height:310px!important;
        padding:48px 52px!important;
        margin-bottom:28px!important;
      }
      .rm10-hero:after{
        opacity:.34!important;
        filter:saturate(.98) contrast(1)!important;
        width:46%!important;
      }
      .rm10-hero-inner{
        max-width:780px!important;
      }
      .rm10-hero h1{
        font-size:clamp(40px,4.85vw,60px)!important;
        line-height:1.03!important;
        letter-spacing:-.055em!important;
        max-width:760px!important;
      }
      .rm10-hero h2{
        margin-top:20px!important;
        font-size:clamp(24px,2.8vw,34px)!important;
        line-height:1.12!important;
      }
      .rm10-hero p{
        margin-top:14px!important;
        font-size:17.5px!important;
        line-height:1.5!important;
        max-width:680px!important;
      }
      .rm10-faq-card{
        margin-top:4px!important;
      }
      .rm10-faq-header{
        padding:30px 32px 26px!important;
      }
      .rm10-faq-header h2{
        font-size:32px!important;
        line-height:1.08!important;
      }
      .rm10-faq-header p{
        font-size:16px!important;
        line-height:1.5!important;
      }
      .rm10-print-note{
        display:none!important;
      }
      .rm10-accordion{
        padding:16px 26px 28px!important;
      }
      .rm10-acc{
        padding-top:3px!important;
        padding-bottom:3px!important;
      }
      .rm10-acc-btn{
        padding:24px 4px!important;
      }
      .rm10-acc-btn h3{
        font-size:25px!important;
        line-height:1.14!important;
      }
      .rm10-acc-btn p{
        font-size:15px!important;
        line-height:1.45!important;
      }
      .rm10-more{
        min-width:98px!important;
        background:#eaf6f5!important;
        color:#087a78!important;
        border:1px solid rgba(8,122,120,.28)!important;
        padding:10px 14px!important;
      }
      .rm10-acc.is-open .rm10-more{
        background:#dff3f1!important;
        color:#087a78!important;
        border-color:rgba(8,122,120,.34)!important;
      }
      .rm10-qa-grid{
        gap:18px!important;
      }
      .rm10-qa{
        padding:22px 22px!important;
      }
      .rm10-qa h4{
        font-size:18px!important;
        line-height:1.3!important;
        margin-bottom:10px!important;
      }
      .rm10-qa p{
        font-size:15.5px!important;
        line-height:1.6!important;
        font-weight:680!important;
      }
      .rm10-bottom{
        padding:34px 38px!important;
      }
      .rm10-bottom h2{
        font-size:34px!important;
        line-height:1.06!important;
      }
      .rm10-bottom p{
        font-size:18px!important;
        line-height:1.5!important;
        color:#071f3a!important;
        font-weight:760!important;
      }
      @media(max-width:900px){
        .rm10-hero{min-height:auto!important;padding:30px 24px!important;}
        .rm10-hero:after{opacity:.16!important;width:72%!important;}
      }
    `;
    document.head.appendChild(style);
  }

  function postProcessPage10(root){
    if(!root) return;
    var hero=root.querySelector('.rm10-hero');
    if(hero){
      var h1=hero.querySelector('h1');
      var h2=hero.querySelector('h2');
      var p=hero.querySelector('p');
      var customer='';
      if(h1){
        customer=h1.textContent
          .replace(/^Customer FAQ’s for\s*/i,'')
          .replace(/^Customer FAQs for\s*/i,'')
          .replace(/^FAQ’s for\s*/i,'')
          .replace(/^FAQs for\s*/i,'')
          .trim();
        h1.textContent='FAQs for '+customer;
      }
      if(h2) h2.textContent='Clear answers before you move forward.';
      if(p) p.textContent='These questions explain how BuySooner works in plain English.';
    }

    var header=root.querySelector('.rm10-faq-header p');
    if(header){
      header.textContent='Open each section to review the answers. The full FAQ is included when printed or saved.';
    }

    var bottom=root.querySelector('.rm10-bottom');
    if(bottom){
      var h2=bottom.querySelector('h2');
      var p=bottom.querySelector('p');
      if(h2) h2.textContent='With BuySooner, you get the keys today.';
      if(p) p.textContent='Build equity sooner and move toward a standard mortgage when the numbers are ready.';
    }
  }

  function injectPage11RefinementStyles(){
    if(document.getElementById('roadmap-page11-refinement-style')) return;
    var style=document.createElement('style');
    style.id='roadmap-page11-refinement-style';
    style.textContent=`
      .rm11-routing{
        margin-top:0!important;
        margin-bottom:22px!important;
      }
      .rm11-contact-grid{
        margin-top:0!important;
      }
      .rm11-simple{
        padding:28px!important;
      }
      .rm11-simple h2{
        font-size:31px!important;
        color:#087a78!important;
        margin-bottom:20px!important;
      }
      .rm11-simple-flow{
        display:grid!important;
        grid-template-columns:repeat(3,minmax(0,1fr))!important;
        gap:16px!important;
        align-items:stretch!important;
      }
      .rm11-simple-col{
        background:#fff!important;
        border:1px solid rgba(8,122,120,.22)!important;
        border-radius:18px!important;
        padding:19px 18px!important;
        text-align:center!important;
        min-height:138px!important;
        box-shadow:0 10px 22px rgba(12,51,88,.045)!important;
      }
      .rm11-simple-col h3{
        margin:0 0 10px!important;
        color:#071f3a!important;
        font-size:19px!important;
        line-height:1.12!important;
        font-weight:950!important;
        letter-spacing:-.025em!important;
      }
      .rm11-simple-col p{
        margin:0!important;
        color:#526071!important;
        font-size:14.6px!important;
        line-height:1.42!important;
        font-weight:760!important;
      }
      @media(max-width:900px){
        .rm11-simple-flow{grid-template-columns:1fr!important;}
      }
    `;
    document.head.appendChild(style);
  }

  function postProcessPage11(root){
    if(!root||!root.querySelector) return;
    var page=root.querySelector('.rm11-page');
    if(!page) return;

    var heroParagraphs=page.querySelectorAll('.rm11-title p');
    Array.prototype.slice.call(heroParagraphs).forEach(function(p){
      if(/We are here to help\. BuySooner can explain the bridge/i.test(p.textContent||'')){
        p.remove();
      }
    });

    var routing=page.querySelector('.rm11-routing');
    var supportTitle=page.querySelector('.rm11-section-title');
    if(routing&&supportTitle&&routing.previousElementSibling!==supportTitle){
      supportTitle.parentNode.insertBefore(routing,supportTitle);
    }

    var simple=page.querySelector('.rm11-simple');
    if(simple){
      var h2=simple.querySelector('h2');
      var flow=simple.querySelector('.rm11-simple-flow');
      if(h2) h2.textContent='Buy sooner';
      if(flow&&flow.dataset.bsRefined!=='true'){
        flow.dataset.bsRefined='true';
        flow.innerHTML='<article class="rm11-simple-col"><h3>1. From Day One</h3><p>You own the home, and your bank loan stays normal.</p></article><article class="rm11-simple-col"><h3>2. Every Month</h3><p>No monthly BuySooner payments. You make your normal bank mortgage repayments.</p></article><article class="rm11-simple-col"><h3>3. At the End</h3><p>BuySooner is repaid at exit, and you keep building your future.</p></article>';
      }
    }
  }

  function wrapPage10WhenReady(){
    if(typeof window.renderRoadmapPage10!=='function'){
      setTimeout(wrapPage10WhenReady,30);
      return;
    }
    if(window.renderRoadmapPage10.__page10Refined) return;
    var original=window.renderRoadmapPage10;
    window.renderRoadmapPage10=function(data,root){
      original(data,root);
      injectPage10RefinementStyles();
      postProcessPage10(root);
      setTimeout(function(){postProcessPage10(root);},0);
    };
    window.renderRoadmapPage10.__page10Refined=true;
  }

  function wrapPage11WhenReady(){
    if(typeof window.renderRoadmapPage11!=='function'){
      setTimeout(wrapPage11WhenReady,30);
      return;
    }
    if(window.renderRoadmapPage11.__page11Refined) return;
    var original=window.renderRoadmapPage11;
    window.renderRoadmapPage11=function(data,root){
      original(data,root);
      injectPage11RefinementStyles();
      postProcessPage11(root);
      setTimeout(function(){postProcessPage11(root);},0);
      setTimeout(function(){postProcessPage11(root);},120);
    };
    window.renderRoadmapPage11.__page11Refined=true;
  }

  injectPage10RefinementStyles();
  injectPage11RefinementStyles();
  wrapPage10WhenReady();
  wrapPage11WhenReady();
})();