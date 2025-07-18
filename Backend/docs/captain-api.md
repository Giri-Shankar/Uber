# Captain API Documentation

## Endpoints

### Register Captain

`POST /captains/register`

Registers a new captain in the system. This endpoint creates a captain account with the provided details and returns an authentication token upon successful registration.

## Request Body

```json
{
  "fullname": {
    "firstname": "string (required, min 2 chars)",
    "lastname": "string (optional, min 2 chars)"
  },
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)",
  "status": "string (active/inactive, default: inactive)",
  "vehicle": {
    "color": "string (required, min 3 chars)",
    "plate": "string (required, min 8 chars)",
    "capacity": "number (required, min 1)",
    "vehicleType": "string (required, enum: car/auto/two-wheeler)"
  },
  "location": {
    "lat": "number (optional)",
    "long": "number (optional)"
  }
}
```

### Example

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123",
  "status": "active",
  "vehicle": {
    "color": "Black",
    "plate": "ABC12345",
    "capacity": 4,
    "vehicleType": "car"
  },
  "location": {
    "lat": 12.34,
    "long": 56.78
  }
}
```

## Responses

- **200 OK**
  - Captain registered successfully.
  - Response body:
    ```json
    {
      "token": "<JWT token>",
      "captain": {
        "_id": "<captain id>",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "status": "active",
        "vehicle": {
          "color": "Black",
          "plate": "ABC12345",
          "capacity": 4,
          "vehicleType": "car"
        },
        "location": {
          "lat": 12.34,
          "long": 56.78
        }
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
  - Or when email already exists:
    ```json
    {
      "message": "captain already exists"
    }
    ```

---

### Login Captain

`POST /captains/login`

## Description

Authenticates a captain with email and password. Returns a JWT token and captain details if credentials are valid.

## Request Body

```json
{
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)"
}
```

### Example

```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

## Responses

- **200 OK**
  - Login successful.
  - Response body:
    ```json
    {
      "token": "<JWT token>",
      "captain": {
        "_id": "<captain id>",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "status": "active",
        "vehicle": {
          "color": "Black",
          "plate": "ABC12345",
          "capacity": 4,
          "vehicleType": "car"
        },
        "location": {
          "lat": 12.34,
          "long": 56.78
        }
      }
    }
    ```

- **400 Bad Request**
  - Validation failed or invalid credentials
  - Response body:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```
  - Or validation errors:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        }
        // ...other errors
      ]
    }
    ```

---

### Get Captain Profile

`GET /captains/profile`

## Description

Returns the authenticated captain's profile information. Requires a valid JWT token in the `Authorization` header or as a cookie.

## Authentication

This endpoint is protected. You must provide a valid JWT token:
- In the `Authorization` header as `Bearer <token>`, or
- As a `token` cookie

## Responses

- **200 OK**
  - Returns the captain's profile information.
  - Response body:
    ```json
    {
      "_id": "<captain id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "status": "active",
      "vehicle": {
        "color": "Black",
        "plate": "ABC12345",
        "capacity": 4,
        "vehicleType": "car"
      },
      "location": {
        "lat": 12.34,
        "long": 56.78
      }
    }
    ```

- **400 Unauthorized**
  - Missing or invalid token
  - Response body:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

---

### Logout Captain

`GET /captains/logout`

## Description

Logs out the authenticated captain by blacklisting the current JWT token and clearing the authentication cookie.

## Authentication

This endpoint is protected. You must provide a valid JWT token:
- In the `Authorization` header as `Bearer <token>`, or
- As a `token` cookie

## Responses

- **200 OK**
  - Logout successful
  - Response body:
    ```json
    {
      "message": "logged out"
    }
    ```

- **400 Unauthorized**
  - Missing or invalid token
  - Response body:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

## Notes
- The token is blacklisted after logout and cannot be used again
- The authentication cookie is cleared on logout
