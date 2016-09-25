'use strict';

// IN-CLASS TODID: Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {
};

articleView.populateFilters = function() {
  console.log(1);
  $('article').not('.template').each(function() {
    var authorName, category, optionTag;
    authorName = $(this).find('address a').text();
    optionTag = '<option value="' + authorName + '">' + authorName + '</option>';
    $('#author-filter').append(optionTag);
    category = $(this).attr('data-category');
    optionTag = '<option value="' + category + '">' + category + '</option>';
    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      console.log(3);
      /* TODID: If the slect box changes to an option that has a value, we should:
          1. Hide all of the articles
          2. Fade in only the articles that match based on on the author
            that was aselected. Hint: use an attribute selector to find
            those articles that match the value, and then fade them in.
        */
      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();
    } else {
        /* Otherwise, we should:
        1. Show all the articles except the template */
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  /* TODID: Just like we do for #author-filter above, we should also handle
  change events on the #category-filter element. Be sure to reset the
  #author-filter while you're at it! */
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};


articleView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    /* TODID:
      1. Hide all of the .tab-content sections
      2. Fade in the single .tab-content section that is
        associated with the .tab element's data-content attribute.
    */
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();


  });
  $('.main-nav .tab:first').click();
};

articleView.toggleNavDisplay = function() {
  // TODID: add an event handler to toggle the nav menu's display property
  // in mobile mode when the hamburger menu is clicked
  $('.icon-menu').on('click', function (){
    $('#nav').toggle(500);
  });

};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  /* TODID: Add a delegated event handler to reveal the remaining paragraphs.
    When a .read-on link is clicked, we can:
    1. Prevent the defaul actionof a link.
    2. Reveal everything in that particular article now.
    3. Hide that read-on link!
    // STRETCH GOAL: change the 'Read On' link to 'Show Less'
  */
  $('#articles').on('click', '.read-on', function(event){
    event.preventDefault();
    console.log($(this).parent());
    $(this).parent().find('.article-body').children().fadeIn();
  });
};

articleView.doTheThings = function() {
  console.log(2);
  articleView.populateFilters();
  articleView.toggleNavDisplay();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
};

articleView.doTheThings();
// TODO: Invoke all of the above methods!:
