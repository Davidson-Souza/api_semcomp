root: /api/v1/  

┌── /users/  
│     └─ /create  
│     └─ /update  
│     └─ /get  
│     └─ /bookmark  
│     └─ /auth   
├── /recipes/  
│     └─ /read  
│     └─ /find  
│     └─ /submit  
└──/help

## users
### create
#### Request

```
Method: POST  
Description: Creates a new user
Access-Level: Default
Content-Type: application/json  
Body: {username:String, password:String, email: String}  
```

#### Response

```
Content-Type: application/json
Body: {ok:Boolean, data: String}  
Data: Error message, if any
```
## update
#### Request

```
Method: POST  
Description: Update an existing user
Access-Level: Logged
Content-Type: application/json  
Body: {username:String, password:String, email: String}  
```

#### Response

```
Content-Type: application/json
Body: {ok:Boolean, data:String}  
Data: error message, if any. None otherwise
```

## get

#### Request

```
Description: Returns the user's data
Method: GET  
Access-Level: Logged
```

#### Response

```
Content-Type: application/json
Body: {ok:Boolean, data:JSON}  
Data: An user object if any, error message otherwise
```

## bookmark

#### Request

```
Description: Bookmarks a recipe for the current user
Request-Param: Recipe id
Method: GET  
Access-Level: Logged
```

#### Response

```
Content-Type: application/json
Body: {ok:Boolean, data:String}  
Data: An error message, if any
```

## auth

#### Request

```
Description: Create a new jwt token
Request-Param: User's email and password (order matters)
Method: GET  
Access-Level: Default
```

#### Response

```
Content-Type: application/json
Body: {ok:Boolean, data:String}  
Data: A jwt token, or error message, if any
```
## Recipes
### Read
#### Request

```
Description: Return a recipe object
Request-Param: Recipe id
Method: GET  
Access-Level: Default
```

#### Response

```
Content-Type: application/json
Body: {ok:Boolean, data:String}  
Data: A recipe object, or error
```

### find
#### Request

```
Description: Look for a recipe by some keyword
Request-Param: plus sign separated query args
Method: GET  
Access-Level: Default
```

#### Response

```
Content-Type: application/json
Body: {ok:Boolean, data:String}  
Data: A list of matching recipes, or error
```

### Submit
#### Request

```
Description: Creates a new recipe
Method: POST 
Body: {name: String, ingredients: [String], howto: String, tags: [String]} 
Access-Level: Logged
```

#### Response

```
Content-Type: application/json
Body: {ok:Boolean, data:String}  
Data: The id of the newly created recipe, or error
```

