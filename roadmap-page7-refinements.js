/* Page 7 refinement layer: visual tweaks without disturbing the calculator logic. */
(function(){
  function injectPage7RefinementStyles(){
    if(document.getElementById('roadmap-page7-refinement-style')) return;
    var style=document.createElement('style');
    style.id='roadmap-page7-refinement-style';
    style.textContent=`
      .rm7-hero:after{
        opacity:.50!important;
        filter:saturate(.98) contrast(1)!important;
      }
      .rm7-split-panel{
        display:grid!important;
        grid-template-columns:1fr!important;
        gap:16px!important;
        align-items:start!important;
        justify-items:center!important;
        text-align:left!important;
      }
      .rm7-split-panel h3{
        white-space:nowrap!important;
        text-align:center!important;
      }
      .rm7-split-panel > div:not(.rm7-orb){
        width:100%!important;
      }
      .rm7-orb{
        margin:0 auto 2px!important;
      }
      .rm7-split-line{
        width:100%!important;
      }
      .rm7-trade{
        display:grid!important;
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
        gap:18px!important;
        background:transparent!important;
        border:0!important;
        box-shadow:none!important;
        overflow:visible!important;
        margin-bottom:22px!important;
      }
      .rm7-trade-card,
      .rm7-trade-card:first-child{
        background:#f2fbfa!important;
        border:1px solid rgba(8,122,120,.24)!important;
        border-radius:18px!important;
        min-height:196px!important;
        padding:25px 26px!important;
        box-shadow:0 12px 26px rgba(12,51,88,.075)!important;
      }
      .rm7-trade-icon{
        font-size:39px!important;
        margin-bottom:9px!important;
      }
      .rm7-trade-card h4{
        font-size:21px!important;
        margin-bottom:12px!important;
      }
      .rm7-trade-card p{
        font-size:15.8px!important;
        line-height:1.46!important;
      }
      .rm7-bottom-plain{
        background:#eaf6f5!important;
        border:2px solid rgba(8,122,120,.26)!important;
        box-shadow:0 14px 32px rgba(12,51,88,.075)!important;
      }
      .rm7-bottom-plain h3{
        color:#071f3a!important;
        font-size:35px!important;
        margin-bottom:18px!important;
      }
      .rm7-bottom-row{
        grid-template-columns:245px 1fr!important;
        padding:17px 0!important;
      }
      .rm7-bottom-amount{
        color:#087a78!important;
        font-size:35px!important;
        font-weight:950!important;
        letter-spacing:-.05em!important;
      }
      .rm7-bottom-copy{
        color:#071f3a!important;
        font-size:16.5px!important;
        line-height:1.43!important;
        font-weight:850!important;
      }
      @media(max-width:900px){
        .rm7-trade{grid-template-columns:1fr!important;}
        .rm7-bottom-row{grid-template-columns:1fr!important;}
        .rm7-split-panel h3{white-space:normal!important;}
      }
      @media print{
        .rm7-trade{grid-template-columns:repeat(2,minmax(0,1fr))!important;}
      }
    `;
    document.head.appendChild(style);
  }

  function postProcessPage7(root){
    if(!root) return;

    var tradeTitle=root.querySelector('.rm7-trade-title');
    if(tradeTitle){tradeTitle.textContent='The Deal in Plain English';}

    var panels=root.querySelectorAll('.rm7-split-panel');
    if(panels && panels[1]){
      var heading=panels[1].querySelector('h3');
      var orb=panels[1].querySelector('.rm7-orb span');
      if(heading) heading.textContent='Value of Partnership';
      if(orb) orb.innerHTML='Value of<br>Partnership';
    }
  }

  function wrapWhenReady(){
    if(typeof window.renderRoadmapPage7!=='function'){
      setTimeout(wrapWhenReady,30);
      return;
    }
    if(window.renderRoadmapPage7.__page7Refined) return;
    var original=window.renderRoadmapPage7;
    window.renderRoadmapPage7=function(data,root){
      original(data,root);
      injectPage7RefinementStyles();
      postProcessPage7(root);
      setTimeout(function(){postProcessPage7(root);},0);
    };
    window.renderRoadmapPage7.__page7Refined=true;
  }

  injectPage7RefinementStyles();
  wrapWhenReady();
})();