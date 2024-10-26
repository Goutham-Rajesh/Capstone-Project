# User Data and API Endpoints

## User Data

### Example Users

1. **Alice Smith**
   - **Email**: alice.smith@example.com
   - **Phone**: 111-222-3333
   - **Address**: 456 Elm St, Cityville, USA
   - **Password**: adminsecurepassword
   - **Role**: Admin

2. **Bob Johnson**
   - **Email**: bob.johnson@example.com
   - **Phone**: 222-333-4444
   - **Address**: 789 Pine St, Townsville, USA
   - **Password**: chitcreatorpassword
   - **Role**: Chit Creator

3. **Charlie Brown**
   - **Email**: charlie.brown@example.com
   - **Phone**: 333-444-5555
   - **Address**: 321 Oak St, Villagetown, USA
   - **Password**: participantpassword
   - **Role**: Participant

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
