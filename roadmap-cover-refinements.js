/* BuySooner Roadmap Cover refinements */
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c];});}
  function firstName(name){var s=String(name||'Alex').trim();return s.split(/\s+/)[0]||s||'Alex';}
  function applyCoverRefinements(data,root){
    if(!root||!root.querySelector)return;
    var d=data||{},b=d.broker||{};
    var brokerName=String(b.name||b.brokerName||'Alex').trim()||'Alex';
    var brokerFirst=firstName(brokerName);
    var items=root.querySelectorAll('.rmc-index li');
    var replacements=[
      ['Your goal, deposit gap and BuySooner Boost','Explains how BuySooner bridges your savings gap today so you can stop the &quot;what-ifs&quot; and start buying immediately.'],
      ['What waiting could cost you','Shows how delaying your purchase could affect you through rising prices and wasted rent.'],
      ['Your numbers, worked through clearly','Delivers total financial transparency with a clear, real-world breakdown of how the structure works.'],
      ['Your path to 100% ownership','Outlines your clear roadmap to transitioning into traditional homeownership.'],
      ['Questions, answers and who to call','Gives you direct answers to your biggest questions and access to your expert team.'],
      ['Important disclosures and next steps','Sets out the rules of engagement and shows exactly what happens next.']
    ];
    Array.prototype.slice.call(items).forEach(function(item,i){
      var strong=item.querySelector('strong'),p=item.querySelector('p');
      if(replacements[i]){
        if(strong)strong.textContent=replacements[i][0];
        if(p)p.innerHTML=replacements[i][1];
      }
    });
    var brand=root.querySelector('.rmc-bottom-brand');
    if(brand&&brand.parentNode){brand.parentNode.removeChild(brand);}
    var help=root.querySelector('.rmc-help p');
    if(help){help.innerHTML='<strong>'+esc(brokerFirst)+'</strong> and the BuySooner team are here to help you understand the benefits, trade-offs and risks before you move forward.';}
    var styleId='roadmap-cover-refinements-style';
    if(!document.getElementById(styleId)){
      var s=document.createElement('style');
      s.id=styleId;
      s.textContent='.rmc-contents{margin-top:30px!important}.rmc-contents h2{margin-bottom:18px!important}.rmc-index li{padding:21px 0 23px!important;grid-template-columns:50px 1fr!important;gap:19px!important}.rmc-index span{width:38px!important;height:38px!important;font-size:16.5px!important}.rmc-index strong{font-size:22.8px!important;margin-bottom:7px!important}.rmc-index p{font-size:17.8px!important;line-height:1.5!important}.rmc-footer-wrap{bottom:34px!important}.rmc-help{margin-bottom:14px!important}.rmc-actions{bottom:124px!important}@media(max-width:900px){.rmc-index li{padding:17px 0 18px!important;grid-template-columns:46px 1fr!important;gap:16px!important}.rmc-index strong{font-size:19px!important}.rmc-index p{font-size:15.2px!important}}';
      document.head.appendChild(s);
    }
  }
  function wrap(){
    if(!window.renderRoadmapCover||window.renderRoadmapCover.__bsCoverRefined)return;
    var original=window.renderRoadmapCover;
    window.renderRoadmapCover=function(data,root){
      original(data,root);
      applyCoverRefinements(data,root);
    };
    window.renderRoadmapCover.__bsCoverRefined=true;
  }
  wrap();
  window.BSApplyCoverRefinements=applyCoverRefinements;
})();