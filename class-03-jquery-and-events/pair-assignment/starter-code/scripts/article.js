'use strict';

var articles = [];

function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone(); // class next to the element selector
  $newArticle.removeClass('template'); // important to remove class so when finished product is appended, it's in the dom but we only get back the one template

  $newArticle.attr('data-category', this.category);
  // TODID: Use jQuery to also add the author name as a data-attribute of the newly cloned article.
  //       Doing so will allow us to use selectors to target articles, based on who wrote them.
  $newArticle.attr('data-author', this.author);

  $newArticle.find('.byline a').text(this.author);
  $newArticle.find('.byline a').attr('href', this.authorUrl);
  $newArticle.find('h1:first').text(this.title); // vanilla .textContent = this.title
  $newArticle.find('.article-body').html(this.body); // vanilla  .innerHTML == this.body
  $newArticle.find('time[pubdate]').attr('datetime', this.publishedOn);
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn); // searchable for google
  $newArticle.find('time').text('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
  return $newArticle;  // returns branch of the DOM tree; section builder
};

rawData.sort(function(a,b) { // organizing by the date; comparing which is newer
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

//.sort - working two parameters; is a smaller than b? yes so a stays the same, and b moves to the next one

rawData.forEach(function(ele) { //push from raw data into new article
  articles.push(new Article(ele)); // ele represents each item in an index in an array in this case each article object
});

articles.forEach(function(a){ //append to html for each
  $('#articles').append(a.toHtml()); // a like ele handling one object in array
}); // this invokes to html on the object and appends it to #articles
