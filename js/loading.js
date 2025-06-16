
setTimeout(function () {
  const loading = document.getElementById("loading");
  const pageContent = document.getElementById("page-content");

  if (loading && pageContent) {
    loading.style.display = "none"; // 隐藏加载动画
    pageContent.style.display = "block"; // 显示页面内容
  }
}, 2000); // 延迟 2 秒

$(function(){
   $("#Loadanimation").fadeOut(500);
});
