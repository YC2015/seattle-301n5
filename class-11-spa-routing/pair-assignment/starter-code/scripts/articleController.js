(function(module) {
  var articlesController = {};

  // TODID: Create the `articles` table when the controller first loads, with the code that used to be in index.html:
    Article.createTable();

  // TODID: Setup a function that kicks off the fetching and rendering of articles, using the same
  // code that used to be in index.html.

    Article.fetchAll(articleView.initIndexPage);

  // TODID: Also be sure to hide all the main section elements, and reveal the #articles section:
  articlesController.index = function() {
      $('.tab-content').hide();
      $('#articles').show();
  };

  module.articlesController = articlesController;
})(window);
