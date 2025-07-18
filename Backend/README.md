
# User API Documentation


## Endpoints

### Register User

`POST /users/register`


Registers a new user in the system. This endpoint creates a user account with the provided details and returns an authentication token upon successful registration.


## Request Body

```
{
  "fullname": {
    "firstname": "string (required, min 2 chars)",
    "lastname": "string (optional, min 2 chars)"
  },
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)"
}
```

### Example

```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```


## Responses

- **201 Created**
  - User registered successfully.
  - Response body:
    ```json
    {
      "token": "<JWT token>",
      "user": {
        "_id": "<user id>",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
        // other user fields
      }
    }
    ```

- **400 Bad Request**
  - Validation failed (missing or invalid fields).
  - Response body:
    ```json
    {
      "errors": [
        {
          "msg": "Firstname is required",
          "param": "fullname.firstname",
          "location": "body"
        }
        // ...other errors
      ]
    }
    ```

- **500 Internal Server Error**
  - User registration failed due to server error or duplicate email.
  - Response body:
    ```json
    {
      "error": "User registration failed"
    }
    ```


## Notes
- The `email` field must be unique. Attempting to register with an existing email will result in an error.
- The password is securely hashed before storage.
- The returned token can be used for authenticated requests.

---

### Login User

`POST /users/login`

## Description

Authenticates a user with email and password. Returns a JWT token and user details if credentials are valid.

## Request Body

Send a JSON object with the following structure:

```
{
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)"
}
```

### Example

```
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

## Responses

- **200 OK**
  - Login successful.
  - Response body:
    ```json
    {
      "token": "<JWT token>",
      "user": {
        "_id": "<user id>",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
        // other user fields
      }
    }
    ```

- **400 Bad Request**
  - Validation failed (missing or invalid fields).
  - Response body:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email address",
          "param": "email",
          "location": "body"
        }
        // ...other errors
      ]
    }
    ```

- **401 Unauthorized**
  - Invalid email or password.
  - Response body:
    ```json
    {
      "message": "Invalid Email or Password"
    }
    ```

- **500 Internal Server Error**
  - Server error during login.
  - Response body:
    ```json
    {
      "error": "Server error"
    }
    ```

## Notes
- The password is not returned in the response.
- Use the returned token for authenticated requests.
