// Run this and demo execution order.
// Try different methods to ensure correct execution.
$.get('dialog/speech.txt', function (data) { //AJAX call takes a while; asychronous call
  console.log(data); //after .get returns a value, this will come in 3rd
  console.log('I should come first.'); //4th? 
});

console.log('I should come second.'); //1st in order of appearance; console.log is a synchronous call
console.log('I should come third!'); //2nd

// Call stack - like a stack of plates
// JS can only execute one command at time, synchronous; Get will not return until our synchronous calls are made
