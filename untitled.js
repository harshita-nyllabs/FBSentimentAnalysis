//1
var http = require('http'),
  graph = require('fbgraph'), 
  fs = require('fs');


var conf = {
    client_id:      '1747608095510575'
  , client_secret:  'Y260d7cd80a332962b1f015561f700e0c'
  //, scope:          'email, user_about_me, user_birthday, user_location, publish_stream'
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
    console.log('Data loaded');
});




