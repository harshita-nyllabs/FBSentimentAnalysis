//1
var fs = require('fs'),
  path = require('path');
var result =[];


fs.readdir(__dirname+'/FBFeeds/', function(err, files) {
    if (err) return;
    files.forEach(function(f) {
   if(path.extname(f) == '.json')
    {
      var allFeeds = JSON.parse(fs.readFileSync('FBFeeds/'+f, 'utf8'));
      allFeeds.data.forEach(function(feed)
      {
       result.push({'id' : feed.from.id});
      }); 
    }
    });
    writeToFile(result);
});


function writeToFile(res)
{
  fs.appendFile('userDetails123.json',JSON.stringify(res,4 ,null), function(err)
         {
           if(err) return console.log(err);      
       });//



}













