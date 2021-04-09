# BukuWarung Assignment

#### Deployed Application:

http://18.224.165.248:3007/

## About the Project

This repository contains code for a sample leaderboard made as a part of frontend internship assesment at BukuWarung. The project is made using the MERN stack i.e. the backend API is made using Node.js and Express.js with MongoDB as the database and the frontend is made using React.js. All the styling in React.js has been done using Material-UI.

## Project Setup

```javascript
1. Clone the repo
2. cd BukuWarung-Assignment
3. npm install
4. make a .env file with the following keys(s): MONGOURI
5. cd client
6. npm install
7. cd ..
5. npm run dev
6. Open the project on localhost:3007
7. The API should be working on localhost:5055
```

## About the Application

1. This application is a minimalist leaderboard that shows the ranks of different users based on their scores (credits) or name (alphabetically) both in increasing and non-increasing format.

2. We can filter the users and build our leaderboard with the following variations:

- Number of records to show
- Order to show (ascending or descending)
- Criteria to show (alphabetical order or credit points)

3. We can CREATE a new user (with avatar image upload), FETCH all users in the table add users, UPDATE users, DELETE users (complete CRUD operations).

4. Cloudinary (https://cloudinary.com/) is used as a cloud storing service to upload the avatar image file and just saving the secure link to it in the MongoDB database.

5. You can click on the user's name to edit/delete it from the leaderboard.

6. The API is developed using all the REST standards.

7. No external state management tool (such as Redux) was used.

8. Concurrently is used to run the API and frontend simultaneously.

9. The application can also dynamically set the BASE_URL for hitting API endpoints depending on the origin from where the reuqest is served

## Technology Stack

##### MERN stack

- MongoDB
- Express.js
- React.js
- Node.js

* Material UI (https://material-ui.com/) was used for styling the components

##### Dependencies

- axios
- material-ui/core

* cors
* body-parser
* mongoose
* dotenv

- morgan
- nodemon
- concurrently

## API endpoints

1. GET /api/users - Fetch all the users

2. GET /api/users/:id - Fetch details of a particular user

3. POST /api/users - Create a new user (with name, avatar and credits/score)

4. PUT /api/users/:id - Update a particular user's name or score

5. DELETE /api/users/:id - Delete a particular user

## Routes

1. / - The home page route containing the leaderboard and options to filter the results
