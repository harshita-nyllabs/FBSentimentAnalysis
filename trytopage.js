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

var access_token = 'EAACEdEose0cBAPh4K8frNV8d5unXZAGG1i7ZBbmXlqCV666s8xuOnbrcaCZBGHhR9tX80yzevU2QmZBZB66BCKiBZCgeFZBdMuKP3ocvcuhDd0hapYgW4zmCkgRdrmZAwAIEfiZBUZBjzdFrDm5lBzvrZAZAReW9LBjirlcI5nrALnZBROAZDZD'




console.log("Getting data..");
graph.setVersion("2.6");
graph.setAccessToken(access_token);

var count =0;


function getFacebookData(url, callback) {
	console.log("Started");
	count= count+1;
    graph.get( url, function (error, res, body) {
            
            if(res.paging && res.paging.next) { 
            
            fs.appendFile('NYLFeeds'+count+'.json', JSON.stringify(res, null, 4), function(err)
   			 {
      			if(err) return console.log(err);      
    		});// if set, this is the next URL to query
                getFacebookData(res.paging.next, callback);
            } else {
            
                callback(); //Call when we are finished
            }
    
    });
}

var url = 'newyorklife/feed?fields=id,status_type,message,from,created_time&since=1325376000&limit=100';
console.log("Starting..");
getFacebookData(url, function () {
    console.log('We are done');
});




