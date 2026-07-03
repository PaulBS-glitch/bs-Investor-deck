/* BuySooner Roadmap Page 1 mobile layout fix */
(function(){
  function addMobileFix(){
    var id='roadmap-page1-mobile-fix-style';
    if(document.getElementById(id))return;
    var s=document.createElement('style');
    s.id=id;
    s.textContent=`
@media(max-width:760px){
  .roadmap-page{
    width:100%!important;
    max-width:100%!important;
    min-width:0!important;
    padding:18px 14px!important;
    overflow:hidden!important;
  }
  .roadmap-page *{
    max-width:100%;
    box-sizing:border-box;
  }
  .rm-grid,
  .rm-hero,
  .rm-pathway-grid,
  .rm-next-wrap,
  .rm-topbar{
    display:grid!important;
    grid-template-columns:1fr!important;
    width:100%!important;
    min-width:0!important;
  }
  .rm-data-card{
    width:100%!important;
    min-width:0!important;
    padding:20px 16px!important;
    overflow:hidden!important;
  }
  .rm-data-card h2{
    font-size:clamp(24px,7.2vw,30px)!important;
    line-height:1.08!important;
    overflow-wrap:anywhere!important;
  }
  .rm-small,
  .rm-section-header p{
    white-space:normal!important;
    overflow-wrap:anywhere!important;
  }
  .rm-table,
  .rm-table tbody,
  .rm-table tr,
  .rm-table td{
    display:block!important;
    width:100%!important;
    max-width:100%!important;
  }
  .rm-table tr{
    padding:12px 0!important;
    border-bottom:1px solid #d7e5e4!important;
  }
  .rm-table td{
    border-bottom:0!important;
    padding:0!important;
    text-align:left!important;
    white-space:normal!important;
    overflow-wrap:anywhere!important;
    word-break:normal!important;
  }
  .rm-table td:first-child{
    padding-right:0!important;
    margin-bottom:5px!important;
    color:#64748b!important;
    font-size:12.5px!important;
    font-weight:800!important;
    text-transform:none!important;
  }
  .rm-table td:last-child{
    color:#071f3a!important;
    font-size:16px!important;
    line-height:1.28!important;
    font-weight:950!important;
    text-align:left!important;
    white-space:normal!important;
  }
  .rm-image-card{
    width:100%!important;
    justify-self:stretch!important;
  }
  .rm-next-btn,
  .rm-back-btn{
    width:100%!important;
    white-space:normal!important;
  }
}
`;
    document.head.appendChild(s);
  }
  addMobileFix();
  if(typeof window.renderRoadmapPage1==='function'&&!window.renderRoadmapPage1.__bsMobileFixed){
    var original=window.renderRoadmapPage1;
    window.renderRoadmapPage1=function(data,root){
      addMobileFix();
      original(data,root);
      addMobileFix();
    };
    window.renderRoadmapPage1.__bsMobileFixed=true;
  }
})();
