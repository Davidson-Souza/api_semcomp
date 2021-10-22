var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/help', function(req, res, next) {
  ///res.render('index', { title: 'Express' });
  res.end(`
  <meta charset="utf-8">
  root: /api/v1/<br>
  ┌──/users/<br>
  │    └─/login<br>
  │    └─/signup<br>
  │    └─/bookmark<br>
  ├──/recipes/<br>
  │    └─/read<br>
  │    └─/find<br>
  │    └─/submit<br>
  └──/help<br>
  
  ## users<br>
  ### login<br>
  #### Request<br>
  
  Method: POST<br>
  Content-Type: application/json<br>
  Body: {username:String, password:String}<br>
  
  #### Response<br>
  
  Content-Type: application/json<br>
  Body:{ok:Boolean, data:JSON}<br>
  Data: A JSON with "cookie" in case of success or "error" otherwise.<br>
  
  ### signup<br>
  #### Request<br>
  
  Method: POST<br>
  Comment: Creates a new user into the system<br>
  Content-Type: application/json<br>
  Body: {username:String, password:String}<br>
  
  #### Response<br>
  
  Content-Type: application/json<br>
  Body:{ok:Boolean, data:JSON}<br>
  Data: "error" if any, none otherwise.<br>
  
  ### bookmark<br>
  #### Request<br>
  
  Method: GET<br>
  Params: recipe_id<br>
  Cookie: String<br>
  Comment: Bookmark a recipe for the currently logged user<br>
  Content-Type: application/json<br>
  
  #### Response<br>
  
  Content-Type: application/json<br>
  Body:{ok:Boolean, data:String}<br>
  Data: "error" if any, none otherwise.<br>
  
  ## recipes<br>
  ### read<br>
  #### Request<br>
  
  Method: GET<br>
  Params: recipe_id<br>
  Description: Returns the requested recipe.<br>
  
  #### Response<br>
  
  Content-Type: application/json<br>
  Body:{ok:Boolean, data:JSON}<br>
  Data: Recipe or error, if any.<br>
  
  ### find<br>
  #### Request<br>
  
  Method: POST<br>
  Content-Type: application/json<br>
  Body: {[keywords_array]}<br>
  
  #### Response<br>
  
  Content-Type: application/json<br>
  Body:{ok:Boolean, data:JSON}<br>
  Data: A JSON with a vector containing the searching key.<br>
  
  ### submit<br>
  #### Request<br>
  
  Method: POST<br>
  Content-Type: application/json<br>
  Body: {username:String, password:String}<br>
  
  #### Response<br>
  
  Content-Type: application/json<br>
  Body:{ok:Boolean, data:JSON}<br>
  Data: A JSON with recipes id.<br>`);
});

module.exports = router;
