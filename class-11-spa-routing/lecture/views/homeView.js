(function(ctx){
  const homeView = {};

  //homeView.init = function(){
    //const $heading = $('h1')
    //heading.text('This is the home route');
  //};

  homeView.init = function(){
    const heading = document.querySelector('h1');
    const contacts = document.getElementById('contacts');
    contacts.style.display = 'none';
    heading.textContent = 'This is the home route';
  };

  ctx.homeView = homeView;
})(window)
