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

Article.prototype.toHtml = function() {  //function that returns a function
  // TODO: Use handlebars to render your articles.
  //       - Get your template from the DOM.
  //       - Now "compile" your template with Handlebars.
  var source = $('#template-script').html();
  var template = Handlebars.compile(source);
  // $('.template').append(template(this));
  // DONE: If your template will use properties that aren't on the object yet, add them.
  //   Since your template can't hold any JS logic, we need to execute the logic here.
  //   The result is added to the object as a new property, which can then be referenced by key in the template.
  //   For example, you might want to display how old a post is, or say "(draft)" if it has no publication date:
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)'; //it is an if else in one line; truthy value (publish status) v false (draft); ternery operators

  // TODO: Use the function that Handlebars gave you to return your filled-in html template for THIS article.
  ;
  return template(this);
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) { // article objects
  articles.push(new Article(ele));
});

articles.forEach(function(a){ //call toHtml
  $('#articles').append(a.toHtml()); //append to the DOM
});
