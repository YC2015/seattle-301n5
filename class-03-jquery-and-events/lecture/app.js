//data attributes, a way of attaching arb information to any html element, give a name of data- whatever, and value a string of whatever you want

//nav handler
$('nav').on('click', 'a', function () {
  var $whereToGo = $(this).data('tab');  // this is anchor tag and data to grab the data attribue
  //console.log($whereToGo); - now we have value
  //$('#delegation').show(); - this would be the case for just showing delegation but we want to to with attributes also
  $('.tab-content').hide()
  $('#' + $whereToGo).show()
})

//event logger
function logTarget() {
  console.log(this);
  console.log($(this));

  var $target = $(this).text(); // gets target element, saves in target variable
  var $newFeedback = $('#feedback p:first-child').clone(); //cloned empty p

  $newFeedback.text('You clicked on ' + $target); // gives empty p text
  $('#feedback').append($newFeedback); // appends back
}

//not delegated - event bound to all the 'li's
//no selector specified in .on() method
// not delegated - has to be bound to the exact elements you want to listen on; good when things are not going to change
//$('#menu1').on('click', logTarget); //event listener on whole list
$('#menu1 > li').on('click', logTarget); //event listener on individual lis

//delegated - event is bound to parent
// will attached event handler to menu 2. If we click on an li, it will bubble up the DOM to ul of menu 2 and will catch it as it goes up. Good for when we will add to the DOM.
//'li' is specified in .on()
$('#menu2').on('click', 'li', logTarget);


//button handlers
//adder1 using name attribute
$('button[name="adder1"]').on('click', function(){
  var $newLi = $('#menu1 li:first-child').clone(); // looking for li that is the first child of menu1
  $newLi.text('new Menu1 el');
  $('#menu1').append($newLi);
})

//adder2 delegation - add event listener to container and when elements show up later that event listener will still work unlike on menu 1 (ex. when you click, there is a change); elements added later will still have events work on them
$('button[name="adder2"]').on('click', function(){
  var $newLi = $('#menu2 li:first-child').clone(); // looking for li that is the first child of menu2
  $newLi.text('new Menu2 el');
  $('#menu2').append($newLi);
})

//clear - want to remove all ps except the first one (so we can still have template to clone)
$('button[name="clear"]').on('click', function(){
  $('#feedback > p:first-child').siblings().remove();
})

//checkbox handler - change event.
//shows difference between attr & prop
$('input[name=check]').on('change', function() {
  var $checkbox = $(this);

  $('#checked-state').html('.attr("checked"): ' + $checkbox.attr('checked') + '<br>.prop( "checked" ): ' + $checkbox.prop('checked'));

}).change();

//select box filtering
$('select[name="icecream"]').on('change', function(){
  var $flavor = $(this).val();
  $('img').hide()
  $('img[data-flavor="' + $flavor + '"]').show()

})


//DOM-ready function - as soon as DOM is ready, will run function calls inside here; in this case we hide the tab content section when DOM loads
$(document).ready(function() {
  $('.tab-content').hide()
})
