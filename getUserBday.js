//1
var http = require('http'),
	 graph = require('fbgraph'), 
  fs = require('fs'),
  path = require('path');




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

var access_token = 'EAACEdEose0cBABjMtbaoZAdWN11YqakTeydWuDES4kDKhtiZC1sVyqNt1XD2nZBLFMsdBbaJT4Coh3w3Rl4jPZCUyEoq4gI0xaHF3kLMnSQOOuhlvwYCdkppB2KXNZA3BuvINV3zo9fdL7TYctsDz9ZAOfHAragOaPKxGcFnoClAZDZD'


console.log("Getting data..");
graph.setVersion("2.6");
graph.setAccessToken(access_token);

var count =0;
//var obj =JSON.parse('[]';


function readUserIDFile(file)
{ 
  //console.log(fil);
  
      var allUsers = JSON.parse(fs.readFileSync(file, 'utf8'));
      allUsers.forEach(function(user)
      {
      	if(user.id != 113373749451 && user.id !=null)
		{ graph.get(user.id+'?metadata=1&fields=metadata{type}', function (error, res, body) {
            	//console.log(res.metadata);
            	if(res.metadata.type == 'user')
  				{
  				 graph.get( user.id+'?fields=id,name,birthday', function (error, res, body) {
            	console.log(res);
    
    		});
  			}

    
    		});
		
  		}
      }); 
    
}


readUserIDFile('userDetails123.json');













