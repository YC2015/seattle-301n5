(function(module) {
  var adminController = {};

  Article.fetchAll(articleView.initAdminPage);

  adminController.index = function() {
      $('.tab-content').hide();
      $('#admin').show();
  };

  module.adminController = adminController;
})(window);
