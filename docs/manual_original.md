root: /api/v1/
┌──/users/
│     └─/login
│     └─/signup
│     └─/bookmark
├──/recipes/
│     └─/read
│     └─/find
│     └─/submit
└──/help

## users
### login
#### Request

Method: POST
Content-Type: application/json
Body: {username:String, password:String}

#### Response

Content-Type: application/json
Body:{ok:Boolean, data:JSON}
Data: A JSON with "cookie" in case of success or "error" otherwise.

### signup
#### Request

Method: POST
Comment: Creates a new user into the system
Content-Type: application/json
Body: {username:String, password:String}

#### Response

Content-Type: application/json
Body:{ok:Boolean, data:JSON}
Data: "error" if any, none otherwise.

### bookmark
#### Request

Method: GET
Params: recipe_id
Cookie: String
Comment: Bookmark a recipe for the currently logged user
Content-Type: application/json

#### Response

Content-Type: application/json
Body:{ok:Boolean, data:String}
Data: "error" if any, none otherwise.

## recipes
### read
#### Request

Method: GET
Params: recipe_id
Description: Returns the requested recipe.

#### Response

Content-Type: application/json
Body:{ok:Boolean, data:JSON}
Data: Recipe or error, if any.

### find
#### Request

Method: POST
Content-Type: application/json
Body: {[keywords_array]}

#### Response

Content-Type: application/json
Body:{ok:Boolean, data:JSON}
Data: A JSON with a vector containing the searching key.

### submit
#### Request

Method: POST
Content-Type: application/json
Body: {username:String, password:String}

#### Response

Content-Type: application/json
Body:{ok:Boolean, data:JSON}
Data: A JSON with recipes id.