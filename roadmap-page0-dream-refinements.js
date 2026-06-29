/* BuySooner Roadmap Page 0A refinements */
(function(){
  function applyDreamRefinements(root){
    if(!root||!root.querySelector)return;

    var name=root.querySelector('.rmdream-name');
    if(name){
      var clean=String(name.textContent||'').replace(/,+$/,'').trim();
      if(clean){name.textContent=clean+',';}
    }

    var stripCopy=root.querySelectorAll('.rmdream-strip-copy');
    var copy=[
      ['Prices keep moving','The target keeps shifting.'],
      ['Rent keeps draining cash','Every week builds someone else\'s equity.'],
      ['Deposits take years','Time becomes the biggest barrier.']
    ];
    Array.prototype.slice.call(stripCopy).forEach(function(block,i){
      var strong=block.querySelector('strong'),span=block.querySelector('span');
      if(copy[i]){
        if(strong)strong.textContent=copy[i][0];
        if(span)span.textContent=copy[i][1];
      }
    });

    Array.prototype.slice.call(root.querySelectorAll('.rmdream-strip-icon')).forEach(function(icon){
      if(icon&&icon.parentNode){icon.parentNode.removeChild(icon);}
    });

    var styleId='roadmap-dream-refinements-style';
    if(!document.getElementById(styleId)){
      var s=document.createElement('style');
      s.id=styleId;
      s.textContent='.rmdream-name{margin:0 auto 6px!important;font-size:20px!important;line-height:1.15!important;font-weight:900!important;letter-spacing:-.02em!important}.rmdream-sub{font-size:26px!important;max-width:800px!important}.rmdream-strip{margin:24px auto 26px!important}.rmdream-strip-item{grid-template-columns:1fr!important;gap:0!important;text-align:left!important;padding:18px 28px!important;min-height:88px!important}.rmdream-strip-copy{max-width:230px!important}.rmdream-strip-copy strong{font-size:18px!important}.rmdream-strip-copy span{font-size:14.5px!important}.rmdream-strip.is-visible .rmdream-strip-icon{animation:none!important}.rmdream-section-title{margin:20px auto 18px!important}.rmdream-facts{gap:14px!important;margin-bottom:22px!important}.rmdream-card{min-height:174px!important;gap:14px!important}.rmdream-image{min-height:174px!important}.rmdream-image img{min-height:174px!important}.rmdream-copybox{padding:20px 26px!important}.rmdream-card h3{font-size:22px!important}.rmdream-stat{font-size:56px!important}.rmdream-detail{margin-top:6px!important}.rmdream-copy{margin-top:6px!important}.rmdream-source{margin-top:16px!important;padding-top:12px!important}.rmdream-actions{margin-top:24px!important}@media(max-width:900px){.rmdream-name{font-size:18px!important}.rmdream-sub{font-size:22px!important}.rmdream-strip-item{padding:18px 20px!important}.rmdream-strip-copy{max-width:none!important}.rmdream-card{gap:10px!important}.rmdream-image,.rmdream-image img{min-height:180px!important}.rmdream-copybox{padding:20px!important}}';
      document.head.appendChild(s);
    }
  }
  function wrap(){
    if(!window.renderRoadmapDreamPage||window.renderRoadmapDreamPage.__bsDreamRefined)return;
    var original=window.renderRoadmapDreamPage;
    window.renderRoadmapDreamPage=function(data,root){
      original(data,root);
      applyDreamRefinements(root);
    };
    window.renderRoadmapDreamPage.__bsDreamRefined=true;
  }
  wrap();
  window.BSApplyDreamRefinements=applyDreamRefinements;
})();
