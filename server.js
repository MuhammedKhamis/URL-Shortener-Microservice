var express = require('express');
var app = express();

const urlRegex = require('url-regex');

var mongo = require('mongodb');

var mongoClient = mongo.MongoClient;

var url = process.env.MONGOLAB_URI;

var collectionName = process.env.COLLECTION;

app.use(express.static('public'));


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/new/:url*", function (request, response) {
  var original_url = request.url.slice(5);
  var goodUrl = urlRegex({ exact: true, strict: true }).test(original_url);
  var result = {};
  if(goodUrl){
       result = saveElement(original_url);
       result.short_url =  'https://clumsy-meal.glitch.me/'+ result.short_url; 
  }else{
       result.error = 'Wrong url format, make sure you have a valid protocol and real site.';
  }
  sendResponse(response,result);
});

app.get("/:url", function (request, response) {
    var short_url = Number(request.params.url);
    var result = {};
    if(short_url){
         findElement(short_url,response);
    }else{
      result.error = 'This url is not on the database.';
      sendResponse(response,result);
    }
});

  
function sendResponse(response,result){
    result = addPre(JSON.stringify(result));
    response.send(result);
  }

function findElement(element,response){
    return mongoClient.connect(url,function(err,db){
      var collection = db.collection(collectionName);
      return collection.find({short_url : element},{ _id:0,short_url:0 })
        .toArray(function(err,data){
        db.close();
        var result = data[0];
         if(result){
            response.redirect(result.original_url);
        }else{
            result =  {error : 'This url is not on the database.' };
            sendResponse(response,result);
        }
      });
  });
}

function saveElement(element){
  var randNum = generateRandomNumber();
  var result = {
      original_url: element,
      short_url : randNum
  }
  mongoClient.connect(url,function(err,db){
    if (err) throw err;
    var collection = db.collection('urls');
    collection.insert(result,function(err,data){
      if (err) throw err;
      db.close();
    });
  });
  return Object.assign({}, result);
}

function generateRandomNumber(){
  return Math.floor(1000 + Math.random() * 10000);
}

function addPre(result){
  return '<pre>' + result + '</pre>';
}



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
