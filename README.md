# http-monitor

[![Build Status](https://cloud.drone.io/api/badges/smf8/http-monitor/status.svg)](https://cloud.drone.io/smf8/http-monitor)

A HTTP endpoint monitor service written in node js with RESTful API.

- [Installation](#Installation)
- [API](#API)

## Installation

- Make sure node js is installed properly.

- Download project inside the folder run this command

  ```
  npm install
  ```
  
## API

### Specs:

For all requests and responses we have `Content-Type: application/json`.

Authorization is with JWT.

#### User endpoints:

**Login:**

`POST /api/v1/users/login`

request structure: 

```
{
    "email":"sepehrtvk2001@gmail.com",
    "password":"12345678"// len > 8
}
```

**Sign Up:**

`POST /api/v1/users/singup`

request structure (same as login):

```
{
    "name":"sepehr",
    "email":"sepehrtvk20001@gmail.com",
    "password":"12345678",
    "passwordConfirm":"12345678"
}
```

#### URL endpoints:

**Create URL:**

`POST /api/v1/urls`

request structure:

```
{
    "endPoint":"http://aut.ac.ir",
    "thereshold":4,
    "userId":"63cb8ce873c61c7de5c53a31"
}
```

##### **Get user URLs:**

`GET /api/v1/urls`

**Get URL warnings:**

`GET /api/v1/requests/warnings`


**Delete URL:**

`DELETE /api/urls/:urlID`

`urlID` a valid url id to be deleted