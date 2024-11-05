# ChitLink - Capstone-Project


## Project Overview

**ChitLink** is a web application designed to address challenges faced by communities that rely on traditional collective savings and borrowing schemes. These groups, also known as Chit Funds, often struggle with a lack of transparency and poor organization. **ChitLink** aims to provide a secure and automated platform for managing participants, handling fund allocations, and ensuring clear, transparent processes for everyone involved.

This project consists of a **frontend** built with React and TypeScript, and a **backend** built with Express and Node.js, also using TypeScript. The system provides both user and creator dashboards, enabling individuals to manage their chit funds, create bids, and maintain participant information, all through a seamless web interface.

## Project Structure

```
ChitLink/
│
├── frontend/                  # Frontend codebase (React)
│   └── chitapp/               # React app folder
│       ├── public/            # Static files
│       ├── src/               # React source files
│       ├── package.json       # Frontend dependencies and scripts
│       └── tsconfig.json      # TypeScript configuration for frontend
│
└── backend/                   # Backend codebase (Express/Node.js)
    ├── controllers/           # API route controllers
    ├── models/                # Database models (if applicable)
    ├── routes/                # API routes
    ├── package.json           # Backend dependencies and scripts
    └── tsconfig.json          # TypeScript configuration for backend
```

## Getting Started

### 1. Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** (Node package manager)
- **TypeScript** (should be installed as part of the project)

### 2. Setting Up the Frontend

To start the frontend application:

1. Navigate to the `frontend/chitapp` directory:
   ```bash
   cd frontend/chitapp
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   This will launch the frontend application in development mode, usually accessible at `http://localhost:5173`.

### 3. Setting Up the Backend

To start the backend application:

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

   The backend will now be running, typically at `http://localhost:5000`.

## API Endpoints

The backend exposes several routes for interacting with chit funds, participants, and bids. Below are the available endpoints:

### **Authentication**
- **POST** `/register` - Register a new user.
- **POST** `/login` - Login with existing credentials.

### **Chit Fund Management**
- **GET** `/getChitFunds` - Get all chit funds.
- **GET** `/getChitFundById/:id` - Get a specific chit fund by ID.
- **POST** `/createChitFund` - Create a new chit fund.
- **GET** `/getChitFundByParticipantId/:id` - Get chit funds by participant ID.
- **GET** `/getChitFundByCreatorId/:id` - Get chit funds by creator ID.
- **POST** `/updateChitFundById/:id` - Update chit fund details.
- **DELETE** `/deleteChitFundById/:id` - Delete a chit fund by ID.

### **Participant Management**
- **GET** `/chitFund/participants/email/:id` - Get emails of chit fund participants.
- **GET** `/chitFund/participantInfo/:id` - Get detailed participant info.
- **GET** `/chitFund/AllparticipantsInfo/:id` - Get list of all participants in a chit fund.
- **PUT** `/removeParticipantFromChitfund/:id` - Remove a participant from a chit fund.

### **Bidding System**
- **GET** `/getBids` - Get all bids.
- **GET** `/getBidById/:id` - Get a specific bid by ID.
- **GET** `/getBidByChitFundId/:chitFundId` - Get bids by chit fund ID.
- **POST** `/createBid` - Create a new bid.
- **PUT** `/updateBidById/:id` - Update bid details by ID.
- **DELETE** `/deleteBidById/:id` - Delete a bid by ID.
- **GET** `/bid/winners/email/:id` - Get emails of bid winners.

---

## Frontend Routes

The frontend application has several routes for different user pages:

- `/` - Home page (`renderHome()`)
- `/login` - Login page (`Login`)
- `/register` - User registration page (`UserRegistration`)
- `/ChitCreator` - Creator dashboard (`CreatorDashboard`)
- `/createChitfund` - Create a new chit fund (`CreateChit`)
- `/ChitFund` - User dashboard (`UserLoggedIn`)
- `/CreatorBidPage` - Creator's bid page (`CreatorBidPage`)
- `/UserBidPage` - User's bid page (`UserBidPage`)
- `/UserProfile` - User profile page (`UserProfile`)
- `/MembersInfo` - Information of chit fund members (`MembersInfo`)
- `/About` - About page (`renderAbout()`)
- `/logout` - Logout (`Logout`)
- `/CreatorProfile` - Creator profile page (`ChitCreatorProfileComponent`)

---

## Contributing

We welcome contributions to improve the functionality and quality of this project. To contribute, please:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and test thoroughly.
4. Submit a pull request describing your changes.

Please follow the project’s code style and conventions.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For any inquiries or issues, feel free to open an issue or contact the project maintainers.

---

**ChitLink** is built with love to improve transparency and organization in traditional chit fund systems. Happy contributing!
