# User Data and API Endpoints

## User Data

### Example Users


```json
[
  {
    "name": "Alice Smith",
    "email": "alice.smith@example.com",
    "phone": "111-222-3333",
    "address": "456 Elm St, Cityville, USA",
    "password": "adminsecurepassword",
    "role": "Admin"
  },
  {
    "name": "Bob Johnson",
    "email": "bob.johnson@example.com",
    "phone": "222-333-4444",
    "address": "789 Pine St, Townsville, USA",
    "password": "chitcreatorpassword",
    "role": "Chit Creator"
  },
  {
    "name": "Charlie Brown",
    "email": "charlie.brown@example.com",
    "phone": "333-444-5555",
    "address": "321 Oak St, Villagetown, USA",
    "password": "participantpassword",
    "role": "Participant"
  }
]

## API Endpoints

- **Register User**
  - **Endpoint**: `POST /auth/register`
  - **Description**: Register a new user with the provided data.

- **Login User**
  - **Endpoint**: `POST /auth/login`
  - **Description**: Log in a user with their email and password.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```

- **Get Users**
  - **Endpoint**: `GET /auth/users`
  - **Description**: Retrieve a list of all registered users.
