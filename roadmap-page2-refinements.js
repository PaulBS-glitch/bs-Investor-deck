/* BuySooner Roadmap Page 2 refinements */
(function(){
  function applyPage2Refinements(root){
    if(!root||!root.querySelector)return;
    var cards=root.querySelectorAll('.rm2-choice-text');
    var wait=cards&&cards[0];
    var buy=cards&&cards[1];

    if(wait){
      var waitTitle=wait.querySelector('h3');
      if(waitTitle)waitTitle.textContent='Keep waiting';
      var waitItems=wait.querySelectorAll('.rm2-choice-list li');
      var waitCopy=['Chase a higher price.','Keep paying rent.','Stay stuck in “what if”.'];
      Array.prototype.slice.call(waitItems).forEach(function(li,i){
        var text=li.childNodes[1];
        if(waitCopy[i]){
          if(text){text.textContent=waitCopy[i];}
          else{li.appendChild(document.createTextNode(waitCopy[i]));}
        }
      });
    }

    if(buy){
      var buyTitle=buy.querySelector('h3');
      if(buyTitle)buyTitle.textContent='Move now';
      var buyItems=buy.querySelectorAll('.rm2-choice-list li');
      var buyCopy=['Own from day one.','Start building equity.','Put your cash into your home.'];
      Array.prototype.slice.call(buyItems).forEach(function(li,i){
        var text=li.childNodes[1];
        if(buyCopy[i]){
          if(text){text.textContent=buyCopy[i];}
          else{li.appendChild(document.createTextNode(buyCopy[i]));}
        }
      });
    }

    var styleId='roadmap-page2-refinements-style';
    if(!document.getElementById(styleId)){
      var s=document.createElement('style');
      s.id=styleId;
      s.textContent='.rm2-choice-text h3{margin-bottom:12px!important}.rm2-choice-list{gap:9px!important}.rm2-choice-list li{font-size:16.5px!important;line-height:1.32!important}.rm2-choice-text.buy h3{color:#087a78!important}';
      document.head.appendChild(s);
    }
  }

  function wrap(){
    if(!window.renderRoadmapPage2||window.renderRoadmapPage2.__bsPage2Refined)return;
    var original=window.renderRoadmapPage2;
    window.renderRoadmapPage2=function(data,root){
      original(data,root);
      applyPage2Refinements(root);
    };
    window.renderRoadmapPage2.__bsPage2Refined=true;
  }

  wrap();
  window.BSApplyPage2Refinements=applyPage2Refinements;
})();
