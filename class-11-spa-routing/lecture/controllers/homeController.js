(function(ctx){
  const homeController = {};

  homeController.init = function(){
    homeView.init();
  }

  ctx.homeController = homeController;
})(window)
