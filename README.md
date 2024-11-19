#  Job Search Web Application (Frontend)

This is the **frontend** repository for a job search web application, built with React, featuring user authentication, role-based views, and a nested routing system for managing the application's layout and flow effectively.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Application Structure](#application-structure)
- [Routing Overview](#routing-overview)
- [Problem and Solution](#problem-and-solution)
- [Running the Application](#running-the-application)

## Project Overview
This frontend application provides the user interface for job seekers and HR managers. It supports user registration, login, job viewing, and management functionalities. It features a clean and organized structure with explicit handling of routing and layout components.

## Technologies Used
- **React**: Main framework for building the user interface.
- **React Router v6**: For routing, including nested routes and protected pages.
- **Axios**: For handling HTTP requests.
- **CSS**: For styling the application.
- **JavaScript**: The primary programming language used.

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project folder**:
   ```bash
   cd job-search-frontend
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a `.env` file** to store your environment variables (e.g., `REACT_APP_SERVER_URL`).
5. **Run the application**:
   ```bash
   npm start
   ```
6. The application should run on `http://localhost:3000/`.

## Application Structure
- **`src/components/`**: Reusable UI components such as Navbar and LoadingComponent.
- **`src/pages/`**: Pages like `HomePage`, `Signup`, and `Login`.
- **`src/utils/`**: Utility files such as constants (`paths.js`) and helper functions (`userToken.js`).
- **`src/services/`**: Services to handle API calls, such as `auth.js`.
- **`src/config/routes.jsx`**: Defines all the routes used in the application.
- **`App.js`**: The main application file where the Routes are declared and user state is managed.

## Routing Overview
The application uses **React Router** to define various routes, including nested routes for signup and login pages inside the homepage. The updated `App.js` defines routes explicitly, including:
- **`/` (HomePage)**: Contains nested routes for `Signup` (`/auth/signup`) and `Login` (`/auth/login`).
- **Protected Routes**: Pages like `/protected` which require user authentication.


## Running the Application
1. After cloning the repository and installing dependencies, run:
   ```bash
   npm start
   ```
2. Navigate to `http://localhost:3000` to view the application.
3. To switch between **signup** and **login**, use the toggle buttons on the homepage.

Feel free to report issues or contribute to improve the application's structure and functionality!

