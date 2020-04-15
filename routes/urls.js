var express = require('express');
var router = express.Router();

const fs = require('fs');

let rawdata = fs.readFileSync('json/urls.json', 'utf-8');
let users = JSON.parse(rawdata);  

/*******************************************************
*  GET user listing. 
********************************************************/
router.get('/', function(req, res, next) {
  res.send(users);
});

/*******************************************************
* POST/Create new user
********************************************************/
router.post('/', function(req, res, next){
  // Get current id
  let max = 0;
  users.forEach(function(elem){
    if(elem._id > max) max = elem._id;
  });

  // Create new post
  let newU = {};
  newU._id = max+1;
  newU.name = req.body.name;
  newU.url = req.body.url;

  users.push(newU);
  /********************************************* 
	* Update user file
	*********************************************/
	fs.writeFile('json/urls.json', JSON.stringify(users), 'utf8', function(err) {
      if (err) throw "Couldn't write user file!"+err;
    }
  );
  res.contentType('application/json');
  res.send(newU);
});

/*******************************************************
* DELETE uniq user
********************************************************/
router.delete('/:id', function(req, res, next){
  var id = req.params.id;
	var del=-1;

	for(var i=0; i < users.length; i++){
    if(users[i]._id == id) del = i; // Find the array index that holds _id = id
    console.log(i);    
	} 
	if(del>=0) status=users.splice(del, 1); // Delete element and rearrange the array indexes

	/********************************************* 
	* Update user file
	*********************************************/
	fs.writeFile('json/urls.json', JSON.stringify(users), 'utf8', function(err) {
    if (err) throw "Couldn't write user file!"+err;
  }
  );
	res.send(users);
});


module.exports = router;
