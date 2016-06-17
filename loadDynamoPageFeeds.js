var AWS = require('aws-sdk');
var fs = require('fs');

//aws.config is the global config object in the sdk
AWS.config.update(
	{
		region : "us-east-1", 
		endpoint : "https://dynamodb.us-east-1.amazonaws.com"
	}); 

var docClient = new AWS.DynamoDB.DocumentClient();

var allFeeds = JSON.parse(fs.readFileSync('NYLFeeds1.json', 'utf8'));
allFeeds.data.forEach(function(feed)
	{
		var params = {
			TableName: "NYLIFeeds", 
			Item: {
				"id": feed.id,
            	"status_type": feed.status_type,
            	"message": feed.message,
            	"from": feed.from,
            	"created_time": feed.created_time
			}
		};

		docClient.put(params, function(err, data) {
       	if (err) {
           console.error("Unable to add feed", feed.id, ". Error JSON:", JSON.stringify(err, null, 2));
       	} else {
           console.log("PutItem succeeded:", feed.id);
       	}
    });

	});