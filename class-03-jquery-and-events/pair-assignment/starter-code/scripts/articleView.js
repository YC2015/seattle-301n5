'use strict'; //put at the top of every js file; it enables ECMAS 6 (2015 version)

// IN-CLASS TODID: Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {
};

articleView.populateFilters = function() {
  console.log(1);
  $('article').not('.template').each(function() {
    var authorName, category, optionTag;
    authorName = $(this).find('address a').text(); // 'address a' is any address element with a descendent of a and .text() is the getter
    optionTag = '<option value="' + authorName + '">' + authorName + '</option>';
    $('#author-filter').append(optionTag);
    category = $(this).attr('data-category');
    optionTag = '<option value="' + category + '">' + category + '</option>';
    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag); // if this value doesn't exist yet, we will append this option tag to the category filter; this is so the filter doesn't have multiple categories with the same value (or else would have too many)
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      console.log(3); // texte
      /* TODID: If the slect box changes to an option that has a value, we should:
          1. Hide all of the articles
          2. Fade in only the articles that match based on on the author
            that was aselected. Hint: use an attribute selector to find
            those articles that match the value, and then fade them in.
        */

        // start----> this section was different from our group code
      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();
    } else {
        /* Otherwise, we should:
        1. Show all the articles except the template */
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val(''); // clears the category filter
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
//this section was different from our group code <--- end


articleView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() { // '.tab' helps to delegate within the main nav menu; class in main nav menu; delegation is good for when using event handlers on elements that don't exist yet or are dynamic (dynamically add events)
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
    $('#nav').toggle(500); // $('.main-nav ul').toggle(500);
  });

};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // getting on class article body, getting all of the descendents (* selector for all), get the first two elements and hide anything thereafter
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
    $(this).parent().find('.article-body').children().fadeIn(); // '.article-body *nth-of-type(n+2)'
    //if ($(this).text().includes('Read')){
     //$(this).text('Show Less');
      //{ else {
      //$(this).text('Read On');
    //}}
  //}
  });
};

//$(function() { all the functions}); fire when the DOM fire
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
