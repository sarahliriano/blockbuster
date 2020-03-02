var fs = require('fs');
var data = fs.readFileSync('characters.json');
var characters = JSON.parse(data);
console.log(characters);

// console.log('server is starting');

var express = require('express');
var app = express();
var server = app.listen(3000, listening);

function listening(){
  console.log("Listening..." );
}

app.use(express.static('public'));

app.get('/add/:character/:movie', addcharacter);

function addcharacter(request, response){
  var data = request.params;
  var character = data.character;
  var movie = data.movie;
  var reply;
  if(!movie){
    reply = {
      msg: "movie is required"
    }
  }else{
    characters[character] = movie; 
    reply= {
      msg: "Thank you for your character",
      character: character,
      movie: movie
    }
    var data = JSON.stringify(characters, null, 2);
    fs.writeFile('characters.json', data, finished);

    function finished(err){
      console.log('all set.');
      reply = {
        character: character,
        movie: movie,
        staus: "success"
      }
      
    }
  }
  response.send(reply);
  
}

app.get('/all', sendAll);

function sendAll(request, response){
  response.send(characters);
}

app.get('/search/:character', searchcharacter);

function searchcharacter(request, response) {
  var character = request.params.character;
  var reply;
  if(characters[character]){
    reply = {
      status: "found",
      character: character,
      movie: characters[character]
    }
  }else{
    reply = {
      status: "not found",
      character: character
    }
  }
  response.send(reply);
}