//1
var http = require('http'),
	express = require('express'),
	path = require('path'),
  graph = require('fbgraph'), 
  fs = require('fs');

var app = express();
app.set('port', process.env.PORT || 3000);


app.use(express.static(path.join(__dirname, 'public'))); //This tells Express to use the middleware express.static which serves up static files in response to incoming requests.


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

console.log('Server running on port 3000.');



var conf = {
    client_id:      '1747608095510575'
  , client_secret:  'Y260d7cd80a332962b1f015561f700e0c'
  //, scope:          'email, user_about_me, user_birthday, user_location, publish_stream'
  , redirect_uri:   'http://localhost:3000/auth/facebook'
};


var options = {
    timeout:  3000
  , pool:     { maxSockets:  Infinity }
  , headers:  { connection:  "keep-alive" }
};

var access_token = 'EAAY1cLe9UC8BAOIY60ijJawISs5Yz4oZCpnffRTZCXNNpS8a7NZBW6XZAQNxQS5eYqfjFfi0asxP8D0whDK4qC2rHfSuUkfy4PCg2LXz0ZCg95HcOdlaVZBWYXFrGfu5f5tgjwXZCVts01zvuP4TcTEOTSgPhGuhetC7olhMc8f4QZDZD'


console.log("Getting data..");
graph.setVersion("2.4");
graph.setAccessToken(access_token);

graph
  .setOptions(options)
  .get("newyorklife/feed?fields=id,status_type,message,from&limit=100", function(err, res)
  {
      
    fs.writeFile('PageFeedsTry.json', JSON.stringify(res, null, 4), function(err)
    {
      if(err) return console.log(err);
      console.log("File Written");
      
    });
  });


