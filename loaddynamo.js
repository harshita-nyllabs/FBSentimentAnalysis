
var AWS = require ('aws-sdk');

//aws.config is the global config object in the sdk
AWS.config.update(
	{
		region : "us-east-1", 
		endpoint : "https://dynamodb.us-east-1.amazonaws.com"
	}); 

var dynamodb = new AWS.DynamoDB();

var params =
	{
		TableName : "NYLIFeeds", 
		KeySchema: [       
        { AttributeName: "id", KeyType: "HASH"},  //Partition key
        { AttributeName: "status_type", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "status_type", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 20
    }
	};


dynamodb.createTable(params, function(err, data)
	{
		if(err)
		{
			console.log("unable to create table");
		} else
		{
			console.log("Table created");
		}

	});

