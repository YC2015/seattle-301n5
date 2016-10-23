'use strict';

//page('/', callback); //to register (route, callback name)
//page('/about', callback);
//page('/contact', callback);
//page(); //to instantiate

page('/', homeController.init);
page('/contact', contactController.init);
page();
