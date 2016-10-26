'use strict';

<<<<<<< HEAD
//page('/', callback); //to register (route, callback name)
//page('/about', callback);
//page('/contact', callback);
//page(); //to instantiate

page('/', homeController.init);
page('/contact', contactController.init);
=======
page('/', homeController.init);
page('/contact', contactController.init);
page('/contact/:banana', contactController.init);
page('*', homeController.error);
>>>>>>> 66abf5183d19a9c25622892da3888067f84b909b
page();
