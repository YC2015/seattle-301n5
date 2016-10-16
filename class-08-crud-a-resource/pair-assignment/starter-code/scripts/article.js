'use strict'; //prevents you from doing certain things

(function(module) {
  function Article (opts) {
    // DONE: Convert property assignment to Functional Programming style. Now, ALL properties
    // of `opts` will be assigned as properies of the newly created article object.
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e]; //useful because you can build with differing number of properties
    },this);
  }

  Article.all = [];

  Article.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);

    return template(this);//passing template into Handlebars returns a js function, so value of template is a function; returning value of this instance into the template
  };

  // TODID: Set up a DB table for articles.
  Article.createTable = function(callback) {
    webDB.execute('CREATE TABLE IF NOT EXISTS articles('+
                  'id INTEGER PRIMARY KEY,'+ // Is the library creating a key for you and more?
                  'title VARCHAR(100) NOT NULL,'+
                  'category VARCHAR(50) NOT NULL,'+
                  'author VARCHAR(100) NOT NULL,'+
                  'authorUrl VARCHAR(200) NOT NULL,'+
                  'publishedOn VARCHAR(11) NOT NULL,'+
                  'body VARCHAR(10000) NOT NULL);', // what SQL command do we run here inside these quotes?
      function(result) {
        console.log('Successfully set up the articles table.', result);
        if (callback) callback(); // if a call back exists, the callback will get run
      }
    );
  };

  // TODID: Use correct SQL syntax to delete all records from the articles table.
  Article.truncateTable = function(callback) { //kinda like a global function
    webDB.execute('DELETE * FROM articles', // <----finish the command here, inside the quotes.
      callback
    );
  };


  // TODID: Insert an article instance into the database:
  Article.prototype.insertRecord = function(callback) { //interacting with specific data with each instance so each instance has direct access to it
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO articles(title, category, author, authorUrl, publishedOn, body) VALUES(?, ?, ?, ?, ?, ?);', //questions marks are part of the html5 library not strict sql
          'data': [this.title, this.category, this.author, this.authorUrl, this.publishedOn, this.body],
        }
      ],
      callback
    );
  };

  // TODID: Delete an article instance from the database:
  Article.prototype.deleteRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM articles WHERE id=?;', // when using title, itwould delete with any matching title so id is better
          'data': [this.id]
        }
      ],
      callback
    );
  };

  // TODID: Update an article instance, overwriting it's properties into the corresponding record in the database:
  Article.prototype.updateRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'UPDATE articles SET title=?, category=?, author=?, authorUrl=?, publishedOn=?, body=? WHERE id=?',
          'data': [this.title, this.category, this.author, this.authorUrl, this.publishedOn, this.body, this.id],
        }
      ],
      callback
    );
  };

  // DONE: Refactor to expect the raw data from the database, rather than localStorage.
  Article.loadAll = function(rows) { // will be passing records from a table
    Article.all = rows.map(function(ele) {
      return new Article(ele); //returns a new article instance into an array that become Article.all
    });
  };

  // TODID: Refactor this to check if the database holds any records or not. If the DB is empty,
  // we need to retrieve the JSON and process it.
  // If the DB has data already, we'll load up the data (sorted!), and then hand off control to the View.
  Article.fetchAll = function(callback) {
    webDB.execute('SELECT * FROM articles;', function(rows) { // TODID: fill these quotes to 'select' our table.
      if (rows.length) {
        // TODID: Now, 1st - instanitate those rows with the .loadAll function,
        Article.loadAll(rows);
        // and 2nd - pass control to the view by calling whichever function argument was passed in to fetchAll.
        callback();
      } else {//runing first time start here
        $.getJSON('/data/hackerIpsum.json', function(rawData) {
          // Cache the json, so we don't need to request it next time:
          rawData.forEach(function(item) {
            var article = new Article(item); // Instantiate an article based on item from JSON
            // TODID: Cache the newly-instantiated article in the DB: (what can we call on each 'article'?)
            article.insertRecord(() => console.log('Successfully inserted record.'));
          });
          // Now get ALL the records out the DB, with their database IDs:
          webDB.execute('SELECT * FROM articles;', function(rows) { // TODID: select our now full table
            // TODID: Now, 1st - instanitate those rows with the .loadAll function,
            Article.loadAll(rows);//create article instances inside Article.all array
            // and 2nd - pass control to the view by calling whichever function argument was passed in to fetchAll.
            callback();
          });
        });
      }
    });
  };

  Article.allAuthors = function() {
    return Article.all.map(function(article) {
      return article.author;
    })
    .reduce(function(names, name) {
      if (names.indexOf(name) === -1) {
        names.push(name);
      }
      return names;
    }, []);
  };

  Article.numWordsAll = function() {
    return Article.all.map(function(article) {
      return article.body.match(/\b\w+/g).length;
    })
    .reduce(function(a, b) {
      return a + b;
    });
  };

  Article.numWordsByAuthor = function() {
    return Article.allAuthors().map(function(author) {
      return {
        name: author,
        numWords: Article.all.filter(function(a) {
          return a.author === author;
        })
        .map(function(a) {
          return a.body.match(/\b\w+/g).length
        })
        .reduce(function(a, b) {
          return a + b;
        })
      }
    })
  };

  Article.stats = function() {
    return {
      numArticles: Article.all.length,
      numWords: Article.numwords(),
      Authors: Article.allAuthors(),
    };
  }

  module.Article = Article;
})(window);
