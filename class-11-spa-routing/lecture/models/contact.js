'use strict'

const contact = {
  name: 'Dan',
  email: 'danTheMan@hotmail.com'
};

contact.getEmail = function(name){
  return this[name].email;
}

contact.getEmail
