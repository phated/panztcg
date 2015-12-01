'use strict';

function homeHandler(request, reply){
  reply.redirect('/cards');
}

module.exports = homeHandler;
